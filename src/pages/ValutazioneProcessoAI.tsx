import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { csvCell, estimateProcess, type ProcessInputs } from "@/lib/processEstimate";

const initial: ProcessInputs = { monthlyRuns: 120, minutesBefore: 12, minutesAfter: 5, hourlyCost: 30, monthlyTools: 100, setupCost: 600 };
const fields: { key: keyof ProcessInputs; label: string; help: string }[] = [
  { key: "monthlyRuns", label: "Esecuzioni al mese", help: "Conta le attività effettive, ad esempio 120 richieste elaborate." },
  { key: "minutesBefore", label: "Minuti per attività oggi", help: "Tempo medio misurato su più attività, comprese correzioni e passaggi manuali." },
  { key: "minutesAfter", label: "Minuti dopo l’automazione", help: "Includi controllo umano, gestione delle eccezioni e correzioni. Verificali con una prova." },
  { key: "hourlyCost", label: "Valore di un’ora di lavoro (€)", help: "Usa un costo aziendale coerente. Valorizzare tempo non equivale a risparmiare denaro." },
  { key: "monthlyTools", label: "Costi aggiuntivi mensili (€)", help: "Licenze, consumi, manutenzione e gestione aggiuntiva." },
  { key: "setupCost", label: "Costo iniziale (€)", help: "Integrazione, configurazione, formazione e tempo dedicato alla partenza." },
];
const number = (n: number) => n.toLocaleString("it-IT", { maximumFractionDigits: 2 });
const euro = (n: number) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

