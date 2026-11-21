/**
 * Hero della home AEDIX: il "nucleo" isometrico che, al passaggio del mouse (o al tocco),
 * si apre nei cinque strati del sistema AI ibrido. Adattato dal blocco "syntra hero"
 * (motionuikit) al tema AEDIX: blu notte, oro, testi in italiano, marchio "A" sul coperchio.
 *
 * Differenze rispetto all'originale:
 * - framer-motion al posto di `motion/react` (stessa libreria, stesse API);
 * - classi riscritte per Tailwind 3 (il progetto non usa Tailwind 4);
 * - niente navbar propria: la pagina usa già quella del sito;
 * - al posto dei loghi di app terze, icone lucide (non dichiariamo integrazioni che non ci sono).
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type {
  CSSProperties,
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  SVGProps,
} from "react";
import { Link } from "react-router-dom";
import {
  LazyMotion,
  animate,
  domAnimation,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Cable,
  ChartNoAxesColumnIncreasing,
  Clock,
  Cpu,
  FileText,
  Globe,
  HardHat,
  Layers,
  Megaphone,
  MessageCircle,
  MousePointer2,
  Play,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ───────────────────────── Stili del blocco ─────────────────────────
const BLOCK_CSS = `
.n3-root {
  --n3-ink: #ffffff;
  --n3-grey: rgba(255, 255, 255, 0.62);
  --n3-line: rgba(255, 255, 255, 0.12);
  --n3-accent: #f6be09;
  --n3-accent-ink: #091629;
  --n3-gutter: 20px;
}
@media (min-width: 640px) { .n3-root { --n3-gutter: 24px; } }
@media (min-width: 1024px) { .n3-root { --n3-gutter: 32px; } }
@media (min-width: 1280px) { .n3-root { --n3-gutter: 48px; } }

.n3-frame { padding-left: var(--n3-gutter); padding-right: var(--n3-gutter); }

/* La navbar del sito è fissa: l'hero riempie lo schermo e lascia il suo spazio in alto. */
.n3-hero { min-height: 100dvh; padding-top: 88px; }
@media (min-width: 640px) { .n3-hero { padding-top: 96px; } }
@media (max-width: 1023px) { .n3-hero { min-height: 0; } }

.n3-h1 {
  font-size: clamp(2.5rem, 1.1rem + 3.6vw, 4.6rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

/* Sfondo: la notte del sito, con una luce calda dietro il nucleo. */
.n3-bg {
  background:
    radial-gradient(ellipse 55% 65% at 74% 52%, rgb(52 86 140 / 0.32) 0%, rgb(52 86 140 / 0) 70%),
    radial-gradient(ellipse 38% 42% at 76% 58%, rgb(246 190 9 / 0.09) 0%, rgb(246 190 9 / 0) 70%),
    radial-gradient(ellipse 50% 40% at 100% 0%, rgb(255 255 255 / 0.04) 0%, rgb(255 255 255 / 0) 70%);
}
.n3-halo {
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgb(70 110 180 / 0.22), rgb(70 110 180 / 0));
}

.n3-floor, .n3-floor-lit {
  --n3-floor-area: radial-gradient(ellipse 75% 80% at 72% 70%, #000 20%, transparent 100%);
  --n3-floor-edges: linear-gradient(to left, transparent 0%, #000 22%), linear-gradient(to top, transparent 0%, #000 28%);
  -webkit-mask-image: var(--n3-floor-area), var(--n3-floor-edges);
  mask-image: var(--n3-floor-area), var(--n3-floor-edges);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
.n3-floor { opacity: 0.55; }
.n3-floor-spot {
  position: absolute; top: 0; left: 0; opacity: 0;
  transition: opacity 400ms ease;
  will-change: transform, opacity;
  -webkit-mask-image: radial-gradient(closest-side, #000 0%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 0%, transparent 100%);
}
.n3-floor-lit { position: absolute; top: 0; left: 0; will-change: transform; }
[data-spot='on'] > .n3-floor-spot { opacity: 0.75; }
@media (max-width: 1023px) {
  .n3-floor, .n3-floor-lit {
    --n3-floor-area: radial-gradient(ellipse 90% 60% at 50% 75%, #000 20%, transparent 100%);
  }
}

.n3-fade-edge {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 14%);
  mask-image: linear-gradient(to right, transparent 0%, #000 14%);
}
@media (max-width: 1023px) {
  .n3-fade-edge { -webkit-mask-image: none; mask-image: none; }
}

/* Etichetta che si ribalta come un cubo al passaggio del mouse. */
.n3-flip { perspective: 600px; }
.n3-flip-box {
  --d: 0.75em;
  display: inline-grid;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--d) * -1)) rotateX(0deg);
  transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
}
.n3-flip-face {
  grid-area: 1 / 1;
  display: inline-flex; height: 1.5em; align-items: center; justify-content: center;
  line-height: 1.5em;
  backface-visibility: hidden;
  transform: translateZ(var(--d));
}
.n3-flip-back { transform: rotateX(-90deg) translateZ(var(--d)); }
.n3-flip:hover .n3-flip-box, .n3-flip:focus-visible .n3-flip-box {
  transform: translateZ(calc(var(--d) * -1)) rotateX(90deg);
}
@media (prefers-reduced-motion: reduce) {
  .n3-flip-box { transition: none; }
  .n3-flip:hover .n3-flip-box, .n3-flip:focus-visible .n3-flip-box { transform: translateZ(calc(var(--d) * -1)); }
}

.n3-dot { box-shadow: 0 0 0 4px rgb(246 190 9 / 0.18); }

.n3-rise { animation: n3-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.n3-enter { animation: n3-enter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 250ms backwards; }
@keyframes n3-rise { from { opacity: 0; translate: 0 18px; } }
@keyframes n3-enter { from { opacity: 0; scale: 0.97; } }
@media (prefers-reduced-motion: reduce) { .n3-rise, .n3-enter { animation: none; } }

@keyframes n3-float {
  from { transform: translateY(0); }
  to { transform: translateY(calc(var(--n3-float, 6) * -1px)); }
}
.n3-float { animation: n3-float var(--n3-float-seconds, 6.5s) ease-in-out infinite alternate; }
@keyframes n3-seam { from { opacity: 0.7; } to { opacity: 1; } }
.n3-seam-pulse { animation: n3-seam 4.8s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .n3-float, .n3-seam-pulse { animation: none; } }

/* Schede degli strati: vetro scuro che copre le linee dietro al testo. */
.n3-stage-card {
  border: 1px solid rgb(255 255 255 / 0.09);
  border-radius: 1.3em;
  background: rgb(13 26 47 / 0.84);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.2),
    0 18px 38px -18px rgb(0 0 0 / 0.7),
    inset 0 1px 0 rgb(255 255 255 / 0.06);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  transition: border-color 300ms ease, box-shadow 300ms ease;
}
.n3-stage-card-lit {
  border-color: rgb(246 190 9 / 0.45);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.2),
    0 18px 40px -18px rgb(246 190 9 / 0.35),
    inset 0 1px 0 rgb(255 255 255 / 0.06);
}
@container (max-width: 640px) { .n3-stage-apps { display: none; } }
`;

// ───────────────────────── Geometria isometrica ─────────────────────────
const ISO_X = 0.866;
const ISO_Y = 0.5;
const CX = 500;
const CY = 500;
const RING_FLATTEN = 0.57;
const RING_RX = [400, 530] as const;

type SlabType = { half: number; radius: number; top: number; depth: number };

const BASE: SlabType = { half: 168, radius: 40, top: 475, depth: 34 };
const SEAM_GAP = 9;
const MID: SlabType = { half: 151, radius: 36, top: BASE.top - SEAM_GAP - 28, depth: 28 };
const CAP: SlabType = { half: 101, radius: 28, top: MID.top - 14, depth: 14 };

type Point = [number, number];

const round = (n: number) => Math.round(n * 100) / 100;

const project = (x: number, y: number, cx = CX, cy = CY): Point => [cx + (x - y) * ISO_X, cy + (x + y) * ISO_Y];

const footprint = (half: number, radius: number, steps = 14): Point[] => {
  const r = Math.min(radius, half);
  const c = half - r;
  const corners: [number, number, number][] = [
    [c, c, 0],
    [-c, c, 90],
    [-c, -c, 180],
    [c, -c, 270],
  ];
  const pts: Point[] = [];
  for (const [ox, oy, start] of corners) {
    for (let i = 0; i <= steps; i++) {
      const a = ((start + (90 * i) / steps) * Math.PI) / 180;
      pts.push([ox + r * Math.cos(a), oy + r * Math.sin(a)]);
    }
  }
  return pts;
};

const toPath = (pts: Point[]) => `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`;

const topPath = (slab: SlabType, inset = 0, cx = CX, dy = 0) => {
  const half = slab.half - inset;
  const radius = Math.max(slab.radius - inset, 1);
  return toPath(footprint(half, radius).map(([x, y]) => project(x, y, cx, slab.top + dy)));
};

const hull = (points: Point[]): Point[] => {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list: Point[]) => {
    const out: Point[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...build(pts), ...build([...pts].reverse())];
};

const bodyPath = (slab: SlabType, inset = 0) => {
  const half = slab.half - inset;
  const radius = Math.max(slab.radius - inset, 1);
  const outline = footprint(half, radius);
  const upper = outline.map(([x, y]) => project(x, y, CX, slab.top));
  const lower = outline.map(([x, y]) => project(x, y, CX, slab.top + slab.depth));
  return toPath(hull([...upper, ...lower]));
};

const facePoint = (slab: SlabType, side: "left" | "right", u: number, v: number): Point => {
  const { half, top, depth } = slab;
  if (side === "left") {
    const [x, y] = project(-half + 2 * half * u, half, CX, top);
    return [x, y + depth * v];
  }
  const [x, y] = project(half, half - 2 * half * u, CX, top);
  return [x, y + depth * v];
};

const FACE_MATRIX = {
  left: `${ISO_X} ${ISO_Y} 0 1`,
  right: `${ISO_X} ${-ISO_Y} 0 1`,
  top: `${ISO_X} ${ISO_Y} ${-ISO_X} ${ISO_Y}`,
};

const ringPoint = (rx: number, angleDeg: number): Point => {
  const a = (angleDeg * Math.PI) / 180;
  return [round(CX + rx * Math.cos(a)), round(CY + rx * RING_FLATTEN * Math.sin(a))];
};

const ringPath = (rx: number) => {
  const ry = rx * RING_FLATTEN;
  return `M${CX + rx} ${CY}A${rx} ${ry} 0 1 1 ${CX - rx} ${CY}A${rx} ${ry} 0 1 1 ${CX + rx} ${CY}Z`;
};

// ───────────────────────── Marchio AEDIX ─────────────────────────
// La "A" del logo: due gambe, la traversa e la X sotto, in un riquadro -25..25.
const MARK_PATH = "M0 -22L-17 22M0 -22L17 22M-10.6 5.5H10.6M-10.6 5.5L17 22M10.6 5.5L-17 22";

const AedixGlyph = ({ stroke, width = 4, opacity = 1 }: { stroke: string; width?: number; opacity?: number }) => (
  <path
    d={MARK_PATH}
    fill="none"
    stroke={stroke}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={opacity}
  />
);

// ───────────────────────── Parti del nucleo ─────────────────────────
const GOLD = "#F6BE09";

type FaceProps = { slab: SlabType; side: "left" | "right"; u: number; v: number };

const FaceMark = ({
  slab,
  side,
  u,
  v,
  w,
  h,
  fill,
  glow,
}: FaceProps & { w: number; h: number; fill: string; glow?: boolean }) => {
  const [x, y] = facePoint(slab, side, u, v);
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) matrix(${FACE_MATRIX[side]} 0 0)`}>
      {glow && (
        <rect
          x={-w / 2 - 2}
          y={-h / 2 - 3}
          width={w + 4}
          height={h + 6}
          rx={h}
          fill={fill}
          filter="url(#n3-blur-sm)"
          opacity="0.8"
        />
      )}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} />
    </g>
  );
};

