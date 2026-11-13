/*
  Warnings:

  - A unique constraint covering the columns `[theme_id]` on the table `sub_topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `theme_id` to the `sub_topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_topics" ADD COLUMN     "theme_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sub_topics_theme_id_key" ON "sub_topics"("theme_id");

-- AddForeignKey
ALTER TABLE "sub_topics" ADD CONSTRAINT "sub_topics_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
