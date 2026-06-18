import { useNavigate, useSearchParams } from 'react-router-dom'

export default function RelatoSigilo() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const agora = params.get('agora')

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
              <div key={s} className={`h-2 rounded-full transition-all ${s === 2 ? 'w-8 bg-primary' : 'w-4 bg-outline-variant'}`} />
            ))}
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 bg-safety-green/30 rounded-full mb-6 shadow-sm animate-pulse-soft">
              <span className="text-6xl lg:text-7xl">🛡️</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              Sua privacidade é<br />
              <span className="text-primary">garantida</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
              Este é um canal de comunicação sigiloso. Nenhuma informação do seu dispositivo é registrada.
            </p>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: 'visibility_off', label: 'Anônimo', desc: 'Não precisamos saber quem você é', variant: 'blue' as const },
              { icon: 'devices_off', label: 'Sem rastreio', desc: 'Nenhum dado do aparelho é salvo', variant: 'blue' as const },
              { icon: 'shield_lock', label: 'Seguro', desc: 'Comunicação protegida por sigilo', variant: 'green' as const },
            ].map(({ icon, label, desc, variant }) => (
              <div key={label} className={`flex flex-col items-center text-center gap-3 p-6 rounded-[1.5rem] ${variant === 'green' ? 'bg-safety-green/20' : 'bg-sky-blue-light'}`}>
                <span className="material-symbols-outlined text-3xl text-primary fill-icon">{icon}</span>
                <p className="font-headline-md text-headline-md text-on-surface">{label}</p>
                <p className="text-body-md text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>

          {/* Trusted device warning */}
          <div className="p-6 bg-gold-soft rounded-[2rem] mb-8 border border-secondary-container">
            <p className="font-bold text-on-secondary-container mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon">warning</span>
              Você está em um local seguro?
            </p>
            <p className="text-body-md text-on-surface-variant">
              Evite usar computadores públicos ou de terceiros. Use um dispositivo pessoal em um local privado para maior segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate(`/app/relato/formulario${agora === 'sim' ? '?urgente=sim' : ''}`)}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-on-primary font-headline-md text-headline-md rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <span className="material-symbols-outlined fill-icon">shield_with_heart</span>
              Sim, estou seguro — Continuar
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-surface-container text-on-surface-variant font-button-text rounded-full transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">exit_to_app</span>
              Voltar para o início
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
