import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, getLenis, reducedMotion } from '../lib/motion'
import { useIr } from '../lib/transicion'
import { Flecha } from './Graficos'
import './Header.css'

const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos', mega: true },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Nuestro origen', to: '/nuestro-origen' },
  { label: 'Contacto', to: '/contacto' },
]

const MEGA = [
  { titulo: 'Consumo humano', texto: 'Sal marina yodada y fluorizada. Salero, bolsa y saco.', img: '/img/productos/bolsa.png', to: '/productos/consumo-humano', tono: 'cielo' },
  { titulo: 'Consumo industrial', texto: '8 referencias con pureza de origen natural.', img: '/img/productos/molida-blanca.png', to: '/productos/consumo-industrial', tono: 'marino' },
]

export default function Header({ claro = false }) {
  const [solido, setSolido] = useState(false)
  const [oculto, setOculto] = useState(false)
  const [mega, setMega] = useState(false)
  const [menu, setMenu] = useState(false)
  const menuRef = useRef(null)
  const lastY = useRef(0)
  const irA = useIr()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolido(y > 60)
      if (y > 500 && y > lastY.current + 4) setOculto(true)
      else if (y < lastY.current - 4 || y <= 500) setOculto(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(false)
    setMega(false)
    setOculto(false)
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (menu) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      if (!reducedMotion() && menuRef.current) {
        gsap.fromTo(menuRef.current.querySelectorAll('[data-m]'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 0.15 })
      }
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [menu])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setMenu(false), setMega(false))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ir = (e, to) => {
    e.preventDefault()
    const habiaMenu = menu
    setMenu(false)
    setMega(false)
    setTimeout(() => irA(to), habiaMenu ? 300 : 0)
  }

  const activo = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))
  const fondo = solido || mega

  return (
    <header
      className={`header ${fondo ? 'is-solido' : ''} ${claro && !fondo ? 'is-claro' : ''} ${oculto && !mega && !menu ? 'is-oculto' : ''} ${menu ? 'is-menu' : ''}`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="header__barra wrap">
        <a href="/" className="header__logo" onClick={(e) => ir(e, '/')} aria-label="Sal Cristal, ir al inicio">
          <img src="/img/marca/logo-blanco.png" alt="Sal Cristal" className="logo logo--blanco" width="138" height="60" />
          <img src="/img/marca/logo.png" alt="" className="logo logo--color" width="95" height="42" />
        </a>

        <nav className="header__nav" aria-label="Principal">
          <ul>
            {NAV.map((n) => (
              <li key={n.label} onMouseEnter={() => setMega(!!n.mega)}>
                <a
                  href={n.to}
                  className={activo(n.to) ? 'is-activo' : ''}
                  aria-current={activo(n.to) ? 'page' : undefined}
                  onClick={(e) => ir(e, n.to)}
                  aria-haspopup={n.mega ? 'true' : undefined}
                  aria-expanded={n.mega ? mega : undefined}
                  onFocus={() => setMega(!!n.mega)}
                >
                  {n.label}
                  {n.mega && <span className="header__caret" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="/contacto" className="btn btn--sol header__cta" onClick={(e) => ir(e, '/contacto')}>
          Solicitar información <Flecha />
        </a>

        <button className="header__burger" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          <span /><span />
        </button>
      </div>

      <div className={`mega ${mega ? 'is-abierto' : ''}`} aria-hidden={!mega}>
        <div className="mega__grid wrap">
          {MEGA.map((m) => (
            <a key={m.titulo} href={m.to} className={`mega__card mega__card--${m.tono}`} onClick={(e) => ir(e, m.to)} tabIndex={mega ? 0 : -1}>
              <div>
                <h3 className="display">{m.titulo}</h3>
                <p>{m.texto}</p>
                <span className="mega__link">Ver productos <Flecha /></span>
              </div>
              <img src={m.img} alt="" loading="lazy" />
            </a>
          ))}
          <div className="mega__nota">
            <p>¿Compras por volumen o necesitas una ficha técnica?</p>
            <a href="/contacto" onClick={(e) => ir(e, '/contacto')} tabIndex={mega ? 0 : -1}>Habla con el equipo comercial <Flecha /></a>
          </div>
        </div>
      </div>

      <div className="menu-movil" ref={menuRef} aria-hidden={!menu}>
        <ul>
          {NAV.map((n) => (
            <li key={n.label} className="menu-movil__item">
              <a data-m href={n.to} onClick={(e) => ir(e, n.to)} tabIndex={menu ? 0 : -1} className="display">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="menu-movil__pie" data-m>
          <a href="/contacto" className="btn btn--sol" onClick={(e) => ir(e, '/contacto')} tabIndex={menu ? 0 : -1}>Solicitar información <Flecha /></a>
        </div>
      </div>
    </header>
  )
}
