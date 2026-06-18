import Modal from './Modal'

interface EmergencyModalProps {
  onClose: () => void
}

const contacts = [
  { number: '100', label: 'Disque 100', desc: 'Direitos Humanos — 24h gratuito', icon: 'phone_forwarded', color: 'bg-primary text-on-primary' },
  { number: '190', label: 'Polícia Militar', desc: 'Emergência imediata', icon: 'local_police', color: 'bg-critical-coral text-white' },
  { number: '180', label: 'Central da Mulher', desc: 'Violência doméstica', icon: 'shield_with_heart', color: 'bg-tertiary-container text-on-tertiary-container' },
  { number: '197', label: 'Polícia Civil', desc: 'Delegacias e denúncias', icon: 'policy', color: 'bg-surface-container-high text-on-surface' },
]

export default function EmergencyModal({ onClose }: EmergencyModalProps) {
  return (
    <Modal title="🚨 Ajuda Urgente" onClose={onClose}>
      <p className="text-body-md text-on-surface-variant mb-6">
        Se você está em perigo agora, ligue imediatamente para um destes números. São gratuitos e disponíveis 24h.
      </p>
      <div className="space-y-3 mb-6">
        {contacts.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all active:scale-95 hover:brightness-105 ${c.color}`}
          >
            <span className="material-symbols-outlined text-3xl">{c.icon}</span>
            <div className="flex-1 text-left">
              <p className="font-button-text text-button-text">{c.label}</p>
              <p className="text-sm opacity-80">{c.desc}</p>
            </div>
            <div className="font-headline-md text-headline-md font-bold">{c.number}</div>
          </a>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full py-3 bg-surface-container text-on-surface-variant rounded-full font-button-text transition-all active:scale-95 hover:bg-surface-container-high"
      >
        Fechar
      </button>
    </Modal>
  )
}
