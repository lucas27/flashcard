import { Prisma, PrismaClient, TextColor } from "@prisma/client";
import { FlashCardGateway } from "../../domain/gateway/FlashCard.gateway";
import { FlashCard } from "../../domain/entity/FlashCard";
import { FlashCardGatewayDto } from "../../domain/gateway/Flashcard.gateway.dto";
import { DesignMapper } from "../database/mapper/design.mapper";
import { CardDesign } from "../../domain/entity/CardDesign";

export class FlashCardRepositoryPrisma implements FlashCardGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}
    
    public static create(prismaClient: PrismaClient) {
        return new FlashCardRepositoryPrisma(prismaClient);
    }

    public async save(flashCard: FlashCard): Promise<FlashCardGatewayDto> {
        const prismaTextColorEnum = DesignMapper.toPersistenceEnumTextColor(flashCard.design.textColor);
        const prismaFontEnum = DesignMapper.toPersistenceEnumFont(flashCard.design.font);

        const createdFlashcard = await this.prismaClient.flashCard.create({
            data: {
                question: flashCard.question,
                ask: flashCard.ask,
                design: {
                    create: {
                        textColor: prismaTextColorEnum,
                        font: prismaFontEnum
                    }
                },
                themeId: flashCard.themeId
            },
            include: {
                design: true
            }
        });

        return {
            id: createdFlashcard.id,
            design: {
                id: createdFlashcard.design?.id!
            }
        };
    }

    public async list(): Promise<FlashCard[]> {
        const flashCard = await this.prismaClient.flashCard.findMany({
            include: {
                design: true
            }
        });
        
        const flashCardList = flashCard.map(fl => {
            const prismaTextColorEnum = DesignMapper.toDomainEnumTextColor(fl.design!.textColor);
            const prismaFontEnum = DesignMapper.toDomainEnumFont(fl.design!.font);
            const design = CardDesign.with(
                fl.design!.id,
                fl.design!.cardId,
                prismaTextColorEnum,
                prismaFontEnum
            );

            return FlashCard.with(fl.id, fl.question, fl.ask, design, fl.themeId);
        });

        return flashCardList;
    }

}