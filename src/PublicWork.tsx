import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  ChevronDown,
  GitBranch,
  Search,
} from "lucide-react";
import directory from "./projectDirectory.json";

const evidence = [
  {
    id: "study",
    title: "AI Study Companion",
    label: "ORIGINAL / FINAL UNIVERSITY PROJECT",
    value: "255",
    metric: "passing automated tests",
    summary: "Different sources. One connected study workspace.",
    detail:
      "An original University of London final project. Documents, audio and images become source-linked summaries, questions and flashcards—with four study engines, saved study packs and practice progress.",
    points: ["73 application source files", "54 test files", "4 study engines"],
    primary:
      "https://github.com/LukoDevelops/AIStudyCompanion/actions/runs/36282525481",
    primaryLabel: "View the passing test run",
    secondary: "https://lukodevelops.github.io/AIStudyCompanion/",
    secondaryLabel: "Try the study workspace",
    note: "Public source and test results checked October 6, 2026.",
  },
  {
    id: "wow",
    title: "WoW-Pro Guides",
    label: "COMMUNITY PROJECT / MY CONTRIBUTIONS",
    value: "526",
    metric: "of my pull requests merged",
    summary: "Long-running work on a shared guide ecosystem.",
    detail:
      "Campaign guides, interface compatibility, Lua fixes and community-reported issues. Contributions move through the upstream review process, keeping the work visible and accountable.",
    points: [
      "143 upstream stars",
      "16 upstream watchers",
      "48 GitHub-account contributors",
    ],
    primary:
      "https://github.com/Ludovicus-Maior/WoW-Pro-Guides/pulls?q=is%3Apr+is%3Amerged+author%3ALukoDevelops",
    primaryLabel: "Review my merged contributions",
    secondary: "https://github.com/Ludovicus-Maior/WoW-Pro-Guides/pull/3130",
    secondaryLabel: "See a guide-loading bug fix",
    note: "Community figures belong to the upstream repository, separate from my contribution count. Snapshot: October 6, 2026.",
  },
  {
    id: "att",
    title: "ALL THE THINGS",
    label: "COMMUNITY PROJECT / DATA MAINTENANCE",
    value: "19",
    metric: "of my pull requests merged",
    summary: "Careful data work makes a shared tool more useful.",
    detail:
      "Contributions to a World of Warcraft collection tracker, including collectible coordinates and content-data updates. The review history shows the specific changes within a much larger collaborative project.",
    points: [
      "184 upstream stars",
      "18 upstream watchers",
      "125 GitHub-account contributors",
    ],
    primary:
      "https://github.com/ATTWoWAddon/AllTheThings/pulls?q=is%3Apr+is%3Amerged+author%3ALukoDevelops",
    primaryLabel: "Review my merged contributions",
    secondary: "https://github.com/ATTWoWAddon/AllTheThings/pull/2132",
    secondaryLabel: "See a coordinate correction",
    note: "19 personal merged pull requests. Community figures belong to the upstream repository. Snapshot: October 6, 2026.",
  },
  {
    id: "questie",
    title: "Questie",
    label: "COMMUNITY PROJECT / DEFENSIVE VALIDATION",
    value: "1",
    metric: "of my pull requests merged",
    summary: "A targeted correction in a widely used quest helper.",
    detail:
      "An accepted contribution tightened checks for map coordinates and invalid UI-map IDs in the Mists of Pandaria Classic beta. A focused defensive fix within a much larger community-maintained addon.",
    points: [
      "1,101 upstream stars",
      "39 upstream watchers",
      "150 GitHub-account contributors",
    ],
    primary:
      "https://github.com/Questie/Questie/pulls?q=is%3Apr+is%3Amerged+author%3ALukoDevelops",
    primaryLabel: "Review my merged contributions",
    secondary: "https://github.com/Questie/Questie/pull/7002",
    secondaryLabel: "See the map-validation fix",
    note: "One personal merged pull request. Community figures belong to the upstream repository. Snapshot: October 6, 2026.",
  },
  {
    id: "resources",
    title: "Resource Calculator",
    label: "COMMUNITY PROJECT / RESOURCE PLANNING",
    value: "2",
    metric: "of my pull requests merged",
    summary: "Small corrections. Clearer resource planning.",
    detail:
      "Contributed missing recipe and material mappings to an existing resource calculator. These targeted fixes connect careful data checking with a practical planning workflow.",
    points: [
      "80 upstream stars",
      "47 upstream forks",
      "20 GitHub-account contributors",
    ],
    primary:
      "https://github.com/AsherGlick/ResourceCalculator/pulls?q=is%3Apr+is%3Amerged+author%3ALukoDevelops",
    primaryLabel: "Review my merged contributions",
    secondary: "https://github.com/AsherGlick/ResourceCalculator/pull/60",
    secondaryLabel: "See a resource-mapping update",
    note: "Two personal merged pull requests. Stars, forks and contributor counts belong to the upstream repository. Snapshot: October 6, 2026.",
  },
];

