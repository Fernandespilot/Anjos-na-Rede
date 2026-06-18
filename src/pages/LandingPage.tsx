import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="bg-background flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 sticky top-0 z-50 shadow-sm">
        <div className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-primary font-bold transition-all duration-200 active:scale-95" href="#">Início</a>
          <a className="text-on-surface-variant hover:bg-sky-blue-light px-4 py-2 rounded-lg transition-all" href="#como-funciona">Como Funciona</a>
          <a className="text-on-surface-variant hover:bg-sky-blue-light px-4 py-2 rounded-lg transition-all" href="#canais">Canais</a>
          <button
            onClick={() => navigate('/app/relato/agora')}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-button-text transition-all active:scale-95 shadow-md"
          >
            Denunciar agora
          </button>
        </div>
        <div className="md:hidden flex gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
          <span className="material-symbols-outlined text-primary text-3xl">help</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-gradient relative min-h-[600px] flex items-center pt-8 overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center md:text-left">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-label-lg font-label-lg mb-6 inline-block">
              Plataforma de Utilidade Pública Digital
            </span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6 leading-tight">
              Sua voz é a nossa força
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-8 max-w-xl">
              Evoluímos para ser a ponte democrática e silenciosa entre o cidadão e a rede de proteção nacional. Um ambiente seguro para proteger crianças e adolescentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate('/app/relato/agora')}
                className="bg-primary text-on-primary font-button-text text-button-text px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined">campaign</span>
                Fazer um Relato Agora
              </button>
              <button
                onClick={() => navigate('/app')}
                className="bg-surface-container-highest text-primary font-button-text text-button-text px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-sky-blue-light transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">smartphone</span>
                Acessar App
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute w-[120%] h-[120%] bg-primary-container/20 rounded-full blur-3xl -z-10"></div>
            <div className="w-full max-w-lg rounded-xl soft-shadow bg-primary-container/30 h-80 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl">🛡️</span>
                <p className="font-headline-md text-headline-md text-on-primary-container mt-4">Proteção Digital</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Como Funciona */}
      <section className="py-20 bg-background" id="como-funciona">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">A Ponte Tecnológica</h2>
            <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Nossa tecnologia garante que sua mensagem chegue às mãos certas com agilidade e inteligência.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'person_pin', title: 'Cidadão', desc: 'O relato é feito de forma 100% anônima e silenciosa através do nosso site ou app.', bg: 'hover:bg-sky-blue-light', iconBg: 'bg-primary-container text-on-primary-container' },
              { icon: 'psychology', title: 'Filtro Inteligente', desc: 'Nossa IA (NLP) analisa o relato, bloqueia trotes e classifica a urgência do caso em segundos.', bg: 'hover:bg-gold-soft', iconBg: 'bg-secondary-container text-on-secondary-container' },
              { icon: 'account_balance', title: 'Órgão Competente', desc: 'Encaminhamento automático e direto para Polícia, Conselho Tutelar ou Disque 100.', bg: 'hover:bg-safety-green/20', iconBg: 'bg-tertiary-container text-on-tertiary-container' },
            ].map((step) => (
              <div key={step.title} className={`bg-surface-container-lowest p-8 rounded-xl soft-shadow border border-sky-blue-light group ${step.bg} transition-all`}>
                <div className={`w-14 h-14 ${step.iconBg} rounded-full flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">{step.title}</h3>
                <p className="text-body-md text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Canais */}
      <section className="py-20 bg-surface-container-low" id="canais">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Nossas Conexões</h2>
              <p className="text-body-md text-on-surface-variant max-w-xl">
                Integramos os principais canais de proteção para uma resposta rápida e institucional.
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-full border border-sky-blue-light shadow-sm flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-safety-green"></span>
              </span>
              <span className="text-label-lg font-label-lg text-primary">Rede Ativa em Tempo Real</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Disque 100', desc: 'Direitos Humanos. Integração direta para relatos de violação infantil.', icon: 'phone_forwarded', border: 'border-primary', iconColor: 'text-primary-container' },
              { title: 'Conselho Tutelar', desc: 'Ação local imediata e acompanhamento familiar especializado.', icon: 'family_restroom', border: 'border-secondary', iconColor: 'text-secondary' },
              { title: 'DECA / DEDM', desc: 'Delegacias Especializadas para proteção da criança e da mulher.', icon: 'policy', border: 'border-critical-coral', iconColor: 'text-critical-coral' },
              { title: 'Patrulha Escolar', desc: 'Segurança pública preventiva dentro do ambiente estudantil.', icon: 'local_police', border: 'border-primary-container', iconColor: 'text-primary-container' },
            ].map((canal) => (
              <div key={canal.title} className={`bg-white p-6 rounded-xl soft-shadow border-b-4 ${canal.border} hover:-translate-y-2 transition-transform`}>
                <h4 className="font-bold text-primary mb-2">{canal.title}</h4>
                <p className="text-body-md text-on-surface-variant mb-4 text-sm">{canal.desc}</p>
                <span className={`material-symbols-outlined ${canal.iconColor} text-4xl`}>{canal.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segurança */}
      <section className="py-20 bg-primary text-on-primary">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline-md text-headline-md mb-6">Segurança e Anonimato Garantidos</h2>
            <div className="space-y-8">
              {[
                { icon: 'encrypted', title: 'Conformidade LGPD', desc: 'Tratamento de dados rigoroso seguindo a Lei Geral de Proteção de Dados.' },
                { icon: 'shield_with_heart', title: 'Filtro de Confiabilidade', desc: 'Algoritmo proprietário que valida a veracidade e evita ataques coordenados.' },
                { icon: 'visibility_off', title: 'Sigilo Absoluto', desc: 'O anonimato é nossa premissa. Sua identidade nunca é revelada aos órgãos.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="material-symbols-outlined text-4xl text-primary-container">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-on-primary/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 relative">
            <div className="absolute -top-4 -right-4 bg-secondary-container text-on-secondary-container p-4 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-3xl fill-icon">verified_user</span>
            </div>
            <h4 className="font-headline-md text-headline-md mb-4">Selo Digital do Bem</h4>
            <p className="mb-6 opacity-90">Nossa plataforma é auditada para garantir que nenhum grito de socorro seja ignorado.</p>
            <div className="flex gap-4 items-center">
              <div className="h-12 w-32 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">LGPD READY</div>
              <div className="h-12 w-32 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">SSL SECURE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-20 bg-background text-center">
        <div className="container mx-auto px-margin-mobile">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Pronto para transformar silêncio em ação?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <button
              onClick={() => navigate('/app/relato/agora')}
              className="bg-secondary-container text-on-secondary-container font-button-text text-button-text px-10 py-5 rounded-xl flex items-center justify-center gap-3 hover:shadow-xl transition-all active:scale-95 neomorphic-active"
            >
              <span className="material-symbols-outlined">edit_square</span>
              Fazer um Relato Agora
            </button>
            <button
              onClick={() => navigate('/app')}
              className="bg-primary text-on-primary font-button-text text-button-text px-10 py-5 rounded-xl flex items-center justify-center gap-3 hover:shadow-xl transition-all active:scale-95 neomorphic-active"
            >
              <span className="material-symbols-outlined">smartphone</span>
              Acessar Aplicativo
            </button>
          </div>
          <div className="border-t border-surface-container-high pt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            <div>
              <div className="font-headline-md text-headline-md font-bold text-primary mb-4">Anjos da Rede</div>
              <p className="text-sm text-on-surface-variant">Proteção digital e física para as futuras gerações do Brasil.</p>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-4">Plataforma</h5>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a className="hover:text-primary" href="#">Como Denunciar</a></li>
                <li><a className="hover:text-primary" href="#">Mapa de Riscos</a></li>
                <li><a className="hover:text-primary" href="#">Termos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-4">Recursos</h5>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a className="hover:text-primary" href="#">Materiais para Escolas</a></li>
                <li><a className="hover:text-primary" href="#">Blog de Prevenção</a></li>
                <li><a className="hover:text-primary" href="#">Estatísticas</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-4">Contato</h5>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a className="hover:text-primary" href="#">imprensa@anjosdarede.gov.br</a></li>
                <li><a className="hover:text-primary" href="#">Suporte Institucional</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-xs text-on-surface-variant/60">
            © 2024 Anjos da Rede - Plataforma Digital de Utilidade Pública. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* FAB */}
      <button
        onClick={() => navigate('/app/relato/agora')}
        className="fixed bottom-24 right-8 z-[60] bg-primary text-on-primary w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-bounce md:bottom-8 transition-transform hover:scale-110 active:scale-90"
      >
        <span className="material-symbols-outlined text-3xl">add_alert</span>
      </button>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-touch-target-min px-2 pb-safe bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl">
        <a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-2" href="#">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-lg text-label-lg">Início</span>
        </a>
        <button onClick={() => navigate('/app/relato/agora')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2">
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-label-lg text-label-lg">Denunciar</span>
        </button>
        <button onClick={() => navigate('/app')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-lg text-label-lg">Dicas</span>
        </button>
        <a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-lg text-label-lg">Perfil</span>
        </a>
      </nav>
    </div>
  )
}
