/*
  Warnings:

  - A unique constraint covering the columns `[ciudad]` on the table `GeoreferenciaCiudad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GeoreferenciaCiudad_ciudad_key" ON "GeoreferenciaCiudad"("ciudad");
