import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { Diamante } from './Graficos'
import './Loader.css'

// Carga de marca: el diamante se dibuja y la cortina sube. Dura menos de 1,2 s y solo aparece una vez por sesión.
export default function Loader({ onDone }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    let visto = false
    try { visto = sessionStorage.getItem('sc-loader') === '1' } catch { /* sin storage */ }
    if (visto || reducedMotion()) {
      onDone()
      return
    }
    const el = ref.current
    const paths = el.querySelectorAll('path')
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap
        .timeline({
          onComplete: () => {
            try { sessionStorage.setItem('sc-loader', '1') } catch { /* sin storage */ }
            onDone()
          },
        })
        .to(paths, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.1 })
        .from('.loader__marca', { autoAlpha: 0, y: 12, duration: 0.4 }, '-=0.45')
        .to('.loader__contenido', { autoAlpha: 0, y: -20, duration: 0.3 }, '+=0.05')
        .to(el, { clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)', duration: 0.75, ease: 'expo.inOut' }, '-=0.1')
    }, el)
    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader__contenido">
        <Diamante className="loader__diamante" trazo={1.4} />
        <p className="loader__marca">Sal Cristal · Marina de la Guajira</p>
      </div>
    </div>
  )
}
