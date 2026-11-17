import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import FormSolicitud from '../components/FormSolicitud'
import { Flecha } from '../components/Graficos'
import { DatosContacto } from '../sections/Contacto'
import { empresa } from '../data'
import '../sections/Contacto.css'
import './pages.css'
import './institucional.css'

export default function ContactoPagina() {
  return (
    <Pagina titulo="Contacto" descripcion="Contacta al equipo comercial de Sal Cristal en Uribia, La Guajira.">
      <PageHero
        migas={[{ label: 'Contacto' }]}
        lineas={['Hablemos', 'de sal']}
        bajada="¿Tienes alguna duda, sugerencia o necesitas asistencia? Escríbenos y te responderemos pronto."
        capas={[
          { src: '/img/heros/contacto-paisaje.png', className: 'ph__capa--suelo oculta-movil' },
          { src: '/img/heros/contacto-hombre.png', className: 'ph__capa--figura figura-movil' },
        ]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap contacto__grid">
          <div className="contacto__datos">
            <h2 className="display h2" data-reveal>Equipo comercial</h2>
            <DatosContacto />
            <a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn btn--sol" data-reveal style={{ justifySelf: 'start' }}>
              Escribir por WhatsApp <Flecha />
            </a>
          </div>
          <FormSolicitud tema="claro" />
        </div>
      </section>
    </Pagina>
  )
}
