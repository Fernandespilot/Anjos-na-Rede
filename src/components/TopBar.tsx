import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  showBack?: boolean
  title?: string
  showIcons?: boolean
}

export default function TopBar({ showBack = false, title = 'Anjos da Rede', showIcons = true }: TopBarProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-surface shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 h-16">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-blue-light transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        )}
        <span className="font-headline-md text-headline-md font-bold text-primary">{title}</span>
      </div>
      {showIcons && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 rounded-full hover:bg-sky-blue-light transition-colors active:scale-95 flex items-center gap-2 text-on-surface-variant"
            title="Área do Tutor"
          >
            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
            <span className="hidden md:inline font-label-lg text-label-lg">Área do Tutor</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-primary-container">person</span>
          </div>
        </div>
      )}
    </header>
  )
}
