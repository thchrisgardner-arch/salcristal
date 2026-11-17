import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, scrollToTarget, isMobile } from '../lib/motion'
import { Flecha, Salinas } from '../components/Graficos'
import './Hero.css'

export default function Hero({ listo }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [src, setSrc] = useState(null)

  // Video según dispositivo (PC 19 MB / móvil 36 MB: se carga solo uno)
  useEffect(() => {
    setSrc(isMobile() ? '/video/hero-movil.mp4' : '/video/hero-pc.mp4')
  }, [])

  // Entrada después del loader
  useLayoutEffect(() => {
    if (!listo) return
    const el = ref.current
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__media', { scale: 1.18, duration: 2.2 }, 0)
        .from('.hero__titulo .line-mask > span', { yPercent: 115, duration: 1.4, stagger: 0.1 }, 0.1)
        .from('.hero__bajada > *', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.6)
        .from('.hero__meta > *', { autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9)
    }, el)
    return () => ctx.revert()
  }, [listo])

  // Scroll: el video se aleja y el titular sube a distinta velocidad
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
      tl.to('.hero__media', { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
        .to('.hero__titulo', { yPercent: -28, ease: 'none' }, 0)
        .to('.hero__velo', { opacity: 0.85, ease: 'none' }, 0)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero__media">
        {src && (
          <video ref={videoRef} src={src} poster="/img/fotos/cocina.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        )}
      </div>
      <div className="hero__velo" />

      <div className="hero__contenido wrap">
        <p className="hero__meta">
          <span>Sal marina</span>
          <span>Uribia · La Guajira</span>
          <span>Más de 20 años</span>
        </p>

        <h1 className="hero__titulo display">
          <span className="line-mask"><span>La esencia</span></span>
          <span className="line-mask"><span><em>del</em> mar.</span></span>
        </h1>

        <div className="hero__bajada">
          <p>Del mar de La Guajira a cada producto: sal marina con pureza de origen natural para tu mesa y para la industria colombiana.</p>
          <div className="hero__ctas">
            <a href="#productos" className="btn btn--claro" onClick={(e) => { e.preventDefault(); scrollToTarget('#productos') }}>
              Descubrir productos <Flecha />
            </a>
            <a href="#contacto" className="btn btn--borde" onClick={(e) => { e.preventDefault(); scrollToTarget('#contacto') }}>
              Solicitar información
            </a>
          </div>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollToTarget('#productos')} aria-label="Bajar a productos">
        <span />
      </button>

      <Salinas className="hero__salinas" color="var(--sc-fondo, var(--sal))" />
    </section>
  )
}
