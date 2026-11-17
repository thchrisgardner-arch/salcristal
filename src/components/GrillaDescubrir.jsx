import { useEffect, useState } from 'react'
import TarjetaDescubrir from './TarjetaDescubrir'

/**
 * Cuadrícula de tarjetas "Descubrir" (catálogo y páginas de línea).
 * Maneja la tarjeta activada por toque: una a la vez, y tocar fuera la desactiva.
 */
export default function GrillaDescubrir({ productos }) {
  const [activo, setActivo] = useState(null)

  useEffect(() => {
    if (!activo) return
    const fuera = (e) => !e.target.closest('.td') && setActivo(null)
    document.addEventListener('pointerdown', fuera)
    return () => document.removeEventListener('pointerdown', fuera)
  }, [activo])

  return (
    <ul className="catalogo__grilla">
      {productos.map((p) => (
        <li key={p.id} data-reveal>
          <TarjetaDescubrir producto={p} activo={activo === p.id} onActivar={setActivo} />
        </li>
      ))}
    </ul>
  )
}
