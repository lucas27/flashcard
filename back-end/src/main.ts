import { ApiFastify } from "./infrastructure/api/fastify/api.fastify";
import { CreateThemesRoute } from "./infrastructure/api/fastify/routes/themes/create-themes.fastify.route";
import { ListThemesRoute } from "./infrastructure/api/fastify/routes/themes/list-themes.fastify.route";
import { ThemeRepositoryPrisma } from "./infrastructure/repositories/theme.repository.prisma";
import prisma from "./package/prisma/prisma";
import { CreateThemesUsecase } from "./usecases/create-themes/create-themes.usecase";
import { ListThemesUsecase } from "./usecases/list-themes/list-themes.usecase";

function main() {
  
  const repository = ThemeRepositoryPrisma.create(prisma);

  const createThemesUsecase = CreateThemesUsecase.create(repository);
  const listThemesUsecase = ListThemesUsecase.create(repository);

  const createRoute = CreateThemesRoute.create(createThemesUsecase);
  const listRoute = ListThemesRoute.create(listThemesUsecase);

  const port = 8000;

  const api = ApiFastify.create([createRoute, listRoute]);

  api.start(port);
}

main();