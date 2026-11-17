import { Lineas, Flecha, Salinas } from '../components/Graficos'
import FormSolicitud from '../components/FormSolicitud'
import { empresa } from '../data'
import './Contacto.css'

export function DatosContacto() {
  return (
    <ul className="cta__datos" data-reveal>
      <li><span>Comercial</span><a href={`mailto:${empresa.correoComercial}`}>{empresa.correoComercial}</a></li>
      <li><span>Atención</span><a href={`mailto:${empresa.correoAtencion}`}>{empresa.correoAtencion}</a></li>
      <li><span>Teléfonos</span>{empresa.telefonosComerciales.map((t) => <a key={t} href={`tel:${t.replace(/\s/g, '')}`}>{t}</a>)}</li>
      <li><span>Dirección</span><p>{empresa.direccion}</p></li>
    </ul>
  )
}

export default function Contacto() {
  return (
    <section className="cta" id="contacto">
      <Salinas className="cta__salinas" color="var(--marino)" />
      <div className="wrap cta__grid">
        <div className="cta__texto">
          <Lineas className="display cta__titulo" lines={['¿Hablamos', 'de sal?']} />
          <p className="lead" data-reveal>
            Cuéntanos qué necesitas, para tu mesa, tu negocio o tu proceso industrial, y el equipo comercial te responde pronto.
          </p>
          <DatosContacto />
          <a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn btn--sol" data-reveal>
            Escribir por WhatsApp <Flecha />
          </a>
        </div>
        <FormSolicitud />
      </div>
    </section>
  )
}
