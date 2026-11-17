import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, scrollToTarget } from '../lib/motion'
import { Lineas, Flecha } from '../components/Graficos'
import { productosIndustrial, empresa } from '../data'
import { Enlace } from '../lib/transicion'
import './Industrial.css'

export default function Industrial() {
  const [activo, setActivo] = useState(null)
  const previewRef = useRef(null)
  const listaRef = useRef(null)

  // La foto del saco sigue al cursor sobre la lista (solo con puntero fino)
  useEffect(() => {
    const lista = listaRef.current
    const prev = previewRef.current
    if (!lista || !prev || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const xTo = gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' })
    const yTo = gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' })
    const onMove = (e) => {
      const r = lista.getBoundingClientRect()
      xTo(e.clientX - r.left)
      yTo(e.clientY - r.top)
    }
    lista.addEventListener('mousemove', onMove)
    return () => lista.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (reducedMotion() || !previewRef.current) return
    gsap.to(previewRef.current, { autoAlpha: activo === null ? 0 : 1, scale: activo === null ? 0.6 : 1, duration: 0.45, ease: 'power3.out' })
  }, [activo])

  return (
    <section className="ind" id="industrial">
      <div className="wrap">
        <div className="ind__cabeza">
          <span className="ind__etiqueta" data-reveal>Consumo industrial</span>
          <Lineas className="display h2" lines={['Sal para', 'la industria.']} />
          <p className="lead" data-reveal>
            Referencias de Sal Marina de la Guajira para procesos industriales, con pureza de origen natural y respaldo de una operación propia en Uribia.
          </p>
        </div>

        <div className="ind__lista" ref={listaRef} onMouseLeave={() => setActivo(null)}>
          <div className="ind__preview" ref={previewRef} aria-hidden="true">
            {productosIndustrial.map((p, i) => (
              <img key={p.slug} src={p.img} alt="" className={activo === i ? 'is-on' : ''} loading="lazy" />
            ))}
          </div>
          <ul>
            {productosIndustrial.map((p, i) => (
              <li key={p.slug} data-reveal>
                <Enlace
                  to={`/productos/${p.slug}`}
                  className="ind__fila"
                  onMouseEnter={() => setActivo(i)}
                  onFocus={() => setActivo(i)}
                  onBlur={() => setActivo(null)}
                  >
                  <img className="ind__thumb" src={p.img} alt="" loading="lazy" />
                  <span className="ind__nombre display">{p.nombre}</span>
                  <span className="ind__meta">Ficha técnica bajo solicitud</span>
                  <Flecha className="ind__flecha" />
                </Enlace>
              </li>
            ))}
          </ul>
        </div>

        {/* Infraestructura (45.000 m², certificaciones y plantas) se muestra en Nosotros › Infraestructura */}

        <div className="ind__cta" data-reveal>
          <p className="display">¿Necesitas sal para tu proceso productivo?</p>
          <div>
            <a href="#contacto" className="btn btn--sol" onClick={(e) => { e.preventDefault(); scrollToTarget('#contacto') }}>Contactar con ventas <Flecha /></a>
            <a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn btn--borde">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
