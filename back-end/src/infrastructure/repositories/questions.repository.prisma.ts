import { PrismaClient } from "@prisma/client";
import { Questions } from "../../domain/entity/Questions";
import { QuestionsGateway } from "../../domain/gateway/Questions.gateway";
import { QuestionsGatewayDto } from "../../domain/gateway/Questions.gateway.dto";
import { DesignMapper } from "../database/mapper/design.mapper";
import { QuestionDesign } from "../../domain/entity/QuestionDesign";
import { Alternatives } from "../../domain/entity/Alternatives";

export class QuestionsRepositoryPrisma implements QuestionsGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new QuestionsRepositoryPrisma(prismaClient);
    }

    public async save(questions: Questions): Promise<QuestionsGatewayDto> {
        const prismaTextColorEnum = DesignMapper.toPersistenceEnumTextColor(questions.design.textColor);
        const prismaFontEnum = DesignMapper.toPersistenceEnumFont(questions.design.font);

        const createdQuestions = await this.prismaClient.questions.create({
            data: {
                questionStem: questions.questionStem,
                design: {
                    create: {
                        textColor: prismaTextColorEnum,
                        font: prismaFontEnum
                    }
                },
                alternatives: {
                    create: questions.alternatives.map((alt) => ({
                        options: alt.options,
                        isCorrect: alt.isCorrect
                    }))
                },
                themeId: questions.themeId
            },
            include: {
                design: true,
                alternatives: true
            }
        })
        
        return {
            id: createdQuestions.id,
            design: {
                id: createdQuestions.design?.id!
            },
            alternatives: createdQuestions.alternatives.map(alt => ({ id: alt.id! })),
            themeId: questions.themeId
        };
    }

    public async list(): Promise<Questions[]> {
        const questions = await this.prismaClient.questions.findMany({
            include: {
                design: true,
                alternatives: true
            }
        })

        const questionsList = await questions.map(qt => {
            const prismaTextColorEnum = DesignMapper.toDomainEnumTextColor(qt.design!.textColor);
            const prismaFontEnum = DesignMapper.toDomainEnumFont(qt.design!.font);

            const design = QuestionDesign.with(
                qt.design!.id,
                qt.design!.questionsId,
                prismaTextColorEnum,
                prismaFontEnum
            );

            const alternatives = qt.alternatives!.map(alt => {
                return Alternatives.with(
                    alt.id,
                    alt.questionId,
                    alt.options,
                    alt.isCorrect
                );
            });

            return Questions.with(qt.id, qt.questionStem, qt.themeId, design, alternatives);
        })

        return questionsList;
    }

}