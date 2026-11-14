"use client";

import { ProjectVisual } from "@/components/project-previews";
import { linkLabel, projects } from "@/lib/content";
import { isHttpUrl } from "@/lib/site";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sfx } from "./sfx";

const AUTO_ADVANCE_MS = 9000;

/** DEMO.EXE: a CRT "cabinet" that cycles through the projects using their live preview animations. */
export function ArcadeCabinet() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const project = projects[index] ?? projects[0];
  const dotsRef = useRef<HTMLDivElement>(null);

  // Slide the dot strip so the highlighted dot is centred (it scrolls sideways on phones).
  // The strip is position: relative, so offsetLeft is measured from the strip itself.
  useEffect(() => {
    const strip = dotsRef.current;
    const dot = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !dot || strip.scrollWidth <= strip.clientWidth) return;
    const left = Math.max(0, dot.offsetLeft + dot.offsetWidth / 2 - strip.clientWidth / 2);
    strip.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  useEffect(() => {
    if (reduce || hovered || userPicked) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % projects.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [index, reduce, hovered, userPicked]);

  if (!project) return null;

  const go = (next: number) => {
    sfx.blip();
    setUserPicked(true);
    setIndex((next + projects.length) % projects.length);
  };
  const links = project.links.filter((link) => isHttpUrl(link.href));

  return (
    <div
      className="r-box self-start p-[3px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="r-title r-title--teal">
        <span>DEMO.EXE — NOW RUNNING</span>
        <span className="shrink-0 bg-[#2e5f5c] px-1.5 text-[10px] tabular-nums">
          [{index + 1}/{projects.length}]
        </span>
      </div>

      <div className="bg-[#ede6d6] p-3">
        {/* CRT screen */}
        <div className="r-sunken bg-[#1a1a1a] p-2.5">
          <div className="relative overflow-hidden border-2 border-black">
            <div key={project.id} className="r-bezel r-arcade-screen">
              <ProjectVisual project={project} />
            </div>
            <div className="r-arcade-scan pointer-events-none absolute inset-0" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-center justify-between px-0.5 r-label text-[10px] text-[#33ff33]">
            <span>● ON AIR</span>
            <span>{project.kind.toUpperCase()}</span>
          </div>
        </div>

        {/* Cartridge label */}
        <div className="mt-3" aria-live="polite">
          <h2 className="r-headline text-[1.25rem]">
            {project.name} <span className="text-[13px] text-[#2e7d78]">{"// "}{project.role}</span>
          </h2>
          <p className="mt-1.5 text-[12.5px] leading-5 text-[#3e4949]">{project.summary}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((item) => (
              <span key={item} className="r-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center gap-2 border-t border-[#c8c0ae] pt-3">
          <button type="button" className="r-btn shrink-0 px-2 sm:px-3" data-sfx="blip" onClick={() => go(index - 1)} aria-label="Previous project">
            ◀ PREV
          </button>
          <div ref={dotsRef} className="r-dots relative flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto px-1 py-1" role="tablist" aria-label="Choose a project">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                data-sfx="blip"
                aria-selected={i === index}
                aria-label={p.name}
                onClick={() => go(i)}
                className={`h-3 w-3 shrink-0 border border-black ${i === index ? "bg-[#2e7d78]" : "bg-white"}`}
              />
            ))}
          </div>
          <button type="button" className="r-btn shrink-0 px-2 sm:px-3" data-sfx="blip" onClick={() => go(index + 1)} aria-label="Next project">
            NEXT ▶
          </button>
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`r-btn justify-center ${links.length === 1 ? "sm:col-span-2" : ""}`}
            >
              {linkLabel(link)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
