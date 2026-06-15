# Central de Ajuda – Geduc Grajaú

> Portal de suporte instrucional para docentes da rede municipal de Grajaú – MA.

## Visão Geral

MVP de canal de atendimento rápido que resolve o gargalo operacional gerado por dúvidas triviais sobre o sistema Geduc. A solução aplica o conceito de **Micro-Learning**: textos instrucionais diretos combinados com vídeos tutoriais de tela (*clique a clique*), dando autonomia ao professor e reduzindo a sobrecarga da diretoria escolar.

---

## Stack Técnica

| Camada         | Tecnologia                     |
| -------------- | ------------------------------ |
| Framework      | React 18 (Vite)                |
| Estilização    | CSS3 Vanilla com custom properties |
| Validação de Props | PropTypes                  |
| Hospedagem de Vídeos | YouTube (Unlisted / Not Listed) |
| Deploy         | Vercel / Netlify (recomendado) |

---

## Estrutura de Pastas

```
geduc-suporte/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Cabeçalho institucional sticky com navegação ativa
│   │   ├── Navbar.css
│   │   ├── ModuleSection.jsx # Wrapper de cada módulo de ajuda
│   │   ├── ModuleSection.css
│   │   ├── VideoCard.jsx     # Card instrucional com iframe seguro
│   │   └── VideoCard.css
│   ├── App.jsx               # SPA principal; dados dos módulos e estado global
│   ├── App.css               # Hero, botões, layout, footer
│   ├── index.css             # Design tokens CSS e reset
│   └── main.jsx              # Ponto de entrada React
├── index.html                # HTML raiz com CSP meta tag
├── vite.config.js
├── package.json
├── .gitignore
└── README.md
```

---

## Segurança Implementada

### 1. Content Security Policy (CSP)
Diretiva definida em `index.html` via `<meta http-equiv="Content-Security-Policy">`:

- `default-src 'self'` — bloqueia qualquer recurso externo não declarado.
- `frame-src https://www.youtube.com https://www.youtube-nocookie.com` — permite apenas iframes do YouTube.
- `script-src 'self'` — proíbe scripts inline e de origens externas.
- `object-src 'none'` — bloqueia plugins legados (Flash etc.).
- `form-action 'self'` — impede envio de formulários para domínios externos.

### 2. Proteção XSS
- O React escapa strings nativamente; **nenhum uso de `dangerouslySetInnerHTML`** em todo o projeto.
- Todos os textos instrucionais são dados estáticos em array JS, nunca interpolados a partir de entradas externas.

### 3. Segurança dos iframes (Clickjacking)
Cada `<iframe>` de vídeo contém:
```jsx
sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
referrerPolicy="no-referrer"
```
- Atributo `sandbox` restrito ao mínimo necessário para o player do YouTube funcionar.
- Domínio `youtube-nocookie.com` usado como origem dos embeds, eliminando cookies de rastreamento de terceiros.

### 4. Carregamento Lazy de Vídeos
O `<iframe>` só é montado no DOM **após o clique explícito** do professor no botão "Assistir Tutorial". Isso reduz o tempo de carregamento inicial e evita requisições desnecessárias a domínios externos.

### 5. Links Externos
Todos os links externos utilizam `rel="noopener noreferrer"` para mitigar ataques de *reverse tabnapping*.

---

## Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/geduc-suporte.git
cd geduc-suporte

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:5173

# 4. Build de produção
npm run build
```

---

## Como Adicionar Vídeos

1. Faça o upload do vídeo no YouTube com privacidade **"Não Listado"** (*Unlisted*).
2. Copie o **ID** do vídeo da URL: `https://youtu.be/`**`ABC123xyz`** → ID = `ABC123xyz`.
3. Em `src/App.jsx`, localize o card correspondente no array `MODULOS` e substitua:
   ```js
   youtubeId: 'ABC123xyz'
   ```

---

## Acessibilidade (WCAG 2.1 AA)

- Contraste de texto ≥ 4.5:1 em todos os elementos de conteúdo.
- Foco visível com `outline` colorido em todos os elementos interativos.
- Atributos `aria-label`, `aria-current` e `role` aplicados na navbar e nos cards.
- Preferência de movimento reduzido respeitada via `@media (prefers-reduced-motion)`.
- Estrutura semântica: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`.

---

## Identidade Visual

| Token              | Valor      | Uso                        |
| ------------------ | ---------- | -------------------------- |
| `--color-brand-blue`   | `#1E3A8A`  | Topo, headers, badges de módulo |
| `--color-brand-green`  | `#2E7D32`  | Botões de ação, ícones, badges ativos |
| `--color-bg`           | `#F8FAFC`  | Fundo da página            |
| `--color-text-primary` | `#1E293B`  | Textos principais          |

---

*Desenvolvido para o Projeto de Extensão – UNINTER | Secretaria de Educação de Grajaú – MA*
