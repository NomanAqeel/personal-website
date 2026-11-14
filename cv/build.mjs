// Renders cv/resume.template.html -> cv/resume.html using the dates and experience order of the
// active DATE_VERSION in lib/content.ts, so the CV and the site always show the same date set.
// Run via `npm run cv` (cv/build.sh), which then prints the HTML to PDF and page images.
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));

// lib/content.ts has no imports, so transpiling the single file is enough for Node to load it.
const source = readFileSync(join(root, "lib/content.ts"), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const tmp = join(mkdtempSync(join(tmpdir(), "cv-content-")), "content.mjs");
writeFileSync(tmp, outputText);
const content = await import(pathToFileURL(tmp).href);

const { DATE_VERSION, experience, education } = content;
const byId = Object.fromEntries(experience.map((item) => [item.id, item]));

/** Site date strings -> CV wording ("·" separators become "|", "Project-based · 4 months" -> "Project-Based, Part-Time | 4 Months"). */
function cvDate(id) {
  const raw = id === "education" ? education.dates : byId[id].dates;
  const months = raw.match(/(\d+)\s*month/i);
  if (months) return `Project-Based, Part-Time | ${months[1]} Month${months[1] === "1" ? "" : "s"}`;
  return raw.replace(/\s*·\s*/g, " | ");
}

let html = readFileSync(join(root, "cv/resume.template.html"), "utf8");

// 1) Experience blocks, re-ordered to match the active version.
const blocks = {};
html = html.replace(/<!-- exp:([\w-]+) -->([\s\S]*?)<!-- \/exp:\1 -->\n?/g, (_, id, body) => {
  blocks[id] = body;
  return `<!-- exp-slot:${id} -->`;
});
const order = experience.map((item) => item.id);
for (const id of order) if (!blocks[id]) throw new Error(`cv/resume.template.html has no block for experience "${id}"`);
html = html.replace(/(<!-- exp-slot:[\w-]+ -->\n?)+/, order.map((id) => blocks[id]).join(""));

// 2) Date placeholders.
html = html.replace(/\{\{date:([\w-]+)\}\}/g, (_, id) => {
  if (id !== "education" && !byId[id]) throw new Error(`Unknown date placeholder "${id}"`);
  return cvDate(id);
});
if (/\{\{|<!-- exp/.test(html)) throw new Error("Unresolved placeholders remain in the CV template");

writeFileSync(join(root, "cv/resume.html"), html);
console.log(`cv/resume.html rendered with "${DATE_VERSION}" dates: ${order.map((id) => `${id} (${cvDate(id)})`).join(", ")}; education ${cvDate("education")}`);
