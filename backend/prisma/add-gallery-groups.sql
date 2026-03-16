-- Ejecutar en Supabase → SQL Editor (una sola vez)
-- Añade columnas para agrupar galería por evento (un recuadro por grupo, modal con todas las fotos/vídeos)

ALTER TABLE gallery_items
  ADD COLUMN IF NOT EXISTS group_slug TEXT,
  ADD COLUMN IF NOT EXISTS group_title TEXT;
