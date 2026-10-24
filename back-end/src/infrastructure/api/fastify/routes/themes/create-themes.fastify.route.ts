import { FastifyReply, FastifyRequest } from "fastify";
import { CreateThemesInputDto } from "../../../../../usecases/create-themes/create-themes.dto";
import { CreateThemesUsecase } from "../../../../../usecases/create-themes/create-themes.usecase";
import { HttpMethod, Route } from "../route";
import { CreateThemesResponseDto } from "./create-themes.route.dto";

export class CreateThemesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createThemesService: CreateThemesUsecase
    ){}

    public static create(createThemesService: CreateThemesUsecase) {
        return new CreateThemesRoute(
            "/themes",
            HttpMethod.POST,
            createThemesService
        );
    }
    
    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const { name } = request.body as { name: string };

            const input: CreateThemesInputDto = {
                name
            }

            const output: CreateThemesResponseDto = await this.createThemesService.execute(input);
            
            const responseBody = this.present(output);

            response.status(201).send(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }
    
    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateThemesResponseDto): CreateThemesResponseDto {
        const response = { id: input.id }
        return response;
    }


}