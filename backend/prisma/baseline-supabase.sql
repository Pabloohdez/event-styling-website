-- Ejecutar una vez en Supabase (SQL Editor) para que Prisma reconozca
-- las tablas ya creadas y deje de fallar con P3005.
-- Después: docker-compose restart backend

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id" VARCHAR(36) PRIMARY KEY NOT NULL,
  "checksum" VARCHAR(64) NOT NULL,
  "finished_at" TIMESTAMPTZ,
  "migration_name" VARCHAR(255) NOT NULL,
  "logs" TEXT,
  "rolled_back_at" TIMESTAMPTZ,
  "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "_prisma_migrations" (
  "id",
  "checksum",
  "finished_at",
  "migration_name",
  "logs",
  "rolled_back_at",
  "started_at",
  "applied_steps_count"
)
SELECT
  gen_random_uuid()::text,
  '20e5f8ac3776cf0faf6b00f772bc7f4bd295387d6ad501755d93f89a9da7df9a',
  now(),
  '20250316000000_init',
  NULL,
  NULL,
  now(),
  1
WHERE NOT EXISTS (
  SELECT 1 FROM "_prisma_migrations" WHERE "migration_name" = '20250316000000_init'
);
