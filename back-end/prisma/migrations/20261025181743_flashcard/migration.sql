-- CreateEnum
CREATE TYPE "TextColor" AS ENUM ('ROXO', 'AZUL', 'VERDE', 'ROSA', 'LARANJA');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('ARIAL', 'ROBOTO', 'INTER');

-- CreateTable
CREATE TABLE "themes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashcard" (
    "id" BIGSERIAL NOT NULL,
    "question" VARCHAR(100) NOT NULL,
    "ask" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme_id" INTEGER NOT NULL,

    CONSTRAINT "flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_design" (
    "id" SERIAL NOT NULL,
    "cardId" BIGINT NOT NULL,
    "textColor" "TextColor" NOT NULL,
    "font" "Font" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_design" (
    "id" SERIAL NOT NULL,
    "questions_id" BIGINT NOT NULL,
    "textColor" "TextColor" NOT NULL,
    "font" "Font" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" BIGSERIAL NOT NULL,
    "questionStem" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme_id" INTEGER NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternatives" (
    "id" BIGSERIAL NOT NULL,
    "question_id" BIGINT NOT NULL,
    "options" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "alternatives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "themes_name_key" ON "themes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "card_design_cardId_key" ON "card_design"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "question_design_questions_id_key" ON "question_design"("questions_id");

-- AddForeignKey
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_design" ADD CONSTRAINT "card_design_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "flashcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_design" ADD CONSTRAINT "question_design_questions_id_fkey" FOREIGN KEY ("questions_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
