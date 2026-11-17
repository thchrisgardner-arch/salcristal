import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { Enlace } from '../lib/transicion'
import './PageHero.css'

/**
 * Hero de páginas internas con las ilustraciones originales de Sal Cristal a gran escala
 * y el título centrado encima. La bajada y las acciones van en una franja debajo,
 * para no tapar la ilustración.
 * capas: [{ src, movil?, className, alt? }]
 *   ph__capa--full    ilustración que cubre todo el hero (anclada abajo)
 *   ph__capa--suelo   paisaje a todo el ancho, apoyado en el borde inferior
 *   ph__capa--figura  personaje grande a la derecha
 *   ph__capa--montes  montañas de sal a la derecha
 * migas: [{ label, to? }]
 */
export default function PageHero({ migas = [], lineas, bajada, capas = [], acciones, variante = '' }) {
  const ref = useRef(null)

  // El título se ajusta a la línea más larga para que no invada la ilustración
  const largo = Math.max(...lineas.map((l) => l.length))
  const tamano = `min(12.5vw, ${(56 / (largo * 0.44)).toFixed(2)}vw, 230px)`
  const tamanoMovil = `min(19vw, ${(84 / (largo * 0.44)).toFixed(2)}vw)`

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
      // La ilustración se "dibuja" de izquierda a derecha, como trazo de tinta
      tl.fromTo('.ph__capa', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power3.inOut', stagger: 0.2 }, 0)
        .from('.ph__titulo .line-mask > span', { yPercent: 115, duration: 1.3, stagger: 0.08 }, 0.35)
        .from('.ph__migas', { autoAlpha: 0, y: 12, duration: 0.8 }, 0.6)
      gsap.utils.toArray('.ph__capa').forEach((c, i) => {
        gsap.to(c, {
          yPercent: i % 2 ? 6 : 3,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      gsap.to('.ph__titulo', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className={`ph ${variante}`} ref={ref} style={{ '--ph-titulo': tamano, '--ph-titulo-movil': tamanoMovil }}>
        <div className="ph__arte" aria-hidden={capas.every((c) => !c.alt)}>
          {capas.map((c) => (
            <picture key={c.src} className={`ph__capa ${c.className || ''}`}>
              {c.movil && <source media="(max-width: 767px)" srcSet={c.movil} />}
              <img src={c.src} alt={c.alt || ''} />
            </picture>
          ))}
        </div>

        <div className="ph__centro">
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
        </div>
      </section>

      {(bajada || acciones) && (
        <div className="ph__intro">
          {bajada && <p className="ph__bajada" data-reveal>{bajada}</p>}
          {acciones && <div className="ph__acciones" data-reveal>{acciones}</div>}
        </div>
      )}
    </>
  )
}
