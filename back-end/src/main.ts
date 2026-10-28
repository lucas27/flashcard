import { ApiFastify } from "./infrastructure/api/fastify/api.fastify";
import { CreateThemesRoute } from "./infrastructure/api/fastify/routes/themes/create-themes.fastify.route";
import { ListThemesRoute } from "./infrastructure/api/fastify/routes/themes/list-themes.fastify.route";
import { ThemeRepositoryPrisma } from "./infrastructure/repositories/theme.repository.prisma";
import { ThemesFactory } from "./modules/themes/factories/themes.factory";
import prisma from "./package/prisma/prisma";
import { CreateThemesUsecase } from "./usecases/create-themes/create-themes.usecase";
import { ListThemesUsecase } from "./usecases/list-themes/list-themes.usecase";

function main() {
  
  const allRoutes = [
    ...ThemesFactory.makeRoutes()
  ];

  const port = 8000;

  const api = ApiFastify.create(allRoutes);

  api.start(port);
}

main();