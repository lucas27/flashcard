import { Route } from "../../../infrastructure/api/fastify/routes/route";
import { CreateThemesRoute } from "../../../infrastructure/api/fastify/routes/themes/create-themes.fastify.route";
import { ListThemesRoute } from "../../../infrastructure/api/fastify/routes/themes/list-themes.fastify.route";
import { ThemeRepositoryPrisma } from "../../../infrastructure/repositories/theme.repository.prisma";
import prisma from "../../../package/prisma/prisma";
import { CreateThemesUsecase } from "../../../usecases/create-themes/create-themes.usecase";
import { ListThemesUsecase } from "../../../usecases/list-themes/list-themes.usecase";

export class ThemesFactory {
    public static makeRoutes(): Route[] {
        const themesRepository = ThemeRepositoryPrisma.create(prisma);

        const createThemesUsecase = CreateThemesUsecase.create(themesRepository);
        const listThemesUsecase = ListThemesUsecase.create(themesRepository);

        const createRoute = CreateThemesRoute.create(createThemesUsecase);
        const listRoute = ListThemesRoute.create(listThemesUsecase);

        return [createRoute, listRoute];
    }
}