import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import Cierre from '../components/Cierre'
import { Lineas } from '../components/Graficos'
import { plantas, certificaciones, empresa } from '../data'
import './pages.css'
import './institucional.css'

export default function Infraestructura() {
  return (
    <Pagina titulo="Nuestra infraestructura" descripcion="Plantas de producción de Indusalca en Uribia, La Guajira: 45.000 m² de instalaciones para procesos de valor agregado.">
      <PageHero
        migas={[{ label: 'Nosotros', to: '/nosotros' }, { label: 'Infraestructura' }]}
        lineas={['Nuestra', 'infraestructura']}
        bajada="Realizamos nuestras operaciones de producción desde nuestras plantas ubicadas en el municipio de Uribia, La Guajira (Colombia)."
        capas={[{ src: '/img/heros/infraestructura.jpg', movil: '/img/heros/infraestructura-movil.webp', className: 'ph__capa--ancha' }]}
      />

      <section className="bloque bloque--profundo">
        <div className="wrap grid-2">
          <p className="cifra-xl" data-reveal>{empresa.instalaciones}</p>
          <div className="texto-largo">
            <p data-reveal>Contamos con unas instalaciones de 45.000 m², óptimas para el desarrollo de los procesos de valor agregado.</p>
            <ul className="ficha__chips" data-reveal>
              {certificaciones.map((c) => <li key={c} style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Plantas de', 'producción']} />
            <p className="lead" data-reveal>Tres sedes en Uribia, La Guajira.</p>
          </div>
          <div>
            {plantas.map((p, i) => (
              <article className="infra__planta" key={p.nombre}>
                <div className="foto" data-reveal-img><img src={p.img} alt={p.nombre} loading="lazy" /></div>
                <div data-reveal>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="display">{p.nombre}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bloque bloque--blanco">
        <div className="wrap grid-2">
          <div className="foto foto--45" data-reveal-img><img src="/img/heros/operaria.jpg" alt="Operaria empacando bolsas de Sal Cristal en la planta" loading="lazy" /></div>
          <div className="foto foto--45" data-reveal-img><img src="/img/heros/cargador.jpg" alt="Cargador frontal junto a una montaña de sal" loading="lazy" /></div>
        </div>
        <div className="wrap" style={{ marginTop: 14 }}><Cierre texto="¿Quieres conocer nuestra operación?" /></div>
      </section>
    </Pagina>
  )
}
