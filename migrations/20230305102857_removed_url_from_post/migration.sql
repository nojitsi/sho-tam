/*
  Warnings:

  - You are about to drop the column `url` on the `TradeAd` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TradeAd_url_key";

-- AlterTable
ALTER TABLE "TradeAd" DROP COLUMN "url";
