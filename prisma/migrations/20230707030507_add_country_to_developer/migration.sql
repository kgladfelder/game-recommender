/*
  Warnings:

  - Added the required column `countryId` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Developer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "foundingDate" DATETIME,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "Developer_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Developer" ("foundingDate", "id", "name") SELECT "foundingDate", "id", "name" FROM "Developer";
DROP TABLE "Developer";
ALTER TABLE "new_Developer" RENAME TO "Developer";
CREATE UNIQUE INDEX "Developer_name_key" ON "Developer"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
