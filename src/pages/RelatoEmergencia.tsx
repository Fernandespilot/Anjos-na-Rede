import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoPM from '../assets/logo-pm-mt.png'
import logoSAMU from '../assets/logo-samu.png'
import logoBombeiros from '../assets/logo-bombeiros-mt.png'
import logoLigue180 from '../assets/logo-ligue180.png'
import logoDisque100 from '../assets/logo-disque-100.webp'
import logoPoliciaACivil from '../assets/logo-policia-civil.jpeg'

const canais = [
  {
    numero: '190',
    nome: 'Polícia Militar',
    subtitulo: 'Crimes em andamento · Violência · Emergências',
    imgSrc: logoPM,
    destaque: true,
  },
  {
    numero: '192',
    nome: 'SAMU',
    subtitulo: 'Emergências médicas · Ferimentos',
    imgSrc: logoSAMU,
    destaque: false,
  },
  {
    numero: '193',
    nome: 'Corpo de Bombeiros',
    subtitulo: 'Resgates · Incêndios · Acidentes',
    imgSrc: logoBombeiros,
    destaque: false,
  },
  {
    numero: '100',
    nome: 'Disque Direitos Humanos',
    subtitulo: 'Crianças · Adolescentes · Violações',
    imgSrc: logoDisque100,
    destaque: false,
  },
  {
    numero: '180',
    nome: 'Central da Mulher',
    subtitulo: 'Violência doméstica · Familiar',
    imgSrc: logoLigue180,
    destaque: false,
  },
  {
    numero: '197',
    nome: 'Polícia Civil MT',
    subtitulo: 'Ocorrências · Investigações',
    imgSrc: logoPoliciaACivil,
    destaque: false,
  },
]

