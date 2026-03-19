/*
  Warnings:

  - You are about to drop the `infraestuturas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "infraestuturas";

-- CreateTable
CREATE TABLE "infraestruturas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "icone" TEXT,

    CONSTRAINT "infraestruturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "infraestruturas_titulo_key" ON "infraestruturas"("titulo");
