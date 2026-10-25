/* Edit personal details and portfolio content here. */
export const profile = {
  name: "Maximiliano Sá",
  location: "Espinho / Porto, Portugal",
  field: "Information Security & Cybersecurity",
  headline: "Studying information security, building toward cybersecurity.",
  biography: "I’m an Information Security master’s student at FCUP with a Bachelor’s degree in Computer Science and hands-on experience building full-stack web applications. I intend to build a career in cybersecurity, with particular interest in product and network security, secure software development, vulnerability management, and privacy. My academic work also includes encryption, privacy impact assessment, and data anonymization.",
  githubUsername: "MaxSa2004",
  githubUrl: "https://github.com/MaxSa2004",
  linkedinUrl: "https://www.linkedin.com/in/maximiliano-s%C3%A1",
  email: "max.phillips.sa@gmail.com",
  cvPath: "assets/CV_%20Maximiliano_S%C3%A1.pdf",
  education: [
    {
      degree: "Master’s Degree in Information Security",
      institution: "Faculdade de Ciências da Universidade do Porto (FCUP)",
      location: "Porto, Portugal",
      start: "September 2026",
      end: "Present",
      status: "Expected graduation: July 2028"
    },
    {
      degree: "Bachelor’s Degree in Computer Science",
      institution: "Faculdade de Ciências da Universidade do Porto (FCUP)",
      location: "Porto, Portugal",
      start: "September 2023",
      end: "July 2026",
      status: "Completed"
    }
  ],
  certifications: {
    credlyUrl: "https://www.credly.com/users/maximiliano-sa",
    items: [
      "Dale Carnegie Generation.Next - leadership, communication, and personal effectiveness training",
      "Introduction to Cybersecurity - Cisco Networking Academy"
    ]
  },
  experience: [
    {
      role: "Full-Stack Developer Intern",
      organization: "Instituto Português de Oncologia do Porto (IPO-Porto)",
      location: "Porto, Portugal",
      dates: "March 2026 - June 2026",
      responsibilities: [
        "Designed and implemented a normalized PostgreSQL database, replacing an Excel-based workflow and improving data consistency, scalability, and reporting.",
        "Automated data migration from Excel to PostgreSQL using Python, applying data validation and data-integrity checks to reduce manual processing.",
        "Built secure RESTful APIs with Node.js and Express.js to provide programmatic access and integrate backend services with internal tools.",
        "Developed a responsive CRUD web application using HTML, CSS, and JavaScript to improve data entry and reporting workflows.",
        "Collaborated with researchers to gather requirements, document technical needs, and deliver solutions aligned with operational requirements."
      ],
      technologies: ["PostgreSQL", "Python", "Node.js", "Express.js", "REST APIs", "JavaScript", "HTML", "CSS"]
    }
  ],
  activities: [
    {
      role: "Member, Pedagogical Department",
      organization: "Núcleo de Ciência de Computadores - FCUP",
      dates: "October 2025 - October 2026", // Update if this activity continues.
      summary: "Help organize academic events, talks, and workshops."
    }
  ],
  skills: [
    { title: "Programming languages", items: ["Java", "Python", "C", "JavaScript", "SQL", "Haskell", "MIPS Assembly"] },
    { title: "Web & backend", items: ["HTML5", "CSS", "Node.js", "Express.js", "REST APIs", "JSON"] },
    { title: "Databases", items: ["PostgreSQL", "SQLite", "SQLiteStudio"] },
    { title: "Tools & environments", items: ["Git", "GitHub", "VS Code", "Ubuntu", "Linux/Unix", "Jupyter Notebook", "ARX Anonymization Tool", "PIA Privacy Impact Assessment"] },
    { title: "Security & privacy", items: ["Information & Network Security", "Encryption", "Security & Privacy Analysis", "Privacy Impact Assessment", "Data Anonymization"] },
    { title: "Computer science foundations", items: ["Object-Oriented Programming", "Data Structures & Algorithms", "Algorithm Analysis & Complexity", "Computer Network Fundamentals", "Relational Database Design"] },
    { title: "Professional strengths", items: ["Problem Solving", "Analytical Thinking", "Teamwork & Collaboration", "Time Management & Prioritization", "Adaptability & Learning Agility", "Attention to Detail", "Working to Deadlines"] },
    { title: "Languages", items: ["English", "Portuguese"] }
  ],
  featuredProjects: [
    {
      name: "LookoutIDS",
      description: "A work-in-progress network intrusion detection system combining Suricata monitoring with custom Python detection logic and real-time Discord alerts. Current work focuses on core detection features, testing network events, and refining defensive security automation.",
      source: "https://github.com/MaxSa2004/LookoutIDS",
      technologies: ["Python", "Suricata", "Discord API"],
      status: "Work in progress"
    }
  ],
  // Empty list uses the default quality filters. Add exact repo names to curate.
  github: {
    selectedRepositories: ["Agentops_Playground"],
    showAllEligible: false,
    repositoryDemos: {
      agentops_playground: "https://maxsa2004.github.io/Agentops_Playground/"
    },
    repositoryDescriptions: {
      agentops_playground: "A local-first customer-support triage playground using fictional tickets to explore AI-assisted decisions, MCP tools, deterministic policy, and human approval. The GitHub Pages version is a deterministic browser simulation; running locally adds Ollama inference and an MCP-backed Express API."
    }
  }
};
