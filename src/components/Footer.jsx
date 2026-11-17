import { empresa, productosHumano } from '../data'
import { Enlace } from '../lib/transicion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__ilustracion" src="/img/marca/ilustracion-footer.png" alt="" loading="lazy" aria-hidden="true" />
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__marca">
            <img src="/img/marca/logo-blanco.png" alt="Sal Cristal" width="138" height="60" />
            <p>Pureza de origen natural. Sal marina de Uribia, La Guajira, para consumo humano e industrial.</p>
          </div>

          <nav aria-label="Navegación del pie">
            <h3>Conócenos</h3>
            <ul>
              <li><Enlace to="/nosotros">Quiénes somos</Enlace></li>
              <li><Enlace to="/nosotros/historia">Nuestra historia</Enlace></li>
              <li><Enlace to="/nosotros/infraestructura">Infraestructura</Enlace></li>
              <li><Enlace to="/nuestro-origen">Nuestro origen</Enlace></li>
              <li><Enlace to="/politicas">Políticas</Enlace></li>
              <li><Enlace to="/contacto">Contacto</Enlace></li>
            </ul>
          </nav>

          <div>
            <h3>Productos</h3>
            <ul>
              {productosHumano.map((p) => (
                <li key={p.slug}><Enlace to={`/productos/${p.slug}`}>{p.nombre} Sal Cristal</Enlace></li>
              ))}
              <li><Enlace to="/productos/consumo-industrial">Sal industrial</Enlace></li>
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul>
              <li><a href={`tel:${empresa.telefonoAtencion.replace(/\s/g, '')}`}>{empresa.telefonoAtencion}</a></li>
              <li><a href={`mailto:${empresa.correoAtencion}`}>{empresa.correoAtencion}</a></li>
              <li>{empresa.direccion}</li>
            </ul>
            <ul className="footer__redes">
              {empresa.redes.map((r) => <li key={r.nombre}><a href={r.url}>{r.nombre}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <p>© {new Date().getFullYear()} Sal Cristal, Indusalca®. Todos los derechos reservados.</p>
          <ul>
            <li><a href="#">Tratamiento de datos</a></li>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Políticas de cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
