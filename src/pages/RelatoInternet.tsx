import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

const cyberTypes = [
  { emoji: '📱', label: 'Cyberbullying', value: 'cyberbullying' },
  { emoji: '📸', label: 'Foto sem permissão', value: 'foto' },
  { emoji: '👤', label: 'Perfil Falso', value: 'perfil' },
  { emoji: '😰', label: 'Ameaça Online', value: 'ameaca' },
  { emoji: '🔞', label: 'Conteúdo Impróprio', value: 'conteudo' },
  { emoji: '❓', label: 'Outra situação', value: 'outro' },
]

const platforms = [
  { icon: '📷', label: 'Instagram' },
  { icon: '💬', label: 'WhatsApp' },
  { icon: '🎮', label: 'Jogo Online' },
  { icon: '▶️', label: 'YouTube' },
  { icon: '🎵', label: 'TikTok' },
  { icon: '❓', label: 'Outro' },
]

export default function RelatoInternet() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const { transcript, isListening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  useEffect(() => { if (transcript) setDescription(transcript) }, [transcript])

  const toggleMic = () => {
    if (isListening) { stopListening() } else { resetTranscript(); startListening() }
  }

  const togglePlatform = (label: string) => {
    setSelectedPlatforms((prev) => prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label])
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
      <div className="blob-bg"></div>

      <header className="bg-background shadow-sm flex justify-between items-center w-full px-margin-mobile py-4 fixed top-0 z-50 h-16">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-blue-light transition-all active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate('/admin')} title="Área do Tutor">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">admin_panel_settings</span>
          </button>
          <span className="material-symbols-outlined text-primary">account_circle</span>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-2xl mx-auto min-h-screen">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-primary-container rounded-full mb-4 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-on-primary-container fill-icon">language</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Canal Internet</h1>
          <p className="text-body-lg text-on-surface-variant">Conte para nós o que aconteceu online. Você está seguro aqui.</p>
        </div>

        <div className="space-y-12">
          {/* Tipo */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">wifi_tethering_error</span>
              O que aconteceu na internet?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cyberTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`relative flex flex-col items-center justify-center p-6 neomorphic-card cursor-pointer border-4 transition-all active:scale-95 group rounded-[2rem] ${
                    selectedType === type.value ? 'border-primary bg-primary-container/20' : 'border-transparent hover:border-sky-blue-light'
                  }`}
                >
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{type.emoji}</span>
                  <span className={`font-button-text text-button-text text-center ${selectedType === type.value ? 'text-primary' : 'text-on-surface-variant'}`}>{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Plataforma */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">apps</span>
              Em qual plataforma aconteceu?
            </h2>
            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <button
                  key={p.label}
                  onClick={() => togglePlatform(p.label)}
                  className={`px-5 py-3 rounded-full font-button-text flex items-center gap-2 transition-all active:scale-95 border-2 ${
                    selectedPlatforms.includes(p.label)
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-low text-on-surface-variant border-transparent hover:border-primary-container'
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </section>

          {/* Descrição */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">description</span>
              Pode nos contar mais detalhes?
            </h2>
            <div className="neomorphic-card p-4 rounded-[2rem]">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-body-lg resize-none placeholder:text-outline"
                placeholder="Descreva o que aconteceu. Não precisa ter vergonha, estamos aqui para ajudar..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center gap-4 p-4 bg-sky-blue-light rounded-xl">
              <button
                type="button"
                onClick={toggleMic}
                disabled={!supported}
                className={`p-2 rounded-full transition-all active:scale-95 ${isListening ? 'bg-critical-coral text-white animate-pulse' : 'hover:bg-white text-primary disabled:opacity-40'}`}
              >
                <span className="material-symbols-outlined">{isListening ? 'stop' : 'mic'}</span>
              </button>
              <p className="text-body-md text-on-primary-container">
                {isListening ? 'Gravando... clique para parar.' : supported ? 'Prefere falar? Aperte o microfone para gravar.' : 'Gravação não suportada neste navegador.'}
              </p>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col items-center gap-6 pt-6">
            <button
              onClick={() => navigate('/app/relato/sucesso')}
              className="w-full sm:w-auto px-12 py-5 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-headline-md text-headline-md rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined fill-icon">shield_with_heart</span>
              Enviar com Confiança
            </button>
            <p className="text-label-lg text-on-surface-variant italic flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span>
              Sua mensagem está protegida e só pessoas que ajudam verão.
            </p>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl h-touch-target-min flex justify-around items-center px-2">
        <button onClick={() => navigate('/app')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-lg text-label-lg">Início</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-2">
          <span className="material-symbols-outlined fill-icon">campaign</span>
          <span className="font-label-lg text-label-lg">Denunciar</span>
        </button>
        <button onClick={() => navigate('/app/direitos')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-lg text-label-lg">Dicas</span>
        </button>
        <button onClick={() => navigate('/app')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-lg text-label-lg">Perfil</span>
        </button>
      </nav>
    </div>
  )
}
