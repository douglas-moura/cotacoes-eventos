-- CreateTable
CREATE TABLE "infraestuturas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "icone" TEXT,

    CONSTRAINT "infraestuturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "infraestuturas_titulo_key" ON "infraestuturas"("titulo");
