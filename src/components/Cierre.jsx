import { Flecha } from './Graficos'
import { Enlace } from '../lib/transicion'
import { empresa } from '../data'

export default function Cierre({ texto = '¿Necesitas sal para tu empresa?' }) {
  return (
    <div className="cierre" data-reveal>
      <p>{texto}</p>
      <div>
        <Enlace to="/contacto" className="btn btn--sol">Solicitar información <Flecha /></Enlace>
        <a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn btn--borde">WhatsApp</a>
      </div>
    </div>
  )
}
