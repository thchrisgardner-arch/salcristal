import { Flecha, Diamante } from './Graficos'
import { scrollToTarget } from '../lib/motion'
import { Enlace } from '../lib/transicion'
import './ProductCard.css'

/**
 * Tarjeta de producto reutilizable.
 * variante: 'humano' | 'destacado' | 'industrial'
 * tono: 'cielo' | 'blanco' | 'marino'
 */
export default function ProductCard({ producto, variante = 'humano', tono = 'cielo', palabra, etiqueta, cta = 'Solicitar ficha técnica', href = '#contacto', className = '' }) {
  const { nombre, linea, descripcion, presentaciones, img, uso } = producto
  return (
    <article className={`pcard pcard--${variante} pcard--${tono} ${className}`} data-reveal>
      {href.startsWith('#') ? (
        <a
          className="pcard__link"
          href={href}
          aria-label={`${cta}: ${linea ? linea + ' ' : ''}${nombre}`}
          onClick={(e) => { e.preventDefault(); scrollToTarget(href) }}
        />
      ) : (
        <Enlace className="pcard__link" to={href} aria-label={`${cta}: ${linea ? linea + ' ' : ''}${nombre}`} />
      )}
      <span className="pcard__marco" aria-hidden="true" />
      <Diamante className="pcard__diamante" />

      <header className="pcard__cabeza">
        <span className="pcard__chip">{etiqueta || uso}</span>
        <h3 className="pcard__nombre display">
          {linea && <small>{linea}</small>}
          {nombre}
        </h3>
      </header>

      <div className="pcard__media">
        {palabra && <span className="pcard__palabra display" aria-hidden="true">{palabra}</span>}
        <img src={img} alt={`Empaque ${linea || ''} ${nombre}`.trim()} loading="lazy" />
      </div>

      <footer className="pcard__pie">
        {descripcion && <p className="pcard__desc">{descripcion}</p>}
        {presentaciones && (
          <ul className="pcard__presentaciones" aria-label="Presentaciones">
            {presentaciones.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
        <span className="pcard__cta">{cta} <Flecha /></span>
      </footer>
    </article>
  )
}
