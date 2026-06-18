# PRD — Anjos da Rede: Portal de Denúncias Multicanal

**Versão:** 1.0  
**Data:** Junho 2026  
**Stack:** React + Vite + TypeScript + Tailwind CSS  
**Design System:** Acolhimento Lúdico (ver DESIGN.md)

---

## 1. Visão Geral do Produto

**Anjos da Rede** é uma plataforma digital de utilidade pública voltada para a proteção de crianças e adolescentes em ambiente escolar. Atua como canal seguro e anônimo para que alunos realizem relatos de situações de vulnerabilidade (bullying, violência doméstica, cyberbullying), conectando-os automaticamente à rede de proteção (Conselho Tutelar, Disque 100, Delegacias Especializadas, Patrulha Escolar).

**Missão:** Transformar o silêncio em ação, garantindo proteção com sigilo absoluto.

---

## 2. Usuários-Alvo

| Perfil | Descrição |
|--------|-----------|
| **Aluno (6–17 anos)** | Usuário primário. Pode estar em situação de vulnerabilidade ou presenciar uma. Interface lúdica, emoji-driven, sem exigência de leitura avançada. |
| **Coordenador / Orientador** | Acessa o Painel Admin via biometria. Realiza triagem dos relatos e aciona autoridades quando necessário. |
| **Cidadão Geral** | Acessa via Landing Page pública para conhecer a plataforma e fazer um relato direto. |

---

## 3. Telas e Fluxos

### 3.1 Landing Page (`/`)
**Objetivo:** Apresentar a plataforma ao público geral (pais, professores, secretarias).

**Componentes:**
- Navbar sticky com links âncora e botão "Denunciar agora"
- Hero Section com gradiente sky-blue, título, CTA duplo ("Fazer Relato" + "Acessar App")
- Seção "Como Funciona" — bento grid de 3 cards (Cidadão → IA → Órgão)
- Seção "Nossas Conexões" — 4 canais parceiros (Disque 100, Conselho Tutelar, DECA/DEDM, Patrulha Escolar)
- Seção "Segurança" com fundo primary, 3 pilares (LGPD, Filtro, Sigilo) + Selo Digital
- Footer completo com links institucionais
- FAB flutuante "Denunciar" (mobile)
- Bottom Navigation (mobile only)

---

### 3.2 App Home — Página Inicial Aluno (`/app`)
**Objetivo:** Tela principal do kiosk/tablet escolar. Uma pergunta por vez, visual lúdico.

**Componentes:**
- TopBar com logo + botão "Área do Tutor"
- Banner hero com fundo `primary-container`, ilustração animada (floating)
- Bento grid 3 cards:
  - 💛 **Quero Conversar** (bg sky-blue-light)
  - 📣 **Relatar Algo** (bg gold-soft) → navega para `/app/relato`
  - 📚 **Meus Direitos** (bg safety-green)
- Faixa "Rede de Proteção Ativa" com link para parceiros
- Footer com Disque 100 + links
- Bottom Nav (mobile)

---

### 3.3 Relato — Passo 1: Triagem Inicial (`/app/relato`)
**Objetivo:** Capturar estado emocional e tipo/local do incidente antes de direcionar ao canal correto.

**Componentes:**
- TopBar com logo
- Stepper gamificado em nuvens (4 passos: Começo → Detalhes → Pessoas → Pronto)
- **Pergunta 1:** "Como você está se sentindo hoje?" — 4 chips emoji (😊 😢 😨 😠), seleção visual com borda primary
- Divisor
- **Pergunta 2:** "Sobre o que você quer falar?" — 4 cards (Escola, Casa, Internet, Outro lugar), cada um com ícone colorido
- Botão "Continuar" → navega para o canal correspondente

**Lógica de navegação:**
- Escola → `/app/relato/escola`
- Casa → `/app/relato/casa`
- Internet → `/app/relato/internet`
- Outro → `/app/relato/escola` (genérico)

---

### 3.4 Canal Escola (`/app/relato/escola`)
**Objetivo:** Formulário de relato contextualizado para incidentes escolares.

**Componentes:**
- Header com ícone escola + título "Canal Escola"
- **Seção 1:** "O que aconteceu?" — 3 cards radio (😠 Bullying / ⚔️ Briga / 😔 Exclusão)
- **Seção 2:** "Quem estava lá?" — chips de seleção múltipla (Colega / Professor / Funcionário / Outro)
- **Seção 3:** Textarea "Tinha mais alguém vendo?" + botão microfone
- Botão "Enviar com Confiança" (bg secondary-container) → `/app/relato/sucesso`
- Nota de privacidade com ícone de cadeado

