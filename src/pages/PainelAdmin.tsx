import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import Modal from '../components/Modal'

type Status = 'CRÍTICO' | 'URGENTE' | 'TRIAGEM' | 'RESOLVIDO' | 'EM ATENDIMENTO'
type Tab = 'dashboard' | 'relatos' | 'usuarios' | 'configuracoes'

interface Report {
  id: string
  type: string
  local: string
  status: Status
  date: string
  emotion: string
  description: string
  assignedTo: string
  channel: string
  age?: string
}

const STATUS_COLORS: Record<Status, string> = {
  'CRÍTICO': 'bg-critical-coral text-white',
  'URGENTE': 'bg-secondary-container text-on-secondary-container',
  'TRIAGEM': 'bg-sky-blue-light text-primary',
  'RESOLVIDO': 'bg-safety-green text-on-primary-fixed-variant',
  'EM ATENDIMENTO': 'bg-primary-container text-on-primary-container',
}

const ALL_STATUSES: Status[] = ['CRÍTICO', 'URGENTE', 'TRIAGEM', 'EM ATENDIMENTO', 'RESOLVIDO']
const TYPES = ['Bullying', 'Cyberbullying', 'Violência Doméstica', 'Exclusão Social', 'Ameaça', 'Assédio', 'Outro']
const LOCAIS = ['Escola', 'Casa', 'Internet', 'Outro']
const CHANNELS = ['Formulário Web', 'App Mobile', 'Agente IA', 'Ligação']

const SEED: Report[] = [
  { id: '#2024-48291', type: 'Bullying', local: 'Escola', status: 'CRÍTICO', date: '2024-06-18 08:12', emotion: '😨', description: 'Relato de agressão física no pátio durante o intervalo. Vítima com 12 anos. Agressor identificado como colega da turma.', assignedTo: 'Maria Coordenadora', channel: 'App Mobile', age: '12' },
  { id: '#2024-48289', type: 'Violência Doméstica', local: 'Casa', status: 'URGENTE', date: '2024-06-18 07:55', emotion: '😢', description: 'Aluno relatou situação de medo em casa. Mencionou briga entre responsáveis com frequência quase diária.', assignedTo: '', channel: 'Formulário Web', age: '10' },
  { id: '#2024-48287', type: 'Cyberbullying', local: 'Internet', status: 'TRIAGEM', date: '2024-06-18 07:00', emotion: '😠', description: 'Mensagens ofensivas e ameaças recebidas via WhatsApp. Capturas de tela disponíveis.', assignedTo: '', channel: 'Agente IA', age: '14' },
  { id: '#2024-48285', type: 'Exclusão Social', local: 'Escola', status: 'RESOLVIDO', date: '2024-06-17 15:30', emotion: '😔', description: 'Aluno relatou ser excluído das atividades em grupo sistematicamente. Caso resolvido com mediação pedagógica.', assignedTo: 'João Pedagogo', channel: 'App Mobile', age: '11' },
  { id: '#2024-48280', type: 'Ameaça', local: 'Escola', status: 'EM ATENDIMENTO', date: '2024-06-17 13:20', emotion: '😨', description: 'Ameaças verbais e por mensagem. Encaminhado para Conselho Tutelar.', assignedTo: 'Maria Coordenadora', channel: 'Formulário Web', age: '13' },
  { id: '#2024-48275', type: 'Assédio', local: 'Internet', status: 'TRIAGEM', date: '2024-06-17 11:00', emotion: '😢', description: 'Contato inadequado de adulto desconhecido via jogo online. Perfil denunciado.', assignedTo: '', channel: 'Agente IA', age: '9' },
]

let nextId = 48292

function newId() {
  return `#2024-${nextId++}`
}

const EMPTY_REPORT: Omit<Report, 'id'> = {
  type: 'Bullying', local: 'Escola', status: 'TRIAGEM',
  date: new Date().toISOString().slice(0, 16).replace('T', ' '),
  emotion: '😨', description: '', assignedTo: '', channel: 'Formulário Web', age: '',
}

