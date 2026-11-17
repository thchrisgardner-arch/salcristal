import Pagina from '../components/Pagina'
import PageHero from '../components/PageHero'
import { Flecha } from '../components/Graficos'
import { Enlace } from '../lib/transicion'

export default function NoEncontrada() {
  return (
    <Pagina titulo="Página no encontrada">
      <PageHero
        lineas={['Página no', 'encontrada']}
        bajada="La página que buscas no existe o cambió de dirección."
        capas={[{ src: '/img/heros/politicas.webp', className: 'ph__capa--montes' }]}
        acciones={<Enlace to="/" className="btn">Volver al inicio <Flecha /></Enlace>}
      />
    </Pagina>
  )
}
