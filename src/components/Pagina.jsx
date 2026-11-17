import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { setupReveals, getLenis, ScrollTrigger, scrollToTarget } from '../lib/motion'

/** Envoltura de cada página: título, scroll al inicio (o al ancla) y reveals. */
export default function Pagina({ titulo, descripcion, children }) {
  const ref = useRef(null)
  const { hash } = useLocation()

  useLayoutEffect(() => {
    document.title = titulo ? `${titulo} | Sal Cristal` : 'Sal Cristal | Sal marina de La Guajira'
    const meta = document.querySelector('meta[name="description"]')
    if (meta && descripcion) meta.setAttribute('content', descripcion)

    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)

    const limpiar = setupReveals(ref.current)
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      if (hash) scrollToTarget(hash)
    }, 120)
    return () => {
      clearTimeout(t)
      limpiar()
    }
  }, [titulo, descripcion, hash])

  return <main ref={ref}>{children}</main>
}