function exportCSV(reports: Report[]) {
  const header = 'ID;Tipo;Local;Status;Data;Canal;Idade;Responsável;Descrição'
  const rows = reports.map(r =>
    [r.id, r.type, r.local, r.status, r.date, r.channel, r.age ?? '', r.assignedTo, `"${r.description.replace(/"/g, '""')}"`].join(';')
  )
  const csv = '﻿' + [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `anjos-da-rede-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function exportTXT(reports: Report[]) {
  const lines = [
    'RELATÓRIO ANJOS DA REDE',
    `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
    `Total de relatos: ${reports.length}`,
    '─'.repeat(60),
    ...reports.map(r =>
      `${r.id} | ${r.type} | ${r.local} | ${r.status} | ${r.date}\n  ${r.description}`
    ),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `anjos-da-rede-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// Mini bar chart
function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-3 h-32 w-full">
      {data.map(d => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-on-surface">{d.value}</span>
          <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${(d.value / max) * 96}px`, background: d.color }} />
          <span className="text-[10px] text-on-surface-variant text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function ReportForm({ value, onChange }: { value: Omit<Report, 'id'>; onChange: (v: Omit<Report, 'id'>) => void }) {
  const set = (k: keyof Omit<Report, 'id'>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [k]: e.target.value })
  const inputCls = 'w-full bg-surface-container rounded-xl px-4 py-2.5 text-body-md text-on-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary'
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Tipo</label>
          <select value={value.type} onChange={set('type')} className={inputCls}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Local</label>
          <select value={value.local} onChange={set('local')} className={inputCls}>
            {LOCAIS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Status</label>
          <select value={value.status} onChange={set('status')} className={inputCls}>
            {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Canal</label>
          <select value={value.channel} onChange={set('channel')} className={inputCls}>
            {CHANNELS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Data</label>
          <input type="datetime-local" value={value.date.replace(' ', 'T')} onChange={e => onChange({ ...value, date: e.target.value.replace('T', ' ') })} className={inputCls} />
        </div>
        <div>
          <label className="text-label-lg text-on-surface-variant mb-1 block">Idade (opcional)</label>
          <input type="number" min={0} max={18} value={value.age ?? ''} onChange={set('age')} placeholder="Ex: 12" className={inputCls} />
        </div>
      </div>
      <div>
        <label className="text-label-lg text-on-surface-variant mb-1 block">Responsável</label>
        <input type="text" value={value.assignedTo} onChange={set('assignedTo')} placeholder="Nome do responsável pelo caso" className={inputCls} />
      </div>
      <div>
        <label className="text-label-lg text-on-surface-variant mb-1 block">Descrição</label>
        <textarea rows={3} value={value.description} onChange={set('description')} placeholder="Descreva o relato..." className={inputCls + ' resize-none'} />
      </div>
    </div>
  )
}

const PAGE_SIZE = 5

export default function PainelAdmin() {
  const navigate = useNavigate()
  const [reports, setReports] = useState<Report[]>(SEED)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null)

  // CRUD modals
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [formValue, setFormValue] = useState<Omit<Report, 'id'>>(EMPTY_REPORT)

  // Filters
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('todos')
  const [filterLocal, setFilterLocal] = useState('todos')
  const [filterType, setFilterType] = useState('todos')
  const [page, setPage] = useState(1)

  // Confirm generic
  const [confirmModal, setConfirmModal] = useState<{ title: string; desc: string; action: () => void } | null>(null)

  const showToast = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => setToast({ msg, type })

  // Stats
  const stats = useMemo(() => ({
    total: reports.length,
    critico: reports.filter(r => r.status === 'CRÍTICO').length,
    urgente: reports.filter(r => r.status === 'URGENTE').length,
    triagem: reports.filter(r => r.status === 'TRIAGEM').length,
    atendimento: reports.filter(r => r.status === 'EM ATENDIMENTO').length,
    resolvido: reports.filter(r => r.status === 'RESOLVIDO').length,
    escola: reports.filter(r => r.local === 'Escola').length,
    casa: reports.filter(r => r.local === 'Casa').length,
    internet: reports.filter(r => r.local === 'Internet').length,
    taxaResolucao: reports.length > 0 ? Math.round(reports.filter(r => r.status === 'RESOLVIDO').length / reports.length * 100) : 0,
  }), [reports])

  // Filtered + paginated
  const filtered = useMemo(() => {
    let list = reports
    if (search) list = list.filter(r => r.id.includes(search) || r.type.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))
    if (filterStatus !== 'todos') list = list.filter(r => r.status === filterStatus)
    if (filterLocal !== 'todos') list = list.filter(r => r.local === filterLocal)
    if (filterType !== 'todos') list = list.filter(r => r.type === filterType)
    return list
  }, [reports, search, filterStatus, filterLocal, filterType])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // CRUD handlers
  const handleCreate = () => {
    const report: Report = { id: newId(), ...formValue }
    setReports(prev => [report, ...prev])
    setCreateModal(false)
    setFormValue(EMPTY_REPORT)
    showToast('Relato criado com sucesso!', 'success')
  }

  const handleEditOpen = (r: Report) => {
    setSelectedReport(r)
    const { id: _, ...rest } = r
    setFormValue(rest)
    setEditModal(true)
  }

  const handleEditSave = () => {
    if (!selectedReport) return
    setReports(prev => prev.map(r => r.id === selectedReport.id ? { id: r.id, ...formValue } : r))
    setSelectedReport(prev => prev ? { id: prev.id, ...formValue } : null)
    setEditModal(false)
    showToast('Relato atualizado!', 'success')
  }

  const handleDeleteOpen = (r: Report) => {
    setSelectedReport(r)
    setDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (!selectedReport) return
    setReports(prev => prev.filter(r => r.id !== selectedReport.id))
    if (selectedReport.id === selectedReport?.id) setSelectedReport(null)
    setDeleteModal(false)
    showToast('Relato excluído.', 'info')
  }

  const handleStatus = (id: string, status: Status) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setSelectedReport(prev => prev?.id === id ? { ...prev, status } : prev)
    showToast(`Status alterado para ${status}`, 'success')
  }

  const handleAcionar = (r: Report) => {
    setConfirmModal({
      title: '🚨 Acionar Autoridades',
      desc: `Confirma o acionamento das autoridades para o relato ${r.id}? Esta ação gera um protocolo oficial.`,
      action: () => {
        handleStatus(r.id, 'EM ATENDIMENTO')
        showToast('Autoridades acionadas! Protocolo gerado.', 'warning')
        setConfirmModal(null)
      },
    })
  }

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'relatos', label: 'Relatos', icon: 'assignment' },
    { key: 'usuarios', label: 'Usuários', icon: 'group' },
    { key: 'configuracoes', label: 'Configurações', icon: 'settings' },
  ]

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Confirm Modal */}
      {confirmModal && (
        <Modal title={confirmModal.title} onClose={() => setConfirmModal(null)}>
          <p className="text-body-md text-on-surface-variant mb-6">{confirmModal.desc}</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmModal(null)} className="flex-1 py-3 bg-surface-container text-on-surface-variant rounded-full font-button-text transition-all active:scale-95">Cancelar</button>
            <button onClick={confirmModal.action} className="flex-1 py-3 bg-critical-coral text-white rounded-full font-button-text transition-all active:scale-95">Confirmar</button>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      {createModal && (
        <Modal title="➕ Novo Relato" onClose={() => setCreateModal(false)}>
          <ReportForm value={formValue} onChange={setFormValue} />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setCreateModal(false)} className="flex-1 py-3 bg-surface-container text-on-surface-variant rounded-full font-button-text active:scale-95">Cancelar</button>
            <button onClick={handleCreate} className="flex-1 py-3 bg-primary text-on-primary rounded-full font-button-text active:scale-95">Criar Relato</button>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {editModal && (
        <Modal title={`✏️ Editar ${selectedReport?.id}`} onClose={() => setEditModal(false)}>
          <ReportForm value={formValue} onChange={setFormValue} />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setEditModal(false)} className="flex-1 py-3 bg-surface-container text-on-surface-variant rounded-full font-button-text active:scale-95">Cancelar</button>
            <button onClick={handleEditSave} className="flex-1 py-3 bg-primary text-on-primary rounded-full font-button-text active:scale-95">Salvar</button>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteModal && selectedReport && (
        <Modal title="🗑️ Excluir Relato" onClose={() => setDeleteModal(false)}>
          <p className="text-body-md text-on-surface-variant mb-2">Tem certeza que deseja excluir o relato <strong>{selectedReport.id}</strong>?</p>
          <p className="text-body-md text-critical-coral mb-6">Esta ação não pode ser desfeita.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteModal(false)} className="flex-1 py-3 bg-surface-container text-on-surface-variant rounded-full font-button-text active:scale-95">Cancelar</button>
            <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-critical-coral text-white rounded-full font-button-text active:scale-95">Excluir</button>
          </div>
        </Modal>
      )}

      {/* Header */}
      <header className="bg-surface shadow-sm sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary fill-icon">admin_panel_settings</span>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Anjos da Rede</h1>
          <span className="ml-2 px-3 py-1 bg-primary text-on-primary text-xs rounded-full font-bold">ADMIN</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex flex-col items-end">
            <p className="font-label-lg text-label-lg text-on-surface">Coordenadora Maria</p>
            <p className="text-[11px] text-on-surface-variant">Escola Estadual Amigo Real</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary fill-icon">account_circle</span>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="bg-surface border-b border-outline-variant px-margin-mobile md:px-margin-desktop">
        <div className="flex gap-1 max-w-7xl mx-auto">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-button-text border-b-2 transition-all ${
                tab === t.key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-6">

        {/* ── DASHBOARD ── */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total', value: stats.total, color: 'bg-sky-blue-light text-primary', icon: 'assignment' },
                { label: 'Críticos', value: stats.critico, color: 'bg-error-container text-on-error-container', icon: 'warning' },
                { label: 'Urgentes', value: stats.urgente, color: 'bg-secondary-container text-on-secondary-container', icon: 'priority_high' },
                { label: 'Triagem', value: stats.triagem, color: 'bg-gold-soft text-on-secondary-container', icon: 'pending' },
                { label: 'Atendimento', value: stats.atendimento, color: 'bg-primary-container text-on-primary-container', icon: 'support_agent' },
                { label: 'Resolvidos', value: stats.resolvido, color: 'bg-safety-green text-on-primary-fixed-variant', icon: 'check_circle' },
              ].map(k => (
                <div key={k.label} className={`${k.color} p-4 rounded-xl flex flex-col gap-1 soft-shadow`}>
                  <span className="material-symbols-outlined text-2xl">{k.icon}</span>
                  <p className="font-headline-lg text-headline-lg font-bold">{k.value}</p>
                  <p className="text-xs opacity-80">{k.label}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Status chart */}
              <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow">
                <h3 className="font-headline-md text-headline-md text-primary mb-4">Status dos Relatos</h3>
                <BarChart data={[
                  { label: 'Crítico', value: stats.critico, color: '#E05555' },
                  { label: 'Urgente', value: stats.urgente, color: '#F59E0B' },
                  { label: 'Triagem', value: stats.triagem, color: '#38BDF8' },
                  { label: 'Atend.', value: stats.atendimento, color: '#6366F1' },
                  { label: 'Resolvido', value: stats.resolvido, color: '#4ADE80' },
                ]} />
              </div>

              {/* Local chart */}
              <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow">
                <h3 className="font-headline-md text-headline-md text-primary mb-4">Por Local</h3>
                <BarChart data={[
                  { label: 'Escola', value: stats.escola, color: '#F59E0B' },
                  { label: 'Casa', value: stats.casa, color: '#4ADE80' },
                  { label: 'Internet', value: stats.internet, color: '#6366F1' },
                ]} />
              </div>
            </div>

            {/* Taxa de resolução */}
            <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-headline-md text-headline-md text-primary">Taxa de Resolução</h3>
                <span className="font-headline-lg text-headline-lg font-bold text-safety-green">{stats.taxaResolucao}%</span>
              </div>
              <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-safety-green rounded-full transition-all duration-700" style={{ width: `${stats.taxaResolucao}%` }} />
              </div>
            </div>

            {/* Export section */}
            <div className="bg-gold-soft rounded-xl p-5">
              <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-4">Exportar Dados</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { exportCSV(reports); showToast('Exportado como CSV (Excel)', 'success') }}
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-full font-button-text text-on-secondary-container hover:shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined text-safety-green">table_view</span>
                  Exportar CSV (Excel)
                </button>
                <button onClick={() => { exportTXT(reports); showToast('Relatório TXT exportado', 'success') }}
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-full font-button-text text-on-secondary-container hover:shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined text-primary">download</span>
                  Exportar TXT
                </button>
                <button onClick={() => window.print()}
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-full font-button-text text-on-secondary-container hover:shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined text-outline">print</span>
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RELATOS (CRUD) ── */}
        {tab === 'relatos' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                  <input
                    type="text"
                    placeholder="Buscar por ID, tipo, descrição..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1) }}
                    className="w-full bg-surface-container rounded-full pl-10 pr-4 py-2.5 text-body-md text-on-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => { setFormValue(EMPTY_REPORT); setCreateModal(true) }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full font-button-text transition-all active:scale-95 hover:brightness-110"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Novo Relato
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
                  className="bg-surface-container border border-outline-variant rounded-full px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="todos">Todos os status</option>
                  {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filterLocal} onChange={e => { setFilterLocal(e.target.value); setPage(1) }}
                  className="bg-surface-container border border-outline-variant rounded-full px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="todos">Todos os locais</option>
                  {LOCAIS.map(l => <option key={l}>{l}</option>)}
                </select>
                <select value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1) }}
                  className="bg-surface-container border border-outline-variant rounded-full px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="todos">Todos os tipos</option>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                {(filterStatus !== 'todos' || filterLocal !== 'todos' || filterType !== 'todos' || search) && (
                  <button onClick={() => { setFilterStatus('todos'); setFilterLocal('todos'); setFilterType('todos'); setSearch(''); setPage(1) }}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-critical-coral bg-error-container rounded-full active:scale-95">
                    <span className="material-symbols-outlined text-sm">close</span>
                    Limpar filtros
                  </button>
                )}
              </div>

              <p className="text-sm text-on-surface-variant">{filtered.length} relato(s) encontrado(s)</p>

              {/* Export filtered */}
              <div className="flex gap-2">
                <button onClick={() => { exportCSV(filtered); showToast('CSV exportado!', 'success') }}
                  className="flex items-center gap-1 px-4 py-2 text-xs bg-safety-green/20 text-on-primary-fixed-variant rounded-full hover:bg-safety-green/40 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">table_view</span>
                  Exportar seleção CSV
                </button>
                <button onClick={() => { exportTXT(filtered); showToast('TXT exportado!', 'success') }}
                  className="flex items-center gap-1 px-4 py-2 text-xs bg-sky-blue-light text-primary rounded-full hover:brightness-95 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Exportar seleção TXT
                </button>
              </div>

              {/* List */}
              <div className="space-y-3">
                {paginated.length === 0 && (
                  <div className="text-center p-10 text-on-surface-variant bg-surface-container-lowest rounded-xl">
                    Nenhum relato encontrado.
                  </div>
                )}
                {paginated.map(r => (
                  <div
                    key={r.id}
                    className={`bg-surface-container-lowest rounded-xl p-4 soft-shadow border-2 transition-all ${selectedReport?.id === r.id ? 'border-primary' : 'border-transparent'}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{r.emotion}</span>
                      <div className="flex-1 min-w-0" onClick={() => setSelectedReport(r)} role="button">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-headline-md text-headline-md text-on-surface">{r.type}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">{r.local} · {r.date} · {r.channel}</p>
                        <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{r.description}</p>
                        <p className="text-xs text-outline mt-1">{r.id}{r.assignedTo ? ` · ${r.assignedTo}` : ''}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => handleEditOpen(r)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-blue-light text-primary transition-all active:scale-90" title="Editar">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button onClick={() => handleDeleteOpen(r)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-error-container text-critical-coral transition-all active:scale-90" title="Excluir">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container disabled:opacity-40 hover:bg-sky-blue-light transition-all active:scale-90">
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full font-button-text text-sm transition-all active:scale-90 ${page === p ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-sky-blue-light'}`}>
                      {p}
                    </button>
                  ))}
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container disabled:opacity-40 hover:bg-sky-blue-light transition-all active:scale-90">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              )}
            </div>

            {/* Detail Panel */}
            <div>
              {selectedReport ? (
                <div className="bg-surface-container-lowest rounded-xl p-5 soft-shadow sticky top-24 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedReport.emotion}</span>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">{selectedReport.type}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[selectedReport.status]}`}>{selectedReport.status}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { icon: 'tag', label: 'Protocolo', val: selectedReport.id },
                      { icon: 'location_on', label: 'Local', val: selectedReport.local },
                      { icon: 'schedule', label: 'Data', val: selectedReport.date },
                      { icon: 'devices', label: 'Canal', val: selectedReport.channel },
                      { icon: 'child_care', label: 'Idade', val: selectedReport.age || '—' },
                      { icon: 'person', label: 'Responsável', val: selectedReport.assignedTo || 'Não atribuído' },
                    ].map(item => (
                      <div key={item.label} className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">{item.icon}</span>
                        <div>
                          <p className="text-on-surface-variant text-xs">{item.label}</p>
                          <p className="text-on-surface">{item.val}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">description</span>
                      <div>
                        <p className="text-on-surface-variant text-xs">Descrição</p>
                        <p className="text-on-surface">{selectedReport.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Alterar status */}
                  <div>
                    <p className="text-xs text-on-surface-variant mb-2">Alterar status</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_STATUSES.map(s => (
                        <button key={s} onClick={() => handleStatus(selectedReport.id, s)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 ${selectedReport.status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-primary' : 'bg-surface-container text-on-surface-variant hover:brightness-95'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button onClick={() => handleEditOpen(selectedReport)}
                      className="w-full py-2.5 bg-primary text-on-primary rounded-full font-button-text text-sm flex items-center justify-center gap-2 active:scale-95 hover:brightness-110">
                      <span className="material-symbols-outlined text-sm">edit</span>Editar Relato
                    </button>
                    <button onClick={() => handleAcionar(selectedReport)}
                      className="w-full py-2.5 bg-critical-coral text-white rounded-full font-button-text text-sm flex items-center justify-center gap-2 active:scale-95 hover:brightness-110">
                      <span className="material-symbols-outlined text-sm">phone_forwarded</span>Acionar Autoridades
                    </button>
                    <button onClick={() => handleStatus(selectedReport.id, 'RESOLVIDO')}
                      className="w-full py-2.5 bg-safety-green text-on-primary-fixed-variant rounded-full font-button-text text-sm flex items-center justify-center gap-2 active:scale-95 hover:brightness-110">
                      <span className="material-symbols-outlined text-sm">done_all</span>Marcar Resolvido
                    </button>
                    <button onClick={() => handleDeleteOpen(selectedReport)}
                      className="w-full py-2.5 bg-error-container text-on-error-container rounded-full font-button-text text-sm flex items-center justify-center gap-2 active:scale-95">
                      <span className="material-symbols-outlined text-sm">delete</span>Excluir
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow flex flex-col items-center justify-center min-h-[280px] text-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">inbox</span>
                  <p className="text-body-md text-on-surface-variant">Selecione um relato para ver detalhes e ações.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── USUÁRIOS ── */}
        {tab === 'usuarios' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-primary">Usuários do Sistema</h2>
              <button onClick={() => showToast('Funcionalidade disponível na versão com backend.', 'info')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full font-button-text active:scale-95">
                <span className="material-symbols-outlined text-lg">person_add</span>
                Novo Usuário
              </button>
            </div>
            {[
              { name: 'Maria Coordenadora', role: 'Coordenador(a)', school: 'Escola Estadual Amigo Real', status: 'Ativo', avatar: '👩‍💼' },
              { name: 'João Pedagogo', role: 'Pedagogo(a)', school: 'Escola Estadual Amigo Real', status: 'Ativo', avatar: '👨‍🏫' },
              { name: 'Ana Conselheira', role: 'Conselho Tutelar', school: 'Região Centro', status: 'Ativo', avatar: '👩‍⚖️' },
              { name: 'Carlos Silva', role: 'Administrador', school: 'SESP-MT', status: 'Inativo', avatar: '👨‍💻' },
            ].map(u => (
              <div key={u.name} className="bg-surface-container-lowest rounded-xl p-5 soft-shadow flex items-center gap-4">
                <span className="text-3xl">{u.avatar}</span>
                <div className="flex-1">
                  <p className="font-headline-md text-headline-md text-on-surface">{u.name}</p>
                  <p className="text-sm text-on-surface-variant">{u.role} · {u.school}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.status === 'Ativo' ? 'bg-safety-green text-on-primary-fixed-variant' : 'bg-surface-container text-on-surface-variant'}`}>{u.status}</span>
                <div className="flex gap-1">
                  <button onClick={() => showToast('Edição de usuário disponível com backend.', 'info')}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-blue-light text-primary transition-all active:scale-90">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button onClick={() => showToast('Remoção de usuário disponível com backend.', 'info')}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-error-container text-critical-coral transition-all active:scale-90">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CONFIGURAÇÕES ── */}
        {tab === 'configuracoes' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="font-headline-md text-headline-md text-primary">Configurações do Sistema</h2>
            {[
              { icon: 'notifications', title: 'Notificações', desc: 'Alertas por e-mail para relatos críticos', value: true },
              { icon: 'security', title: 'Autenticação em dois fatores', desc: 'Exige código adicional no login', value: false },
              { icon: 'visibility_off', title: 'Modo sigilo total', desc: 'Não registra metadados dos relatantes', value: true },
              { icon: 'data_usage', title: 'Relatório automático semanal', desc: 'Envia resumo por e-mail toda segunda-feira', value: false },
            ].map((s, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl p-5 soft-shadow flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-button-text text-on-surface">{s.title}</p>
                  <p className="text-sm text-on-surface-variant">{s.desc}</p>
                </div>
                <button
                  onClick={() => showToast('Configuração salva!', 'success')}
                  className={`w-12 h-6 rounded-full transition-all relative ${s.value ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${s.value ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
            <div className="bg-gold-soft rounded-xl p-5">
              <h4 className="font-headline-md text-headline-md text-on-secondary-container mb-3">E-mail de notificação</h4>
              <div className="flex gap-3">
                <input type="email" defaultValue="coordenacao@escola.edu.br"
                  className="flex-1 bg-white rounded-full px-4 py-2.5 text-body-md border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary" />
                <button onClick={() => showToast('E-mail salvo!', 'success')}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-button-text active:scale-95">Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button onClick={() => navigate('/')}
          className="bg-white shadow-soft border border-outline-variant px-4 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-sky-blue-light transition-all flex items-center gap-2 active:scale-95">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
          Voltar ao Site
        </button>
      </div>
    </div>
  )
}
