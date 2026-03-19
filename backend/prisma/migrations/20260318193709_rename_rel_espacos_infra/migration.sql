/*
  Warnings:

  - You are about to drop the `espacos_infras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "espacos_infras" DROP CONSTRAINT "espacos_infras_espaco_id_fkey";

-- DropForeignKey
ALTER TABLE "espacos_infras" DROP CONSTRAINT "espacos_infras_infra_id_fkey";

-- DropTable
DROP TABLE "espacos_infras";

-- CreateTable
CREATE TABLE "rel_espacos_infras" (
    "id" SERIAL NOT NULL,
    "espaco_id" INTEGER NOT NULL,
    "infra_id" INTEGER NOT NULL,

    CONSTRAINT "rel_espacos_infras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rel_espacos_infras" ADD CONSTRAINT "rel_espacos_infras_espaco_id_fkey" FOREIGN KEY ("espaco_id") REFERENCES "espacos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rel_espacos_infras" ADD CONSTRAINT "rel_espacos_infras_infra_id_fkey" FOREIGN KEY ("infra_id") REFERENCES "infraestruturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
