import { useRef } from 'react'
import { useIr } from '../lib/transicion'
import './TarjetaDescubrir.css'

/**
 * Tarjeta de producto del catálogo con dos estados:
 *  normal → empaque centrado sobre color sólido
 *  activo (hover, foco o primer toque) → marquee tipográfico detrás, empaque más grande y botón circular "Descubrir"
 * Props: producto { id, nombre, marquee, categoria, descripcion, img, href, fondo, texto, tipo, boton }
 *        activo (estado táctil controlado por la página) · onActivar(id | null)
 */
export default function TarjetaDescubrir({ producto: p, activo = false, onActivar }) {
  const tipoPuntero = useRef('mouse')
  const ir = useIr()

  // Texto repetido: dos mitades idénticas para que el loop no tenga salto
  const frase = Array(4).fill(p.marquee).join(' · ') + ' · '

  const onClick = (e) => {
    if (e.target.closest('.td__boton')) return
    if (tipoPuntero.current === 'mouse') {
      ir(p.href)
    } else {
      // Táctil: primer toque activa la tarjeta, el botón navega
      onActivar?.(activo ? null : p.id)
    }
  }

  return (
    <article
      className={`td ${activo ? 'is-activo' : ''}`}
      style={{
        '--td-fondo': p.fondo,
        '--td-texto': p.texto,
        '--td-tipo': p.tipo,
        '--td-boton-fondo': p.boton.fondo,
        '--td-boton-texto': p.boton.texto,
      }}
      onPointerDown={(e) => (tipoPuntero.current = e.pointerType)}
      onClick={onClick}
    >
      <div className="td__marquee" aria-hidden="true">
        <div className="td__fila"><span>{frase}</span><span>{frase}</span></div>
        <div className="td__fila td__fila--inversa"><span>{frase}</span><span>{frase}</span></div>
      </div>

      <div className="td__lienzo">
        <div className="td__producto">
          <img src={p.img} alt={`Empaque ${p.nombre}${p.categoria === 'Consumo humano' ? ' Sal Cristal' : ''}`} loading="lazy" width="620" height="580" />
        </div>

        <a
          href={p.href}
          className="td__boton"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey) return
            e.preventDefault()
            ir(p.href)
          }}
          aria-label={`Descubrir ${p.nombre}`}
        >
          <span>Descubrir</span>
        </a>
      </div>

      <div className="td__pie">
        <h3 className="td__nombre display">{p.nombre}</h3>
        <p className="td__desc">{p.descripcion}</p>
      </div>
    </article>
  )
}
