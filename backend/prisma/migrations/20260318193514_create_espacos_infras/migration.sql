-- CreateTable
CREATE TABLE "espacos_infras" (
    "id" SERIAL NOT NULL,
    "espaco_id" INTEGER NOT NULL,
    "infra_id" INTEGER NOT NULL,

    CONSTRAINT "espacos_infras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "espacos_infras" ADD CONSTRAINT "espacos_infras_espaco_id_fkey" FOREIGN KEY ("espaco_id") REFERENCES "espacos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "espacos_infras" ADD CONSTRAINT "espacos_infras_infra_id_fkey" FOREIGN KEY ("infra_id") REFERENCES "infraestruturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
