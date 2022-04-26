/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "document";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "image";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_tradeAdId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropTable
DROP TABLE "File";

-- DropEnum
DROP TYPE "FileType";

-- CreateTable
CREATE TABLE "DocumentImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DocumentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeAdImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "tradeAdId" INTEGER NOT NULL,

    CONSTRAINT "TradeAdImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DocumentImage" ADD CONSTRAINT "DocumentImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeAdImage" ADD CONSTRAINT "TradeAdImage_tradeAdId_fkey" FOREIGN KEY ("tradeAdId") REFERENCES "TradeAd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
