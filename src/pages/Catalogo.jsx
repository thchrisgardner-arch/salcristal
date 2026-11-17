import { useEffect, useState } from 'react'
import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import TarjetaDescubrir from '../components/TarjetaDescubrir'
import Cierre from '../components/Cierre'
import { Lineas } from '../components/Graficos'
import { catalogoHumano, catalogoIndustrial } from './catalogoData'
import './pages.css'
import './productos.css'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'humano', label: 'Consumo humano' },
  { id: 'industrial', label: 'Consumo industrial' },
]

function Grilla({ productos, activo, setActivo }) {
  return (
    <ul className="catalogo__grilla">
      {productos.map((p) => (
        <li key={p.id} data-reveal>
          <TarjetaDescubrir producto={p} activo={activo === p.id} onActivar={setActivo} />
        </li>
      ))}
    </ul>
  )
}

export default function Catalogo() {
  const [filtro, setFiltro] = useState('todos')
  // Tarjeta activada por toque (solo dispositivos táctiles); una a la vez
  const [activo, setActivo] = useState(null)
  const verHumano = filtro !== 'industrial'
  const verIndustrial = filtro !== 'humano'

  // Tocar fuera de una tarjeta la desactiva
  useEffect(() => {
    if (!activo) return
    const fuera = (e) => !e.target.closest('.td') && setActivo(null)
    document.addEventListener('pointerdown', fuera)
    return () => document.removeEventListener('pointerdown', fuera)
  }, [activo])

  return (
    <Pagina titulo="Productos" descripcion="Catálogo de Sal Cristal: sal marina para consumo humano e industrial desde Uribia, La Guajira.">
      <PageHero
        migas={[{ label: 'Productos' }]}
        lineas={['Nuestros', 'productos']}
        bajada="Sal marina yodada y fluorizada para el hogar y referencias de uso industrial con pureza de origen natural."
        capas={[
          { src: '/img/heros/humano-paisaje.webp', movil: '/img/heros/humano-movil.webp', className: 'ph__capa--paisaje' },
          { src: '/img/heros/humano-mujer.webp', className: 'ph__capa--mujer solo-desktop' },
        ]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="filtros" role="tablist" aria-label="Filtrar productos" data-reveal>
            {FILTROS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filtro === f.id} className={filtro === f.id ? 'is-on' : ''} onClick={() => setFiltro(f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          {verHumano && (
            <div className="catalogo__grupo">
              <div className="cabeza-2">
                <Lineas className="display h2" lines={['Consumo', 'humano']} />
                <p className="lead" data-reveal>Sal marina refinada, yodada y fluorizada para consumo humano.</p>
              </div>
              <Grilla productos={catalogoHumano} activo={activo} setActivo={setActivo} />
            </div>
          )}

          {verIndustrial && (
            <div className="catalogo__grupo">
              <div className="cabeza-2">
                <Lineas className="display h2" lines={['Consumo', 'industrial']} />
                <p className="lead" data-reveal>Sal Marina de la Guajira para usos industriales. Pureza de origen natural.</p>
              </div>
              <Grilla productos={catalogoIndustrial} activo={activo} setActivo={setActivo} />
            </div>
          )}

          <Cierre texto="¿No sabes qué referencia necesitas?" />
        </div>
      </section>
    </Pagina>
  )
}
