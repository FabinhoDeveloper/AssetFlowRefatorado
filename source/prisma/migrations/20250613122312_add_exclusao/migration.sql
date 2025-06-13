-- CreateTable
CREATE TABLE "Exclusao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataDeExclusao" DATETIME NOT NULL,
    "motivo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Exclusao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Exclusao_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Exclusao_itemId_key" ON "Exclusao"("itemId");
