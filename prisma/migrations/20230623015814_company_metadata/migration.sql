-- AlterTable
ALTER TABLE "Company" ADD COLUMN "foundingDate" DATETIME;

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN "foundingDate" DATETIME;

-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN "foundingDate" DATETIME;

-- AlterTable
ALTER TABLE "System" ADD COLUMN "euReleaseDate" DATETIME;
ALTER TABLE "System" ADD COLUMN "jpReleaseDate" DATETIME;
ALTER TABLE "System" ADD COLUMN "usReleaseDate" DATETIME;