---

### 3.5 Canal Casa (`/app/relato/casa`)
**Objetivo:** Abordagem empática para situações de violência/medo doméstico.

**Componentes:**
- Header com emoji 🏠 animado (floating)
- Progress indicator (3 dots)
- **Grid emocional 2×2:** (😊 Muito bem / 😐 Mais ou menos / 😟 Preocupado / 😢 Triste) com seleção neomorphic
- **Pergunta de risco:** "Tem alguém que te assusta em casa?" — 3 opções pill-shaped
- Textarea livre com botões mic + palette
- **Bloco de Emergência** (bg error-container): botão pulsante coral "PEDIDO DE AJUDA URGENTE"
- Botão "Continuar" → `/app/relato/sucesso`

---

### 3.6 Canal Internet (`/app/relato/internet`)
**Objetivo:** Relato de cyberbullying e situações digitais.

**Componentes:**
- Header com ícone 🌐 + título "Canal Internet"
- **Grid 2×3:** tipos de incidente (📱 Cyberbullying / 📸 Foto / 👤 Perfil Falso / 😰 Ameaça / 🔞 Conteúdo / ❓ Outro)
- **Chips de plataforma:** Instagram / WhatsApp / Jogo Online / YouTube / TikTok / Outro
- Textarea para descrição + botão microfone
- Botão "Enviar com Confiança" → `/app/relato/sucesso`

---

### 3.7 Relato Enviado com Sucesso (`/app/relato/sucesso`)
**Objetivo:** Confirmação positiva e empática. Reduzir ansiedade pós-relato.

**Componentes:**
- Ícone animado ✅ com fundo safety-green pulsante
- 3 estrelas animadas (floating com delay)
- Título "Recebemos seu relato!" + mensagem de suporte
- Card com número de protocolo gerado
- Seção "O que acontece agora?" — 3 passos com ícones
- CTAs: "Voltar ao Início" + "Fazer Outro Relato"
- Link emergência Disque 100

---

### 3.8 Painel Administrativo (`/admin`)
**Objetivo:** Interface de triagem para coordenadores pedagógicos.

**Componentes:**
- Header com nome/foto do coordenador
- **4 cards de estatísticas:** Relatos Hoje / Críticos / Em Triagem / Resolvidos
- **Lista de relatos** com filtros por status (Todos / Crítico / Urgente / Triagem)
- Cada card de relato: emoji de humor + tipo + local + tempo + badge de status colorido + descrição
- **Painel de detalhes** (direita): ao clicar em um relato, exibe todos os dados + 3 botões de ação (Assumir Triagem / Acionar Autoridades / Marcar Resolvido)
- Ações rápidas: Exportar Relatório / Estatísticas / Configurações

---

## 4. Sistema de Design

Implementado fielmente a partir do arquivo `DESIGN.md` (tema "Acolhimento Lúdico"):

| Token | Valor |
|-------|-------|
| `primary` | `#0c6780` (Sky Blue) |
| `secondary-container` | `#fcd400` (Gold) |
| `safety-green` | `#A8E6CF` |
| `critical-coral` | `#FF8B94` |
| Headline | Quicksand 700 |
| Body | Nunito Sans 400 |
| Border Radius | Full (9999px) / XL (3rem) / LG (2rem) |
| Touch Target Min | 56px |
| Sombras | Difusas, azuladas (soft-shadow) |
| Animações | floating, pulse-soft, pulse-red |

---

## 5. Rotas da Aplicação

```
/                       → Landing Page (público)
/app                    → Home do Aluno (kiosk)
/app/relato             → Passo 1 — Triagem inicial
/app/relato/escola      → Canal Escola
/app/relato/casa        → Canal Casa
/app/relato/internet    → Canal Internet
/app/relato/sucesso     → Confirmação de envio
/admin                  → Painel Administrativo
```

---

## 6. Requisitos Não-Funcionais

- **Acessibilidade:** Touch targets mínimos de 56px, contraste WCAG, suporte a TTS nativo
- **Performance:** Bundle < 300KB gzip, animações a 60fps
- **Responsividade:** Mobile-first, otimizado para tablets 10.1" landscape/portrait
- **Privacidade:** Sem coleta de dados identificáveis. Sem tracking de terceiros.
- **LGPD:** Conformidade total — dados não transitam por servidores públicos (arquitetura offline-first)

---

## 7. Fora do Escopo (v1.0)

- Autenticação de usuários (não implementado nesta versão)
- Backend/API real (dados mockados)
- Notificações push
- Chat em tempo real ("Quero Conversar")
- Modo Kiosk (bloqueio Android)
- Biometria do coordenador
