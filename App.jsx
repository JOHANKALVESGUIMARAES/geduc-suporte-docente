import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const YOUTUBE_EMBED_ORIGIN = "https://www.youtube-nocookie.com/embed";

const ICON_PATHS = {
  shield:
    "M12 3l7 3v5.2c0 4.4-2.8 8.4-7 9.8-4.2-1.4-7-5.4-7-9.8V6l7-3zm0 3.1L7.5 8v3.2c0 3.1 1.7 5.9 4.5 7.1 2.8-1.2 4.5-4 4.5-7.1V8L12 6.1z",
  users:
    "M8.5 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7-1a3 3 0 1 1 .1 0h-.1zM3 19c.5-3.2 2.7-5 5.5-5s5 1.8 5.5 5H3zm11.8 0c-.2-1.4-.7-2.6-1.5-3.6.6-.3 1.3-.4 2.2-.4 2.3 0 4.2 1.4 4.5 4h-5.2z",
  book: "M5 4.5C5 3.7 5.7 3 6.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5v-16zM7 5v11.1c.2-.1.3-.1.5-.1H17V5H7zm-2 0v15.5C5 21.3 5.7 22 6.5 22H19v-2H7.5a.5.5 0 0 1 0-1H19v-1H7.5c-.9 0-1.8.4-2.5 1V5H5z",
  chart: "M5 19h14v2H3V4h2v15zm3-2H6V9h2v8zm5 0h-2V5h2v12zm5 0h-2v-6h2v6z",
  play: "M8 5.1c0-.8.9-1.3 1.6-.9l8.2 5.9c.6.4.6 1.3 0 1.8l-8.2 5.9c-.7.5-1.6 0-1.6-.9V5.1z",
  arrow:
    "M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3 1.4-1.4z",
  compass:
    "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm3.7 6.3-5.1 2.3-2.3 5.1 5.1-2.3 2.3-5.1zM12 12.9a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z",
  spark:
    "M12 2l1.5 5.1L18 9l-4.5 1.9L12 16l-1.5-5.1L6 9l4.5-1.9L12 2zm-6 9 1 3.2 3 1.3-3 1.3L6 20l-1-3.2-3-1.3 3-1.3L6 11zm13 1 .8 2.5 2.2 1-2.2 1-.8 2.5-.8-2.5-2.2-1 2.2-1L19 12z",
  bulb: "M12 2.5a6.5 6.5 0 0 0-4 11.62c.63.49 1 1.2 1 1.97V17h6v-.91c0-.78.38-1.49 1-1.98A6.5 6.5 0 0 0 12 2.5zM9.5 19c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-.75h-5V19zm.63 2.25c.35.76 1.08 1.25 1.87 1.25s1.52-.49 1.87-1.25h-3.74z",
};

