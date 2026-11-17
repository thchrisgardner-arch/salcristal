import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import Cierre from '../components/Cierre'
import { Lineas, Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
import { valores, empresa } from '../data'
import './pages.css'
import './institucional.css'

export default function Nosotros() {
  return (
    <Pagina titulo="Quiénes somos" descripcion="Indusalca: compañía colombiana productora, procesadora y comercializadora de sal en Uribia, La Guajira, con más de 20 años de trayectoria.">
      <PageHero
        migas={[{ label: 'Nosotros' }]}
        lineas={['Quiénes', 'somos']}
        bajada="Una compañía colombiana productora, procesadora y comercializadora de sal para consumo humano, industrial y animal."
        capas={[{ src: '/img/heros/nosotros.jpg', movil: '/img/heros/nosotros-movil.webp', className: 'ph__capa--full' }]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap inst__intro">
          <p className="cifra-xl" data-reveal>+20</p>
          <div className="texto-largo">
            <p className="inst__destacado display" data-reveal>Años de trayectoria en el mercado nacional</p>
            <p data-reveal>
              Somos una compañía colombiana productora, procesadora y comercializadora de sal para consumo humano, industrial y animal, ubicada en {empresa.ubicacion}, que cuenta con más de 20 años de trayectoria en el mercado nacional.
            </p>
            <p data-reveal>Nos destacan los altos estándares y la calidad de nuestros productos, que responden a las necesidades de nuestros clientes.</p>
          </div>
        </div>
      </section>

      <section className="bloque bloque--marino">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Valores', 'corporativos']} />
            <p className="lead" data-reveal>Los principios que guían a Indusalca y a cada persona que hace parte de la compañía.</p>
          </div>
          <ol className="inst__valores">
            {valores.map((v, i) => (
              <li key={v} data-reveal>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display">{v}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="grid-2 inst__enlaces">
            <Enlace to="/nosotros/historia" className="tarjeta-link" data-reveal>
              <div className="foto"><img src="/img/fotos/group-236.jpg" alt="Planta de Indusalca en Uribia" loading="lazy" /></div>
              <div className="tarjeta-link__cuerpo"><h3 className="display">Nuestra historia</h3><Flecha /></div>
            </Enlace>
            <Enlace to="/nosotros/infraestructura" className="tarjeta-link" data-reveal>
              <div className="foto"><img src="/img/fotos/planta-produccion.jpg" alt="Planta 1 de Indusalca" loading="lazy" /></div>
              <div className="tarjeta-link__cuerpo"><h3 className="display">Nuestra infraestructura</h3><Flecha /></div>
            </Enlace>
          </div>
          <div style={{ marginTop: 14 }}><Cierre texto="Trabajemos juntos" /></div>
        </div>
      </section>
    </Pagina>
  )
}
