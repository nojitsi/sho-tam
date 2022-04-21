/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `TradeAd` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TradeAd_url_key" ON "TradeAd"("url");
