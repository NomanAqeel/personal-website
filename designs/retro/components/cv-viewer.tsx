"use client";

import { profile } from "@/lib/content";
import { useEffect, useState, type ReactNode } from "react";

export const OPEN_CV_EVENT = "naos:open-cv";

export function openCv() {
  window.dispatchEvent(new Event(OPEN_CV_EVENT));
}

const FILE_NAME = "Noman_Aqeel_CV.pdf";

export function CvDownloadLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href={profile.cvHref} download={FILE_NAME} className={className}>
      {children}
    </a>
  );
}

/** Opens the résumé in the on-page viewer instead of navigating away. */
export function OpenResumeButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={openCv}>
      {children}
    </button>
  );
}

export function CvModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CV_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CV_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-3 sm:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${profile.name} resume`}
        className="r-box flex h-[min(90vh,960px)] w-full max-w-4xl flex-col p-[3px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="r-title">
          <span className="truncate">RESUME.PDF — {profile.name.toUpperCase()}</span>
          <button type="button" className="r-ctl" aria-label="Close resume" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <iframe
          title={`${profile.name} resume`}
          src={`${profile.cvHref}#page=1&navpanes=0`}
          className="min-h-0 w-full flex-1 bg-white"
        />
        <div className="flex justify-end gap-2 bg-[#c0c0c0] p-2">
          <CvDownloadLink className="r-btn">[ DOWNLOAD PDF ]</CvDownloadLink>
          <button type="button" className="r-btn" onClick={() => setOpen(false)}>
            [ CLOSE ]
          </button>
        </div>
      </div>
    </div>
  );
}
