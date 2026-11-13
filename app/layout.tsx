import { JsonLd } from "@/components/json-ld";
import { retroFontVariables } from "@/designs/retro/fonts";
import { profile } from "@/lib/content";
import { getSiteUrl, siteConfig } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "@/designs/retro/retro.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: `${siteConfig.name} - ${siteConfig.role}`,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Noman",
    lastName: "Aqeel",
    username: "NomanAqeel",
    locale: "en_AE",
    url: siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    countryName: "United Arab Emirates",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console / Bing Webmaster verification codes, set as env vars when available.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  other: {
    // Target market (where the site should rank) rather than physical location.
    "geo.region": "AE",
    "geo.placename": "Dubai, United Arab Emirates",
  },
};

export const viewport: Viewport = {
  themeColor: "#008080",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* rel="me" ties this site to the same person's LinkedIn and GitHub profiles. */}
        <link rel="me" href={profile.social.linkedin} />
        <link rel="me" href={profile.social.github} />
        <JsonLd />
        <div className={`retro-root ${retroFontVariables}`} suppressHydrationWarning>
          {/* Before first paint: apply the saved wallpaper (no flash of the default teal) and stop the
              browser from restoring the old scroll position, so a reload always boots from the top. */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                'try{history.scrollRestoration="manual"}catch(e){}try{var w=localStorage.getItem("maos-wallpaper");if(w&&/^(teal|navy|plum|crt)$/.test(w))document.currentScript.parentElement.dataset.wallpaper=w}catch(e){}',
            }}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
