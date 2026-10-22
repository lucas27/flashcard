import { CardDesign } from "../../domain/entity/CardDesign";
import { FlashCard } from "../../domain/entity/FlashCard";
import { FlashCardGateway } from "../../domain/gateway/FlashCard.gateway";
import { Usecase } from "../usecase";
import { CreateFlashCardInputDto, CreateFlashCardOutputDto } from "./create-flashcard.dto";

export class CreateFlashCardUsecase implements Usecase<CreateFlashCardInputDto, CreateFlashCardOutputDto> {
    private constructor(private readonly flashCardGateway: FlashCardGateway) {}

    public static create(flashCardGateway: FlashCardGateway) {
        return new CreateFlashCardUsecase(flashCardGateway);
    }
    
    public async execute({ask, design, question, themeId}: CreateFlashCardInputDto): Promise<CreateFlashCardOutputDto> {
        const cardDesign = CardDesign.create(design.textColor, design.font);
        
        const flashCard = FlashCard.create(question, ask, cardDesign, themeId);
        
        await this.flashCardGateway.save(flashCard);

        const output = this.presentOutput(flashCard, cardDesign);
        
        return output
    }

    // testando outras formas de fazer
    // faz sentido devolver id, ao inves de entregar tudo. No list faz sentido pegar todo os dados
    private presentOutput(flashCard: FlashCard, design: CardDesign): CreateFlashCardOutputDto {
        const output: CreateFlashCardOutputDto = {
            id: flashCard.id!,
            design: {
                id: design.id!
            }
        }

        return output;
    }

}