import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import Cierre from '../components/Cierre'
import { Lineas, Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'
import { productosHumano, productosIndustrial, certificaciones, plantas, empresa } from '../data'
import './pages.css'
import './productos.css'

function Humano() {
  return (
    <Pagina titulo="Consumo humano" descripcion="Sal Cristal para consumo humano: salero, bolsa y saco de sal marina yodada y fluorizada.">
      <PageHero
        migas={[{ label: 'Productos', to: '/productos' }, { label: 'Consumo humano' }]}
        lineas={['Consumo', 'humano']}
        bajada="Sal marina yodada y fluorizada para consumo humano. Pureza de origen natural, del mar de La Guajira a tu mesa."
        capas={[
          { src: '/img/heros/humano-paisaje.webp', movil: '/img/heros/humano-movil.webp', className: 'ph__capa--paisaje' },
          { src: '/img/heros/humano-mujer.webp', className: 'ph__capa--mujer solo-desktop' },
        ]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="grid-3">
            {productosHumano.map((p, i) => (
              <ProductCard key={p.slug} producto={p} tono={i === 0 ? 'cielo' : 'blanco'} palabra={i === 0 ? 'Marina' : undefined} cta="Ver producto" href={`/productos/${p.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bloque bloque--cielo">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['Lo que', 'nos respalda']} />
            <p className="lead" data-reveal>Información publicada en los empaques y en las políticas de calidad de Indusalca.</p>
          </div>
          <div className="beneficios">
            <article className="beneficio" data-reveal>
              <span>01</span>
              <h3 className="display">Yodada y fluorizada</h3>
              <p>Sal marina refinada, yodada y fluorizada para consumo humano.</p>
            </article>
            <article className="beneficio" data-reveal>
              <span>02</span>
              <h3 className="display">Certificación Kosher</h3>
              <p>Con certificación Kosher y aprobación de la FDA.</p>
            </article>
            <article className="beneficio" data-reveal>
              <span>03</span>
              <h3 className="display">Inocuidad alimentaria</h3>
              <p>Sistema de Gestión de Inocuidad Alimentaria ISO 22000:2018.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap grid-2">
          <div className="foto foto--45" data-reveal-img><img src="/img/fotos/consumo-humano.webp" alt="Mano espolvoreando sal sobre una ensalada" loading="lazy" /></div>
          <div style={{ display: 'grid', gap: 26 }}>
            <Lineas className="display h2" lines={['Llevando', 'este producto']} />
            <p className="lead" data-reveal>
              …estás dándole una mano a la comunidad wayúu de La Guajira. Así lo dice cada empaque de Sal Cristal. Hoy el 90 % de nuestro talento humano es wayúu.
            </p>
            <Enlace to="/nuestro-origen" className="btn" data-reveal>Conocer nuestro origen <Flecha /></Enlace>
          </div>
        </div>
      </section>

      <section className="bloque bloque--blanco"><div className="wrap"><Cierre texto="¿Distribuyes o compras por volumen?" /></div></section>
    </Pagina>
  )
}

function Industrial() {
  return (
    <Pagina titulo="Consumo industrial" descripcion="Sal Marina de la Guajira para usos industriales: 8 referencias con pureza de origen natural.">
      <PageHero
        migas={[{ label: 'Productos', to: '/productos' }, { label: 'Consumo industrial' }]}
        lineas={['Consumo', 'industrial']}
        bajada="Sal Marina de la Guajira para usos industriales, producida en nuestras plantas de Uribia con pureza de origen natural."
        capas={[{ src: '/img/heros/infraestructura.jpg', movil: '/img/heros/infraestructura-movil.webp', className: 'ph__capa--ancha' }]}
        acciones={<a href={`https://wa.me/${empresa.whatsapp}`} target="_blank" rel="noopener" className="btn">Contactar con ventas <Flecha /></a>}
      />

      <section className="bloque bloque--profundo">
        <div className="wrap">
          <div className="cabeza-2">
            <Lineas className="display h2" lines={['8 referencias', 'industriales']} />
            <p className="lead" data-reveal>Solicita la ficha técnica de cada referencia al equipo comercial.</p>
          </div>
          <div className="grid-4">
            {productosIndustrial.map((p) => (
              <ProductCard
                key={p.slug}
                className="pcard--compacta"
                producto={{ ...p, linea: 'Sal Marina de la Guajira' }}
                variante="industrial"
                tono="marino"
                etiqueta="Industrial"
                cta="Ver referencia"
                href={`/productos/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bloque bloque--sal">
        <div className="wrap grid-2">
          <div>
            <p className="cifra-xl" data-reveal>{empresa.instalaciones}</p>
            <p className="lead" data-reveal style={{ marginTop: 20 }}>de instalaciones en Uribia, La Guajira, para los procesos de valor agregado.</p>
            <ul className="ficha__chips" data-reveal style={{ marginTop: 26 }}>
              {certificaciones.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div className="foto foto--43" data-reveal-img><img src="/img/fotos/consumo-industrial.webp" alt="Bodega con sacos de sal apilados" loading="lazy" /></div>
        </div>
        <div className="wrap grid-3" style={{ marginTop: 14 }}>
          {plantas.map((p) => (
            <Enlace key={p.nombre} to="/nosotros/infraestructura" className="tarjeta-link" data-reveal>
              <div className="foto"><img src={p.img} alt={p.nombre} loading="lazy" /></div>
              <div className="tarjeta-link__cuerpo"><h3 className="display">{p.nombre}</h3><Flecha /></div>
            </Enlace>
          ))}
        </div>
      </section>

      <section className="bloque bloque--blanco"><div className="wrap"><Cierre texto="¿Necesitas sal para tu proceso productivo?" /></div></section>
    </Pagina>
  )
}

export default function Linea({ linea }) {
  return linea === 'industrial' ? <Industrial /> : <Humano />
}
