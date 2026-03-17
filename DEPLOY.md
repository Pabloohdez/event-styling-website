# Desplegar Event Styling en Google Cloud

Esta guía explica cómo dejar la web en vivo usando **Firebase Hosting** (frontend) y **Google Cloud Run** (backend). La base de datos sigue en **Supabase**.

## Requisitos previos

- Cuenta en [Google Cloud](https://console.cloud.google.com) y en [Firebase](https://console.firebase.google.com)
- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install) instalado
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- Docker instalado (para construir la imagen del backend)

---

## 1. Crear proyecto en Google Cloud / Firebase

1. Entra en [Firebase Console](https://console.firebase.google.com) y crea un proyecto (o usa uno existente). Si creas uno nuevo, Firebase usará el mismo proyecto en Google Cloud.
2. En [Google Cloud Console](https://console.cloud.google.com), selecciona ese proyecto y activa:
   - **Cloud Run API**
   - **Artifact Registry API** (o Container Registry)

---

## 2. Desplegar el backend (NestJS) en Cloud Run

El backend va en un contenedor; la base de datos sigue siendo Supabase.

### 2.1 Configurar gcloud

```bash
gcloud auth login
gcloud config set project TU_PROJECT_ID
```

### 2.2 Crear repositorio de imágenes (Artifact Registry)

```bash
gcloud artifacts repositories create event-styling --repository-format=docker --location=europe-west1
```

### 2.3 Construir y subir la imagen del backend

Desde la **raíz del proyecto** (donde está `docker-compose.yml`):

```bash
# Construir la imagen
docker build -t europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest ./backend

# Configurar Docker para usar gcloud como registro
gcloud auth configure-docker europe-west1-docker.pkg.dev --quiet

# Subir la imagen
docker push europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest
```

Sustituye `TU_PROJECT_ID` por el ID de tu proyecto de Google Cloud.

### 2.4 Desplegar en Cloud Run

Sustituye `TU_SITIO_WEB` por la URL real de Firebase (ej. `https://tu-proyecto.web.app`). Si tienes también dominio `.firebaseapp.com`, añádelo separado por coma.

```bash
gcloud run deploy event-styling-backend \
  --image europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,FRONTEND_ORIGIN=TU_SITIO_WEB" \
  --set-secrets "DATABASE_URL=DATABASE_URL:latest"
```

**Seguridad:** `FRONTEND_ORIGIN` restringe CORS al dominio de tu sitio. `DATABASE_URL` debe estar en Secret Manager (nunca en env en texto plano). Ver [SECURITY.md](SECURITY.md).

Te pedirá crear el secreto `DATABASE_URL` la primera vez. Puedes hacerlo así (con tu URL de Supabase):

```bash
echo -n "postgresql://postgres.xxx:TU_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require" | gcloud secrets create DATABASE_URL --data-file=-
```

O en la consola: **Secret Manager** → Crear secreto → nombre `DATABASE_URL`, valor = tu `DATABASE_URL` de Supabase (Session pooler).

Tras desplegar, anota la **URL del servicio** (ej. `https://event-styling-backend-xxxxx-ew.a.run.app`). La usarás en Firebase.

---

## 3. Desplegar el frontend (Angular) en Firebase Hosting

### 3.1 Primera vez: login y proyecto

Desde la **raíz del proyecto**:

```bash
firebase login
firebase use TU_PROJECT_ID
```

Sustituye `TU_PROJECT_ID` por el ID de tu proyecto de Firebase (Configuración del proyecto en la consola de Firebase). Puedes editarlo también en `.firebaserc`.

### 3.2 Build del frontend

Antes de cada deploy, genera los estáticos (Angular 19 los deja en `frontend/dist/event-styling/browser`):

```bash
cd frontend
npm run build
cd ..
```

### 3.3 Rewrites (API → Cloud Run)

El `firebase.json` de la raíz ya envía `/api/*` a Cloud Run. Comprueba que `serviceId` y `region` coincidan con el paso 2.4 (`event-styling-backend`, `europe-west1`).

### 3.4 Desplegar

Desde la raíz del proyecto:

```bash
firebase deploy
```

Al terminar, Firebase te dará la URL del sitio (ej. `https://tu-proyecto.web.app`). Esa es la URL pública de la web.

---

## 4. CORS (opcional pero recomendado)

En producción puedes restringir CORS al dominio de Firebase. En `backend/src/main.ts`:

```ts
app.enableCors({
  origin: ['https://tu-proyecto.web.app', 'https://tu-proyecto.firebaseapp.com'],
  credentials: true,
});
```

Luego vuelve a construir la imagen del backend y a desplegar en Cloud Run.

---

## 5. Resumen de URLs

| Dónde           | URL |
|-----------------|-----|
| Web (Firebase)  | `https://tu-proyecto.web.app` |
| API (Cloud Run) | `https://event-styling-backend-xxxxx-ew.a.run.app` (solo si llamas directo; en la web se usa `/api`) |
| Base de datos   | Supabase (Session pooler) |

---

## Actualizar la web después de cambios

**Backend:**

```bash
docker build -t europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest ./backend
docker push europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest
gcloud run deploy event-styling-backend --image europe-west1-docker.pkg.dev/TU_PROJECT_ID/event-styling/backend:latest --region europe-west1
```

**Frontend:**

```bash
cd frontend && npm run build
firebase deploy
```

Si quieres, el siguiente paso puede ser automatizar esto con **GitHub Actions** (build y deploy al hacer push a `main`).
