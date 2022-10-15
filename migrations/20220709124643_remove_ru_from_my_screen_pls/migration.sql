/*
  Warnings:

  - You are about to drop the column `locale` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "locale";

-- DropEnum
DROP TYPE "Locale";
