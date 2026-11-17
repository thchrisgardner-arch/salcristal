import { useState } from 'react'
import { Flecha } from './Graficos'
import { productosHumano, productosIndustrial } from '../data'
import './FormSolicitud.css'

/** Formulario de solicitud. tema: 'oscuro' | 'claro'. producto: nombre preseleccionado. */
export default function FormSolicitud({ titulo = 'Solicitar información', producto = '', tema = 'oscuro' }) {
  const [enviado, setEnviado] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    // PENDIENTE: conectar con el correo comercial o CRM del cliente
    setEnviado(true)
  }

  return (
    <form className={`form form--${tema}`} onSubmit={enviar} data-reveal>
      {enviado ? (
        <div className="form__gracias" role="status">
          <p className="display">Gracias por escribirnos.</p>
          <span>Este es un prototipo: el formulario aún no está conectado.</span>
        </div>
      ) : (
        <>
          <h3 className="display">{titulo}</h3>
          <div className="form__campos">
            <label><span>Nombre*</span><input name="nombre" required autoComplete="name" /></label>
            <label><span>Empresa</span><input name="empresa" autoComplete="organization" /></label>
            <label><span>Correo*</span><input type="email" name="email" required autoComplete="email" /></label>
            <label><span>Teléfono*</span><input type="tel" name="telefono" required autoComplete="tel" /></label>
            <label className="form__ancho">
              <span>Producto de interés</span>
              <select name="producto" defaultValue={producto}>
                <option value="" disabled>Selecciona una opción</option>
                <optgroup label="Consumo humano">
                  {productosHumano.map((p) => <option key={p.slug} value={`${p.nombre} Sal Cristal`}>{`${p.nombre} Sal Cristal`}</option>)}
                </optgroup>
                <optgroup label="Consumo industrial">
                  {productosIndustrial.map((p) => <option key={p.slug} value={p.nombre}>{p.nombre}</option>)}
                </optgroup>
              </select>
            </label>
            <label className="form__ancho"><span>Mensaje*</span><textarea name="mensaje" rows="3" required /></label>
          </div>
          <button className={`btn ${tema === 'oscuro' ? 'btn--claro' : ''}`} type="submit">Enviar solicitud <Flecha /></button>
        </>
      )}
    </form>
  )
}
