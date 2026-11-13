/**
 * Single source of truth for on-site copy.
 * Facts are taken from Noman Aqeel's CV (Noman_Aqeel_AI_Engineer_CV_remote or on-site_remote or on-site.docx).
 * Projects without a public URL keep an empty `links` array; buttons only render for real http(s) links.
 */

export const profile = {
  name: "Noman Aqeel",
  firstName: "Noman",
  lastName: "Aqeel",
  initials: "NA",
  handle: "NOMANAQEEL",
  place: "Bahawalpur, Pakistan",
  role: "AI Engineer",
  tagline: "Agentic AI, LLM Applications, RAG & Automation",
  email: "nomanaqeel773@gmail.com",
  phoneDisplay: "+92 326 3426361",
  phoneE164: "+923263426361",

  cvHref: "/Noman_Aqeel_CV.pdf",
  social: {
    github: "https://github.com/NomanAqeel",
    linkedin: "https://www.linkedin.com/in/nomanaqeel4914272a9/",
    whatsapp: "https://wa.me/923263426361",
  },
} as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  availability: "Open to work anywhere - remote or on-site",
  role: "AI Engineer",
  lead: "I build Agentic AI systems, LLM applications, RAG pipelines, and AI workflow automation - Python, LangChain, LangGraph, FastAPI, vector databases, and n8n - and turn business requirements into tested, deployable solutions.",
  primaryCta: { href: "#projects", label: "See work" },
};

export const marquee = [
  "Agentic AI",
  "AI Agents",
  "LLM Integration",
  "RAG",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "Pinecone",
  "ChromaDB",
  "n8n",
  "Model Evaluation",
  "Python",
];

export const about = {
  kicker: "About",
  heading: "Retrieve the context.",
  headingAccent: "Then automate the work.",
  paragraphs: [
    "I am an AI Engineer working with companies in the UAE and the wider Gulf - Dubai, Abu Dhabi, Riyadh - remotely today and open to relocation. My work spans Agentic AI, LLM applications, Retrieval-Augmented Generation (RAG), model evaluation, and AI workflow automation, built in Python with LangChain, LangGraph, FastAPI, vector databases, REST APIs, webhooks, and n8n.",
    "At Turing I contribute to Google Gemini personalized model-training workflows, and through Revelo I evaluated an Anthropic model on real-world GitHub issues - so I know how models behave, where they fail, and how to measure it.",
    "As founder of INNOVIAST I delivered AI automation, SaaS applications, and business software for clients: knowledge-based chatbots, lead generation, customer support, and document processing that ship and get used.",
  ],
};

