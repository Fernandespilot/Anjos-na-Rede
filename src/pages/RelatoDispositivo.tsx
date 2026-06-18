import { useNavigate, useSearchParams } from 'react-router-dom'

export default function RelatoDispositivo() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const agora = params.get('agora') ?? 'nao'

  const continuar = () => navigate(`/app/relato/sigilo?agora=${agora}`)

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
          <span className="material-symbols-outlined text-sm fill-icon">lock</span>
          <span className="hidden sm:inline">100% Anônimo</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-margin-mobile lg:px-margin-desktop pt-16 pb-8">
        <div className="w-full max-w-2xl lg:max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all ${s === 2 ? 'w-8 bg-primary' : 'w-4 bg-outline-variant'}`} />
            ))}
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 bg-primary-container/30 rounded-full mb-6 shadow-sm animate-pulse-soft">
              <span className="material-symbols-outlined text-6xl lg:text-7xl text-primary fill-icon">devices</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4 leading-tight">
              Você está usando um<br />
              <span className="text-primary">dispositivo de confiança?</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
              Para garantir sua segurança, recomendamos que você use um dispositivo pessoal e de sua confiança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* Sim */}
            <button
              onClick={continuar}
              className="group flex flex-col items-center gap-5 p-8 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-primary transition-all active:scale-95"
            >
              <div className="w-20 h-20 bg-sky-blue-light rounded-full flex items-center justify-center group-hover:bg-primary-container/50 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary fill-icon">check_circle</span>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-primary mb-2">Sim, é meu dispositivo</p>
                <p className="text-body-md text-on-surface-variant">Celular, tablet ou computador pessoal</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-sky-blue-light rounded-full text-primary font-button-text text-sm">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                Continuar
              </div>
            </button>

            {/* Não */}
            <button
              onClick={continuar}
              className="group flex flex-col items-center gap-5 p-8 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-critical-coral transition-all active:scale-95"
            >
              <div className="w-20 h-20 bg-critical-coral/10 rounded-full flex items-center justify-center group-hover:bg-critical-coral/20 transition-colors">
                <span className="material-symbols-outlined text-4xl text-critical-coral fill-icon">warning</span>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-critical-coral mb-2">Não tenho certeza</p>
                <p className="text-body-md text-on-surface-variant">Computador público, da escola ou trabalho</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-critical-coral/10 rounded-full text-critical-coral font-button-text text-sm">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                Continuar mesmo assim
              </div>
            </button>
          </div>

          {/* Aviso */}
          <div className="p-5 bg-gold-soft rounded-[1.5rem] border border-secondary-container flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary fill-icon mt-0.5 flex-shrink-0">info</span>
            <div>
              <p className="font-bold text-on-secondary-container mb-1">Por que isso importa?</p>
              <p className="text-body-md text-on-surface-variant">
                Em dispositivos públicos ou compartilhados, outras pessoas podem ver o histórico do seu navegador.
                Use sempre o modo anônimo (Ctrl+Shift+N) se precisar usar um dispositivo de terceiros.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
