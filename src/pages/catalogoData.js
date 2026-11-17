// Tarjetas del catálogo (/productos). Productos, imágenes y rutas reales del proyecto.
// Paleta: solo tonos institucionales (marino, azul medio, cielo, blanco) y el amarillo del sol del logo como acento tipográfico.
// fondo = background · texto = foreground (etiquetas) · tipo = tipografía gigante · boton = fondo/texto del botón circular

const MARINO = '#002753'
const PROFUNDO = '#001a38'
const MEDIO = '#1b4a80'
const CIELO = '#dce7f2'
const BLANCO = '#ffffff'
const SOL = '#f2c230'
const AZUL_CLARO = '#4f78b0'

const tono = {
  cielo: { fondo: CIELO, texto: MARINO, tipo: MARINO, boton: { fondo: BLANCO, texto: MARINO } },
  marino: { fondo: MARINO, texto: BLANCO, tipo: AZUL_CLARO, boton: { fondo: BLANCO, texto: MARINO } },
  marinoSol: { fondo: MARINO, texto: BLANCO, tipo: SOL, boton: { fondo: BLANCO, texto: MARINO } },
  blanco: { fondo: BLANCO, texto: MARINO, tipo: MEDIO, boton: { fondo: MARINO, texto: BLANCO } },
  medio: { fondo: MEDIO, texto: BLANCO, tipo: SOL, boton: { fondo: BLANCO, texto: MARINO } },
  medioCielo: { fondo: MEDIO, texto: BLANCO, tipo: CIELO, boton: { fondo: BLANCO, texto: MARINO } },
  profundo: { fondo: PROFUNDO, texto: BLANCO, tipo: AZUL_CLARO, boton: { fondo: BLANCO, texto: MARINO } },
  profundoSol: { fondo: PROFUNDO, texto: BLANCO, tipo: SOL, boton: { fondo: BLANCO, texto: MARINO } },
}

export const catalogoHumano = [
  { id: 'salero-sal-cristal', nombre: 'Salero', marquee: 'Salero', categoria: 'Consumo humano', descripcion: 'Sal marina yodada y fluorizada · 150 g', img: '/img/productos/salero.png', href: '/productos/salero-sal-cristal', ...tono.cielo },
  { id: 'bolsa-sal-cristal', nombre: 'Bolsa', marquee: 'Bolsa', categoria: 'Consumo humano', descripcion: 'Sal marina yodada y fluorizada · 400 g, 500 g y 1 kg', img: '/img/productos/bolsa.png', href: '/productos/bolsa-sal-cristal', ...tono.marino },
  { id: 'saco-sal-cristal', nombre: 'Saco', marquee: 'Saco', categoria: 'Consumo humano', descripcion: 'Sal marina yodada y fluorizada · 25 kg y 50 kg', img: '/img/productos/saco.png', href: '/productos/saco-sal-cristal', ...tono.blanco },
]

const ind = (id, nombre, t) => ({
  id,
  nombre,
  marquee: nombre,
  categoria: 'Consumo industrial',
  descripcion: 'Sal Marina de la Guajira · Usos industriales',
  img: `/img/productos/${id}.png`,
  href: `/productos/${id}`,
  ...t,
})

export const catalogoIndustrial = [
  ind('molida-blanca', 'Molida blanca', tono.medio),
  ind('dry-plus', 'Dry plus', tono.cielo),
  ind('extraseca', 'Extraseca', tono.profundo),
  ind('extrafina', 'Extrafina', tono.blanco),
  ind('molida-tipo-a', 'Molida tipo A', tono.marinoSol),
  ind('grano-lavada', 'Grano lavada', tono.cielo),
  ind('industrial-blanca', 'Industrial blanca', tono.medioCielo),
  ind('extraseca-granulada', 'Extraseca granulada', tono.profundoSol),
]
