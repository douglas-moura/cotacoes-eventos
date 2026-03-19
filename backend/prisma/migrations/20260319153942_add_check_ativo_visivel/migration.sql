ALTER TABLE "espacos"
ADD CONSTRAINT "chk_ativo_visivel"
CHECK ("ativo" = true OR "visivel" = false);