export type ExperienceItem = {
  id: string;
  organization: string;
  role: string;
  dates: string;
  current?: boolean;
  summary: string;
  points: string[];
  areas: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "turing",
    organization: "Turing",
    role: "AI Model Trainer / Data Analyst",
    dates: "Jan 2026 – Present",
    current: true,
    summary:
      "Evaluating outputs for Google Gemini personalized model-training projects, with structured feedback that keeps training data reliable.",
    points: [
      "Evaluate outputs for Google Gemini personalized model-training projects, analyzing user intent, response quality, and adherence to project guidelines.",
      "Assess prompts and outputs for reasoning quality, accuracy, consistency, model behavior, and annotation quality across AI and data workflows.",
      "Provide structured feedback that documents quality issues and supports reliable personalized model-training processes.",
    ],
    areas: ["Google Gemini", "Model training", "Reasoning analysis", "Annotation quality", "Data analysis"],
  },
  {
    id: "revelo-3d",
    organization: "Revelo",
    role: "3D Developer – AI Model Training",
    dates: "Sep 2026 – Oct 2026 · Remote",
    summary:
      "Contract role training and evaluating an AI-powered 3D website-building model, reviewing and refining the interactive 3D web scenes it generates.",
    points: [
      "Reviewed and refined AI-generated interactive 3D web scenes built with HTML, JavaScript, and Three.js, covering lighting, materials, animations, camera controls, and interactions.",
      "Evaluated model outputs against detailed visual and functional rubrics, and wrote automated tests and validations for required features.",
      "Ran visual, functional, and responsive QA across screen sizes, and gave structured feedback to improve the model's accuracy and 3D website generation.",
    ],
    areas: ["Three.js", "3D web development", "JavaScript", "AI model training", "Prompt engineering"],
  },
  {
    id: "revelo",
    organization: "Revelo",
    role: "AI Model (Opus 4.6) Evaluator",
    dates: "Project-based · 1 month",
    summary:
      "Part-time evaluation of an Anthropic model on coding, reasoning, and issue-resolution tasks derived from real-world GitHub issues.",
    points: [
      "Evaluated an Anthropic model on coding, reasoning, and issue-resolution tasks derived from real-world GitHub issues.",
      "Compared generated fixes with issue requirements, reviewed solution quality, and identified technical limitations and quality gaps.",
      "Documented evaluation outcomes clearly to support consistent assessment of model capabilities.",
    ],
    areas: ["Anthropic", "Code evaluation", "Issue resolution", "Quality gaps"],
  },
  {
    id: "innoviast",
    organization: "INNOVIAST",
    role: "Founder",
    dates: "Jun 2025 – Jun 2026",
    summary:
      "Led hands-on delivery of AI automation, SaaS applications, business software, and web solutions for client requirements.",
    points: [
      "Led hands-on delivery of AI automation, SaaS applications, business software, and web solutions for client requirements.",
      "Translated business needs into solution plans and coordinated development, testing, deployment, support, and cross-functional delivery.",
      "Guided workflow-automation and SaaS projects with attention to usability, operational needs, and clear client communication.",
    ],
    areas: ["AI automation", "SaaS", "Solution planning", "Client delivery"],
  },
  {
    id: "web",
    organization: "Freelancing, YoungDev & Cosmicode",
    role: "Web Developer",
    dates: "2024 – 2025",
    summary: "Client and internship web projects: WordPress sites, responsive interfaces, and PHP/JavaScript features.",
    points: [
      "Delivered WordPress sites, responsive interfaces, and PHP/JavaScript features for client and internship projects.",
      "Handled debugging, database integration, performance optimization, and client-focused project delivery.",
    ],
    areas: ["WordPress", "PHP", "JavaScript", "Performance"],
  },
];

