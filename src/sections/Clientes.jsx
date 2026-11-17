import { clientes } from '../data'
import { Lineas } from '../components/Graficos'
import './Clientes.css'

export default function Clientes() {
  const fila = [...clientes, ...clientes]
  return (
    <section className="cli" aria-label="Empresas que confían en nuestra sal">
      <div className="wrap cli__cabeza">
        <Lineas as="h2" className="display h2" lines={['Empresas que confían', 'en nuestra sal']} />
      </div>
      <div className="cli__marquesina">
        <ul className="cli__pista">
          {fila.map((c, i) => (
            <li key={i} aria-hidden={i >= clientes.length}>
              <img src={c.img} alt={i < clientes.length ? c.nombre : ''} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
