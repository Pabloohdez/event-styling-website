-- Galería: agrupada por evento (un recuadro por grupo; al pinchar se abre modal con todas las fotos/vídeos).
-- Antes ejecuta add-gallery-groups.sql en Supabase para añadir columnas group_slug y group_title.
INSERT INTO gallery_items (id, title, slug, description, category, image_url, video_url, "order", group_slug, group_title, created_at, updated_at) VALUES
-- Grupo: Exterior peluquería (3 fotos)
(gen_random_uuid(), 'Exterior peluquería', 'afuera-peluqueria-1', 'Decoración exterior evento peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/afuera%20peluqueria.jpeg', NULL, 1, 'exterior-peluqueria', 'Exterior peluquería', now(), now()),
(gen_random_uuid(), 'Exterior peluquería', 'afuera-peluqueria-2', 'Vista exterior decoración peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/afuera%20peluqeria%202.jpeg', NULL, 2, 'exterior-peluqueria', 'Exterior peluquería', now(), now()),
(gen_random_uuid(), 'Exterior peluquería', 'afuera-peluqueria-3', 'Detalle exterior evento apertura.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/afuera%20peluqueria3.jpeg', NULL, 3, 'exterior-peluqueria', 'Exterior peluquería', now(), now()),
-- Grupo: Baby shower (6 fotos)
(gen_random_uuid(), 'Baby shower', 'baby-shower-1', 'Decoración baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower.jpeg', NULL, 4, 'baby-shower', 'Baby shower', now(), now()),
(gen_random_uuid(), 'Baby shower', 'baby-shower-2', 'Mesa y detalles baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower%202.jpeg', NULL, 5, 'baby-shower', 'Baby shower', now(), now()),
(gen_random_uuid(), 'Baby shower', 'baby-shower-3', 'Ambientación baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower%203.jpeg', NULL, 6, 'baby-shower', 'Baby shower', now(), now()),
(gen_random_uuid(), 'Baby shower', 'baby-shower-4', 'Detalles mesa baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower4.jpeg', NULL, 7, 'baby-shower', 'Baby shower', now(), now()),
(gen_random_uuid(), 'Baby shower', 'baby-shower-5', 'Photocall baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower5.jpeg', NULL, 8, 'baby-shower', 'Baby shower', now(), now()),
(gen_random_uuid(), 'Baby shower', 'baby-shower-6', 'Rincón baby shower.', 'baby-shower', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower6.jpeg', NULL, 9, 'baby-shower', 'Baby shower', now(), now()),
-- Grupo: Cumpleaños Amelia (2 vídeos)
(gen_random_uuid(), 'Cumpleaños Amelia', 'video-amelia', 'Vídeo Cumpleaños Amelia.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower.jpeg', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/amelia5.mp4', 10, 'cumpleanos-amelia', 'Cumpleaños Amelia', now(), now()),
(gen_random_uuid(), 'Cumpleaños Amelia', 'video-amelia-2', 'Vídeo Cumpleaños Amelia.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/baby%20shower%202.jpeg', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/amelia52.mp4', 11, 'cumpleanos-amelia', 'Cumpleaños Amelia', now(), now()),
-- Sin grupo (1 recuadro): Halloween
(gen_random_uuid(), 'Fiesta Halloween', 'halloween', 'Decoración Halloween.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/hallowen.jpeg', NULL, 12, 'halloween', 'Fiesta Halloween', now(), now()),
-- Grupo: Cumpleaños oso y detalles (oso 1,2,3 + parque; sin imagen cumpleaños 5)
(gen_random_uuid(), 'Cumpleaños oso y detalles', 'oso-cumpleanos-1', 'Fiesta temática oso.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/oso2jpeg.jpeg', NULL, 13, 'cumpleanos-oso', 'Cumpleaños oso y detalles', now(), now()),
(gen_random_uuid(), 'Cumpleaños oso y detalles', 'oso-cumpleanos-2', 'Detalles temática oso.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/oso3.jpeg', NULL, 14, 'cumpleanos-oso', 'Cumpleaños oso y detalles', now(), now()),
(gen_random_uuid(), 'Cumpleaños oso y detalles', 'oso-cumpleanos-3', 'Mesa cumpleaños oso.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/oso4.jpeg', NULL, 15, 'cumpleanos-oso', 'Cumpleaños oso y detalles', now(), now()),
(gen_random_uuid(), 'Cumpleaños oso y detalles', 'parque', 'Decoración evento en parque.', 'cumpleanos', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/parque.jpeg', NULL, 16, 'cumpleanos-oso', 'Cumpleaños oso y detalles', now(), now()),
-- Grupo: Evento peluquería (2 fotos + 2 vídeos)
(gen_random_uuid(), 'Evento peluquería', 'peluqueria-1', 'Decoración evento peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/peluqueria.jpeg', NULL, 17, 'evento-peluqueria', 'Evento peluquería', now(), now()),
(gen_random_uuid(), 'Evento peluquería', 'peluqueria-2', 'Detalle evento peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/peluqueria2.jpeg', NULL, 18, 'evento-peluqueria', 'Evento peluquería', now(), now()),
(gen_random_uuid(), 'Evento peluquería', 'video-peluqueria-1', 'Vídeo montaje evento peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/peluqueria.jpeg', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/video%20peluqueria%20(1).mp4', 19, 'evento-peluqueria', 'Evento peluquería', now(), now()),
(gen_random_uuid(), 'Evento peluquería', 'video-peluqueria-2', 'Vídeo evento peluquería.', 'eventos-puntuales', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/peluqueria2.jpeg', 'https://ufodajxyfpstyrkvreyo.supabase.co/storage/v1/object/public/imagenes%20y%20videos/video%20peluqueria.mp4', 20, 'evento-peluqueria', 'Evento peluquería', now(), now())
ON CONFLICT (slug) DO UPDATE SET
  group_slug = EXCLUDED.group_slug,
  group_title = EXCLUDED.group_title,
  title = EXCLUDED.title,
  updated_at = now();

-- Servicios: tipos de eventos que ofrece la diseñadora
-- Ejecutar en Supabase → SQL Editor (o en Prisma Studio no se pueden ejecutar múltiples INSERT así; mejor en SQL Editor)

INSERT INTO services (id, title, slug, description, icon, "order", created_at, updated_at) VALUES
(gen_random_uuid(), 'Cumpleaños', 'cumpleanos', 'Diseño y decoración de cumpleaños para todas las edades. Mesas dulces, centros de mesa, photocalls y ambientación a medida.', '🎂', 1, now(), now()),
(gen_random_uuid(), 'Baby Shower', 'baby-shower', 'Celebración del bebé que está por llegar. Decoración temática, detalles personalizados y un ambiente único para el gran día.', '👶', 2, now(), now()),
(gen_random_uuid(), 'Revelación de sexo', 'revelacion-de-sexo', 'Organización y decoración para tu fiesta de revelación de sexo. Ideas creativas y montaje completo.', '🎀', 3, now(), now()),
(gen_random_uuid(), 'Bodas', 'bodas', 'Decoración nupcial: ceremonia, banquete, photocall y detalles que hacen de tu boda un día inolvidable.', '💒', 4, now(), now()),
(gen_random_uuid(), 'Comuniones', 'comuniones', 'Ambientación para comuniones y celebraciones religiosas. Elegancia y buen gusto adaptados a tu estilo.', '⛪', 5, now(), now()),
(gen_random_uuid(), 'Cenas de empresa', 'cenas-de-empresa', 'Eventos corporativos: cenas, team building y reuniones. Profesionalidad y diseño que refuerza tu marca.', '🏢', 6, now(), now()),
(gen_random_uuid(), 'Eventos puntuales', 'eventos-puntuales', 'Halloween, Navidad, San Valentín y otras fechas señaladas. Decoración temática para cada ocasión.', '🎃', 7, now(), now())
ON CONFLICT (slug) DO NOTHING;

-- Paquetes de tarifas: -30% en todos. "Por horas" primero y destacado (incluye materiales).
INSERT INTO pricing_packages (id, name, slug, description, price, features, highlighted, "order", created_at, updated_at) VALUES
-- Destacado y primero: Por horas (incluye materiales)
(gen_random_uuid(), 'Por horas', 'por-horas', 'Flexible: pago por horas de montaje y presencia. Incluye materiales.', 32, ARRAY[
  'Mínimo 2 horas',
  'Incluye mano de obra y materiales',
  'Ideal para eventos cortos o pruebas'
], true, 1, now(), now()),
-- Por nivel de servicio
(gen_random_uuid(), 'Básico', 'basico', 'Ideal para eventos íntimos o presupuesto ajustado.', 139, ARRAY[
  'Consulta y propuesta personalizada',
  'Decoración de mesa principal',
  'Hasta 2 horas de montaje',
  'Desplazamiento en Tenerife (incluido)'
], false, 2, now(), now()),
(gen_random_uuid(), 'Completo', 'completo', 'Lo más demandado: decoración completa sin sorpresas.', 314, ARRAY[
  'Todo lo del pack Básico',
  'Photocall o rincón temático',
  'Centros de mesa y detalles',
  'Hasta 4 horas de montaje y desmontaje',
  'Coordinación el día del evento'
], false, 3, now(), now()),
(gen_random_uuid(), 'Premium', 'premium', 'Bodas, comuniones y eventos grandes. Atención total.', 629, ARRAY[
  'Todo lo del pack Completo',
  'Decoración de ceremonia y banquete',
  'Mesas dulces o barra de cócteles',
  'Montaje y desmontaje completo',
  'Soporte previo y el día del evento'
], false, 4, now(), now()),
-- Por tipo de evento
(gen_random_uuid(), 'Pack Baby Shower', 'pack-baby-shower', 'Todo incluido para tu baby shower: mesa, photocall y detalles temáticos.', 244, ARRAY[
  'Mesa principal decorada',
  'Photocall con elementos temáticos',
  'Detalles de mesa (nombre, favores)',
  'Montaje y desmontaje',
  'Hasta 25 invitados'
], false, 5, now(), now()),
(gen_random_uuid(), 'Pack Revelación de sexo', 'pack-revelacion-sexo', 'Fiesta de revelación lista: globos, mesa y photocall.', 195, ARRAY[
  'Montaje revelación (globos/caja/etc.)',
  'Mesa dulce o salada',
  'Photocall temático',
  'Hasta 3 horas en el evento'
], false, 6, now(), now()),
(gen_random_uuid(), 'Pack Cumpleaños', 'pack-cumpleanos', 'Cumpleaños infantil o adulto con decoración a medida.', 160, ARRAY[
  'Mesa de dulces o principal',
  'Centros de mesa',
  'Photocall o rincón foto',
  'Temática a elegir'
], false, 7, now(), now()),
(gen_random_uuid(), 'Pack Boda', 'pack-boda', 'Decoración nupcial completa: ceremonia, banquete y photocall.', 909, ARRAY[
  'Ceremonia (arco, pasillo, detalles)',
  'Decoración de mesas de banquete',
  'Mesas dulces o barra',
  'Photocall nupcial',
  'Coordinación día de la boda'
], false, 8, now(), now()),
(gen_random_uuid(), 'Pack Comunión', 'pack-comunion', 'Ambientación elegante para comunión o celebración religiosa.', 384, ARRAY[
  'Mesa principal e invitados',
  'Photocall o rincón',
  'Detalles personalizados',
  'Montaje y desmontaje'
], false, 9, now(), now()),
(gen_random_uuid(), 'Pack Cena de empresa', 'pack-cena-empresa', 'Evento corporativo con imagen profesional.', 454, ARRAY[
  'Decoración de sala/mesas',
  'Branding o detalles de empresa',
  'Montaje discreto y desmontaje',
  'Hasta 4 horas en el evento'
], false, 10, now(), now()),
-- Servicios sueltos / a la carta
(gen_random_uuid(), 'Solo Photocall', 'solo-photocall', 'Solo el rincón de fotos: montaje y desmontaje.', 104, ARRAY[
  'Diseño del photocall',
  'Montaje en el lugar',
  'Desmontaje incluido',
  'Ideal para sumar a tu fiesta'
], false, 11, now(), now()),
(gen_random_uuid(), 'Solo mesa dulce', 'solo-mesa-dulce', 'Mesa dulce decorada; tú pones la comida o la encargamos.', 132, ARRAY[
  'Estructura y decoración de mesa',
  'No incluye dulces/comida',
  'Montaje y desmontaje'
], false, 12, now(), now()),
(gen_random_uuid(), 'Asesoría + diseño', 'asesoria-diseno', 'Te doy el plan y tú montas; ahorras en mano de obra.', 55, ARRAY[
  'Consulta y moodboard',
  'Lista de materiales y dónde comprar',
  'Guía de montaje paso a paso',
  'Soporte por WhatsApp el día del evento'
], false, 13, now(), now()),
(gen_random_uuid(), 'Express / último momento', 'express', 'Con poca antelación: decoración básica en 48–72 h.', 188, ARRAY[
  'Reserva con 2–3 días de antelación',
  'Mesa principal + photocall simple',
  'Material disponible en stock',
  'Desplazamiento en Tenerife'
], false, 14, now(), now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  highlighted = EXCLUDED.highlighted,
  "order" = EXCLUDED."order",
  updated_at = now();
