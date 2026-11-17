# Rediseño Sal Cristal — Auditoría, dirección de arte y arquitectura

Fecha: 2026-11-17 · Fases 1 a 3 (todavía sin código)

---

## FASE 1 — Auditoría

### Sitio actual (salcristal.com)
- **Tecnología:** WordPress 7.1 + Elementor. No hay código para reutilizar: el rediseño se hace desde cero.
- **Colores reales:** azul marino institucional `#002753` (predomina), blanco, gris de texto `#333333`. El rosado `#CC3366` que aparece es el color de enlace por defecto del tema, **no es de la marca**. El sol del logo y la etiqueta «Nueva imagen» del empaque usan amarillo/dorado (falta el código exacto: hay que validarlo con el manual o el logo vectorial).
- **Tipografías:** Raleway (textos) y Sherman Display (titulares, de pago: hay que pedir los archivos o la licencia).
- **Navegación actual:** Inicio · Propósito · Productos (Consumo humano / Consumo industrial) · Conócenos (Nuestra historia / Infraestructura / Políticas) · Contacto.
- **Hero:** video de fondo (versión PC y móvil, ambos en la carpeta `Contenido/`).

### Información verificada que se conserva (nada inventado)
| Dato | Fuente |
|---|---|
| Productora, procesadora y comercializadora de sal para consumo humano, industrial y animal | Home / Quiénes somos |
| Uribia, La Guajira · más de 20 años de trayectoria | Home |
| 90 % de talento humano wayúu · +3.000 indígenas beneficiados · +500 familias wayúu | Contadores del Home |
| Instalaciones de 45.000 m²: planta de lavado, planta de producción, sede administrativa | Infraestructura |
| Certificación Kosher, aprobación FDA, ISO 22000:2018, HPC 420:2014, INVIMA | Políticas |
| Valores: Confiabilidad · Alta calidad · Ética, innovación y liderazgo · Comprometidos con nuestras comunidades | Quiénes somos |
| ODS: Fin de la pobreza · Salud y bienestar · Educación de calidad · Trabajo decente | Propósito |
| Historia de Indusalca: de empresa artesanal a industria formal | Nuestra historia |
| Razón social: Industrias Salineras del Caribe – INDUSALCA S.A.S. | Políticas |

**Productos de consumo humano** (sal marina yodada y fluorizada):
- Salero Sal Cristal — 150 g
- Bolsa Sal Cristal — 400 g · 500 g · 1 kg (humedad 0,2 %–0,3 % máx.)
- Saco Sal Cristal — 25 kg · 50 kg

**Productos de consumo industrial** (Sal Marina de la Guajira, «Pureza de origen natural»):
Molida blanca · Dry plus · Extraseca · Extrafina · Molida tipo A · Grano lavada · Industrial blanca · Extraseca granulada.

**Clientes con logo en el sitio actual:** Kikes, Italcol, Olímpica, Levapan, Colanta, Bucanero.

### Diagnóstico: problemas del sitio actual
1. **Parece una plantilla.** Todas las secciones siguen el mismo esquema de título, texto y «Ver más», con mucho espacio en blanco sin intención.
2. **El producto no se luce.** Los empaques tienen buen diseño (la ilustración wayúu, las montañas de sal), pero salen pequeños y sobre fondos planos.
3. **El origen no se cuenta.** La Guajira, las salinas y la comunidad wayúu son el mayor diferencial de la marca y casi no aparecen en el Home.
4. **Ventas industriales débiles.** Las 8 referencias industriales no tienen descripción ni aplicación, y el CTA comercial queda escondido.
5. **Inconsistencias que el cliente debe aclarar:** hay dos teléfonos y dos correos distintos (atencionalcliente@ y direccioncomercial@), el © dice 2025, el texto tiene errores («infraectructura», «inicio de manera»), las redes cambian entre páginas (X/TikTok frente a LinkedIn) y un enlace de LinkedIn está roto.
6. **Rendimiento:** dos videos de 20 MB y 37 MB cargan sin póster optimizado.

