import { ApiFastify } from "./infrastructure/api/fastify/api.fastify";
import { FlashCardFactory } from "./modules/flashcard/factories/flashcard.factory";
import { QuestionsFactory } from "./modules/questions/factories/questions.factory";
import { ThemesFactory } from "./modules/themes/factories/themes.factory";

function main() {
  
  const allRoutes = [
    ...QuestionsFactory.makeRoutes(),
    ...FlashCardFactory.makeRoutes(),
    ...ThemesFactory.makeRoutes()
  ];

  const port = 8000;

  const api = ApiFastify.create(allRoutes);

  api.start(port);
}

main();