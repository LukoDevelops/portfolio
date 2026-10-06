import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { experience, industries, perspectives, process } from "./background";
import { links } from "./content";

export function PerspectiveSwitch() {
  const [selected, setSelected] = useState(0);
  const item = perspectives[selected];
  return (
    <div
      className="perspective-console"
      style={{ "--perspective-color": item.color } as React.CSSProperties}
    >
      <div className="perspective-label">
        <span className="status-dot" /> ONE BACKGROUND. DIFFERENT POSSIBILITIES.
      </div>
      <div
        className="perspective-tabs"
        aria-label="Explore areas of experience"
      >
        {perspectives.map((perspective, index) => (
          <button
            key={perspective.id}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {perspective.short}
          </button>
        ))}
      </div>
      <div className="perspective-body" key={item.id} aria-live="polite">
        <div className="perspective-copy">
          <span className="eyebrow">{item.name}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <div className="perspective-tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a
          href="#experience"
          aria-label={`Explore ${item.name} in my experience`}
          className="perspective-next"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </div>
  );
}

export function IndustryExplorer() {
  const [selected, setSelected] = useState(0);
  const industry = industries[selected];
  return (
    <section
      className="industry-explorer"
      id="industries"
      aria-labelledby="industry-heading"
    >
      <div className="section-shell industry-shell">
        <div className="industry-heading">
          <span className="eyebrow">
            A BROADER BACKGROUND / A PRACTICAL MINDSET
          </span>
          <h2 id="industry-heading">
            Different worlds.
            <br />
            <em>Common ground.</em>
          </h2>
          <p>
            People, priorities, and a useful result. My experience crosses
            industries—and connects the work between them.
          </p>
        </div>
        <div className="industry-explorer-layout">
          <div
            className="industry-orbit"
            style={{ "--sector-color": industry.color } as React.CSSProperties}
          >
            <div className="atlas-grid" aria-hidden="true" />
            <div className="atlas-ring atlas-ring-a" aria-hidden="true" />
            <div className="atlas-ring atlas-ring-b" aria-hidden="true" />
            <div className="atlas-ring atlas-ring-c" aria-hidden="true" />
            <span className="atlas-caption atlas-caption-top">
              THE EXPERIENCE ATLAS
            </span>
            <div className="atlas-core" aria-hidden="true">
              <span>L</span>
              <small>CONNECTED IDEAS</small>
              <i />
              <i />
              <i />
            </div>
            <div
              className="sector-navigation"
              aria-label="Choose an industry to explore"
            >
              {industries.map((sector, index) => (
                <button
                  key={sector.id}
                  onClick={() => setSelected(index)}
                  aria-pressed={selected === index}
                  style={
                    {
                      "--sector-index": index,
                      "--sector-color": sector.color,
                    } as React.CSSProperties
                  }
                >
                  <span className="sector-icon" aria-hidden="true">
                    {sector.icon}
                  </span>
                  <span className="sector-name">{sector.title}</span>
                  <span className="sector-number">0{index + 1}</span>
                </button>
              ))}
            </div>
            <span className="atlas-caption atlas-caption-bottom">
              SELECT A WORLD TO EXPLORE <ArrowRight size={14} />
            </span>
          </div>
          <div
            className="industry-detail"
            style={{ "--sector-color": industry.color } as React.CSSProperties}
            aria-live="polite"
          >
            <div className="industry-detail-top">
              <span className="eyebrow">
                0{selected + 1} / {industry.subtitle}
              </span>
              <span className="industry-mini-icon" aria-hidden="true">
                {industry.icon}
              </span>
            </div>
            <div key={industry.id} className="industry-detail-content">
              <h3>{industry.focus}</h3>
              <p>{industry.text}</p>
              <ul>
                {industry.activities.map((activity) => (
                  <li key={activity}>
                    <Check size={15} />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="industry-context">
              <span className="status-dot" />
              <p>
                Experience shown here reflects past work. I’m open to bringing
                the same curiosity and transferable skills to a new industry.
              </p>
            </div>
            <a className="text-link" href="#experience">
              Follow the career journey <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <div className="evidence-strip">
          <div>
            <strong>
              6<span> years</span>
            </strong>
            <span>Overall experience</span>
          </div>
          <div>
            <strong>
              $15k<span>+ CAD</span>
            </strong>
            <span>Freelance 3D sales</span>
          </div>
          <div>
            <strong>
              500<span>+</span>
            </strong>
            <span>Merged WoW-Pro contributions</span>
            <a
              href="https://github.com/Ludovicus-Maior/WoW-Pro-Guides/pulls?q=is%3Apr+is%3Amerged+author%3ALukoDevelops"
              target="_blank"
              rel="noreferrer"
              aria-label="View my merged WoW-Pro contributions"
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <strong>
              3<span> people</span>
            </strong>
            <span>B2B sales team led</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceJourney() {
  const [expanded, setExpanded] = useState<string | null>(
    experience[0].company,
  );
  return (
    <section
      className="experience-journey section-shell"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading">
        <div>
          <span className="eyebrow">THE CAREER JOURNEY / ALL IN ONE PLACE</span>
          <h2 id="experience-title">
            The work behind
            <br />
            <em>the perspective.</em>
          </h2>
        </div>
        <p>
          Business ownership. Client delivery. Creative work. Customer service.
          A varied background, connected by taking responsibility and following
          through.
        </p>
      </div>
      <div className="experience-layout">
        <aside className="journey-aside">
          <div className="journey-passport">
            <span className="eyebrow">EXPERIENCE PASSPORT</span>
            <div className="passport-mark" aria-hidden="true">
              L
            </div>
            <h3>
              Lukas
              <br />
              Zemolochinas
            </h3>
            <div>
              <MapPin size={15} />
              <span>
                Cobourg, Ontario
                <br />
                Canada
              </span>
            </div>
            <div>
              <BriefcaseBusiness size={15} />
              <span>
                Open to opportunities
                <br />
                across industries
              </span>
            </div>
            <a
              href={links.resume}
              className="text-link"
              download="Lukas_Zemolochinas_Resume_2026.pdf"
            >
              Download the full resume <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
        <div className="journey-list">
          {experience.map((job, index) => (
            <article
              className={`journey-entry ${expanded === job.company ? "is-open" : ""}`}
              key={job.company}
            >
              <button
                className="journey-toggle"
                onClick={() =>
                  setExpanded(expanded === job.company ? null : job.company)
                }
                aria-expanded={expanded === job.company}
                aria-controls={`job-detail-${index}`}
              >
                <span className="journey-number">0{index + 1}</span>
                <span className="journey-role">
                  <span className="eyebrow">{job.period}</span>
                  <strong>{job.role}</strong>
                  <span>{job.company}</span>
                </span>
                <span className="journey-plus" aria-hidden="true">
                  {expanded === job.company ? "−" : "+"}
                </span>
              </button>
              <div className="journey-summary">
                <p>{job.description}</p>
                <div className="journey-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div
                className="journey-expanded"
                id={`job-detail-${index}`}
                hidden={expanded !== job.company}
              >
                <span className="journey-location">
                  <MapPin size={13} />
                  {job.location}
                </span>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {"note" in job && <small>{job.note}</small>}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="education-panel">
        <div className="education-title">
          <CalendarDays size={23} />
          <span className="eyebrow">EDUCATION / THE NEXT MILESTONE</span>
        </div>
        <div>
          <h3>University of London</h3>
          <p>
            BSc Computer Science · All coursework, credits, and final project
            completed.
          </p>
          <span className="education-status">
            <span className="status-dot" /> Results & formal degree award
            pending · Expected December 2026
          </span>
        </div>
        <div className="education-transfer">
          <h4>University of Toronto Mississauga</h4>
          <p>Computer Science & Economics · Sep 2022 — Aug 2023</p>
          <small>Transfer coursework · No degree awarded · GPA 3.62</small>
        </div>
      </div>
    </section>
  );
}

export function WorkingMethod() {
  const [selected, setSelected] = useState(0);
  const step = process[selected];
  return (
    <section
      className="working-method section-shell"
      aria-labelledby="method-title"
    >
      <div className="method-heading">
        <span className="eyebrow">HOW I APPROACH THE WORK</span>
        <h2 id="method-title">
          Make it clear.
          <br />
          <em>Then make it happen.</em>
        </h2>
        <p>
          A way of working that travels well across teams, roles, and
          industries.
        </p>
      </div>
      <div className="method-console">
        <div className="method-track" aria-label="Explore my working approach">
          {process.map((item, index) => (
            <button
              onClick={() => setSelected(index)}
              key={item.title}
              aria-pressed={selected === index}
            >
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div className="method-screen" key={step.title} aria-live="polite">
          <span className="eyebrow">{step.label}</span>
          <h3>{step.title}.</h3>
          <p>{step.text}</p>
          <div>
            {step.outputs.map((output) => (
              <span key={output}>
                <Check size={14} />
                {output}
              </span>
            ))}
          </div>
        </div>
        <div className="method-footer">
          <span className="status-dot" />
          <span>COMMUNICATION IS PART OF THE DELIVERABLE.</span>
          <ChevronDown size={15} />
        </div>
      </div>
    </section>
  );
}

const credentials = [
  {
    issuer: "Google",
    title: "IT Support Specialization",
    date: "June 2024",
    url: "https://coursera.org/verify/professional-cert/8MNX7FNUE64U",
  },
  {
    issuer: "IBM",
    title: "Data Science Specialization",
    date: "June 2024",
    url: "https://coursera.org/verify/professional-cert/3CSSWNSWT7T4",
  },
  {
    issuer: "IBM",
    title: "AI Engineering Specialization",
    date: "May 2024",
    url: "https://coursera.org/verify/professional-cert/4K4GZSYHSTXE",
  },
  {
    issuer: "IBM",
    title: "AI Developer Specialization",
    date: "February 2024",
    url: "https://www.coursera.org/account/accomplishments/specialization/P8WXCZL3U5CX",
  },
  {
    issuer: "HarvardX",
    title: "CS50: Introduction to Computer Science",
    date: "September 2021",
  },
  {
    issuer: "MITx",
    title: "Aerospace Engineering: Astronautics & Human Spaceflight",
    date: "October 2021",
  },
  {
    issuer: "Queen's University",
    title: "Theories of our World: Mathematics & Physics",
    date: "Enrichment studies · August 2021",
  },
  {
    issuer: "PADI",
    title: "Advanced Open Water Scuba Diver",
    date: "October 2023",
  },
  { issuer: "PADI", title: "Open Water Diver", date: "August 2021" },
];
export function ProfessionalLearning() {
  return (
    <section
      className="learning-section section-shell"
      aria-labelledby="learning-title"
    >
      <div className="learning-heading">
        <div>
          <span className="eyebrow">
            PROFESSIONAL LEARNING / ONGOING CURIOSITY
          </span>
          <h2 id="learning-title">
            Keep learning.
            <br />
            <em>Widen the perspective.</em>
          </h2>
        </div>
        <p>
          Professional certificates, university enrichment, and practical
          interests that reach beyond one discipline.
        </p>
      </div>
      <div className="learning-grid">
        {credentials.map((item) => (
          <article className="learning-card" key={item.issuer + item.title}>
            <span className="eyebrow">{item.issuer}</span>
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            {"url" in item && (
              <a href={item.url} target="_blank" rel="noreferrer">
                View credential <ArrowUpRight size={13} />
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="learning-note">
        First Aid / CPR-C / AED was issued in August 2021 and expired in August
        2024; it is a past training record, not a current credential.
      </p>
    </section>
  );
}
