/*
  Warnings:

  - You are about to drop the column `added` on the `UserGame` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "completedTime" DATETIME,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userSystemId" TEXT NOT NULL,
    CONSTRAINT "UserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGame_userSystemId_fkey" FOREIGN KEY ("userSystemId") REFERENCES "UserGameSystem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserGame" ("completed", "completedTime", "gameId", "id", "userId", "userSystemId") SELECT "completed", "completedTime", "gameId", "id", "userId", "userSystemId" FROM "UserGame";
DROP TABLE "UserGame";
ALTER TABLE "new_UserGame" RENAME TO "UserGame";
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "main" INTEGER,
    "extras" INTEGER,
    "completionist" INTEGER,
    "description" TEXT,
    "usReleaseDate" DATETIME,
    "euReleaseDate" DATETIME,
    "jpReleaseDate" DATETIME,
    "publisherId" TEXT,
    "developerId" TEXT,
    CONSTRAINT "Game_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Game_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("completionist", "description", "developerId", "euReleaseDate", "extras", "id", "jpReleaseDate", "main", "name", "publisherId", "usReleaseDate") SELECT "completionist", "description", "developerId", "euReleaseDate", "extras", "id", "jpReleaseDate", "main", "name", "publisherId", "usReleaseDate" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
