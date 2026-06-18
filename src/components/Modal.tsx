import { type ReactNode, useEffect } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-sky-blue-light flex items-center justify-center transition-all active:scale-95">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
