import { FastifyReply, FastifyRequest } from "fastify";
import { CreateQuestionsUsecase } from "../../../../../usecases/create-questions/create-questions.usecase";
import { HttpMethod, Route } from "../route";
import { CreateQuestionsInputDto, CreateQuestionsOutputDto } from "../../../../../usecases/create-questions/create-questions.dto";
import { CreateQuestionsResponseDto } from "./create-questions.route.dto";

export class CreateQuestionsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createQuestionsService: CreateQuestionsUsecase
    ) {}

    public static create(createQuestionsService: CreateQuestionsUsecase) {
        return new CreateQuestionsRoute(
            "/questions",
            HttpMethod.POST,
            createQuestionsService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const { questionStem, alternatives, design, themeId } = request.body as CreateQuestionsInputDto;

            const input: CreateQuestionsInputDto = {
                questionStem,
                alternatives,
                design,
                themeId
            }
            const output = await this.createQuestionsService.execute(input);

            const responseBody = this.presentResponse(output);

            response.status(201).send(responseBody);
        }
    }

    private presentResponse(input: CreateQuestionsOutputDto): CreateQuestionsResponseDto {
        return {
            id: input.id.toString(),
            design: { id: input.design.id },
            alternatives: input.alternatives.map(alt => ({ id: alt.id.toString() })),
            themeId: input.themeId
        }
    }

    public getPath(): string {
        return this.path;
    }
    
    public getMethod(): HttpMethod {
        return this.method;
    }
}