import { CardDesign } from "../entity/CardDesign";

export interface DesignGateway {
    // temporario
    save(design: CardDesign): Promise<CardDesign>;
    findById(id: number): Promise<CardDesign>;
}