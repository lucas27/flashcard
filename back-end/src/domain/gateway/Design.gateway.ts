import { Design } from "../entity/Design";

export interface DesignGateway {
    // temporario
    save(design: Design): Promise<Design>;
    findById(id: number): Promise<Design>;
}