export function PublicWork() {
  const [selected, setSelected] = useState(0);
  const item = evidence[selected];
  return (
    <div className="public-work" aria-labelledby="public-work-title">
      <div className="public-work-heading">
        <div>
          <span className="eyebrow">THE WORK / THE EVIDENCE</span>
          <h3 id="public-work-title">
            Good work leaves <em>a trail.</em>
          </h3>
        </div>
        <p>
          Explore an original application and the changes I’ve contributed to
          shared projects. Every story has something you can inspect.
        </p>
      </div>
      <div className="evidence-layout">
        <div
          className="evidence-picker"
          role="group"
          aria-label="Choose a public-work story"
        >
          {evidence.map((project, index) => (
            <button
              key={project.id}
              aria-pressed={selected === index}
              aria-controls="project-evidence"
              onClick={() => setSelected(index)}
            >
              <span>0{index + 1}</span>
              <strong>{project.title}</strong>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="project-evidence"
          id="project-evidence"
          data-project={item.id}
        >
          <div className="evidence-count">
            <CheckCheck size={18} aria-hidden="true" />
            <strong>{item.value}</strong>
            <span>{item.metric}</span>
          </div>
          <div className="evidence-story">
            <span className="eyebrow">{item.label}</span>
            <h4>{item.summary}</h4>
            <p>{item.detail}</p>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="evidence-actions">
              <a
                className="text-link"
                href={item.primary}
                target="_blank"
                rel="noreferrer"
              >
                {item.primaryLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href={item.secondary}
                target="_blank"
                rel="noreferrer"
              >
                {item.secondaryLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <small>{item.note}</small>
          </div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-atomic="true">
        {item.title}: {item.value} {item.metric}.
      </p>
    </div>
  );
}

export function RepositoryDirectory() {
  const [scope, setScope] = useState<"owned" | "community">("owned");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const filter = query.trim().toLowerCase();
  const collection = scope === "owned" ? directory.owned : directory.community;
  const rows = collection.filter((row) =>
    row.name.toLowerCase().includes(filter),
  );
  return (
    <details className="repository-directory">
      <summary>
        <GitBranch size={18} aria-hidden="true" />
        <span>
          <strong>The complete public directory</strong>
          <small>
            {directory.owned.length} account repositories ·{" "}
            {directory.community.length} community contribution repositories
          </small>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className="directory-content">
        <p>
          The curated cards highlight substantial projects. This directory also
          includes setup repositories and the upstream projects where I
          submitted pull requests. Counts are a snapshot from{" "}
          {directory.verified}.
        </p>
        <div className="directory-controls">
          <div role="group" aria-label="Choose a repository collection">
            <button
              aria-pressed={scope === "owned"}
              aria-controls="directory-results"
              onClick={() => setScope("owned")}
            >
              My account <span>{directory.owned.length}</span>
            </button>
            <button
              aria-pressed={scope === "community"}
              aria-controls="directory-results"
              onClick={() => setScope("community")}
            >
              Community contributions <span>{directory.community.length}</span>
            </button>
          </div>
          <label>
            <Search size={14} aria-hidden="true" />
            <input
              ref={searchRef}
              aria-label="Search the complete repository directory"
              type="search"
              placeholder="Find a repository…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <ul className="directory-results" id="directory-results">
          {rows.map((row) => (
            <li key={row.url}>
              <a href={row.url} target="_blank" rel="noreferrer">
                <GitBranch size={14} aria-hidden="true" />
                <span>{row.name}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {"kind" in row ? (
                <small>{row.kind}</small>
              ) : (
                <div>
                  <small>
                    {row.authored} submitted · {row.merged} merged PR
                    {row.merged === 1 ? "" : "s"}
                  </small>
                  <a
                    className="directory-evidence"
                    href={row.evidence}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Review my changes
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
        {rows.length === 0 && (
          <div className="directory-empty">
            <p>No repositories match “{query.trim()}” in this collection.</p>
            <button
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
            >
              Clear search <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="directory-result-count" role="status">
          {rows.length} of {collection.length}{" "}
          {scope === "owned" ? "account" : "community"} repositories shown.
        </p>
      </div>
    </details>
  );
}
