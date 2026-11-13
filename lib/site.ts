export const siteConfig = {
  name: "Noman Aqeel",
  role: "AI Engineer",
  title: "Noman Aqeel - AI Engineer | Agentic AI, LLM Applications, RAG & Automation",
  description:
    "Noman Aqeel is an AI Engineer building Agentic AI systems, LLM applications, RAG pipelines, and AI workflow automation with Python, LangChain, LangGraph, FastAPI, vector databases, and n8n.",
  locale: "en",
  keywords: [
    "Noman Aqeel",
    "AI Engineer",
    "Agentic AI",
    "LLM Engineer",
    "RAG",
    "LangChain",
    "LangGraph",
    "FastAPI",
    "n8n",
    "AI automation",
    "Remote",
    "On-site",
  ],
};

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  // Set automatically by Vercel at build time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function isHttpUrl(value?: string): value is string {
  return Boolean(value && /^https?:\/\//i.test(value));
}
