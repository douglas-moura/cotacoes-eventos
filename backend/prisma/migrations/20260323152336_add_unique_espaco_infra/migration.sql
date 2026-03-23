/*
  Warnings:

  - A unique constraint covering the columns `[espaco_id,infra_id]` on the table `rel_espacos_infras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rel_espacos_infras_espaco_id_infra_id_key" ON "rel_espacos_infras"("espaco_id", "infra_id");
