import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { Enlace } from '../lib/transicion'
import './PageHero.css'

/**
 * Hero de páginas internas con las ilustraciones originales de Sal Cristal.
 * capas: [{ src, movil?, className, alt? }] (ilustraciones en tinta sobre fondo claro)
 * migas: [{ label, to? }]
 */
export default function PageHero({ migas = [], lineas, bajada, capas = [], acciones, variante = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
      tl.from('.ph__titulo .line-mask > span', { yPercent: 115, duration: 1.3, stagger: 0.08 })
        .from('.ph__migas, .ph__bajada, .ph__acciones', { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.08 }, 0.35)
        // La ilustración se "dibuja" de izquierda a derecha, como trazo de tinta
        .fromTo('.ph__capa', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power3.inOut', stagger: 0.25 }, 0.1)
      gsap.utils.toArray('.ph__capa').forEach((c, i) => {
        gsap.to(c, {
          yPercent: i % 2 ? 10 : 5,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`ph ${variante}`} ref={ref}>
      <div className="ph__arte" aria-hidden={capas.every((c) => !c.alt)}>
        {capas.map((c) => (
          <picture key={c.src} className={`ph__capa ${c.className || ''}`}>
            {c.movil && <source media="(max-width: 767px)" srcSet={c.movil} />}
            <img src={c.src} alt={c.alt || ''} />
          </picture>
        ))}
      </div>

      <div className="wrap ph__contenido">
        {migas.length > 0 && (
          <nav className="ph__migas" aria-label="Ruta">
            <Enlace to="/">Inicio</Enlace>
            {migas.map((m) => (
              <span key={m.label}>
                <i aria-hidden="true">/</i>
                {m.to ? <Enlace to={m.to}>{m.label}</Enlace> : <b aria-current="page">{m.label}</b>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="ph__titulo display">
          {lineas.map((l, i) => (
            <span className="line-mask" key={i}><span>{l}</span></span>
          ))}
        </h1>
        {bajada && <p className="ph__bajada">{bajada}</p>}
        {acciones && <div className="ph__acciones">{acciones}</div>}
      </div>
    </section>
  )
}