const MODULES = [
  {
    id: "credenciais",
    number: 1,
    icon: "shield",
    title: "Primeiros Passos & Credenciais",
    description:
      "Orientações essenciais para acessar o ambiente, revisar informações cadastrais e manter o perfil funcional atualizado.",
    cards: [
      {
        id: "atualizacao-dados-pessoais",
        number: "01",
        title: "Atualização de dados pessoais",
        badge: "Perfil",
        description:
          "Atualize seus dados cadastrais no GEDUC para manter canais de contato e informações funcionais sempre consistentes.",
        steps: [
          "Acesse a área de perfil do professor no menu principal.",
          "Revise os campos disponíveis e ajuste as informações que precisarem de correção.",
          "Confirme a atualização e aguarde a mensagem de validação do sistema.",
        ],
        youtubeId: "olbnELhiEc0",
      },
    ],
  },
  {
    id: "atribuicoes",
    number: 2,
    icon: "users",
    title: "Atribuições & Turmas",
    description:
      "Consulta das turmas vinculadas ao docente e conferência das atribuições pedagógicas disponíveis no período letivo.",
    cards: [
      {
        id: "visualizar-turmas-atribuidas",
        number: "Info",
        title: "Como visualizar suas turmas atribuídas",
        badge: "Turmas",
        description:
          "Verifique as turmas associadas ao seu usuário e confirme se os vínculos exibidos correspondem à sua carga atribuída.",
        steps: [
          "Abra a área de turmas ou atribuições no painel do GEDUC.",
          "Confira série, turno, componente curricular e demais dados exibidos.",
          "Em caso de divergência, registre a inconsistência junto à gestão escolar.",
        ],
        technicalNote:
          "Legenda técnica de apoio: a conferência das turmas atribuídas deve considerar o ano letivo, o turno, a etapa, o componente curricular e o vínculo funcional exibido no painel do professor.",
      },
    ],
  },
  {
    id: "diario",
    number: 3,
    icon: "book",
    title: "Diário Eletrônico",
    description:
      "Rotinas de registro pedagógico para frequência, conteúdos ministrados e objetivos de conhecimento vinculados às aulas.",
    cards: [
      {
        id: "registrar-frequencia-alunos",
        number: "02",
        title: "Registrar frequência dos alunos",
        badge: "Frequência",
        description:
          "Realize o lançamento de presença e ausência dos estudantes de modo organizado, respeitando a turma e a data da aula.",
        steps: [
          "Selecione a turma, o componente curricular e a data correspondente.",
          "Confira a lista de estudantes antes de confirmar qualquer alteração.",
          "Registre as ausências necessárias e salve a frequência ao final.",
        ],
        youtubeId: "x-4mqWEGT8U",
      },
      {
        id: "lancar-conteudo-objetivos",
        number: "03",
        title: "Lançar conteúdo ministrado e Objetivos de Conhecimento",
        badge: "Conteúdo",
        description:
          "Documente o conteúdo trabalhado em sala e associe os objetivos de conhecimento pertinentes ao planejamento.",
        steps: [
          "Acesse a aula desejada após selecionar turma, data e componente.",
          "Preencha o conteúdo ministrado com linguagem clara e objetiva.",
          "Vincule os objetivos de conhecimento e confirme o registro no sistema.",
        ],
        youtubeId: "ONaVnoYFx-g",
      },
    ],
  },
  {
    id: "avaliacoes",
    number: 4,
    icon: "chart",
    title: "Avaliações & Notas",
    description:
      "Lançamento de notas, organização de subavaliações e fechamento dos períodos bimestrais e anuais.",
    cards: [
      {
        id: "notas-bimestrais-subavaliacoes",
        number: "04",
        title: "Inserção de notas bimestrais e subavaliações",
        badge: "Notas",
        description:
          "Cadastre notas bimestrais e subavaliações com atenção aos critérios definidos para a etapa avaliativa.",
        steps: [
          "Selecione turma, componente curricular e bimestre de lançamento.",
          "Informe as notas nos campos correspondentes e revise os valores digitados.",
          "Salve as informações somente após conferir alunos, avaliações e médias exibidas.",
        ],
        youtubeId: "1HKfHR8Ytqk",
      },
      {
        id: "fechamento-periodo-bimestral-anual",
        number: "05",
        title: "Fechamento de período bimestral e anual",
        badge: "Fechamento",
        description:
          "Conclua o período letivo após revisar pendências, notas e registros pedagógicos exigidos pelo fluxo escolar.",
        steps: [
          "Acesse a rotina de fechamento do período no módulo de avaliações.",
          "Analise alertas, pendências e inconsistências apontadas pelo GEDUC.",
          "Finalize o período apenas quando os registros estiverem completos e revisados.",
        ],
        youtubeId: "vJxOQ5jD0mA",
      },
      {
        id: "pendencias-frequencias-conteudos",
        number: "06",
        title: "Pendências de Frequências e Conteúdos",
        badge: "Pendências",
        description:
          "Identifique pendências de frequência e conteúdo antes do fechamento, reduzindo retrabalho e atrasos na consolidação dos dados pedagógicos.",
        steps: [
          "Consulte os relatórios de pendências indicados pelo sistema.",
          "Regularize as aulas que ainda não possuem frequência ou conteúdo informado.",
          "Faça uma nova conferência para validar se os registros foram atualizados corretamente.",
        ],
        youtubeId: "MFen5hZk4zk",
      },
    ],
  },
];

const NAV_LINKS = [
  { id: "credenciais", label: "Primeiros Passos" },
  { id: "atribuicoes", label: "Atribuições" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "sobre-projeto", label: "Sobre o Projeto" },
];

const HERO_STATS = [
  { value: "4", label: "Módulos" },
  { value: "7", label: "Guias" },
  { value: "6", label: "Tutoriais em Vídeo" },
];

function getSecureYouTubeEmbedUrl(youtubeId) {
  if (!/^[\w-]{11}$/.test(youtubeId ?? "")) {
    return null;
  }

  return `${YOUTUBE_EMBED_ORIGIN}/${youtubeId}?rel=0&modestbranding=1`;
}

function Icon({ name, className = "" }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d={ICON_PATHS[name]} fill="currentColor" />
    </svg>
  );
}

