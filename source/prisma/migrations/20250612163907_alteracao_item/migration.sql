/*
  Warnings:

  - You are about to drop the `Setor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UsuarioToWorkspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `atribuidoA` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `setorId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_UsuarioToWorkspace_B_index";

-- DropIndex
DROP INDEX "_UsuarioToWorkspace_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Setor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UsuarioToWorkspace";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataDeCompra" DATETIME NOT NULL,
    "workspaceId" TEXT NOT NULL,
    CONSTRAINT "Item_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("categoria", "dataDeCompra", "descricao", "id", "local", "nome", "numeroSerie", "valor") SELECT "categoria", "dataDeCompra", "descricao", "id", "local", "nome", "numeroSerie", "valor" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Workspace_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Workspace" ("cor", "descricao", "id", "nome") SELECT "cor", "descricao", "id", "nome" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new_Workspace" RENAME TO "Workspace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
