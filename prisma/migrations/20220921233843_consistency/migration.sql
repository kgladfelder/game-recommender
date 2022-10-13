/*
  Warnings:

  - You are about to drop the column `SystemId` on the `GameSystem` table. All the data in the column will be lost.
  - Added the required column `systemId` to the `GameSystem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameSystem" DROP CONSTRAINT "GameSystem_SystemId_fkey";

-- AlterTable
ALTER TABLE "GameSystem" DROP COLUMN "SystemId",
ADD COLUMN     "systemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GameSystem" ADD CONSTRAINT "GameSystem_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
