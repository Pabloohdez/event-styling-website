# Event Styling Tenerife

Web profesional para una diseñadora de eventos en Tenerife: galería, servicios, tarifas competitivas y contacto. Desplazamiento disponible.

## Stack

- **Frontend:** Angular 19 + TypeScript (diseño claro y fino)
- **Backend:** NestJS + TypeScript
- **Base de datos:** PostgreSQL (Supabase o contenedor local)
- **Contenedores:** Docker + Docker Compose

## Cómo ejecutar

```bash
# Construir y levantar todo (frontend, backend, PostgreSQL)
docker-compose up --build
```

- **Web:** http://localhost:4200  
- **API:** http://localhost:3000 (el frontend llama a `/api/*`, proxy vía nginx)

### Usar Supabase en lugar de la base local

1. Crea un proyecto en [Supabase](https://supabase.com) y copia la connection string (URI) de PostgreSQL.
2. Crea un archivo `.env` en la raíz del repo (opcional):

   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```

3. Levanta solo frontend y backend (sin contenedor `db`): comenta o elimina el servicio `db` y la dependencia `depends_on` del backend en `docker-compose.yml`, y define `DATABASE_URL` con la URL de Supabase.
4. Ejecuta las migraciones una vez contra Supabase (desde tu máquina, con `npx prisma migrate deploy` y `DATABASE_URL` apuntando a Supabase), o mantén el servicio `db` para desarrollo y en producción usa solo Supabase.

## Estructura

- `frontend/` — Angular (páginas: Inicio, Servicios, Galería, Tarifas, Contacto)
- `backend/` — NestJS (API REST, Prisma, módulos gallery, services, pricing, contact)
- `docker-compose.yml` — orquestación de los tres servicios

## Desplegar en Google (Firebase + Cloud Run)

Para dejar la web en producción (Firebase Hosting + Cloud Run, base de datos en Supabase), sigue la guía **[DEPLOY.md](DEPLOY.md)**. Antes de desplegar, revisa **[SECURITY.md](SECURITY.md)** (CORS, rate limiting, secretos).

## Datos iniciales

La base arranca vacía. Para tener galería, servicios y tarifas visibles hay que insertar datos (por ejemplo con Prisma Studio: `cd backend && npx prisma studio`, o con seeds que puedes añadir en `backend/prisma/seed.ts`).
