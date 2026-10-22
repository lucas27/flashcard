-- CreateEnum
CREATE TYPE "TextColor" AS ENUM ('ROXO', 'AZUL', 'VERDE', 'ROSA', 'LARANJA');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('ARIAL', 'ROBOTO', 'INTER');

-- CreateTable
CREATE TABLE "Themes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashCard" (
    "id" BIGSERIAL NOT NULL,
    "question" VARCHAR(100) NOT NULL,
    "ask" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme_id" INTEGER NOT NULL,

    CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardDesign" (
    "id" SERIAL NOT NULL,
    "cardId" BIGINT NOT NULL,
    "textColor" "TextColor" NOT NULL,
    "font" "Font" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionDesign" (
    "id" SERIAL NOT NULL,
    "questionsId" BIGINT NOT NULL,
    "textColor" "TextColor" NOT NULL,
    "font" "Font" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" BIGSERIAL NOT NULL,
    "questionStem" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alternatives" (
    "id" BIGSERIAL NOT NULL,
    "questionId" BIGINT NOT NULL,
    "options" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "Alternatives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardDesign_cardId_key" ON "CardDesign"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionDesign_questionsId_key" ON "QuestionDesign"("questionsId");

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardDesign" ADD CONSTRAINT "CardDesign_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "FlashCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionDesign" ADD CONSTRAINT "QuestionDesign_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternatives" ADD CONSTRAINT "Alternatives_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
