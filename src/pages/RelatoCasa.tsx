import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmergencyModal from '../components/EmergencyModal'
import Toast from '../components/Toast'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

const emotionOptions = [
  { emoji: '😊', label: 'Muito bem', value: 'bem' },
  { emoji: '😐', label: 'Mais ou menos', value: 'mais_ou_menos' },
  { emoji: '😟', label: 'Fico preocupado', value: 'preocupado' },
  { emoji: '😢', label: 'Fico triste', value: 'triste' },
]

const fearOptions = [
  { emoji: '👎', label: 'Não, sinto que estou seguro.', value: 'seguro' },
  { emoji: '👀', label: 'Sim, às vezes fico com medo.', value: 'medo' },
  { emoji: '❓', label: 'Prefiro não responder agora.', value: 'nao_responder' },
]

export default function RelatoCasa() {
  const navigate = useNavigate()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [selectedFear, setSelectedFear] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [showEmergency, setShowEmergency] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const { transcript, isListening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  useEffect(() => { if (transcript) setText(transcript) }, [transcript])

  const toggleMic = () => {
    if (isListening) { stopListening() } else { resetTranscript(); startListening() }
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen overflow-x-hidden">
      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <header className="bg-background shadow-sm flex justify-between items-center w-full px-margin-mobile py-4 fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 transition-all active:scale-95 text-primary">
            <span className="material-symbols-outlined text-[32px]">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} title="Área do Tutor">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">admin_panel_settings</span>
          </button>
          <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-32 px-margin-mobile max-w-2xl mx-auto flex flex-col items-center">
        {/* Progress */}
        <div className="w-full flex justify-center gap-2 mb-8">
          <div className="h-2 w-12 rounded-full bg-primary"></div>
          <div className="h-2 w-12 rounded-full bg-outline-variant"></div>
          <div className="h-2 w-12 rounded-full bg-outline-variant"></div>
        </div>

        {/* Header */}
        <div className="mb-8 animate-floating text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-sky-blue-light rounded-full blur-xl opacity-60"></div>
            <span className="text-6xl relative z-10">🏠</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile mt-6 text-primary">Oi, como é o seu dia em casa?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Escolha a opção que mais combina com o que você sente.</p>
        </div>

        {/* Emotions */}
        <div className="w-full space-y-6">
          <label className="block font-headline-md text-headline-md text-center mb-6">Como você se sente quando está em casa?</label>
          <div className="grid grid-cols-2 gap-4">
            {emotionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedEmotion(opt.value)}
                className={`flex flex-col items-center p-6 rounded-xl shadow-sm border-2 transition-all active:scale-95 min-h-[140px] justify-center ${
                  selectedEmotion === opt.value
                    ? 'neomorphic-selected bg-sky-blue-light'
                    : 'bg-surface-container-lowest border-transparent hover:bg-sky-blue-light'
                }`}
              >
                <span className="text-5xl mb-3">{opt.emoji}</span>
                <span className="font-button-text text-button-text text-on-surface-variant">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fear question */}
        <div className="w-full mt-12 space-y-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-sky-blue-light">
            <label className="block font-headline-md text-headline-md text-primary mb-4">Tem alguma coisa ou alguém que te assusta em casa?</label>
            <div className="space-y-3">
              {fearOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedFear(opt.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-full border-2 transition-all active:scale-95 text-left ${
                    selectedFear === opt.value ? 'border-primary bg-sky-blue-light' : 'border-outline-variant hover:border-primary'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-body-lg text-body-lg">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Free text */}
          <div className="space-y-4">
            <label className="block font-headline-md text-headline-md text-on-surface">Quer contar mais alguma coisa pra gente?</label>
            <div className="relative">
              <textarea
                className="w-full min-h-[160px] p-6 rounded-xl bg-surface-container border-transparent focus:border-primary focus:ring-0 font-body-md text-body-md transition-all resize-none shadow-inner"
                placeholder="Pode escrever ou desenhar o que quiser aqui..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={toggleMic}
                  disabled={!supported}
                  className={`p-3 rounded-full shadow-sm transition-all active:scale-95 ${isListening ? 'bg-critical-coral text-white animate-pulse' : 'bg-white text-primary hover:bg-sky-blue-light disabled:opacity-40'}`}
                >
                  <span className="material-symbols-outlined">{isListening ? 'stop' : 'mic'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setToast('Modo de desenho em breve!')}
                  className="p-3 bg-white rounded-full shadow-sm text-primary hover:bg-sky-blue-light transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">palette</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Help */}
        <div className="w-full mt-16 p-8 rounded-xl bg-error-container border border-critical-coral/20 flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2 text-on-error-container font-bold">
            <span className="material-symbols-outlined text-[32px]">emergency</span>
            <span className="font-headline-md text-headline-md">Precisa de ajuda agora?</span>
          </div>
          <p className="font-body-md text-body-md text-on-error-container max-w-md">Se você estiver se sentindo em perigo agora mesmo, aperte o botão abaixo. Alguém vai te ajudar na mesma hora.</p>
          <button
            onClick={() => setShowEmergency(true)}
            className="animate-pulse-red w-full py-4 bg-critical-coral text-white font-button-text text-button-text rounded-full shadow-lg transition-all active:scale-90 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined fill-icon">warning</span>
            PEDIDO DE AJUDA URGENTE
          </button>
        </div>

        {/* Submit */}
        <div className="w-full mt-12 pb-12">
          <button
            onClick={() => navigate('/app/relato/sucesso')}
            className="w-full py-5 bg-secondary-container text-on-secondary-container font-button-text text-button-text rounded-full shadow-lg hover:bg-secondary-fixed transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Continuar
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-touch-target-min px-2 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl">
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
        <button onClick={() => setShowEmergency(true)} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-lg text-label-lg">Perfil</span>
        </button>
      </nav>
    </div>
  )
}
