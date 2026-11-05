import { Questions } from "../../domain/entity/Questions";
import { QuestionsGateway } from "../../domain/gateway/Questions.gateway";
import { Usecase } from "../usecase";
import { FindAllByThemeIdQuestionsInputDto, FindAllByThemeIdQuestionsOutputDto } from "./findAllByThemeId-questions.dto";

export class FindAllByThemeIdQuestionsUsecase implements Usecase<FindAllByThemeIdQuestionsInputDto, FindAllByThemeIdQuestionsOutputDto> {
    private constructor(private readonly questionsGateway: QuestionsGateway){}

    public static create(questionsGateway: QuestionsGateway) {
        return new FindAllByThemeIdQuestionsUsecase(questionsGateway);
    }

    public async execute( { themeId }: FindAllByThemeIdQuestionsInputDto ): Promise<FindAllByThemeIdQuestionsOutputDto> {
        const questions = await this.questionsGateway.findAllByThemeId(themeId);

        const output = this.presentOutput(questions);

        return output
    }

    private presentOutput(inputs: Questions[]): FindAllByThemeIdQuestionsOutputDto {
        return {
            questions: inputs.map(input => ({
                id: input.id!,
                questionStem: input.questionStem,
                alternatives: input.alternatives.map(alt => ({
                    id: alt.id!,
                    options: alt.options,
                    isCorrect: alt.isCorrect
                })),
                design: {
                    id: input.design.id!,
                    textColor: input.design.textColor,
                    font: input.design.font
                },
                themeId: input.themeId
            }))
        }
    }
}