import { SubTopics } from "../entity/SubTopics";

export interface SubTopicsGateway {
    save(subTopic: SubTopics): Promise<number>;
    list(): Promise<SubTopics[]>;
}