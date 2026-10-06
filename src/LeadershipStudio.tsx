import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  MoveUpRight,
  UsersRound,
} from "lucide-react";
import { useCareer } from "./CareerContext";
import { Monogram } from "./Monogram";

const workstreams = [
  {
    id: "client",
    name: "Client relationships",
    short: "Clients",
    position: [50, 14],
  },
  { id: "team", name: "People & delivery", short: "Team", position: [83, 47] },
  {
    id: "priorities",
    name: "Planning & priorities",
    short: "Priorities",
    position: [50, 82],
  },
  {
    id: "business",
    name: "Business decisions",
    short: "Business",
    position: [17, 47],
  },
] as const;

const organizations = [
  {
    id: "skyline",
    name: "Skyline Dynamics",
    company: "Skyline Dynamics Inc.",
    label: "FOUNDER / INTERNATIONAL COLLABORATION",
    color: "#C8EBCD",
    headline: "A business is more than its deliverables.",
    description:
      "US clients. An international team. Responsibility for the company as well as the work it delivered.",
    metrics: [
      { value: "15–20", label: "International team" },
      { value: "US$300k+", label: "Earned revenue" },
      { value: "US$500k+", label: "Signed contract value" },
    ],
    note: "Revenue and signed contract value are distinct measures. Skyline is a past business chapter.",
    work: [
      {
        title: "Keep the conversation connected to the work.",
        text: "Built client relationships across the US, from early-stage companies to established organizations. Joined invited conferences and discussions about quarterly and annual priorities and possible improvements.",
        tasks: [
          "Client conversations & requirements",
          "Scope, expectations & clear options",
          "Priorities translated into team work",
        ],
      },
      {
        title: "Bring different specialties into one direction.",
        text: "Led an international team of 15–20 people. Coordinated specialists across front-end, back-end, AI / ML, and DevOps, balancing the client's needs with the moving parts of delivery.",
        tasks: [
          "International team leadership",
          "Task delegation & coordination",
          "Business-to-technical translation",
        ],
      },
      {
        title: "See the next milestone and the wider picture.",
        text: "Defined project needs, scope, and quarterly and annual priorities with clients. Turned discussions about improvements into practical plans and coordinated delivery.",
        tasks: [
          "Quarterly & annual discussions",
          "Scope & project planning",
          "Progress, priorities & follow-through",
        ],
      },
      {
        title: "Own the company behind the client work.",
        text: "Handled company formation, legal administration, taxes, budgeting, forecasting, financial planning, and analysis. The company was incorporated in Dover, Delaware, and operated remotely from Cobourg, Ontario.",
        tasks: [
          "Budgeting & financial planning",
          "Forecasting & business analysis",
          "Formation, taxes & legal administration",
        ],
      },
    ],
  },
  {
    id: "upwork",
    name: "Upwork agency",
    company: "Upwork",
    label: "DEVELOPER / CONSULTANT / AGENCY LEAD",
    color: "#E7BCA3",
    headline: "Find the opportunity. Build the right team.",
    description:
      "Project prospecting, consulting, and hands-on development with a multidisciplinary specialist agency.",
    metrics: [
      { value: "8–10", label: "Specialist team" },
      { value: "~US$50k", label: "Agency revenue · estimate" },
      { value: "4", label: "Core technical specialties" },
    ],
    note: "Agency revenue is approximate. The four specialties are front-end, back-end, AI / ML, and DevOps.",
    work: [
      {
        title: "Find a project and understand the brief.",
        text: "Prospected for opportunities, discussed client requirements, and connected the scope of a project with the specialists needed to deliver it.",
        tasks: [
          "Project prospecting",
          "Client discussions & consulting",
          "Requirements & scope clarification",
        ],
      },
      {
        title: "Coordinate a multidisciplinary agency.",
        text: "Managed 8–10 specialists spanning developers, AI / ML, front-end, back-end, and DevOps. Combined team coordination with hands-on full-stack development.",
        tasks: [
          "8–10 specialist team",
          "Front-end, back-end, AI / ML & DevOps",
          "Coordination alongside implementation",
        ],
      },
      {
        title: "Make the requirements actionable.",
        text: "Clarified project needs, organized specialist work, and communicated progress with clients while delivering interfaces and service integrations.",
        tasks: [
          "Requirements into work",
          "Specialist-task coordination",
          "Client progress communication",
        ],
      },
      {
        title: "Connect delivery with a sustainable practice.",
        text: "Combined project prospecting, consulting, and development through an agency that generated approximately US$50,000 in revenue.",
        tasks: [
          "Project & client development",
          "Agency coordination",
          "Approximately US$50k agency revenue",
        ],
      },
    ],
  },
  {
    id: "bison",
    name: "Bison Onward",
    company: "Bison Onward Consulting Center LLC",
    label: "BUSINESS & TECHNICAL ADVISORY",
    color: "#BAC8E5",
    headline: "Make the discussion useful to everyone.",
    description:
      "A bridge between clients, business decisions, and the people responsible for implementation.",
    metrics: [
      { value: "Business", label: "And technical advice" },
      { value: "Cross-industry", label: "Client engagements" },
      { value: "Agile", label: "Delivery coordination" },
    ],
    note: "Investment advice here concerns business spending and technology investment.",
    work: [
      {
        title: "Listen, discuss, and capture the important details.",
        text: "Joined client meetings and conferences, extracted requirements and priorities, and summarized key information so teams could act on it.",
        tasks: [
          "Client meetings & conferences",
          "Requirements gathering",
          "Clear summaries & recommendations",
        ],
      },
      {
        title: "Share the context before delegating the task.",
        text: "Passed key information to development teams, delegated tasks, and contributed documentation alongside front-end and back-end implementation.",
        tasks: [
          "Task delegation",
          "Team context & documentation",
          "Hands-on software contributions",
        ],
      },
      {
        title: "Keep agile work aligned with the client.",
        text: "Helped coordinate sprints, priorities, and developer work. Brought business needs into the discussion and kept communication connected to delivery.",
        tasks: [
          "Agile sprint coordination",
          "Priorities & team alignment",
          "Business and technical translation",
        ],
      },
      {
        title: "Clarify the decision and the trade-offs.",
        text: "Provided business and technical recommendations for clients across industries, including advice on company spending and technology-investment choices.",
        tasks: [
          "Business & technical recommendations",
          "Company-spending decisions",
          "Technology-investment advice",
        ],
      },
    ],
  },
];

