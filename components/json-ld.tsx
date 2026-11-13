import { education, profile } from "@/lib/content";
import { getSiteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: siteConfig.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneE164,
    url,
    sameAs: [profile.social.linkedin, profile.social.github],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    address: { "@type": "PostalAddress", addressLocality: "Bahawalpur", addressCountry: "PK" },
    knowsAbout: [
      "Agentic AI",
      "Large language model applications",
      "Retrieval-Augmented Generation",
      "LangChain",
      "LangGraph",
      "AI workflow automation",
      "Model evaluation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
