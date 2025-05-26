/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber,inventoryId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_serialNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Item_serialNumber_inventoryId_key" ON "Item"("serialNumber", "inventoryId");
