import { useNavigate } from 'react-router-dom'

const rights = [
  {
    emoji: '🛡️',
    title: 'Direito à Proteção',
    desc: 'Toda criança tem direito a ser protegida de violência, abuso, negligência e exploração. (ECA Art. 5°)',
    color: 'bg-sky-blue-light',
  },
  {
    emoji: '🗣️',
    title: 'Direito de Ser Ouvido',
    desc: 'Você tem o direito de expressar sua opinião e ser levado a sério em decisões que afetam sua vida. (ECA Art. 16°)',
    color: 'bg-gold-soft',
  },
  {
    emoji: '📚',
    title: 'Direito à Educação',
    desc: 'Toda criança tem direito a estudar em um ambiente seguro, respeitoso e sem discriminação. (ECA Art. 53°)',
    color: 'bg-safety-green',
  },
  {
    emoji: '❤️',
    title: 'Direito à Saúde',
    desc: 'Você merece atendimento médico e psicológico de qualidade, sempre que precisar. (ECA Art. 7°)',
    color: 'bg-tertiary-container',
  },
  {
    emoji: '🔒',
    title: 'Direito à Privacidade',
    desc: 'Sua identidade em relatos é protegida por lei. Ninguém pode te forçar a se identificar. (LGPD Art. 14°)',
    color: 'bg-primary-container',
  },
  {
    emoji: '🏠',
    title: 'Direito à Família',
    desc: 'Você tem direito a uma família que te cuide, proteja e ofereça carinho. (ECA Art. 19°)',
    color: 'bg-error-container',
  },
]

const channels = [
  { number: '100', label: 'Disque 100', desc: 'Violação de direitos humanos' },
  { number: '136', label: 'Saúde Mental', desc: 'CVV — apoio emocional 24h' },
  { number: '190', label: 'Polícia', desc: 'Emergências imediatas' },
]

export default function MeusDireitos() {
  const navigate = useNavigate()

  return (
    <div className="bg-background min-h-screen font-body-md text-on-surface">
      {/* Header */}
      <header className="bg-surface shadow-sm fixed top-0 w-full z-50 flex items-center gap-3 px-margin-mobile py-4 h-16">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full hover:bg-sky-blue-light flex items-center justify-center transition-all active:scale-95">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <span className="font-headline-md text-headline-md font-bold text-primary">Meus Direitos</span>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-6 bg-safety-green rounded-full mb-4 shadow-sm">
            <span className="text-5xl">📚</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">Você tem direitos!</h1>
          <p className="text-body-lg text-on-surface-variant">Conheça seus direitos e saiba como se proteger.</p>
        </div>

        {/* Rights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {rights.map((right) => (
            <div key={right.title} className={`${right.color} p-6 rounded-xl soft-shadow`}>
              <span className="text-4xl mb-3 block">{right.emoji}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{right.title}</h3>
              <p className="text-body-md text-on-surface-variant">{right.desc}</p>
            </div>
          ))}
        </div>

        {/* Emergency contacts */}
        <div className="bg-primary rounded-xl p-6 text-on-primary mb-8">
          <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">phone_forwarded</span>
            Canais de Ajuda
          </h3>
          <div className="space-y-3">
            {channels.map((c) => (
              <a key={c.number} href={`tel:${c.number}`} className="flex items-center justify-between bg-white/10 hover:bg-white/20 transition-all p-4 rounded-xl active:scale-95">
                <div>
                  <p className="font-button-text">{c.label}</p>
                  <p className="text-sm opacity-80">{c.desc}</p>
                </div>
                <span className="font-headline-md text-headline-md font-bold">{c.number}</span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/app/relato')}
          className="w-full py-5 bg-secondary-container text-on-secondary-container rounded-full font-button-text text-button-text shadow-lg hover:bg-secondary-fixed transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined fill-icon">campaign</span>
          Preciso Fazer um Relato
        </button>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-touch-target-min px-2 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl">
        <button onClick={() => navigate('/app')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-lg text-label-lg">Início</span>
        </button>
        <button onClick={() => navigate('/app/relato')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2">
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-label-lg text-label-lg">Relatar</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-safety-green text-on-primary-fixed-variant rounded-xl px-4 py-2">
          <span className="material-symbols-outlined fill-icon">menu_book</span>
          <span className="font-label-lg text-label-lg">Direitos</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-lg text-label-lg">Perfil</span>
        </button>
      </nav>
    </div>
  )
}
