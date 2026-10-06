export const links = {
  github: "https://github.com/LukoDevelops",
  linkedin: "https://www.linkedin.com/in/lukas-z-8b589523b/",
  recommendations:
    "https://www.linkedin.com/in/lukas-z-8b589523b/details/recommendations/",
  email: "lukodevelops@gmail.com",
  resume: "/documents/Lukas_Zemolochinas_Resume_2026.pdf",
  coverLetter: "/documents/Lukas_Zemolochinas_Cover_Letter_2026.pdf",
};

export type Skill = {
  id: string;
  name: string;
  label: string;
  color: string;
  category: string;
  description: string;
  connection: string;
};
export const technicalSkills: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    label: "JS",
    color: "#f0cf64",
    category: "Front-end",
    description:
      "Interfaces that respond, flows that make sense, and useful applications for the browser.",
    connection: "Explore AI Study Companion in selected work.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    label: "TS",
    color: "#78acd9",
    category: "Front-end",
    description:
      "A structured approach to building and maintaining interactive web applications.",
    connection: "Part of my front-end and full-stack toolbox.",
  },
  {
    id: "react",
    name: "React",
    label: "React",
    color: "#8bdbdf",
    category: "Front-end",
    description:
      "Component-driven interfaces, clear states, and reusable visual building blocks.",
    connection: "An interest in front-end development and thoughtful UI.",
  },
  {
    id: "html",
    name: "HTML",
    label: "HTML",
    color: "#e6a37d",
    category: "Front-end",
    description:
      "Semantic structure, accessible forms, and a solid foundation for responsive web experiences.",
    connection:
      "Works alongside CSS, JavaScript, and React in my front-end toolbox.",
  },
  {
    id: "css",
    name: "CSS",
    label: "CSS",
    color: "#a99fd6",
    category: "Front-end",
    description:
      "Responsive layouts, considered typography, and motion that supports the experience.",
    connection:
      "Connected to my interface work across healthcare and real estate.",
  },
  {
    id: "python",
    name: "Python",
    label: "Py",
    color: "#e8d4a0",
    category: "Back-end & automation",
    description:
      "Practical scripts, automation, and tools that make complicated work easier to handle.",
    connection: "Explore the ResourceCalculator repository.",
  },
  {
    id: "java",
    name: "Java",
    label: "Java",
    color: "#d6937d",
    category: "Back-end & automation",
    description:
      "Software fundamentals, application logic, and an interest in extensible systems.",
    connection: "Explore the Litematica repository.",
  },
  {
    id: "cpp",
    name: "C++",
    label: "C++",
    color: "#8babc2",
    category: "Languages",
    description:
      "A language in my development toolbox, alongside JavaScript, Java, and Python.",
    connection: "Part of my broader software-development background.",
  },
  {
    id: "node",
    name: "Node.js",
    label: "Node",
    color: "#b4ca7d",
    category: "Back-end & automation",
    description:
      "Connecting application interfaces to the services and logic that support them.",
    connection:
      "Related to my work joining front-end and back-end functionality.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    label: "SQL",
    color: "#7fa6c3",
    category: "Analytics",
    description:
      "Relational databases as part of a wider full-stack development toolbox.",
    connection: "Database experience includes PostgreSQL and NoSQL systems.",
  },
  {
    id: "nosql",
    name: "NoSQL",
    label: "Data",
    color: "#b4cda6",
    category: "Analytics",
    description:
      "Working with data beyond relational tables and exploring appropriate storage approaches.",
    connection: "Part of my database experience.",
  },
  {
    id: "aws",
    name: "AWS",
    label: "AWS",
    color: "#eda665",
    category: "Cloud",
    description:
      "Cloud experience alongside an interest in practical, maintainable application delivery.",
    connection: "My cloud toolbox includes AWS and Google Cloud.",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    label: "GCP",
    color: "#ccbcac",
    category: "Cloud",
    description:
      "Cloud services as part of an expanding full-stack development background.",
    connection: "My cloud toolbox includes Google Cloud and AWS.",
  },
  {
    id: "figma",
    name: "Figma",
    label: "Design",
    color: "#e89ca8",
    category: "Design & communication",
    description:
      "Bringing interface ideas into focus through layout, components, and visual exploration.",
    connection: "Related to my UI/UX and front-end background.",
  },
  {
    id: "ai",
    name: "AI & creative technology",
    label: "AI",
    color: "#c3edcc",
    category: "Exploration",
    description:
      "Exploring useful AI experiences, source-linked study tools, and creative applications of software.",
    connection: "Explore AI Study Companion, my CM3070 project.",
  },
];

