import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  Github,
  Globe2,
  Linkedin,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { caseStudies, links, projects, skills, testimonials } from "./content";
import type { CaseId } from "./content";
import Atmosphere from "./Atmosphere";

const KeyboardScene = lazy(() => import("./KeyboardScene"));
const SculptureScene = lazy(() => import("./SculptureScene"));
const navigation = [
  { id: "work", text: "Work" },
  { id: "skills", text: "Toolbox" },
  { id: "about", text: "About" },
  { id: "contact", text: "Contact" },
];

function useMotion() {
  const [motion, setMotion] = useState(() => {
    try {
      const saved = localStorage.getItem("luko-motion");
      return saved === null
        ? !matchMedia("(prefers-reduced-motion: reduce)").matches
        : saved === "on";
    } catch {
      return !matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    try {
      localStorage.setItem("luko-motion", motion ? "on" : "off");
    } catch {
      /* Optional preference storage. */
    }
  }, [motion]);
  return [motion, setMotion] as const;
}

function useCursorPreference() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem("luko-cursor") !== "system";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("luko-cursor", enabled ? "custom" : "system");
    } catch {
      /* Cursor preferences remain usable without storage. */
    }
  }, [enabled]);
  return [enabled, setEnabled] as const;
}

function SectionHeading({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          {number} / {detail}
        </span>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function CaseDialog({
  id,
  onClose,
}: {
  id: CaseId | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!id) return;
    const el = dialog.current!;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = old;
    };
  }, [id]);
  if (!id) return null;
  const study = caseStudies[id];
  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
      aria-labelledby="case-title"
    >
      <button
        className="icon-button dialog-close"
        onClick={onClose}
        aria-label="Close project overview"
      >
        <X size={22} />
      </button>
      <span className="eyebrow">
        {study.number} / {study.category}
      </span>
      <h2 id="case-title">{study.title}</h2>
      <p className="dialog-intro">{study.intro}</p>
      {study.sections.map((section) => (
        <div className="case-section" key={section.title}>
          <h3>{section.title}</h3>
          <p>{section.text}</p>
        </div>
      ))}
      <div className="dialog-actions">
        <a
          className="primary-link"
          href={study.url}
          target="_blank"
          rel="noreferrer"
        >
          {id === "skyline"
            ? "Read client recommendations"
            : "Explore on GitHub"}
          <ArrowUpRight size={18} />
        </a>
        {"demo" in study && (
          <a
            className="text-link"
            href={study.demo}
            target="_blank"
            rel="noreferrer"
          >
            Open live application
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </dialog>
  );
}

