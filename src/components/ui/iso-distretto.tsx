/**
 * Scena isometrica comune per gli hero di Servizi, Perché noi e Sviluppo software AI:
 * quattro moduli (edifici) attorno a un nucleo d'oro, collegati da strade su cui
 * corrono i dati. Ogni modulo ha il suo simbolo sul tetto e le finestre che si
 * accendono; al passaggio del mouse (o al tocco) il modulo si illumina con la sua scheda.
 * Stesso linguaggio visivo di Metodo e Sicurezza (iso-kit).
 */
import type { LucideIcon } from "lucide-react";
import { Box, GOLD, IsoGrid, IsoStage, PLANE, at, makeIso, poly } from "./iso-kit";
import type { PartBinder, StageItem } from "./iso-kit";

const P = makeIso(500, 560);

export type ModuloDistretto = {
  id: string;
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  /** altezza dell'edificio */
  h: number;
  /** colore del tetto (il modulo in evidenza può essere d'oro) */
  oro?: boolean;
};

// Posizioni fisse: dietro, sinistra, destra, davanti.
// Le schede stanno sopra e sotto la fascia degli edifici laterali, così non li coprono.
const POS = [
  { x: -165, y: -165, side: "left" as const, top: 16 },
  { x: -165, y: 165, side: "left" as const, top: 84 },
  { x: 165, y: -165, side: "right" as const, top: 16 },
  { x: 165, y: 165, side: "right" as const, top: 84 },
];
const L = 58; // metà lato dell'edificio

const Finestre = ({ x, y, h, k }: { x: number; y: number; h: number; k: number }) => {
  const righe = Math.max(2, Math.floor((h - 24) / 26));
  return (
    <g transform={`${at(P(x - L, y + L, h - 14))} ${PLANE.left}`}>
      {Array.from({ length: righe * 3 }, (_, i) => {
        const r = Math.floor(i / 3);
        const c = i % 3;
        return (
          <rect key={i} x={14 + c * 30} y={r * 26} width="16" height="12" rx="1.5" fill={GOLD} opacity="0.15">
            <animate attributeName="opacity" values="0.12;0.85;0.12" dur={`${3 + ((i + k) % 4)}s`} begin={`${((i * 7 + k * 3) % 10) / 4}s`} repeatCount="indefinite" />
          </rect>
        );
      })}
    </g>
  );
};

export default function IsoDistretto({ moduli, centro, label, hint }: { moduli: ModuloDistretto[]; centro: string; label: string; hint?: string }) {
  const items: StageItem[] = moduli.slice(0, 4).map((m, i) => ({
    id: m.id,
    n: m.n,
    title: m.title,
    desc: m.desc,
    icon: m.icon,
    anchor: P(POS[i].x, POS[i].y, m.h + 6),
    side: POS[i].side,
    top: POS[i].top,
  }));

  const disegna = (part: PartBinder) => (i: number) => {
    const m = moduli[i];
    if (!m) return null;
    const { x, y } = POS[i];
    const Icon = m.icon;
    return (
      <g key={m.id} {...part(m.id, 0.2 + i * 0.16)}>
        <Box
          P={P}
          x0={x - L} x1={x + L} y0={y - L} y1={y + L} z0={0} z1={m.h}
          top={m.oro ? GOLD : "#2A4170"} left={m.oro ? "#C79500" : "#182A48"} right={m.oro ? "#A07700" : "#13213A"}
          stroke={m.oro ? "#0B1628" : "#3E5478"}
        />
        <Finestre x={x} y={y} h={m.h} k={i} />
        <g transform={`${at(P(x, y, m.h))} ${PLANE.top}`}>
          <rect x="-40" y="-40" width="80" height="80" rx="10" fill={m.oro ? "#0B1628" : "rgba(246,190,9,0.08)"} stroke={m.oro ? "#0B1628" : GOLD} strokeOpacity="0.6" />
          <g transform="translate(-24 -24)" style={{ color: GOLD }}>
            <Icon width={48} height={48} strokeWidth={1.6} />
          </g>
        </g>
        <g transform={`${at(P(x - L + 6, y + L, 18))} ${PLANE.left}`}>
          <text fontSize="22" fontWeight="700" dominantBaseline="hanging" fontFamily="Space Grotesk, sans-serif" fill={m.oro ? "#0B1628" : "#5A76A6"}>{m.n}</text>
        </g>
      </g>
    );
  };

  return (
    <IsoStage items={items} label={label} hint={hint}>
      {(part) => {
        const modulo = disegna(part);
        return (
        <>
          <g className="iso-fade">
            <path d={poly(P(-300, -300, -2), P(300, -300, -2), P(300, 300, -2), P(-300, 300, -2))} fill="#0D1A30" stroke="#22365A" />
            <IsoGrid P={P} half={280} z={-2} step={40} />
          </g>

          {/* strade dai moduli al nucleo, con i dati che corrono */}
          <g className="iso-fade" style={{ animationDelay: "0.5s" }} pointerEvents="none">
            {POS.map((p, i) => {
              const a = P(p.x * 0.62, p.y * 0.62, 0);
              const b = P(p.x * 0.22, p.y * 0.22, 0);
              const d = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
              const inverso = `M${b[0].toFixed(1)} ${b[1].toFixed(1)}L${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
              return (
                <g key={i}>
                  <path d={d} stroke="#3E5478" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
                  <path d={d} stroke={GOLD} strokeWidth="1.4" strokeDasharray="5 7" opacity="0.7" />
                  <circle r="5" fill={GOLD}>
                    <animateMotion dur={`${1.8 + i * 0.25}s`} repeatCount="indefinite" path={d} />
                  </circle>
                  <circle r="3.5" fill="#8FA6CF">
                    <animateMotion dur={`${2.2 + i * 0.2}s`} begin="0.9s" repeatCount="indefinite" path={inverso} />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* il modulo dietro va disegnato prima del nucleo */}
          {modulo(0)}

          {/* il nucleo */}
          <g className="iso-build" style={{ animationDelay: "0.05s" }}>
            <Box P={P} x0={-52} x1={52} y0={-52} y1={52} z0={0} z1={46} top="#22365A" left="#182A48" right="#13213A" stroke="#3E5478" />
            <Box P={P} x0={-32} x1={32} y0={-32} y1={32} z0={46} z1={92} top={GOLD} left="#C79500" right="#A07700" stroke="#0B1628" />
            <g transform={`${at(P(0, 0, 92))} ${PLANE.top}`}>
              {[0, 1].map((k) => (
                <circle key={k} r="20" fill="none" stroke={GOLD} strokeWidth="2">
                  <animate attributeName="r" values="22;70" dur="2.6s" begin={`${k * 1.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2.6s" begin={`${k * 1.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
            <g transform={`${at(P(-52, 52, 34))} ${PLANE.left}`}>
              <text x="52" fontSize="15" fontWeight="700" textAnchor="middle" dominantBaseline="hanging" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fill="#F6BE09">{centro}</text>
            </g>
          </g>

          {[1, 2, 3].map(modulo)}
        </>
        );
      }}
    </IsoStage>
  );
}
