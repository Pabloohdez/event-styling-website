# Tenerife Event Styling - Full-Stack & Dockerized CMS

## 📖 Descripción del Proyecto

Plataforma web Full-Stack desarrollada a medida para una diseñadora de eventos e interiores en Tenerife, Islas Canarias. El negocio está especializado en la creación de entornos inmersivos y decoración 100% personalizada, con un fuerte enfoque en *Baby Showers* y eventos exclusivos.

Este proyecto va más allá de un simple portafolio digital. Cuenta con una vista de cliente (Frontend) optimizada para la conversión, respaldada por un gestor de contenidos a medida (Backend) que permite a la propietaria subir nuevas galerías, gestionar presupuestos y actualizar sus servicios. Toda la arquitectura está contenerizada con Docker para garantizar un despliegue predecible en cualquier entorno.

## ✨ Características Principales

- **Arquitectura Contenerizada:** Aplicación completamente empaquetada con Docker y orquestada con Docker Compose para un entorno de desarrollo y producción idénticos.
- **Galería Dinámica Autogestionable:** Los clientes exploran los diseños de *baby showers*, alimentados en tiempo real desde la base de datos en Supabase.
- **Panel de Administración (CMS):** Acceso seguro para que la diseñadora suba imágenes y gestione el contenido sin necesidad de saber código.
- **Tipado Estricto End-to-End:** Uso de TypeScript tanto en el cliente como en el servidor.
- **Arquitectura de Base de Datos Moderna:** Integración fluida con PostgreSQL utilizando Prisma ORM para un modelado de datos seguro y eficiente.

## 🛠️ Stack Tecnológico

**Frontend:**
- Angular + TypeScript (Vite)
- Tailwind CSS

**Backend & Base de Datos:**
- NestJS (TypeScript)
- PostgreSQL (Supabase)
- Prisma ORM

**DevOps & Infraestructura:**
- Docker & Docker Compose
- CI/CD [Opcional: GitHub Actions / Vercel]
