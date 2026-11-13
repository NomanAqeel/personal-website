"use client";

import { ProjectVisual } from "@/components/project-previews";
import { OutLink } from "@/designs/classic/components/ui/out-link";
import { Reveal } from "@/designs/classic/components/ui/reveal";
import { SectionHeading } from "@/designs/classic/components/ui/section-heading";
import { projects } from "@/lib/content";
import { isHttpUrl } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="section-pad relative z-[1]">
      <Reveal>
        <SectionHeading
          kicker="Selected work"
          title="Agents, RAG, and automation."
          accent="Built to be used."
          description="AI and automation projects: a live lead-generation SaaS, chatbots with human handoff, computer vision, RAG, multi-agent workflows, and n8n automations."
        />
      </Reveal>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.04}>
            <article className="card overflow-hidden p-6 sm:p-7 lg:p-8">
              <div
                className={`grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:gap-10 ${
                  index % 2 === 1
                    ? "lg:grid-cols-[auto_minmax(0,1fr)]"
                    : "lg:grid-cols-[minmax(0,1fr)_auto]"
                }`}
              >
                <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                    {project.kind} · {project.role}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2rem,10vw,2.6rem)] tracking-[-0.05em] break-words">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
                    {project.summary}
                  </p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.filter((link) => isHttpUrl(link.href)).map((link) => (
                      <OutLink key={link.label} href={link.href} className="btn btn-ghost">
                        {link.label}
                        <ArrowUpRight size={15} />
                      </OutLink>
                    ))}
                  </div>
                </div>
                <div
                  className={`flex w-full min-w-0 justify-center lg:w-[28rem] ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <ProjectVisual project={project} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
