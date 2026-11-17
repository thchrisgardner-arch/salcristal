import { useState } from 'react'
import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import './pages.css'
import './institucional.css'

// Texto íntegro de salcristal.com/nuestras-politicas (ajustes mínimos de ortografía)
const POLITICAS = [
  {
    id: 'calidad',
    tab: 'Calidad e inocuidad',
    titulo: ['Política de calidad', 'e inocuidad alimentaria'],
    parrafos: [
      'INDUSALCA S.A.S. es una compañía que se dedica a la fabricación y comercialización de sal marina de consumo humano y de uso industrial, con certificación KOSHER y aprobación de FDA, orientada en un pensamiento basado en el servicio al cliente, el aseguramiento de la inocuidad de nuestros productos y la mejora continua de nuestros procesos a través de alta tecnología, controles de ingeniería y talento humano idóneo y en formación permanente.',
      'Estamos comprometidos en ofrecer productos inocuos y de calidad a nuestros clientes, a través del cumplimiento de estándares de calidad, de la normatividad legal vigente y mediante la implementación y mejora continua del Sistema de Gestión de Inocuidad Alimentaria (ISO 22000:2018) y el Sistema de Gestión de la seguridad del producto para el cuidado del hogar y/o personal (HPC 420:2014).',
      'Promovemos canales de comunicación eficaz interna y externa en todos los niveles de la organización, con nuestros clientes, proveedores, INVIMA y demás partes interesadas, de tal forma que permita una reacción oportuna ante cualquier cambio o situación que pueda afectar la calidad e inocuidad del producto.',
    ],
  },
  {
    id: 'ambiental',
    tab: 'Ambiental',
    titulo: ['Política', 'ambiental'],
    parrafos: [
      'Nuestro propósito como compañía responsable con su entorno está asociado a la realización de nuestra actividad productiva de manera limpia y amigable. Implementamos prácticas sostenibles con el ambiente con el fin de reducir emisiones de gases y residuos sólidos para mitigar el impacto medioambiental. Adicionalmente, favorecemos las dinámicas sociales de la región y de nuestras comunidades beneficiarias a través de acciones concertadas de manera mutua. Finalmente, promovemos la calidad de vida de nuestros colaboradores a través de políticas de seguridad y salud en el trabajo, generación y formalización de empleo, entre otras, contribuyendo a su crecimiento profesional.',
      'Industrias Salineras del Caribe – INDUSALCA S.A.S., compañía productora y comercializadora de sal marina para consumo humano, industrial y animal, está comprometida con la protección del medio ambiente y el desarrollo sostenible en todas sus operaciones. Para cumplir este compromiso se fija propósitos para disminuir y/o mitigar los impactos negativos que se puedan generar al ambiente y la salud, a través del cumplimiento de los requisitos legales y la normatividad ambiental vigente.',
      'Por ello, promueve de manera constante la sensibilización, la formación ambiental y la comunicación, centrando sus esfuerzos en el manejo adecuado de los residuos sólidos, la incorporación de procesos de reducción, reúso y reciclaje, y el manejo y uso ecoeficiente de los recursos naturales, con la participación activa de los funcionarios, visitantes y la comunidad influyente del municipio de Uribia, Manaure y el departamento de La Guajira.',
    ],
    compromisos: [
      'Cumplimiento con la normatividad ambiental legal vigente.',
      'Prevención de efectos adversos al medio ambiente y sensibilización respecto al uso adecuado de los recursos naturales.',
      'Aplicación y actualización de procedimientos para la ejecución de las actividades, garantizando y difundiendo el cumplimiento de la normatividad vigente.',
      'Bajo el criterio de desarrollo sostenible, cada obra o actividad que se desarrolla será concebida a través del mejoramiento continuo, buscando siempre alternativas para prevenir, controlar y mitigar los posibles impactos ambientales que estos pueden generar.',
      'Comunicación e información ambiental interna y externa.',
      'Programas de capacitación orientados a crear una cultura de Gestión Ambiental en la empresa.',
    ],
  },
  {
    id: 'seguridad',
    tab: 'Seguridad y salud',
    titulo: ['Política de seguridad', 'y salud en el trabajo'],
    parrafos: [
      'INDUSTRIA SALINERA DEL CARIBE S.A.S. declara, a través de la política de Seguridad y Salud en el Trabajo, el compromiso con la seguridad, la salud y el cuidado de sus trabajadores independientemente del tipo de vinculación, visitantes ocasionales, visitantes frecuentes, contratistas y subcontratistas, y establece los lineamientos de la gestión del riesgo laboral.',
      'Dentro de sus prioridades está la implementación y el desarrollo del Sistema de Gestión de Seguridad y Salud en el Trabajo, apoyado a nivel gerencial, el cual garantiza lugares de trabajo seguros y adecuados, minimizando la ocurrencia de accidentes y enfermedades de origen laboral para bien de la empresa y de los trabajadores.',
    ],
  },
]

export default function Politicas() {
  const [activa, setActiva] = useState('calidad')
  const p = POLITICAS.find((x) => x.id === activa)

  return (
    <Pagina titulo="Nuestras políticas" descripcion="Políticas de calidad e inocuidad alimentaria, ambiental y de seguridad y salud en el trabajo de Indusalca.">
      <PageHero
        migas={[{ label: 'Nosotros', to: '/nosotros' }, { label: 'Políticas' }]}
        lineas={['Nuestras', 'políticas']}
        bajada="Calidad, inocuidad, cuidado del ambiente y seguridad de las personas: los compromisos que respaldan cada grano de Sal Cristal."
        capas={[{ src: '/img/heros/politicas.webp', className: 'ph__capa--montes' }]}
      />

      <section className="bloque bloque--sal">
        <div className="wrap">
          <div className="pol__tabs" role="tablist" aria-label="Políticas">
            {POLITICAS.map((x) => (
              <button key={x.id} role="tab" aria-selected={activa === x.id} className={activa === x.id ? 'is-on' : ''} onClick={() => setActiva(x.id)}>
                {x.tab}
              </button>
            ))}
          </div>

          <div className="pol__panel" role="tabpanel" key={p.id}>
            <h2 className="display">{p.titulo[0]} <em>{p.titulo[1]}</em></h2>
            <div style={{ display: 'grid', gap: 40 }}>
              <div className="texto-largo">
                {p.parrafos.map((t, i) => <p key={i}>{t}</p>)}
              </div>
              {p.compromisos && (
                <div>
                  <h3 className="etiqueta" style={{ marginBottom: 20 }}>Compromiso empresarial</h3>
                  <ol className="lista-num">
                    {p.compromisos.map((c, i) => (
                      <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><p>{c}</p></li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Pagina>
  )
}
