/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_serialNumber_key" ON "Item"("serialNumber");
