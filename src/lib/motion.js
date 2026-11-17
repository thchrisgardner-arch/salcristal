import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

let lenis = null

export function startSmoothScroll() {
  if (reducedMotion() || lenis) return lenis
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function getLenis() {
  return lenis
}

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 })
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
}

/**
 * Reveals genéricos para cualquier sección:
 *  [data-reveal]        fade + slide up
 *  [data-reveal-lines]  contenedor con .line-mask > span (titulares por línea)
 *  [data-reveal-img]    máscara que se abre de abajo hacia arriba
 *  [data-parallax="n"]  desplazamiento vertical en % durante el scroll
 */
export function setupReveals(scope) {
  if (reducedMotion()) return () => {}
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-reveal-lines]').forEach((el) => {
      gsap.from(el.querySelectorAll('.line-mask > span'), {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, overwrite: true },
        ),
    })
    gsap.set('[data-reveal]', { autoAlpha: 0 })

    gsap.utils.toArray('[data-reveal-img]').forEach((el) => {
      const img = el.querySelector('img, video')
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        },
      )
      if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1.06, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
    })

    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 10
      gsap.fromTo(
        el,
        { yPercent: -amount },
        { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    })
  }, scope)
  return () => ctx.revert()
}

export { gsap, ScrollTrigger }
