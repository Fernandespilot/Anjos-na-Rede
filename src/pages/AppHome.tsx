import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import Toast from '../components/Toast'

// Evento customizado para abrir o AgentChat de qualquer tela
export function openAgentChat() {
  window.dispatchEvent(new CustomEvent('open-agent-chat'))
}

export default function AppHome() {
  const navigate = useNavigate()
  const [chatModal, setChatModal] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null)

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="blob-bg" />

      {chatModal && (
        <Modal title="💬 Quero Conversar" onClose={() => setChatModal(false)}>
          <p className="text-body-md text-on-surface-variant mb-6">Como prefere conversar com nosso Anjo da Rede?</p>
          <div className="space-y-3">
            <button onClick={() => { setChatModal(false); openAgentChat() }}
              className="w-full flex items-center gap-4 p-4 bg-sky-blue-light rounded-[1.5rem] hover:bg-primary-container transition-all active:scale-95">
              <span className="material-symbols-outlined text-primary fill-icon text-3xl">chat</span>
              <div className="text-left">
                <p className="font-button-text text-on-surface">Chat de texto</p>
                <p className="text-label-lg text-on-surface-variant">Conversa por mensagem escrita</p>
              </div>
            </button>
            <button onClick={() => { setChatModal(false); setToast({ msg: 'Iniciando chamada de voz segura...', type: 'info' }) }}
              className="w-full flex items-center gap-4 p-4 bg-gold-soft rounded-[1.5rem] hover:bg-secondary-container transition-all active:scale-95">
              <span className="material-symbols-outlined text-secondary fill-icon text-3xl">mic</span>
              <div className="text-left">
                <p className="font-button-text text-on-surface">Chamada de voz</p>
                <p className="text-label-lg text-on-surface-variant">Fale diretamente com um anjo</p>
              </div>
            </button>
            <button onClick={() => { setChatModal(false); navigate('/app/relato/agora') }}
              className="w-full flex items-center gap-4 p-4 bg-safety-green/30 rounded-[1.5rem] hover:bg-safety-green/50 transition-all active:scale-95">
              <span className="material-symbols-outlined text-on-surface fill-icon text-3xl">edit_note</span>
              <div className="text-left">
                <p className="font-button-text text-on-surface">Fazer um relato escrito</p>
                <p className="text-label-lg text-on-surface-variant">Registre o que aconteceu</p>
              </div>
            </button>
          </div>
        </Modal>
      )}

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop py-4 h-16">
        <span className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</span>
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate('/admin')} title="Área do Tutor" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-sky-blue-light transition-all">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">admin_panel_settings</span>
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container">
            <span className="material-symbols-outlined text-primary fill-icon">account_circle</span>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-24 lg:pb-8">
        {/* Hero */}
        <section className="hero-gradient px-margin-mobile lg:px-margin-desktop py-12 lg:py-16">
          <div className="max-w-6xl mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full mb-6 text-on-primary-container text-label-lg font-bold">
                <span className="w-2 h-2 bg-safety-green rounded-full animate-pulse" />
                Canal seguro e anônimo
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4 leading-tight">
                Você não está sozinho.<br />
                <span className="text-primary">Estamos aqui.</span>
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto lg:mx-0">
                Este é um espaço seguro para você falar, denunciar e se proteger. Tudo com total sigilo.
              </p>
            </div>
            <div className="lg:flex-none text-center">
              <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-full shadow-xl animate-floating overflow-hidden bg-white/20 backdrop-blur-sm">
                <img
                  src="/anjo.png"
                  alt="Anjo da Rede"
                  className="w-full h-full object-cover object-center scale-[1.12]"
                  style={{ objectPosition: '50% 40%' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main action cards */}
        <section className="px-margin-mobile lg:px-margin-desktop py-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <button
              onClick={() => setChatModal(true)}
              className="group flex flex-col items-start gap-4 p-7 lg:p-8 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-secondary-container transition-all active:scale-95 text-left"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gold-soft rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <span className="text-4xl lg:text-5xl">💛</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Quero Conversar</h2>
                <p className="text-body-md text-on-surface-variant">Fale com um anjo da rede agora mesmo</p>
              </div>
              <div className="mt-auto flex items-center gap-2 px-5 py-2.5 bg-secondary-container text-on-secondary-container font-button-text rounded-full text-sm">
                <span className="material-symbols-outlined text-base fill-icon">chat_bubble</span>
                Entrar no chat
              </div>
            </button>

            <button
              onClick={() => navigate('/app/relato/agora')}
              className="group flex flex-col items-start gap-4 p-7 lg:p-8 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-primary-container transition-all active:scale-95 text-left"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-sky-blue-light rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <span className="text-4xl lg:text-5xl">📣</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Relatar Algo</h2>
                <p className="text-body-md text-on-surface-variant">Conte o que está acontecendo com você</p>
              </div>
              <div className="mt-auto flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-button-text rounded-full text-sm">
                <span className="material-symbols-outlined text-base fill-icon">campaign</span>
                Fazer relato
              </div>
            </button>

            <button
              onClick={() => navigate('/app/direitos')}
              className="group flex flex-col items-start gap-4 p-7 lg:p-8 neomorphic-card rounded-[2rem] border-4 border-transparent hover:border-safety-green transition-all active:scale-95 text-left sm:col-span-2 lg:col-span-1"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-safety-green/30 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <span className="text-4xl lg:text-5xl">📚</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Meus Direitos</h2>
                <p className="text-body-md text-on-surface-variant">Conheça seus direitos e como se proteger</p>
              </div>
              <div className="mt-auto flex items-center gap-2 px-5 py-2.5 bg-safety-green/40 text-on-surface font-button-text rounded-full text-sm">
                <span className="material-symbols-outlined text-base fill-icon">menu_book</span>
                Saber mais
              </div>
            </button>
          </div>
        </section>

        {/* Acompanhar + Rede de Proteção */}
        <section className="px-margin-mobile lg:px-margin-desktop pb-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-7 lg:p-8 neomorphic-card rounded-[2rem] flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-container rounded-[1.2rem] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-primary fill-icon">manage_search</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Acompanhar Denúncia</h2>
                  <p className="text-body-md text-on-surface-variant">Veja o status do seu relato</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/app/acompanhar')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-on-primary font-button-text rounded-full transition-all active:scale-95 hover:shadow-lg"
              >
                <span className="material-symbols-outlined fill-icon">search</span>
                Buscar pelo protocolo
              </button>
            </div>

            <div className="p-7 lg:p-8 neomorphic-card rounded-[2rem] flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-safety-green/30 rounded-[1.2rem] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-on-surface fill-icon">shield</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Rede de Proteção</h2>
                  <p className="text-body-md text-on-surface-variant">Canais oficiais de ajuda</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: '100', label: 'Disque\nDireitos' },
                  { n: '190', label: 'Polícia\nMilitar' },
                  { n: '180', label: 'Central\nMulher' },
                ].map(({ n, label }) => (
                  <a key={n} href={`tel:${n}`} className="flex flex-col items-center p-3 bg-surface-container-low rounded-xl hover:bg-sky-blue-light transition-all active:scale-95">
                    <span className="font-headline-md text-headline-md text-primary font-bold">{n}</span>
                    <span className="text-label-lg text-on-surface-variant text-center whitespace-pre-line leading-tight">{label}</span>
                  </a>
                ))}
              </div>
              <button onClick={() => navigate('/app/direitos')} className="flex items-center justify-center gap-2 py-3 text-primary font-button-text hover:bg-sky-blue-light rounded-full transition-all text-sm">
                Ver todos os contatos
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl h-touch-target-min flex justify-around items-center px-2 lg:hidden">
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-2">
          <span className="material-symbols-outlined fill-icon">home</span>
          <span className="font-label-lg text-label-lg">Início</span>
        </button>
        <button onClick={() => navigate('/app/relato/agora')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-label-lg text-label-lg">Denunciar</span>
        </button>
        <button onClick={() => navigate('/app/acompanhar')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">manage_search</span>
          <span className="font-label-lg text-label-lg">Acompanhar</span>
        </button>
        <button onClick={() => navigate('/app/direitos')} className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-lg text-label-lg">Direitos</span>
        </button>
      </nav>
    </div>
  )
}
