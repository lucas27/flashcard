import { Questions } from "../entity/Questions";

export interface QuestionsGateway {
    save(questions: Questions): Promise<void>;
    list(): Promise<Questions[]>; 
}