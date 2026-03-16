/*
  Warnings:

  - Added the required column `cep` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enderecos" ADD COLUMN     "cep" INTEGER NOT NULL;
