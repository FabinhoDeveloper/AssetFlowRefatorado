/*
  Warnings:

  - You are about to drop the column `itemId` on the `Exclusao` table. All the data in the column will be lost.
  - Added the required column `categoriaItem` to the `Exclusao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeItem` to the `Exclusao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroSerieItem` to the `Exclusao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exclusao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeItem" TEXT NOT NULL,
    "categoriaItem" TEXT NOT NULL,
    "numeroSerieItem" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "dataDeExclusao" DATETIME NOT NULL,
    "workspaceId" TEXT NOT NULL,
    CONSTRAINT "Exclusao_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Exclusao" ("dataDeExclusao", "id", "motivo", "responsavel", "workspaceId") SELECT "dataDeExclusao", "id", "motivo", "responsavel", "workspaceId" FROM "Exclusao";
DROP TABLE "Exclusao";
ALTER TABLE "new_Exclusao" RENAME TO "Exclusao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
