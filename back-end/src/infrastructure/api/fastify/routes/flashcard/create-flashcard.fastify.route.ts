import { FastifyReply, FastifyRequest } from "fastify";
import { CreateFlashCardUsecase } from "../../../../../usecases/create-flashcard/create-flashcard.usecase";
import { HttpMethod, Route } from "../route";
import { CreateFlashCardInputDto } from "../../../../../usecases/create-flashcard/create-flashcard.dto";
import { CreateFlashcardResponseDto } from "./create-flashcard.route.dto";

export class CreateFlashcardRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createflashcardService: CreateFlashCardUsecase
    ){}

    public static create(createflashcardService: CreateFlashCardUsecase) {
        return new CreateFlashcardRoute(
            "/themes",
            HttpMethod.POST,
            createflashcardService
        );
    }
    
    public getHandler() {
        return async (request: FastifyRequest, response: FastifyReply) => {
            const { question, ask, design, themeId } = request.body as CreateFlashCardInputDto;

            const input: CreateFlashCardInputDto = {
                question,
                ask,
                design,
                themeId
            }

            const output: CreateFlashcardResponseDto = await this.createflashcardService.execute(input);
            
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

    private present(input: CreateFlashcardResponseDto): CreateFlashcardResponseDto {
        const response = { 
            id: input.id,
            design: {
                id: input.design.id
            } 
        }
        return response;
    }


}