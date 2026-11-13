import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSubTopicsUsecase } from "../../../../../usecases/create/create-subTopics/create-subTopics.usecase";
import { HttpMethod, Route } from "../route";
import { CreateSubTopicsInputDto, CreateSubTopicsOutputDto } from "../../../../../usecases/create/create-subTopics/create-subTopics.dto";
import { CreateSubTopicResponseDto } from "./create-subTopics.route.dto";

export class CreateSubTopicRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createSubTopicService: CreateSubTopicsUsecase
    ){}

    public static create(createSubTopicService: CreateSubTopicsUsecase) {
        return new CreateSubTopicRoute(
            "/sub-topic",
            HttpMethod.POST,
            createSubTopicService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const input = request.body as CreateSubTopicsInputDto
            
            const output = await this.createSubTopicService.execute(input);

            const responseJson = this.present(output);

            response.status(201).send(responseJson);
        }
    }

    private present(input: CreateSubTopicsOutputDto): CreateSubTopicResponseDto {
        return {
            id: input.id,
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