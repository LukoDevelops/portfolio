export const perspectives = [
  {
    id: "business",
    name: "Business & operations",
    short: "Organize",
    label: "CLARITY IN THE COMPLEXITY",
    title: "From a conversation to a clear plan.",
    description:
      "Company operations, client relationships, requirements, team coordination, and the everyday details that keep work moving.",
    tags: ["Client service", "Office management", "Project delivery"],
    color: "#c4f6c9",
  },
  {
    id: "people",
    name: "Sales & client service",
    short: "Connect",
    label: "PEOPLE AT THE CENTRE",
    title: "Understand the person. Find the next step.",
    description:
      "Customer-facing retail experience, consulting, marketing strategy, and leading a three-person B2B / wholesale sales team.",
    tags: ["Customer care", "Sales", "Marketing"],
    color: "#efb396",
  },
  {
    id: "creative",
    name: "Design & communication",
    short: "Create",
    label: "MAKE THE IDEA TANGIBLE",
    title: "A useful idea, clearly expressed.",
    description:
      "UI/UX, custom 3D work, advanced presentations, and visual communication that turns an abstract brief into something people can use.",
    tags: ["UI/UX", "3D design", "PowerPoint"],
    color: "#b7b5ef",
  },
  {
    id: "technology",
    name: "Technology & data",
    short: "Build",
    label: "THE SYSTEM BEHIND THE EXPERIENCE",
    title: "Connect the moving parts.",
    description:
      "Full-stack development, data and BI, AI/ML, automation, and cloud delivery—technical depth that supports practical business needs.",
    tags: ["Full stack", "Analytics", "Automation"],
    color: "#9fcde8",
  },
];

