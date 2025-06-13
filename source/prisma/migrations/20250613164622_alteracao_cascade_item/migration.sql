-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exclusao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataDeExclusao" DATETIME NOT NULL,
    "motivo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Exclusao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "Exclusao_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Exclusao" ("dataDeExclusao", "id", "itemId", "motivo", "responsavel", "workspaceId") SELECT "dataDeExclusao", "id", "itemId", "motivo", "responsavel", "workspaceId" FROM "Exclusao";
DROP TABLE "Exclusao";
ALTER TABLE "new_Exclusao" RENAME TO "Exclusao";
CREATE UNIQUE INDEX "Exclusao_itemId_key" ON "Exclusao"("itemId");
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
    CONSTRAINT "Item_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("categoria", "dataDeCompra", "descricao", "id", "local", "nome", "numeroSerie", "valor", "workspaceId") SELECT "categoria", "dataDeCompra", "descricao", "id", "local", "nome", "numeroSerie", "valor", "workspaceId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