export const expertise = {
  kicker: "Capabilities",
  heading: "A stack for agents,",
  headingAccent: "and the workflows around them.",
  intro:
    "A working map of what I build with - tags, not scorebars. Depth shows up in shipped projects, not in a percentage.",
  groups: [
    {
      title: "Agentic AI & LLMs",
      items: ["AI Agents", "LangChain", "LangGraph", "Tool Calling", "Prompt Engineering", "Model Evaluation"],
    },
    {
      title: "RAG & Search",
      items: ["Embeddings", "Semantic Search", "Pinecone", "ChromaDB", "FAISS", "Knowledge-Based Chatbots"],
    },
    {
      title: "Automation & APIs",
      items: ["n8n", "Make.com", "Zapier", "FastAPI", "REST APIs", "Webhooks"],
    },
  ],
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectVisualKind = "hema" | "leads" | "chatbot" | "anpr" | "rag" | "agents" | "support" | "whatsapp" | "ghl" | "workflow";

export type Project = {
  id: string;
  name: string;
  kind: string;
  role: string;
  visual: ProjectVisualKind;
  /** Node labels for the "workflow" preview. */
  flow?: string[];
  summary: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "hemasphere",
    name: "HemaSphere",
    kind: "Blood management ecosystem",
    role: "Final year project · full-stack",
    visual: "hema",
    summary:
      "A blood management ecosystem that connects donors, patients, hospitals, and blood banks through a Flutter app and a web platform for blood banks.",
    highlights: [
      "Flutter app for scheduling donations, requesting emergency blood, finding nearby blood banks, real-time alerts, and donation history with eligibility rules.",
      "Blood-bank web platform for point of sale, inventory, donor records, appointments, emergency broadcasts, QR tracking, analytics, an AI chatbot, and demand forecasting.",
    ],
    stack: [
      "Flutter",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Hono",
      "PostgreSQL",
      "Prisma",
      "FastAPI",
      "Firebase",
      "Google Maps",
      "AWS",
    ],
    links: [],
  },
  {
    id: "leads-engine",
    name: "Leads Engine",
    kind: "AI lead generation SaaS",
    role: "Full-stack · live",
    visual: "leads",
    summary:
      "An AI-powered lead generation SaaS platform on the MERN stack - LLMs interpret what you need and generate targeted prospect searches.",
    highlights: [
      "Collaborated on a full-stack MERN platform integrating LLMs to interpret user requirements and generate targeted prospect searches.",
      "Integrated Apify-powered lead collection and AI-assisted lead qualification through a conversational chatbot for sales and business development.",
    ],
    stack: ["MERN Stack", "LLM Integration", "Apify", "REST APIs", "AI Chatbot"],
    links: [{ label: "Live", href: "https://leadsengine.ai" }],
  },
  {
    id: "ghl-homecare",
    name: "Home Care Business OS",
    kind: "GoHighLevel system",
    role: "Systems & automation",
    visual: "ghl",
    summary:
      "A complete business system for a home care agency built on GoHighLevel - website, funnels, CRM pipelines, a full caregiver recruitment system, and AI agents that handle clients and calls.",
    highlights: [
      "Designed the agency's website, lead funnels, and client pipeline, with automated follow-ups, reminders, and onboarding processes end to end.",
      "Built a complete caregiver recruitment system (job funnels, screening, interview and hiring pipeline) plus AI calling and client-handling agents working inside the same GHL workspace.",
    ],
    stack: ["GoHighLevel", "Funnels & Website", "CRM Pipelines", "Workflow Automation", "AI Voice Agents", "Recruitment System"],
    links: [],
  },
  {
    id: "chatbot-platform",
    name: "AI Chatbot & Live Support",
    kind: "Configurable chatbot platform",
    role: "Developer",
    visual: "chatbot",
    summary:
      "A configurable AI chatbot platform where businesses set behavior, instructions, and lead capture from an admin panel - with AI-to-human handoff.",
    highlights: [
      "React frontend and Python backend; businesses customize behavior, instructions, and lead capture through an admin panel.",
      "AI-to-human live-chat handoff, structured lead capture, and centralized conversation management without code changes.",
    ],
    stack: ["React", "Python", "FastAPI", "LLM APIs", "REST APIs"],
    links: [],
  },
  {
    id: "anpr",
    name: "ANPR Vehicle Alerts",
    kind: "Computer vision system",
    role: "Developer",
    visual: "anpr",
    summary:
      "Automatic number plate recognition on live camera feeds with a custom-trained YOLOv11 model, matched against a police database.",
    highlights: [
      "Trained a custom YOLOv11 model on a custom vehicle number-plate dataset for real-time license-plate detection from live camera feeds.",
      "Integrated recognition with a police database to identify missing vehicles and generate automated alerts on detection.",
    ],
    stack: ["Python", "YOLOv11", "Computer Vision", "Deep Learning"],
    links: [],
  },
  {
    id: "rag-assistant",
    name: "RAG Knowledge Assistant",
    kind: "Enterprise RAG app",
    role: "Developer",
    visual: "rag",
    summary:
      "A Retrieval-Augmented Generation assistant that answers questions from business documents with source-grounded responses.",
    highlights: [
      "Vector databases, semantic search, and LLMs to answer questions from business documents.",
      "Document ingestion, embeddings, context retrieval, and source-grounded responses served through FastAPI APIs.",
    ],
    stack: ["Python", "LangChain", "FastAPI", "Pinecone", "ChromaDB", "LLM"],
    links: [],
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Research Flow",
    kind: "Multi-agent workflow",
    role: "Developer",
    visual: "agents",
    summary:
      "Specialized AI agents that research, plan, draft, and produce structured output - orchestrated over multiple steps.",
    highlights: [
      "Specialized agents perform research, planning, drafting, and structured-output generation.",
      "Tool calling, shared memory, and multi-step orchestration for automated AI task execution.",
    ],
    stack: ["Python", "LangChain", "LLMs", "Tool Calling"],
    links: [],
  },
  {
    id: "support-crm",
    name: "AI Support & CRM",
    kind: "n8n automation",
    role: "Automation engineer",
    visual: "support",
    flow: ["Gmail", "Classify", "LLM reply", "CRM", "Slack"],
    summary:
      "An AI customer-support workflow that classifies requests, drafts context-aware replies, and updates CRM records automatically.",
    highlights: [
      "Classifies requests, generates context-aware responses, and updates CRM records automatically.",
      "Automated request routing, Slack notifications, and customer acknowledgements using LLMs.",
    ],
    stack: ["n8n", "LLM APIs", "CRM Integration", "Gmail", "Slack"],
    links: [],
  },
  {
    id: "whatsapp-ai",
    name: "WhatsApp AI Automation",
    kind: "n8n automation",
    role: "Automation engineer",
    visual: "whatsapp",
    flow: ["WhatsApp", "Intent", "Qualify", "CRM sync", "Human"],
    summary:
      "An AI-powered WhatsApp workflow for customer support, lead qualification, and personalized follow-up messaging.",
    highlights: [
      "Customer support, lead qualification, and personalized follow-up messaging over WhatsApp.",
      "LLM-based intent detection, CRM synchronization, and automated escalation to human support when required.",
    ],
    stack: ["n8n", "WhatsApp Business API", "LLM APIs", "Webhooks"],
    links: [],
  },
  {
    id: "invoice-ai",
    name: "Invoice Processing AI",
    kind: "n8n automation",
    role: "Automation engineer",
    visual: "workflow",
    flow: ["Drive", "PDF parse", "LLM extract", "Sheets", "Gmail"],
    summary:
      "End-to-end invoice processing: structured data extracted from uploaded PDF invoices and stored in Google Sheets.",
    highlights: [
      "Extracts structured information from uploaded PDF invoices and stores it in Google Sheets.",
      "Automated invoice summaries, email notifications, and validation using AI-powered document processing.",
    ],
    stack: ["n8n", "Google Drive", "Google Sheets", "Gmail", "PDF Parsing", "LLM"],
    links: [],
  },
];

