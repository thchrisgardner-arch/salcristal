import { useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Pagina from '../components/Pagina'
import ProductCard from '../components/ProductCard'
import FormSolicitud from '../components/FormSolicitud'
import { Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
import { gsap, reducedMotion } from '../lib/motion'
import { buscarProducto, humedad, productosHumano, productosIndustrial, empresa } from '../data'
import NoEncontrada from './NoEncontrada'
import './pages.css'
import './productos.css'

export default function Producto() {
  const { slug } = useParams()
  const p = buscarProducto(slug)
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!p || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ficha__media img', { yPercent: 12, rotate: -8, autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: 0.2 })
      gsap.from('.ficha__nombre .line-mask > span', { yPercent: 110, duration: 1.2, ease: 'expo.out', delay: 0.15 })
      gsap.from('.ficha__info > *:not(.ficha__nombre)', { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.06, delay: 0.35, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [slug, p])

  if (!p) return <NoEncontrada />

  const humano = p.tipo === 'humano'
  const nombreCompleto = humano ? `${p.nombre} Sal Cristal` : p.nombre
  const lineaRuta = humano ? '/productos/consumo-humano' : '/productos/consumo-industrial'
  const relacionados = (humano ? productosHumano : productosIndustrial).filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <Pagina titulo={nombreCompleto} descripcion={`${nombreCompleto}: ${humano ? p.descripcion : 'sal marina de La Guajira para usos industriales.'}`}>
      <section className="ficha" ref={ref}>
        <div className="wrap ficha__grid">
          <div className={`ficha__media ${humano ? '' : 'ficha__media--industrial'}`}>
            <span className="ficha__palabra" aria-hidden="true">{humano ? 'Marina' : 'Pura'}</span>
            <img src={p.img} alt={`Empaque ${nombreCompleto}`} />
          </div>

          <div className="ficha__info">
            <nav className="ph__migas" aria-label="Ruta">
              <Enlace to="/">Inicio</Enlace>
              <span><i aria-hidden="true">/</i><Enlace to="/productos">Productos</Enlace></span>
              <span><i aria-hidden="true">/</i><Enlace to={lineaRuta}>{humano ? 'Consumo humano' : 'Consumo industrial'}</Enlace></span>
            </nav>
            <p className="ficha__linea">{p.linea} · {humano ? 'Consumo humano' : 'Usos industriales'}</p>
            <h1 className="ficha__nombre display"><span className="line-mask"><span>{p.nombre}</span></span></h1>
            <p className="ficha__desc">
              {humano ? 'Pureza de origen natural. Sal marina yodada y fluorizada para consumo humano.' : 'Pureza de origen natural. Sal Marina de la Guajira para usos industriales.'}
            </p>

            <dl className="ficha__datos">
              {humano && (
                <div>
                  <dt>Presentaciones</dt>
                  <dd><ul className="ficha__chips">{p.presentaciones.map((x) => <li key={x}>{x}</li>)}</ul></dd>
                </div>
              )}
              {humedad[slug] && (
                <div><dt>Humedad</dt><dd>{humedad[slug]}</dd></div>
              )}
              <div><dt>Certificación</dt><dd>Kosher</dd></div>
              <div><dt>Origen</dt><dd>Uribia, La Guajira, Colombia</dd></div>
              {!humano && (
                <div><dt>Ficha técnica</dt><dd>Disponible bajo solicitud al equipo comercial</dd></div>
              )}
            </dl>

            <div className="ficha__acciones">
              <a href="#solicitud" className="btn" onClick={(e) => { e.preventDefault(); document.getElementById('solicitud')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
                Solicitar ficha técnica <Flecha />
              </a>
              <a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn btn--borde" style={{ color: 'var(--marino)' }}>WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="wrap" id="solicitud" style={{ marginTop: 'clamp(70px, 8vw, 120px)', scrollMarginTop: 100 }}>
          <FormSolicitud titulo={`Solicitar ficha técnica: ${nombreCompleto}`} producto={humano ? nombreCompleto : p.nombre} tema="claro" />
        </div>

        <div className="wrap relacionados">
          <h2 className="display" data-reveal>{humano ? 'Otras presentaciones' : 'Otras referencias'}</h2>
          <div className="grid-3">
            {relacionados.map((r, i) => (
              <ProductCard
                key={r.slug}
                className={humano ? '' : 'pcard--compacta'}
                producto={humano ? r : { ...r, linea: 'Sal Marina de la Guajira' }}
                variante={humano ? 'humano' : 'industrial'}
                tono={humano ? (i === 0 ? 'cielo' : 'blanco') : 'marino'}
                etiqueta={humano ? undefined : 'Industrial'}
                cta="Ver producto"
                href={`/productos/${r.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Pagina>
  )
}
