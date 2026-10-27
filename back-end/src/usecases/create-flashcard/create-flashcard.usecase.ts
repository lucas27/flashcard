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
        
        const saveIds = await this.flashCardGateway.save(flashCard);

        const output = this.presentOutput(saveIds);
        
        return output
    }

    // testando outras formas de fazer
    // faz sentido devolver id, ao inves de entregar tudo. No list faz sentido pegar todo os dados
    private presentOutput(input: CreateFlashCardOutputDto): CreateFlashCardOutputDto {
        const output: CreateFlashCardOutputDto = {
            id: input.id,
            design: {
                id: input.design.id
            }
        }

        return output;
    }

}