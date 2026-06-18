import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AgentChat from './components/AgentChat'
import LandingPage from './pages/LandingPage'
import AppHome from './pages/AppHome'
import RelatoAgora from './pages/RelatoAgora'
import RelatoEmergencia from './pages/RelatoEmergencia'
import RelatoDispositivo from './pages/RelatoDispositivo'
import RelatoSigilo from './pages/RelatoSigilo'
import RelatoFormulario from './pages/RelatoFormulario'
import RelatoStep1 from './pages/RelatoStep1'
import RelatoEscola from './pages/RelatoEscola'
import RelatoCasa from './pages/RelatoCasa'
import RelatoInternet from './pages/RelatoInternet'
import RelatoSucesso from './pages/RelatoSucesso'
import MeusDireitos from './pages/MeusDireitos'
import AcompanharDenuncia from './pages/AcompanharDenuncia'
import PainelAdmin from './pages/PainelAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <AgentChat />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/app/relato/agora" element={<RelatoAgora />} />
        <Route path="/app/relato/emergencia" element={<RelatoEmergencia />} />
        <Route path="/app/relato/dispositivo" element={<RelatoDispositivo />} />
        <Route path="/app/relato/sigilo" element={<RelatoSigilo />} />
        <Route path="/app/relato/formulario" element={<RelatoFormulario />} />
        <Route path="/app/relato" element={<RelatoStep1 />} />
        <Route path="/app/relato/escola" element={<RelatoEscola />} />
        <Route path="/app/relato/casa" element={<RelatoCasa />} />
        <Route path="/app/relato/internet" element={<RelatoInternet />} />
        <Route path="/app/relato/sucesso" element={<RelatoSucesso />} />
        <Route path="/app/direitos" element={<MeusDireitos />} />
        <Route path="/app/acompanhar" element={<AcompanharDenuncia />} />
        <Route path="/admin" element={<PainelAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
