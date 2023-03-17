/*
  Warnings:

  - You are about to drop the `TradeAdKitItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TradeAdKitItems" DROP CONSTRAINT "TradeAdKitItems_tradeAdId_fkey";

-- AlterTable
ALTER TABLE "TradeAd" ADD COLUMN     "kit" TEXT[];

-- DropTable
DROP TABLE "TradeAdKitItems";
