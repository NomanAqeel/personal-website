"use client";

import type { Project } from "@/lib/content";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

const BG = "#0b120b";
const INK = "#33ff33";
const SOFT = "#9cff9c";
const DIM = "#2f7a2f";
const AMBER = "#ffb000";

/** Loops `step` through 0..steps-1 while visible; reduced motion pins it to the final frame. */
function useStep(steps: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStep((s) => (s + 1) % steps);
    }, ms);
    return () => window.clearInterval(id);
  }, [inView, reduce, steps, ms]);

  return { ref, step: reduce ? steps - 1 : step };
}

function typed(text: string, progress: number) {
  return text.slice(0, Math.round(text.length * Math.min(1, Math.max(0, progress))));
}

function Screen({
  rootRef,
  title,
  status,
  children,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  title: string;
  status: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      ref={rootRef}
      className="relative aspect-square w-full overflow-hidden rounded-[1.4rem] font-mono"
      style={{ background: BG, color: INK, containerType: "inline-size" }}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col p-[4.5cqw] text-[3.5cqw] leading-[1.4]">
        <div className="flex justify-between gap-[2cqw] border-b pb-[2cqw] text-[3cqw]" style={{ borderColor: DIM, color: DIM }}>
          <span className="truncate">{title}</span>
          <span className="shrink-0">{status}</span>
        </div>
        <div className="relative mt-[3cqw] flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

function Line({ show, color = SOFT, children }: { show: boolean; color?: string; children: ReactNode }) {
  return (
    <p className="transition-opacity duration-300" style={{ opacity: show ? 1 : 0, color }}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* HemaSphere: Flutter app <-> API / AI / DB <-> blood-bank web portal  */
/* ------------------------------------------------------------------ */

const RED = "#ff4757";
const DEEP_RED = "#4a0d14";

// One request travelling the whole ecosystem; the final step repeats as a hold frame.
const HEMA_STEPS: Array<{ at: [number, number]; on: "phone" | "api" | "ai" | "db" | "portal"; log: string }> = [
  { at: [17, 43.5], on: "phone", log: "patient ▸ requests O+ · 2 units" },
  { at: [50, 12.5], on: "api", log: "api ▸ hono receives the request" },
  { at: [50, 28.5], on: "ai", log: "ai ▸ forecasts demand, matches stock" },
  { at: [82, 35.5], on: "portal", log: "portal ▸ emergency broadcast to banks" },
  { at: [82, 44], on: "db", log: "pos ▸ bag #HS-4821 issued · qr tracked" },
  { at: [17, 18], on: "phone", log: "firebase ▸ alerts nearby O+ donors" },
  { at: [17, 40.5], on: "phone", log: "donor ▸ accepts · appointment booked" },
  { at: [82, 52], on: "portal", log: "✓ stock replenished · donor +50 pts" },
];

const STAGES = ["REQUEST", "MATCH", "ISSUE", "DONATE"];

function stageOf(step: number) {
  if (step <= 1) return 0;
  if (step === 2) return 1;
  if (step <= 4) return 2;
  return 3;
}

function Drop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y - 8 * s} C${x - 4 * s} ${y - 2 * s} ${x - 4.5 * s} ${y + 0.5 * s} ${x - 4.5 * s} ${y + 2 * s} A${4.5 * s} ${4.5 * s} 0 0 0 ${x + 4.5 * s} ${y + 2 * s} C${x + 4.5 * s} ${y + 0.5 * s} ${x + 4 * s} ${y - 2 * s} ${x} ${y - 8 * s} Z`}
      fill={RED}
    />
  );
}

export function HemaVisual() {
  const { ref, step: raw } = useStep(HEMA_STEPS.length + 1, 1100);
  const step = Math.min(raw, HEMA_STEPS.length - 1);
  const hold = raw >= HEMA_STEPS.length;
  const current = HEMA_STEPS[step] ?? HEMA_STEPS[0];
  const donor = step >= 5;
  const stage = stageOf(step);
  const oPlus = step >= 7 ? 11 : step >= 4 ? 10 : 12;
  const stock: Array<[string, number]> = [
    ["O+", oPlus],
    ["A+", 9],
    ["B+", 6],
    ["AB+", 3],
  ];
  const lit = (part: string) => !hold && current?.on === part;
  const font = { fontFamily: "monospace" } as const;

  return (
    <Screen rootRef={ref} title="HEMASPHERE // ECOSYSTEM" status={<span style={{ color: RED }}>● LIVE</span>}>
      <svg viewBox="0 0 100 86" className="min-h-0 w-full flex-1" style={font}>
        {/* Column labels */}
        <text x="17" y="3.6" textAnchor="middle" fontSize="2.2" fill={DIM}>MOBILE · FLUTTER</text>
        <text x="50" y="3.6" textAnchor="middle" fontSize="2.2" fill={DIM}>BACKEND</text>
        <text x="82" y="3.6" textAnchor="middle" fontSize="2.2" fill={DIM}>WEB · NEXT.JS</text>

        {/* Connectors */}
        <line x1="30" y1="14" x2="37" y2="12.5" stroke={DIM} strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="63" y1="12.5" x2="67" y2="14" stroke={DIM} strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="30" y1="46" x2="37" y2="44.5" stroke={DIM} strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="63" y1="44.5" x2="67" y2="46" stroke={DIM} strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="50" y1="17" x2="50" y2="24" stroke={DIM} strokeWidth="0.5" />
        <line x1="50" y1="33" x2="50" y2="40" stroke={DIM} strokeWidth="0.5" />

        {/* Mobile app */}
        <rect x="4" y="6" width="26" height="50" rx="3" fill="#0f170f" stroke={lit("phone") ? RED : DIM} strokeWidth="0.7" style={{ transition: "stroke 0.3s" }} />
        <rect x="13" y="7.4" width="8" height="1.2" rx="0.6" fill={DIM} />
        <text x="6" y="12.4" fontSize="2.2" fontWeight="700" fill={RED}>HemaSphere</text>
        <rect x="20" y="10.2" width="8.4" height="3" rx="0.6" fill={donor ? "#143314" : DEEP_RED} />
        <text x="24.2" y="12.4" textAnchor="middle" fontSize="1.7" fontWeight="700" fill={donor ? INK : RED}>
          {donor ? "DONOR" : "PATIENT"}
        </text>
        {donor ? (
          <g>
            <text x="17" y="18" textAnchor="middle" fontSize="2.2" fontWeight="700" fill={RED}>! O+ needed nearby</text>
            <rect x="7" y="20" width="20" height="12" fill="#0b1a0b" stroke={DIM} strokeWidth="0.3" />
            {[23, 26, 29].map((y) => (
              <line key={y} x1="7" y1={y} x2="27" y2={y} stroke="#143314" strokeWidth="0.3" />
            ))}
            {[12, 17, 22].map((x) => (
              <line key={x} x1={x} y1="20" x2={x} y2="32" stroke="#143314" strokeWidth="0.3" />
            ))}
            <line x1="11" y1="29" x2="22" y2="24" stroke={SOFT} strokeWidth="0.4" strokeDasharray="0.8 0.8" />
            <circle cx="11" cy="29" r="1" fill={INK} />
            <Drop x={22} y={24.5} s={0.35} />
            <text x="17" y="35.5" textAnchor="middle" fontSize="1.9" fill={SOFT}>3 km · City Hospital</text>
            <rect x="8" y="38" width="18" height="5" rx="1" fill={step >= 7 ? "#143314" : step === 6 ? RED : DEEP_RED} style={{ transition: "fill 0.3s" }} />
            <text x="17" y="41.3" textAnchor="middle" fontSize="2" fontWeight="700" fill={step >= 7 ? INK : "#fff"}>
              {step >= 7 ? "✓ BOOKED" : "ACCEPT"}
            </text>
            <text x="17" y="48" textAnchor="middle" fontSize="1.8" fill={step >= 7 ? AMBER : DIM}>
              {step >= 7 ? "♥ hero badge +50" : "eligible ✓ 92 days"}
            </text>
          </g>
        ) : (
          <g>
            <Drop x={17} y={24} />
            <text x="17" y="27.4" textAnchor="middle" fontSize="3" fontWeight="700" fill="#fff">O+</text>
            <text x="17" y="34.5" textAnchor="middle" fontSize="2.2" fill={SOFT}>Need 2 units</text>
            <text x="17" y="37.6" textAnchor="middle" fontSize="1.8" fill={DIM}>City Hospital · ER</text>
            <rect x="8" y="41" width="18" height="5" rx="1" fill={step === 0 ? RED : step >= 4 ? "#143314" : DEEP_RED} style={{ transition: "fill 0.3s" }} />
            <text x="17" y="44.3" textAnchor="middle" fontSize="2" fontWeight="700" fill={step >= 4 ? INK : "#fff"}>
              {step === 0 ? "REQUEST" : step >= 4 ? "✓ RESERVED" : "MATCHING..."}
            </text>
          </g>
        )}
        <text x="17" y="53.4" textAnchor="middle" fontSize="2" fill={DIM}>⌂   ◎   ♥   ☰</text>

        {/* Backend */}
        {[
          { id: "api", y: 8, title: "API GATEWAY", sub: "Node · Hono" },
          { id: "ai", y: 24, title: "AI SERVICE", sub: "FastAPI · chatbot" },
          { id: "db", y: 40, title: "DATABASE", sub: "PostgreSQL · Prisma" },
        ].map((box) => {
          const on = lit(box.id);
          return (
            <g key={box.id}>
              <rect x="37" y={box.y} width="26" height="9" fill={on ? INK : BG} stroke={INK} strokeWidth="0.5" style={{ transition: "fill 0.3s" }} />
              <text x="50" y={box.y + 4} textAnchor="middle" fontSize="2.2" fontWeight="700" fill={on ? BG : INK}>{box.title}</text>
              <text x="50" y={box.y + 7.2} textAnchor="middle" fontSize="1.7" fill={on ? BG : DIM}>{box.sub}</text>
            </g>
          );
        })}
        <text x="50" y="53.4" textAnchor="middle" fontSize="1.7" fill={DIM}>Firebase · Maps · AWS</text>

        {/* Blood-bank web portal */}
        <rect x="67" y="6" width="30" height="50" rx="1.5" fill="#0f170f" stroke={lit("portal") ? RED : DIM} strokeWidth="0.7" style={{ transition: "stroke 0.3s" }} />
        <rect x="67.4" y="6.4" width="29.2" height="3.6" fill="#122612" />
        {[69.5, 71.5, 73.5].map((x) => (
          <circle key={x} cx={x} cy="8.2" r="0.6" fill={DIM} />
        ))}
        <text x="76" y="8.9" fontSize="1.6" fill={DIM}>bank.hemasphere</text>
        <text x="69" y="14" fontSize="2" fontWeight="700" fill={INK}>BLOOD BANK PORTAL</text>
        {stock.map(([type, units], i) => {
          const y = 17.5 + i * 3.6;
          return (
            <g key={type}>
              <text x="69" y={y + 1.5} fontSize="1.9" fill={SOFT}>{type}</text>
              <rect x="74" y={y} width="16" height="1.8" fill="#143314" />
              <rect x="74" y={y} width={(units / 14) * 16} height="1.8" fill={units <= 4 ? AMBER : RED} style={{ transition: "width 0.5s" }} />
              <text x="95.5" y={y + 1.5} textAnchor="end" fontSize="1.8" fill={SOFT}>{units}u</text>
            </g>
          );
        })}
        <rect x="69" y="33" width="26" height="4.6" fill={RED} style={{ opacity: step >= 3 ? 1 : 0.12, transition: "opacity 0.3s" }} />
        <text x="82" y="36.1" textAnchor="middle" fontSize="1.9" fontWeight="700" fill="#fff" style={{ opacity: step >= 3 ? 1 : 0, transition: "opacity 0.3s" }}>
          EMERGENCY · O+ ×2
        </text>
        <rect x="69" y="40" width="26" height="7.4" fill="none" stroke={DIM} strokeWidth="0.35" />
        <g style={{ opacity: step >= 4 ? 1 : 0.25, transition: "opacity 0.3s" }}>
          <text x="70.4" y="43.2" fontSize="1.8" fontWeight="700" fill={INK}>POS ▸ #HS-4821</text>
          <text x="70.4" y="46" fontSize="1.6" fill={SOFT}>issued → ER · QR</text>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2].map((c) =>
              (r + c) % 2 === 0 || (r === 1 && c === 1) ? null : (
                <rect key={`${r}${c}`} x={89.6 + c * 1.6} y={41 + r * 1.6} width="1.6" height="1.6" fill={SOFT} />
              ),
            ),
          )}
          <rect x="89.4" y="40.8" width="5.2" height="5.2" fill="none" stroke={SOFT} strokeWidth="0.3" />
        </g>
        <text x="69" y="52" fontSize="1.7" fill={step >= 6 ? AMBER : DIM}>
          {step >= 6 ? "appt ▸ Ali · O+ · 10:30" : "analytics ▸ O+ demand ↑18%"}
        </text>

        {/* The blood packet travelling the system */}
        {!hold ? (
          <g style={{ transform: `translate(${current.at[0]}px, ${current.at[1]}px)`, transition: "transform 0.9s ease-in-out" }}>
            <circle r="2.6" fill={RED} opacity="0.25" />
            <circle r="1.3" fill={RED} />
          </g>
        ) : null}

        {/* Flow stages */}
        {STAGES.map((label, i) => {
          const x = 4 + i * 24;
          const done = hold || i < stage;
          const on = !hold && i === stage;
          return (
            <g key={label}>
              {i > 0 ? <text x={x - 2.4} y="64.6" textAnchor="middle" fontSize="2.2" fill={done || on ? INK : DIM}>›</text> : null}
              <rect x={x} y="60.6" width="20" height="5.2" fill={on ? RED : done ? "#143314" : "transparent"} stroke={on ? RED : done ? INK : DIM} strokeWidth="0.4" style={{ transition: "fill 0.3s" }} />
              <text x={x + 10} y="64.1" textAnchor="middle" fontSize="2.1" fontWeight="700" fill={on ? "#fff" : done ? INK : DIM}>
                {done ? `✓ ${label}` : label}
              </text>
            </g>
          );
        })}

        {/* Rolling event log */}
        {[2, 1, 0].map((back, row) => {
          const entry = HEMA_STEPS[step - back];
          if (!entry) return null;
          return (
            <text key={step - back} x="4" y={72 + row * 4.6} fontSize="2.4" fill={back === 0 ? (hold ? AMBER : SOFT) : DIM}>
              {back === 0 ? "> " : "  "}
              {entry.log}
            </text>
          );
        })}
      </svg>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* Leads Engine: requirement -> LLM query plan -> scraped, scored leads */
/* ------------------------------------------------------------------ */

const LEADS: Array<[string, number]> = [
  ["CEO · fintech SaaS", 94],
  ["Founder · HR SaaS", 88],
  ["CTO · logistics SaaS", 81],
  ["Head of Sales · CRM", 76],
];

export function LeadsVisual() {
  const { ref, step } = useStep(13, 650);
  const ask = "find SaaS founders in Riyadh, 10-50 staff";
  return (
    <Screen rootRef={ref} title="LEADS_ENGINE.AI" status={step >= 10 ? "● DONE" : "● RUNNING"}>
      <p>
        <span style={{ color: DIM }}>you&gt; </span>
        {typed(ask, (step + 1) / 3)}
        {step < 3 ? <span className="r-cursor">█</span> : null}
      </p>
      <Line show={step >= 3}>llm ▸ industry=SaaS geo=Riyadh size=10-50</Line>
      <Line show={step >= 4} color={DIM}>apify ▸ collecting prospects...</Line>
      <div className="mt-[2.5cqw] grid gap-[1.6cqw]">
        {LEADS.map(([label, score], i) => (
          <div
            key={label}
            className="grid grid-cols-[1fr_auto] items-center gap-[2cqw] border px-[2cqw] py-[1cqw] transition-opacity duration-300"
            style={{ borderColor: DIM, opacity: step >= 5 + i ? 1 : 0 }}
          >
            <span className="truncate">{label}</span>
            <span className="flex items-center gap-[1.5cqw]">
              <span className="h-[1.6cqw] w-[16cqw]" style={{ background: "#143314" }}>
                <span
                  className="block h-full transition-[width] duration-500"
                  style={{ width: step >= 5 + i ? `${score}%` : "0%", background: score >= 85 ? INK : AMBER }}
                />
              </span>
              <span className="tabular-nums">{score}</span>
            </span>
          </div>
        ))}
      </div>
      <Line show={step >= 10} color={AMBER}>
        ✓ 4 qualified leads → chatbot follow-up
      </Line>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* Chatbot platform: AI answers, captures a lead, hands off to a human  */
/* ------------------------------------------------------------------ */

type Msg = { who: "user" | "bot" | "sys" | "agent"; text: string };

const CHAT: Msg[] = [
  { who: "user", text: "Do you deliver to Jeddah?" },
  { who: "bot", text: "Yes, in 2-3 days. Want a quote?" },
  { who: "user", text: "Yes, 40 units please." },
  { who: "sys", text: "● lead captured: qty=40 city=Jeddah" },
  { who: "user", text: "Can I talk to a person?" },
  { who: "sys", text: "↪ handoff → live agent joined" },
  { who: "agent", text: "Hi! Sara from sales here." },
];

export function ChatbotVisual() {
  const { ref, step } = useStep(CHAT.length + 3, 900);
  const visible = CHAT.slice(0, Math.min(step + 1, CHAT.length)).slice(-6);
  const handedOff = step >= 5;
  return (
    <Screen rootRef={ref} title="SUPPORT_WIDGET" status={handedOff ? "● HUMAN" : "● AI"}>
      <div className="flex flex-1 flex-col justify-end gap-[2cqw]">
        {visible.map((msg) =>
          msg.who === "sys" ? (
            <p key={msg.text} className="text-center text-[3cqw]" style={{ color: AMBER }}>
              {msg.text}
            </p>
          ) : (
            <div
              key={msg.text}
              className={`max-w-[78%] border px-[2.5cqw] py-[1.4cqw] ${msg.who === "user" ? "self-end" : "self-start"}`}
              style={{
                borderColor: msg.who === "user" ? DIM : INK,
                background: msg.who === "user" ? "transparent" : "#122612",
                color: msg.who === "user" ? SOFT : INK,
              }}
            >
              <span className="block text-[2.6cqw]" style={{ color: DIM }}>
                {msg.who === "user" ? "visitor" : msg.who === "bot" ? "ai assistant" : "agent · sara"}
              </span>
              {msg.text}
            </div>
          ),
        )}
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* ANPR: car approaches, YOLOv11 boxes the plate, DB match raises alert */
/* ------------------------------------------------------------------ */

export function AnprVisual() {
  const { ref, step } = useStep(11, 800);
  const scale = [0.45, 0.65, 0.85, 1][Math.min(step, 3)] ?? 1;
  const boxed = step >= 3;
  const alert = step >= 6;
  return (
    <Screen rootRef={ref} title="CAM-02 // LIVE FEED" status={<span style={{ color: alert ? AMBER : INK }}>● REC</span>}>
      <div className="relative border" style={{ borderColor: DIM, height: "56%" }}>
        <svg viewBox="0 0 100 60" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="60" fill="#071007" />
          <path d="M0 60 L40 18 L60 18 L100 60 Z" fill="#0f1f0f" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={49.4 - i * 0.4} y={24 + i * 12} width={1.2 + i * 0.8} height={4 + i * 2} fill={DIM} />
          ))}
          <g style={{ transform: `scale(${scale})`, transformOrigin: "50px 46px", transition: "transform 0.7s ease-out" }}>
            <rect x="32" y="24" width="36" height="16" rx="3" fill="#1d3a1d" stroke={INK} strokeWidth="0.6" />
            <rect x="36" y="16" width="28" height="10" rx="3" fill="#122612" stroke={INK} strokeWidth="0.6" />
            <rect x="33" y="28" width="6" height="3" fill={AMBER} />
            <rect x="61" y="28" width="6" height="3" fill={AMBER} />
            <rect x="42" y="32" width="16" height="5" fill="#e8f5e8" />
            <text x="50" y="35.9" textAnchor="middle" fontSize="3.4" fontFamily="monospace" fontWeight="700" fill="#071007">
              LHR-4821
            </text>
            <rect x="34" y="40" width="7" height="4" fill="#071007" />
            <rect x="59" y="40" width="7" height="4" fill="#071007" />
            {boxed ? (
              <>
                <rect x="40.5" y="30.5" width="19" height="8" fill="none" stroke={alert ? AMBER : INK} strokeWidth="0.8" />
                <text x="40.5" y="29.6" fontSize="2.6" fontFamily="monospace" fill={alert ? AMBER : INK}>
                  plate 0.97
                </text>
              </>
            ) : null}
          </g>
        </svg>
        {step < 3 ? (
          <div className="r-arcade-scan pointer-events-none absolute inset-0" />
        ) : null}
      </div>
      <div className="mt-[2.5cqw] grid gap-[0.6cqw] text-[3.2cqw]">
        <Line show={step >= 3}>yolov11 ▸ plate detected (0.97)</Line>
        <Line show={step >= 4}>ocr ▸ LHR-4821</Line>
        <Line show={step >= 5} color={DIM}>police db ▸ querying...</Line>
        <Line show={alert} color={AMBER}>⚠ MATCH: reported missing vehicle</Line>
        <Line show={step >= 7} color={AMBER}>alert sent → control room</Line>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* RAG: ingest -> embed -> nearest chunks -> grounded, cited answer     */
/* ------------------------------------------------------------------ */

const DOTS: Array<[number, number]> = [
  [12, 14], [22, 34], [30, 10], [38, 44], [46, 22], [54, 38], [62, 12], [70, 30],
  [78, 46], [86, 18], [18, 48], [34, 26], [58, 50], [74, 8], [90, 38], [44, 6],
];
const QUERY: [number, number] = [60, 26];
const TOP_K = [4, 5, 7];

export function RagVisual() {
  const { ref, step } = useStep(12, 750);
  const q = "What is our refund window?";
  const a = "14 days from delivery [1] for unused items [2].";
  return (
    <Screen rootRef={ref} title="KNOWLEDGE_ASSISTANT" status={step >= 8 ? "● GROUNDED" : "● INDEXING"}>
      <div className="flex gap-[2cqw] text-[3cqw]">
        {["policy.pdf", "handbook.docx", "faq.md"].map((doc) => (
          <span key={doc} className="border px-[1.5cqw]" style={{ borderColor: DIM }}>
            ▤ {doc}
          </span>
        ))}
      </div>
      <div className="relative mt-[2cqw] border" style={{ borderColor: DIM, height: "40%" }}>
        <svg viewBox="0 0 100 56" className="h-full w-full" preserveAspectRatio="none">
          {step >= 5
            ? TOP_K.map((i) => {
                const [x, y] = DOTS[i] ?? [0, 0];
                return <line key={i} x1={QUERY[0]} y1={QUERY[1]} x2={x} y2={y} stroke={AMBER} strokeWidth="0.5" />;
              })
            : null}
          {DOTS.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={step >= 5 && TOP_K.includes(i) ? 2 : 1.3}
              fill={step >= 5 && TOP_K.includes(i) ? AMBER : INK}
              style={{ opacity: step >= 2 ? 1 : 0, transition: `opacity 0.3s ${i * 25}ms` }}
            />
          ))}
          {step >= 4 ? <circle cx={QUERY[0]} cy={QUERY[1]} r="2.4" fill="none" stroke={AMBER} strokeWidth="0.8" /> : null}
        </svg>
        <span className="absolute right-[1.5cqw] bottom-[0.5cqw] text-[2.6cqw]" style={{ color: DIM }}>
          pinecone · 128 chunks
        </span>
      </div>
      <div className="mt-[2.5cqw] grid gap-[0.6cqw] text-[3.2cqw]">
        <Line show={step >= 1} color={DIM}>ingest ▸ chunk ▸ embed</Line>
        <Line show={step >= 3}>
          <span style={{ color: DIM }}>Q&gt; </span>
          {q}
        </Line>
        <Line show={step >= 6} color={DIM}>retrieve ▸ top-3 chunks</Line>
        <p style={{ color: INK, minHeight: "2.8em" }}>
          {step >= 7 ? (
            <>
              <span style={{ color: DIM }}>A&gt; </span>
              {typed(a, (step - 6) / 2)}
            </>
          ) : null}
        </p>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* Multi-agent: research -> plan -> draft -> format around shared memory */
/* ------------------------------------------------------------------ */

const AGENTS: Array<{ name: string; x: number; y: number; log: string }> = [
  { name: "RESEARCH", x: 20, y: 12, log: "tool ▸ web_search('AI in GCC logistics')" },
  { name: "PLAN", x: 80, y: 12, log: "plan ▸ outline 5 sections" },
  { name: "DRAFT", x: 80, y: 48, log: "draft ▸ writing section 3/5" },
  { name: "FORMAT", x: 20, y: 48, log: "format ▸ JSON schema ✓ validated" },
];

export function AgentsVisual() {
  const { ref, step } = useStep(AGENTS.length * 2 + 1, 850);
  const active = Math.min(Math.floor(step / 2), AGENTS.length - 1);
  const done = step >= AGENTS.length * 2;
  const moving = !done && step % 2 === 1 && active < AGENTS.length - 1;
  const from = AGENTS[active] ?? AGENTS[0];
  const to = AGENTS[active + 1] ?? from;
  const packet = moving ? to : from;
  return (
    <Screen rootRef={ref} title="ORCHESTRATOR" status={done ? "● COMPLETE" : `● STEP ${active + 1}/4`}>
      <div className="relative" style={{ height: "62%" }}>
        <svg viewBox="0 0 100 60" className="h-full w-full">
          {AGENTS.map((agent, i) => {
            const next = AGENTS[(i + 1) % AGENTS.length] ?? agent;
            return i < AGENTS.length - 1 ? (
              <line key={agent.name} x1={agent.x} y1={agent.y} x2={next.x} y2={next.y} stroke={DIM} strokeWidth="0.6" />
            ) : null;
          })}
          {AGENTS.map((agent) => (
            <line key={`m-${agent.name}`} x1={agent.x} y1={agent.y} x2="50" y2="30" stroke={DIM} strokeWidth="0.4" strokeDasharray="1.5 1.5" />
          ))}
          <rect x="38" y="25" width="24" height="10" fill={BG} stroke={DIM} strokeWidth="0.6" />
          <text x="50" y="31.4" textAnchor="middle" fontSize="3.4" fontFamily="monospace" fill={DIM}>
            MEMORY
          </text>
          {AGENTS.map((agent, i) => {
            const on = (i === active && !done) || done;
            return (
              <g key={agent.name}>
                <rect
                  x={agent.x - 15}
                  y={agent.y - 6}
                  width="30"
                  height="12"
                  fill={on ? (done ? "#143314" : INK) : BG}
                  stroke={INK}
                  strokeWidth="0.7"
                  style={{ transition: "fill 0.3s" }}
                />
                <text
                  x={agent.x}
                  y={agent.y + 1.3}
                  textAnchor="middle"
                  fontSize="3.8"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={on && !done ? BG : INK}
                >
                  {done || i < active ? `✓ ${agent.name}` : agent.name}
                </text>
              </g>
            );
          })}
          {!done ? (
            <circle
              r="1.8"
              fill={AMBER}
              style={{ transform: `translate(${packet.x}px, ${packet.y + 8}px)`, transition: "transform 0.8s ease-in-out" }}
            />
          ) : null}
        </svg>
      </div>
      <div className="mt-[2cqw] grid gap-[0.6cqw] text-[3.2cqw]">
        {AGENTS.map((agent, i) => (
          <Line key={agent.name} show={done || i <= active} color={i === active && !done ? INK : DIM}>
            {agent.log}
          </Line>
        ))}
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* n8n workflow: an execution passing node by node                     */
/* ------------------------------------------------------------------ */

export function WorkflowVisual({ flow }: { flow: string[] }) {
  const { ref, step } = useStep(flow.length + 3, 700);
  const done = step >= flow.length;
  return (
    <Screen rootRef={ref} title="N8N // WORKFLOW" status={done ? "● SUCCESS" : "● EXECUTING"}>
      <div className="flex flex-1 flex-col justify-center gap-[1.4cqw]">
        {flow.map((node, i) => {
          const state = i < step ? "done" : i === step ? "run" : "idle";
          return (
            <div key={node}>
              {i > 0 ? (
                <div className="ml-[5cqw] h-[2.4cqw] w-[0.6cqw] transition-colors duration-300" style={{ background: i <= step ? INK : DIM }} />
              ) : null}
              <div
                className="flex items-center justify-between border px-[2.5cqw] py-[1.4cqw] transition-colors duration-300"
                style={{
                  borderColor: state === "idle" ? DIM : INK,
                  background: state === "run" ? INK : state === "done" ? "#122612" : "transparent",
                  color: state === "run" ? BG : state === "done" ? INK : DIM,
                }}
              >
                <span>
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> {node}
                </span>
                <span className="text-[3cqw]">{state === "done" ? "✓" : state === "run" ? "▶ running" : "○"}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Line show={done} color={AMBER}>
        ✓ execution succeeded · {flow.length} nodes
      </Line>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* AI Support & CRM: tickets travel a kanban board INBOX ▸ AI ▸ SYNCED  */
/* ------------------------------------------------------------------ */

const TICKETS = [
  { id: "#4821", subject: "Refund for double charge", tag: "REFUND" },
  { id: "#4822", subject: "Can't log in after reset", tag: "BUG" },
  { id: "#4823", subject: "Need invoice copy", tag: "BILLING" },
];
const SUPPORT_COLS = ["INBOX", "AI DRAFT", "CRM ✓ SLACK"];
const SUPPORT_LOG = [
  "gmail ▸ 3 new tickets received",
  "llm ▸ classified: refund · bug · billing",
  "llm ▸ replies drafted in customer's tone",
  "crm ▸ 3 records updated · owner assigned",
  "slack ▸ #support pinged · auto-ack sent",
];

export function SupportVisual() {
  const { ref, step } = useStep(11, 850);
  // Ticket i enters the board two beats after the previous one and advances one column per beat.
  const colOf = (i: number) => Math.min(3, Math.max(0, step - 2 * i)); // 0 = not yet, 1..3 = column
  const done = step >= 8;
  const counts = SUPPORT_COLS.map((_, c) => TICKETS.filter((_, i) => colOf(i) === c + 1).length);
  const logShown = done ? SUPPORT_LOG.length : Math.min(SUPPORT_LOG.length, Math.floor(step / 1.6));
  return (
    <Screen rootRef={ref} title="SUPPORT.FLOW // INBOX" status={done ? "● 0 MANUAL" : `● ${counts[0] + counts[1]} OPEN`}>
      <div className="grid grid-cols-3 gap-[1.5cqw] text-[2.6cqw]" style={{ color: DIM }}>
        {SUPPORT_COLS.map((col, c) => (
          <div key={col} className="flex items-center justify-between border-b pb-[1cqw]" style={{ borderColor: DIM, color: counts[c] ? INK : DIM }}>
            <span className="truncate">{col}</span>
            <span className="tabular-nums">{counts[c]}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-[1.5cqw]" style={{ height: "46%" }}>
        {[1, 2].map((c) => (
          <div key={c} className="absolute top-0 bottom-0 w-px" style={{ left: `${(c * 100) / 3}%`, background: DIM, opacity: 0.5 }} />
        ))}
        {TICKETS.map((ticket, i) => {
          const col = colOf(i);
          const synced = col === 3;
          const drafting = col === 2;
          return (
            <div
              key={ticket.id}
              className="absolute border px-[1.6cqw] py-[1.2cqw] text-[2.5cqw] leading-[1.3]"
              style={{
                width: "30.5%",
                top: `${i * 32}%`,
                left: `${((Math.max(1, col) - 1) * 100) / 3 + 1.2}%`,
                opacity: col === 0 ? 0 : 1,
                borderColor: synced ? INK : drafting ? AMBER : DIM,
                background: synced ? "#122612" : BG,
                color: synced ? INK : SOFT,
                transform: col === 0 ? "translateX(-12%)" : "none",
                transition: "left 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.4s, transform 0.4s, border-color 0.3s, background 0.3s",
              }}
            >
              <div className="flex justify-between gap-[1cqw]">
                <span className="tabular-nums" style={{ color: synced ? INK : DIM }}>
                  {ticket.id}
                </span>
                <span style={{ color: drafting ? AMBER : synced ? INK : DIM }}>
                  {synced ? "✓" : drafting ? "▶" : col === 1 ? "○" : ""}
                </span>
              </div>
              <p className="truncate">{ticket.subject}</p>
              <span
                className="mt-[0.6cqw] inline-block border px-[1cqw] text-[2.1cqw] transition-opacity duration-300"
                style={{ borderColor: col >= 2 ? INK : DIM, color: col >= 2 ? INK : DIM, opacity: col >= 2 ? 1 : 0.35 }}
              >
                {col >= 2 ? ticket.tag : "···"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-[2cqw] grid gap-[0.5cqw] text-[3cqw]">
        {SUPPORT_LOG.map((line, i) => (
          <Line key={line} show={i < logShown} color={i === logShown - 1 && !done ? INK : DIM}>
            {line}
          </Line>
        ))}
      </div>
      <Line show={done} color={AMBER}>
        ✓ 3 tickets resolved · 0 touched by hand
      </Line>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp AI: chat on top, live intent / lead-score panel below      */
/* ------------------------------------------------------------------ */

type WaMsg = { who: "user" | "bot" | "sys"; text: string; intent?: string; score?: number; crm?: boolean; human?: boolean };

const WA_CHAT: WaMsg[] = [
  { who: "user", text: "Hi, do you build AI chatbots for a clinic?" },
  { who: "sys", text: "intent ▸ SALES_INQUIRY · 0.94", intent: "SALES_INQUIRY", score: 35 },
  { who: "bot", text: "Yes! Which clinic, and roughly how many patients a day?" },
  { who: "user", text: "Dental, ~60/day. We need WhatsApp booking." },
  { who: "sys", text: "lead ▸ QUALIFIED · score 82", score: 82 },
  { who: "bot", text: "Great fit. Shall I book a 15-min call tomorrow at 11:00?" },
  { who: "sys", text: "crm ▸ lead L-1042 created · follow-up scheduled", crm: true },
  { who: "user", text: "Can I speak to a person first?" },
  { who: "sys", text: "▶ handed to human agent · context attached", human: true },
];

export function WhatsAppVisual() {
  const { ref, step } = useStep(WA_CHAT.length + 3, 950);
  const shown = WA_CHAT.slice(0, Math.min(step + 1, WA_CHAT.length));
  const visible = shown.slice(-4);
  const intent = [...shown].reverse().find((m) => m.intent)?.intent ?? "—";
  const score = [...shown].reverse().find((m) => m.score !== undefined)?.score ?? 0;
  const crm = shown.some((m) => m.crm);
  const human = shown.some((m) => m.human);
  const bars = Math.round(score / 10);
  return (
    <Screen rootRef={ref} title="WHATSAPP // AI AGENT" status={human ? "● HUMAN" : "● BOT ONLINE"}>
      <div className="flex items-center gap-[1.5cqw] text-[2.6cqw]" style={{ color: DIM }}>
        <span className="inline-block h-[4cqw] w-[4cqw] rounded-full border" style={{ borderColor: INK, background: "#122612" }} />
        <span style={{ color: SOFT }}>+92 3·· ···· ··</span>
        <span>· {human ? "agent typing…" : "online"}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[1.4cqw] overflow-hidden py-[2cqw]">
        {visible.map((msg) =>
          msg.who === "sys" ? (
            <p key={msg.text} className="text-center text-[2.6cqw] transition-opacity" style={{ color: msg.human ? AMBER : DIM }}>
              {msg.text}
            </p>
          ) : (
            <div
              key={msg.text}
              className={`relative max-w-[80%] px-[2.4cqw] py-[1.3cqw] text-[3cqw] ${msg.who === "user" ? "self-start" : "self-end"}`}
              style={{
                background: msg.who === "user" ? "#142e14" : INK,
                color: msg.who === "user" ? SOFT : BG,
                borderRadius: msg.who === "user" ? "0 1.6cqw 1.6cqw 1.6cqw" : "1.6cqw 0 1.6cqw 1.6cqw",
              }}
            >
              {msg.text}
              <span className="mt-[0.4cqw] block text-right text-[2.1cqw]" style={{ color: msg.who === "user" ? DIM : "#0b120b99" }}>
                {msg.who === "user" ? "11:0" + (visible.indexOf(msg) + 2) : "✓✓ auto"}
              </span>
            </div>
          ),
        )}
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-x-[2cqw] gap-y-[0.8cqw] border-t pt-[1.6cqw] text-[2.6cqw]" style={{ borderColor: DIM }}>
        <span style={{ color: DIM }}>
          INTENT <span style={{ color: INK }}>{intent}</span>
        </span>
        <span style={{ color: crm ? INK : DIM }}>{crm ? "✓ CRM" : "○ CRM"}</span>
        <span className="flex items-center gap-[1.2cqw]" style={{ color: DIM }}>
          SCORE
          <span className="flex gap-[0.5cqw]">
            {Array.from({ length: 10 }, (_, i) => (
              <i
                key={i}
                className="inline-block h-[2.4cqw] w-[1.6cqw] transition-colors duration-500"
                style={{ background: i < bars ? (score >= 70 ? INK : AMBER) : "#1a2e1a" }}
              />
            ))}
          </span>
          <span className="tabular-nums" style={{ color: score >= 70 ? INK : AMBER }}>
            {score}
          </span>
        </span>
        <span style={{ color: human ? AMBER : DIM }}>{human ? "● HUMAN" : "○ HUMAN"}</span>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */
/* GoHighLevel home-care OS: modules light up, two pipelines, AI calls  */
/* ------------------------------------------------------------------ */

const GHL_MODULES = ["SITE", "FUNNEL", "CRM", "AI AGENT"] as const;
const GHL_CLIENT_STAGES = ["NEW LEAD", "ASSESSMENT", "CARE PLAN", "ACTIVE"];
const GHL_HIRE_STAGES = ["APPLIED", "SCREENED", "INTERVIEW", "HIRED"];

// One client journey and one caregiver hire, both inside the same GHL workspace.
const GHL_STEPS: Array<{ on: (typeof GHL_MODULES)[number]; log: string; client?: number; hire?: number; call?: boolean }> = [
  { on: "SITE", log: "site ▸ family lands on homecare website" },
  { on: "FUNNEL", log: "funnel ▸ 'free care assessment' form submitted" },
  { on: "CRM", log: "crm ▸ contact created · pipeline: new lead", client: 0 },
  { on: "AI AGENT", log: "ai agent ▸ calling lead… qualifying needs", call: true },
  { on: "AI AGENT", log: "ai agent ▸ answered · assessment booked", client: 1, call: true },
  { on: "CRM", log: "workflow ▸ reminders + sms/email follow-ups sent", client: 2 },
  { on: "FUNNEL", log: "recruiting ▸ 4 caregiver applications via job funnel", hire: 0 },
  { on: "AI AGENT", log: "ai agent ▸ screening calls · 2 moved to interview", hire: 1, call: true },
  { on: "CRM", log: "workflow ▸ interview booked · onboarding docs sent", hire: 2 },
  { on: "CRM", log: "crm ▸ caregiver hired · client matched · active", client: 3, hire: 3 },
];

function GhlPipeline({ label, stages, at, done }: { label: string; stages: string[]; at: number; done: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-[2.4cqw]" style={{ color: DIM }}>
        <span>{label}</span>
        <span style={{ color: at >= 0 ? INK : DIM }}>{at >= 0 ? stages[at] : "—"}</span>
      </div>
      <div className="mt-[0.8cqw] flex items-center">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center">
            <span
              className="inline-block h-[2.6cqw] w-[2.6cqw] shrink-0 rounded-full border transition-colors duration-300"
              style={{
                borderColor: i <= at ? INK : DIM,
                background: i < at ? "#122612" : i === at ? INK : BG,
                boxShadow: i === at && !done ? `0 0 0 0.8cqw ${INK}44` : "none",
              }}
            />
            {i < stages.length - 1 ? (
              <span className="h-px flex-1 transition-colors duration-300" style={{ background: i < at ? INK : DIM }} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GhlVisual() {
  const { ref, step } = useStep(GHL_STEPS.length + 3, 900);
  const idx = Math.min(step, GHL_STEPS.length - 1);
  const done = step >= GHL_STEPS.length;
  const current = GHL_STEPS[idx] ?? GHL_STEPS[0];
  const past = GHL_STEPS.slice(0, idx + 1);
  const clientStage = Math.max(-1, ...past.map((s) => s.client ?? -1));
  const hireStage = Math.max(-1, ...past.map((s) => s.hire ?? -1));
  const calling = !done && Boolean(current.call);
  const calls = past.filter((s) => s.call).length;
  const logShown = past.slice(-4);

  return (
    <Screen rootRef={ref} title="GHL // HOMECARE OS" status={done ? "● SYSTEM LIVE" : calling ? "● ON CALL" : "● AUTOMATING"}>
      <div className="grid grid-cols-4 gap-[1.2cqw] text-[2.5cqw]">
        {GHL_MODULES.map((mod) => {
          const on = !done && current.on === mod;
          return (
            <div
              key={mod}
              className="border px-[1cqw] py-[1.2cqw] text-center transition-colors duration-300"
              style={{ borderColor: on || done ? INK : DIM, background: on ? INK : done ? "#122612" : BG, color: on ? BG : done ? INK : DIM }}
            >
              {mod}
            </div>
          );
        })}
      </div>

      <div className="mt-[3cqw] grid gap-[2.6cqw]">
        <GhlPipeline label="CLIENTS" stages={GHL_CLIENT_STAGES} at={clientStage} done={done} />
        <GhlPipeline label="CAREGIVERS" stages={GHL_HIRE_STAGES} at={hireStage} done={done} />
      </div>

      <div className="mt-[3cqw] flex items-center gap-[2cqw] border px-[2cqw] py-[1.4cqw] text-[2.6cqw] transition-colors duration-300" style={{ borderColor: calling ? AMBER : DIM }}>
        <span style={{ color: calling ? AMBER : DIM }}>☎</span>
        <span className="flex h-[4cqw] items-end gap-[0.5cqw]" aria-hidden="true">
          {[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8].map((h, i) => (
            <i
              key={i}
              className="inline-block w-[0.9cqw]"
              style={{
                height: `${(calling ? h : 0.2) * 100}%`,
                background: calling ? AMBER : DIM,
                transformOrigin: "bottom",
                animation: calling ? `pv-wave 0.6s ease-in-out ${i * 0.08}s infinite alternate` : "none",
              }}
            />
          ))}
        </span>
        <span className="truncate" style={{ color: calling ? SOFT : DIM }}>
          {calling ? "ai voice agent on the line…" : `ai agent · ${calls} calls handled`}
        </span>
      </div>

      <div className="mt-auto grid gap-[0.5cqw] text-[2.9cqw]">
        {logShown.map((item, i) => (
          <p key={item.log} className="truncate" style={{ color: i === logShown.length - 1 && !done ? INK : DIM }}>
            {item.log}
          </p>
        ))}
        <Line show={done} color={AMBER}>
          ✓ marketing · sales · staffing · care — one system
        </Line>
      </div>
    </Screen>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case "hema":
      return <HemaVisual />;
    case "leads":
      return <LeadsVisual />;
    case "chatbot":
      return <ChatbotVisual />;
    case "anpr":
      return <AnprVisual />;
    case "rag":
      return <RagVisual />;
    case "agents":
      return <AgentsVisual />;
    case "support":
      return <SupportVisual />;
    case "whatsapp":
      return <WhatsAppVisual />;
    case "ghl":
      return <GhlVisual />;
    default:
      return <WorkflowVisual flow={project.flow ?? []} />;
  }
}