function App() {
  const [motion, setMotion] = useMotion();
  const [cursorEnabled, setCursorEnabled] = useCursorPreference();
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selected, setSelected] = useState("javascript");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [caseId, setCaseId] = useState<CaseId | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const currentSkill = skills.find((skill) => skill.id === selected)!;
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = projects.filter(
    (project) =>
      (filter === "All" || project.category === filter) &&
      `${project.name} ${project.description} ${project.language}`
        .toLowerCase()
        .includes(normalizedQuery),
  );
  const visibleProjects =
    showAll || normalizedQuery || filter !== "All"
      ? filtered
      : filtered.slice(0, 8);

  useEffect(() => {
    const sections = navigation.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    const header = document.querySelector(".site-header");
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const readingLine = Math.max(
        (header?.getBoundingClientRect().bottom ?? 80) + 24,
        Math.min(viewport * 0.3, 260),
      );
      let current = "";
      sections.forEach(({ id, element }) => {
        if (element.getBoundingClientRect().top <= readingLine) current = id;
      });
      const last = sections.at(-1);
      const scrollEnd = document.documentElement.scrollHeight - viewport;
      // A short final section cannot reach the reading line at the end of a page.
      if (
        last &&
        scrollEnd > 0 &&
        window.scrollY >= scrollEnd - 6 &&
        last.element.getBoundingClientRect().top < viewport
      )
        current = last.id;
      setActiveSection((previous) =>
        previous === current ? previous : current,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("keydown", escape);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setCopyFailed(false);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <>
      <Atmosphere
        motion={motion}
        cursorEnabled={cursorEnabled && caseId === null}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="LukoDevelops home">
          <span className="brand-mark">
            L<span>↗</span>
          </span>
          <span>
            Luko<span className="brand-light">Develops</span>
            <small>LUKAS ZEMOLOCHINAS</small>
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className={`main-nav ${menu ? "menu-open" : ""}`}
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
              href={`#${item.id}`}
              onClick={() => setMenu(false)}
            >
              {item.text}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button cursor-button"
            onClick={() => setCursorEnabled(!cursorEnabled)}
            aria-label="Custom cursor"
            title={
              motion
                ? cursorEnabled
                  ? "Use system cursor"
                  : "Use custom cursor"
                : "Enable animations to use the custom cursor"
            }
            aria-pressed={cursorEnabled}
            disabled={!motion}
          >
            <MousePointer2 size={15} />
            <span className="cursor-mode-dot" aria-hidden="true" />
          </button>
          <button
            className="icon-button motion-button"
            onClick={() => setMotion(!motion)}
            aria-label={motion ? "Pause animations" : "Enable animations"}
            title={motion ? "Pause animations" : "Enable animations"}
          >
            {motion ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <a className="header-contact" href="#contact">
            Say hello <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section
          className="hero section-shell"
          id="home"
          aria-labelledby="hero-heading"
        >
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" /> SOFTWARE / DESIGN / EXPLORATION
            </span>
            <span className="eyebrow hero-edition">
              INDEPENDENT MIND / CONNECTED IDEAS
            </span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-intro">
                Hey, I’m Lukas. <span>Also known as Luko.</span>
              </p>
              <h1 id="hero-heading">
                <span className="headline-line">Ideas into</span>
                <br />
                <span className="headline-line gradient-word">interfaces.</span>
                <br />
                <span className="muted-word">And beyond.</span>
                <span className="hero-spark" aria-hidden="true">
                  ✳
                </span>
              </h1>
              <p className="hero-description">
                I build useful software, thoughtful digital experiences, and
                things that make you want to explore.
              </p>
              <div className="hero-links">
                <a className="primary-link" href="#work">
                  Explore my work <ArrowDownRight />
                </a>
                <a className="text-link" href="#about">
                  A little about me <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="hero-stage">
              <div className="stage-aura" aria-hidden="true" />
              <div className="stage-orbit orbit-one" aria-hidden="true" />
              <div className="stage-orbit orbit-two" aria-hidden="true" />
              <div className="stage-label">
                <Braces size={16} />
                <span>THE IDEA MACHINE / 001</span>
              </div>
              <span className="stage-coordinate" aria-hidden="true">
                43° N / CREATIVE MODE
              </span>
              <span className="floating-chip chip-code" aria-hidden="true">
                &lt;/&gt;
              </span>
              <span className="floating-chip chip-star" aria-hidden="true">
                ✳
              </span>
              <Suspense
                fallback={
                  <div className="scene-loading">
                    <span className="status-dot" /> Setting the scene…
                  </div>
                }
              >
                <KeyboardScene
                  selected={selected}
                  onSelect={setSelected}
                  motion={motion}
                />
              </Suspense>
              <div className="stage-caption">
                <MousePointer2 size={16} />
                <span>Go on. Press a key.</span>
                <ArrowDownLeft size={22} />
              </div>
              <div className="hero-skill-status" aria-live="polite">
                <span
                  className="skill-color"
                  style={{ backgroundColor: currentSkill.color }}
                />
                <span>{currentSkill.name}</span>
                <span className="skill-category">{currentSkill.category}</span>
              </div>
              <div
                className="hero-quick-keys"
                aria-label="Explore keyboard technologies"
              >
                {skills
                  .filter((skill) =>
                    ["javascript", "react", "html", "python", "ai"].includes(
                      skill.id,
                    ),
                  )
                  .map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => setSelected(skill.id)}
                      aria-pressed={selected === skill.id}
                    >
                      {skill.label}
                    </button>
                  ))}
                <a href="#skills" aria-label="Explore the full toolbox">
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              <Globe2 size={14} /> BASED IN ONTARIO, CANADA
            </span>
            <span>FULL-STACK MINDSET. CREATIVE CURIOSITY.</span>
            <a href="#work">
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i}>
                THOUGHTFUL INTERFACES <span>✳</span> USEFUL SOFTWARE{" "}
                <span>✳</span> CREATIVE TECHNOLOGY <span>✳</span> ALWAYS
                EXPLORING <span>✳</span>
              </span>
            ))}
          </div>
        </div>

        <section id="work" className="work section-shell">
          <div className="section-title-row">
            <SectionHeading
              number="01"
              title="Work worth exploring."
              detail="SELECTED WORK"
            />
            <p>
              From a study workspace to open-source ecosystems and real-world
              client work.
            </p>
          </div>
          <div className="featured-grid">
            <button
              className="featured-card study-card"
              onClick={() => setCaseId("study")}
            >
              <div className="project-visual study-visual">
                <span className="visual-label">ORIGINAL APPLICATION</span>
                <div className="study-window">
                  <div className="window-top">
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <small>AI Study Companion</small>
                    <Sparkles size={13} />
                  </div>
                  <div className="study-window-body">
                    <div className="mock-sidebar">
                      <Braces size={18} />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="mock-content">
                      <small>YOUR REVISION WORKSPACE</small>
                      <strong>
                        Learn with
                        <br />a little more clarity.
                      </strong>
                      <div className="mock-upload">
                        <span>+</span>
                        <small>Sources → understanding</small>
                      </div>
                      <div className="mock-cards">
                        <span>
                          <Sparkles size={14} />
                          Summaries
                        </span>
                        <span>
                          <Code2 size={14} />
                          Practice
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="visual-footnote">INTERFACE CONCEPT</span>
                <span className="visual-number">01</span>
              </div>
              <div className="featured-description">
                <div>
                  <span className="eyebrow">AI / WEB APPLICATION</span>
                  <h3>AI Study Companion</h3>
                  <p>A source-linked revision workspace.</p>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
            </button>
            <button
              className="featured-card open-card"
              onClick={() => setCaseId("open")}
            >
              <div className="project-visual open-visual">
                <span className="visual-label">OPEN-SOURCE REPOSITORIES</span>
                <Suspense fallback={<div className="sculpture-placeholder" />}>
                  <SculptureScene
                    variant="orbit"
                    motion={motion}
                    className="project-sculpture"
                  />
                </Suspense>
                <span className="visual-footnote">CONNECTED ECOSYSTEMS</span>
                <span className="visual-number">02</span>
              </div>
              <div className="featured-description">
                <div>
                  <span className="eyebrow">LUA / GAME SYSTEMS</span>
                  <h3>Open-source ecosystems</h3>
                  <p>Guides, interfaces, and useful game tools.</p>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
            </button>
            <button
              className="featured-card skyline-card"
              onClick={() => setCaseId("skyline")}
            >
              <div className="project-visual skyline-visual">
                <span className="visual-label">PAST CLIENT WORK</span>
                <div className="skyline-art">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <div className="skyline-word">
                    skyline<span>Dynamics Inc.</span>
                  </div>
                </div>
                <span className="visual-footnote">
                  SOFTWARE × PROJECT DELIVERY
                </span>
                <span className="visual-number">03</span>
              </div>
              <div className="featured-description">
                <div>
                  <span className="eyebrow">CLIENT WORK / FULL STACK</span>
                  <h3>Skyline Dynamics</h3>
                  <p>Digital work across different industries.</p>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
            </button>
          </div>

          <div className="library">
            <div className="library-header">
              <div>
                <span className="eyebrow">THE WIDER PICTURE</span>
                <h3>
                  More to explore
                  <span> / {projects.length.toString().padStart(2, "0")}</span>
                </h3>
              </div>
              <div className="search-box" role="search">
                <Search size={17} />
                <input
                  ref={searchInput}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && query) {
                      event.preventDefault();
                      setQuery("");
                    }
                  }}
                  placeholder="Find a project…"
                  aria-label="Search projects"
                />
                {query && (
                  <button
                    className="search-clear"
                    aria-label="Clear project search"
                    onClick={() => {
                      setQuery("");
                      searchInput.current?.focus();
                    }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
            <div
              className="filter-bar"
              role="group"
              aria-label="Filter projects"
            >
              {[
                "All",
                "Applications",
                "Tools",
                "Game systems",
                "Interfaces",
              ].map((category) => (
                <button
                  key={category}
                  className={filter === category ? "selected" : ""}
                  aria-pressed={filter === category}
                  aria-label={category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  <span className="filter-count" aria-hidden="true">
                    {category === "All"
                      ? projects.length
                      : projects.filter(
                          (project) => project.category === category,
                        ).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="repository-grid" id="project-library">
              {visibleProjects.map((project, i) => (
                <a
                  className="repository-card"
                  key={project.name}
                  href={`${links.github}/${project.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="repo-top">
                    <span className="repo-index">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {project.fork ? (
                      <GitBranch size={16} />
                    ) : (
                      <Code2 size={17} />
                    )}
                    <ArrowUpRight size={17} />
                  </div>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <div className="repo-meta">
                    <span>
                      <i
                        style={{
                          backgroundColor:
                            project.language === "Lua"
                              ? "#a99fd6"
                              : project.language === "JavaScript"
                                ? "#f0cf64"
                                : "#8bdbdf",
                        }}
                      />
                      {project.language}
                    </span>
                    <span>
                      {project.fork ? "Open-source fork" : "Original project"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <Search size={25} aria-hidden="true" />
                <p>
                  No projects match that search. Try another name or language.
                </p>
                <button
                  className="text-link"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                    searchInput.current?.focus();
                  }}
                >
                  Reset search and filters <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="library-bottom">
              <p role="status" aria-live="polite" aria-atomic="true">
                {visibleProjects.length} of {filtered.length} projects shown{" "}
                <span>· Repository collection checked September 2026</span>
              </p>
              {!normalizedQuery && filter === "All" && (
                <button
                  className="text-link"
                  aria-expanded={showAll}
                  aria-controls="project-library"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show fewer projects" : "Explore all projects"}
                  <ChevronDown size={17} className={showAll ? "rotate" : ""} />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="creative-lab" aria-labelledby="lab-title">
          <div className="lab-grid section-shell">
            <div className="lab-copy" data-reveal>
              <span className="eyebrow">
                A LITTLE EXPERIMENT / A LOT OF CURIOSITY
              </span>
              <h2 id="lab-title">
                Logic.
                <br />
                With a little
                <br />
                <em>magic.</em>
              </h2>
              <p>
                Good software can be practical and playful. I like exploring the
                space where solid engineering meets unexpected experiences.
              </p>
              <a href="#skills" className="lab-link">
                Explore the ingredients <ArrowDown size={18} />
              </a>
            </div>
            <div className="lab-art">
              <div className="lab-art-meta lab-art-meta-top">
                <span className="lab-orbit-label">IDEAS IN MOTION</span>
                <span className="lab-cross cross-one" aria-hidden="true">
                  +
                </span>
              </div>
              <div className="lab-model-viewport">
                <Suspense fallback={<div className="sculpture-placeholder" />}>
                  <SculptureScene
                    variant="portal"
                    motion={motion}
                    className="lab-sculpture"
                  />
                </Suspense>
              </div>
              <div className="lab-art-meta lab-art-meta-bottom">
                <div className="lab-art-caption">
                  <span className="status-dot" /> DESIGN × CODE × CURIOSITY
                </div>
                <span className="lab-cross cross-two" aria-hidden="true">
                  +
                </span>
              </div>
            </div>
          </div>
          <div className="lab-bottom section-shell">
            <span>EXPERIMENTATION IS PART OF THE PROCESS.</span>
            <span aria-hidden="true">↓</span>
            <span>KEEP EXPLORING.</span>
          </div>
        </section>

        <section id="skills" className="skills-section section-shell">
          <div className="section-title-row">
            <SectionHeading
              number="02"
              title="Touch the toolbox."
              detail="MY TOOLBOX"
            />
            <p>
              A full-stack toolkit, with room for design, automation, and a
              little experimentation.
            </p>
          </div>
          <div className="toolbox-layout">
            <div className="skill-board">
              <div className="board-header">
                <span>
                  <span className="status-dot" /> LUKO / TOOLBOX
                </span>
                <span>CLICK TO EXPLORE</span>
              </div>
              <div className="skill-keys" aria-label="Select a skill">
                {skills.map((skill) => (
                  <button
                    className={`skill-key ${selected === skill.id ? "is-selected" : ""}`}
                    style={
                      { "--key-color": skill.color } as React.CSSProperties
                    }
                    key={skill.id}
                    onClick={() => setSelected(skill.id)}
                    aria-pressed={selected === skill.id}
                    aria-label={skill.name}
                  >
                    <span>{skill.label}</span>
                    <small>{skill.name}</small>
                  </button>
                ))}
              </div>
              <div className="spacebar">
                <span>curiosity is the constant.</span>
                <Braces size={20} />
              </div>
            </div>
            <div className="skill-detail" aria-live="polite">
              <span className="eyebrow">{currentSkill.category}</span>
              <div
                key={currentSkill.id}
                className="detail-symbol"
                style={{ backgroundColor: currentSkill.color }}
              >
                {currentSkill.label}
              </div>
              <h3>{currentSkill.name}</h3>
              <p>{currentSkill.description}</p>
              <div className="skill-connection">
                <GitBranch size={16} />
                <p>{currentSkill.connection}</p>
              </div>
              <a className="text-link" href="#work">
                See the work
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="capabilities section-shell"
          aria-labelledby="capabilities-title"
        >
          <div className="capabilities-heading" data-reveal>
            <span className="eyebrow">FROM THE SURFACE TO THE SYSTEM</span>
            <h2 id="capabilities-title">
              Different layers.
              <br />
              <span>One connected experience.</span>
            </h2>
          </div>
          <div className="capability-grid">
            <article className="capability-card" data-reveal>
              <div className="capability-art interface-art" aria-hidden="true">
                <div className="glass-panel panel-back" />
                <div className="glass-panel panel-front">
                  <span className="panel-fasteners">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mini-dots">● ● ●</span>
                  <span className="mini-heading">
                    Hello,
                    <br />
                    <em>possibility.</em>
                  </span>
                  <div className="mini-layout">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <span className="art-plus">+</span>
              </div>
              <span className="eyebrow">01 / THE EXPERIENCE</span>
              <h3>Front-end & design</h3>
              <p>
                Semantic HTML, expressive interfaces, reusable components,
                responsive layouts, and the details that make software feel
                right.
              </p>
              <div className="capability-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>UI/UX</span>
              </div>
            </article>
            <article className="capability-card" data-reveal>
              <div className="capability-art systems-art" aria-hidden="true">
                <div className="server-layer layer-a">
                  <span className="server-chip" />
                  <Braces size={30} />
                  <span>API</span>
                </div>
                <div className="server-layer layer-b">
                  <span>LOGIC</span>
                  <i />
                  <i />
                  <i />
                </div>
                <div className="server-layer layer-c">
                  <span>DATA</span>
                  <i />
                  <i />
                  <i />
                </div>
                <span className="system-line" />
              </div>
              <span className="eyebrow">02 / THE ENGINE</span>
              <h3>Back-end & automation</h3>
              <p>
                Application logic, data, service integrations, and practical
                automation connecting everything behind the interface.
              </p>
              <div className="capability-tags">
                <span>Python</span>
                <span>Node.js</span>
                <span>Databases</span>
              </div>
            </article>
            <article className="capability-card" data-reveal>
              <div className="capability-art creative-art" aria-hidden="true">
                <div className="creative-cube">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <span className="creative-core" />
                <span className="creative-ring" />
                <span className="creative-dot" />
              </div>
              <span className="eyebrow">03 / THE NEXT IDEA</span>
              <h3>AI & creative technology</h3>
              <p>
                Exploring useful AI applications, 3D experiences, game systems,
                and new ways to connect people with technology.
              </p>
              <div className="capability-tags">
                <span>AI</span>
                <span>3D</span>
                <span>Game systems</span>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="about-section section-shell">
          <div className="about-layout">
            <div className="about-title">
              <span className="eyebrow">03 / THE PERSON BEHIND THE PIXELS</span>
              <h2>
                Developer.
                <br />
                Collaborator.
                <br />
                <em>Always curious.</em>
              </h2>
              <div className="about-sculpture-wrap">
                <Suspense fallback={<div className="sculpture-placeholder" />}>
                  <SculptureScene
                    variant="stack"
                    motion={motion}
                    className="about-sculpture"
                  />
                </Suspense>
                <span className="about-art-caption">
                  HUMAN FIRST. / ALWAYS BUILDING.
                </span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I’m Lukas Zemolochinas, a software developer and computer
                science student with a full-stack mindset and an eye for the
                experience.
              </p>
              <p>
                I enjoy connecting the visual side of software with the systems
                behind it. My interests span interfaces, automation, AI, and
                creative technology—including UI/UX and 3D design.
              </p>
              <p>
                Through Skyline Dynamics, I combined hands-on development with
                contracting and project coordination across healthcare, real
                estate, automotive, fintech, and other industries.
              </p>
              <div className="about-facts">
                <div>
                  <small>BASED IN</small>
                  <span>Ontario, Canada</span>
                </div>
                <div>
                  <small>STUDYING</small>
                  <span>Computer Science</span>
                </div>
                <div>
                  <small>CURRENT INTERESTS</small>
                  <span>Full stack / AI / creative tech</span>
                </div>
              </div>
              <a
                className="text-link"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                The full background on LinkedIn
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="industry-strip">
            <span className="eyebrow">A FEW INDUSTRIES ALONG THE WAY</span>
            <div>
              {[
                "Healthcare & dentistry",
                "Real estate",
                "Automotive",
                "Fintech",
                "Government / security",
              ].map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="testimonials section-shell"
          aria-labelledby="testimonials-title"
        >
          <div className="testimonial-heading">
            <span className="eyebrow">FROM PEOPLE I’VE WORKED WITH</span>
            <h2 id="testimonials-title">
              Good work. Good working relationships.
            </h2>
            <a
              className="text-link"
              href={links.recommendations}
              target="_blank"
              rel="noreferrer"
            >
              Read the recommendations
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name}>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {testimonial.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </span>
                  <span>
                    <a href={testimonial.url} target="_blank" rel="noreferrer">
                      {testimonial.name}
                      <ArrowUpRight size={12} />
                    </a>
                    <small>{testimonial.role}</small>
                  </span>
                  <Linkedin size={17} />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-sculpture-wrap" aria-hidden="true">
            <Suspense fallback={<div className="sculpture-placeholder" />}>
              <SculptureScene
                variant="orbit"
                motion={motion}
                className="contact-sculpture"
              />
            </Suspense>
          </div>
          <div className="contact-top">
            <span className="eyebrow">04 / KEEP THE CONVERSATION GOING</span>
            <span className="status-dot" />
          </div>
          <div className="contact-layout">
            <div>
              <h2>
                Next idea?
                <br />
                Start with <em>hello.</em>
                <span aria-hidden="true">↗</span>
              </h2>
              <p>
                A question, an opportunity, a collaboration—or just a hello.
                <br className="desktop-break" /> I’d be happy to hear from you.
              </p>
            </div>
            <div className="contact-links">
              <a className="email-link" href={`mailto:${links.email}`}>
                {links.email}
                <ArrowUpRight size={24} />
              </a>
              <button className="copy-email" onClick={copyEmail}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied to clipboard" : "Copy email address"}
              </button>
              <span className="sr-only" role="status">
                {copied
                  ? "Email address copied"
                  : copyFailed
                    ? `Copy unavailable. Email address: ${links.email}`
                    : ""}
              </span>
              {copyFailed && (
                <p className="copy-fallback">
                  You can select the address above or use the email link.
                </p>
              )}
              <div className="social-links">
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={17} />
                  LinkedIn
                  <ArrowUpRight size={15} />
                </a>
                <a href={links.github} target="_blank" rel="noreferrer">
                  <Github size={17} />
                  GitHub
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <span>© 2026 LUKAS ZEMOLOCHINAS / LUKODEVELOPS</span>
        <span>BUILT WITH CURIOSITY.</span>
        <a href="#home">
          BACK TO TOP
          <ArrowUpRight size={13} />
        </a>
      </footer>
      <CaseDialog id={caseId} onClose={() => setCaseId(null)} />
    </>
  );
}

function ArrowDownRight() {
  return <ArrowRight className="angled-arrow" size={19} />;
}

export default App;
