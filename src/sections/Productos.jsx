import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { useIr } from '../lib/transicion'
import { showcase } from '../data'
import './Productos.css'

/**
 * Showcase interactivo de productos (Home).
 * Todos los productos se renderizan apilados (imágenes precargadas, sin saltos de layout)
 * y GSAP coordina la transición: fondo → nombre gigante → empaque → indicador → información.
 */
// Tamaño del nombre gigante según su línea más larga (Sherman ≈ 0,42 em por letra + 0,06 em de espaciado)
function tamanoNombre(lineas) {
  const largo = Math.max(...lineas.map((l) => l.length))
  const dos = lineas.length > 1
  return {
    '--sc-tam': `min(${(90 / (largo * 0.48)).toFixed(1)}vw, ${dos ? 34 : 60}svh)`,
    '--sc-tam-m': `min(${(92 / (largo * 0.48)).toFixed(1)}vw, ${dos ? 26 : 38}vw)`,
  }
}

export default function Productos() {
  const [activo, setActivo] = useState(0)
  const actual = useRef(0)
  const animando = useRef(null)
  const entrada = useRef(null)
  const ref = useRef(null)
  const tabsRef = useRef([])
  const indicador = useRef(null)
  const productoRef = useRef(null)
  const descubre = useRef(null)
  const ir = useIr()

  // Círculo «Descubre»: sigue al cursor sobre el empaque y aparece/desaparece con escala
  useEffect(() => {
    const zona = productoRef.current
    const b = descubre.current
    if (!zona || !b || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const xTo = gsap.quickTo(b, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(b, 'y', { duration: 0.45, ease: 'power3' })
    const mover = (e) => {
      const r = zona.getBoundingClientRect()
      xTo(e.clientX - r.left)
      yTo(e.clientY - r.top)
    }
    const entrar = (e) => {
      const r = zona.getBoundingClientRect()
      gsap.set(b, { x: e.clientX - r.left, y: e.clientY - r.top })
      gsap.to(b, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(1.6)' })
    }
    const salir = () => gsap.to(b, { scale: 0.3, autoAlpha: 0, duration: 0.3, ease: 'power2.in' })
    gsap.set(b, { scale: 0.3, autoAlpha: 0, xPercent: -50, yPercent: -50 })
    zona.addEventListener('pointermove', mover)
    zona.addEventListener('pointerenter', entrar)
    zona.addEventListener('pointerleave', salir)
    return () => {
      zona.removeEventListener('pointermove', mover)
      zona.removeEventListener('pointerenter', entrar)
      zona.removeEventListener('pointerleave', salir)
    }
  }, [])

  // Mueve la línea inferior bajo el botón activo
  const moverIndicador = useCallback((i, inmediato = false) => {
    const b = tabsRef.current[i]
    if (!b || !indicador.current) return
    // En móvil el selector se desplaza para centrar la opción activa
    const sel = b.closest('.sc__selector')
    if (sel && sel.scrollWidth > sel.clientWidth && !inmediato) {
      sel.scrollTo({ left: b.offsetLeft - sel.clientWidth / 2 + b.offsetWidth / 2, behavior: reducedMotion() ? 'auto' : 'smooth' })
    }
    const props = { x: b.offsetLeft, width: b.offsetWidth }
    if (inmediato || reducedMotion()) gsap.set(indicador.current, props)
    else gsap.to(indicador.current, { ...props, duration: 0.7, ease: 'expo.out' })
  }, [])

  // Estado inicial: solo el primer producto visible
  useLayoutEffect(() => {
    const p = showcase[0]
    const el = ref.current
    gsap.set(el, { '--fondo': p.fondo, '--tipo': p.tipo, '--ui': p.ui })
    // Las montañas del hero y de Origen toman el color del producto activo
    gsap.set(document.documentElement, { '--sc-fondo': p.fondo })
    showcase.forEach((_, i) => {
      if (i === 0) return
      gsap.set(el.querySelectorAll(`[data-i="${i}"] .sc__linea > span`), { yPercent: 110 })
      gsap.set(el.querySelectorAll(`.sc__img[data-i="${i}"]`), { autoAlpha: 0 })
    })
    moverIndicador(0, true)

    // Entrada de la sección al aparecer en pantalla
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
      entrada.current = tl
      tl.from('[data-i="0"] .sc__linea > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.08 })
        .from('.sc__img[data-i="0"]', { scale: 0.86, yPercent: 8, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, 0.15)
        .from('.sc__sombra', { scaleX: 0.4, autoAlpha: 0, duration: 1.2, ease: 'expo.out' }, 0.3)
        // fromTo + clearProps: los botones tienen transición CSS de opacidad y no se debe leer su valor a medio camino
        .fromTo('.sc__tab', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,visibility,transform' }, 0.45)
        .fromTo('.sc__indicador', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.8)
    }, el)
    return () => ctx.revert()
  }, [moverIndicador])

  useEffect(() => {
    const onResize = () => moverIndicador(actual.current, true)
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [moverIndicador])

  const seleccionar = useCallback(
    (i) => {
      const de = actual.current
      if (i === de) return
      actual.current = i
      setActivo(i)
      const el = ref.current
      const p = showcase[i]
      moverIndicador(i)

      const sale = (sel) => el.querySelectorAll(sel.replaceAll('$', de))
      const entra = (sel) => el.querySelectorAll(sel.replaceAll('$', i))

      if (reducedMotion()) {
        gsap.set(el, { '--fondo': p.fondo, '--tipo': p.tipo, '--ui': p.ui })
        gsap.set(document.documentElement, { '--sc-fondo': p.fondo })
        gsap.set(sale('[data-i="$"] .sc__linea > span'), { yPercent: 110 })
        gsap.set(entra('[data-i="$"] .sc__linea > span'), { yPercent: 0 })
        gsap.set(sale('.sc__img[data-i="$"]'), { autoAlpha: 0 })
        gsap.set(entra('.sc__img[data-i="$"]'), { autoAlpha: 1 })
        return
      }

      // Si la entrada de la sección aún no termina, se completa y se desactiva para que no reaparezca el primer producto
      if (entrada.current) {
        entrada.current.scrollTrigger?.kill()
        entrada.current.progress(1)
        entrada.current = null
      }
      // Si se cambia rápido, se termina la transición anterior al instante
      animando.current?.progress(1)
      // Limpia estados intermedios de los productos que no participan
      showcase.forEach((_, k) => {
        if (k === i || k === de) return
        gsap.set(el.querySelectorAll(`[data-i="${k}"] .sc__linea > span`), { yPercent: 110 })
        gsap.set(el.querySelectorAll(`.sc__img[data-i="${k}"]`), { autoAlpha: 0 })
      })

      const dir = i > de ? 1 : -1
      animando.current = gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        // 1. Fondo y colores complementarios
        .to(el, { '--fondo': p.fondo, '--tipo': p.tipo, '--ui': p.ui, duration: 0.9, ease: 'power2.inOut' }, 0)
        .to(document.documentElement, { '--sc-fondo': p.fondo, duration: 0.9, ease: 'power2.inOut' }, 0)
        // 2. Nombre gigante: sale hacia arriba, entra desde abajo
        .to(sale('[data-i="$"] .sc__linea > span'), { yPercent: -110, duration: 0.6, stagger: 0.05, ease: 'expo.in' }, 0)
        .fromTo(entra('[data-i="$"] .sc__linea > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, 0.45)
        // 3. El empaque anterior se retira
        .to(sale('.sc__img[data-i="$"]'), { autoAlpha: 0, yPercent: -10, xPercent: -8 * dir, scale: 0.92, rotate: -4 * dir, duration: 0.55, ease: 'power3.in' }, 0)
        // 4. Nuevo empaque: escala y desplazamiento vertical
        .fromTo(
          entra('.sc__img[data-i="$"]'),
          { autoAlpha: 0, yPercent: 14, xPercent: 6 * dir, scale: 0.88, rotate: 4 * dir },
          { autoAlpha: 1, yPercent: 0, xPercent: 0, scale: 1, rotate: 0, duration: 1.1, ease: 'expo.out' },
          0.5,
        )
        .fromTo('.sc__sombra', { scaleX: 1 }, { scaleX: 0.55, duration: 0.5, ease: 'power2.in', yoyo: true, repeat: 1 }, 0.1)
    },
    [moverIndicador],
  )

  // Teclado: flechas, Inicio y Fin dentro del selector
  const onKey = (e) => {
    const n = showcase.length
    let i = null
    if (e.key === 'ArrowRight') i = (activo + 1) % n
    if (e.key === 'ArrowLeft') i = (activo - 1 + n) % n
    if (e.key === 'Home') i = 0
    if (e.key === 'End') i = n - 1
    if (i === null) return
    e.preventDefault()
    seleccionar(i)
    tabsRef.current[i]?.focus()
  }

  return (
    <section className="sc" id="productos" ref={ref} aria-labelledby="sc-titulo">
      <h2 id="sc-titulo" className="sr-only">Nuestros productos</h2>

      <div className="sc__escena">
        <div className="sc__arte" id="sc-panel" role="tabpanel" aria-labelledby={`sc-tab-${showcase[activo].id}`}>
        <div className="sc__nombres" aria-hidden="true">
          {showcase.map((p, i) => (
            <p key={p.id} data-i={i} className="sc__nombre display" style={tamanoNombre(p.titulo)}>
              {p.titulo.map((l) => (
                <span className="sc__linea" key={l}><span>{l}</span></span>
              ))}
            </p>
          ))}
        </div>

        <a
          className="sc__producto"
          ref={productoRef}
          href={showcase[activo].href}
          aria-label={`Descubrir ${showcase[activo].nombre}`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey) return
            e.preventDefault()
            ir(showcase[activo].href)
          }}
        >
          <span className="sc__sombra" aria-hidden="true" />
          <span className="sc__descubre display" ref={descubre} aria-hidden="true">Descubre</span>
          {showcase.map((p, i) => (
            <img
              key={p.id}
              data-i={i}
              className={`sc__img ${p.sinSombra ? 'sc__img--plana' : ''}`}
              src={p.img}
              alt={i === activo ? p.alt : ''}
              aria-hidden={i !== activo}
              width="620"
              height="580"
              decoding="async"
            />
          ))}
        </a>
      </div>

      <div className="sc__pie">
        <div className="sc__selector">
          <div className="sc__tabs" role="tablist" aria-label="Seleccionar producto" onKeyDown={onKey}>
            {showcase.map((p, i) => (
              <button
                key={p.id}
                ref={(b) => (tabsRef.current[i] = b)}
                role="tab"
                id={`sc-tab-${p.id}`}
                aria-selected={i === activo}
                aria-controls="sc-panel"
                tabIndex={i === activo ? 0 : -1}
                className={`sc__tab display ${i === activo ? 'is-on' : ''}`}
                onClick={() => seleccionar(i)}
              >
                {p.titulo.join(' ')}
              </button>
            ))}
            <span className="sc__indicador" ref={indicador} aria-hidden="true" />
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}