export const professionalSkills: Skill[] = [
  {
    id: "client",
    name: "Client relationships",
    label: "People",
    color: "#c4f6c9",
    category: "Business & people",
    description:
      "Listen carefully, communicate clearly, and turn a client's needs into shared priorities and practical next steps.",
    connection:
      "Across consulting, business ownership, freelance work, and in-person retail.",
  },
  {
    id: "operations",
    name: "Business operations",
    label: "Ops",
    color: "#e4c48c",
    category: "Business & people",
    description:
      "Company formation, legal administration, taxes, office management, budgeting, and the details that help a business run.",
    connection:
      "Founder of Skyline Dynamics, with two years of office-management experience.",
  },
  {
    id: "delivery",
    name: "Project coordination",
    label: "Plan",
    color: "#aacde0",
    category: "Business & people",
    description:
      "Requirements, task delegation, stakeholder meetings, documentation, and agile delivery with priorities that people understand.",
    connection:
      "Consulting at Bison Onward and three years of agile / Scrum delivery experience.",
  },
  {
    id: "sales",
    name: "Sales & customer service",
    label: "Sales",
    color: "#efb396",
    category: "Business & people",
    description:
      "Customer-facing support, retail sales, and leading a three-person B2B / wholesale sales team.",
    connection:
      "Retail experience at Sport Chek, alongside broader client work and team leadership.",
  },
  {
    id: "marketing",
    name: "Marketing strategy",
    label: "Mktg",
    color: "#d3bbda",
    category: "Business & people",
    description:
      "Four years of marketing strategy and consulting experience, connecting business needs, communication, and practical recommendations.",
    connection: "Client engagements across a wide range of industries.",
  },
  {
    id: "leadership",
    name: "Team leadership",
    label: "Lead",
    color: "#b5ceb7",
    category: "Business & people",
    description:
      "Delegate work, share the context, remove blockers, and keep people aligned around the next useful step.",
    connection:
      "An international 15–20-person Skyline team, an 8–10-specialist Upwork agency, and B2B sales-team management.",
  },
  {
    id: "powerpoint",
    name: "PowerPoint & presentations",
    label: "Slides",
    color: "#e0a79a",
    category: "Design & communication",
    description:
      "Three years of advanced PowerPoint experience, bringing information into a clear and considered visual presentation.",
    connection:
      "Supported by design, client communication, and data-visualization experience.",
  },
  {
    id: "design3d",
    name: "3D design",
    label: "3D",
    color: "#b7b5ef",
    category: "Design & communication",
    description:
      "Individual models, environmental assets, environments, maps, architectural work, creatures, and concept art, guided by the visual goal and the client brief.",
    connection: "Top-rated Fiverr work with more than CAD $15,000 in sales.",
  },
  {
    id: "bi",
    name: "Business intelligence",
    label: "BI",
    color: "#e4d895",
    category: "Analytics",
    description:
      "Three years of professional BI work with Tableau and Power BI, supported by SQL-heavy analytics and Snowflake query optimization.",
    connection:
      "Four years of SQL work with joins, window functions, CTEs, and query optimization.",
  },
  {
    id: "dataengineering",
    name: "Data engineering",
    label: "ETL",
    color: "#a1cbd4",
    category: "Analytics",
    description:
      "ETL and data-engineering experience, including Kafka, Spark, and Snowflake.",
    connection:
      "A practical analytical layer within my wider software and consulting background.",
  },
];
professionalSkills.push(
  {
    id: "financeplanning",
    name: "Budgeting & financial planning",
    label: "Budget",
    color: "#d7d29b",
    category: "Business & people",
    description:
      "Budgeting, forecasting, financial planning, and analysis as part of running Skyline Dynamics.",
    connection:
      "Company ownership alongside legal administration, taxes, team leadership, and client delivery.",
  },
  {
    id: "businessdevelopment",
    name: "Business development",
    label: "Growth",
    color: "#e7bba3",
    category: "Business & people",
    description:
      "Project prospecting, client relationships, and discussions that connect an opportunity with practical delivery.",
    connection:
      "Upwork developer, consultant, and agency lead; approximately US$50,000 in agency revenue.",
  },
  {
    id: "strategicplanning",
    name: "Priorities & strategic planning",
    label: "Focus",
    color: "#bac8e5",
    category: "Business & people",
    description:
      "Quarterly and annual priority discussions, recommendations, scope definition, and planning improvements with clients.",
    connection:
      "Client conferences and discussions through Skyline Dynamics and business / technical advisory at Bison Onward.",
  },
);
export const skills: Skill[] = [...professionalSkills, ...technicalSkills];
export const keyboardSkills: Skill[] = [
  professionalSkills[0],
  professionalSkills[1],
  professionalSkills[2],
  professionalSkills[3],
  professionalSkills[4],
  professionalSkills[5],
  professionalSkills[6],
  professionalSkills[7],
  professionalSkills[8],
  technicalSkills[13],
  technicalSkills[0],
  technicalSkills[1],
  technicalSkills[3],
  technicalSkills[5],
  technicalSkills[14],
];

