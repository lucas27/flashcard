import { FlashCard } from "../entity/FlashCard";

export interface FlashCardGateway {
    save(flashCard: FlashCard): Promise<void>;
    list(): Promise<FlashCard[]>;
}