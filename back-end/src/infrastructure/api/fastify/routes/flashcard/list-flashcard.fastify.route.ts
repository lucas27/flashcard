import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { ListFlashcardUsecase } from "../../../../../usecases/list-flashcard/list-flashcard.usecase";
import { ListFlashcardOutputDto } from "../../../../../usecases/list-flashcard/list-flashcard.dto";
import { ListFlashcardResponseDto } from "./list-flashcard.route.dto";

export class ListFlashcardRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listFlashcardService: ListFlashcardUsecase
    ){}

    public static create(listFlashcardService: ListFlashcardUsecase) {
        return new ListFlashcardRoute(
            "/flashcard",
            HttpMethod.GET,
            listFlashcardService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const output = await this.listFlashcardService.execute();
            
            const responseBody = this.present(output); 
            
            response.status(200).send(responseBody);
        }; 
    }

    public present(input: ListFlashcardOutputDto): ListFlashcardResponseDto {
        const response: ListFlashcardResponseDto = {
            flashcard: input.flashcard.map(fl => ({
                id: fl.id.toString(),
                question: fl.question,
                ask: fl.ask,
                design: {
                    id: fl.design.id!,
                    textColor: fl.design.textColor,
                    font: fl.design.font
                },
                themeId: fl.themeId
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