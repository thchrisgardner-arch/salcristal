import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import Cierre from '../components/Cierre'
import { Lineas, Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
import './pages.css'
import './institucional.css'

// Texto de salcristal.com/nuestra-historia (sin fechas: el sitio no las publica)
export default function Historia() {
  return (
    <Pagina titulo="Nuestra historia" descripcion="La historia de Indusalca: de empresa artesanal a una de las compañías con mayor proyección en el sector de sales y minerales de Colombia.">
      <PageHero
        migas={[{ label: 'Nosotros', to: '/nosotros' }, { label: 'Nuestra historia' }]}
        lineas={['Nuestra', 'historia']}
        bajada="Indusalca nace por la unión de mentes maestras y soñadoras, dispuestas y comprometidas con una misma labor: construir país."
        capas={[{ src: '/img/heros/historia.png', movil: '/img/heros/historia-movil.webp', className: 'ph__capa--ancha ph__capa--historia' }]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="hist__bloque">
            <div className="foto foto--45" data-reveal-img><img src="/img/fotos/group-6.jpg" alt="Mujer wayúu con sal en las manos" loading="lazy" style={{ objectPosition: '72% 30%' }} /></div>
            <div style={{ display: 'grid', gap: 26 }}>
              <Lineas className="display h2" lines={['Un comienzo', 'artesanal']} />
              <div className="texto-largo">
                <p data-reveal>
                  Somos una empresa que inició de manera muy artesanal y, poco a poco, gracias al esfuerzo, el apoyo y el compromiso de nuestro talento humano y de las cabezas de la organización, fue creando su norte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bloque bloque--marino">
        <div className="wrap">
          <p className="hist__cita" data-reveal>
            Siempre vimos vida y oportunidades donde los demás solo veían problemas <em>o nada por hacer.</em>
          </p>
          <div className="texto-largo" style={{ marginTop: 40 }}>
            <p data-reveal>Eso hizo que todos entendiéramos que el mundo de la sal es mucho más grande de lo que pensábamos.</p>
          </div>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="hist__bloque hist__bloque--inv">
            <div className="foto foto--45" data-reveal-img><img src="/img/fotos/quienes-somos.webp" alt="Banda transportadora y montañas de sal en Uribia" loading="lazy" style={{ transform: 'scale(1.06)' }} /></div>
            <div style={{ display: 'grid', gap: 26 }}>
              <Lineas className="display h2" lines={['De lo artesanal', 'a la industria']} />
              <div className="texto-largo">
                <p data-reveal>Así hicimos que Indusalca pasara de ser una empresa artesanal a una industria formal, como su nombre lo expresa.</p>
              </div>
            </div>
          </div>

          <div className="hist__hoy" style={{ marginTop: 'clamp(80px, 10vw, 160px)' }}>
            <Lineas className="display h2" lines={['Hoy', 'seguimos creciendo']} />
            <div className="texto-largo">
              <p data-reveal>
                Indusalca se perfila como una de las empresas con mayor proyección en el sector de sales y minerales del país. Seguimos enfocados en el mismo norte: explorar y abarcar la mayoría de mercados que nuestro crecimiento y nuestra calidad nos permiten atender.
              </p>
              <Enlace to="/nosotros/infraestructura" className="btn" data-reveal style={{ justifySelf: 'start' }}>Ver nuestra infraestructura <Flecha /></Enlace>
            </div>
          </div>
        </div>
      </section>

      <section className="bloque bloque--blanco"><div className="wrap"><Cierre texto="Construyamos país juntos" /></div></section>
    </Pagina>
  )
}
