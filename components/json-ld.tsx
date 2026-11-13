import { education, experience, faq, profile, projects, skillGroups } from "@/lib/content";
import { getSiteUrl, siteConfig } from "@/lib/site";

/**
 * Structured data for search engines and AI answer engines (SEO / AEO / GEO):
 * ProfilePage -> Person (with occupation, location, employer, education, skills, social profiles),
 * WebSite, and an FAQPage mirroring the visible FAQ window.
 */
export function JsonLd() {
  const url = getSiteUrl();
  const personId = `${url}/#person`;
  const current = experience.find((item) => item.current);
  const skills = skillGroups.filter((group) => group.id !== "soft").flatMap((group) => [...group.items]);

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    image: `${url}/opengraph-image`,
    url,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneE164,
    sameAs: [profile.social.linkedin, profile.social.github, profile.social.whatsapp],
    nationality: { "@type": "Country", name: "Pakistan" },
    address: { "@type": "PostalAddress", addressLocality: "Bahawalpur", addressRegion: "Punjab", addressCountry: "PK" },
    homeLocation: { "@type": "Place", name: "Bahawalpur, Punjab, Pakistan" },
    // Where the work is offered: UAE and the Gulf first, remote anywhere.
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Pakistan" },
    ],
    worksFor: current ? { "@type": "Organization", name: current.organization } : undefined,
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Engineer",
      occupationLocation: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "Place", name: "Remote (worldwide)" },
      ],
      skills: skills.join(", "),
    },
    knowsAbout: [
      "Agentic AI",
      "AI Agents",
      "Large language model (LLM) applications",
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Vector databases",
      "n8n workflow automation",
      "GoHighLevel",
      "WhatsApp automation",
      "AI model evaluation",
      "Python",
    ],
    knowsLanguage: ["en", "ur"],
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${profile.name} - ${siteConfig.role}`,
        description: siteConfig.description,
        inLanguage: "en",
        about: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: siteConfig.title,
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary,
          keywords: project.stack.join(", "),
          author: { "@id": personId },
          ...(project.links[0]?.href.startsWith("http") ? { url: project.links[0].href } : {}),
        })),
      },
      person,
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