export type IndustrySector = {
  name: string;
  text: string;
  company?: string;
};
export const industryFamilies = [
  {
    id: "health",
    title: "Health & science",
    subtitle: "People, care & complex systems",
    icon: "✚",
    color: "#bdddc9",
    focus: "Keep the human experience in focus.",
    text: "US client engagements across healthcare, dentistry, and pharmaceuticals, with front-end and back-end delivery shaped by each organization's requirements.",
    activities: [
      "Healthcare interfaces & integrations",
      "EHR / hospital-system work",
      "Requirements & client communication",
    ],
    company: "Skyline Dynamics Inc.",
    sectors: [
      {
        name: "Healthcare",
        text: "Contributed to front-end components and back-end functionality around EHR, hospitals, and healthcare systems.",
      },
      {
        name: "Dentistry",
        text: "Built visual interfaces, UI components, and front-end / back-end connections for dentistry clients.",
      },
      {
        name: "Pharmaceuticals",
        text: "Served pharmaceutical-company contexts through US client work, combining requirements, specialist coordination, and technical delivery.",
      },
    ] as IndustrySector[],
  },
  {
    id: "finance",
    title: "Finance & advisory",
    subtitle: "Business, decisions & investment",
    icon: "↔",
    color: "#d9d7a0",
    focus: "Translate complexity into a practical next step.",
    text: "Business and technical advisory work across finance-related and professional-service clients, joining discussions, clarifying priorities, and translating decisions into delivery.",
    activities: [
      "Business & technology advice",
      "Spending & technology-investment decisions",
      "Stakeholder meetings & team delegation",
    ],
    company: "Bison Onward Consulting Center LLC",
    sectors: [
      {
        name: "Fintech",
        text: "Fintech engagements connected software delivery and consulting with a client's business requirements.",
        company: "Skyline Dynamics Inc.",
      },
      {
        name: "Banking",
        text: "Supported banking client contexts through Skyline, connecting business requirements with technical advice and delivery.",
        company: "Skyline Dynamics Inc.",
      },
      {
        name: "Insurance",
        text: "Consulted for insurance clients, gathering requirements and contributing technical advice, documentation, and delivery coordination.",
      },
      {
        name: "Investment businesses",
        text: "Investment-sector clients formed part of the business background. Advisory work concerned company spending and technology investment.",
      },
      {
        name: "Consulting",
        text: "Discussed business and technical needs, summarized recommendations, delegated tasks, and helped coordinate agile delivery.",
      },
    ] as IndustrySector[],
  },
  {
    id: "commerce",
    title: "Commerce & lifestyle",
    subtitle: "Products, customers & everyday experiences",
    icon: "□",
    color: "#ebbb96",
    focus: "Connect the business with the people it serves.",
    text: "Client delivery across consumer-facing businesses, plus direct customer service and store operations. A range of contexts with a common need for clear, useful experiences.",
    activities: [
      "Full-stack e-commerce delivery",
      "Client & customer relationships",
      "Visual experiences & practical operations",
    ],
    company: "Skyline Dynamics Inc.",
    sectors: [
      {
        name: "E-commerce",
        text: "Built systems from the ground up, connecting full-stack development and AI / ML work where it formed part of the brief.",
      },
      {
        name: "Fashion",
        text: "Worked with fashion clients through Skyline, connecting client priorities with business, design, and technical delivery.",
      },
      {
        name: "Retail",
        text: "Helped customers, processed transactions, and supported inventory and store presentation at Sport Chek.",
        company: "Sport Chek",
      },
      {
        name: "Food & beverage",
        text: "Served food and beverage client contexts within the wider business, client-relationship, and technical-delivery background.",
      },
      {
        name: "Hospitality & tourism",
        text: "Served hospitality and tourism client contexts within the broader business, advisory, and delivery background.",
      },
    ] as IndustrySector[],
  },
  {
    id: "digital",
    title: "Digital & creative",
    subtitle: "Ideas, information & expression",
    icon: "✳",
    color: "#bfb8e5",
    focus: "Make an idea tangible, useful, and clear.",
    text: "Software, IT, entertainment, media, and education clients sit alongside creative commissions and an original university project. Technology, design, and communication connect these different contexts.",
    activities: [
      "Full-stack, AI / ML & DevOps",
      "Design & visual communication",
      "International specialist-team coordination",
    ],
    company: "Upwork",
    sectors: [
      {
        name: "Software & IT",
        text: "Led freelance developer and consultant work with an 8–10-person specialist team covering front-end, back-end, AI / ML, and DevOps.",
      },
      {
        name: "Entertainment & media",
        text: "Entertainment and media companies were among Skyline's US client contexts, alongside custom game and visual-asset commissions.",
        company: "Skyline Dynamics Inc.",
      },
      {
        name: "Education",
        text: "Education was part of Skyline's client background. My AI Study Companion is also an original University of London final project.",
        company: "Skyline Dynamics Inc.",
      },
    ] as IndustrySector[],
  },
  {
    id: "places",
    title: "Places & mobility",
    subtitle: "Property, transport & the built world",
    icon: "⌂",
    color: "#aacde0",
    focus: "Join the visible experience to the systems behind it.",
    text: "Real-estate interfaces, automotive services, and broader construction and logistics client contexts—connecting requirements, presentation, and implementation across different settings.",
    activities: [
      "Property interfaces & UI components",
      "Vehicle showcases & payment functionality",
      "Cross-industry requirements & delivery",
    ],
    company: "Skyline Dynamics Inc.",
    sectors: [
      {
        name: "Real estate",
        text: "Built front-end interfaces and reusable UI components, connecting the visual experience with services and back-end functionality.",
      },
      {
        name: "Automotive",
        text: "Worked on payment-related back-end functionality and vehicle showcases among a wider range of automotive tasks.",
      },
      {
        name: "Transport & logistics",
        text: "Connected client requirements, specialist coordination, and technical delivery in transport and logistics contexts.",
      },
      {
        name: "Construction",
        text: "Worked with construction client contexts through Skyline, bringing business requirements into specialist-team coordination and delivery.",
      },
    ] as IndustrySector[],
  },
  {
    id: "systems",
    title: "Industry & public life",
    subtitle: "Production, responsibility & shared systems",
    icon: "◇",
    color: "#b7c7b3",
    focus: "Look at the wider system. Take care of the details.",
    text: "An industry background spanning heavy industry, manufacturing, agriculture, sustainable businesses, and government-related / security work. Common threads: coordination, considered advice, and practical delivery.",
    activities: [
      "Business & technical project work",
      "Planning, communication & documentation",
      "Teams aligned around useful priorities",
    ],
    company: "Skyline Dynamics Inc.",
    sectors: [
      {
        name: "Heavy industry",
        text: "Served heavy-industry client contexts, clarifying business requirements and coordinating specialist delivery.",
      },
      {
        name: "Manufacturing",
        text: "Connected business requirements, advisory discussions, and implementation work in manufacturing client contexts.",
      },
      {
        name: "Agriculture",
        text: "Served agriculture client contexts as part of the wider US business, advisory, and delivery background.",
      },
      {
        name: "Sustainable businesses",
        text: "Worked on interface concepts and prototypes at Second Bind, a company active in recycling, reuse, and donation.",
        company: "Second Bind",
      },
      {
        name: "Government & security",
        text: "Contributed to government-related and security-related project work, with technical delivery and stakeholder communication alongside commercial engagements.",
      },
    ] as IndustrySector[],
  },
];

