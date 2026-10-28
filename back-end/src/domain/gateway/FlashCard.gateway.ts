import { FlashCard } from "../entity/FlashCard";
import { FlashCardGatewayDto } from "./Flashcard.gateway.dto";

export interface FlashCardGateway {
    save(flashCard: FlashCard): Promise<FlashCardGatewayDto>;
    list(): Promise<FlashCard[]>;
}