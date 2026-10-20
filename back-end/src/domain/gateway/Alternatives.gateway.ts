import { Alternatives } from "../entity/Alternatives";

export interface AlternativesGateway {
    save(Alternatives: Alternatives): Promise<void>;
    list(): Promise<Alternatives[]>;
}