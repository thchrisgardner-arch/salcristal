import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import NosotrosSeccion from '../sections/Nosotros'
import Cierre from '../components/Cierre'
import { Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
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

      {/* Sección trasladada desde el Home, con su diseño original */}
      <NosotrosSeccion />

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
