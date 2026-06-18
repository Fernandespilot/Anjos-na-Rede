import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'

// ─── Types ────────────────────────────────────────────────────────────────────

type StepId = 1 | 2 | 3 | 4 | 5

interface Pessoa {
  nome: string
  apelido: string
  genero: string
  telefone: string
  municipio: string
  bairro: string
  logradouro: string
  complemento: string
  redesSociais: string
}

const emptyPessoa = (): Pessoa => ({
  nome: '', apelido: '', genero: 'Não informado', telefone: '',
  municipio: '', bairro: '', logradouro: '', complemento: '', redesSociais: '',
})

const generos = ['Não informado', 'Masculino', 'Feminino', 'Não binário', 'Prefiro não dizer']
const municipiosMT = ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Primavera do Leste', 'Barra do Garças']
const categorias = [
  { emoji: '😠', label: 'Bullying / Agressão', value: 'bullying' },
  { emoji: '🌐', label: 'Cyberbullying', value: 'cyber' },
  { emoji: '🏠', label: 'Violência Doméstica', value: 'domestica' },
  { emoji: '😨', label: 'Ameaça / Intimidação', value: 'ameaca' },
  { emoji: '📸', label: 'Foto / Vídeo sem permissão', value: 'foto' },
  { emoji: '👤', label: 'Perfil Falso / Golpe', value: 'golpe' },
  { emoji: '🔞', label: 'Conteúdo Impróprio', value: 'conteudo' },
  { emoji: '❓', label: 'Outra situação', value: 'outro' },
]

// ─── Step progress bar ────────────────────────────────────────────────────────

const stepLabels = ['Fato', 'Suspeito', 'Vítima', 'Evidências', 'Enviar']

