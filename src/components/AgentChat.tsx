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

// Fallback local caso a API esteja indisponível
function detectIntentFallback(text: string): { text: string; actions: Action[] } {
  const t = text.toLowerCase()
  if (/agora|socorro|perigo|batendo|machucando|emergência|emergencia/.test(t)) {
    return {
      text: '🚨 Parece urgente! Vou te conectar com os canais de ajuda imediata.',
      actions: [
        { label: '📞 Canais de emergência', to: '/app/relato/emergencia' },
        { label: '📝 Registrar o que aconteceu', to: '/app/relato/agora' },
      ],
    }
  }
  if (/escola|colégio|colegio|professor|colega|bullying|briga/.test(t)) {
    return {
      text: '🏫 Entendi, algo aconteceu na escola. Posso te ajudar a registrar isso.',
      actions: [
        { label: '📋 Relato da escola', to: '/app/relato/escola' },
        { label: '📝 Formulário completo', to: '/app/relato/formulario' },
      ],
    }
  }
  if (/casa|família|familia|pai|mãe|mae|parente/.test(t)) {
    return {
      text: '🏠 Aconteceu algo em casa. Você está seguro(a) agora?',
      actions: [
        { label: '✅ Sim, estou seguro', to: '/app/relato/casa' },
        { label: '🚨 Preciso de ajuda agora', to: '/app/relato/emergencia' },
      ],
    }
  }
  if (/internet|online|whatsapp|instagram|tiktok|jogo|foto|cyberbullying/.test(t)) {
    return {
      text: '📱 Algo aconteceu na internet. Vou te ajudar a registrar.',
      actions: [
        { label: '🌐 Relato de internet', to: '/app/relato/internet' },
      ],
    }
  }
  return {
    text: 'Pode me contar mais? Estou aqui para te ajudar.',
    actions: [
      { label: '🏫 Escola', reply: 'aconteceu na escola' },
      { label: '🏠 Casa', reply: 'aconteceu em casa' },
      { label: '📱 Internet', reply: 'aconteceu na internet' },
      { label: '📋 Outro', to: '/app/relato/formulario' },
    ],
  }
}

async function askGroq(
  messages: { role: string; content: string }[]
): Promise<{ text: string; actions: Action[] }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
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
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { transcript, isListening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  // Histórico para enviar ao Groq (só mensagens de texto, sem actions)
  const history = useRef<{ role: string; content: string }[]>([])

  // Abre o chat ao receber evento do botão "Quero Conversar"
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-agent-chat', handler)
    return () => window.removeEventListener('open-agent-chat', handler)
  }, [])

  useEffect(() => {
    if (transcript) setInput(transcript)
  }, [transcript])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { from: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    resetTranscript()
    setLoading(true)

    // Adiciona ao histórico
    history.current = [...history.current, { role: 'user', content: trimmed }]

    let reply: { text: string; actions: Action[] }
    try {
      reply = await askGroq(history.current)
    } catch {
      // Fallback para keywords se API falhar
      reply = detectIntentFallback(trimmed)
    }

    // Adiciona resposta ao histórico
    history.current = [...history.current, { role: 'assistant', content: reply.text }]

    setMessages(prev => [...prev, { from: 'agent', text: reply.text, actions: reply.actions }])
    setLoading(false)
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
    if (isListening) { stopListening() } else { resetTranscript(); startListening() }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-4 z-[70] w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 hover:scale-110"
        aria-label="Abrir assistente"
      >
        <span className="material-symbols-outlined text-2xl fill-icon">
          {open ? 'close' : 'support_agent'}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-40 right-4 z-[70] w-[340px] max-w-[calc(100vw-2rem)] bg-background rounded-[1.5rem] shadow-2xl border border-outline-variant flex flex-col overflow-hidden"
          style={{ maxHeight: '70vh' }}
        >
          {/* Header */}
          <div className="bg-primary text-on-primary px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-on-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined fill-icon text-xl">support_agent</span>
            </div>
            <div className="flex-1">
              <p className="font-button-text text-sm">Anjo da Rede</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-safety-green inline-block"></span>
                <p className="text-xs opacity-75">Assistente com IA · online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-on-primary/20 transition-all">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-lowest">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-2 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-[1.25rem] text-sm ${
                  msg.from === 'user'
                    ? 'bg-primary text-on-primary rounded-br-sm'
                    : 'bg-surface-container text-on-surface rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                {msg.actions && msg.actions.length > 0 && (
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

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-start">
                <div className="bg-surface-container px-4 py-3 rounded-[1.25rem] rounded-bl-sm flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
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
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder={isListening ? 'Ouvindo...' : 'Digite ou fale...'}
              disabled={loading}
              className="flex-1 bg-surface-container rounded-full px-4 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
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
