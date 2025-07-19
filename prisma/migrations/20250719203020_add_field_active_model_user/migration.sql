/*
  Warnings:

  - You are about to drop the column `ativo` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "ativo",
ADD COLUMN     "active" BOOLEAN;
