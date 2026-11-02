import { Questions } from "../entity/Questions";
import { QuestionsGatewayDto } from "./Questions.gateway.dto";

export interface QuestionsGateway {
    save(questions: Questions): Promise<QuestionsGatewayDto>;
    list(): Promise<Questions[]>; 
}