### Lo que tomamos de los referentes (sin copiarlos)
**Don Molinico** (Nuxt + GSAP + Lenis):
- Pantalla de carga con la marca a pantalla completa y entrada inmediata al hero.
- Tipografía gigante, centrada y en mayúsculas detrás del producto (`fs-340`): el producto queda «dentro» de la palabra.
- Sección fija con el producto (`home-sticky`) mientras el contenido cambia al hacer scroll.
- Alternancia de superficies: color de marca intenso y crema cálido.
- Cursor personalizado con texto en los elementos interactivos.

**Bucks Sauce** (tarjetas de producto):
- Una tarjeta de color sólido por producto, radio pequeño (10 px) y **sin sombra**.
- Un borde interior punteado, separado 10 px del borde y al 30 % de opacidad: le da un acabado de etiqueta.
- El nombre arriba, en display y mayúsculas con interlineado 0,9; el empaque centrado debajo, inclinado unos 3°.
- Las tarjetas entran escalonadas (translateY 40 px) y, al pasar el cursor, el empaque se endereza y sube.

---

## FASE 2 — Dirección de arte

### Concepto: «La esencia del mar, llevada a cada producto»
El recorrido de la página sigue el camino de la sal: **mar → salina → cristal → producto → mesa o industria**.
El elemento visual que distingue a la marca son **las montañas de sal y el diamante** que ya existen en el empaque y en el logo. Los usamos como sistema gráfico (máscaras, separadores y patrones), no como decoración suelta.

### Paleta (solo colores existentes y sus variaciones de tono)
| Token | Valor | Uso |
|---|---|---|
| `marino` | `#002753` | Color institucional: secciones oscuras, textos fuertes, botones |
| `marino-profundo` | `#001A38` | Sección industrial y footer (variante más oscura del marino) |
| `marino-medio` | `#1B4A80` | Hover y detalles sobre fondos oscuros |
| `cielo` | tono claro del marino (≈ `#DCE7F2`) | Superficies de tarjetas; toma el trazo azul claro de la ilustración del empaque |
| `sal` | blanco cálido (≈ `#F7F5F0`) | Fondo editorial claro (el «crema» de Don Molinico, en clave de sal) |
| `blanco` | `#FFFFFF` | Tarjetas de producto y texto sobre marino |
| `sol` | **pendiente de validar** | Solo como acento puntual (diamante, CTA), tomado del sol del logo |

Regla: el ritmo alterna claro y oscuro (sal → marino → sal → marino profundo). Nada de degradados decorativos.

### Tipografía
**Decisión del usuario (2026-11-17): se mantienen las dos tipografías actuales de la marca.**
- **Display:** Sherman Display, condensada y en mayúsculas. El sitio actual la nombra en su CSS pero no carga el archivo, así que hace falta pedirlo. El código ya la busca en `web/public/fonts/ShermanDisplay.woff2` (o `.otf`); mientras no esté, se ve **Antonio** (Google Fonts), la condensada libre más parecida. Como no tiene cursiva, el acento se hace con peso ligero.
- **Textos:** Raleway, con tamaño mínimo de 16 px y contraste AA.
- **Escala:** titulares gigantes que se ajustan al ancho (clamp de 64 a 280 px), H2 de 48 a 96 px, cuerpo de 16 a 18 px.

