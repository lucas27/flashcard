import { CreateFlashcardRoute } from "../../../infrastructure/api/fastify/routes/flashcard/create-flashcard.fastify.route";
import { ListFlashcardRoute } from "../../../infrastructure/api/fastify/routes/flashcard/list-flashcard.fastify.route";
import { Route } from "../../../infrastructure/api/fastify/routes/route";
import { FlashCardRepositoryPrisma } from "../../../infrastructure/repositories/flashcard.repository.prisma";
import prisma from "../../../package/prisma/prisma";
import { CreateFlashCardUsecase } from "../../../usecases/create-flashcard/create-flashcard.usecase";
import { ListFlashcardUsecase } from "../../../usecases/list-flashcard/list-flashcard.usecase";

export class FlashCardFactory {
    public static makeRoutes(): Route[] {
        const flashCardRepository = FlashCardRepositoryPrisma.create(prisma);

        const createFlashcardUsecase = CreateFlashCardUsecase.create(flashCardRepository);
        const listFlashcardUsecase = ListFlashcardUsecase.create(flashCardRepository);

        const createRoute = CreateFlashcardRoute.create(createFlashcardUsecase);
        const listRoute = ListFlashcardRoute.create(listFlashcardUsecase);

        return [createRoute, listRoute];
    }
}