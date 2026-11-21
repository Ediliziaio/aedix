/**
 * Kit comune per le scene isometriche degli hero (Metodo, Sicurezza): proiezione, scatole,
 * e il "palco" con schede + connettori che si accendono al passaggio del mouse.
 * Stesso linguaggio visivo della casa digitale di Edilizia in Cloud.
 */
import { useState } from "react";
import type { ReactNode } from "react";
import { MousePointer2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ISO = 0.866;
export const GOLD = "#F6BE09";

export type Pt = [number, number];

export const makeIso = (cx: number, cy: number) => (x: number, y: number, z: number): Pt => [
  cx + (x - y) * ISO,
  cy + (x + y) * 0.5 - z,
];

export const poly = (...pts: Pt[]) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;
export const seg = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
export const at = ([x, y]: Pt) => `translate(${x.toFixed(1)} ${y.toFixed(1)})`;

export const PLANE = {
  top: `matrix(${ISO} 0.5 ${-ISO} 0.5 0 0)`,
  left: `matrix(${ISO} 0.5 0 1 0 0)`,
  right: `matrix(${ISO} -0.5 0 1 0 0)`,
};

type IsoFn = ReturnType<typeof makeIso>;

export type BoxProps = {
  P: IsoFn;
  x0: number; x1: number; y0: number; y1: number; z0: number; z1: number;
  top: string; left: string; right: string; stroke?: string;
};

export const Box = ({ P, x0, x1, y0, y1, z0, z1, top, left, right, stroke = "#3A5078" }: BoxProps) => (
  <g stroke={stroke} strokeWidth="1" strokeLinejoin="round">
    <path d={poly(P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0))} fill={left} />
    <path d={poly(P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0), P(x1, y0, z0))} fill={right} />
    <path d={poly(P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1))} fill={top} />
  </g>
);

export const IsoGrid = ({ P, half, z, step = 40 }: { P: IsoFn; half: number; z: number; step?: number }) => {
  const d: string[] = [];
  for (let k = -half; k <= half; k += step) {
    d.push(seg(P(k, -half, z), P(k, half, z)));
    d.push(seg(P(-half, k, z), P(half, k, z)));
  }
  return <path d={d.join("")} stroke="#1E3256" strokeWidth="0.8" fill="none" />;
};

// ───────────────────────── Palco con schede ─────────────────────────
export type StageItem = {
  id: string;
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  anchor: Pt;
  side: "left" | "right";
  top: number; // % dell'altezza
};

const CARD_W = 26;

const CSS = `
.iso-build { animation: iso-build 900ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@keyframes iso-build { from { opacity: 0; transform: translateY(-36px); } }
.iso-fade { animation: iso-fade 900ms ease backwards; }
@keyframes iso-fade { from { opacity: 0; } }
.iso-part { transition: opacity 300ms ease, filter 300ms ease; }
.iso-stage[data-active] .iso-part:not([data-on]) { opacity: 0.35; }
.iso-part[data-on] { filter: drop-shadow(0 0 10px rgb(246 190 9 / 0.45)); }
.iso-card { transition: border-color 300ms ease, box-shadow 300ms ease, background-color 300ms ease; }
.iso-card[data-on] {
  border-color: rgb(246 190 9 / 0.55);
  background-color: rgb(20 34 60 / 0.92);
  box-shadow: 0 18px 40px -18px rgb(246 190 9 / 0.4);
}
.iso-float { animation: iso-float 7s ease-in-out infinite alternate; }
@keyframes iso-float { to { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .iso-build, .iso-fade, .iso-float { animation: none; } }
`;

export type PartBinder = (id: string, delay: number) => {
  className: string;
  style: React.CSSProperties;
  "data-on"?: string;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: () => void;
  onClick: () => void;
};

type IsoStageProps = {
  items: StageItem[];
  label: string;
  hint?: string;
  children: (part: PartBinder, active: string | null) => ReactNode;
};

