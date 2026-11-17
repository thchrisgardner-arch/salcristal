import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { startSmoothScroll, ScrollTrigger } from './lib/motion'
import { TransicionProvider } from './lib/transicion'
import Loader from './components/Loader'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Linea from './pages/Linea'
import Producto from './pages/Producto'
import Nosotros from './pages/Nosotros'
import Historia from './pages/Historia'
import Infraestructura from './pages/Infraestructura'
import NuestroOrigen from './pages/NuestroOrigen'
import ContactoPagina from './pages/ContactoPagina'
import Politicas from './pages/Politicas'
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  const [listo, setListo] = useState(false)
  const [loader, setLoader] = useState(true)
  const { pathname } = useLocation()

  const terminar = useCallback(() => {
    setListo(true)
    setTimeout(() => setLoader(false), 50)
  }, [])

  useEffect(() => {
    startSmoothScroll()
    const refrescar = () => ScrollTrigger.refresh()
    window.addEventListener('load', refrescar)
    document.fonts?.ready.then(refrescar)
    return () => window.removeEventListener('load', refrescar)
  }, [])

  // El hero del Home es oscuro; las páginas internas abren sobre fondo claro
  const heroClaro = pathname !== '/' && pathname !== '/nuestro-origen'

  return (
    <TransicionProvider>
      {loader && <Loader onDone={terminar} />}
      <Header claro={heroClaro} />
      <Routes>
        <Route path="/" element={<Home listo={listo} />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/productos/consumo-humano" element={<Linea linea="humano" />} />
        <Route path="/productos/consumo-industrial" element={<Linea linea="industrial" />} />
        <Route path="/productos/:slug" element={<Producto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/nosotros/historia" element={<Historia />} />
        <Route path="/nosotros/infraestructura" element={<Infraestructura />} />
        <Route path="/nuestro-origen" element={<NuestroOrigen />} />
        <Route path="/contacto" element={<ContactoPagina />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <Footer />
    </TransicionProvider>
  )
}