## Estado del desarrollo (2026-11-17)
- Home completo en `web/` (Vite + React + GSAP + Lenis), preview `sal-cristal` en http://localhost:5205: loader, header con mega menú y menú móvil, hero con video, productos, origen, consumo humano (sección fija), industrial, nosotros, compromiso, clientes, contacto y footer.
- Revisado en 1440 px y 390 px. Falta revisar en 768 px y 360 px.
- **Showcase de productos del Home (2026-11-17):** reemplazó las tarjetas. Salero · Bolsa · Saco · Molida blanca, con fondo, nombre gigante, empaque e información que cambian juntos. Los datos y colores de cada producto están en `showcase` dentro de `src/data.js`.
- **Catálogo /productos (2026-11-17):** nueva tarjeta `TarjetaDescubrir` (solo en esta página). En reposo muestra el empaque sobre color sólido; en hover, foco o primer toque aparece un marquee del nombre detrás, el empaque crece y entra el botón circular «Descubrir». Datos y colores en `src/pages/catalogoData.js`.
- **Bolsa recortada:** el PNG original del sitio traía un recuadro blanco opaco. Se quitó solo el blanco puro, sin tocar el empaque. El original queda en `public/img/productos/originales/`.
- **Páginas internas (2026-11-17):** `/productos`, `/productos/consumo-humano`, `/productos/consumo-industrial`, `/productos/:slug` (11 fichas), `/nosotros`, `/nosotros/historia`, `/nosotros/infraestructura`, `/nuestro-origen`, `/contacto` y `/politicas`. Tienen transición de cortina entre páginas.
- **Heros con las ilustraciones originales del sitio** (en `web/public/img/heros/`), con versión móvil vertical donde el original la tiene: Nosotros (salinas + mujer wayúu), Historia (paisaje + mujer wayúu), Infraestructura y Consumo industrial (banda transportadora), Consumo humano y Catálogo (paisaje + mujer con sombrero), Contacto (salinas + hombre con sombrero), Políticas (montañas de sal). Nuestro origen conserva la foto del original (Propósito no tiene ilustración).
- **Sherman Display ya es la fuente real:** estaba publicada en `wp-content/uploads/2024/12/Sherman-Display.ttf` y quedó en `web/public/fonts/ShermanDisplay.ttf`. Antonio queda solo como respaldo. La licencia web debe confirmarla el cliente.
- El formulario de contacto no envía datos: falta conectarlo.
- Las redes sociales y los enlaces legales apuntan a `#`.

### Estilo fotográfico
Video y fotos reales de las salinas (vistas aéreas y montañas de sal), los empaques recortados en PNG sobre fondo limpio y bodegones de cocina como `thumb-1.jpg`. **Los empaques no se retocan.** Donde falte una foto se usa un marcador visible con la etiqueta «FOTO PENDIENTE».

### Sistema de tarjetas `ProductCard`
Un solo componente con 3 variantes:
- **`humano`**: superficie `cielo` o `blanco`, línea interior fina en marino al 30 % con una esquina en forma de faceta de diamante, nombre arriba, empaque grande inclinado 3°, chip de presentaciones (150 g / 400 g…) y CTA.
- **`destacado`**: el salero en una tarjeta alta, de doble ancho, con la palabra «MARINA» gigante detrás del empaque.
- **`industrial`**: superficie `marino-profundo`, texto blanco, saco en tamaño medio y CTA «Solicitar ficha técnica».

Al pasar el cursor, el empaque se endereza de 3° a 0°, sube 12 px y la foto hace un zoom controlado del 1,04; la línea interior pasa de punteada a continua. Las tarjetas entran escalonadas al aparecer en pantalla. Nunca usamos sombras exageradas.

### Lenguaje de animación (GSAP + ScrollTrigger + Lenis)
- **Pantalla de carga:** el diamante del logo se dibuja y se abre como máscara sobre el video. Dura menos de 1,2 s y solo se ve en la primera visita.
- **Textos:** los titulares se revelan por líneas con máscara; los párrafos aparecen con fade y desplazamiento hacia arriba.
- **Imágenes:** revelado con máscara en forma de montaña de sal (clip-path) y parallax suave (±8 %).
- **Productos:** sección fija en el Home donde el salero rota y cambia de escala mientras pasan los beneficios.
- **Transiciones entre páginas:** una cortina marina con el diamante al centro.
- **Accesibilidad:** con `prefers-reduced-motion` todo pasa a un fade simple. En móvil se quita el parallax y la sección fija se vuelve una secuencia vertical.

---

## FASE 3 — Arquitectura

