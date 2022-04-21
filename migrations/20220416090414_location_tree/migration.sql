/*
  Warnings:

  - You are about to drop the column `typeId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `LocationType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_typeId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "typeId",
ADD COLUMN     "parentId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "LocationType";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
