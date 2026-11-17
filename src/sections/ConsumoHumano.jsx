import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion, scrollToTarget } from '../lib/motion'
import { Lineas, Flecha } from '../components/Graficos'
import './ConsumoHumano.css'

// Solo información publicada por Sal Cristal (empaques y sitio actual).
const PASOS = [
  {
    n: '01',
    titulo: 'Yodada y fluorizada',
    texto: 'Sal marina refinada, yodada y fluorizada para consumo humano. Lista para la mesa y la cocina de todos los días.',
    img: '/img/fotos/consumo-humano.webp',
    alt: 'Mano espolvoreando sal sobre una ensalada',
  },
  {
    n: '02',
    titulo: 'Pureza de origen natural',
    texto: 'Producida en Uribia con certificación Kosher y bajo el sistema de inocuidad alimentaria ISO 22000:2018.',
    img: '/img/fotos/planta-lavado.jpg',
    alt: 'Montañas de sal en la planta de Uribia',
  },
  {
    n: '03',
    titulo: 'Una presentación para cada uso',
    texto: 'Salero de 150 g, bolsa de 400 g, 500 g y 1 kg, y saco de 25 kg y 50 kg.',
    img: '/img/fotos/cocina.jpg',
    alt: 'Bolsa de Sal Cristal en una cocina',
  },
]

export default function ConsumoHumano() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const pasos = gsap.utils.toArray('.ch__paso', ref.current)
      // El salero queda fijo y rota mientras pasan los beneficios
      gsap.fromTo('.ch__producto img', { rotate: -10, yPercent: 6 }, {
        rotate: 8,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.ch__pasos', start: 'top center', end: 'bottom center', scrub: true },
      })
      gsap.fromTo('.ch__palabra', { xPercent: 8 }, {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.ch__pasos', start: 'top bottom', end: 'bottom top', scrub: true },
      })
      pasos.forEach((p, i) => {
        gsap.from(p.querySelector('.ch__foto'), {
          clipPath: 'inset(0 0 100% 0 round 14px)',
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: p, start: 'top 75%' },
        })
        ScrollTrigger.create({
          trigger: p,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            const b = ref.current?.querySelector('.ch__contador b')
            if (self.isActive && b) b.textContent = PASOS[i].n
          },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="ch" id="consumo-humano" ref={ref}>
      <div className="wrap ch__cabeza">
        <span className="ch__etiqueta" data-reveal>Consumo humano</span>
        <Lineas className="display h2" lines={['Sal para', 'la mesa', 'de Colombia.']} />
      </div>

      <div className="wrap ch__cuerpo">
        <div className="ch__fijo">
          <div className="ch__producto">
            <span className="ch__palabra display" aria-hidden="true">Marina</span>
            <img src="/img/productos/salero.png" alt="Salero Sal Cristal de 150 g" loading="lazy" />
          </div>
          <p className="ch__contador" aria-hidden="true"><b>01</b> / 03</p>
        </div>

        <ol className="ch__pasos">
          {PASOS.map((p) => (
            <li className="ch__paso" key={p.n}>
              <div className="ch__foto">
                <img src={p.img} alt={p.alt} loading="lazy" />
              </div>
              <span className="ch__n">{p.n}</span>
              <h3 className="display">{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
          <li className="ch__cierre">
            <a href="#contacto" className="btn" onClick={(e) => { e.preventDefault(); scrollToTarget('#contacto') }}>
              Consultar productos <Flecha />
            </a>
          </li>
        </ol>
      </div>
    </section>
  )
}