export type Project = {
  name: string;
  description: string;
  language: string;
  fork: boolean;
  url?: string;
  context?: string;
  sourceUnavailable?: boolean;
  category: "Applications" | "Tools" | "Game systems" | "Interfaces";
};
export const projects: Project[] = [
  {
    name: "AIStudyCompanion",
    description:
      "A source-linked revision workspace for the CM3070 final project.",
    language: "JavaScript",
    fork: false,
    category: "Applications",
  },
  {
    name: "WoW-Pro-Guides",
    description:
      "500+ merged contributions to a shared guide addon, including guide updates, Lua fixes, and interface compatibility.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "AllTheThings",
    description:
      "Collection tracking for World of Warcraft. My contributions include 19 merged changes and collectible-data corrections.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "Questie",
    description:
      "A Classic quest helper. Contributed a merged fix for map coordinate and ID validation.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "The Helios Frontier",
    description:
      "Substantial contributions to a collaborative game-development project for the United Valarian Confederation. Project details available on request.",
    language: "Game development",
    fork: false,
    category: "Game systems",
    url: "#contact",
    context: "Collaborative project · Source unavailable",
    sourceUnavailable: true,
  },
  {
    name: "litematica",
    description: "A client-side schematic mod for Minecraft.",
    language: "Java",
    fork: true,
    category: "Tools",
  },
  {
    name: "ResourceCalculator",
    description:
      "A game resource-planning tool. Contributed two merged fixes, including missing material and recipe mappings.",
    language: "Python",
    fork: true,
    category: "Tools",
  },
  {
    name: "Grail",
    description: "A database of World of Warcraft quest information.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "StdUi",
    description: "A standard UI library for World of Warcraft.",
    language: "Lua",
    fork: true,
    category: "Interfaces",
  },
  {
    name: "MountJournalEnhanced",
    description:
      "An extended mount-journal interface. Contributed a merged update to its favorites functionality.",
    language: "Lua",
    fork: true,
    category: "Interfaces",
  },
  {
    name: "Pawn",
    description: "An addon for comparing equipment upgrades.",
    language: "Lua",
    fork: true,
    category: "Tools",
  },
  {
    name: "Midnight-Routine",
    description:
      "A World of Warcraft planning tool. Four merged upstream contributions, including profession-knowledge data updates.",
    language: "Lua",
    fork: true,
    category: "Tools",
  },
  {
    name: "minarch",
    description:
      "The Minimal Archaeology addon. Contributed a merged update to its companion functionality.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  ...["MaxDps", "MaxDps-Hunter", "MaxDps-Priest", "MaxDps-Mage"].map(
    (name) => ({
      name,
      description:
        name === "MaxDps-Mage"
          ? "Five personal patch-branch commits updating Frost and Arcane logic and the addon manifest. Branch work, separate from merged upstream contributions."
          : name === "MaxDps-Hunter"
            ? "Hunter rotation support in the MaxDps family, including one merged upstream contribution."
            : "A repository in the MaxDps addon family.",
      language: "Lua",
      fork: true,
      category: "Game systems" as const,
    }),
  ),
  ...[
    "ConROC",
    "ConROC-TBC",
    "ConROC_Hunter",
    "ConROC_Shaman",
    "ConROC_Rogue",
    "ConRO_Hunter",
  ].map((name) => ({
    name,
    description: "A repository in the rotation optimizer addon family.",
    language: "Lua",
    fork: true,
    category: "Game systems" as const,
  })),
];

