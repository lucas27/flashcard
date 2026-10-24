import { FastifyReply, FastifyRequest } from "fastify";
import { ListThemesUsecase } from "../../../../../usecases/list-themes/list-themes.usecase";
import { HttpMethod, Route } from "../route";
import { ListThemesOutputDto } from "../../../../../usecases/list-themes/list-themes.dto";
import { ListThemesResponseDto } from "./list-themes.route.dto";

export class ListThemesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listThemesService: ListThemesUsecase
    ){}

    public static create(listThemesService: ListThemesUsecase) {
        return new ListThemesRoute(
            "/themes",
            HttpMethod.GET,
            listThemesService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const output = await this.listThemesService.execute();
            
            const responseBody = this.present(output); 
            
            response.status(200).send(responseBody);
        }; 
    }

    public present(input: ListThemesOutputDto): ListThemesResponseDto {
        const response: ListThemesResponseDto = {
            themes: input.themes.map(th => ({
                id: th.id,
                name: th.name
            }))
        };
        return response;
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}