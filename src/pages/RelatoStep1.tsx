import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const feelings = [
  { emoji: '😊', label: 'Feliz', value: 'feliz' },
  { emoji: '😢', label: 'Triste', value: 'triste' },
  { emoji: '😨', label: 'Assustado', value: 'assustado' },
  { emoji: '😠', label: 'Bravo', value: 'bravo' },
]

const locations = [
  { icon: 'school', label: 'Escola', desc: 'Algo aconteceu no colégio', bg: 'bg-gold-soft', iconColor: 'text-secondary', to: '/app/relato/escola' },
  { icon: 'home', label: 'Casa', desc: 'Sobre minha família ou lar', bg: 'bg-safety-green', iconColor: 'text-on-primary-fixed-variant', to: '/app/relato/casa' },
  { icon: 'language', label: 'Internet', desc: 'Redes sociais, jogos ou celular', bg: 'bg-primary-container', iconColor: 'text-on-primary-container', to: '/app/relato/internet' },
  { icon: 'more_horiz', label: 'Outro lugar', desc: 'Em qualquer outro espaço', bg: 'bg-tertiary-container', iconColor: 'text-on-tertiary-container', to: '/app/relato/formulario' },
]

export default function RelatoStep1() {
  const navigate = useNavigate()
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
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

      <main className="pt-24 pb-16 px-margin-mobile lg:px-margin-desktop max-w-4xl mx-auto">

        {/* Como você está? */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              Como você está se sentindo?
            </h1>
            <p className="text-body-lg text-on-surface-variant">Selecione como está se sentindo agora</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {feelings.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedFeeling(f.value)}
                className={`group flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 transition-all active:scale-95 ${
                  selectedFeeling === f.value
                    ? 'border-primary bg-primary-container/20 neomorphic-active'
                    : 'border-transparent neomorphic-card hover:border-sky-blue-light'
                }`}
              >
                <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform">{f.emoji}</span>
                <span className={`font-button-text text-sm ${selectedFeeling === f.value ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-outline-variant/40 my-8" />

        {/* Sobre o que quer falar */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
              Sobre o que você quer falar?
            </h2>
            <p className="text-body-lg text-on-surface-variant">Selecione onde aconteceu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locations.map((loc) => (
              <button
                key={loc.label}
                onClick={() => setSelectedLocation(loc.label)}
                className={`group flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all active:scale-95 text-left ${
                  selectedLocation === loc.label
                    ? 'border-primary bg-primary-container/10 neomorphic-active'
                    : 'border-transparent neomorphic-card hover:border-primary-container'
                }`}
              >
                <div className={`w-16 h-16 rounded-full ${loc.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <span className={`material-symbols-outlined text-3xl fill-icon ${loc.iconColor}`}>{loc.icon}</span>
                </div>
                <div>
                  <p className={`font-headline-md text-headline-md mb-0.5 ${selectedLocation === loc.label ? 'text-primary' : 'text-on-surface'}`}>
                    {loc.label}
                  </p>
                  <p className="text-body-md text-on-surface-variant">{loc.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              const loc = locations.find((l) => l.label === selectedLocation)
              navigate(loc?.to ?? '/app/relato/formulario')
            }}
            className="flex items-center justify-center gap-2 px-12 py-4 bg-primary text-on-primary font-button-text text-button-text rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Continuar
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            onClick={() => navigate('/app')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-container text-on-surface-variant font-button-text rounded-full transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">home</span>
            Início
          </button>
        </div>
      </main>
    </div>
  )
}
