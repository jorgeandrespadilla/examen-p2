# Examen P2: Integración con API

Esta API fue creada usando Node.js (versión 20), Express y Prisma ORM. La base de datos usada es PostgreSQL.

## Instalación

Para instalar las dependencias del proyecto, ejecutar el siguiente comando:

```bash
npm install
```

## Configuración

1. Crear una base de datos PostgreSQL en un servidor local o remoto.

2. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
DATABASE_URL="postgresql://<usuario>:<clave>@<host>:<puerto>/<nombre de la base de datos>?schema=public"
```

> Ver `.env.example` como ejemplo.

1. Ejecutar el siguiente comando en la raíz del proyecto para ejecutar las migraciones de la base de datos:

```bash
npm run db:init
```

> Este comando ejecuta las migraciones de la base de datos e inicializa los datos de prueba.

## Ejecución

Correr el proyecto en modo desarrollo:

```bash
npm run dev
```