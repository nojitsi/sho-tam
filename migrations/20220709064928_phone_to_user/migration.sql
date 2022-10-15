/*
  Warnings:

  - Added the required column `locale` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Made the column `parentId` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `phonepho` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('UA', 'RU');

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_parentId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "locale" "Locale" NOT NULL,
ALTER COLUMN "parentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phonepho" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
