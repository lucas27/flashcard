import { SubTopics } from "../entity/SubTopics";
import { SubTopicsGatewayDto } from "./SubTopics.gateway.dto";

export interface SubTopicsGateway {
    save(subTopic: SubTopics): Promise<SubTopicsGatewayDto>;
    list(themeId: number): Promise<SubTopics[]>;
}