import { NavLink } from 'react-router-dom'

interface BottomNavProps {
  activeTab?: 'home' | 'relatar' | 'mensagens' | 'ajuda' | 'dicas' | 'perfil'
}

export default function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Início', icon: 'home', to: '/app' },
    { id: 'relatar', label: 'Relatar', icon: 'campaign', to: '/app/relato' },
    { id: 'mensagens', label: 'Mensagens', icon: 'chat_bubble', to: '#' },
    { id: 'ajuda', label: 'Ajuda', icon: 'info', to: '#' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-touch-target-min px-4 bg-surface-container-lowest shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-lg">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all ${
              activeTab === tab.id || isActive
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`
          }
        >
          <span className="material-symbols-outlined">{tab.icon}</span>
          <span className="font-label-lg text-label-lg">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
