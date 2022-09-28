-- AlterTable
ALTER TABLE "System" ADD COLUMN     "alias" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
