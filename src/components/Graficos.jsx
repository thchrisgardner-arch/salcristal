// Recursos gráficos de marca: montañas de sal (del empaque), diamante (del logo) y flecha (del sitio actual).

export function Flecha({ className = 'flecha' }) {
  return (
    <svg className={className} viewBox="0 0 24.4 18.4" aria-hidden="true" fill="currentColor">
      <path d="M23.491,10.134H.921a.921.921,0,0,1,0-1.843H21.327L14.853,1.56A.921.921,0,1,1,16.182.283l7.973,8.291a.921.921,0,0,1-.664,1.56" />
      <path transform="translate(-1.881 -1.058)" d="M17.541,19.483a.921.921,0,0,1-.67-1.554L24.7,9.638A.921.921,0,1,1,26.041,10.9l-7.83,8.291a.919.919,0,0,1-.67.289" />
    </svg>
  )
}

export function Diamante({ className = '', trazo = 1.6 }) {
  return (
    <svg className={className} viewBox="0 0 64 52" fill="none" stroke="currentColor" strokeWidth={trazo} strokeLinejoin="round" aria-hidden="true">
      <path className="d-borde" d="M14 2h36l12 15L32 50 2 17 14 2Z" />
      <path className="d-facetas" d="M2 17h60M14 2l8 15 10 33M50 2l-8 15-10 33M22 17l10-15 10 15" />
    </svg>
  )
}

// Silueta de montañas de sal. Picos deterministas para que no cambie entre renders.
const PICOS = [
  [0, 46, 120], [95, 70, 150], [210, 40, 110], [300, 88, 190], [440, 52, 130], [540, 74, 160],
  [660, 36, 100], [740, 96, 210], [900, 58, 140], [1010, 80, 170], [1140, 44, 120], [1230, 90, 190], [1370, 60, 140],
]

function caminoSalinas(alto = 120) {
  let d = `M0 ${alto} `
  PICOS.forEach(([x, h, w]) => {
    const base = alto
    const izq = x - w / 2
    const der = x + w / 2
    const cima = base - h
    d += `L${izq} ${base} Q${x - w * 0.12} ${cima - 4} ${x} ${cima} Q${x + w * 0.12} ${cima - 4} ${der} ${base} `
  })
  d += `L1440 ${alto} Z M0 ${alto - 6} H1440 V${alto + 2} H0 Z`
  return d
}

export function Salinas({ className = '', color = 'currentColor' }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" overflow="visible">
      <path d={caminoSalinas(120)} fill={color} />
    </svg>
  )
}

export function Lineas({ lines, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={className} data-reveal-lines>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  )
}
