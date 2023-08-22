-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Publisher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "foundingDate" DATETIME,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "Publisher_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Publisher" ("foundingDate", "id", "name") SELECT "foundingDate", "id", "name" FROM "Publisher";
DROP TABLE "Publisher";
ALTER TABLE "new_Publisher" RENAME TO "Publisher";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
