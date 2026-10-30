import { FlashCardGateway } from "../../domain/gateway/FlashCard.gateway";
import { Usecase } from "../usecase";
import { ListFlashcardOutputDto } from "./list-flashcard.dto";

export class ListFlashcardUsecase implements Usecase<void, ListFlashcardOutputDto> {
    private constructor(private readonly flashcardGateway: FlashCardGateway) {}

    public static create(flashcardGateway: FlashCardGateway){
        return new ListFlashcardUsecase(flashcardGateway);
    }

    public async execute(): Promise<ListFlashcardOutputDto> {
        const flashcards = await this.flashcardGateway.list();
        // tentei fazer com output, mas não deu certo devido ao id do flashcard
        return {
            flashcard: flashcards.map(fl => ({
                id: fl.id!,
                question: fl.question,
                ask: fl.ask,
                design: {
                    id: fl.design.id!,
                    textColor: fl.design.textColor,
                    font: fl.design.font
                },
                themeId: fl.themeId
            }))
        }
    }
}