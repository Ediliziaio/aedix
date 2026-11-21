/**
 * "La casa digitale": una casa isometrica in costruzione dove ogni parte è un modulo di
 * Edilizia in Cloud che lavora. Fondamenta = cantieri, muro con il preventivo, ingranaggi =
 * magazzino, tetto con i grafici = fatture e margini, gru = app di cantiere. Dati d'oro
 * scorrono da un modulo all'altro. Passando su una parte (o sulla sua scheda) si accende.
 *
 * Tutte le animazioni continue sono SMIL dentro l'SVG (ruotano nel piano isometrico senza
 * problemi di transform-origin); l'ingresso "si costruisce" è CSS. Rispetta prefers-reduced-motion.
 */
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BarChart3, BrainCircuit, Briefcase, FileText, MousePointer2, PackageCheck, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ───────────────────────── Geometria ─────────────────────────
const ISO = 0.866;
const CX = 500;
const CY = 560;
const GOLD = "#F6BE09";

type Pt = [number, number];
const P = (x: number, y: number, z: number): Pt => [CX + (x - y) * ISO, CY + (x + y) * 0.5 - z];
const poly = (...pts: Pt[]) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;
const line = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
const at = ([x, y]: Pt) => `translate(${x.toFixed(1)} ${y.toFixed(1)})`;

// Piani su cui disegnare in "locale": u verso destra/basso nel piano, v verso il basso (o +y sul piano orizzontale).
const PLANE = {
  top: `matrix(${ISO} 0.5 ${-ISO} 0.5 0 0)`,
  left: `matrix(${ISO} 0.5 0 1 0 0)`, // faccia y = costante (davanti a sinistra)
  right: `matrix(${ISO} -0.5 0 1 0 0)`, // faccia x = costante (davanti a destra)
};

type BoxProps = {
  x0: number; x1: number; y0: number; y1: number; z0: number; z1: number;
  top: string; left: string; right: string; stroke?: string; strokeOpacity?: number;
};

const Box = ({ x0, x1, y0, y1, z0, z1, top, left, right, stroke = "#3A5078", strokeOpacity = 1 }: BoxProps) => (
  <g stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth="1" strokeLinejoin="round">
    <path d={poly(P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0))} fill={left} />
    <path d={poly(P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0), P(x1, y0, z0))} fill={right} />
    <path d={poly(P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1))} fill={top} />
  </g>
);

