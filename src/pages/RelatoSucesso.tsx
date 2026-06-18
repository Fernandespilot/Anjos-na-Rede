import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

export default function RelatoSucesso() {
  const navigate = useNavigate()
  const location = useLocation()
  const [show, setShow] = useState(false)
  const protocol = useRef<string>(
    (location.state as { protocol?: string })?.protocol ??
    `2024-${Math.floor(Math.random() * 90000) + 10000}`
  )

  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-margin-mobile py-12 text-center">
      <div className="blob-bg" />

      <div className={`w-full max-w-lg transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-safety-green/30 rounded-full blur-2xl scale-150" />
          <div className="w-36 h-36 bg-safety-green rounded-full flex items-center justify-center shadow-2xl relative z-10 mx-auto animate-pulse-soft">
            <span className="material-symbols-outlined text-7xl text-white fill-icon">done_all</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-8 text-4xl">
          {['⭐', '⭐', '⭐'].map((s, i) => (
            <span key={i} className="animate-floating" style={{ animationDelay: `${i * 0.2}s` }}>{s}</span>
          ))}
        </div>

        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Recebemos sua denúncia!</h1>
        <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-4">
          Você foi muito corajoso(a). Nossa equipe vai cuidar de tudo com total sigilo e responsabilidade.
        </p>
        <p className="text-body-lg text-primary font-bold mb-10">Você não está sozinho! 💙</p>

        {/* Protocol */}
        <div className="neomorphic-card rounded-[2rem] p-6 mb-8 border border-outline-variant/20">
          <p className="font-label-lg text-label-lg text-on-surface-variant mb-2 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm fill-icon">tag</span>
            Número do Protocolo
          </p>
          <p className="font-headline-lg text-headline-lg text-primary mb-2">#{protocol.current}</p>
          <p className="text-body-md text-on-surface-variant text-sm">
            Guarde este número para acompanhar o andamento da sua denúncia.
          </p>
          <button
            onClick={() => navigate('/app/acompanhar')}
            className="mt-4 flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-sky-blue-light text-primary font-button-text rounded-full hover:bg-primary-container transition-all active:scale-95 text-sm"
          >
            <span className="material-symbols-outlined text-sm fill-icon">manage_search</span>
            Acompanhar pelo protocolo
          </button>
        </div>

        {/* Next steps */}
        <div className="bg-sky-blue-light rounded-[2rem] p-6 mb-8 text-left space-y-4">
          <h3 className="font-headline-md text-headline-md text-primary text-center mb-4">O que acontece agora?</h3>
          {[
            { icon: 'psychology', text: 'Nossa equipe vai analisar sua denúncia com cuidado.' },
            { icon: 'shield_with_heart', text: 'Um orientador entrará em contato de forma sigilosa.' },
            { icon: 'verified_user', text: 'Medidas de proteção serão tomadas rapidamente.' },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-white text-sm fill-icon">{s.icon}</span>
              </div>
              <p className="text-body-md text-on-surface-variant">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/app')}
            className="px-8 py-4 bg-primary text-on-primary rounded-full font-button-text hover:brightness-110 transition-all active:scale-95 shadow-lg"
          >
            Voltar para o Início
          </button>
          <button
            onClick={() => navigate('/app/relato/agora')}
            className="px-8 py-4 bg-secondary-container text-on-secondary-container rounded-full font-button-text hover:bg-secondary-fixed transition-all active:scale-95"
          >
            Fazer Outra Denúncia
          </button>
        </div>

        {/* Emergency */}
        <div className="mt-10 pt-8 border-t border-outline-variant/20">
          <p className="text-body-md text-on-surface-variant mb-4">Está em perigo imediato?</p>
          <a href="tel:100" className="bg-error text-white px-8 py-3 rounded-full font-bold text-xl flex items-center justify-center gap-2 mx-auto w-fit hover:scale-105 transition-transform">
            <span className="material-symbols-outlined">call</span>
            Disque 100
          </a>
        </div>
      </div>
    </div>
  )
}