export default function RelatoEmergencia() {
  const navigate = useNavigate()
  const [chamando, setChamando] = useState<string | null>(null)

  const handleLigar = (numero: string) => {
    setChamando(numero)
    setTimeout(() => {
      window.location.href = `tel:${numero}`
      setTimeout(() => setChamando(null), 2000)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      <div className="blob-bg" />

      {/* Header — padrão das outras telas */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop py-4 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-sky-blue-light transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-label-lg">
          <span className="material-symbols-outlined text-sm fill-icon">lock</span>
          <span className="hidden sm:inline">100% Anônimo</span>
        </div>
      </header>

      <main className="pt-24 pb-16 px-margin-mobile lg:px-margin-desktop max-w-5xl mx-auto">

        {/* Alerta de emergência */}
        <div className="flex items-center gap-4 p-5 bg-critical-coral/10 border-2 border-critical-coral/30 rounded-[2rem] mb-10">
          <div className="w-12 h-12 bg-critical-coral rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-red">
            <span className="material-symbols-outlined text-white fill-icon">emergency</span>
          </div>
          <div>
            <p className="font-headline-md text-headline-md text-critical-coral font-bold">
              Situação de Emergência
            </p>
            <p className="text-body-md text-on-surface-variant">
              Selecione um canal abaixo e ligue imediatamente. Todos são gratuitos e funcionam 24h.
            </p>
          </div>
        </div>

        {/* Título central — padrão E-Denúncias */}
        <div className="text-center mb-10">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
            Canais de Denúncia e Emergência
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Denuncie e ajude a reduzir a violência. O anonimato é garantido!
          </p>
        </div>

        {/* Grid de canais — padrão circular do E-Denúncias + identidade visual */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {canais.map(({ numero, nome, subtitulo, imgSrc, destaque }) => {
            const imgClass = numero === '180'
              ? 'w-full h-full object-cover'
              : 'w-full h-full object-contain p-1'
            return (
            <button
              key={numero}
              onClick={() => handleLigar(numero)}
              className={`group flex flex-col items-center gap-4 p-6 lg:p-8 rounded-[2rem] transition-all active:scale-95 border-2 text-center
                ${destaque
                  ? 'neomorphic-card border-primary bg-primary/5 col-span-2 sm:col-span-3 lg:col-span-3'
                  : 'neomorphic-card border-transparent hover:border-primary-container'
                }
                ${chamando === numero ? 'scale-95 opacity-70' : ''}
              `}
            >
              {destaque ? (
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm border-4 border-primary/20 overflow-hidden">
                    <img src={imgSrc!} alt={nome} className={imgClass} />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-lg font-bold mb-3">
                      <span className="material-symbols-outlined text-sm fill-icon">star</span>
                      Emergência Principal
                    </div>
                    <p className="font-headline-lg text-headline-lg text-primary font-bold mb-1">{numero} — {nome}</p>
                    <p className="text-body-md text-on-surface-variant">{subtitulo}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-8 py-4 rounded-full font-button-text text-button-text transition-all flex-shrink-0
                    ${chamando === numero
                      ? 'bg-safety-green text-on-surface'
                      : 'bg-primary text-on-primary hover:shadow-lg'
                    }`}
                  >
                    <span className="material-symbols-outlined fill-icon">
                      {chamando === numero ? 'phone_in_talk' : 'call'}
                    </span>
                    {chamando === numero ? 'Ligando...' : 'Ligar agora'}
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full group-hover:scale-110 transition-transform shadow-sm border-2 border-outline-variant/30 overflow-hidden">
                    <img src={imgSrc!} alt={nome} className={imgClass} />
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md text-primary font-bold mb-1">{numero}</p>
                    <p className="font-button-text text-on-surface mb-1">{nome}</p>
                    <p className="text-label-lg text-on-surface-variant leading-snug">{subtitulo}</p>
                  </div>
                  <div className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-button-text text-sm transition-all
                    ${chamando === numero
                      ? 'bg-safety-green text-on-surface'
                      : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base fill-icon">
                      {chamando === numero ? 'phone_in_talk' : 'call'}
                    </span>
                    {chamando === numero ? 'Ligando...' : 'Toque para ligar'}
                  </div>
                </>
              )}
            </button>
            )
          })}
        </div>

        {/* Telefones de Contato — igual ao E-Denúncias */}
        <div className="neomorphic-card rounded-[2rem] overflow-hidden mb-10">
          <div className="px-6 py-4 bg-primary">
            <p className="font-headline-md text-headline-md text-on-primary text-center">
              Telefones de Contato CIOSP — Mato Grosso
            </p>
            <p className="text-label-lg text-on-primary/80 text-center mt-1">
              Em caso de emergência ligue diretamente no Centro Integrado de Operações de Segurança Pública
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Polícia Militar', numero: '190' },
              { label: 'Corpo de Bombeiros', numero: '193' },
              { label: 'Polícia Judiciária Civil', obs: 'Cuiabá e Várzea Grande', numero: '197' },
              { label: 'Polícia Judiciária Civil', obs: 'Outras cidades de Mato Grosso', numero: '181' },
              { label: 'Polícia Judiciária Civil', obs: 'Caso estiver em outro Estado', numero: '(65) 3613-6981' },
              { label: 'Secretaria de Mobilidade Urbana', numero: '118' },
              { label: 'Guarda Municipal de Várzea Grande', numero: '153' },
              { label: 'Polícia Rodoviária Federal', numero: '191' },
              { label: 'Defesa Civil', numero: '199' },
            ].map(({ label, numero, obs }) => (
              <a
                key={`${numero}-${obs}`}
                href={`tel:${numero.replace(/\D/g, '')}`}
                className="flex items-start justify-between p-4 bg-surface-container-low rounded-xl hover:bg-sky-blue-light transition-all active:scale-95 group"
              >
                <div>
                  <span className="text-body-md text-on-surface group-hover:text-primary transition-colors font-medium">{label}</span>
                  {obs && <p className="text-label-lg text-on-surface-variant">{obs}</p>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                  <span className="font-bold text-primary text-body-md">{numero}</span>
                  <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm">call</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* O que fazer agora */}
        <div className="p-6 bg-sky-blue-light rounded-[2rem] mb-8">
          <h3 className="font-headline-md text-headline-md text-primary mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined fill-icon">tips_and_updates</span>
            O que fazer agora
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: 'run_circle', text: 'Se possível, saia do local de perigo imediatamente' },
              { icon: 'groups', text: 'Procure estar perto de outras pessoas' },
              { icon: 'phone_forwarded', text: 'Ligue para um familiar ou pessoa de confiança' },
              { icon: 'location_on', text: 'Anote o endereço exato para informar à polícia' },
              { icon: 'screenshot_monitor', text: 'Se for online: tire prints, não delete as provas' },
              { icon: 'do_not_touch', text: 'Não confronte o agressor — busque ajuda antes' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                <span className="material-symbols-outlined text-primary fill-icon mt-0.5 flex-shrink-0">{icon}</span>
                <p className="text-body-md text-on-surface leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ação secundária */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/app/relato/sigilo?agora=sim')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-on-primary font-button-text rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <span className="material-symbols-outlined fill-icon">shield_with_heart</span>
            Já estou seguro — Quero fazer um relato
          </button>
          <button
            onClick={() => navigate('/app')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-surface-container text-on-surface-variant font-button-text rounded-full transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">home</span>
            Início
          </button>
        </div>

      </main>
    </div>
  )
}