const PanelLine = ({
  slab,
  side,
  v,
  from = 0.14,
  to = 0.86,
}: {
  slab: SlabType;
  side: "left" | "right";
  v: number;
  from?: number;
  to?: number;
}) => {
  const [x1, y1] = facePoint(slab, side, from, v);
  const [x2, y2] = facePoint(slab, side, to, v);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4E6386" strokeWidth="0.9" opacity="0.6" />;
};

const Fastener = ({ slab, x, y }: { slab: SlabType; x: number; y: number }) => {
  const [px, py] = project(x, y, CX, slab.top);
  return (
    <g transform={`translate(${px.toFixed(2)} ${py.toFixed(2)}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <circle r="6.5" fill="url(#n3-hole)" stroke="#3E5274" strokeWidth="1" />
    </g>
  );
};

const SlabBody = ({ slab }: { slab: SlabType }) => (
  <g>
    <path d={bodyPath(slab)} fill="url(#n3-side)" />
    <path d={bodyPath(slab)} fill="url(#n3-side-shade)" />
    <path d={bodyPath(slab)} fill="none" stroke="#3A4E70" strokeWidth="1" opacity="0.9" />
  </g>
);

const SlabTop = ({ slab, groove }: { slab: SlabType; groove?: number }) => (
  <g>
    <path d={topPath(slab)} fill="url(#n3-bevel)" stroke="#3A4E70" strokeWidth="1" />
    <path d={topPath(slab, 4.5)} fill="url(#n3-top)" stroke="#5B739C" strokeWidth="1" opacity="0.9" />
    {groove !== undefined && <path d={topPath(slab, groove)} fill="none" stroke="#16243C" strokeWidth="1.4" />}
  </g>
);

// Fianchi dell'estrusione del marchio, dal basso: più scuri dove toccano il piano.
const LOGO_SIDE = ["#6E5200", "#835F00", "#986E00", "#AD7E00", "#C28E00", "#D69E02"];
const LOGO_SCALE = 1.42;

const CoreLogo = ({ x, y }: { x: number; y: number }) => {
  const plane = (lift: number) => `translate(${x} ${y - lift}) matrix(${FACE_MATRIX.top} 0 0) scale(${LOGO_SCALE})`;
  const top = LOGO_SIDE.length;
  return (
    <g>
      <g transform={`${plane(0)} translate(2.4 2.4)`} opacity="0.5" filter="url(#n3-blur-sm)">
        <AedixGlyph stroke="#000000" width={5} />
      </g>
      {LOGO_SIDE.map((stroke, k) => (
        <g key={stroke} transform={plane(k)}>
          <AedixGlyph stroke={stroke} width={4.6} />
        </g>
      ))}
      <g transform={plane(top)}>
        <AedixGlyph stroke="url(#n3-logo-top)" width={4.6} />
        <AedixGlyph stroke="#FFF2C2" width={1} opacity={0.55} />
      </g>
    </g>
  );
};

const CoreDefs = () => (
  <defs>
    <linearGradient id="n3-side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#2E4164" />
      <stop offset="0.46" stopColor="#24365A" />
      <stop offset="0.5" stopColor="#172640" />
      <stop offset="1" stopColor="#1D2E4C" />
    </linearGradient>
    <linearGradient id="n3-side-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.4" stopColor="#000000" stopOpacity="0" />
      <stop offset="1" stopColor="#000000" stopOpacity="0.38" />
    </linearGradient>
    <linearGradient id="n3-bevel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4A6290" />
      <stop offset="1" stopColor="#1C2C48" />
    </linearGradient>
    <linearGradient id="n3-top" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stopColor="#33496F" />
      <stop offset="1" stopColor="#1E2F4E" />
    </linearGradient>
    <linearGradient id="n3-inlay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#132039" />
      <stop offset="1" stopColor="#253A5E" />
    </linearGradient>
    <linearGradient id="n3-seam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#FFE38A" />
      <stop offset="0.5" stopColor={GOLD} />
      <stop offset="1" stopColor="#FFD54F" />
    </linearGradient>
    <linearGradient id="n3-slot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#070E1B" />
      <stop offset="1" stopColor="#162440" />
    </linearGradient>
    <linearGradient id="n3-logo-top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFE58F" />
      <stop offset="0.55" stopColor={GOLD} />
      <stop offset="1" stopColor="#E0A300" />
    </linearGradient>
    <radialGradient id="n3-hole" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stopColor="#0C162A" />
      <stop offset="1" stopColor="#2A3D60" />
    </radialGradient>
    <filter id="n3-blur-sm" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.5" />
    </filter>
    <filter id="n3-blur-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="9" />
    </filter>
    <filter id="n3-blur-spill" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>
);

// Il nucleo a riposo: tre lastre, una fessura di luce oro tra base e lastra centrale, il marchio sul coperchio.
const CoreObject = (props: SVGProps<SVGSVGElement>) => {
  const seam: SlabType = { half: MID.half - 2, radius: MID.radius - 2, top: MID.top + MID.depth - 1, depth: SEAM_GAP + 1 };
  const spillDy = BASE.top - MID.top;

  return (
    <svg viewBox="0 0 1000 1000" role="img" aria-label="Il nucleo del sistema AEDIX" {...props}>
      <CoreDefs />

      <SlabBody slab={BASE} />
      <SlabTop slab={BASE} groove={10} />
      <PanelLine slab={BASE} side="left" v={0.3} />
      <PanelLine slab={BASE} side="right" v={0.3} />
      <FaceMark slab={BASE} side="right" u={0.5} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="right" u={0.58} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="right" u={0.66} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="left" u={0.32} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="left" u={0.4} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />

      <g className="n3-seam-pulse">
        <path d={topPath(MID, 4, CX, spillDy)} fill={GOLD} opacity="0.3" filter="url(#n3-blur-spill)" />
        <path d={bodyPath(seam)} fill={GOLD} opacity="0.7" filter="url(#n3-blur-glow)" />
      </g>
      <path d={bodyPath(seam)} fill="url(#n3-seam)" />

      <SlabBody slab={MID} />
      <SlabTop slab={MID} groove={11} />
      <PanelLine slab={MID} side="left" v={0.78} />
      <PanelLine slab={MID} side="right" v={0.78} />
      <FaceMark slab={MID} side="left" u={0.62} v={0.42} w={34} h={7.5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="left" u={0.34} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="left" u={0.42} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.44} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.52} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.68} v={0.42} w={22} h={4.5} fill="url(#n3-slot)" />
      <g className="n3-seam-pulse">
        <FaceMark slab={MID} side="left" u={0.2} v={0.42} w={7} h={2.6} fill={GOLD} glow />
      </g>

      <Fastener slab={MID} x={0} y={-MID.half + 28} />
      <Fastener slab={MID} x={-MID.half + 28} y={0} />
      <Fastener slab={MID} x={MID.half - 28} y={0} />
      <Fastener slab={MID} x={0} y={MID.half - 28} />

      <SlabBody slab={CAP} />
      <SlabTop slab={CAP} />
      <path d={topPath(CAP, 19)} fill="url(#n3-inlay)" stroke="#16243C" strokeWidth="1.2" />
      <path d={topPath(CAP, 20.5)} fill="none" stroke="#4E6590" strokeWidth="1" opacity="0.55" />

      <CoreLogo x={CX} y={CAP.top} />
    </svg>
  );
};

const CoreShadow = (props: SVGProps<SVGSVGElement>) => {
  const floor = { ...BASE, top: BASE.top + BASE.depth + 30 };
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
      <defs>
        <filter id="n3-blur-lg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="n3-blur-md" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <path d={topPath(floor, -14)} fill="#000000" opacity="0.45" filter="url(#n3-blur-lg)" />
      <path d={topPath(floor, 6)} fill="#000000" opacity="0.5" filter="url(#n3-blur-md)" />
    </svg>
  );
};

// Profondità dietro al nucleo: due lastre di vetro e qualche nodo sparso, tutto a bassissimo contrasto.
const BACK_NODES: [number, number][] = [
  [118, 132],
  [318, 82],
  [690, 96],
  [884, 188],
  [936, 470],
  [70, 512],
  [150, 858],
  [850, 846],
];

const DepthBackdrop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <defs>
      <linearGradient id="n3-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5A78AA" stopOpacity="0.22" />
        <stop offset="1" stopColor="#5A78AA" stopOpacity="0.03" />
      </linearGradient>
    </defs>
    <g fill="url(#n3-glass)" stroke="#2E4266" strokeWidth="1" opacity="0.6">
      <rect width="290" height="250" rx="22" transform="matrix(0.866 -0.5 0 1 232 300)" />
      <rect width="290" height="250" rx="22" transform="matrix(0.866 0.5 0 1 520 150)" />
    </g>
    <g fill="#0E1B32" stroke="#3E5478" strokeWidth="1">
      {BACK_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 3} opacity="0.9" />
      ))}
    </g>
  </svg>
);

const DOTS = Array.from({ length: 26 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 160 + ((i * 53) % 340);
  return [round(CX + r * Math.cos(a) * 1.02), round(CY + r * Math.sin(a) * RING_FLATTEN * 1.6), 0.8 + (i % 3) * 0.5] as const;
});

const TechnicalBackdrop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <defs>
      <linearGradient id="n3-axis-v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4A6290" stopOpacity="0" />
        <stop offset="0.5" stopColor="#4A6290" stopOpacity="0.5" />
        <stop offset="1" stopColor="#4A6290" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="n3-axis-h" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4A6290" stopOpacity="0" />
        <stop offset="0.5" stopColor="#4A6290" stopOpacity="0.7" />
        <stop offset="1" stopColor="#4A6290" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x={CX - 0.5} y="110" width="1" height="780" fill="url(#n3-axis-v)" />
    <rect x="70" y={CY - 0.5} width="860" height="1" fill="url(#n3-axis-h)" />
    <g fill="#4A6290">
      {DOTS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (i % 4) * 0.12} />
      ))}
    </g>
    <g stroke="#4A6290" strokeWidth="1" opacity="0.6">
      {(
        [
          [212, 292],
          [790, 690],
          [860, 430],
          [150, 560],
        ] as const
      ).map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} />
      ))}
    </g>
  </svg>
);

// ───────────────────────── Regolazioni ─────────────────────────
const MOTION = {
  floatDistance: 10,
  floatSeconds: 6.5,
  tiltDegrees: 3.5,
  ringParallax: 12,
  backdropParallax: 5,
  orbitSeconds: [70, 95],
  orbitOpenOpacity: 0.15,
};

const ARTBOARD = 1000;

/**
 * I cinque strati del sistema ibrido, dal basso verso l'alto: entra la richiesta,
 * il software la mette in contesto, l'AI esegue, la persona garantisce, escono i risultati.
 */
type Stage = {
  title: string;
  desc: string;
  apps: { label: string; icon: LucideIcon }[];
  icon?: LucideIcon;
  side: "left" | "right";
  main?: boolean;
};

const STAGES: Stage[] = [
  {
    title: "Richieste in arrivo",
    desc: "Sito, campagne e WhatsApp: nessun contatto perso",
    apps: [
      { label: "Sito web", icon: Globe },
      { label: "Campagne", icon: Megaphone },
      { label: "WhatsApp", icon: MessageCircle },
    ],
    icon: Cable,
    side: "right",
  },
  {
    title: "Software verticale",
    desc: "Cantieri, listini e documenti del tuo settore",
    apps: [
      { label: "Cantieri", icon: HardHat },
      { label: "Documenti", icon: FileText },
      { label: "Fatture", icon: Receipt },
    ],
    icon: Layers,
    side: "left",
  },
  {
    title: "Agenti AI",
    desc: "Rispondono in secondi e preparano le bozze",
    apps: [
      { label: "Agente", icon: Bot },
      { label: "Generazione", icon: Sparkles },
      { label: "Elaborazione", icon: Cpu },
    ],
    side: "right",
    main: true,
  },
  {
    title: "Supervisione umana",
    desc: "Una persona rivede e approva ogni risultato",
    apps: [
      { label: "Revisione", icon: UserCheck },
      { label: "Approvazione", icon: BadgeCheck },
      { label: "Conformità", icon: ShieldCheck },
    ],
    icon: UserCheck,
    side: "left",
  },
  {
    title: "Risultati misurabili",
    desc: "Preventivi, contratti e ore recuperate",
    apps: [
      { label: "Crescita", icon: TrendingUp },
      { label: "Tempo", icon: Clock },
      { label: "Numeri", icon: ChartNoAxesColumnIncreasing },
    ],
    icon: ChartNoAxesColumnIncreasing,
    side: "right",
  },
];

const EXPLODE = {
  spring: { stiffness: 105, damping: 25, mass: 1 },
  gap: 94,
  aiLift: 12,
  topPlateY: 230,
  stagger: 0.05,
  scales: [0.63, 0.62, 0.7, 1.07, 1.06],
};

const STAGE_CARDS = {
  left: { edge: -2, width: 31 },
  right: { edge: 0, width: 29 },
  restInset: 10,
  outward: 2,
  beadSeconds: 1.6,
};

// ───────────────────────── Vista esplosa ─────────────────────────
const PLATE_SLABS: SlabType[] = [
  { ...BASE, top: BASE.top + 17, depth: 17 },
  { ...BASE, top: BASE.top, depth: 17 },
  MID,
  { ...CAP, top: CAP.top + 7, depth: 7 },
  { ...CAP, top: CAP.top, depth: 7 },
];

const AI_PLATE = 2;

const TARGET_TOPS = PLATE_SLABS.map(
  (_, i) => EXPLODE.topPlateY + (PLATE_SLABS.length - 1 - i) * EXPLODE.gap - (i === AI_PLATE ? EXPLODE.aiLift : 0),
);
const TRAVEL = PLATE_SLABS.map((slab, i) => TARGET_TOPS[i] - slab.top);

const clamp = (v: number) => Math.min(1, Math.max(0, v));

const plateProgress = (i: number, p: number) => {
  const delay = Math.abs(i - AI_PLATE) * EXPLODE.stagger;
  return clamp((p - delay) / (1 - delay));
};
const plateY = (i: number, p: number) => TRAVEL[i] * plateProgress(i, p);
const plateScale = (i: number, p: number) => 1 + (EXPLODE.scales[i] - 1) * plateProgress(i, p);

const tipOffset = (i: number) => {
  const { half, radius } = PLATE_SLABS[i];
  return 0.866 * (2 * half - 0.586 * radius) * EXPLODE.scales[i];
};
const tipX = (i: number, side: "left" | "right") => CX + (side === "right" ? 1 : -1) * tipOffset(i);
const cornerY = (i: number) => TARGET_TOPS[i] + PLATE_SLABS[i].depth / 2;

const SKIRT = [0, 4, 0, 10, 10];

const Plate = ({ index, progress, children }: { index: number; progress: MotionValue<number>; children: ReactNode }) => {
  const y = useTransform(progress, (v) => plateY(index, v));
  const scale = useTransform(progress, (v) => plateScale(index, v));
  const apart = useTransform(progress, (v) => plateProgress(index, v));
  const shadow = useTransform(apart, (v) => v * 0.45);
  const slab = PLATE_SLABS[index];
  const skirt = SKIRT[index];

  return (
    <m.g style={{ y, scale }}>
      {index > 0 && (
        <m.path
          d={topPath(slab, -6, CX, slab.depth + 34)}
          fill="#000000"
          filter="url(#n3-blur-spill)"
          style={{ opacity: shadow }}
        />
      )}
      {skirt > 0 && (
        <m.g style={{ opacity: apart }}>
          <SlabBody slab={{ ...slab, top: slab.top + slab.depth - 1, depth: skirt + 1 }} />
        </m.g>
      )}
      {children}
    </m.g>
  );
};

// Numero dello strato inciso sul piano superiore, vicino all'angolo frontale.
const PlateNumber = ({ slab, n, main = false }: { slab: SlabType; n: number; main?: boolean }) => {
  const k = slab.half * 0.56;
  const [x, y] = project(k, k, CX, slab.top);
  const plane = `matrix(${FACE_MATRIX.top} 0 0) rotate(-45)`;
  const label = String(n).padStart(2, "0");
  const text = {
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: 2.5,
  };
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} aria-hidden>
      <text {...text} transform={`translate(0 0.9) ${plane}`} fill="#5E78A6" opacity="0.7">
        {label}
      </text>
      <text {...text} transform={plane} fill={main ? GOLD : "#0F1C33"}>
        {label}
      </text>
    </g>
  );
};

const AiEmphasis = ({ progress }: { progress: MotionValue<number> }) => {
  const on = useTransform(progress, (v) => clamp((v - 0.5) / 0.4));
  const rim = useTransform(on, (v) => v * 0.9);
  const halo = useTransform(on, (v) => v * 0.6);
  const spill = useTransform(halo, (v) => v * 0.45);
  return (
    <g transform={`translate(${CX} ${MID.top}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <m.circle r="86" fill={GOLD} filter="url(#n3-blur-spill)" style={{ opacity: spill }} />
      <m.circle r="56" fill="none" stroke={GOLD} strokeWidth="1.4" style={{ opacity: rim }} />
      <m.circle r="38" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="3 6" style={{ opacity: halo }} />
      <m.circle r="9" fill={GOLD} style={{ opacity: rim }} />
    </g>
  );
};

const ExplodedCore = ({ progress, ...props }: SVGProps<SVGSVGElement> & { progress: MotionValue<number> }) => {
  const strongGlow = useTransform(progress, (v) => clamp((v - 0.4) / 0.5) * 0.7);
  const seam = { half: MID.half - 2, radius: MID.radius - 2, top: MID.top + MID.depth - 1, depth: SEAM_GAP + 1 };
  const inlay = (slab: SlabType) => (
    <>
      <path d={topPath(slab, 19)} fill="url(#n3-inlay)" stroke="#16243C" strokeWidth="1.2" />
      <path d={topPath(slab, 20.5)} fill="none" stroke="#4E6590" strokeWidth="1" opacity="0.55" />
    </>
  );

  return (
    <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
      <CoreDefs />

      <Plate index={0} progress={progress}>
        <SlabBody slab={PLATE_SLABS[0]} />
        <SlabTop slab={PLATE_SLABS[0]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[0]} n={1} />
        <FaceMark slab={BASE} side="right" u={0.5} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="right" u={0.58} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="right" u={0.66} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="left" u={0.32} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="left" u={0.4} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      </Plate>

      <Plate index={1} progress={progress}>
        <SlabBody slab={PLATE_SLABS[1]} />
        <SlabTop slab={PLATE_SLABS[1]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[1]} n={2} />
        <PanelLine slab={BASE} side="left" v={0.3} />
        <PanelLine slab={BASE} side="right" v={0.3} />
      </Plate>

      <Plate index={AI_PLATE} progress={progress}>
        <g className="n3-seam-pulse">
          <path d={topPath(MID, 4, CX, BASE.top - MID.top)} fill={GOLD} opacity="0.3" filter="url(#n3-blur-spill)" />
          <path d={bodyPath(seam)} fill={GOLD} opacity="0.7" filter="url(#n3-blur-glow)" />
        </g>
        <m.path d={bodyPath(seam)} fill={GOLD} filter="url(#n3-blur-glow)" style={{ opacity: strongGlow }} />
        <path d={bodyPath(seam)} fill="url(#n3-seam)" />
        <SlabBody slab={MID} />
        <SlabTop slab={MID} groove={11} />
        <PlateNumber slab={MID} n={3} main />
        <PanelLine slab={MID} side="left" v={0.78} />
        <PanelLine slab={MID} side="right" v={0.78} />
        <FaceMark slab={MID} side="left" u={0.62} v={0.42} w={34} h={7.5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="left" u={0.34} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="left" u={0.42} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.44} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.52} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.68} v={0.42} w={22} h={4.5} fill="url(#n3-slot)" />
        <g className="n3-seam-pulse">
          <FaceMark slab={MID} side="left" u={0.2} v={0.42} w={7} h={2.6} fill={GOLD} glow />
        </g>
        <Fastener slab={MID} x={0} y={-MID.half + 28} />
        <Fastener slab={MID} x={-MID.half + 28} y={0} />
        <Fastener slab={MID} x={MID.half - 28} y={0} />
        <Fastener slab={MID} x={0} y={MID.half - 28} />
        <AiEmphasis progress={progress} />
      </Plate>

      <Plate index={3} progress={progress}>
        <SlabBody slab={PLATE_SLABS[3]} />
        <SlabTop slab={PLATE_SLABS[3]} />
        {inlay(PLATE_SLABS[3])}
        <PlateNumber slab={PLATE_SLABS[3]} n={4} />
      </Plate>

      <Plate index={4} progress={progress}>
        <SlabBody slab={PLATE_SLABS[4]} />
        <SlabTop slab={PLATE_SLABS[4]} />
        {inlay(CAP)}
        <CoreLogo x={CX} y={CAP.top} />
      </Plate>
    </svg>
  );
};

