export const links = {
  github: "https://github.com/LukoDevelops",
  linkedin: "https://www.linkedin.com/in/lukas-z-8b589523b/",
  recommendations:
    "https://www.linkedin.com/in/lukas-z-8b589523b/details/recommendations/",
  email: "lukodevelops@gmail.com",
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
export const skills: Skill[] = [
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
    category: "Data",
    description:
      "Relational databases as part of a wider full-stack development toolbox.",
    connection: "Database experience includes PostgreSQL and NoSQL systems.",
  },
  {
    id: "nosql",
    name: "NoSQL",
    label: "Data",
    color: "#b4cda6",
    category: "Data",
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
    category: "Creative technology",
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

export type Project = {
  name: string;
  description: string;
  language: string;
  fork: boolean;
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
    description: "A World of Warcraft addon bringing guides into the game.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "AllTheThings",
    description:
      "Collection tracking and account completion for World of Warcraft.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  {
    name: "Questie",
    description: "A quest helper for World of Warcraft Classic.",
    language: "Lua",
    fork: true,
    category: "Game systems",
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
    description: "A resource calculator for video games.",
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
    description: "An extended interface for the in-game mount journal.",
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
    description: "A World of Warcraft to-do list.",
    language: "Lua",
    fork: true,
    category: "Tools",
  },
  {
    name: "minarch",
    description: "The Minimal Archaeology addon for World of Warcraft.",
    language: "Lua",
    fork: true,
    category: "Game systems",
  },
  ...["MaxDps", "MaxDps-Hunter", "MaxDps-Priest", "MaxDps-Mage"].map(
    (name) => ({
      name,
      description: "A repository in the MaxDps addon family.",
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
    number: "01",
    title: "AI Study Companion",
    category: "Original application · CM3070",
    intro:
      "A source-linked revision workspace that brings study materials and revision tools together.",
    sections: [
      {
        title: "The idea",
        text: "Make it easier to turn notes, documents, and other study materials into a useful revision workspace, with source-linked answers and study resources.",
      },
      {
        title: "My work",
        text: "An original project in my GitHub account, developed for the CM3070 final project. The repository and live application provide the current implementation.",
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
    title: "Open-source ecosystems",
    category: "Game systems · Public repositories",
    intro:
      "A collection of repositories around guides, interfaces, data, and tools for games.",
    sections: [
      {
        title: "The ecosystem",
        text: "WoW-Pro-Guides, Questie, AllTheThings, Grail, and related addon families form a broad part of my public repository collection.",
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
    number: "03",
    title: "Skyline Dynamics",
    category: "Past client work · Software & delivery",
    intro:
      "Hands-on software work and contracting across different businesses and industries.",
    sections: [
      {
        title: "Healthcare & dentistry",
        text: "Developed and refined front-end interfaces and UI components, with integration between front-end experiences and supporting back-end functionality.",
      },
      {
        title: "Real estate",
        text: "Contributed to front-end development and integration work connecting visual interfaces with back-end functionality.",
      },
      {
        title: "Automotive",
        text: "Contributed to back-end work involving payment services and payment-related data.",
      },
      {
        title: "Project delivery",
        text: "Client recommendations describe clear communication, contractor coordination, scoping, onboarding, and keeping stakeholders aligned. Skyline Dynamics is a past chapter of my work.",
      },
    ],
    url: links.recommendations,
  },
};
export type CaseId = keyof typeof caseStudies;
