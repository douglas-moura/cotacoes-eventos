-- CreateTable
CREATE TABLE "espacos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "proprietario_id" INTEGER NOT NULL,
    "area" DOUBLE PRECISION,
    "capacidade" INTEGER,
    "ambientes" INTEGER,
    "quantidadeBanheiros" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "espacos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "referencia" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "espaco_id" INTEGER NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_espaco_id_key" ON "enderecos"("espaco_id");

-- AddForeignKey
ALTER TABLE "espacos" ADD CONSTRAINT "espacos_proprietario_id_fkey" FOREIGN KEY ("proprietario_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_espaco_id_fkey" FOREIGN KEY ("espaco_id") REFERENCES "espacos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
