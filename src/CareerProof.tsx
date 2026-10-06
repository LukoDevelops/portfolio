import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useCareer } from "./CareerContext";

const figures = [
  {
    value: "6",
    unit: "years",
    label: "Overall experience",
    context: "Business, people, design & technology",
    company: "",
  },
  {
    value: "$300k+",
    unit: "USD",
    label: "Earned revenue",
    context: "Skyline Dynamics",
    company: "Skyline Dynamics Inc.",
  },
  {
    value: "$500k+",
    unit: "USD",
    label: "Signed contract value",
    context: "Skyline Dynamics",
    company: "Skyline Dynamics Inc.",
  },
  {
    value: "15–20",
    unit: "people",
    label: "International team",
    context: "Skyline Dynamics · Leadership",
    company: "Skyline Dynamics Inc.",
  },
  {
    value: "8–10",
    unit: "specialists",
    label: "Multidisciplinary agency",
    context: "Upwork · Team leadership",
    company: "Upwork",
  },
  {
    value: "~$50k",
    unit: "USD · estimate",
    label: "Agency revenue",
    context: "Upwork",
    company: "Upwork",
  },
  {
    value: "1,112",
    unit: "2019–2026",
    label: "GitHub contributions",
    context: "Year-summed visible profile calendar",
    url: "https://github.com/LukoDevelops?tab=overview",
    action: "View the contribution calendar",
  },
  {
    value: "558",
    unit: "merged PRs",
    label: "Personal pull requests",
    context: "Across 11 public repositories",
    url: "https://github.com/search?q=is%3Apr+is%3Amerged+author%3ALukoDevelops+is%3Apublic&type=pullrequests",
    action: "Review my merged pull requests",
  },
];

export function CareerProof() {
  const { openExperience } = useCareer();
  return (
    <section className="career-proof" aria-labelledby="career-proof-title">
      <div className="proof-heading">
        <div>
          <span className="eyebrow">
            PEOPLE. RESPONSIBILITY. CONTRIBUTIONS.
          </span>
          <h3 id="career-proof-title">
            Real work. <em>Measurable scale.</em>
          </h3>
        </div>
        <p>
          A few figures behind the experience, from business ownership and
          specialist teams to years of GitHub contributions.
        </p>
      </div>
      <ul className="proof-grid">
        {figures.map((figure, index) => (
          <li className="proof-card" key={figure.label} data-proof={index + 1}>
            <div className="proof-card-top">
              <span>0{index + 1}</span>
              <span>{figure.unit}</span>
            </div>
            <strong className="proof-value">{figure.value}</strong>
            <h4>{figure.label}</h4>
            <p>{figure.context}</p>
            {"url" in figure ? (
              <a
                className="proof-link"
                href={figure.url}
                target="_blank"
                rel="noreferrer"
                aria-label={figure.action}
              >
                Inspect the evidence
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : figure.company ? (
              <button
                className="proof-link"
                onClick={() => openExperience(figure.company)}
                aria-label={`Explore ${figure.label} in my ${figure.context} experience`}
              >
                Explore the chapter
                <ArrowDown size={14} aria-hidden="true" />
              </button>
            ) : (
              <a className="proof-link" href="#experience">
                Follow the career journey
                <ArrowDown size={14} aria-hidden="true" />
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="proof-sources">
        <span>CAREER HISTORY / PUBLIC GITHUB SNAPSHOT</span>
        <p>
          Revenue and signed contract value are separate measures. Upwork agency
          revenue is approximate. GitHub calendar and merged-PR figures checked
          October 6, 2026.
        </p>
      </div>
    </section>
  );
}
