"use client";

import { profile } from "@/lib/content";
import { useEffect, useState } from "react";

const PREFILL = `Hi ${profile.firstName}, I found your portfolio and would like to discuss a project.`;
const CHAT_URL = `${profile.social.whatsapp}?text=${encodeURIComponent(PREFILL)}`;

/**
 * "Contact" button that lives in the taskbar (where the clock used to be).
 * Clicking it pops a "WHATSAPP.EXE" mini window above the taskbar with a
 * direct wa.me link so a client can message the owner in one tap.
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="r-wa shrink-0" data-open={open ? "1" : "0"}>
      {open ? (
        <section className="r-box r-wa-window p-[3px]" aria-label="WhatsApp chat">
          <div className="r-title r-title--teal flex items-center justify-between">
            <span className="truncate">WHATSAPP.EXE - {profile.phoneDisplay}</span>
            <div className="flex gap-1">
              <button type="button" className="r-ctl" aria-label="Minimize WhatsApp window" onClick={() => setOpen(false)}>
                _
              </button>
              <button type="button" className="r-ctl" aria-label="Close WhatsApp window" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>
          </div>
          <div className="r-paper p-3 text-[12.5px] leading-5">
            <p className="r-label text-[11px] text-[#2e7d78]">{"// DIRECT LINE"}</p>
            <p className="mt-1 font-bold">
              <span className="text-[#128c3e]">●</span> {profile.firstName} is online
            </p>
            <p className="mt-1 text-[#3e4949]">Need an AI engineer? Send a WhatsApp message and get a reply directly from me.</p>
            <a
              href={CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="r-btn r-wa-cta mt-3 w-full justify-center"
              aria-label="Chat on WhatsApp (opens in a new tab)"
            >
              <WhatsAppGlyph /> [CHAT ON WHATSAPP]
            </a>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="r-btn r-wa-launcher px-2 py-0.5 text-[11px]"
        aria-expanded={open}
        aria-label={open ? "Hide WhatsApp window" : "Open WhatsApp chat"}
        onClick={() => setOpen((value) => !value)}
      >
        <WhatsAppGlyph /> Contact
      </button>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
