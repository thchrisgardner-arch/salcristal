import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { Lineas } from '../components/Graficos'
import { cifrasWayuu, ods } from '../data'
import './Compromiso.css'

const fmt = (n) => Math.round(n).toLocaleString('es-CO')

export default function Compromiso() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const nums = ref.current.querySelectorAll('[data-contar]')
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      nums.forEach((el) => {
        const fin = Number(el.dataset.contar)
        const obj = { v: 0 }
        el.textContent = '0'
        gsap.to(obj, {
          v: fin,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => (el.textContent = fmt(obj.v)),
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="comp" id="compromiso" ref={ref}>
      <div className="wrap comp__grid">
        <figure className="comp__foto" data-reveal-img>
          <img src="/img/fotos/group-239.jpg" alt="Mujer wayúu con sombrero y pintura facial tradicional" loading="lazy" />
        </figure>

        <div className="comp__texto">
          <span className="comp__etiqueta" data-reveal>Compromiso social</span>
          <Lineas className="display h2" lines={['Ellos nos', 'recibieron', 'en sus tierras.']} />
          <p className="lead" data-reveal>
            Y nosotros los hicimos parte de esta gran familia. Buscamos ser aliados de nuestras comunidades locales a partir de una relación de confianza, intercambio y beneficio mutuo.
          </p>
        </div>

        <ul className="comp__cifras">
          {cifrasWayuu.map((c) => (
            <li key={c.etiqueta} data-reveal>
              <strong className="display">
                {c.prefijo}<span data-contar={c.valor}>{fmt(c.valor)}</span>{c.sufijo}
              </strong>
              <span>{c.etiqueta}</span>
            </li>
          ))}
        </ul>

        <div className="comp__ods" data-reveal>
          <h3>Objetivos de Desarrollo Sostenible</h3>
          <ul>
            {ods.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
