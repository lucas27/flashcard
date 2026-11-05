import { FastifyReply, FastifyRequest } from "fastify";
import { ListQuestionsUsecase } from "../../../../../../usecases/list-questions/list-questions.usecase";
import { HttpMethod, Route } from "../../route";
import { ListQuestionsOutputDto } from "../../../../../../usecases/list-questions/list-questions.dto";
import { ListQuestionsResponseDto } from "./list-questions.route.dto";

export class ListQuestionsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listQuestionsService: ListQuestionsUsecase
    ) {}

    public static create(listQuestionsService: ListQuestionsUsecase) {
        return new ListQuestionsRoute(
            "/questions",
            HttpMethod.GET,
            listQuestionsService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const output = await this.listQuestionsService.execute();

            const responseBody = this.presentResponse(output);

            response.status(200).send(responseBody);
        }
    }

    private presentResponse(input: ListQuestionsOutputDto): ListQuestionsResponseDto {
        const output: ListQuestionsResponseDto = {
            questions: input.questions.map(qts => ({
                id: qts.id.toString(),
                questionStem: qts.questionStem,
                alternatives: qts.alternatives.map(alt => ({
                    id: alt.id.toString(),
                    options: alt.options,
                    isCorrect: alt.isCorrect
                })),
                design: {
                    id: qts.design.id,
                    textColor: qts.design.textColor,
                    font: qts.design.font
                },
                themeId: qts.themeId
            }))
        }
        
        return output;
    }

    public getPath(): string {
        return this.path;
    }
    
    public getMethod(): HttpMethod {
        return this.method;
    }
}