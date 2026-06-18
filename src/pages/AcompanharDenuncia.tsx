import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'

const mockReports: Record<string, { status: string; tipo: string; data: string; etapas: string[] }> = {
  '2024-38291': {
    status: 'EM ATENDIMENTO',
    tipo: 'Canal Escola — Bullying',
    data: '12/06/2024',
    etapas: ['Recebido', 'Em Triagem', 'Em Atendimento'],
  },
  '2024-75634': {
    status: 'RESOLVIDO',
    tipo: 'Canal Internet — Cyberbullying',
    data: '03/05/2024',
    etapas: ['Recebido', 'Em Triagem', 'Em Atendimento', 'Resolvido'],
  },
  '2024-11047': {
    status: 'RECEBIDO',
    tipo: 'Canal Casa — Violência',
    data: '15/06/2024',
    etapas: ['Recebido'],
  },
}

const statusColor: Record<string, string> = {
  'RECEBIDO': 'bg-sky-blue-light text-primary',
  'EM ATENDIMENTO': 'bg-gold-soft text-secondary',
  'RESOLVIDO': 'bg-safety-green/40 text-on-surface',
}

const allSteps = ['Recebido', 'Em Triagem', 'Em Atendimento', 'Resolvido']

export default function AcompanharDenuncia() {
  const navigate = useNavigate()
  const [protocol, setProtocol] = useState('')
  const [result, setResult] = useState<(typeof mockReports)[string] | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleSearch = () => {
    const key = protocol.trim().replace('#', '')
    if (!key) { setToast('Digite o número do protocolo'); return }
    const found = mockReports[key]
    if (found) { setResult(found); setNotFound(false) }
    else { setResult(null); setNotFound(true) }
  }

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      {toast && <Toast message={toast} type="warning" onClose={() => setToast(null)} />}
      <div className="blob-bg" />

      <header className="bg-background/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop py-4 h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-sky-blue-light transition-all active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary">Acompanhar Denúncia</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-label-lg">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="hidden sm:inline">100% Anônimo</span>
        </div>
      </header>

      <main className="pt-24 pb-24 px-margin-mobile lg:px-margin-desktop max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 bg-sky-blue-light rounded-full mb-6 shadow-sm">
            <span className="material-symbols-outlined text-5xl lg:text-6xl text-primary fill-icon">manage_search</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">Acompanhe sua Denúncia</h1>
          <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
            Digite o número de protocolo recebido após enviar seu relato para ver a situação atual.
          </p>
        </div>

        {/* Search */}
        <div className="neomorphic-card p-6 lg:p-8 rounded-[2rem] mb-8">
          <label className="block font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined fill-icon">tag</span>
            Número do Protocolo
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ex: 2024-38291"
              className="flex-1 bg-surface-container-low border-2 border-outline-variant rounded-full px-6 py-4 text-body-lg focus:outline-none focus:border-primary transition-colors placeholder:text-outline"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-primary text-on-primary font-button-text rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">search</span>
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
          <p className="text-label-lg text-on-surface-variant mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">info</span>
            O protocolo foi exibido na tela de confirmação após o envio.
          </p>
        </div>

        {/* Demo hint */}
        {!result && !notFound && (
          <div className="p-5 bg-gold-soft rounded-[1.5rem] border border-secondary-container mb-8">
            <p className="text-label-lg text-on-secondary-container font-bold mb-1">💡 Protocolos de demonstração:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(mockReports).map((k) => (
                <button key={k} onClick={() => setProtocol(k)} className="px-4 py-2 bg-white rounded-full text-label-lg text-primary hover:bg-sky-blue-light transition-colors">
                  #{k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Not found */}
        {notFound && (
          <div className="text-center p-10 neomorphic-card rounded-[2rem]">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="font-headline-md text-headline-md text-on-surface mb-2">Protocolo não encontrado</p>
            <p className="text-body-lg text-on-surface-variant">Verifique o número digitado e tente novamente.</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            <div className="neomorphic-card p-6 lg:p-8 rounded-[2rem]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-label-lg text-on-surface-variant mb-1">Protocolo</p>
                  <p className="font-headline-md text-headline-md text-primary">#{protocol.trim().replace('#', '')}</p>
                </div>
                <span className={`px-5 py-2 rounded-full font-button-text text-sm ${statusColor[result.status]}`}>
                  {result.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-lg text-on-surface-variant mb-1">Tipo</p>
                  <p className="text-body-md text-on-surface font-semibold">{result.tipo}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-lg text-on-surface-variant mb-1">Data de envio</p>
                  <p className="text-body-md text-on-surface font-semibold">{result.data}</p>
                </div>
              </div>

              {/* Progress steps */}
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Progresso</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-outline-variant" />
                <div className="space-y-6">
                  {allSteps.map((step) => {
                    const done = result.etapas.includes(step)
                    const current = result.etapas[result.etapas.length - 1] === step
                    return (
                      <div key={step} className="relative flex items-center gap-4 pl-12">
                        <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          current ? 'bg-primary border-primary animate-pulse-soft' :
                          done ? 'bg-safety-green border-safety-green' :
                          'bg-surface-container border-outline-variant'
                        }`}>
                          <span className="material-symbols-outlined text-base text-white fill-icon">
                            {done ? 'check' : 'radio_button_unchecked'}
                          </span>
                        </div>
                        <div>
                          <p className={`font-button-text ${done ? 'text-on-surface' : 'text-outline'}`}>{step}</p>
                          {current && <p className="text-label-lg text-primary">Em andamento agora</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 bg-sky-blue-light rounded-[1.5rem] flex items-start gap-3">
              <span className="material-symbols-outlined text-primary fill-icon mt-0.5">info</span>
              <p className="text-body-md text-on-primary-container">
                Nossa equipe está analisando sua denúncia. Todo o processo é feito com sigilo absoluto. Você será notificado pelo mesmo canal.
              </p>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl h-touch-target-min flex justify-around items-center px-2">
        <button onClick={() => navigate('/app')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-lg text-label-lg">Início</span>
        </button>
        <button onClick={() => navigate('/app/relato/agora')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-label-lg text-label-lg">Denunciar</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-2">
          <span className="material-symbols-outlined fill-icon">manage_search</span>
          <span className="font-label-lg text-label-lg">Acompanhar</span>
        </button>
        <button onClick={() => navigate('/app/direitos')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-lg text-label-lg">Direitos</span>
        </button>
      </nav>
    </div>
  )
}