// ───────────────────────── Orbite e perle ─────────────────────────
const OrbitalSystem = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <g fill="none" stroke="#2F4468" strokeWidth="1">
      <ellipse cx={CX} cy={CY} rx={RING_RX[0]} ry={RING_RX[0] * RING_FLATTEN} opacity="0.9" />
      <ellipse cx={CX} cy={CY} rx={RING_RX[1]} ry={RING_RX[1] * RING_FLATTEN} opacity="0.7" />
    </g>
  </svg>
);

type OrbitNode = { ring: 0 | 1; angle: number; size: number };

const ORBIT_NODES: OrbitNode[] = [
  { ring: 0, angle: 20, size: 7 },
  { ring: 0, angle: 110, size: 5.5 },
  { ring: 0, angle: 200, size: 8 },
  { ring: 0, angle: 290, size: 6 },
  { ring: 1, angle: 60, size: 6 },
  { ring: 1, angle: 132, size: 8 },
  { ring: 1, angle: 204, size: 5.5 },
  { ring: 1, angle: 276, size: 7 },
  { ring: 1, angle: 348, size: 6.5 },
];

// Piccola sfera di vetro dorato.
const Crystal = ({ size, ids }: { size: number; ids: string }) => (
  <g filter={`url(#${ids}-shadow)`}>
    <circle r={size * 1.6} fill={`url(#${ids}-halo)`} />
    <circle r={size} fill={`url(#${ids}-body)`} />
    <circle r={size} fill={`url(#${ids}-refract)`} />
    <circle r={size - 0.5} fill="none" stroke={`url(#${ids}-rim)`} strokeWidth="1" />
    <ellipse
      cx={-size * 0.32}
      cy={-size * 0.4}
      rx={size * 0.36}
      ry={size * 0.2}
      transform={`rotate(-30 ${-size * 0.32} ${-size * 0.4})`}
      fill="#FFFFFF"
      opacity="0.9"
    />
    <circle cx={size * 0.34} cy={-size * 0.5} r={Math.max(0.7, size * 0.07)} fill="#FFFFFF" opacity="0.85" />
  </g>
);

