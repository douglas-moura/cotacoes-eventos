/*
  Warnings:

  - You are about to drop the `Acessos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Acessos";

-- CreateTable
CREATE TABLE "acessos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "data_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acessos_pkey" PRIMARY KEY ("id")
);
