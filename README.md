# salcristal

Rediseño del sitio web de **Sal Cristal** (Indusalca, Uribia – La Guajira).

## Stack
Vite + React + React Router + GSAP/ScrollTrigger + Lenis.

## Desarrollo
```bash
npm install
npm run dev     # http://localhost:5205
npm run build
```

## Estructura
- `src/pages/` — páginas (Home, productos, fichas, nosotros, historia, infraestructura, origen, contacto, políticas)
- `src/sections/` — secciones del Home (hero, showcase de productos, origen, industrial…)
- `src/components/` — componentes reutilizables (header, footer, PageHero, tarjetas, formulario)
- `src/data.js` y `src/pages/catalogoData.js` — contenido y colores de productos
- `public/img/` — empaques, fotos e ilustraciones originales de Sal Cristal
- `public/fonts/` — Sherman Display (tipografía de la marca; confirmar licencia web)
- `docs/DIRECCION-SAL-CRISTAL.md` — auditoría, dirección de arte, estado y pendientes
