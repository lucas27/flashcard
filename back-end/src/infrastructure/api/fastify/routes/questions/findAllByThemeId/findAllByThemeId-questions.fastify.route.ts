import { FastifyReply, FastifyRequest } from "fastify";
import { FindAllByThemeIdQuestionsUsecase } from "../../../../../../usecases/findAllByThemeId-questions/findAllByThemeId-questions.usecase";
import { HttpMethod, Route } from "../../route";
import { FindAllByThemeIdQuestionsInputDto, FindAllByThemeIdQuestionsOutputDto } from "../../../../../../usecases/findAllByThemeId-questions/findAllByThemeId-questions.dto";
import { FindAllByThemeIdQuestionsResponseDto } from "./findAllByThemeId-questions.route.dto";

export class FindAllByThemeIdQuestionsRoute implements Route {
     private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllByThemeIdQuestionsService: FindAllByThemeIdQuestionsUsecase
    ) {}

    public static create(findAllByThemeIdQuestionsService: FindAllByThemeIdQuestionsUsecase) {
        return new FindAllByThemeIdQuestionsRoute(
            "/questions/:themeId",
            HttpMethod.GET,
            findAllByThemeIdQuestionsService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const { themeId } = request.params as FindAllByThemeIdQuestionsInputDto;

            const input: FindAllByThemeIdQuestionsInputDto = { themeId }

            const output = await this.findAllByThemeIdQuestionsService.execute(input);

            const responseBody = this.presentResponse(output);

            response.status(200).send(responseBody);
        }
    }

    private presentResponse(input: FindAllByThemeIdQuestionsOutputDto): FindAllByThemeIdQuestionsResponseDto {
        const output: FindAllByThemeIdQuestionsResponseDto = {
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