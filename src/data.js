// Contenido tomado de salcristal.com (auditoría 2026-11-17). No agregar datos sin validar.

export const empresa = {
  nombre: 'Sal Cristal',
  razonSocial: 'Industrias Salineras del Caribe – INDUSALCA S.A.S.',
  ubicacion: 'Uribia, La Guajira',
  direccion: 'Diagonal 4a #1-01, Uribia, La Guajira',
  trayectoria: 'Más de 20 años',
  instalaciones: '45.000 m²',
  // PENDIENTE: el sitio actual publica teléfonos y correos distintos; confirmar cuáles quedan.
  telefonoAtencion: '+57 317 431 3402',
  telefonosComerciales: ['+57 320 522 8729', '+57 310 610 9694'],
  whatsapp: '573205228729',
  correoAtencion: 'atencionalcliente@indusalca.com.co',
  correoComercial: 'direccioncomercial@indusalca.com.co',
  redes: [
    // PENDIENTE: confirmar URLs oficiales de cada red
    { nombre: 'Instagram', url: '#' },
    { nombre: 'Facebook', url: '#' },
    { nombre: 'TikTok', url: '#' },
    { nombre: 'LinkedIn', url: '#' },
  ],
}

export const certificaciones = ['Kosher', 'Aprobación FDA', 'ISO 22000:2018', 'HPC 420:2014']

export const productosHumano = [
  {
    slug: 'salero-sal-cristal',
    nombre: 'Salero',
    linea: 'Sal Cristal',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['150 g'],
    img: '/img/productos/salero.png',
    uso: 'Mesa',
  },
  {
    slug: 'bolsa-sal-cristal',
    nombre: 'Bolsa',
    linea: 'Sal Cristal',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['400 g', '500 g', '1 kg'],
    img: '/img/productos/bolsa.png',
    uso: 'Cocina',
  },
  {
    slug: 'saco-sal-cristal',
    nombre: 'Saco',
    linea: 'Sal Cristal',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['25 kg', '50 kg'],
    img: '/img/productos/saco.png',
    uso: 'Institucional',
  },
]

// PENDIENTE: el sitio actual no tiene descripción ni aplicación de cada referencia.
export const productosIndustrial = [
  { slug: 'molida-blanca', nombre: 'Molida blanca', img: '/img/productos/molida-blanca.png' },
  { slug: 'dry-plus', nombre: 'Dry plus', img: '/img/productos/dry-plus.png' },
  { slug: 'extraseca', nombre: 'Extraseca', img: '/img/productos/extraseca.png' },
  { slug: 'extrafina', nombre: 'Extrafina', img: '/img/productos/extrafina.png' },
  { slug: 'molida-tipo-a', nombre: 'Molida tipo A', img: '/img/productos/molida-tipo-a.png' },
  { slug: 'grano-lavada', nombre: 'Grano lavada', img: '/img/productos/grano-lavada.png' },
  { slug: 'industrial-blanca', nombre: 'Industrial blanca', img: '/img/productos/industrial-blanca.png' },
  { slug: 'extraseca-granulada', nombre: 'Extraseca granulada', img: '/img/productos/extraseca-granulada.png' },
]

/**
 * Showcase interactivo del Home. Para agregar, quitar o reordenar productos, editar este arreglo.
 * Colores: solo la paleta institucional (marino, cielo, sal) y el amarillo del sol del logo como acento.
 * titulo: líneas del nombre gigante (una o dos).
 */
export const showcase = [
  {
    id: 'salero',
    nombre: 'Salero Sal Cristal',
    titulo: ['Salero'],
    img: '/img/productos/salero.png',
    alt: 'Empaque del Salero Sal Cristal Marina de 150 g',
    fondo: '#dce7f2',
    tipo: '#002753',
    ui: '#002753',
    categoria: 'Consumo humano',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['150 g'],
    href: '/productos/salero-sal-cristal',
  },
  {
    id: 'bolsa',
    nombre: 'Bolsa Sal Cristal',
    titulo: ['Bolsa'],
    img: '/img/productos/bolsa.png',
    alt: 'Empaque de la Bolsa Sal Cristal Marina',
    fondo: '#002753',
    tipo: '#4f78b0',
    ui: '#ffffff',
    categoria: 'Consumo humano',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['400 g', '500 g', '1 kg'],
    href: '/productos/bolsa-sal-cristal',
  },
  {
    id: 'saco',
    nombre: 'Saco Sal Cristal',
    titulo: ['Saco'],
    img: '/img/productos/saco.png',
    alt: 'Empaque del Saco Sal Cristal Marina de 25 kg',
    fondo: '#f7f5f0',
    tipo: '#1b4a80',
    ui: '#002753',
    categoria: 'Consumo humano',
    descripcion: 'Sal marina yodada y fluorizada para consumo humano.',
    presentaciones: ['25 kg', '50 kg'],
    href: '/productos/saco-sal-cristal',
    sinSombra: true, // pedido del usuario: el saco va sin sombra
  },
  {
    id: 'molida-blanca',
    nombre: 'Molida blanca',
    titulo: ['Molida', 'blanca'],
    img: '/img/productos/molida-blanca.png',
    alt: 'Saco de Sal Marina de la Guajira Molida Blanca para usos industriales',
    fondo: '#1b4a80',
    tipo: '#f2c230',
    ui: '#ffffff',
    categoria: 'Consumo industrial',
    descripcion: 'Sal Marina de la Guajira para usos industriales. Pureza de origen natural.',
    presentaciones: null, // el sitio actual no publica presentaciones industriales
    href: '/productos/molida-blanca',
  },
]

export function buscarProducto(slug) {
  const h = productosHumano.find((p) => p.slug === slug)
  if (h) return { ...h, tipo: 'humano' }
  const i = productosIndustrial.find((p) => p.slug === slug)
  if (i) return { ...i, tipo: 'industrial', linea: 'Sal Marina de la Guajira' }
  return null
}

// Humedad publicada en las fichas del sitio actual (solo salero y bolsa)
export const humedad = { 'salero-sal-cristal': '0,2 % – 0,3 % máx.', 'bolsa-sal-cristal': '0,2 % – 0,3 % máx.' }

export const cifrasWayuu = [
  { valor: 90, prefijo: '', sufijo: '%', etiqueta: 'de nuestro talento humano es wayúu' },
  { valor: 3000, prefijo: '+', sufijo: '', etiqueta: 'indígenas beneficiados' },
  { valor: 500, prefijo: '+', sufijo: '', etiqueta: 'familias wayúu beneficiadas' },
]

export const ods = ['Fin de la pobreza', 'Salud y bienestar', 'Educación de calidad', 'Trabajo decente y crecimiento económico']

export const valores = ['Confiabilidad', 'Alta calidad', 'Ética, innovación y liderazgo', 'Comprometidos con nuestras comunidades']

export const plantas = [
  { nombre: 'Planta de lavado', img: '/img/fotos/planta-lavado.jpg' },
  { nombre: 'Planta de producción', img: '/img/fotos/planta-produccion.jpg' },
  { nombre: 'Sede administrativa', img: '/img/fotos/sede.jpg' },
]

export const clientes = [
  { nombre: 'Kikes', img: '/img/clientes/kikes.png' },
  { nombre: 'Italcol', img: '/img/clientes/italcol.png' },
  { nombre: 'Olímpica', img: '/img/clientes/olimpica.png' },
  { nombre: 'Levapan', img: '/img/clientes/levapan.png' },
  { nombre: 'Colanta', img: '/img/clientes/colanta.png' },
  { nombre: 'Bucanero', img: '/img/clientes/bucanero.png' },
]
