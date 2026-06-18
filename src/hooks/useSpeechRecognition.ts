import { useState, useRef, useCallback } from 'react'

interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  supported: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recRef = useRef<SpeechRecognition | null>(null)

  const supported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const startListening = useCallback(() => {
    if (!supported) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: typeof SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'pt-BR'
    rec.continuous = true
    rec.interimResults = true
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join('')
      setTranscript(text)
    }
    rec.onerror = () => setIsListening(false)
    rec.onend = () => setIsListening(false)
    rec.start()
    recRef.current = rec
    setIsListening(true)
  }, [supported])

  const stopListening = useCallback(() => {
    recRef.current?.stop()
    recRef.current = null
    setIsListening(false)
  }, [])

  const resetTranscript = useCallback(() => setTranscript(''), [])

  return { transcript, isListening, supported, startListening, stopListening, resetTranscript }
}
