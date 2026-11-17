import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { Lineas, Salinas } from '../components/Graficos'
import './Origen.css'

export default function Origen() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      // La palabra gigante se desplaza en horizontal con el scroll
      gsap.fromTo('.origen__cinta-inner', { xPercent: 0 }, {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: { trigger: '.origen__cinta', start: 'top bottom', end: 'bottom top', scrub: true },
      })
      // La foto se abre con la silueta de una montaña de sal
      gsap.fromTo('.origen__foto', { clipPath: 'polygon(50% 38%, 50% 38%, 100% 100%, 0% 100%)' }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power2.out',
        scrollTrigger: { trigger: '.origen__foto', start: 'top 85%', end: 'top 25%', scrub: 1 },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="origen" id="origen" ref={ref}>
      <Salinas className="origen__salinas-top" color="var(--marino)" />

      <div className="origen__cinta" aria-hidden="true">
        <div className="origen__cinta-inner display">
          Uribia <em>·</em> La Guajira <em>·</em> Uribia <em>·</em> La Guajira
        </div>
      </div>

      <div className="wrap origen__grid">
        <div className="origen__texto">
          <Lineas className="display h2" lines={['Donde el mar', 'se vuelve', 'cristal.']} />
          <p className="lead" data-reveal>
            Nuestra sal marina viene de Uribia, La Guajira. Allí están nuestras plantas y allí vive la comunidad wayúu que nos recibió en sus tierras y que hoy hace parte de esta gran familia.
          </p>
          <ul className="origen__datos" data-reveal>
            <li><strong className="display">45.000 m²</strong><span>de instalaciones en Uribia</span></li>
            <li><strong className="display">+20</strong><span>años de trayectoria</span></li>
          </ul>
        </div>

        <figure className="origen__foto">
          <img src="/img/fotos/group-6.jpg" alt="Mujer wayúu sostiene sal marina en sus manos frente a una montaña de sal" loading="lazy" data-parallax="6" />
        </figure>
      </div>
    </section>
  )
}
