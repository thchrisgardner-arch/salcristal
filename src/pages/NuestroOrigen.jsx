import { useLayoutEffect, useRef } from 'react'
import Pagina from '../components/Pagina'
import Cierre from '../components/Cierre'
import { Lineas } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
import { gsap, reducedMotion } from '../lib/motion'
import { cifrasWayuu, ods } from '../data'
import './pages.css'
import './institucional.css'

// Contenido de salcristal.com/proposito. Su hero original es fotográfico (no ilustrado).
export default function NuestroOrigen() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.origenp__hero img', { scale: 1.15, duration: 2.2, ease: 'expo.out' })
      gsap.from('.origenp__hero h1 .line-mask > span', { yPercent: 115, duration: 1.3, stagger: 0.08, ease: 'expo.out', delay: 0.15 })
      gsap.from('.origenp__hero p, .origenp__hero .ph__migas', { autoAlpha: 0, y: 20, duration: 1, delay: 0.5 })
      gsap.to('.origenp__hero img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.origenp__hero', start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Pagina titulo="Nuestro origen" descripcion="Propósito de Sal Cristal: aliados de la comunidad wayúu y comprometidos con los Objetivos de Desarrollo Sostenible.">
      <section className="origenp__hero" ref={ref}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/img/heros/origen-movil.webp" />
          <img src="/img/fotos/group-6.jpg" alt="Mujer wayúu sostiene sal marina frente a una montaña de sal" />
        </picture>
        <div className="wrap">
          <nav className="ph__migas" aria-label="Ruta">
            <Enlace to="/">Inicio</Enlace>
            <span><i aria-hidden="true">/</i><b aria-current="page">Nuestro origen</b></span>
          </nav>
          <h1 className="display">
            {['Ellos nos', 'recibieron en', 'sus tierras'].map((l) => <span className="line-mask" key={l}><span>{l}</span></span>)}
          </h1>
          <p>…y nosotros los hicimos parte de esta gran familia.</p>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Aliados de', 'nuestras comunidades']} />
            <p className="lead" data-reveal>
              Buscamos convertirnos en aliados a partir de una relación de confianza, intercambio y beneficio mutuo con nuestras comunidades locales. Nos motiva trabajar por el desarrollo sostenible de la región.
            </p>
          </div>
          <ul className="origenp__cifras">
            {cifrasWayuu.map((c) => (
              <li key={c.etiqueta} data-reveal>
                <strong>{c.prefijo}{c.valor.toLocaleString('es-CO')}{c.sufijo}</strong>
                <span>{c.etiqueta}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bloque bloque--blanco">
        <div className="wrap grid-2">
          <div className="foto foto--45" data-reveal-img><img src="/img/heros/mujeres-wayuu.jpg" alt="Grupo de mujeres wayúu sonriendo" loading="lazy" /></div>
          <div style={{ display: 'grid', gap: 26 }}>
            <Lineas className="display h2" lines={['Responsabilidad', 'social']} />
            <div className="texto-largo">
              <p data-reveal>Estamos comprometidos con nuestro país y constantemente desarrollamos acciones en pro del bienestar de la comunidad wayúu.</p>
              <p data-reveal>
                Nuestro propósito como compañía responsable con su entorno está asociado a realizar nuestra actividad productiva de manera limpia y amigable. Implementamos prácticas sostenibles para reducir emisiones de gases y residuos sólidos, y favorecemos las dinámicas sociales de la región y de nuestras comunidades beneficiarias a través de acciones concertadas de manera mutua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bloque bloque--cielo">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Objetivos de', 'Desarrollo Sostenible']} />
            <p className="lead" data-reveal>
              Para aportar a la Agenda 2030 y a las metas planteadas para Colombia, Indusalca enmarca su trabajo y compromiso social en estas esferas:
            </p>
          </div>
          <ol className="ods">
            {ods.map((o, i) => (
              <li key={o} data-reveal><span>{String(i + 1).padStart(2, '0')}</span><h3 className="display">{o}</h3></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Gestión con', 'comunidades locales']} />
            <div className="foto foto--169" data-reveal-img><img src="/img/heros/salinas-aerea.webp" alt="Vista aérea de las salinas en La Guajira" loading="lazy" /></div>
          </div>
          <div className="gestion">
            <article data-reveal>
              <h3 className="display">Diálogo</h3>
              <p>Contamos con una política de puertas abiertas con nuestras comunidades y participamos en espacios de diálogo sobre las actividades y proyectos a realizar.</p>
            </article>
            <article data-reveal>
              <h3 className="display">Licencia, consulta previa y debida diligencia</h3>
              <p>Nuestro compromiso con las comunidades vecinas empieza con el análisis anticipado de la gestión operacional. Además, identificamos, analizamos y mitigamos los distintos riesgos del entorno.</p>
            </article>
          </div>
          <div style={{ marginTop: 14 }}><Cierre texto="Conoce nuestros productos" /></div>
        </div>
      </section>
    </Pagina>
  )
}