const gearPath = (r: number, teeth: number, depth: number) => {
  const pts: string[] = [];
  const steps = teeth * 4;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r - depth;
    pts.push(`${(rr * Math.cos(a)).toFixed(2)} ${(rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};

// ───────────────────────── Moduli ─────────────────────────
type ModId = "cantieri" | "preventivi" | "magazzino" | "fatture" | "app";

type Mod = {
  id: ModId;
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  anchor: Pt; // punto della casa a cui si collega la scheda
  side: "left" | "right";
  top: number; // posizione della scheda, % dell'altezza
};

const MODS: Mod[] = [
  { id: "app", n: "05", title: "App di cantiere", desc: "Ore, foto e rapportini dal telefono, anche offline", icon: Smartphone, anchor: [500, 128], side: "right", top: 13 },
  { id: "fatture", n: "04", title: "Fatture e margini", desc: "Fatture SDI e margini veri, a cantiere aperto", icon: BarChart3, anchor: P(130, 20, 165), side: "right", top: 37 },
  { id: "magazzino", n: "03", title: "Magazzino e DDT", desc: "Foto della bolla: la merce entra in giacenza", icon: PackageCheck, anchor: P(120, 30, 34), side: "right", top: 61 },
  { id: "preventivi", n: "02", title: "Preventivi e listino", desc: "Sui prezzi del tuo listino, in pochi minuti", icon: FileText, anchor: P(-50, 95, 40), side: "left", top: 42 },
  { id: "cantieri", n: "01", title: "Cantieri e commesse", desc: "Ogni cantiere con ore, costi e avanzamento", icon: Briefcase, anchor: P(-70, 160, -14), side: "left", top: 70 },
];

const CARD_W = 26; // % della larghezza

// ───────────────────────── CSS ─────────────────────────
const CSS = `
.casa-build { animation: casa-build 900ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@keyframes casa-build { from { opacity: 0; transform: translateY(-38px); } }
.casa-fade { animation: casa-fade 900ms ease backwards; }
@keyframes casa-fade { from { opacity: 0; } }
.casa-mod { transition: opacity 300ms ease, filter 300ms ease; }
.casa-stage[data-active] .casa-mod:not([data-on]) { opacity: 0.35; }
.casa-mod[data-on] { filter: drop-shadow(0 0 10px rgb(246 190 9 / 0.45)); }
.casa-card { transition: border-color 300ms ease, box-shadow 300ms ease, background-color 300ms ease; }
.casa-card[data-on] {
  border-color: rgb(246 190 9 / 0.55);
  background-color: rgb(20 34 60 / 0.92);
  box-shadow: 0 18px 40px -18px rgb(246 190 9 / 0.4);
}
.casa-float { animation: casa-float 7s ease-in-out infinite alternate; }
@keyframes casa-float { to { transform: translateY(-8px); } }
.casa-layer { transition: transform 1000ms cubic-bezier(0.22, 1, 0.36, 1); }
.casa-flow { transition: opacity 400ms ease; }
.casa-stage[data-open] .casa-flow { opacity: 0; }
.casa-brain {
  opacity: 0;
  transform: scale(0.6);
  transform-box: fill-box;
  transform-origin: center;
  transition: opacity 500ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.casa-stage[data-open] .casa-brain { opacity: 1; transform: scale(1); transition-delay: 250ms; }
@media (prefers-reduced-motion: reduce) {
  .casa-build, .casa-fade, .casa-float { animation: none; }
  .casa-layer, .casa-brain { transition: none; }
}
`;

// ───────────────────────── Pezzi della casa ─────────────────────────
const ModGroup = ({
  id, active, onEnter, delay, children,
}: { id: ModId; active: ModId | null; onEnter: (id: ModId | null) => void; delay: number; children: ReactNode }) => (
  <g
    className="casa-mod casa-build"
    style={{ animationDelay: `${delay}s`, cursor: "default" }}
    data-on={active === id ? "" : undefined}
    onPointerEnter={(e) => e.pointerType === "mouse" && onEnter(id)}
    onPointerLeave={() => onEnter(null)}
    onClick={() => onEnter(active === id ? null : id)}
  >
    {children}
  </g>
);

// Lotto con la griglia e i cantieri segnati sulla mappa.
const Lotto = () => {
  const lines: string[] = [];
  for (let k = -200; k <= 200; k += 40) {
    lines.push(line(P(k, -190, -14), P(k, 190, -14)));
    lines.push(line(P(-230, k, -14), P(230, k, -14)));
  }
  return (
    <g className="casa-fade">
      <Box x0={-230} x1={230} y0={-190} y1={190} z0={-26} z1={-14} top="#0D1A30" left="#0A1426" right="#08111F" stroke="#22365A" />
      <path d={lines.join("")} stroke="#1E3256" strokeWidth="0.8" fill="none" />
    </g>
  );
};

const Pin = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const base = P(x, y, -14);
  return (
    <g>
      <g transform={`${at(base)} ${PLANE.top}`}>
        <circle r="10" fill="none" stroke={GOLD} strokeWidth="1.2">
          <animate attributeName="r" values="6;22" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
        </circle>
        <circle r="4" fill={GOLD} opacity="0.5" />
      </g>
      <g transform={at([base[0], base[1] - 22])}>
        <path d="M0 22C-2 15 -9 10 -9 3A9 9 0 0 1 9 3C9 10 2 15 0 22Z" fill={GOLD} />
        <circle cy="3" r="3.4" fill="#0B1628" />
      </g>
    </g>
  );
};

const Fondamenta = () => (
  <g>
    <Box x0={-135} x1={135} y0={-95} y1={95} z0={-14} z1={0} top="#1A2B4A" left="#14223C" right="#101C32" stroke="#3A5078" />
    {/* bordo d'oro che pulsa: la base dati di tutti i cantieri */}
    <path d={poly(P(-135, -95, 0), P(135, -95, 0), P(135, 95, 0), P(-135, 95, 0))} fill="none" stroke={GOLD} strokeWidth="1.4">
      <animate attributeName="opacity" values="0.25;0.9;0.25" dur="4s" repeatCount="indefinite" />
    </path>
    <Pin x={-70} y={160} delay={0} />
    <Pin x={-185} y={60} delay={0.8} />
    <Pin x={190} y={150} delay={1.6} />
  </g>
);

// Piano terra di vetro, con il preventivo che si compila sul muro di sinistra.
const PianoTerra = () => (
  <g>
    <Box x0={-120} x1={120} y0={-80} y1={80} z0={0} z1={62} top="rgba(40,64,104,0.55)" left="rgba(52,86,140,0.30)" right="rgba(40,68,116,0.34)" stroke="#5A76A6" />
    {/* porta */}
    <g transform={`${at(P(-110, 80, 52))} ${PLANE.left}`}>
      <rect width="30" height="52" rx="2" fill="rgba(8,16,30,0.6)" stroke="#5A76A6" />
    </g>
    {/* il preventivo */}
    <g transform={`${at(P(-62, 80, 54))} ${PLANE.left}`}>
      <rect width="118" height="44" rx="3" fill="#F4F1E8" opacity="0.95" />
      <rect width="118" height="8" rx="2" fill={GOLD} />
      {[14, 21, 28, 35].map((y, i) => (
        <path key={y} d={`M8 ${y}H${i === 3 ? 60 : 92}`} stroke="#2A3A55" strokeWidth="2.2" strokeDasharray="90" strokeDashoffset="90">
          <animate attributeName="stroke-dashoffset" values="90;0;0;90" keyTimes="0;0.35;0.85;1" dur="5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
      <g transform="translate(100 32)">
        <circle r="8" fill="#10B981">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.85;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <path d="M-3.5 0L-1 2.6L4 -2.8" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.85;1" dur="5s" repeatCount="indefinite" />
        </path>
      </g>
    </g>
    {/* finestra sul lato destro */}
    <g transform={`${at(P(120, -22, 50))} ${PLANE.right}`}>
      <rect width="46" height="30" rx="2" fill="rgba(8,16,30,0.5)" stroke="#5A76A6" />
    </g>
  </g>
);

// Gli ingranaggi del magazzino, montati sul muro di destra.
const Ingranaggi = () => (
  <g>
    <g transform={`${at(P(120, 50, 32))} ${PLANE.right}`}>
      <g>
        <path d={gearPath(26, 14, 5)} fill="#E0A300" stroke="#FFE08A" strokeWidth="0.8" />
        <circle r="9" fill="#0B1628" stroke="#FFE08A" strokeWidth="0.8" />
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="9s" repeatCount="indefinite" />
      </g>
      <g transform="translate(42 -14)">
        <g>
          <path d={gearPath(17, 9, 4.5)} fill={GOLD} stroke="#FFE08A" strokeWidth="0.8" />
          <circle r="4.5" fill="#0B1628" />
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="6s" repeatCount="indefinite" />
        </g>
      </g>
      <g transform="translate(-10 -36)">
        <g>
          <path d={gearPath(12, 8, 3.5)} fill="#B88400" stroke="#FFE08A" strokeWidth="0.6" />
          <circle r="3" fill="#0B1628" />
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="5s" repeatCount="indefinite" />
        </g>
      </g>
    </g>
  </g>
);

// Le casse sul lotto: una entra in casa, cioè in giacenza.
const Casse = () => (
  <g>
    <Box x0={160} x1={190} y0={60} y1={90} z0={-14} z1={14} top="#C9923A" left="#9C6E28" right="#83591F" stroke="#5A3E14" />
    <Box x0={160} x1={190} y0={95} y1={125} z0={-14} z1={14} top="#C9923A" left="#9C6E28" right="#83591F" stroke="#5A3E14" />
    <g>
      <Box x0={160} x1={190} y0={60} y1={90} z0={14} z1={40} top="#D8A24A" left="#A8762C" right="#8E6222" stroke="#5A3E14" />
      <animateTransform attributeName="transform" type="translate" values="0 0;-26 -15;-26 -15;0 0" keyTimes="0;0.45;0.9;1" dur="6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0;0;1" keyTimes="0;0.45;0.9;1" dur="6s" repeatCount="indefinite" />
    </g>
  </g>
);

// Primo piano in costruzione: pilastri, travi, un pannello che va in posa, ponteggio.
const PrimoPiano = () => {
  const cols: [number, number][] = [[-120, -80], [120, -80], [120, 80], [-120, 80], [0, 80], [120, 0]];
  return (
    <g>
      <Box x0={-124} x1={124} y0={-84} y1={84} z0={62} z1={70} top="#24385C" left="#1A2A46" right="#15233C" stroke="#4A6290" />
      <g stroke="#7F98C4" strokeWidth="2" strokeLinecap="round">
        {cols.map(([x, y]) => (
          <path key={`${x}${y}`} d={line(P(x, y, 70), P(x, y, 130))} />
        ))}
      </g>
      <path
        d={[line(P(-120, 80, 130), P(120, 80, 130)), line(P(120, 80, 130), P(120, -80, 130)), line(P(-120, -80, 130), P(120, -80, 130)), line(P(-120, -80, 130), P(-120, 80, 130))].join("")}
        stroke="#7F98C4"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 4"
      />
      {/* pannello di vetro che scende in posa */}
      <g>
        <path d={poly(P(0, 80, 128), P(120, 80, 128), P(120, 80, 72), P(0, 80, 72))} fill="rgba(52,86,140,0.38)" stroke={GOLD} strokeWidth="1.2" />
        <animateTransform attributeName="transform" type="translate" values="0 -46;0 0;0 0;0 -46" keyTimes="0;0.4;0.85;1" dur="7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.4;0.85;1" dur="7s" repeatCount="indefinite" />
      </g>
      <path d={poly(P(120, -80, 128), P(120, 0, 128), P(120, 0, 72), P(120, -80, 72))} fill="rgba(40,68,116,0.34)" stroke="#5A76A6" />
      {/* ponteggio davanti a sinistra */}
      <g stroke="#6E86B0" strokeWidth="1" opacity="0.8">
        {[-120, -80, -40].map((x) => (
          <path key={x} d={line(P(x, 100, -14), P(x, 100, 140))} />
        ))}
        {[30, 70, 110].map((z) => (
          <path key={z} d={line(P(-124, 100, z), P(-36, 100, z))} />
        ))}
        <path d={line(P(-120, 100, 30), P(-80, 100, 70)) + line(P(-80, 100, 70), P(-40, 100, 110))} />
      </g>
    </g>
  );
};

// Tetto con i grafici dei margini sul timpano.
const Tetto = () => {
  const bars = [
    { u: 14, h: 22 },
    { u: 32, h: 34 },
    { u: 50, h: 44 },
    { u: 68, h: 30 },
  ];
  return (
    <g>
      <path d={poly(P(-130, 0, 200), P(130, 0, 200), P(130, -90, 130), P(-130, -90, 130))} fill="#1E3052" stroke="#4A6290" />
      <path d={poly(P(-130, 0, 200), P(130, 0, 200), P(130, 90, 130), P(-130, 90, 130))} fill="#22385E" fillOpacity="0.82" stroke="#5A76A6" />
      <g stroke="#3A5480" strokeWidth="0.8">
        {[0.25, 0.5, 0.75].map((t) => (
          <path key={t} d={line(P(-130, 90 * t, 200 - 70 * t), P(130, 90 * t, 200 - 70 * t))} />
        ))}
      </g>
      <path d={line(P(-130, 0, 200), P(130, 0, 200))} stroke={GOLD} strokeWidth="1.6" />
      <path d={poly(P(130, -90, 130), P(130, 90, 130), P(130, 0, 200))} fill="#18294A" stroke="#5A76A6" />
      <g transform={`${at(P(130, 48, 132))} ${PLANE.right}`}>
        {bars.map(({ u, h }, i) => (
          <rect key={u} x={u - 5} y={-h} width="10" height={h} rx="1.5" fill={i === 2 ? GOLD : "#8FA6CF"}>
            <animate attributeName="height" values={`${h * 0.3};${h};${h};${h * 0.3}`} keyTimes="0;0.3;0.8;1" dur="4.5s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${-h * 0.3};${-h};${-h};${-h * 0.3}`} keyTimes="0;0.3;0.8;1" dur="4.5s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <path d="M9 -26L27 -38L45 -48L63 -34" stroke="#10B981" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// La gru dietro la casa: il braccio ruota nel piano, in cabina c'è il telefono che manda i dati.
const Gru = () => {
  const base: [number, number] = [-150, -170];
  const H = 290;
  const mast: string[] = [];
  for (let z = 0; z < H; z += 26) {
    mast.push(line(P(base[0], base[1], z), P(base[0] + 14, base[1], z + 26)));
    mast.push(line(P(base[0] + 14, base[1], z), P(base[0], base[1], z + 26)));
  }
  const cab = P(base[0] + 7, base[1] + 7, H + 10);
  return (
    <g>
      <g stroke="#6E86B0" strokeWidth="1.4">
        <path d={line(P(base[0], base[1], -14), P(base[0], base[1], H))} />
        <path d={line(P(base[0] + 14, base[1], -14), P(base[0] + 14, base[1], H))} />
        <path d={line(P(base[0], base[1] + 14, -14), P(base[0], base[1] + 14, H))} />
      </g>
      <path d={mast.join("")} stroke="#4E6890" strokeWidth="0.8" />
      {/* braccio che gira */}
      <g transform={`${at(P(base[0] + 7, base[1] + 7, H))} ${PLANE.top}`}>
        <g>
          <path d="M-70 -4H200V4H-70Z" fill="#E0A300" stroke="#FFE08A" strokeWidth="0.6" />
          <path d="M0 0L50 -2L100 0L150 -2L195 0" stroke="#7A5A00" strokeWidth="1" fill="none" />
          <rect x="-74" y="-12" width="22" height="24" fill="#3A4E70" stroke="#6E86B0" />
          <g transform="translate(180 0)">
            <rect x="-9" y="-9" width="18" height="18" fill="#C9923A" stroke="#5A3E14" />
            <animateTransform attributeName="transform" type="translate" values="180 0;100 0;180 0" dur="8s" repeatCount="indefinite" />
          </g>
          <animateTransform attributeName="transform" type="rotate" values="-55 0 0;10 0 0;-55 0 0" dur="12s" repeatCount="indefinite" />
        </g>
      </g>
      {/* cabina con il segnale dell'app */}
      <g transform={at(cab)}>
        <rect x="-11" y="-14" width="22" height="18" rx="3" fill="#24385C" stroke="#7F98C4" />
        <rect x="-4" y="-11" width="8" height="12" rx="1.5" fill={GOLD} />
        {[0, 1, 2].map((i) => (
          <circle key={i} r="12" fill="none" stroke={GOLD} strokeWidth="1">
            <animate attributeName="r" values="10;34" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </g>
  );
};

// Il percorso dei dati: dall'app al preventivo, al magazzino, al tetto, giù fino ai cantieri.
const FLOW: Pt[] = [
  [500, 128],
  P(-50, 95, 40),
  P(-130, 120, -14),
  P(60, 120, -14),
  P(120, 54, 30),
  P(130, 20, 150),
  P(0, 0, 200),
];
const FLOW_PATH = `M${FLOW.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`;

const DataFlow = () => (
  <g className="casa-fade" style={{ animationDelay: "1.4s" }}>
    <path d={FLOW_PATH} fill="none" stroke={GOLD} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle r="7" fill={GOLD} opacity="0.18" />
        <circle r="3" fill={GOLD} />
        <animateMotion dur="9s" begin={`${-i * 2.25}s`} repeatCount="indefinite" path={FLOW_PATH} />
      </g>
    ))}
  </g>
);

// ───────────────────────── Schede ─────────────────────────
const Card = ({ mod, on, onEnter }: { mod: Mod; on: boolean; onEnter: (id: ModId | null) => void }) => {
  const Icon = mod.icon;
  const left = mod.side === "left" ? 0 : 100 - CARD_W;
  return (
    <li
      style={{ top: `${mod.top}%`, left: `${left}%`, width: `${CARD_W}%` }}
      className="pointer-events-auto absolute -translate-y-1/2"
      onPointerEnter={(e) => e.pointerType === "mouse" && onEnter(mod.id)}
      onPointerLeave={() => onEnter(null)}
    >
      <div
        data-on={on ? "" : undefined}
        className="casa-card rounded-[1.1em] border border-white/10 bg-[rgba(13,26,47,0.82)] px-[0.9em] py-[0.75em] backdrop-blur-md"
      >
        <div className="flex items-center gap-[0.5em]">
          <Icon className="size-[1.2em] shrink-0 text-primary" strokeWidth={1.7} aria-hidden />
          <span className="font-mono text-[0.75em] text-white/45">{mod.n}</span>
          <p className="font-display text-[1em] font-semibold leading-tight text-white">{mod.title}</p>
        </div>
        <p className="mt-[0.35em] text-[0.85em] leading-[1.4] text-white/60">{mod.desc}</p>
      </div>
    </li>
  );
};

// ───────────────────────── La casa che si apre ─────────────────────────
// Di quanto si sposta ogni strato quando la casa si spezza (unità del disegno).
type Off = [number, number];
const LAYER: Record<"terra" | "pianoterra" | "primo" | "tetto" | "gru", Off> = {
  terra: [0, 70],
  pianoterra: [0, 10],
  primo: [0, -200],
  tetto: [0, -300],
  gru: [-70, -40],
};
const MOD_LAYER: Record<ModId, keyof typeof LAYER> = {
  cantieri: "terra",
  preventivi: "pianoterra",
  magazzino: "pianoterra",
  fatture: "tetto",
  app: "gru",
};
// Le casse stanno sul lotto: si muovono col terreno, non col piano terra.
const offOf = (id: ModId, open: boolean): Off => (open ? LAYER[MOD_LAYER[id]] : [0, 0]);
const anchorOf = (m: Mod, open: boolean): Pt => {
  const [dx, dy] = offOf(m.id, open);
  return [m.anchor[0] + dx, m.anchor[1] + dy];
};

const Layer = ({ off, open, delay, children }: { off: Off; open: boolean; delay: number; children: ReactNode }) => (
  <g
    className="casa-layer"
    style={{
      transform: open ? `translate(${off[0]}px, ${off[1]}px)` : "translate(0px, 0px)",
      transitionDelay: `${open ? delay : 0.15 - delay / 4}s`,
    }}
  >
    {children}
  </g>
);

// Il cervello AI che compare nello spazio tra i piani e li collega tutti.
const BRAIN: Pt = [500, 452];
const BEAMS: Pt[] = [
  [295, 610], // fondamenta
  [327, 488], // piano terra
  [673, 310], // primo piano
  [612, 160], // tetto
  [430, 88], // gru
];

const Cervello = () => (
  <g className="casa-brain">
    <g transform={`${at(BRAIN)} ${PLANE.top}`}>
      <g>
        <circle r="150" fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="24 14" opacity="0.7" />
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="14s" repeatCount="indefinite" />
      </g>
      <g>
        <circle r="110" fill="none" stroke="#8FA6CF" strokeWidth="1" strokeDasharray="3 8" opacity="0.6" />
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="20s" repeatCount="indefinite" />
      </g>
      <circle r="150" fill={GOLD} opacity="0.06" />
    </g>
    {BEAMS.map(([x, y], i) => (
      <g key={i}>
        <path d={`M${BRAIN[0]} ${BRAIN[1]}L${x} ${y}`} stroke={GOLD} strokeWidth="1.4" strokeDasharray="5 7" opacity="0.75">
          <animate attributeName="stroke-dashoffset" values="0;-24" dur="0.8s" repeatCount="indefinite" />
        </path>
        <circle cx={x} cy={y} r="5" fill={GOLD} />
        <g>
          <circle r="3.5" fill="#FFF2C2" />
          <animateMotion dur="1.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" path={`M${BRAIN[0]} ${BRAIN[1]}L${x} ${y}`} />
        </g>
      </g>
    ))}
    <g transform={at(BRAIN)}>
      <circle r="62" fill={GOLD} opacity="0.12">
        <animate attributeName="r" values="56;72;56" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle r="46" fill="#0B1628" stroke={GOLD} strokeWidth="2" />
      <BrainCircuit x={-26} y={-26} width={52} height={52} color={GOLD} strokeWidth={1.6} />
      <text y="72" textAnchor="middle" fontSize="15" letterSpacing="3" fontFamily="JetBrains Mono, monospace" fill={GOLD}>
        AGENTI AI
      </text>
    </g>
  </g>
);

const Connectors = ({ active, open }: { active: ModId | null; open: boolean }) => (
  <svg viewBox="0 0 1000 1000" aria-hidden className="pointer-events-none absolute inset-0 hidden size-full overflow-visible md:block">
    {MODS.map((m) => {
      const x = m.side === "left" ? CARD_W * 10 + 6 : 1000 - CARD_W * 10 - 6;
      const y = m.top * 10;
      const on = active === m.id;
      const [ax, ay] = anchorOf(m, open);
      return (
        <g key={m.id}>
          <path d={`M${x} ${y}L${ax} ${ay}`} stroke={on ? GOLD : "#5A76A6"} strokeOpacity={on ? 1 : 0.7} strokeWidth={on ? 1.6 : 1} strokeDasharray={on ? undefined : "3 4"} />
          <circle cx={x} cy={y} r="3.5" fill={GOLD} />
          <circle cx={ax} cy={ay} r={on ? 6 : 3.5} fill={on ? GOLD : "#8FA6CF"} />
        </g>
      );
    })}
  </svg>
);

// ───────────────────────── Export ─────────────────────────
const EicCasaDigitale = () => {
  const [active, setActive] = useState<ModId | null>(null);
  const [open, setOpen] = useState(false);
  const touched = useRef(false);

  // Una volta, dopo che la casa si è costruita, si apre da sola per qualche secondo:
  // così si capisce che dentro c'è qualcosa. Appena l'utente interagisce, decide lui.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = window.setTimeout(() => !touched.current && setOpen(true), 2600);
    const t2 = window.setTimeout(() => !touched.current && setOpen(false), 6200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const enterPart = (id: ModId | null) => {
    touched.current = true;
    setActive(id);
    if (id) setOpen(true);
  };

  return (
    <div className="w-full">
      <style>{CSS}</style>
      <div
        className="casa-stage relative mx-auto aspect-square w-full max-w-[760px]"
        style={{ containerType: "inline-size" }}
        data-active={active ? "" : undefined}
        data-open={open ? "" : undefined}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          touched.current = true;
          setOpen(true);
        }}
        onPointerLeave={() => {
          setOpen(false);
          setActive(null);
        }}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
          touched.current = true;
          setOpen((v) => !v);
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(70,110,180,0.22),transparent)]" />
        <div className="casa-float absolute inset-0">
          <svg viewBox="0 0 1000 1000" role="img" aria-label="Una casa in costruzione: ogni parte è un modulo di Edilizia in Cloud al lavoro" className="absolute inset-0 size-full overflow-visible">
            <Layer off={LAYER.gru} open={open} delay={0.2}>
              <ModGroup id="app" active={active} onEnter={enterPart} delay={0.1}><Gru /></ModGroup>
            </Layer>
            <Layer off={LAYER.terra} open={open} delay={0}>
              <Lotto />
              <ModGroup id="cantieri" active={active} onEnter={enterPart} delay={0.3}><Fondamenta /></ModGroup>
              <ModGroup id="magazzino" active={active} onEnter={enterPart} delay={0.5}><Casse /></ModGroup>
            </Layer>
            <Layer off={LAYER.pianoterra} open={open} delay={0.05}>
              <ModGroup id="preventivi" active={active} onEnter={enterPart} delay={0.6}><PianoTerra /></ModGroup>
              <ModGroup id="magazzino" active={active} onEnter={enterPart} delay={0.75}><Ingranaggi /></ModGroup>
            </Layer>
            <Cervello />
            <Layer off={LAYER.primo} open={open} delay={0.1}>
              <g className="casa-build" style={{ animationDelay: "0.85s" }}><PrimoPiano /></g>
            </Layer>
            <Layer off={LAYER.tetto} open={open} delay={0.15}>
              <ModGroup id="fatture" active={active} onEnter={enterPart} delay={1.05}><Tetto /></ModGroup>
            </Layer>
            <g className="casa-flow"><DataFlow /></g>
          </svg>
          <Connectors active={active} open={open} />
          <ul className="pointer-events-none absolute inset-0 m-0 hidden list-none p-0 text-[clamp(10px,1.75cqw,14px)] md:block">
            {MODS.map((m) => (
              <Card key={m.id} mod={m} on={active === m.id} onEnter={enterPart} />
            ))}
          </ul>
        </div>
        <p className="pointer-events-none absolute bottom-[2%] left-1/2 m-0 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[1.5px] text-white/50">
          <MousePointer2 className="size-3.5 text-primary" strokeWidth={1.8} aria-hidden />
          <span className="[@media(hover:none)]:hidden">Passa sopra: la casa si apre</span>
          <span className="hidden [@media(hover:none)]:inline">Tocca: la casa si apre</span>
        </p>
      </div>

      {/* Telefono: le schede sotto la casa */}
      <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-2.5 p-0 text-[13px] sm:grid-cols-2 md:hidden">
        {[...MODS].reverse().map((m) => {
          const Icon = m.icon;
          return (
            <li
              key={m.id}
              data-on={active === m.id ? "" : undefined}
              onClick={() => setActive(active === m.id ? null : m.id)}
              className={cn("casa-card rounded-2xl border border-white/10 bg-[rgba(13,26,47,0.82)] px-4 py-3")}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-primary" strokeWidth={1.7} aria-hidden />
                <span className="font-mono text-[11px] text-white/45">{m.n}</span>
                <p className="font-display font-semibold text-white">{m.title}</p>
              </div>
              <p className="mt-1 text-white/60">{m.desc}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EicCasaDigitale;
