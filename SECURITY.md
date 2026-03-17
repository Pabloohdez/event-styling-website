# Seguridad – Event Styling

Resumen de las medidas de seguridad aplicadas y qué configurar en producción (Google Cloud).

## Backend (NestJS)

### Cabeceras de seguridad (Helmet)
- **X-Content-Type-Options: nosniff** – Evita que el navegador interprete respuestas como otro MIME.
- **X-Frame-Options** – Reduce riesgo de clickjacking.
- **Strict-Transport-Security (HSTS)** – Solo en producción si se sirve por HTTPS (Cloud Run lo hace).
- **Content-Security-Policy** – Activada en producción (Helmet por defecto).

### CORS
- En producción se usan **solo** los orígenes indicados en la variable de entorno `FRONTEND_ORIGIN` (lista separada por comas).
- Ejemplo: `FRONTEND_ORIGIN=https://tu-proyecto.web.app,https://tu-proyecto.firebaseapp.com`
- Si no se define, se permiten `http://localhost:4200` y `http://localhost` para desarrollo.

### Rate limiting (Throttler)
- **API general:** 100 peticiones por minuto y 300 por 5 minutos por IP.
- **Formulario de contacto:** 5 envíos por minuto por IP (anti-spam).
- Detrás de proxy/Cloud Run se usa **trust proxy** para tomar la IP real del cliente.

### Validación de entradas
- **ValidationPipe** global con `whitelist`, `forbidNonWhitelisted` y `transform`.
- DTOs con **class-validator**: longitudes máximas en contacto (nombre, email, mensaje, etc.) para limitar tamaño de payloads.

### Base de datos
- Conexión vía **variable de entorno** `DATABASE_URL` (nunca en código).
- En Google Cloud Run se recomienda usar **Secret Manager** para `DATABASE_URL`.

---

## Frontend (Angular)

- No se almacenan secretos ni API keys en el frontend; las llamadas van a `/api/*`.
- **Meta referrer** `strict-origin-when-cross-origin` para no enviar referrer completo a terceros.
- Angular escapa por defecto el contenido en plantillas (mitigación XSS).

---

## Despliegue en Google

1. **Cloud Run**
   - Definir **FRONTEND_ORIGIN** con la URL de Firebase Hosting (y la alternativa `.firebaseapp.com`).
   - Usar **Secret Manager** para `DATABASE_URL`; no ponerla en variables de entorno en texto plano en la consola.

2. **Firebase Hosting**
   - Servir la app por **HTTPS** (Firebase lo ofrece por defecto).

3. **Supabase**
   - Usar **Session pooler** para la conexión.
   - En Supabase Dashboard, restringir acceso a la base si aplica (por red/IP) según tu necesidad.

---

## Checklist antes de producción

- [ ] `FRONTEND_ORIGIN` configurado en Cloud Run con la URL real del sitio.
- [ ] `DATABASE_URL` en Secret Manager (no en env en claro).
- [ ] `.env` no subido a Git (está en `.gitignore`).
- [ ] Probar el formulario de contacto (límite 5/min) y que CORS no bloquee peticiones desde el dominio desplegado.