export const experience = [
  {
    company: "Skyline Dynamics Inc.",
    role: "Founder",
    period: "Mar 2025 — Sep 2026",
    location: "Dover, Delaware incorporation · Remote from Cobourg, Ontario",
    tags: [
      "15–20 international team",
      "US$300k+ earned revenue",
      "US$500k+ signed contract value",
    ],
    description:
      "Founded and led a US-incorporated business with an international team of 15–20 people, serving US clients across consumer, financial, industrial, healthcare, creative, and public-sector contexts.",
    points: [
      "Generated more than US$300,000 in earned revenue and secured more than US$500,000 in signed contract value.",
      "Led an international 15–20-person team while handling company formation, legal administration, taxes, budgeting, forecasting, financial planning, and analysis.",
      "Worked with startups at Series A, B, and C stages and established businesses to define scope, quarterly and annual priorities, and project needs.",
      "Joined invited client conferences and discussions on business priorities and possible improvements, translating the conversation into plans and coordinated work.",
      "Delivered front-end interfaces, back-end functionality, AI / ML work, and DevOps across different engagements.",
      "Projects included healthcare / EHR systems, real-estate interfaces, automotive payment functionality and showcases, and full-stack e-commerce systems.",
    ],
  },
  {
    company: "Bison Onward Consulting Center LLC",
    role: "Software Consultant",
    period: "Mar 2024 — Sep 2026",
    location: "US client engagements · Remote",
    tags: ["Consulting", "Team coordination", "Agile delivery"],
    description:
      "Advised clients across industries on business and technical needs, company spending, and technology investment, alongside software delivery and team coordination.",
    points: [
      "Joined client meetings and conferences, discussed priorities and improvements, summarized key information, and translated it into recommendations and team tasks.",
      "Provided business and technical advice on company spending and technology-investment decisions.",
      "Delegated work among developers and helped coordinate agile sprints, priorities, and delivery.",
      "Contributed technical advice, project documentation, and front-end and back-end code.",
    ],
  },
  {
    company: "Upwork",
    role: "Developer / Consultant / Agency Lead",
    period: "Apr 2023 — Jun 2025",
    location: "Cobourg, Ontario · Remote freelance",
    tags: ["8–10 specialist team", "~US$50k agency revenue", "Client delivery"],
    description:
      "Led developer and consultant work through an Upwork agency with 8–10 specialists, generating approximately US$50,000 in agency revenue.",
    points: [
      "Coordinated an 8–10-person team spanning front-end, back-end, AI / ML, and DevOps specialties.",
      "Prospected for projects, clarified client requirements, and coordinated specialist work alongside hands-on development.",
      "Worked directly with clients to clarify needs, communicate progress, and deliver practical solutions.",
      "Used a wider development toolkit spanning JavaScript, React, Node.js, Python, and service integrations.",
    ],
    note: "End month and agency revenue are estimates.",
  },
  {
    company: "Fiverr",
    role: "3D Designer",
    period: "Apr 2020 — Jul 2024",
    location: "Ontario · Remote freelance",
    tags: ["CAD $15,000+ sales", "Top-rated", "Visual design"],
    description:
      "Created custom 3D models and visual assets for games, graphics, individual projects, and client commissions, earning more than CAD $15,000 in sales.",
    points: [
      "Produced environments, architectural work, creatures, individual models, and other custom assets.",
      "Worked with clients and project partners to develop visual ideas and respond to feedback.",
      "Combined modelling, texturing, presentation, and client service in a top-rated freelance practice.",
    ],
  },
  {
    company: "Sport Chek",
    role: "Store Advisor",
    period: "Apr 2023 — May 2024",
    location: "Ontario · On-site",
    tags: ["Customer service", "Retail sales", "Store operations"],
    description:
      "Supported customers and everyday operations in a sporting-goods retail environment.",
    points: [
      "Helped customers understand products and find options for their needs.",
      "Processed transactions and supported inventory and store presentation.",
      "Worked with the store team to provide attentive service in an in-person environment.",
    ],
  },
  {
    company: "Second Bind",
    role: "UI/UX Design Intern",
    period: "Nov 2023 — Jan 2024",
    location: "Cobourg, Ontario · Remote",
    tags: ["UI/UX", "Research", "Prototyping"],
    description:
      "Created interface concepts, wireframes, prototypes, and visual assets for a company working in sustainable commerce and reuse.",
    points: [
      "Developed UI ideas and components, with attention to layout and user flows.",
      "Supported user research and usability testing to refine the experience.",
      "Collaborated on design work and incorporated feedback into prototypes.",
    ],
  },
];

export const process = [
  {
    title: "Listen",
    label: "01 / UNDERSTAND",
    text: "Start with the people involved. Ask questions, clarify the context, and find out what a useful result looks like.",
    outputs: ["Requirements", "Stakeholder input", "Shared understanding"],
  },
  {
    title: "Organize",
    label: "02 / MAKE IT CLEAR",
    text: "Turn the conversation into scope, priorities, responsibilities, and a plan the team can follow.",
    outputs: ["Clear priorities", "Task delegation", "Practical documentation"],
  },
  {
    title: "Deliver",
    label: "03 / MOVE IT FORWARD",
    text: "Bring the right mix of business, creative, analytical, and technical skills to the work. Keep people informed as it develops.",
    outputs: ["Hands-on work", "Progress updates", "Team coordination"],
  },
  {
    title: "Refine",
    label: "04 / FOLLOW THROUGH",
    text: "Listen to feedback, check the details, and improve the result. A good working relationship matters as much as a good deliverable.",
    outputs: ["Review", "Iteration", "Clear handover"],
  },
];
