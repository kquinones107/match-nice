# Conecta Bonito

Experiencia interactiva creada con Next.js y React para coquetear con picardía, descubrir si hay química y diseñar una primera cita divertida.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador. No necesitas crear un archivo `.env` ni configurar servicios externos.

## Desplegar en Vercel

1. Descomprime este archivo.
2. Sube la carpeta a un repositorio de GitHub.
3. En Vercel selecciona **Add New → Project**.
4. Importa el repositorio.
5. Vercel detectará Next.js automáticamente; selecciona **Deploy**.

También puedes desplegar desde la terminal con:

```bash
npx vercel
```

## Contenido principal

- `app/page.tsx`: recorrido, respuestas coquetas y lógica de los ocho pasos.
- `app/globals.css`: diseño responsive y animaciones.
- `public/dates/`: ilustraciones de los planes de cita.

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- CSS responsive sin librerías visuales adicionales
