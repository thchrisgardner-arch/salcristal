import { clientes } from '../data'
import './Clientes.css'

export default function Clientes() {
  const fila = [...clientes, ...clientes]
  return (
    <section className="cli" aria-labelledby="cli-titulo">
      <div className="wrap cli__cabeza">
        <h2 id="cli-titulo" className="display" data-reveal>Empresas que confían en nuestra sal</h2>
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
