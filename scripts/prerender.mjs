// Prerendering statico (SSG) — eseguito dopo `vite build`.
//
// Per ogni URL nelle sitemap genera dist/<path>/index.html con:
//  - contenuto completo renderizzato (leggibile dai crawler AI senza JS)
//  - head per-pagina da react-helmet-async (title, meta, canonical, JSON-LD)
// Il blocco tra <!-- ssg-head-start --> e <!-- ssg-head-end --> del template
// viene sostituito con i tag della pagina; JSON-LD statici, GA e font restano.
//
// Su Vercel i file generati hanno precedenza sulla rewrite SPA (filesystem-first).

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

// ── 1. Route dalle sitemap (fonte di verità unica) ──────────────────────────
const routes = new Set();
for (const file of ["sitemap.xml", "sitemap-articles.xml"]) {
  const xml = readFileSync(resolve(root, "public", file), "utf-8");
  for (const m of xml.matchAll(/<loc>https:\/\/www\.aedix\.it(\/[^<]*)<\/loc>/g)) {
    routes.add(m[1].replace(/\/$/, "") || "/");
  }
}

// ── 2. Template e bundle SSR ─────────────────────────────────────────────────
const template = readFileSync(resolve(dist, "index.html"), "utf-8");
const START = "<!-- ssg-head-start -->";
const END = "<!-- ssg-head-end -->";
if (!template.includes(START) || !template.includes(END)) {
  console.error("✗ Marker ssg-head mancanti in index.html");
  process.exit(1);
}

const ssrDir = resolve(root, "dist-ssr");
const entryFile = readdirSync(ssrDir).find((f) => f.startsWith("entry-server") && f.endsWith(".js"));
const { render } = await import(pathToFileURL(resolve(ssrDir, entryFile)).href);

// ── 3. Render e scrittura ────────────────────────────────────────────────────
// framer-motion renderizza gli stati iniziali delle animazioni (opacity:0,
// translateY) negli style inline: nell'HTML statico vanno neutralizzati o i
// crawler vedrebbero contenuto "nascosto". Il client React rimonta da zero,
// quindi le animazioni restano intatte per gli utenti.
const fixMotionStyles = (html) =>
  html
    .replace(/opacity: ?0(?![.\d])/g, "opacity:1")
    .replace(/transform: ?translate[XY]?\((?:-?\d+(?:\.\d+)?(?:px|%)(?:, ?)?)+\)(?: translateZ\(0\))?/g, "transform:none");

let ok = 0;
const failed = [];
for (const route of [...routes].sort()) {
  try {
    const { appHtml, helmet } = render(route);
    const head = [
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
    ].join("\n    ");

    const html = template
      .replace(new RegExp(`${START}[\\s\\S]*?${END}`), head)
      .replace('<div id="root"></div>', `<div id="root">${fixMotionStyles(appHtml)}</div>`);

    const outDir = route === "/" ? dist : resolve(dist, route.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html);
    ok++;
  } catch (e) {
    failed.push(`${route}: ${e.message}`);
  }
}

console.log(`✓ Prerender: ${ok}/${routes.size} pagine generate`);
if (failed.length) {
  console.error("✗ Fallite:\n  " + failed.join("\n  "));
  process.exit(1);
}
process.exit(0);
