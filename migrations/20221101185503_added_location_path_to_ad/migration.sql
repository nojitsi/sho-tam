/*
  Warnings:

  - Added the required column `locationPath` to the `TradeAd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TradeAd" ADD COLUMN     "locationPath" TEXT NOT NULL;