/**
 * Le perle sono disegnate due volte, una dietro al nucleo e una davanti, ciascuna ritagliata sulla
 * sua metà: passando dietro, una perla scivola sotto l'oggetto invece di sovrapporsi.
 */
const Particles = ({
  half,
  animate: animated,
  paused = false,
  ...props
}: SVGProps<SVGSVGElement> & { half: "back" | "front"; animate: boolean; paused?: boolean }) => {
  const ref = useRef<SVGSVGElement>(null);
  const clipId = `n3-clip-${half}`;
  const ids = `n3-crystal-${half}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused]);

  return (
    <svg ref={ref} viewBox="0 0 1000 1000" aria-hidden {...props}>
      <defs>
        <clipPath id={clipId}>
          {half === "back" ? (
            <rect x="-200" y="-200" width="1400" height={CY + 200} />
          ) : (
            <rect x="-200" y={CY} width="1400" height="700" />
          )}
        </clipPath>
        <linearGradient id={`${ids}-body`} x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="#FFF6D6" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FFD54F" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D99A00" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`${ids}-refract`} cx="0.6" cy="0.78" r="0.45">
          <stop offset="0" stopColor="#FFF8E1" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFF8E1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${ids}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#9A6B00" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`${ids}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.45" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <filter id={`${ids}-shadow`} x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {ORBIT_NODES.map((node, i) => {
          const rx = RING_RX[node.ring];
          const [x, y] = ringPoint(rx, node.angle);
          const dur = MOTION.orbitSeconds[node.ring];
          const reverse = node.ring === 1;
          const start = node.angle / 360;
          const begin = -dur * (reverse ? 1 - start : start);

          return (
            <g key={i} transform={animated ? undefined : `translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <Crystal size={node.size} ids={ids} />
              {animated && (
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={ringPath(rx)}
                  {...(reverse && { keyPoints: "1;0", keyTimes: "0;1", calcMode: "linear" })}
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// ───────────────────────── Schede degli strati ─────────────────────────
const AppIcons = ({ stage, tiles, className }: { stage: Stage; tiles: boolean; className?: string }) => (
  <div className={cn("n3-stage-apps flex shrink-0 items-center", tiles ? "gap-[0.45em]" : "gap-[0.45em]", className)}>
    {stage.apps.map(({ label, icon: Icon }) =>
      tiles ? (
        <span
          key={label}
          className="grid size-[2.15em] place-items-center rounded-[0.6em] border border-[rgba(246,190,9,0.3)] bg-[rgba(246,190,9,0.08)]"
        >
          <Icon className="size-[1.15em] text-[color:var(--n3-accent)]" strokeWidth={1.7} aria-hidden />
        </span>
      ) : (
        <Icon key={label} className="size-[1.3em] text-[rgba(255,255,255,0.45)]" strokeWidth={1.6} aria-hidden />
      ),
    )}
    <span className="sr-only">{stage.apps.map((a) => a.label).join(", ")}</span>
  </div>
);

const StageCardBody = ({ index }: { index: number }) => {
  const stage = STAGES[index];
  const main = !!stage.main;
  const Icon = stage.icon ?? null;

  return (
    <div className="grid grid-cols-[1.35em_minmax(0,1fr)_auto] items-start gap-x-[0.5em]">
      <span className="col-start-1 row-start-1 flex h-[1.64em] items-center text-[0.8em] font-medium tabular-nums text-[color:var(--n3-grey)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={cn(
          "col-start-2 row-start-1 flex flex-wrap items-baseline justify-between gap-x-[0.6em]",
          main && "col-span-2",
        )}
      >
        <p className="font-display text-[1.05em] font-semibold leading-[1.25] tracking-[-0.015em] text-[color:var(--n3-ink)] md:whitespace-nowrap">
          {stage.title}
        </p>
        {main && (
          <span className="shrink-0 text-[0.72em] font-semibold uppercase tracking-[0.12em] text-[color:var(--n3-accent)]">
            Esecuzione
          </span>
        )}
      </div>

      {Icon && (
        <span className="col-start-1 row-start-2 mt-[0.4em] flex h-[1.276em] items-center">
          <Icon className="size-[1.25em] text-[color:var(--n3-accent)]" strokeWidth={1.7} aria-hidden />
        </span>
      )}
      <div className={cn("col-start-2 row-start-2 mt-[0.4em]", main && "col-span-2")}>
        <p className="text-[0.88em] leading-[1.45] text-[color:var(--n3-grey)]">{stage.desc}</p>
        {main && <AppIcons stage={stage} tiles className="mt-[0.75em] justify-end" />}
      </div>

      {!main && <AppIcons stage={stage} tiles={false} className="col-start-3 row-span-2 row-start-1 self-center" />}
    </div>
  );
};

const pct = (n: number) => `${(n / ARTBOARD) * 100}%`;
const cardDirection = (index: number) => (STAGES[index].side === "left" ? -1 : 1);

const StageCard = ({
  index,
  progress,
  open,
  lit,
  onHover,
}: {
  index: number;
  progress: MotionValue<number>;
  open: boolean;
  lit: boolean;
  onHover: (index: number | null) => void;
}) => {
  const opacity = useTransform(progress, [0.35, 0.9], [0, 1]);
  const x = useTransform(
    progress,
    [0, 1],
    [-cardDirection(index) * STAGE_CARDS.restInset, cardDirection(index) * STAGE_CARDS.outward],
  );
  const stage = STAGES[index];
  const { edge, width } = STAGE_CARDS[stage.side];
  const left = stage.side === "left" ? edge : 100 - edge - width;

  return (
    <li style={{ top: pct(cornerY(index)), left: `${left}%`, width: `${width}%` }} className="absolute -translate-y-1/2">
      <m.div
        style={{ opacity, x }}
        onPointerEnter={(e: ReactPointerEvent) => {
          if (e.pointerType === "mouse") onHover(index);
        }}
        onPointerLeave={() => onHover(null)}
        className={cn("n3-stage-card px-[0.9em] py-[0.85em]", open && "pointer-events-auto", lit && "n3-stage-card-lit")}
      >
        <StageCardBody index={index} />
      </m.div>
    </li>
  );
};

const StageCards = ({
  progress,
  open,
  hovered,
  onHover,
}: {
  progress: MotionValue<number>;
  open: boolean;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) => (
  <ul
    aria-label="Come funziona un sistema AEDIX"
    aria-hidden={!open}
    className="pointer-events-none absolute inset-0 m-0 hidden list-none p-0 text-[clamp(10px,1.7cqw,15px)] md:block"
  >
    {STAGES.map((stage, i) => (
      <StageCard key={stage.title} index={i} progress={progress} open={open} lit={hovered === i} onHover={onHover} />
    ))}
  </ul>
);

const lineEnds = (plate: number, card: number, side: "left" | "right") => {
  const dir = side === "right" ? 1 : -1;
  return { plateX: plate + dir * 7, nodeX: card - dir * 10 };
};

// Scheda → nodo oro → filo → angolo della sua lastra. Una perla corre sul filo mentre il nucleo è aperto.
const StageConnector = ({
  plate,
  card,
  y,
  side,
  index,
  main,
  lit,
  active,
  progress,
  className,
}: {
  plate: number;
  card: number;
  y: number;
  side: "left" | "right";
  index: number;
  main: boolean;
  lit: boolean;
  active: boolean;
  progress: MotionValue<number>;
  className?: string;
}) => {
  const show = useTransform(progress, [0.55, 0.9], [0, 1]);
  const t = useMotionValue(0);
  const beadX = useTransform(t, (k) => {
    const ends = lineEnds(plate, card, side);
    return ends.nodeX + (ends.plateX - ends.nodeX) * k;
  });
  const beadOpacity = useTransform([t, show], ([k, s]: number[]) => s * Math.sin(Math.PI * k));
  const { plateX, nodeX } = lineEnds(plate, card, side);

  useEffect(() => {
    if (!active) return;
    const controls = animate(t, [0, 1], {
      duration: STAGE_CARDS.beadSeconds,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1.4,
      delay: 0.5 + index * 0.25,
    });
    return () => {
      controls.stop();
      t.set(0);
    };
  }, [active, index, t]);

  return (
    <m.svg aria-hidden viewBox={`0 0 ${ARTBOARD} ${ARTBOARD}`} style={{ opacity: show }} className={className}>
      <line x1={plateX} x2={nodeX} y1={y} y2={y} stroke="#3A5078" strokeWidth="1" />
      <m.line
        x1={plateX}
        x2={nodeX}
        y1={y}
        y2={y}
        stroke={GOLD}
        strokeWidth="1.2"
        initial={false}
        animate={{ opacity: lit ? 0.9 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <circle cx={plateX} cy={y} r="2.6" fill="#6C83AD" />
      <m.circle
        cx={nodeX}
        cy={y}
        r={main ? 10 : 8}
        fill={GOLD}
        initial={false}
        animate={{ opacity: lit || main ? 0.25 : 0.14 }}
        transition={{ duration: 0.25 }}
      />
      <circle cx={nodeX} cy={y} r="3.6" fill={GOLD} />
      <m.circle cx={beadX} cy={y} r="2.6" fill={GOLD} style={{ opacity: beadOpacity }} />
    </m.svg>
  );
};

const StageConnectors = ({
  progress,
  active,
  hovered,
}: {
  progress: MotionValue<number>;
  active: boolean;
  hovered: number | null;
}) => (
  <div className="pointer-events-none absolute inset-0 hidden md:block">
    {STAGES.map((stage, i) => {
      const { edge, width } = STAGE_CARDS[stage.side];
      const cardEdge = stage.side === "left" ? (edge + width) * 10 : (100 - edge - width) * 10;
      return (
        <StageConnector
          key={stage.title}
          plate={tipX(i, stage.side)}
          card={cardEdge}
          y={cornerY(i)}
          side={stage.side}
          index={i}
          main={!!stage.main}
          lit={hovered === i}
          active={active}
          progress={progress}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        />
      );
    })}
  </div>
);

// Sul telefono le schede non stanno accanto al nucleo: vanno sotto, in griglia.
const StageList = ({ reduce }: { reduce: boolean }) => (
  <m.ul
    initial={reduce ? false : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    aria-label="Come funziona un sistema AEDIX"
    className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 text-[13px] sm:grid-cols-2 md:hidden"
  >
    {STAGES.map((stage, i) => (
      <li key={stage.title} className="n3-stage-card px-[1.05em] py-[0.95em]">
        <StageCardBody index={i} />
      </li>
    ))}
  </m.ul>
);

// ───────────────────────── Visual del nucleo ─────────────────────────
const subscribeToVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};
const isPageVisible = () => !document.hidden;
const isPageVisibleOnServer = () => true;

const ParallaxLayer = ({
  x,
  y,
  reach,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  reach: number;
  children: ReactNode;
}) => {
  const tx = useTransform(x, (v) => v * reach);
  const ty = useTransform(y, (v) => v * reach);
  return (
    <m.div style={{ x: tx, y: ty }} className="pointer-events-none absolute inset-0">
      {children}
    </m.div>
  );
};

const Tilted = ({
  rotateX,
  rotateY,
  children,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  children: ReactNode;
}) => (
  <div className="pointer-events-none absolute inset-0 [perspective:1400px]">
    <m.div style={{ rotateX, rotateY }} className="absolute inset-0">
      <div className="n3-float absolute inset-0">{children}</div>
    </m.div>
  </div>
);

const CoreVisual = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const pointerType = useRef("mouse");
  const visualRef = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion() ?? false;
  const onScreen = useInView(visualRef, { initial: true, margin: "40px" });
  const pageVisible = useSyncExternalStore(subscribeToVisibility, isPageVisible, isPageVisibleOnServer);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 55, damping: 18, mass: 0.9 });
  const y = useSpring(py, { stiffness: 55, damping: 18, mass: 0.9 });
  const rotateY = useTransform(x, (v) => v * MOTION.tiltDegrees);

  // 0 = chiuso, 1 = aperto. Una sola molla muove lastre, fili, schede e ombra.
  const target = useMotionValue(0);
  const progress = useSpring(target, reduce ? { duration: 0.01 } : EXPLODE.spring);

  const rotateX = useTransform([y, progress], ([v, p]: number[]) => v * -MOTION.tiltDegrees + p * 4);
  const restOpacity = useTransform(progress, [0, 0.04], [1, 0]);
  const explodedOpacity = useTransform(progress, [0, 0.03], [0, 1]);
  const shadowOpacity = useTransform(progress, [0, 1], [1, 0.55]);
  const orbitOpacity = useTransform(progress, [0, 0.6], [1, MOTION.orbitOpenOpacity]);
  const hintOpacity = useTransform(progress, [0, 0.25], [1, 0]);

  const beadsPaused = open || !onScreen || !pageVisible;

  useEffect(() => {
    target.set(open ? 1 : 0);
  }, [open, target]);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - box.left) / box.width - 0.5) * 2);
    py.set(((e.clientY - box.top) / box.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    setOpen(false);
  };

  const handleCardHover = (index: number | null) => {
    setHovered(index);
    if (index !== null && !reduce) setOpen(true);
  };

  // Il mouse apre passando sopra; tocco e tastiera non hanno hover, quindi alternano.
  const handleCoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 0 || pointerType.current !== "mouse") setOpen((v) => !v);
  };

  return (
    <LazyMotion features={domAnimation}>
      <>
        <div
          ref={visualRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ containerType: "inline-size" }}
          className="n3-enter relative -my-[6%] -ml-[12.5%] aspect-square w-[125%] max-w-none md:mx-auto md:my-0 md:w-full md:max-w-[840px] lg:mx-0 lg:w-[104%] lg:max-w-none"
        >
          <div className="absolute inset-0">
            <div aria-hidden className="n3-halo pointer-events-none absolute inset-[6%]" />

            <div className="n3-fade-edge absolute inset-0">
              <ParallaxLayer x={x} y={y} reach={-MOTION.backdropParallax}>
                <DepthBackdrop className="absolute inset-0 size-full overflow-visible" />
                <TechnicalBackdrop className="absolute inset-0 size-full overflow-visible" />
              </ParallaxLayer>
            </div>

            <ParallaxLayer x={x} y={y} reach={MOTION.ringParallax}>
              <m.div style={{ opacity: orbitOpacity }} className="absolute inset-0">
                <OrbitalSystem className="absolute inset-0 size-full overflow-visible" />
                <Particles
                  half="back"
                  animate={!reduce}
                  paused={beadsPaused}
                  className="absolute inset-0 size-full overflow-visible"
                />
              </m.div>
            </ParallaxLayer>

            <m.div style={{ opacity: shadowOpacity }} className="absolute inset-0">
              <CoreShadow className="pointer-events-none absolute inset-0 size-full overflow-visible" />
            </m.div>

            <Tilted rotateX={rotateX} rotateY={rotateY}>
              <m.div style={{ opacity: restOpacity }} className="absolute inset-0">
                <CoreObject className="absolute inset-0 size-full overflow-visible" />
              </m.div>
              <m.div style={{ opacity: explodedOpacity }} className="absolute inset-0">
                <ExplodedCore progress={progress} className="absolute inset-0 size-full overflow-visible" />
              </m.div>
              <StageConnectors progress={progress} active={open && !reduce} hovered={hovered} />
            </Tilted>

            <ParallaxLayer x={x} y={y} reach={MOTION.ringParallax}>
              <m.div style={{ opacity: orbitOpacity }} className="absolute inset-0">
                <Particles
                  half="front"
                  animate={!reduce}
                  paused={beadsPaused}
                  className="absolute inset-0 size-full overflow-visible"
                />
              </m.div>
            </ParallaxLayer>

            <Tilted rotateX={rotateX} rotateY={rotateY}>
              <StageCards progress={progress} open={open} hovered={hovered} onHover={handleCardHover} />
            </Tilted>
          </div>

          <m.p
            aria-hidden
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute left-1/2 top-[84%] m-0 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[1.5px] text-[color:var(--n3-grey)]"
          >
            <MousePointer2 className="size-3.5 text-[color:var(--n3-accent)]" strokeWidth={1.8} />
            <span className="[@media(hover:none)]:hidden">Passa sopra per vedere come funziona</span>
            <span className="hidden [@media(hover:none)]:inline">Tocca per vedere come funziona</span>
          </m.p>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Mostra come funziona un sistema AEDIX, strato per strato"
            onPointerDown={(e) => {
              pointerType.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse" && !reduce) setOpen(true);
            }}
            onClick={handleCoreClick}
            onBlur={() => setOpen(false)}
            className="absolute left-[22%] top-[30%] h-[44%] w-[56%] cursor-default rounded-[3rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6BE09]"
          />
        </div>
        <StageList reduce={reduce} />
      </>
    </LazyMotion>
  );
};

// ───────────────────────── Testo dell'hero ─────────────────────────
const FlipLabel = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className="n3-flip-box">
    <span className={cn("n3-flip-face", className)}>{children}</span>
    <span aria-hidden className={cn("n3-flip-face n3-flip-back", className)}>
      {children}
    </span>
  </span>
);

const METRICS = [
  { value: "3–14 giorni", label: "per essere operativi", icon: Zap },
  { value: "AI Act", label: "conformi by design", icon: ShieldCheck },
  { value: "Dati in UE", label: "infrastruttura europea", icon: Globe },
];

const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

const HeroCopy = ({ onHowItWorks }: { onHowItWorks?: () => void }) => (
  <div className="flex flex-col justify-center">
    <p
      {...rise(0.1)}
      className="n3-rise flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-[color:var(--n3-grey)]"
    >
      <span aria-hidden className="n3-dot size-2 rounded-full bg-[color:var(--n3-accent)]" />
      Sistemi AI ibridi per le aziende
    </p>

    <h1 id="n3-title" {...rise(0.18)} className="n3-rise n3-h1 mt-7 font-display font-bold text-[color:var(--n3-ink)]">
      <span className="block">L&rsquo;AI esegue.</span>
      <span className="block font-light italic text-[color:var(--n3-accent)]">Le persone garantiscono.</span>
    </h1>

    <p
      {...rise(0.3)}
      className="n3-rise mt-7 max-w-[34rem] text-[17px] font-light leading-[1.7] text-[color:var(--n3-grey)] lg:text-[19px]"
    >
      Progettiamo sistemi AI ibridi per PMI e imprese italiane:{" "}
      <span className="font-medium text-white">
        software verticale sul vostro settore, agenti AI che eseguono i processi, supervisione umana su ogni risultato
      </span>
      . Operativi in settimane. Conformi by design.
    </p>

    <div {...rise(0.4)} className="n3-rise mt-9 flex flex-wrap items-center gap-3">
      <Link
        to="/contatti"
        className="n3-flip glow-btn inline-flex h-[52px] items-center rounded-full bg-[color:var(--n3-accent)] px-7 text-[15px] font-bold text-[color:var(--n3-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14"
      >
        <FlipLabel className="gap-2.5">
          Prenota una demo
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
        </FlipLabel>
      </Link>
      <button
        type="button"
        onClick={onHowItWorks}
        className="n3-flip inline-flex h-[52px] items-center rounded-full border border-[color:var(--n3-line)] bg-white/[0.03] px-6 text-[15px] text-[color:var(--n3-ink)] transition-colors hover:border-[rgba(246,190,9,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6BE09] sm:h-14"
      >
        <FlipLabel className="gap-3">
          <span className="grid size-5 place-items-center rounded-full border border-white/70">
            <Play className="size-2.5 fill-current" strokeWidth={0} aria-hidden />
          </span>
          Come funziona
        </FlipLabel>
      </button>
    </div>

    <dl {...rise(0.58)} className="n3-rise mt-12 grid grid-cols-3 sm:flex sm:items-stretch lg:mt-16">
      {METRICS.map(({ value, label, icon: Icon }, i) => (
        <div
          key={label}
          className={cn(
            "flex flex-col items-start gap-2 pr-3 sm:flex-row sm:items-center sm:gap-3 sm:pr-7",
            i > 0 && "border-l border-[color:var(--n3-line)] pl-4 sm:pl-7",
          )}
        >
          <Icon className="size-7 shrink-0 text-[color:var(--n3-accent)]" strokeWidth={1.3} aria-hidden />
          <div>
            <dd className="text-[14px] font-medium leading-5 text-[color:var(--n3-ink)]">{value}</dd>
            <dt className="text-[13px] leading-5 text-[color:var(--n3-grey)]">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  </div>
);

// ───────────────────────── Pavimento isometrico ─────────────────────────
const CELL = { w: 84, h: 48 };

const FloorGrid = ({
  id,
  stroke = "#22334F",
  strokeWidth = 0.8,
  ...props
}: SVGProps<SVGSVGElement> & { id: string; stroke?: string; strokeWidth?: number }) => (
  <svg aria-hidden width="100%" height="100%" {...props}>
    <defs>
      <pattern id={id} width={CELL.w} height={CELL.h} patternUnits="userSpaceOnUse">
        <path
          d={`M0 ${CELL.h / 2}L${CELL.w / 2} 0L${CELL.w} ${CELL.h / 2}M0 ${CELL.h / 2}L${CELL.w / 2} ${CELL.h}L${CELL.w} ${CELL.h / 2}`}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const SPOT = 340;

// La griglia, più una copia oro vista da una finestra rotonda che segue il cursore (solo transform, niente repaint).
const HeroFloor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const spot = spotRef.current;
    const lit = litRef.current;
    const section = el?.parentElement;
    if (!el || !spot || !lit || !section) return;

    const resize = new ResizeObserver(([entry]) => {
      lit.style.width = `${entry.contentRect.width}px`;
      lit.style.height = `${entry.contentRect.height}px`;
    });
    resize.observe(section);

    let frame = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = section.getBoundingClientRect();
        const x = e.clientX - box.left - SPOT / 2;
        const y = e.clientY - box.top - SPOT / 2;
        spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        lit.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
        el.dataset.spot = "on";
      });
    };
    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      el.dataset.spot = "off";
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden data-spot="off" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <FloorGrid id="n3-floor-cell" className="n3-floor absolute inset-0" />
      <div ref={spotRef} style={{ width: SPOT, height: SPOT }} className="n3-floor-spot">
        <div ref={litRef} className="n3-floor-lit">
          <FloorGrid id="n3-floor-cell-lit" stroke={GOLD} strokeWidth={1} className="block size-full" />
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── Export ─────────────────────────
const motionVars = {
  "--n3-float": MOTION.floatDistance,
  "--n3-float-seconds": `${MOTION.floatSeconds}s`,
} as CSSProperties;

type AedixCoreHeroProps = { onHowItWorks?: () => void };

const AedixCoreHero = ({ onHowItWorks }: AedixCoreHeroProps) => {
  return (
    <>
      <style>{BLOCK_CSS}</style>
      <div style={motionVars} className="n3-root n3-bg w-full text-[color:var(--n3-ink)] antialiased">
        <section id="top" aria-labelledby="n3-title" className="n3-hero relative isolate overflow-x-clip">
          <HeroFloor />
          <div className="n3-frame mx-auto grid max-w-[1320px] items-center gap-6 pb-12 pt-6 lg:min-h-[calc(100dvh-96px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:py-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-16">
            <HeroCopy onHowItWorks={onHowItWorks} />
            <CoreVisual />
          </div>
        </section>
      </div>
    </>
  );
};

export default AedixCoreHero;
