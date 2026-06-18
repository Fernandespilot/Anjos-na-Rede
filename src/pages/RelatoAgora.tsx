import { useNavigate } from 'react-router-dom'

export default function RelatoAgora() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col font-body-md text-on-surface">
      <div className="blob-bg" />

      <header className="bg-background/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop py-4 h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-sky-blue-light transition-all active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-label-lg">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="hidden sm:inline">100% Anônimo</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-margin-mobile lg:px-margin-desktop pt-16 pb-8">
        <div className="w-full max-w-2xl lg:max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all ${s === 1 ? 'w-8 bg-primary' : 'w-4 bg-outline-variant'}`} />
            ))}
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 bg-critical-coral/10 rounded-full mb-6 shadow-sm animate-pulse-soft">
              <span className="text-6xl lg:text-7xl">⚠️</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4 leading-tight">
              Isso está acontecendo<br />
              <span className="text-critical-coral">agora?</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
              Precisamos saber para te ajudar da melhor forma possível.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Sim */}
            <button
              onClick={() => navigate('/app/relato/emergencia')}
              className="group relative flex flex-col items-center gap-5 p-8 lg:p-10 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-critical-coral transition-all active:scale-95 text-left"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-critical-coral/10 rounded-full flex items-center justify-center group-hover:bg-critical-coral/20 transition-colors">
                <span className="material-symbols-outlined text-4xl lg:text-5xl text-critical-coral fill-icon">emergency</span>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-critical-coral mb-2">Sim, está acontecendo</p>
                <p className="text-body-md text-on-surface-variant">Vamos acionar ajuda imediata para você</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-critical-coral/10 rounded-full text-critical-coral font-button-text text-sm">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                Preciso de ajuda agora
              </div>
            </button>

            {/* Não */}
            <button
              onClick={() => navigate('/app/relato/dispositivo?agora=nao')}
              className="group relative flex flex-col items-center gap-5 p-8 lg:p-10 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-primary transition-all active:scale-95 text-left"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-sky-blue-light rounded-full flex items-center justify-center group-hover:bg-primary-container/50 transition-colors">
                <span className="material-symbols-outlined text-4xl lg:text-5xl text-primary fill-icon">history</span>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-primary mb-2">Não, já passou</p>
                <p className="text-body-md text-on-surface-variant">Quero registrar algo que aconteceu</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-sky-blue-light rounded-full text-primary font-button-text text-sm">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                Registrar situação
              </div>
            </button>
          </div>

          {/* Emergency contacts */}
          <div className="mt-10 p-6 bg-critical-coral/5 rounded-[2rem] border border-critical-coral/20">
            <p className="text-label-lg text-critical-coral font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm fill-icon">emergency_home</span>
              Em caso de perigo imediato, ligue agora:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { n: '190', label: 'Polícia' },
                { n: '100', label: 'Disque Direitos' },
                { n: '197', label: 'Polícia Civil' },
              ].map(({ n, label }) => (
                <a key={n} href={`tel:${n}`} className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
                  <span className="font-headline-md text-headline-md text-critical-coral font-bold">{n}</span>
                  <span className="text-label-lg text-on-surface-variant text-center">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
