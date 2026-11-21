/**
 * Hero di /sicurezza: un caveau isometrico a strati. Ogni piano è una garanzia
 * (dati in UE, GDPR, AI Act, supervisione umana) e al centro c'è il blocco dei tuoi dati
 * con il lucchetto. Un anello di scansione gira sul perimetro, le richieste entrano dai bordi
 * e arrivano al centro solo passando da tutti gli strati.
 */
import { Database, FileCheck, Lock, Scale, UserCheck } from "lucide-react";
import { Box, GOLD, IsoStage, PLANE, at, makeIso, poly } from "./iso-kit";
import type { StageItem } from "./iso-kit";

const P = makeIso(500, 560);

const LAYERS = [
  { id: "ue", h: 220, z0: 0, z1: 16 },
  { id: "gdpr", h: 170, z0: 16, z1: 40 },
  { id: "aiact", h: 120, z0: 40, z1: 70 },
  { id: "umana", h: 75, z0: 70, z1: 108 },
];
const CORE = { h: 36, z0: 108, z1: 150 };

const ITEMS: StageItem[] = [
  { id: "core", n: "05", title: "I tuoi dati", desc: "Restano tuoi: li esporti tutti quando vuoi", icon: Lock, anchor: P(CORE.h, 0, CORE.z1), side: "right", top: 27 },
  { id: "umana", n: "04", title: "Supervisione umana", desc: "Ogni azione critica la approva una persona", icon: UserCheck, anchor: P(0, 75, 108), side: "left", top: 38 },
  { id: "aiact", n: "03", title: "Conformità AI Act", desc: "Ogni sistema classificato e documentato", icon: Scale, anchor: P(120, 0, 70), side: "right", top: 52 },
  { id: "gdpr", n: "02", title: "GDPR operativo", desc: "Documentazione consegnata prima del go-live", icon: FileCheck, anchor: P(0, 170, 40), side: "left", top: 64 },
  { id: "ue", n: "01", title: "Dati in Europa", desc: "Server UE, nessun addestramento sui tuoi dati", icon: Database, anchor: P(220, 0, 16), side: "right", top: 74 },
];

const COLORS = [
  { top: "#14233E", left: "#0F1B31", right: "#0C1628" },
  { top: "#1A2B4A", left: "#14223C", right: "#101C32" },
  { top: "#203457", left: "#182A48", right: "#13213A" },
  { top: "#27406A", left: "#1D3154", right: "#182946" },
];

// Le dodici stelle sul piano esterno: i dati restano in Europa.
const Stelle = () => (
  <g transform={`${at(P(0, 0, 16))} ${PLANE.top}`}>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <circle key={i} cx={Math.cos(a) * 196} cy={Math.sin(a) * 196} r="3.2" fill={GOLD} opacity="0.85" />;
    })}
  </g>
);

const Scansione = () => (
  <g transform={`${at(P(0, 0, 17))} ${PLANE.top}`} pointerEvents="none">
    <g>
      <circle r="208" fill="none" stroke={GOLD} strokeWidth="1.2" strokeDasharray="40 260" opacity="0.8" />
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite" />
    </g>
    <circle r="60" fill="none" stroke={GOLD} strokeWidth="1">
      <animate attributeName="r" values="60;230" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0" dur="4s" repeatCount="indefinite" />
    </circle>
  </g>
);

// Le richieste entrano dai quattro lati e salgono strato per strato fino al centro.
const INGRESSI = [
  [P(-260, 0, 0), P(-170, 0, 40), P(-120, 0, 70), P(-75, 0, 108), P(0, 0, 150)],
  [P(0, 260, 0), P(0, 170, 40), P(0, 120, 70), P(0, 75, 108), P(0, 0, 150)],
  [P(260, 0, 0), P(170, 0, 40), P(120, 0, 70), P(75, 0, 108), P(0, 0, 150)],
  [P(0, -260, 0), P(0, -170, 40), P(0, -120, 70), P(0, -75, 108), P(0, 0, 150)],
].map((pts) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`);

const Nucleo = () => {
  const lockAt = P(0, 0, CORE.z1);
  return (
    <g>
      {/* colonna di luce sopra il nucleo */}
      <path d={poly(P(-20, -20, CORE.z1), P(20, 20, CORE.z1), [lockAt[0] + 34, lockAt[1] - 170], [lockAt[0] - 34, lockAt[1] - 170])} fill="url(#scudo-beam)" />
      <Box P={P} x0={-CORE.h} x1={CORE.h} y0={-CORE.h} y1={CORE.h} z0={CORE.z0} z1={CORE.z1} top={GOLD} left="#C79500" right="#A07700" stroke="#FFE08A" />
      <g transform={`${at(P(0, 0, CORE.z1))} ${PLANE.top}`}>
        <rect x="-11" y="-6" width="22" height="18" rx="3" fill="#0B1628" />
        <path d="M-7 -6V-12A7 7 0 0 1 7 -12V-6" stroke="#0B1628" strokeWidth="4" fill="none" />
        <circle cy="3" r="2.6" fill={GOLD} />
      </g>
      {/* lo scudo che fluttua sopra */}
      <g transform={at([lockAt[0], lockAt[1] - 120])}>
        <g>
          <path d="M0 -38L32 -26V0C32 22 16 36 0 44C-16 36 -32 22 -32 0V-26Z" fill="rgba(246,190,9,0.12)" stroke={GOLD} strokeWidth="2" />
          <path d="M-12 2L-3 11L14 -8" stroke={GOLD} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="4s" repeatCount="indefinite" />
        </g>
      </g>
    </g>
  );
};

const SicurezzaScudo = () => (
  <IsoStage items={ITEMS} label="Un caveau a strati: dati in Europa, GDPR, AI Act e supervisione umana proteggono i dati al centro" hint="Passa su ogni strato">
    {(part) => (
      <>
        <defs>
          <linearGradient id="scudo-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="iso-fade">
          <path d={poly(P(-280, -280, -2), P(280, -280, -2), P(280, 280, -2), P(-280, 280, -2))} fill="#0B1628" stroke="#1E3256" />
        </g>
        {LAYERS.map((l, i) => (
          <g key={l.id} {...part(l.id, 0.15 + i * 0.18)}>
            <Box P={P} x0={-l.h} x1={l.h} y0={-l.h} y1={l.h} z0={l.z0} z1={l.z1} {...COLORS[i]} stroke="#3E5478" />
            <path d={poly(P(-l.h, -l.h, l.z1), P(l.h, -l.h, l.z1), P(l.h, l.h, l.z1), P(-l.h, l.h, l.z1))} fill="none" stroke={GOLD} strokeOpacity={0.25 + i * 0.12} />
            {l.id === "ue" && (
              <>
                <Stelle />
                <Scansione />
              </>
            )}
            {l.id === "umana" && (
              <g transform={`${at(P(48, 48, l.z1))} ${PLANE.top}`}>
                <circle r="9" fill="#10B981" />
                <path d="M-4 0L-1 3L5 -3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        ))}
        <g {...part("core", 0.9)}>
          <Nucleo />
        </g>
        <g className="iso-fade" style={{ animationDelay: "1.2s" }} pointerEvents="none">
          {INGRESSI.map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke={GOLD} strokeOpacity="0.15" strokeDasharray="3 5" />
              <g>
                <circle r="7" fill={GOLD} opacity="0.2" />
                <circle r="3" fill={GOLD} />
                <animateMotion dur="5s" begin={`${-i * 1.25}s`} repeatCount="indefinite" path={d} />
              </g>
            </g>
          ))}
        </g>
      </>
    )}
  </IsoStage>
);

export default SicurezzaScudo;
