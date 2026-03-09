-- AlterTable
ALTER TABLE "users" ALTER COLUMN "data_nasc" DROP NOT NULL,
ALTER COLUMN "data_nasc" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Acessos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "data_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acessos_pkey" PRIMARY KEY ("id")
);
