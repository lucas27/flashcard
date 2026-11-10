/*
  Warnings:

  - Added the required column `sub_topic_id` to the `flashcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_topic_id` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flashcard" ADD COLUMN     "sub_topic_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "sub_topic_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sub_topics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_topics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_topics_name_key" ON "sub_topics"("name");

-- AddForeignKey
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_sub_topic_id_fkey" FOREIGN KEY ("sub_topic_id") REFERENCES "sub_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_sub_topic_id_fkey" FOREIGN KEY ("sub_topic_id") REFERENCES "sub_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
