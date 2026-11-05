import { CreateQuestionsRoute } from "../../../infrastructure/api/fastify/routes/questions/create/create-questions.fastify.route";
import { FindAllByThemeIdQuestionsRoute } from "../../../infrastructure/api/fastify/routes/questions/findAllByThemeId/findAllByThemeId-questions.fastify.route";
import { ListQuestionsRoute } from "../../../infrastructure/api/fastify/routes/questions/list/list-questions.fastify.route";
import { Route } from "../../../infrastructure/api/fastify/routes/route";
import { QuestionsRepositoryPrisma } from "../../../infrastructure/repositories/questions.repository.prisma";
import prisma from "../../../package/prisma/prisma";
import { CreateQuestionsUsecase } from "../../../usecases/create-questions/create-questions.usecase";
import { FindAllByThemeIdQuestionsUsecase } from "../../../usecases/findAllByThemeId-questions/findAllByThemeId-questions.usecase";
import { ListQuestionsUsecase } from "../../../usecases/list-questions/list-questions.usecase";

export class QuestionsFactory {
    public static makeRoutes(): Route[] {
        const questionsRepository = QuestionsRepositoryPrisma.create(prisma);

        const createQuestionsUsecase = CreateQuestionsUsecase.create(questionsRepository);
        const listQuestionsUsecase = ListQuestionsUsecase.create(questionsRepository);
        const findAllByThemeIdQuestionsUsecase = FindAllByThemeIdQuestionsUsecase.create(questionsRepository);

        const createRoute = CreateQuestionsRoute.create(createQuestionsUsecase);
        const listRoute = ListQuestionsRoute.create(listQuestionsUsecase);
        const findRoute = FindAllByThemeIdQuestionsRoute.create(findAllByThemeIdQuestionsUsecase);

        return [createRoute, listRoute, findRoute];
    }
}