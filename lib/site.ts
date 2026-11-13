export const siteConfig = {
  name: "Noman Aqeel",
  role: "AI Engineer",
  title: "Noman Aqeel - AI Engineer for UAE & Dubai | Agentic AI, LLM & RAG",
  description:
    "Noman Aqeel, AI Engineer serving UAE and Gulf companies (Dubai, Abu Dhabi) remotely or on-site: Agentic AI systems, LLM apps, RAG chatbots, n8n and GoHighLevel automation.",
  locale: "en",
  keywords: [
    "Noman Aqeel",
    "AI Engineer",
    "AI Engineer in UAE",
    "AI Engineer UAE",
    "AI Engineer Dubai",
    "AI Engineer Abu Dhabi",
    "hire AI engineer UAE",
    "hire AI engineer Dubai",
    "remote AI engineer for UAE companies",
    "freelance AI engineer Dubai",
    "LLM Engineer UAE",
    "Agentic AI developer Dubai",
    "AI agents developer UAE",
    "RAG developer UAE",
    "LangChain developer Dubai",
    "n8n automation expert UAE",
    "GoHighLevel expert UAE",
    "WhatsApp AI automation Dubai",
    "AI workflow automation UAE",
    "AI Engineer GCC",
    "AI Engineer Saudi Arabia",
    "AI Engineer Pakistan",
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