export const testimonials = [
  {
    quote: "Straightforward communications, steady delivery.",
    name: "Nicholas Evans",
    role: "Client · Sales Specialist",
    url: "https://www.linkedin.com/in/nicholas-evans-04456a121/",
  },
  {
    quote: "Clear, calm, and easy to work with.",
    name: "Timothy Williams",
    role: "Client · Chief Marketing Officer",
    url: "https://www.linkedin.com/in/timothy-williams-762051119/",
  },
  {
    quote: "He’s pragmatic, responsive, and excellent at removing roadblocks.",
    name: "William Maness",
    role: "Client · Administrative Manager",
    url: "https://www.linkedin.com/in/william-maness-72a051119/",
  },
];

export const caseStudies = {
  study: {
    number: "03",
    title: "AI Study Companion",
    category: "University of London · Final university project",
    intro:
      "My final university project for the University of London: a source-linked study workspace bringing notes, audio, images, summaries, questions, and flashcards together.",
    sections: [
      {
        title: "The idea",
        text: "Make it easier to turn notes, documents, and other study materials into a useful revision workspace, with source-linked answers and study resources.",
      },
      {
        title: "My work",
        text: "An original application developed for the CM3070 final project, with document import, local English transcription, OCR, source-linked revision and saved practice progress. I completed the project alongside all required coursework and credits; university results and the formal degree award are pending, expected in December 2026.",
      },
      {
        title: "Software evidence",
        text: "The public application contains 73 source files. All 255 automated tests across 54 test files passed when checked on October 6, 2026. Four study engines support different ways to explore study material.",
        url: "https://github.com/LukoDevelops/AIStudyCompanion/actions/runs/36282525481",
        linkLabel: "View the passing public test run",
      },
      {
        title: "Explore",
        text: "View the live application or inspect the source code to see the actual features, technical approach, and development history.",
      },
    ],
    url: "https://github.com/LukoDevelops/AIStudyCompanion",
    demo: "https://lukodevelops.github.io/AIStudyCompanion/",
  },
  open: {
    number: "02",
    title: "Open source, tangible contributions",
    category: "Guides · Data accuracy · Developer tools",
    intro:
      "Long-running contributions to existing open-source communities—from 500+ merged WoW-Pro-Guides changes to targeted fixes in data, interfaces, and resource tools.",
    sections: [
      {
        title: "WoW-Pro-Guides · 500+ merged changes",
        text: "526 authored pull requests had been merged into the upstream project when checked on October 6, 2026. Work includes campaign-guide updates and interface compatibility. These are contributions to a shared project, rather than original authorship of the entire addon.",
        url: "https://github.com/Ludovicus-Maior/WoW-Pro-Guides/pull/3417",
        linkLabel: "View an interface-compatibility contribution",
      },
      {
        title: "ALL THE THINGS · Data accuracy",
        text: "19 merged upstream contributions when checked on October 6, 2026, including corrections to collectible coordinates. This work connects game knowledge with careful data maintenance.",
        url: "https://github.com/ATTWoWAddon/AllTheThings/pull/2132",
        linkLabel: "View a coordinate-data correction",
      },
      {
        title: "ResourceCalculator & Questie · Focused fixes",
        text: "Contributed missing recipe and material mappings to ResourceCalculator and map coordinate / ID validation to Questie. Small, specific improvements can make a shared tool more dependable.",
        url: "https://github.com/AsherGlick/ResourceCalculator/pull/60",
        linkLabel: "View a resource-calculator contribution",
      },
      {
        title: "Midnight Routine & related tools",
        text: "Four merged changes in Midnight Routine include profession-knowledge data maintenance. Further merged contributions appear in MountJournalEnhanced, minarch, MaxDps-Hunter and ConROC-TBC. The complete public directory links each upstream review history, including proposed changes that were not merged.",
        url: "https://github.com/LoyalFTW/Midnight-Routine/pull/78",
        linkLabel: "View a profession-data contribution",
      },
      {
        title: "Repository context",
        text: "These repositories are forks of existing open-source projects. Original authorship belongs to their upstream maintainers; the links lead to my copies and their visible history.",
      },
      {
        title: "Explore",
        text: "The project library includes each repository, including related MaxDps and ConROC modules. Open GitHub to inspect individual changes and contribution history.",
      },
    ],
    url: "https://github.com/LukoDevelops/WoW-Pro-Guides",
  },
  skyline: {
    number: "01",
    title: "Skyline Dynamics",
    category: "Past business · US clients · Cross-industry delivery",
    intro:
      "Founded a business incorporated in Dover, Delaware, and operated remotely from Cobourg, Ontario with an international team of 15–20 people. Served US clients from startups at Series A, B, and C stages to established companies across a wide range of industries.",
    sections: [
      {
        title: "Business impact",
        text: "Generated more than US$300,000 in earned revenue and secured more than US$500,000 in signed contract value. Revenue and signed contract value are separate measures, reflecting both delivered business and the wider contracted work.",
      },
      {
        title: "Healthcare & dentistry",
        text: "Developed front-end components and back-end functionality across healthcare and dentistry engagements, including work around EHR, hospitals, and healthcare systems.",
      },
      {
        title: "Real estate",
        text: "Contributed to front-end development and integration work connecting visual interfaces with back-end functionality.",
      },
      {
        title: "Automotive",
        text: "Delivered back-end functionality for payment-related services alongside vehicle-showcase interfaces. These were among a wider range of automotive client tasks.",
      },
      {
        title: "E-commerce, fashion, fintech & beyond",
        text: "Built full-stack e-commerce systems with AI / ML work. The broader US client background spanned fashion and retail; fintech, banking, insurance, and investment businesses; entertainment and media; food and beverage; hospitality and tourism; education; software and IT; heavy industry, manufacturing, agriculture, and sustainable businesses; construction, transport, logistics, and government-related / security work. Responsibilities varied by engagement.",
      },
      {
        title: "Business ownership & delivery",
        text: "Led an international 15–20-person team and handled formation, legal administration, taxes, budgeting, forecasting, financial planning, and analysis. Joined invited client conferences and discussions about quarterly and annual priorities and business improvements, alongside scope definition and coordinated delivery. Skyline Dynamics is a past chapter, not a currently active role.",
      },
    ],
    url: links.recommendations,
  },
};
export type CaseId = keyof typeof caseStudies;
