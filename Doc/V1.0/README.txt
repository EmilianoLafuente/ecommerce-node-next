# Ecommerce Educativo – Node.js + Express + Next.js

Proyecto educativo de ecommerce enfocado en arquitectura backend,
integrado con un frontend moderno en Next.js.

## Stack

### Backend
- Node.js
- Express
- API REST versionada (/api/v1)
- Persistencia en archivos JSON
- Arquitectura en capas (controllers / services / models)

### Frontend
- Next.js (App Router)
- Server Components + Client Components
- Context + Reducer para estado global
- Persistencia con localStorage

## Funcionalidades

- Catálogo de productos
- Detalle de producto
- Carrito persistente
- Validación de stock
- Checkout completo
- Creación y persistencia de órdenes
- Historial de estados de órdenes
- Panel admin (backend)

## Arquitectura

- Backend independiente del frontend
- Frontend consume API como contrato inmutable
- El backend es la única fuente de verdad
- El carrito vive en frontend (estado de UI)
- La orden se construye y valida en backend

## Reglas de negocio

- Una orden pendiente puede completarse o cancelarse
- Al completarse:
  - Se descuenta stock
- Al cancelarse:
  - Se restaura stock
- Órdenes cerradas no se modifican
- El frontend no envía precios ni descripciones

## Cómo ejecutar el proyecto

### Backend
```bash
cd ecommerce_basico
npm install
npm run dev