### Mapa del sitio
```
/                         Home
/productos                Catálogo (filtro Consumo humano | Industrial)
/productos/:slug          Ficha de producto (11 fichas, todas las reales)
/nosotros                 Quiénes somos + historia + infraestructura + valores
/nuestro-origen           La Guajira, comunidad wayúu, ODS, gestión con comunidades
/contacto                 Formulario + datos comerciales
/politicas                Calidad, ambiental y seguridad (texto legal real)
```

### Recorrido del Home
| # | Sección | Fondo | Composición |
|---|---|---|---|
| 01 | Header | transparente → `sal` | Logo, menú y CTA «Solicitar información». El menú de Productos se abre con mini tarjetas visuales de ambas líneas |
| 02 | Hero | video | Video de las salinas a pantalla completa, «SAL CRISTAL» en tipografía gigante recortada por la línea de las montañas de sal, titular corto, CTA «Descubrir productos» e indicador de scroll |
| 03 | Productos | `sal` | Grilla asimétrica: salero destacado, bolsa y saco, más un acceso a la línea industrial |
| 04 | Origen | `marino` | Panorámica de La Guajira con parallax, «URIBIA, LA GUAJIRA» en tipografía gigante y un texto breve |
| 05 | Consumo humano | `sal` | Sección fija: el salero rota mientras aparecen «Yodada y fluorizada», las presentaciones y la foto de cocina |
| 06 | Consumo industrial | `marino-profundo` | Lista tipo ficha técnica de las 8 referencias; al pasar el cursor aparece la foto del saco junto al puntero, y abajo el bloque de 45.000 m² con las plantas |
| 07 | Nosotros | `sal` | Composición editorial: «+20 años» gigante, historia resumida y foto de la planta |
| 08 | Compromiso social | `cielo` | Cifras wayúu animadas (90 % · +3.000 · +500) y los 4 ODS |
| 09 | Clientes | `blanco` | Marquesina lenta con los 6 logos reales en monocromo marino |
| 10 | CTA final | `marino` | «¿Necesitas sal para tu empresa?» con dos CTA: Solicitar información y WhatsApp |
| 11 | Footer | `marino-profundo` | La ilustración del footer (ya en la carpeta), navegación, productos, contacto, redes y legal |

### Componentes
`Header`, `MegaMenuProductos`, `MobileMenu`, `Loader`, `PageTransition`, `Hero`, `ProductCard` (3 variantes), `ProductGrid`, `StickyShowcase`, `IndustrialList`, `StatCounter`, `ParallaxImage`, `MaskReveal`, `SplitHeading`, `LogoMarquee`, `CTABlock`, `ContactForm`, `Footer`, `Placeholder` (foto pendiente).

### Stack propuesto
Vite + React + React Router + GSAP/ScrollTrigger + Lenis, con CSS por componente y tokens en `:root`. Se publica en Netlify cuando se apruebe.
Carpeta: `Sal Cristal - Marina de la Guajira/web/`.

---

## Recursos pendientes
- [ ] Logo en vector (SVG/AI) a color. En la carpeta solo hay `logo-white.png` y `Group-2.png`.
- [ ] Código exacto del amarillo/dorado del sol (manual de marca).
- [ ] Confirmar la licencia web de Sherman Display (el archivo ya está en el proyecto).
- [ ] Logo en mayor resolución: los PNG actuales miden 95×42 y 138×60 px y se ven pequeños.
- [ ] PNG de los empaques que faltan en la carpeta: Bolsa, Saco y 7 industriales. **Están publicados en salcristal.com**: se pueden descargar con la aprobación del usuario.
- [ ] Fotos panorámicas de las salinas y de la comunidad wayúu (el sitio solo tiene `1-.jpg`, `2-.jpg`, `3-.jpg`, `quienes-somos.webp` y `Consumo-humano.webp`).
- [ ] Fotos industriales (planta, maquinaria, bodegas).
- [ ] Descripción y aplicación de cada referencia industrial (hoy no existen).
- [ ] Confirmar teléfono, correo y redes oficiales, y el año del ©.
