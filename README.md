# Noman Aqeel - Personal Portfolio

Portfolio site for **Noman Aqeel**, an AI Engineer working on Agentic AI, LLM applications, RAG pipelines, and AI workflow automation.

Repository: [github.com/NomanAqeel/personal-website](https://github.com/NomanAqeel/personal-website)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Project structure

```
app/                  Next.js routes: serves the NA/OS design at /
designs/
  retro/              NA/OS, the live retro-desktop design (see designs/retro/README.md)
  classic/            Previous dark design, archived and not routed (see designs/classic/README.md)
components/           Shared by both designs: project previews, JSON-LD structured data
lib/                  Shared content (content.ts) and site config (site.ts)
public/               Static files, including Noman_Aqeel_CV.pdf
```

All on-site text (profile, experience, projects, skills, contact details, social links) lives in `lib/content.ts`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Site URL

The production URL is used for canonical links, the sitemap, and Open Graph tags. Set it before deploying:

```bash
cp .env.example .env.local
```

Then set `NEXT_PUBLIC_SITE_URL` to your domain. On Vercel it is picked up automatically from the project URL if left unset.

## Contact

- The **contact form** sends through [Web3Forms](https://web3forms.com). Get a free access key for your inbox there, then set it as `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` and in Vercel (Project → Settings → Environment Variables). Without a key, the form falls back to opening the visitor's mail app.
- The **Contact** button in the taskbar opens a WhatsApp chat. The number and the LinkedIn / GitHub links are set in `lib/content.ts` (`profile.phoneE164`, `profile.social`).

## CV

The downloadable résumé is `public/Noman_Aqeel_CV.pdf`. Replace that file to update it; the `[OPEN RESUME.PDF]` button and the `CV.PDF` download link both point to it via `profile.cvHref` in `lib/content.ts`.

## Deploy on Vercel

1. Import this repository in Vercel.
2. Add `NEXT_PUBLIC_WEB3FORMS_KEY` under Project → Settings → Environment Variables.
3. (Optional) Add your custom domain under Project → Settings → Domains and set `NEXT_PUBLIC_SITE_URL` to it.
4. Deploy.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
