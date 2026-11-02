import { Questions } from "../../domain/entity/Questions";
import { QuestionsGateway } from "../../domain/gateway/Questions.gateway";
import { Usecase } from "../usecase";
import { ListQuestionsOutputDto } from "./list-questions.dto";

export class ListQuestionsUsecase implements Usecase<void, ListQuestionsOutputDto> {
    private constructor(private readonly questionsGateway: QuestionsGateway){}

    public static create(questionsGateway: QuestionsGateway) {
        return new ListQuestionsUsecase(questionsGateway);
    }

    public async execute(): Promise<ListQuestionsOutputDto> {
        const questions = await this.questionsGateway.list();

        const output = this.presentOutput(questions);

        return output
    }

    private presentOutput(inputs: Questions[]): ListQuestionsOutputDto {
        return {
            questions: inputs.map(input => ({
                id: input.id!,
                questionStem: input.questionStem,
                alternatives: input.alternatives.map(alt => ({
                    id: alt.id!,
                    options: alt.options,
                    isCorrect: alt.isCorrect
                })),
                design: {
                    id: input.design.id!,
                    textColor: input.design.textColor,
                    font: input.design.font
                },
                themeId: input.themeId
            }))
        }
    }
}