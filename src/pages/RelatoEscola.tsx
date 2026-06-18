import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

const eventTypes = [
  { emoji: '😠', label: 'Bullying', value: 'bullying' },
  { emoji: '⚔️', label: 'Briga', value: 'briga' },
  { emoji: '😔', label: 'Exclusão', value: 'exclusao' },
]

const whoOptions = [
  { icon: 'face', label: 'Colega', value: 'colega' },
  { icon: 'school', label: 'Professor', value: 'professor' },
  { icon: 'badge', label: 'Funcionário', value: 'funcionario' },
  { icon: 'more_horiz', label: 'Outro', value: 'outro' },
]

export default function RelatoEscola() {
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedWho, setSelectedWho] = useState<string[]>([])
  const [witness, setWitness] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const { transcript, isListening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) setWitness(transcript)
  }, [transcript])

  const toggleMic = () => {
    if (isListening) { stopListening() } else { resetTranscript(); startListening() }
  }

  const toggleWho = (val: string) => {
    setSelectedWho((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/app/relato/sucesso')
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
      <div className="blob-bg"></div>

      <header className="bg-background shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-4 h-16">
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
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gold-soft rounded-full mb-4 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-on-secondary-container fill-icon">school</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Canal Escola</h1>
          <p className="text-body-lg text-on-surface-variant">Conte para nós o que aconteceu. Você está em um lugar seguro.</p>
        </div>

        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* O que aconteceu */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">psychology_alt</span>
              O que aconteceu?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {eventTypes.map((ev) => (
                <label key={ev.value} className="relative flex flex-col items-center justify-center p-6 neomorphic-card cursor-pointer border-4 border-transparent hover:border-sky-blue-light transition-all active:scale-95 group rounded-[2rem]">
                  <input type="radio" name="event_type" value={ev.value} className="hidden" onChange={() => setSelectedEvent(ev.value)} />
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{ev.emoji}</span>
                  <span className={`font-button-text text-button-text ${selectedEvent === ev.value ? 'text-primary' : 'text-on-surface-variant'}`}>{ev.label}</span>
                  {selectedEvent === ev.value && (
                    <div className="absolute inset-0 border-4 border-primary rounded-[2rem] pointer-events-none"></div>
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Quem estava lá */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">group</span>
              Quem estava lá?
            </h2>
            <p className="text-body-md text-on-surface-variant mb-4 -mt-2">Não precisa de nomes, apenas diga o papel deles.</p>
            <div className="flex flex-wrap gap-3">
              {whoOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleWho(opt.value)}
                  className={`px-6 py-3 rounded-full font-button-text flex items-center gap-2 transition-all active:scale-95 ${
                    selectedWho.includes(opt.value) ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-sky-blue-light'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Testemunhas */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">visibility</span>
              Tinha mais alguém vendo?
            </h2>
            <div className="neomorphic-card p-4 rounded-[2rem]">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-body-lg resize-none placeholder:text-outline"
                placeholder="Escreva ou conte aqui se alguém mais estava perto..."
                rows={3}
                value={witness}
                onChange={(e) => setWitness(e.target.value)}
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
          <div className="flex flex-col items-center gap-6 pt-10">
            <button
              type="submit"
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
        </form>
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
