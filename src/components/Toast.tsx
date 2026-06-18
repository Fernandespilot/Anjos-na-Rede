import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  onClose: () => void
}

const icons = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'cancel',
}

const colors = {
  success: 'bg-safety-green text-on-primary-fixed-variant',
  info: 'bg-sky-blue-light text-primary',
  warning: 'bg-gold-soft text-on-secondary-container',
  error: 'bg-error-container text-on-error-container',
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl font-button-text text-button-text animate-floating ${colors[type]} transition-all`}>
      <span className="material-symbols-outlined fill-icon">{icons[type]}</span>
      {message}
    </div>
  )
}
