/*
  Warnings:

  - A unique constraint covering the columns `[triggerId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trigger_triggerId_key" ON "Trigger"("triggerId");