export const IsoStage = ({ items, label, hint = "Passa su ogni parte", children }: IsoStageProps) => {
  const [active, setActive] = useState<string | null>(null);

  const part: PartBinder = (id, delay) => ({
    className: "iso-part iso-build",
    style: { animationDelay: `${delay}s` },
    "data-on": active === id ? "" : undefined,
    onPointerEnter: (e) => e.pointerType === "mouse" && setActive(id),
    onPointerLeave: () => setActive(null),
    onClick: () => setActive((a) => (a === id ? null : id)),
  });

  return (
    <div className="w-full">
      <style>{CSS}</style>
      <div
        className="iso-stage relative mx-auto aspect-square w-full max-w-[760px]"
        style={{ containerType: "inline-size" }}
        data-active={active ? "" : undefined}
      >
        <div aria-hidden className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(70,110,180,0.22),transparent)]" />
        <div className="iso-float absolute inset-0">
          <svg viewBox="0 0 1000 1000" role="img" aria-label={label} className="absolute inset-0 size-full overflow-visible">
            {children(part, active)}
          </svg>

          <svg viewBox="0 0 1000 1000" aria-hidden className="pointer-events-none absolute inset-0 hidden size-full overflow-visible md:block">
            {items.map((m) => {
              const x = m.side === "left" ? CARD_W * 10 + 6 : 1000 - CARD_W * 10 - 6;
              const y = m.top * 10;
              const on = active === m.id;
              return (
                <g key={m.id}>
                  <path
                    d={`M${x} ${y}L${m.anchor[0]} ${m.anchor[1]}`}
                    stroke={on ? GOLD : "#5A76A6"}
                    strokeOpacity={on ? 1 : 0.7}
                    strokeWidth={on ? 1.6 : 1}
                    strokeDasharray={on ? undefined : "3 4"}
                  />
                  <circle cx={x} cy={y} r="3.5" fill={GOLD} />
                  <circle cx={m.anchor[0]} cy={m.anchor[1]} r={on ? 6 : 3.5} fill={on ? GOLD : "#8FA6CF"} />
                </g>
              );
            })}
          </svg>

          <ul className="pointer-events-none absolute inset-0 m-0 hidden list-none p-0 text-[clamp(10px,1.75cqw,14px)] md:block">
            {items.map((m) => {
              const Icon = m.icon;
              const on = active === m.id;
              return (
                <li
                  key={m.id}
                  style={{ top: `${m.top}%`, left: `${m.side === "left" ? 0 : 100 - CARD_W}%`, width: `${CARD_W}%` }}
                  className="pointer-events-auto absolute -translate-y-1/2"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(m.id)}
                  onPointerLeave={() => setActive(null)}
                >
                  <div
                    data-on={on ? "" : undefined}
                    className="iso-card rounded-[1.1em] border border-white/10 bg-[rgba(13,26,47,0.82)] px-[0.9em] py-[0.75em] backdrop-blur-md"
                  >
                    <div className="flex items-center gap-[0.5em]">
                      <Icon className="size-[1.2em] shrink-0 text-primary" strokeWidth={1.7} aria-hidden />
                      <span className="font-mono text-[0.75em] text-white/45">{m.n}</span>
                      <p className="font-display text-[1em] font-semibold leading-tight text-white">{m.title}</p>
                    </div>
                    <p className="mt-[0.35em] text-[0.85em] leading-[1.4] text-white/60">{m.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="pointer-events-none absolute bottom-[2%] left-1/2 m-0 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[1.5px] text-white/50">
          <MousePointer2 className="size-3.5 text-primary" strokeWidth={1.8} aria-hidden />
          <span className="[@media(hover:none)]:hidden">{hint}</span>
          <span className="hidden [@media(hover:none)]:inline">Tocca ogni parte</span>
        </p>
      </div>

      <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-2.5 p-0 text-[13px] sm:grid-cols-2 md:hidden">
        {[...items].sort((a, b) => a.n.localeCompare(b.n)).map((m) => {
          const Icon = m.icon;
          return (
            <li
              key={m.id}
              data-on={active === m.id ? "" : undefined}
              onClick={() => setActive((a) => (a === m.id ? null : m.id))}
              className="iso-card rounded-2xl border border-white/10 bg-[rgba(13,26,47,0.82)] px-4 py-3"
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
