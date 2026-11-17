import Pagina from '../components/Pagina'
import Hero from '../sections/Hero'
import Productos from '../sections/Productos'
import Origen from '../sections/Origen'
import ConsumoHumano from '../sections/ConsumoHumano'
import Industrial from '../sections/Industrial'
import Nosotros from '../sections/Nosotros'
import Compromiso from '../sections/Compromiso'
import Clientes from '../sections/Clientes'
import Contacto from '../sections/Contacto'

export default function Home({ listo }) {
  return (
    <Pagina descripcion="Sal Cristal: sal marina de Uribia, La Guajira, para consumo humano e industrial. Más de 20 años de trayectoria, certificación Kosher e ISO 22000.">
      <Hero listo={listo} />
      <Productos />
      <Origen />
      <ConsumoHumano />
      <Industrial />
      <Nosotros />
      <Compromiso />
      <Clientes />
      <Contacto />
    </Pagina>
  )
}
