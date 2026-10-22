import { Alternatives } from "../../domain/entity/Alternatives";
import { QuestionDesign } from "../../domain/entity/QuestionDesign";
import { Questions } from "../../domain/entity/Questions";
import { QuestionsGateway } from "../../domain/gateway/Questions.gateway";
import { Usecase } from "../usecase";
import { CreateQuestionsInputDto, CreateQuestionsOutputDto } from "./create-questions.dto";

export class CreateQuestionsUsecase implements Usecase<CreateQuestionsInputDto, CreateQuestionsOutputDto> {
    private constructor(private readonly questionsGateway: QuestionsGateway) {}
    
    public static create(questionsGateway: QuestionsGateway) {
        return new CreateQuestionsUsecase(questionsGateway);
    }
    
    public async execute({ questionStem, themeId, design, alternatives }: CreateQuestionsInputDto): Promise<CreateQuestionsOutputDto> {
        const questionDesign = QuestionDesign.create(design.textColor, design.font);

        const questionsAlternatives = alternatives.map(alt => Alternatives.create(alt.options, alt.isCorrect) );

        const question = Questions.create(questionStem, themeId, questionDesign, questionsAlternatives);

        await this.questionsGateway.save(question);

        const output = this.presentOutput(question, questionsAlternatives, questionDesign);
        
        return output; 
    } 

    public presentOutput(question: Questions, alternatives: Alternatives[], questionDesign: QuestionDesign): CreateQuestionsOutputDto {
        return {
            id: question.id!,
            design: { id: questionDesign.id! },
            alternatives: alternatives.map(alt => ({id: alt.id!}))
        }
    } 
}