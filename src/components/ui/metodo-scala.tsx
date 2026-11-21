/**
 * Hero di /metodo: le 4 fasi come una scala isometrica che sale verso il ROI.
 * Un segnale d'oro sale gradino per gradino; ogni gradino lavora (lente che scansiona,
 * progetto che si disegna, sistema che si accende, numeri che crescono).
 */
import { DraftingCompass, LineChart, Rocket, Search } from "lucide-react";
import { Box, GOLD, IsoGrid, IsoStage, PLANE, at, makeIso, poly } from "./iso-kit";
import type { StageItem } from "./iso-kit";

const P = makeIso(500, 590);

// I gradini avanzano verso il fondo a destra (y che cala) e salgono: sullo schermo vanno su e a destra.
const STEPS = [0, 1, 2, 3].map((i) => {
  const y1 = 200 - i * 110;
  return { i, y0: y1 - 100, y1, yc: y1 - 50, z: [40, 90, 140, 190][i] };
});

const ITEMS: StageItem[] = [
  { id: "assessment", n: "01", title: "Assessment", desc: "Sett. 1 · Processi mappati, numeri di partenza misurati", icon: Search, anchor: P(0, STEPS[0].yc, STEPS[0].z), side: "left", top: 68 },
  { id: "progetto", n: "02", title: "Progettazione", desc: "Sett. 2 · Il sistema disegnato sui tuoi processi reali", icon: DraftingCompass, anchor: P(0, STEPS[1].yc, STEPS[1].z), side: "left", top: 40 },
  { id: "attivazione", n: "03", title: "Attivazione", desc: "Sett. 2–4 · Integrato con ciò che usi, testato su casi veri", icon: Rocket, anchor: P(0, STEPS[2].yc, STEPS[2].z), side: "right", top: 50 },
  { id: "misura", n: "04", title: "Misura e iterazione", desc: "Dal giorno 30 · Ogni mese i numeri contro la base", icon: LineChart, anchor: P(0, STEPS[3].yc, STEPS[3].z), side: "right", top: 20 },
];

const WEEKS = ["SETT. 1", "SETT. 2", "SETT. 2–4", "DAL GIORNO 30"];

const PATH_PTS = STEPS.map((s) => P(0, s.yc, s.z + 2));
const CLIMB = `M${PATH_PTS.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`;

const Lente = () => (
  <g>
    <circle r="26" fill="rgba(246,190,9,0.08)" stroke={GOLD} strokeWidth="2.2" />
    <path d="M18 18L38 38" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
    <g>
      <circle r="38" fill="none" stroke="#8FA6CF" strokeWidth="1" strokeDasharray="4 7" />
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
    </g>
    <g>
      <path d="M0 0L-24 -8A26 26 0 0 1 -8 -24Z" fill={GOLD} opacity="0.35" />
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" />
    </g>
  </g>
);

const Progetto = () => (
  <g>
    <rect x="-40" y="-40" width="80" height="80" fill="rgba(60,110,200,0.18)" stroke="#8FA6CF" />
    <path d="M-40 -20H40M-40 0H40M-40 20H40M-20 -40V40M0 -40V40M20 -40V40" stroke="#5A76A6" strokeWidth="0.6" />
    <path d="M-30 -30H10V5H30V30H-30Z" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="200" strokeDashoffset="200">
      <animate attributeName="stroke-dashoffset" values="200;0;0;200" keyTimes="0;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
    </path>
  </g>
);

const Accensione = () => (
  <g>
    {[0, 1, 2].map((i) => (
      <circle key={i} r="10" fill="none" stroke={GOLD} strokeWidth="1.5">
        <animate attributeName="r" values="12;46" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
      </circle>
    ))}
    <circle r="12" fill={GOLD} />
    <circle r="5" fill="#0B1628" />
  </g>
);

const Numeri = ({ y, z }: { y: number; z: number }) => {
  const bars = [
    { dx: -30, dy: 20, h: 30 },
    { dx: 0, dy: 0, h: 52 },
    { dx: 30, dy: -20, h: 78 },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <g key={i}>
          <Box P={P} x0={b.dx - 9} x1={b.dx + 9} y0={y + b.dy - 9} y1={y + b.dy + 9} z0={z} z1={z + b.h} top={i === 2 ? GOLD : "#8FA6CF"} left={i === 2 ? "#C79500" : "#5A76A6"} right={i === 2 ? "#A07700" : "#465F8A"} stroke="#0B1628" />
          <animateTransform attributeName="transform" type="translate" values={`0 ${b.h * 0.6};0 0;0 0;0 ${b.h * 0.6}`} keyTimes="0;0.3;0.85;1" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </g>
      ))}
    </g>
  );
};

const MetodoScala = () => (
  <IsoStage items={ITEMS} label="Le quattro fasi del metodo AEDIX come una scala che sale verso il ritorno dell'investimento" hint="Passa su ogni gradino">
    {(part) => (
      <>
        <g className="iso-fade">
          <path d={poly(P(-170, -290, -2), P(170, -290, -2), P(170, 250, -2), P(-170, 250, -2))} fill="#0D1A30" stroke="#22365A" />
          <IsoGrid P={P} half={160} z={-2} step={40} />
        </g>
        {[...STEPS].reverse().map((s) => {
          const id = ITEMS[s.i].id;
          const sym = P(0, s.yc, s.z);
          return (
            <g key={s.i} {...part(id, 0.15 + s.i * 0.18)}>
              <Box P={P} x0={-90} x1={90} y0={s.y0} y1={s.y1} z0={0} z1={s.z} top="#22365A" left="#182A48" right="#13213A" stroke="#3E5478" />
              <path d={poly(P(-90, s.y0, s.z), P(90, s.y0, s.z), P(90, s.y1, s.z), P(-90, s.y1, s.z))} fill="none" stroke={GOLD} strokeOpacity="0.5" />
              <g transform={`${at(P(90, s.y1 - 8, s.z - 12))} ${PLANE.right}`}>
                <text fontSize="12" dominantBaseline="hanging" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fill="#8FA6CF">{WEEKS[s.i]}</text>
              </g>
              <g transform={`${at(P(-80, s.y1, s.z - 6))} ${PLANE.left}`}>
                <text fontSize="26" fontWeight="700" dominantBaseline="hanging" fontFamily="Space Grotesk, sans-serif" fill={s.i === 3 ? GOLD : "#5A76A6"}>{`0${s.i + 1}`}</text>
              </g>
              {s.i < 3 ? (
                <g transform={`${at(sym)} ${PLANE.top}`}>
                  {s.i === 0 && <Lente />}
                  {s.i === 1 && <Progetto />}
                  {s.i === 2 && <Accensione />}
                </g>
              ) : (
                <Numeri y={s.yc} z={s.z} />
              )}
            </g>
          );
        })}
        <g className="iso-fade" style={{ animationDelay: "1.1s" }} pointerEvents="none">
          <path d={CLIMB} fill="none" stroke={GOLD} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 5" />
          <path d={CLIMB} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="520" strokeDashoffset="520">
            <animate attributeName="stroke-dashoffset" values="520;0;0;520" keyTimes="0;0.6;0.9;1" dur="6s" repeatCount="indefinite" />
          </path>
          <g>
            <circle r="9" fill={GOLD} opacity="0.25" />
            <circle r="4.5" fill={GOLD} />
            <animateMotion dur="6s" repeatCount="indefinite" path={CLIMB} keyPoints="0;1;1;0" keyTimes="0;0.6;0.9;1" calcMode="linear" />
          </g>
        </g>
      </>
    )}
  </IsoStage>
);

export default MetodoScala;
