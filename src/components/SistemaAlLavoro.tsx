import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import type { WorkflowAction, WorkflowGraph } from "@/components/ui/interactive-workflow-blueprint";

// La lavagna pesa: si scarica solo quando la sezione sta per entrare nello schermo.
const WorkflowBlueprint = lazy(() => import("@/components/ui/interactive-workflow-blueprint"));

type Passo = Pick<WorkflowAction, "label" | "detail" | "kind"> & { tool: string; live: string };

/** Un sistema AI ibrido mentre lavora: software, agenti AI e persone sullo stesso flusso. Esempio. */
const PASSI: Passo[] = [
  { label: "Arriva una richiesta", detail: "Email, WhatsApp o modulo del sito: entra tutto nello stesso posto.", kind: "trigger", tool: "Canali", live: "Richiesta di preventivo da un nuovo cliente, ore 22:47" },
  { label: "L'agente AI la legge", detail: "Capisce cosa serve, cerca i dati mancanti e prepara il lavoro.", kind: "agent", tool: "Agente AI", live: "Richiesta capita: mancano due misure, chieste al cliente" },
  { label: "Il software si aggiorna", detail: "Cliente, pratica e documenti finiscono nel gestionale, senza ricopiare.", kind: "integration", tool: "Software verticale", live: "Pratica aperta, bozza di preventivo pronta" },
  { label: "Una persona decide", detail: "Le scelte che contano passano da chi ha la responsabilità.", kind: "review", tool: "Il tuo team", live: "Approvato dal responsabile con una correzione" },
  { label: "Risposta al cliente", detail: "Il cliente riceve la risposta giusta, in ore e non in giorni.", kind: "delivery", tool: "Cliente", live: "Preventivo inviato: 9 ore dopo la richiesta, non 4 giorni" },
  { label: "Numeri del mese", detail: "Ore liberate, pratiche gestite, tempi di risposta: misurati contro la base.", kind: "review", tool: "Misura", live: "Questo mese: 61 ore liberate, risposta media sotto un giorno" },
];

const grafo: WorkflowGraph = {
  nodes: PASSI.map((p, i) => ({
    id: `p${i}`,
    type: "blueprint" as const,
    position: { x: (i % 3) * 300, y: Math.floor(i / 3) * 260 + (i % 3 === 1 ? 40 : 0) },
    data: { ...p } as WorkflowAction,
  })),
  edges: PASSI.slice(1).map((_, i) => ({ id: `e${i}`, source: `p${i}`, target: `p${i + 1}` })),
};

const COLORI = {
  "--color-background": "#0B1628",
  "--color-foreground": "#EEF2F9",
  "--color-card": "#0F1E36",
  "--color-muted-foreground": "#8FA6CF",
  "--color-border": "rgba(143,166,207,0.22)",
  "--color-primary": "#F6BE09",
  "--color-primary-foreground": "#0B1628",
  "--color-chart-2": "#FDE68A",
  "--color-chart-3": "#34D399",
  "--wb-radius": "16px",
} as CSSProperties;

export default function SistemaAlLavoro() {
  const box = useRef<HTMLDivElement>(null);
  const [vicino, setVicino] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVicino(true);
        io.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <div className="max-w-[760px]">
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il sistema, mentre lavora</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(30px, 4.2vw, 54px)" }}>
            Software, agenti AI e persone.<br />
            <span className="italic font-light text-primary">Sullo stesso flusso.</span>
          </h2>
          <p className="text-[17px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8]">
            Ecco un sistema AI ibrido al lavoro, passo dopo passo: l'agente fa il lavoro ripetitivo, il software tiene i dati,
            le persone decidono quello che conta. E ogni mese si misura quanto ha reso. Esempio.
          </p>
        </div>
        <div ref={box} className="mt-12 min-h-[600px]">
          {vicino && (
            <Suspense fallback={<div className="h-[600px] rounded-2xl border border-white/10 bg-white/[0.03]" />}>
              <WorkflowBlueprint vetrina title="Una richiesta, dall'arrivo alla misura" subtitle="Esempio · sistema AI ibrido" initialGraph={grafo} apps={[]} style={COLORI} oraInizio="22:47" />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
