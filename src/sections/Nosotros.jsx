import { Lineas } from '../components/Graficos'
import { valores } from '../data'
import './Nosotros.css'

// Textos de salcristal.com/quienes-somos y /nuestra-historia
export default function Nosotros() {
  return (
    <section className="nos" id="nosotros">
      <div className="wrap nos__grid">
        <div className="nos__anios" aria-label="Más de 20 años de trayectoria">
          <span className="nos__num display" aria-hidden="true" data-reveal><span className="nos__mas">+</span>20</span>
          <span className="nos__txt" data-reveal>años de trayectoria en el mercado nacional</span>
        </div>

        <div className="nos__historia">
          <Lineas className="display h2" lines={['De lo artesanal', 'a la industria.']} />
          <p className="lead" data-reveal>
            Indusalca nace por la unión de mentes maestras y soñadoras, comprometidas con una misma labor: construir país. Empezamos de manera artesanal y, gracias al esfuerzo de nuestro talento humano, pasamos a ser una industria formal.
          </p>
          <blockquote className="nos__cita display" data-reveal>
            «Siempre vimos vida y oportunidades donde los demás solo veían problemas o nada por hacer.»
          </blockquote>
        </div>

        <figure className="nos__foto" data-reveal-img>
          <img src="/img/fotos/quienes-somos.webp" alt="Banda transportadora y montañas de sal en la planta de Uribia" loading="lazy" />
        </figure>

        <div className="nos__valores">
          <h3 data-reveal>Valores corporativos</h3>
          <ol>
            {valores.map((v, i) => (
              <li key={v} data-reveal>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p className="display">{v}</p>
              </li>
            ))}
          </ol>
          <p className="nos__nota" data-reveal>
            Hoy Indusalca se perfila como una de las empresas con mayor proyección en el sector de sales y minerales del país.
          </p>
        </div>
      </div>
    </section>
  )
}