function StepBar({ current }: { current: StepId }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {stepLabels.map((label, idx) => {
        const s = (idx + 1) as StepId
        const done = s < current
        const active = s === current
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                done ? 'bg-primary border-primary text-on-primary' :
                active ? 'bg-secondary-container border-primary text-on-secondary-container shadow-md scale-110' :
                'bg-surface-container border-outline-variant text-outline'
              }`}>
                {done ? <span className="material-symbols-outlined text-base fill-icon">check</span> : s}
              </div>
              <span className={`text-xs mt-1 font-semibold whitespace-nowrap hidden sm:block ${active ? 'text-primary' : done ? 'text-on-surface-variant' : 'text-outline'}`}>{label}</span>
            </div>
            {idx < stepLabels.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-1 transition-all ${done ? 'bg-primary' : 'bg-outline-variant'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Pessoa Form (reused for suspect & victim) ────────────────────────────────

function PessoaForm({ data, onChange, title, subtitle, icon, variant = 'coral', optional = true }: {
  data: Pessoa
  onChange: (p: Pessoa) => void
  title: string
  subtitle: string
  icon: string
  variant?: 'coral' | 'green'
  optional?: boolean
}) {
  const set = (k: keyof Pessoa, v: string) => onChange({ ...data, [k]: v })
  const headerBg = variant === 'green' ? 'bg-safety-green/20' : 'bg-critical-coral/10'
  return (
    <div className="space-y-6">
      <div className={`inline-flex items-center gap-3 px-5 py-3 ${headerBg} rounded-[1.5rem]`}>
        <span className="material-symbols-outlined text-primary fill-icon">{icon}</span>
        <div>
          <p className="font-headline-md text-headline-md text-on-surface">{title}</p>
          <p className="text-label-lg text-on-surface-variant">{subtitle}</p>
        </div>
        {optional && <span className="ml-2 px-3 py-1 bg-surface-container-lowest rounded-full text-label-lg text-outline">Opcional</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="block text-label-lg text-on-surface-variant mb-2">Nome completo</label>
          <input value={data.nome} onChange={e => set('nome', e.target.value)}
            placeholder="Nome (não obrigatório)"
            className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
        </div>
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Apelido</label>
          <input value={data.apelido} onChange={e => set('apelido', e.target.value)}
            placeholder="Como é conhecido(a)"
            className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
        </div>
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Gênero</label>
          <div className="relative">
            <select value={data.genero} onChange={e => set('genero', e.target.value)}
              className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 pr-10 text-body-md focus:outline-none focus:border-primary transition-colors appearance-none">
              {generos.map(g => <option key={g}>{g}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-lg">expand_more</span>
          </div>
        </div>
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Telefone (opcional)</label>
          <input value={data.telefone} onChange={e => set('telefone', e.target.value)}
            placeholder="(65) 9 0000-0000"
            className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
        </div>
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Município</label>
          <div className="relative">
            <select value={data.municipio} onChange={e => set('municipio', e.target.value)}
              className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 pr-10 text-body-md focus:outline-none focus:border-primary transition-colors appearance-none">
              <option value="">Selecione um município</option>
              {municipiosMT.map(m => <option key={m}>{m}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-lg">expand_more</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-label-lg text-on-surface-variant mb-2">Bairro</label>
        <input value={data.bairro} onChange={e => set('bairro', e.target.value)}
          placeholder="Bairro onde pode ser encontrado(a)"
          className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Logradouro / Rua</label>
          <input value={data.logradouro} onChange={e => set('logradouro', e.target.value)}
            placeholder="Nome da rua"
            className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
        </div>
        <div>
          <label className="block text-label-lg text-on-surface-variant mb-2">Complemento</label>
          <input value={data.complemento} onChange={e => set('complemento', e.target.value)}
            placeholder="Ex: Apto 10, Bloco 1"
            className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors placeholder:text-outline" />
        </div>
      </div>
      <div>
        <label className="block text-label-lg text-on-surface-variant mb-2">
          Outras informações / Redes Sociais (Facebook, Instagram, Twitter) / Jornais e Sites
        </label>
        <textarea value={data.redesSociais} onChange={e => set('redesSociais', e.target.value)}
          placeholder="@ do perfil, página ou qualquer informação adicional que possa ajudar..."
          rows={3}
          className="w-full bg-surface-container-low border-2 border-outline-variant rounded-[1.5rem] px-5 py-3 text-body-md focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-outline" />
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RelatoFormulario() {
  const navigate = useNavigate()
  const fileInput = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<StepId>(1)
  const [toast, setToast] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [robotCheck, setRobotCheck] = useState(false)

  // Step 1 — O Fato
  const [categoria, setCategoria] = useState('')
  const [local, setLocal] = useState('')
  const [dataFato, setDataFato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [micActive, setMicActive] = useState(false)

  // Step 2 — Suspeito
  const [suspeitos, setSuspeitos] = useState<Pessoa[]>([])
  const [editSusp, setEditSusp] = useState<Pessoa>(emptyPessoa())

  // Step 3 — Vítima
  const [vitimas, setVitimas] = useState<Pessoa[]>([])
  const [editVit, setEditVit] = useState<Pessoa>(emptyPessoa())

  // Step 4 — Arquivos
  const [files, setFiles] = useState<File[]>([])
  const [fileTypes, setFileTypes] = useState<string[]>([])

  const toggleFileType = (t: string) =>
    setFileTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const addSusp = () => {
    setSuspeitos([...suspeitos, editSusp])
    setEditSusp(emptyPessoa())
    setToast('Suspeito/Autor adicionado!')
  }

  const addVit = () => {
    setVitimas([...vitimas, editVit])
    setEditVit(emptyPessoa())
    setToast('Vítima adicionada!')
  }

  const handleSubmit = () => {
    if (!robotCheck) { setToast('Confirme que você não é um robô'); return }
    if (!termsAccepted) { setToast('Aceite os termos para continuar'); return }
    const proto = `2024-${Math.floor(Math.random() * 90000 + 10000)}`
    navigate('/app/relato/sucesso', { state: { protocol: proto } })
  }

  const locais = [
    { emoji: '🏫', label: 'Escola / Instituição', value: 'escola' },
    { emoji: '🏠', label: 'Casa / Residência', value: 'casa' },
    { emoji: '🌐', label: 'Internet / Online', value: 'internet' },
    { emoji: '🏙️', label: 'Via Pública', value: 'via' },
    { emoji: '🚗', label: 'Em Trânsito', value: 'transito' },
    { emoji: '❓', label: 'Outro local', value: 'outro' },
  ]

  const fileTypeOpts = [
    { icon: 'mic', label: 'Áudio' },
    { icon: 'image', label: 'Imagem' },
    { icon: 'description', label: 'Documento' },
    { icon: 'videocam', label: 'Vídeo' },
  ]

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
      <div className="blob-bg" />

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop py-4 h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep((step - 1) as StepId)}
            className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-sky-blue-light transition-all active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary">Fazer Relato</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-label-lg">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="hidden sm:inline">100% Anônimo</span>
        </div>
      </header>

      <main className="pt-24 pb-12 px-margin-mobile lg:px-margin-desktop max-w-4xl mx-auto">
        <StepBar current={step} />

        {/* ── STEP 1: O FATO ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Sobre o Fato</h1>
              <p className="text-body-lg text-on-surface-variant">
                Informe o que aconteceu. Não precisa de nomes — apenas o que você viu ou viveu.
              </p>
            </div>

            {/* Categoria */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon">category</span>
                Qual tipo de situação?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categorias.map(c => (
                  <button key={c.value} onClick={() => setCategoria(c.value)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[1.5rem] border-2 transition-all active:scale-95 ${
                      categoria === c.value ? 'border-primary bg-primary-container/20 neomorphic-active' : 'border-transparent neomorphic-card hover:border-sky-blue-light'
                    }`}>
                    <span className="text-4xl">{c.emoji}</span>
                    <span className={`font-button-text text-sm text-center ${categoria === c.value ? 'text-primary' : 'text-on-surface-variant'}`}>{c.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Local */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon">location_on</span>
                Onde aconteceu?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {locais.map(l => (
                  <button key={l.value} onClick={() => setLocal(l.value)}
                    className={`flex items-center gap-3 p-4 rounded-[1.2rem] border-2 transition-all active:scale-95 ${
                      local === l.value ? 'border-primary bg-primary-container/20' : 'border-transparent neomorphic-card hover:border-sky-blue-light'
                    }`}>
                    <span className="text-2xl">{l.emoji}</span>
                    <span className={`font-button-text text-sm ${local === l.value ? 'text-primary' : 'text-on-surface-variant'}`}>{l.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Data */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon">calendar_month</span>
                Quando aconteceu?
              </h2>
              <input type="date" value={dataFato} onChange={e => setDataFato(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-outline-variant rounded-full px-6 py-3 text-body-md focus:outline-none focus:border-primary transition-colors text-on-surface" />
            </section>

            {/* Descrição */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon">description</span>
                Conta mais detalhes
              </h2>
              <div className="neomorphic-card p-5 rounded-[2rem]">
                <textarea value={descricao} onChange={e => setDescricao(e.target.value)}
                  placeholder="Descreva o que aconteceu com o máximo de detalhes que conseguir. Você está em segurança aqui..."
                  rows={5}
                  className="w-full bg-transparent border-none focus:ring-0 text-body-lg resize-none placeholder:text-outline" />
              </div>
              <div className="mt-4 flex items-center gap-4 p-4 bg-sky-blue-light rounded-xl">
                <button type="button"
                  onClick={() => { setMicActive(!micActive); setToast(micActive ? 'Gravação pausada.' : 'Gravando... Pode falar!') }}
                  className={`p-3 rounded-full transition-all active:scale-95 ${micActive ? 'bg-critical-coral text-white animate-pulse' : 'hover:bg-white text-primary'}`}>
                  <span className="material-symbols-outlined">{micActive ? 'stop' : 'mic'}</span>
                </button>
                <p className="text-body-md text-on-primary-container">
                  {micActive ? 'Gravando... clique para parar.' : 'Prefere falar? Use o microfone para gravar sua denúncia.'}
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ── STEP 2: SUSPEITO/AUTOR ─────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Sobre o Suspeito/Autor</h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
                Informe o que sabe sobre a pessoa responsável. Todos os campos são opcionais.
                Após preencher, clique em "Adicionar Suspeito/Autor".
              </p>
            </div>

            <PessoaForm
              data={editSusp}
              onChange={setEditSusp}
              title="Informações do Suspeito/Autor"
              subtitle="Preencha o que souber"
              icon="person_alert"
              variant="coral"
            />

            <button onClick={addSusp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-critical-coral/10 text-critical-coral border-2 border-critical-coral/30 font-button-text rounded-full hover:bg-critical-coral/20 transition-all active:scale-95">
              <span className="material-symbols-outlined fill-icon">person_add</span>
              Adicionar Suspeito/Autor
            </button>

            {/* Lista */}
            <div className="neomorphic-card rounded-[2rem] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low">
                <span className="font-headline-md text-headline-md text-on-surface">Nome</span>
                <span className="font-headline-md text-headline-md text-on-surface">Apelido</span>
                <span className="font-headline-md text-headline-md text-on-surface">Gênero</span>
                <span className="w-8" />
              </div>
              {suspeitos.length === 0 ? (
                <p className="text-center text-on-surface-variant py-8 text-body-md italic">Nenhum Suspeito/Autor adicionado!</p>
              ) : suspeitos.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 border-t border-outline-variant">
                  <span className="text-body-md text-on-surface">{s.nome || '—'}</span>
                  <span className="text-body-md text-on-surface-variant">{s.apelido || '—'}</span>
                  <span className="text-body-md text-on-surface-variant">{s.genero}</span>
                  <button onClick={() => setSuspeitos(suspeitos.filter((_, j) => j !== i))}
                    className="text-critical-coral hover:bg-critical-coral/10 rounded-full p-1 transition-all">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: VÍTIMA ─────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Sobre a Vítima</h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
                Informe o nome completo, apelido, gênero e telefone da vítima do fato
                e acione a opção "Adicionar Vítima".
              </p>
            </div>

            <PessoaForm
              data={editVit}
              onChange={setEditVit}
              title="Informações da Vítima"
              subtitle="Preencha o que souber"
              icon="personal_injury"
              variant="green"
            />

            <button onClick={addVit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-safety-green/20 text-on-surface border-2 border-safety-green font-button-text rounded-full hover:bg-safety-green/40 transition-all active:scale-95">
              <span className="material-symbols-outlined fill-icon">person_add</span>
              Adicionar Vítima
            </button>

            <div className="neomorphic-card rounded-[2rem] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low">
                <span className="font-headline-md text-headline-md text-on-surface">Nome</span>
                <span className="font-headline-md text-headline-md text-on-surface">Apelido</span>
                <span className="font-headline-md text-headline-md text-on-surface">Gênero</span>
                <span className="w-8" />
              </div>
              {vitimas.length === 0 ? (
                <p className="text-center text-on-surface-variant py-8 text-body-md italic">Nenhuma "Vítima" adicionada!</p>
              ) : vitimas.map((v, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 border-t border-outline-variant">
                  <span className="text-body-md text-on-surface">{v.nome || '—'}</span>
                  <span className="text-body-md text-on-surface-variant">{v.apelido || '—'}</span>
                  <span className="text-body-md text-on-surface-variant">{v.genero}</span>
                  <button onClick={() => setVitimas(vitimas.filter((_, j) => j !== i))}
                    className="text-critical-coral hover:bg-critical-coral/10 rounded-full p-1 transition-all">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 4: ARQUIVOS ───────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Evidências / Arquivos</h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
                Os arquivos abaixo são <span className="font-bold text-primary">opcionais</span>.
                Use caso tenha algum áudio, imagem, documento ou vídeo que seja relevante para a apuração.
              </p>
            </div>

            {/* File type selector */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-5">Tipo de Arquivo</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {fileTypeOpts.map(ft => (
                  <button key={ft.label} onClick={() => toggleFileType(ft.label)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all active:scale-95 ${
                      fileTypes.includes(ft.label) ? 'border-primary bg-primary-container/20' : 'border-transparent neomorphic-card hover:border-sky-blue-light'
                    }`}>
                    <span className={`material-symbols-outlined text-4xl fill-icon ${fileTypes.includes(ft.label) ? 'text-primary' : 'text-on-surface-variant'}`}>{ft.icon}</span>
                    <span className={`font-button-text ${fileTypes.includes(ft.label) ? 'text-primary' : 'text-on-surface-variant'}`}>{ft.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Upload area */}
            <section>
              <input ref={fileInput} type="file" multiple className="hidden"
                accept="audio/*,image/*,.pdf,.doc,.docx,video/*"
                onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files ?? [])])} />
              <button onClick={() => fileInput.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-4 p-10 neomorphic-card rounded-[2rem] border-2 border-dashed border-outline-variant hover:border-primary hover:bg-sky-blue-light/30 transition-all">
                <span className="material-symbols-outlined text-5xl text-primary">upload_file</span>
                <div className="text-center">
                  <p className="font-headline-md text-headline-md text-on-surface">Clique para adicionar arquivos</p>
                  <p className="text-body-md text-on-surface-variant mt-1">Formatos: MP3, MP4, JPG, PNG, PDF, DOC</p>
                  <p className="text-label-lg text-outline mt-1">Tamanho máximo: 10 MB por arquivo</p>
                </div>
              </button>
            </section>

            {/* File list */}
            <div className="neomorphic-card rounded-[2rem] overflow-hidden">
              <div className="grid grid-cols-2 px-6 py-4 bg-surface-container-low">
                <span className="font-headline-md text-headline-md text-on-surface">Tipo de Arquivo</span>
                <span className="font-headline-md text-headline-md text-on-surface">Arquivo</span>
              </div>
              {files.length === 0 ? (
                <p className="text-center text-on-surface-variant py-8 italic">Nenhum arquivo adicionado!</p>
              ) : files.map((f, i) => (
                <div key={i} className="grid grid-cols-2 items-center px-6 py-4 border-t border-outline-variant">
                  <span className="text-body-md text-on-surface-variant capitalize">{f.type.split('/')[0]}</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-md text-on-surface truncate">{f.name}</span>
                    <button onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      className="text-critical-coral hover:bg-critical-coral/10 rounded-full p-1 flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 5: CONFIRMAÇÃO ────────────────────────────────── */}
        {step === 5 && (
          <div className="space-y-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-safety-green/30 rounded-full mb-6">
                <span className="text-5xl">🔒</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Confirmar e Enviar</h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">
                Por favor, marque a opção <span className="font-bold">"Não sou um robô"</span> para confirmar
                que você não é um robô e em seguida clique em "Enviar Denúncia".
              </p>
            </div>

            {/* Resumo */}
            <div className="neomorphic-card p-6 rounded-[2rem] space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon">summarize</span>
                Resumo da sua denúncia
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-lg text-on-surface-variant mb-1">Situação</p>
                  <p className="text-body-md text-on-surface font-semibold capitalize">{categorias.find(c => c.value === categoria)?.label || '—'}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-lg text-on-surface-variant mb-1">Local</p>
                  <p className="text-body-md text-on-surface font-semibold capitalize">{locais.find(l => l.value === local)?.label || '—'}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-lg text-on-surface-variant mb-1">Arquivos</p>
                  <p className="text-body-md text-on-surface font-semibold">{files.length} arquivo(s)</p>
                </div>
              </div>
            </div>

            {/* Fake reCAPTCHA */}
            <div className="flex justify-center">
              <button onClick={() => setRobotCheck(!robotCheck)}
                className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] border-2 transition-all active:scale-95 ${
                  robotCheck ? 'border-safety-green bg-safety-green/20' : 'border-outline-variant neomorphic-card hover:border-primary'
                }`}>
                <div className={`w-8 h-8 rounded flex items-center justify-center border-2 transition-all ${
                  robotCheck ? 'bg-safety-green border-safety-green' : 'border-outline bg-white'
                }`}>
                  {robotCheck && <span className="material-symbols-outlined text-white fill-icon text-lg">check</span>}
                </div>
                <span className="font-button-text text-on-surface">Não sou um robô</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🔐</span>
                  <span className="text-xs text-outline">VERIFICAÇÃO<br/>SEGURA</span>
                </div>
              </button>
            </div>

            {/* Legal text */}
            <div className="p-6 bg-surface-container-low rounded-[1.5rem] space-y-4 text-body-md text-on-surface-variant">
              <p>
                Estou ciente que de acordo com o artigo 144, da Constituição Federal/88, a segurança pública é um dever do Estado,
                direito e responsabilidade de todos, é exercida para preservação da ordem pública e da incolumidade das pessoas e do patrimônio,
                através dos órgãos: Polícia Federal, Polícia Rodoviária Federal, Polícia Ferroviária Federal, Polícias Civis, Polícias Militares.
              </p>
              <p className="text-primary font-semibold">
                Lembre-se: Esse canal foi disponibilizado para você exercer o seu direito como cidadão no combate ao crime;
                não envie informações falsas ou trotes. Seja um cidadão consciente, uma sociedade melhor também depende de você!
              </p>
              <label className="flex items-start gap-3 cursor-pointer mt-4">
                <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-body-md text-on-surface">
                  Li e concordo com os termos acima. Confirmo que as informações fornecidas são verdadeiras e que estou fazendo esta denúncia de boa-fé.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ── Navigation buttons ──────────────────────────────────── */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-outline-variant">
          <button
            onClick={() => step === 1 ? navigate(-1) : setStep((step - 1) as StepId)}
            className="flex items-center gap-2 px-8 py-4 bg-surface-container text-on-surface-variant font-button-text rounded-full hover:bg-surface-container-high transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Anterior
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep((step + 1) as StepId)}
              className="flex items-center gap-2 px-10 py-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Próximo
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-3 px-10 py-4 bg-secondary-container text-on-secondary-container font-headline-md text-headline-md rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <span className="material-symbols-outlined fill-icon">shield_with_heart</span>
              Enviar Denúncia
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