export const skillGroups = [
  {
    id: "ai",
    label: "AI & LLM Engineering",
    items: [
      "Agentic AI",
      "AI Agents",
      "LLM Integration",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "RAG",
      "Embeddings",
      "Knowledge-Based Chatbots",
      "Model Evaluation",
      "Hugging Face",
    ],
  },
  {
    id: "programming",
    label: "Programming",
    items: ["Python", "SQL", "JavaScript", "C++"],
  },
  {
    id: "apis",
    label: "Frameworks & APIs",
    items: ["FastAPI", "REST APIs", "Webhooks"],
  },
  {
    id: "vector",
    label: "Vector Databases",
    items: ["Pinecone", "ChromaDB", "FAISS"],
  },
  {
    id: "automation",
    label: "Automation Tools",
    items: ["n8n", "Make.com", "Zapier", "GoHighLevel (GHL)"],
  },
  {
    id: "data",
    label: "Data & Databases",
    items: ["Pandas", "MySQL", "Firebase", "PostgreSQL", "Data Analysis", "Kaggle"],
  },
  {
    id: "soft",
    label: "Soft Skills",
    items: [
      "Problem Solving",
      "Team Management",
      "Project Management",
      "Client Communication",
      "Cross-functional Coordination",
      "Requirements Analysis",
      "Attention to Detail",
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    items: ["Git", "GitHub", "WordPress", "Shopify", "Sanity", "Cursor", "Claude Code"],
  },
  {
    id: "deploy",
    label: "Deployment",
    items: ["AWS VPS Server", "Docker"],
  },
] as const;

export const education = {
  degree: "BS Computer Science",
  school: "Superior University, Lahore",
  dates: "Nov 2022 – Jun 2026",
  grade: "CGPA 3.6 / 4.0",
};

export const publication = {
  title: "A Survey on Tor’s Multi-Layer Architecture and Web Implications in the Dark Web",
  venue: "SES, Vol. 2, No. 4, pp. 212–231",
  date: "Dec 2024",
};

export const certifications = [
  {
    name: "CS50x Puzzle Day 2025",
    issuer: "Harvard University",
    date: "Apr 2025",
    detail: "Solved 9 of 9 puzzles; organized under Prof. David J. Malan.",
  },
  {
    name: "Intra-University Programming Competition",
    issuer: "Superior IEEE Society",
    date: "",
    detail: "Participated in the C++ programming competition.",
  },
  {
    name: "Freelancing Course",
    issuer: "PFTP",
    date: "",
    detail: "Two-month course focused on client acquisition and freelance business skills.",
  },
  {
    name: "Introduction to SQL",
    issuer: "SoloLearn",
    date: "May 2024",
    detail: "MySQL and Microsoft SQL Server Management Studio.",
  },
];

/** Short, direct answers for visitors and AI answer engines (also emitted as FAQPage schema). */
export const faq = [
  {
    question: "Who is Noman Aqeel?",
    answer:
      "Noman Aqeel is an AI Engineer serving companies in the UAE and the Gulf, originally from Bahawalpur, Pakistan. He builds Agentic AI systems, LLM applications, RAG pipelines, and AI workflow automation with Python, LangChain, LangGraph, FastAPI, vector databases, and n8n, and currently works as an AI Model Trainer / Data Analyst at Turing.",
  },
  {
    question: "Is Noman Aqeel available for hire as an AI Engineer in the UAE (Dubai, Abu Dhabi)?",
    answer:
      "Yes. Noman is open to full-time, contract, and freelance AI engineering work with UAE and GCC companies - remote today, and open to relocation or on-site roles in Dubai, Abu Dhabi, Sharjah, or elsewhere in the Gulf. Email, WhatsApp, LinkedIn, or the contact form on this page all reach him directly.",
  },
  {
    question: "What AI services does Noman Aqeel offer to businesses in the UAE?",
    answer:
      "AI agents and agentic workflows, LLM application development, RAG knowledge assistants and chatbots, n8n / Make.com / Zapier workflow automation, GoHighLevel business systems (websites, funnels, CRM pipelines, recruitment systems, AI voice agents), WhatsApp and customer-support automation, and AI model evaluation - for startups, agencies, and enterprises in Dubai, Abu Dhabi, and across the GCC.",
  },
  {
    question: "How does Noman Aqeel work with clients in the UAE - process and time zone?",
    answer:
      "A short discovery call to understand the business problem, then a written scope, a build-and-test phase with regular demos, deployment, and support after launch. Pakistan is only one hour ahead of UAE time (PKT is UTC+5, GST is UTC+4), so working hours overlap almost completely with Dubai and Abu Dhabi teams, and communication runs over WhatsApp, email, Google Meet, or Zoom.",
  },
  {
    question: "How can I contact Noman Aqeel?",
    answer:
      "Email nomanaqeel773@gmail.com, message +92 326 3426361 on WhatsApp, connect on LinkedIn, or send a note through the contact form at the bottom of this page.",
  },
  {
    question: "Which tools and technologies does Noman Aqeel work with?",
    answer:
      "Python, LangChain, LangGraph, FastAPI, REST APIs and webhooks, Pinecone, ChromaDB, FAISS, n8n, Make.com, Zapier, GoHighLevel, PostgreSQL, MySQL, Firebase, Docker, and AWS, plus WordPress and Shopify for web work.",
  },
] as const;

export const contact = {
  heading: "Have a workflow worth automating?",
  headingAccent: "I’ll actually read it.",
  body: "I am easy to reach if you are hiring an AI Engineer, building with LLMs, RAG, or AI agents, or want a business process automated end to end. Recruiters, founders, and engineers - write.",
};

/** Button text for a project link in the retro design. */
export function linkLabel(link: ProjectLink) {
  if (link.label === "GitHub") return "‹› [SOURCE]";
  if (link.label === "Live") return "▶ [LIVE SITE]";
  return `▶ [${link.label.toUpperCase()}]`;
}
