import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap, reducedMotion } from './motion'
import { Diamante } from '../components/Graficos'
import './transicion.css'

// Cortina marina entre páginas: cubre, cambia de ruta y se retira.
const Ctx = createContext({ ir: () => {} })

export function TransicionProvider({ children }) {
  const navigate = useNavigate()
  const cortina = useRef(null)
  const ocupado = useRef(false)

  const ir = useCallback(
    (to) => {
      const [ruta, hash] = to.split('#')
      const destino = ruta || window.location.pathname
      // Mismo destino con ancla: solo desplazarse
      if (destino === window.location.pathname && hash) {
        navigate(to)
        return
      }
      if (reducedMotion() || !cortina.current || ocupado.current) {
        navigate(to)
        return
      }
      ocupado.current = true
      const el = cortina.current
      gsap
        .timeline()
        .set(el, { visibility: 'visible', clipPath: 'inset(100% 0 0 0)' })
        .to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'expo.inOut' })
        .fromTo(el.querySelector('svg'), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, '-=0.2')
        .add(() => navigate(to))
        .to(el.querySelector('svg'), { autoAlpha: 0, duration: 0.2 }, '+=0.15')
        .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' })
        .set(el, { visibility: 'hidden' })
        .add(() => { ocupado.current = false })
    },
    [navigate],
  )

  return (
    <Ctx.Provider value={{ ir }}>
      {children}
      <div className="cortina" ref={cortina} aria-hidden="true">
        <Diamante trazo={1.4} />
      </div>
    </Ctx.Provider>
  )
}

export const useIr = () => useContext(Ctx).ir

/** Enlace interno con transición. Acepta rutas con ancla ("/#compromiso"). */
export function Enlace({ to, children, onClick, ...rest }) {
  const ir = useIr()
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
        e.preventDefault()
        onClick?.(e)
        ir(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
