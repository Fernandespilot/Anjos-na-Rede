import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface Message {
  from: 'agent' | 'user'
  text: string
  actions?: Action[]
}

interface Action {
  label: string
  to?: string
  reply?: string
}

function detectIntent(text: string): { reply: string; actions: Action[] } {
  const t = text.toLowerCase()

  if (/agora|socorro|perigo|help|emergência|emergencia|batendo|machucando|violência/.test(t)) {
    return {
      reply: '🚨 Parece urgente! Vou te conectar com os canais de ajuda imediata.',
      actions: [
        { label: '📞 Ver canais de emergência', to: '/app/relato/emergencia' },
        { label: '📝 Registrar o que aconteceu', to: '/app/relato/agora' },
      ],
    }
  }
  if (/escola|colégio|colegio|professor|colega|bullying|briga/.test(t)) {
    return {
      reply: '🏫 Entendi, algo aconteceu na escola. Posso te ajudar a registrar isso agora.',
      actions: [
        { label: '📋 Relato da escola', to: '/app/relato/escola' },
        { label: '💬 Contar de outra forma', reply: 'Pode me contar com suas palavras o que aconteceu?' },
      ],
    }
  }
  if (/casa|família|familia|pai|mãe|mae|irmão|irmao|parente|familiar/.test(t)) {
    return {
      reply: '🏠 Aconteceu algo em casa? Você está em segurança agora?',
      actions: [
        { label: '✅ Sim, estou seguro', to: '/app/relato/casa' },
        { label: '🚨 Não, preciso de ajuda agora', to: '/app/relato/emergencia' },
      ],
    }
  }
  if (/internet|online|rede|instagram|whatsapp|tiktok|jogo|game|foto|cyberbullying|mensagem/.test(t)) {
    return {
      reply: '📱 Algo aconteceu na internet ou nas redes sociais. Vou te ajudar a registrar.',
      actions: [
        { label: '🌐 Relato de internet', to: '/app/relato/internet' },
        { label: '📋 Formulário completo', to: '/app/relato/formulario' },
      ],
    }
  }
  if (/direito|direitos|lei|proteg|ajuda|informação|informacao|prevenção|prevencao/.test(t)) {
    return {
      reply: '📚 Posso te mostrar seus direitos e como se proteger!',
      actions: [
        { label: '📖 Ver meus direitos', to: '/app/direitos' },
        { label: '🏠 Voltar ao início', to: '/app' },
      ],
    }
  }
  if (/sim|ok|quero|pode|bora|vamos/.test(t)) {
    return {
      reply: 'Ótimo! Me conta mais — onde ou como aconteceu?',
      actions: [
        { label: '🏫 Na escola', reply: 'escola' },
        { label: '🏠 Em casa', reply: 'casa' },
        { label: '📱 Na internet', reply: 'internet' },
        { label: '📋 Outro lugar', to: '/app/relato/formulario' },
      ],
    }
  }
  if (/não|nao|tchau|sair|fechar/.test(t)) {
    return {
      reply: 'Tudo bem! Estou aqui sempre que precisar. Cuide-se! 💙',
      actions: [{ label: '🏠 Ir ao início', to: '/app' }],
    }
  }

  return {
    reply: 'Entendi. Pode me contar onde aconteceu para eu te direcionar melhor?',
    actions: [
      { label: '🏫 Escola', reply: 'escola' },
      { label: '🏠 Casa', reply: 'casa' },
      { label: '📱 Internet', reply: 'internet' },
      { label: '📋 Outro', to: '/app/relato/formulario' },
    ],
  }
}

const INITIAL: Message[] = [
  {
    from: 'agent',
    text: 'Olá! Sou o Anjo da Rede 💙 Estou aqui para te ajudar. O que está acontecendo?',
    actions: [
      { label: '🚨 Preciso de ajuda agora', to: '/app/relato/emergencia' },
      { label: '📝 Quero registrar algo', reply: 'quero registrar algo que aconteceu' },
      { label: '📖 Quero saber meus direitos', to: '/app/direitos' },
    ],
  },
]

export default function AgentChat() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const { transcript, isListening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) setInput(transcript)
  }, [transcript])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { from: 'user', text: trimmed }
    const { reply, actions } = detectIntent(trimmed)
    const agentMsg: Message = { from: 'agent', text: reply, actions }
    setMessages((prev) => [...prev, userMsg, agentMsg])
    setInput('')
    resetTranscript()
  }

  const handleAction = (action: Action) => {
    if (action.to) {
      setOpen(false)
      navigate(action.to)
    } else if (action.reply) {
      send(action.reply)
    }
  }

  const toggleMic = () => {
    if (isListening) {
      stopListening()
    } else {
      resetTranscript()
      startListening()
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-4 z-[70] w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 hover:scale-110"
        aria-label="Abrir assistente"
      >
        <span className="material-symbols-outlined text-2xl fill-icon">
          {open ? 'close' : 'support_agent'}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-40 right-4 z-[70] w-[340px] max-w-[calc(100vw-2rem)] bg-background rounded-[1.5rem] shadow-2xl border border-outline-variant flex flex-col overflow-hidden"
          style={{ maxHeight: '70vh' }}>

          {/* Header */}
          <div className="bg-primary text-on-primary px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-on-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined fill-icon text-xl">support_agent</span>
            </div>
            <div className="flex-1">
              <p className="font-button-text text-sm">Anjo da Rede</p>
              <p className="text-xs opacity-75">Assistente virtual · online</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-on-primary/20 transition-all">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-lowest">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-2 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-[1.25rem] text-body-md text-sm ${
                  msg.from === 'user'
                    ? 'bg-primary text-on-primary rounded-br-sm'
                    : 'bg-surface-container text-on-surface rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                {msg.actions && (
                  <div className="flex flex-wrap gap-2 max-w-[90%]">
                    {msg.actions.map((a, j) => (
                      <button
                        key={j}
                        onClick={() => handleAction(a)}
                        className="px-3 py-1.5 bg-primary-container text-on-primary-container text-xs font-button-text rounded-full hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-outline-variant bg-background flex gap-2 items-center">
            {supported && (
              <button
                onClick={toggleMic}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all flex-shrink-0 ${
                  isListening ? 'bg-critical-coral text-white animate-pulse' : 'bg-surface-container text-on-surface-variant hover:bg-sky-blue-light'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{isListening ? 'stop' : 'mic'}</span>
              </button>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder={isListening ? 'Ouvindo...' : 'Digite ou fale...'}
              className="flex-1 bg-surface-container rounded-full px-4 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-on-primary disabled:opacity-40 transition-all active:scale-90 flex-shrink-0"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
