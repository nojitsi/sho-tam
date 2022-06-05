/*
  Warnings:

  - You are about to drop the column `docsVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DocumentImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contact` to the `TradeAd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DocumentImage" DROP CONSTRAINT "DocumentImage_userId_fkey";

-- AlterTable
ALTER TABLE "TradeAd" ADD COLUMN     "contact" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "docsVerified",
DROP COLUMN "phone";

-- DropTable
DROP TABLE "DocumentImage";
