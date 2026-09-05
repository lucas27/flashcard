-- CreateEnum
CREATE TYPE "TextColor" AS ENUM ('ROXO', 'AZUL', 'VERDE', 'ROSA', 'LARANJA');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('ARIAL', 'ROBOTO', 'INTER');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "theme_id" BIGINT NOT NULL,
    "design_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "question" VARCHAR(100) NOT NULL,
    "ask" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "textColor" "TextColor" NOT NULL,
    "font" "Font" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