const stages = [
  {
    label: "Understand",
    text: "Start with the brief, the people, and the business context.",
  },
  {
    label: "Organize",
    text: "Make the scope and priorities clear; connect the right specialists.",
  },
  {
    label: "Coordinate",
    text: "Share context, delegate work, and keep the conversation moving.",
  },
  {
    label: "Follow through",
    text: "Bring delivery, documentation, and client communication together.",
  },
];

export function LeadershipStudio({ motion }: { motion: boolean }) {
  const [organization, setOrganization] = useState(0);
  const [selected, setSelected] = useState(1);
  const [stage, setStage] = useState(2);
  const scene = useRef<HTMLDivElement>(null);
  const { openExperience } = useCareer();
  const item = organizations[organization];
  const work = item.work[selected];
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !motion ||
      event.pointerType !== "mouse" ||
      (event.target instanceof Element && event.target.closest("button"))
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--network-x",
      `${((event.clientY - box.top) / box.height) * -8 + 4}deg`,
    );
    scene.current?.style.setProperty(
      "--network-y",
      `${((event.clientX - box.left) / box.width) * 12 - 6}deg`,
    );
  };
  const resetTilt = () => {
    scene.current?.style.setProperty("--network-x", "0deg");
    scene.current?.style.setProperty("--network-y", "0deg");
  };

  return (
    <section
      className="leadership-studio"
      id="leadership"
      aria-labelledby="leadership-title"
      style={{ "--studio-color": item.color } as CSSProperties}
    >
      <div className="section-shell">
        <div className="studio-heading">
          <div>
            <span className="eyebrow">THE HUMAN SIDE OF THE WORK</span>
            <h2 id="leadership-title">
              People. Priorities.
              <br />
              <em>Moving together.</em>
            </h2>
          </div>
          <p>
            A closer look at leadership and delivery. Choose a chapter, explore
            a workstream, and follow the connections.
          </p>
        </div>
        <div
          className="studio-chapters"
          aria-label="Choose a leadership chapter"
        >
          {organizations.map((org, index) => (
            <button
              key={org.id}
              aria-pressed={organization === index}
              aria-controls="studio-detail"
              onClick={() => setOrganization(index)}
            >
              <span>0{index + 1}</span>
              {org.name}
              <MoveUpRight size={15} />
            </button>
          ))}
        </div>
        <div
          className="studio-layout"
          data-organization={item.id}
          data-workstream={workstreams[selected].id}
          data-stage={stage}
        >
          <div className="studio-map-panel">
            <div className="studio-map-top">
              <span className="status-dot" />
              <span>THE COORDINATION STUDIO</span>
              <UsersRound size={17} />
            </div>
            <div
              className="network-viewport"
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <div className="delivery-network">
                <div className="network-art" ref={scene} aria-hidden="true">
                  <div className="network-surface">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <svg
                  className="network-connections"
                  viewBox="0 0 500 430"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {workstreams.map((stream, index) => {
                    const x = stream.position[0] * 5;
                    const y = stream.position[1] * 4.3;
                    return (
                      <g
                        className={selected === index ? "is-active" : ""}
                        key={stream.id}
                      >
                        <path
                          d={`M250 215 Q${250 + (x - 250) * 0.2 + 30} ${215 + (y - 215) * 0.8} ${x} ${y}`}
                        />
                        <circle cx={x} cy={y} r="25" />
                        <path
                          className="network-flow"
                          d={`M250 215 Q${250 + (x - 250) * 0.2 + 30} ${215 + (y - 215) * 0.8} ${x} ${y}`}
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="network-hub" aria-hidden="true">
                  <Monogram />
                </div>
                {workstreams.map((stream, index) => (
                  <button
                    className="network-node"
                    key={stream.id}
                    aria-label={`Explore ${stream.name}`}
                    aria-pressed={selected === index}
                    aria-controls="studio-responsibility"
                    style={{
                      left: `${stream.position[0]}%`,
                      top: `${stream.position[1]}%`,
                    }}
                    onClick={() => setSelected(index)}
                  >
                    <span>0{index + 1}</span>
                    <strong>{stream.short}</strong>
                    <i aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="network-readout">
              <span className="network-team">
                <UsersRound size={13} aria-hidden="true" />
                {item.id === "skyline"
                  ? "15–20 PEOPLE"
                  : item.id === "upwork"
                    ? "8–10 SPECIALISTS"
                    : "SHARED CONTEXT"}
              </span>
              <span className="network-selection">
                <i aria-hidden="true" />
                {workstreams[selected].name}
              </span>
              <span className="network-phase" aria-hidden="true">
                {String(stage + 1).padStart(2, "0")} / 04
              </span>
            </div>
            <div className="delivery-scrubber">
              <label htmlFor="delivery-stage">
                <span>FOLLOW THE DELIVERY FLOW</span>
                <strong>{stages[stage].label}</strong>
              </label>
              <input
                id="delivery-stage"
                type="range"
                min="0"
                max="3"
                step="1"
                value={stage}
                aria-valuetext={stages[stage].label}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setStage(next);
                  setSelected([0, 2, 1, 3][next]);
                }}
              />
              <div className="scrubber-labels" aria-hidden="true">
                <span>Brief</span>
                <span>Follow-through</span>
              </div>
              <p aria-live="polite">{stages[stage].text}</p>
            </div>
            <small className="network-note">
              EXPLORE THE CONNECTIONS / SELECT A NODE OR FOLLOW THE FLOW.
            </small>
          </div>
          <div className="studio-detail" id="studio-detail">
            <span className="eyebrow">{item.label}</span>
            <h3>{item.headline}</h3>
            <p className="studio-description">{item.description}</p>
            <div className="studio-metrics">
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div
              className="studio-workstreams"
              aria-label="Choose a workstream"
            >
              {workstreams.map((stream, index) => (
                <button
                  key={stream.id}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  {stream.short}
                </button>
              ))}
            </div>
            <div
              className="studio-responsibility"
              id="studio-responsibility"
              key={`${item.id}-${selected}`}
              aria-live="polite"
            >
              <span className="eyebrow">
                0{selected + 1} / {workstreams[selected].name}
              </span>
              <h4>{work.title}</h4>
              <p>{work.text}</p>
              <ul>
                {work.tasks.map((task) => (
                  <li key={task}>
                    <Check size={14} />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
            <p className="studio-metric-note">{item.note}</p>
            <button
              className="text-link"
              onClick={() => openExperience(item.company)}
            >
              Open this career chapter <ArrowDown size={16} />
            </button>
          </div>
        </div>
        <div className="studio-footnote">
          <span>Different teams. A connected way of working.</span>
          <ArrowRight size={17} />
          <span>EXPLORE THE WORK, THEN THE PEOPLE BEHIND IT.</span>
        </div>
      </div>
    </section>
  );
}