function Navbar({ activeSection, onNavigate }) {
  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">
        <button
          className="navbar__brand"
          type="button"
          onClick={() => onNavigate("credenciais")}
          aria-label="Ir para o início da Central de Ajuda GEDUC"
        >
          <span className="navbar__seal" aria-hidden="true">
            <Icon name="compass" className="navbar__seal-icon" />
          </span>
          <span className="navbar__brand-text">
            <strong>Central de Ajuda</strong>
            <span>GEDUC Professor</span>
          </span>
        </button>

        <nav className="navbar__nav" aria-label="Navegação principal">
          <ul className="navbar__list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  className={`navbar__link ${
                    activeSection === link.id ? "navbar__link--active" : ""
                  }`}
                  onClick={() => onNavigate(link.id)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function ModuleSection({ module }) {
  return (
    <section
      className="module-section"
      id={module.id}
      aria-labelledby={`${module.id}-title`}
    >
      <header className="module-section__header">
        <span className="module-section__index" aria-hidden="true">
          {String(module.number).padStart(2, "0")}
        </span>
        <div className="module-section__heading">
          <span className="module-section__icon-wrap" aria-hidden="true">
            <Icon name={module.icon} className="module-section__icon" />
          </span>
          <div>
            <p className="module-section__kicker">Módulo {module.number}</p>
            <h2 className="module-section__title" id={`${module.id}-title`}>
              {module.title}
            </h2>
            <p className="module-section__description">{module.description}</p>
          </div>
        </div>
      </header>

      <div className="tutorial-grid" role="list">
        {module.cards.map((card) => (
          <TutorialCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

function TutorialCard({ card }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const embedUrl = getSecureYouTubeEmbedUrl(card.youtubeId);
  const hasVideo = Boolean(embedUrl);

  return (
    <article className="tutorial-card" role="listitem">
      <div className="tutorial-card__content">
        <header className="tutorial-card__header">
          <span className="tutorial-card__number">{card.number}</span>
          <span className="tutorial-card__badge">{card.badge}</span>
        </header>

        <h3 className="tutorial-card__title">{card.title}</h3>
        <p className="tutorial-card__description">{card.description}</p>

        {card.technicalNote && (
          <p className="tutorial-card__technical-note">{card.technicalNote}</p>
        )}

        <ol className="tutorial-card__steps" aria-label="Etapas do tutorial">
          {card.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      {hasVideo && (
        <div className="tutorial-card__media">
          {!isPlayerOpen ? (
            <button
              className="tutorial-card__play"
              type="button"
              onClick={() => setIsPlayerOpen(true)}
              aria-label={`Assistir tutorial em vídeo: ${card.title}`}
            >
              <Icon name="play" className="tutorial-card__play-icon" />
              <span>Assistir tutorial em vídeo</span>
            </button>
          ) : (
            <div
              className="tutorial-card__frame"
              role="region"
              aria-label={`Player do tutorial ${card.title}`}
            >
              <iframe
                src={embedUrl}
                title={`Tutorial: ${card.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function AboutProject() {
  return (
    <section
      className="about-project"
      id="sobre-projeto"
      aria-labelledby="sobre-projeto-title"
    >
      <div className="about-project__inner">
        <div className="about-project__marker" aria-hidden="true">
          <Icon name="bulb" className="about-project__icon" />
        </div>
        <div className="about-project__content">
          <p className="about-project__kicker">Sobre o Projeto</p>
          <h2 className="about-project__title" id="sobre-projeto-title">
            Uma central construída para apoiar a rotina docente
          </h2>
          <p>
            Esta plataforma nasceu da necessidade de otimizar o fluxo de
            trabalho dos docentes, reunindo orientações objetivas para que cada
            professor possa executar as principais rotinas do GEDUC com mais
            autonomia, segurança e previsibilidade. Nesse sentido, a central
            adota o micro-learning como estratégia instrucional: conteúdos
            curtos, direcionados e organizados por contexto de uso, permitindo
            que a consulta aconteça no momento exato em que a dúvida surge.
          </p>
          <p>
            Além de apoiar as demandas atuais, o projeto assume um compromisso
            permanente com a evolução contínua. À medida que a plataforma
            expandir suas ferramentas pedagógicas e incorporar novos fluxos de
            trabalho, novos módulos instrucionais serão integrados dinamicamente
            à central, preservando a clareza das orientações e fortalecendo a
            autonomia dos profissionais da educação.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const observableSections = useMemo(
    () => [...MODULES.map((module) => module.id), "sobre-projeto"],
    [],
  );
  const [activeSection, setActiveSection] = useState("credenciais");

  const handleNavigate = useCallback((sectionId) => {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-96px 0px -58% 0px",
        threshold: 0,
      },
    );

    observableSections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [observableSections]);

  return (
    <div className="app">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Portal do Professor</span>
            <h1 className="hero__title" id="hero-title">
              Central de Ajuda GEDUC Grajaú
            </h1>
            <p className="hero__description">
              Guias objetivos e tutoriais em vídeo para apoiar o uso diário do
              GEDUC com autonomia, organização e foco nas rotinas pedagógicas
              essenciais.
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handleNavigate("credenciais")}
              >
                Começar pelo início
                <Icon name="arrow" className="btn__icon" />
              </button>
              <button
                type="button"
                className="btn btn--accent"
                onClick={() => handleNavigate("diario")}
              >
                Ir para o Diário Eletrônico
                <Icon name="book" className="btn__icon" />
              </button>
            </div>
          </div>

          <aside className="hero__stats" aria-label="Resumo da Central GEDUC">
            {HERO_STATS.map((stat) => (
              <div className="hero__stat-card" key={stat.label}>
                <span className="hero__stat-number">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <main className="main" id="conteudo-principal">
        <div className="main__inner">
          {MODULES.map((module) => (
            <ModuleSection key={module.id} module={module} />
          ))}
        </div>
      </main>

      <AboutProject />

      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <p>
            Central de Ajuda GEDUC Professor - Secretaria Municipal de Educação
            de Grajaú, MA.
          </p>
          <p>
            Para demandas técnicas não contempladas pelos tutoriais, procure a
            coordenação pedagógica da sua unidade escolar.
          </p>
        </div>
      </footer>
    </div>
  );
}