export default function ValutazioneProcessoAI() {
  const [name, setName] = useState("");
  const [inputs, setInputs] = useState<Record<keyof ProcessInputs, string>>(() => Object.fromEntries(Object.entries(initial).map(([k,v]) => [k,String(v)])) as Record<keyof ProcessInputs,string>);
  const values = Object.fromEntries(Object.entries(inputs).map(([k,v]) => [k,v.trim() === "" ? NaN : Number(v)])) as ProcessInputs;
  const result = estimateProcess(values);
  function download() {
    if (!result) return;
    const rows: (string | number)[][] = [["Scheda di valutazione processo", "AEDIX"], ["Processo", name || "Processo da definire"], ["Nota", "Stima illustrativa di capacità: non è una promessa di risparmio o un preventivo."], ...fields.map(f => [f.label,values[f.key]]), ["Ore liberate al mese",result.hoursFreed], ["Valore capacità mensile EUR",result.capacityValue], ["Saldo mensile stimato EUR",result.monthlyBalance], ["Recupero teorico costo iniziale (mesi)", result.paybackMonths ?? "Non calcolabile: saldo mensile non positivo"]];
    const blob = new Blob(["\uFEFF" + rows.map(row => row.map(csvCell).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download="scheda-processo-ai-aedix.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  return <Layout>
    <SEO title="Valutare un processo da automatizzare | AEDIX" description="Stima ore, costi e controllo umano prima di automatizzare un processo aziendale. Calcolatore gratuito con scheda CSV, senza registrazione." path="/strumenti/valutazione-processo-ai" image="/images/valutazione-processo-ai-og.webp" breadcrumbs={[{name:"Home",url:"/"},{name:"Servizi",url:"/servizi"},{name:"Valutazione processo AI",url:"/strumenti/valutazione-processo-ai"}]} />
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-primary uppercase tracking-widest text-sm mb-4">Strumento gratuito · nessuna registrazione</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold max-w-3xl">Quale processo conviene automatizzare?</h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">Parti da un’attività ripetitiva, misura il tempo attuale e confrontalo con una prova di automazione. Questa scheda ti aiuta a rendere esplicite le ipotesi, compreso il controllo delle persone.</p>
        <figure className="mt-8"><img src="/images/valutazione-processo-ai.webp" alt="Illustrazione di un flusso di lavoro composto da schede collegate e una clessidra" width="1200" height="800" className="rounded-2xl w-full max-h-80 object-cover" /><figcaption className="text-xs text-muted-foreground mt-2">Illustrazione concettuale generata con AI.</figcaption></figure>
        <section className="mt-12 grid lg:grid-cols-2 gap-8" aria-labelledby="simulazione">
          <div className="rounded-2xl border border-border p-6 sm:p-8">
            <h2 id="simulazione" className="text-2xl font-semibold">La tua simulazione</h2>
            <p className="mt-3 text-sm text-muted-foreground">I valori iniziali sono un esempio inventato per spiegare il calcolo, non dati di un cliente. Sostituiscili con misure tue. I dati inseriti restano nella pagina e non vengono inviati dal calcolatore.</p>
            <label className="block mt-6 font-medium" htmlFor="process-name">Nome del processo (facoltativo)</label>
            <input id="process-name" value={name} maxLength={150} onChange={e=>setName(e.target.value)} placeholder="Es. classificazione richieste in arrivo" className="mt-2 w-full rounded-lg border border-border bg-background p-3" />
            {fields.map(f => <div key={f.key} className="mt-5"><label className="block font-medium" htmlFor={f.key}>{f.label}</label><p id={`${f.key}-help`} className="mt-1 text-sm text-muted-foreground">{f.help}</p><input id={f.key} type="number" min="0" step="any" inputMode="decimal" aria-describedby={`${f.key}-help`} value={inputs[f.key]} onChange={e=>setInputs({...inputs,[f.key]:e.target.value})} className="mt-2 w-full rounded-lg border border-border bg-background p-3" /></div>)}
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 sm:p-8 self-start lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Risultato indicativo</h2>
            {result ? <><dl className="mt-6 space-y-5">
              <div><dt>Ore liberate al mese</dt><dd className="text-4xl font-bold text-primary mt-1">{number(result.hoursFreed)} ore</dd></div>
              <div><dt>Valore della capacità liberata</dt><dd className="text-2xl font-semibold">{euro(result.capacityValue)}/mese</dd></div>
              <div><dt>Saldo dopo i costi aggiuntivi mensili</dt><dd className="text-2xl font-semibold">{euro(result.monthlyBalance)}/mese</dd></div>
              <div><dt>Recupero teorico del costo iniziale</dt><dd className="text-xl">{result.paybackMonths === null ? "Non calcolabile: saldo mensile non positivo" : `${number(result.paybackMonths)} mesi`}</dd></div>
            </dl><p className="mt-6 text-sm text-muted-foreground">{result.hoursFreed < 0 ? "Con queste ipotesi il processo richiede più tempo dopo l’automazione. Rivedi il flusso prima di procedere." : "Il tempo liberato produce valore solo se puoi impiegarlo in attività utili. Non rappresenta automaticamente una riduzione di stipendi o uscite di cassa."}</p><button type="button" onClick={download} className="mt-6 rounded-lg bg-primary text-primary-foreground font-semibold px-6 py-3">Scarica la scheda CSV</button></> : <p role="status" className="mt-6">Completa tutti i campi con numeri validi, maggiori o uguali a zero.</p>}
          </div>
        </section>
        <section className="mt-16 max-w-3xl space-y-5" aria-labelledby="metodo"><h2 id="metodo" className="text-3xl font-semibold">Prima del calcolo: verifica il processo</h2><ol className="list-decimal pl-6 space-y-3"><li>Definisci cosa entra, cosa deve uscire e chi è responsabile del risultato.</li><li>Raccogli un campione rappresentativo di attività, inclusi gli errori e i casi difficili. Misura tempi e qualità.</li><li>Fai una prova limitata: conta controlli, eccezioni e correzioni, oltre al tempo della macchina.</li><li>Stabilisci chi approva le operazioni e come riprendere il lavoro manuale se la prova non funziona.</li><li>Confronta le ipotesi con i risultati misurati prima di estendere l’automazione.</li></ol>
          <h2 className="text-2xl font-semibold pt-5">Come sono calcolati i risultati</h2><p>Ore liberate = esecuzioni mensili × (minuti prima − minuti dopo) ÷ 60. Valore della capacità = ore liberate × valore orario. Saldo mensile = valore della capacità − costi aggiuntivi mensili. Il recupero teorico divide il costo iniziale per il saldo, soltanto se positivo.</p><p>Il modello non stima variazioni di ricavi, imposte, costo del capitale o probabilità di errore: valuta separatamente questi elementi. Una stima positiva non dimostra che un processo sia adatto all’AI.</p>
          <h2 className="text-2xl font-semibold pt-5">Porta le tue ipotesi a un confronto</h2><p>Puoi usare la scheda senza contattarci. Se vuoi approfondire, consulta il <Link to="/metodo" className="text-primary underline">metodo AEDIX</Link>, i <Link to="/servizi" className="text-primary underline">servizi di automazione</Link> o <Link to="/contatti" className="text-primary underline">richiedi un confronto sul processo</Link>.</p>
        </section>
      </div>
    </main>
  </Layout>;
}
