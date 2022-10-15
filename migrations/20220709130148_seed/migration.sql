-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_parentId_fkey";

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "parentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
