import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Search, DraftingCompass, Rocket, LineChart, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const phases = [
  {
    num: "01",
    id: "fase-assessment",
    icon: <Search size={26} />,
    weeks: "Settimana 1",
    title: "Assessment",
    subtitle: "Capiamo dove l'AI genera valore nella tua azienda — e dove no.",
    description:
      "L'assessment è la fase che separa un progetto AI da una scommessa. In una o due sessioni di lavoro mappiamo i processi aziendali, misuriamo quanto costano oggi in ore e denaro, e identifichiamo i 2-3 casi d'uso dove l'automazione produce il ritorno più alto. Il risultato non è una presentazione commerciale: è una baseline numerica che userai per giudicare il progetto — e noi con lui.",
    deliverables: [
      "Mappatura dei processi ad alto potenziale di automazione",
      "Analisi dei dati e dei sistemi esistenti (gestionale, CRM, email)",
      "2-3 casi d'uso prioritari con stima di ore e costi recuperabili",
      "Baseline misurata: i numeri di oggi, per confrontarli con quelli di domani",
    ],
    output: "Report di assessment con piano d'azione",
  },
  {
    num: "02",
    id: "fase-progettazione",
    icon: <DraftingCompass size={26} />,
    weeks: "Settimana 2",
    title: "Progettazione",
    subtitle: "Progettiamo il sistema sui tuoi processi reali, non su un template.",
    description:
      "Ogni sistema AI ibrido ha tre strati da progettare insieme: il software che governa i dati, gli agenti AI che eseguono, i punti di controllo dove le persone approvano. In questa fase definiamo l'architettura, costruiamo la knowledge base sui tuoi documenti reali — listini, procedure, FAQ, storico — e fissiamo le metriche di successo con criteri di go/no-go espliciti. È anche la fase dove si progetta la conformità: base giuridica GDPR e classificazione AI Act per ogni componente, prima di scrivere una riga di configurazione.",
    deliverables: [
      "Architettura del sistema: software, agenti AI, punti di supervisione umana",
      "Knowledge base costruita sui tuoi documenti, listini e procedure",
      "Definizione delle metriche di successo e dei criteri di go/no-go",
      "Piano di conformità GDPR e AI Act per ogni componente",
    ],
    output: "Progetto esecutivo con metriche definite",
  },
  {
    num: "03",
    id: "fase-attivazione",
    icon: <Rocket size={26} />,
    weeks: "Settimane 2-4",
    title: "Attivazione",
    subtitle: "Configuriamo, integriamo e testiamo. Il tuo team lavora come sempre.",
    description:
      "L'attivazione richiede da 3 a 14 giorni a seconda della complessità delle integrazioni. Il principio è uno: il sistema si integra con quello che hai — gestionale, CRM, email, WhatsApp Business — senza sostituirlo e senza fermare l'operatività. Prima del go-live, il sistema viene testato su casi reali insieme al tuo team: richieste vere, documenti veri, risposte verificate una per una. Il lancio è graduale, con ogni interazione monitorata nelle prime settimane.",
    deliverables: [
      "Configurazione e integrazione con i sistemi esistenti — senza sostituirli",
      "Test su casi reali prima del go-live, con il tuo team",
      "Formazione operativa: 2 ore, non 2 settimane",
      "Go-live graduale con monitoraggio di ogni interazione",
    ],
    output: "Sistema operativo in produzione",
  },
  {
    num: "04",
    id: "fase-misura",
    icon: <LineChart size={26} />,
    weeks: "Dal giorno 30",
    title: "Misura e iterazione",
    subtitle: "Confrontiamo i numeri con la baseline. Quello che non rende, si corregge.",
    description:
      "Un sistema AI non si giudica alla demo: si giudica al terzo mese di produzione. Ogni mese confrontiamo i numeri reali — ore recuperate, lead gestiti, tempi di risposta, preventivi emessi — con la baseline dell'assessment. La knowledge base viene raffinata sulle conversazioni reali, i flussi corretti dove serve. Solo quando il primo processo è a regime si passa al successivo: è così che il sistema cresce senza mai perdere affidabilità.",
    deliverables: [
      "Report mensile: ore recuperate, lead gestiti, tempi di risposta",
      "Ottimizzazione continua della knowledge base e dei flussi",
      "Estensione a nuovi processi solo quando il primo è a regime",
      "Revisione trimestrale del ROI rispetto alla baseline",
    ],
    output: "ROI documentato, non dichiarato",
  },
];

const failures = [
  { stat: "70%", label: "dei progetti AI enterprise non supera la fase pilota", source: "Gartner" },
  { stat: "1 su 3", label: "arriva in produzione stabile e ci resta", source: "Osservatori PoliMi" },
  { stat: "0", label: "progetti dovrebbero partire senza una baseline misurata", source: "Il principio AEDIX" },
];

const principles = [
  {
    title: "Prima la baseline, poi il progetto",
    text: "Non partiamo mai senza aver misurato i numeri attuali. Senza baseline, qualsiasi promessa di ROI è una dichiarazione di marketing — non un risultato verificabile.",
  },
  {
    title: "Integrazione, non sostituzione",
    text: "Il tuo gestionale, il tuo CRM e le tue email restano. Il sistema AI si integra con quello che hai — la fonte di verità dei dati rimane una sola.",
  },
  {
    title: "Supervisione umana by design",
    text: "Ogni azione critica passa da un punto di approvazione umana. L'AI prepara, la persona decide. È il requisito dell'AI Act — e soprattutto è come si evita il disastro.",
  },
  {
    title: "Un processo alla volta",
    text: "Non digitalizziamo tutta l'azienda in un colpo. Attiviamo il processo con il ROI più alto, lo portiamo a regime, poi passiamo al successivo. Chi promette tutto e subito consegna niente e tardi.",
  },
];

const faqs = [
  {
    q: "Quanto tempo serve per implementare un sistema AI in azienda?",
    a: "Con il metodo AEDIX, dall'assessment al sistema in produzione passano 2-4 settimane: una settimana di assessment con baseline misurata, una di progettazione, e 3-14 giorni di attivazione a seconda delle integrazioni. La misura del ROI inizia dal giorno 30. I progetti AI che durano trimestri falliscono quasi sempre: il tempo lungo è un sintomo di scope sbagliato, non di ambizione.",
  },
  {
    q: "Cos'è l'assessment AI e cosa include?",
    a: "L'assessment è un'analisi di 45-90 minuti sul caso specifico dell'azienda: mappatura dei processi ad alto potenziale di automazione, analisi dei dati e dei sistemi esistenti, identificazione di 2-3 casi d'uso prioritari con stima di ore e costi recuperabili, e una baseline numerica di partenza. L'output è un report con piano d'azione — utilizzabile anche se non si prosegue con AEDIX.",
  },
  {
    q: "Devo cambiare gestionale o CRM per adottare un sistema AI ibrido?",
    a: "No. Il principio del metodo AEDIX è integrazione, non sostituzione: il sistema AI si collega al gestionale, al CRM, alle email e a WhatsApp Business esistenti tramite API e connettori. La fonte di verità dei dati rimane il tuo sistema attuale. Un progetto che chiede di buttare via il gestionale è quasi sempre un progetto destinato a fallire.",
  },
  {
    q: "Come misurate il ROI di un progetto AI?",
    a: "Con il confronto tra baseline e numeri di produzione. Prima del progetto misuriamo i numeri attuali: ore spese sui processi, tempi di risposta, lead gestiti, preventivi emessi. Dal giorno 30 confrontiamo ogni mese i numeri reali con quella baseline. Il ROI si calcola come (valore generato − costo totale) / costo totale su 12 mesi — documentato nei report mensili, non dichiarato nelle slide.",
  },
  {
    q: "Cosa succede se il sistema non funziona come previsto?",
    a: "Ogni progetto ha criteri di go/no-go definiti in fase di progettazione, prima di partire. Se le metriche non vengono raggiunte, si corregge: knowledge base, flussi, punti di supervisione. Se il caso d'uso si rivela sbagliato, lo diciamo — è esattamente il motivo per cui l'assessment misura la baseline prima di ogni impegno. Nessun vincolo annuale: il sistema si giudica sui numeri mensili.",
  },
  {
    q: "Il metodo funziona anche per medie e grandi aziende?",
    a: "Sì, con una differenza di scala: nelle medie e grandi imprese il metodo include la governance — comitato AI, registro dei sistemi, integrazione con DPO e legal, gestione dello shadow AI. Le 4 fasi restano le stesse, ma ogni caso d'uso entra da un processo di approvazione strutturato. L'approccio è descritto nella nostra guida all'AI per grandi aziende.",
  },
];

const Metodo = () => {
  return (
    <>
      <SEO
        title="Il Metodo AEDIX — Implementare l'AI in Azienda in 4 Fasi"
        description="Come implementare un sistema AI in azienda: assessment con baseline, progettazione, attivazione in 2-4 settimane, ROI misurato ogni mese. Il metodo AEDIX."
        path="/metodo"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Metodo", url: "/metodo" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Il Metodo AEDIX — Implementazione AI in 4 fasi",
            url: "https://www.aedix.it/metodo",
            inLanguage: "it-IT",
            description:
              "Il metodo AEDIX per implementare sistemi AI ibridi in azienda: assessment con baseline misurata, progettazione, attivazione in 2-4 settimane, misura mensile del ROI.",
            publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Come implementare un sistema AI ibrido in azienda",
            description:
              "Il processo in 4 fasi per portare un sistema AI ibrido in produzione: assessment, progettazione, attivazione e misura del ROI. Durata tipica: 2-4 settimane dal primo incontro al go-live.",
            totalTime: "P28D",
            step: phases.map((p, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: `${p.title} (${p.weeks})`,
              text: p.description,
              url: `https://www.aedix.it/metodo#${p.id}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-[140px] pb-16 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il Metodo</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                Dall'assessment al ROI.<br />
                <span className="italic font-light text-primary">In 4 settimane, non 4 trimestri.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[680px] font-light leading-[1.8]">
                Il metodo AEDIX porta un sistema AI ibrido in produzione in 2-4 settimane, in quattro fasi:
                assessment con baseline misurata, progettazione sui processi reali, attivazione integrata con i sistemi
                esistenti, e misura mensile del ROI. È il processo che usiamo su ogni progetto — dalle PMI alle
                medie e grandi imprese — ed è costruito per evitare il destino della maggior parte dei progetti AI:
                morire tra il pilota e la produzione.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Perché serve un metodo — dati citabili */}
        <section className="py-16 lg:py-20 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <div className="rounded-xl glass-card p-8 lg:p-12">
                <div className="flex items-start gap-4 mb-8">
                  <AlertTriangle size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display font-bold leading-[1.15] tracking-[-1px] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)" }}>
                      Perché la maggior parte dei progetti AI fallisce?
                    </h2>
                    <p className="text-[16px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] max-w-[720px]">
                      Perché parte dalla tecnologia invece che dal processo. Secondo Gartner, oltre il 70% delle
                      iniziative AI nelle organizzazioni non arriva mai alla produzione su scala: il pilota funziona
                      su dati puliti e casi ideali, poi si scontra con dati reali, sistemi legacy e nessun owner chiaro.
                      Le cause non sono tecniche — sono di metodo. Un progetto senza baseline non può dimostrare il ROI,
                      un progetto senza criteri di go/no-go non può essere giudicato, un progetto che ignora i sistemi
                      esistenti non verrà mai adottato da chi lavora.
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-5 pt-8 border-t border-[rgba(255,255,255,0.06)]">
                  {failures.map((f, i) => (
                    <div key={i}>
                      <span className="font-mono text-[36px] font-bold text-primary leading-none">{f.stat}</span>
                      <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light mt-2 leading-[1.6]">{f.label}</p>
                      <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.35)] mt-1 block">
                        Fonte: {f.source}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Le 4 fasi */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Le 4 fasi</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Come si implementa un sistema AI ibrido?
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-[16px] text-[rgba(255,255,255,0.6)] max-w-[640px] font-light mb-14">
                Quattro fasi, ognuna con deliverable e output verificabili. La regola: nessuna fase inizia
                se la precedente non ha prodotto il suo output.
              </p>
            </FadeIn>
            <div className="space-y-6">
              {phases.map((p, i) => (
                <FadeIn key={i} delay={0.06 * i}>
                  <div id={p.id} className="rounded-xl glass-card p-8 lg:p-10 scroll-mt-24">
                    <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-[32px] font-bold text-primary/40">{p.num}</span>
                          <div className="text-primary">{p.icon}</div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.4)] block mb-2">{p.weeks}</span>
                        <h3 className="font-display text-[26px] font-bold mb-3">{p.title}</h3>
                        <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7]">{p.subtitle}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light leading-[1.85] mb-6">{p.description}</p>
                        <ul className="space-y-3 mb-6">
                          {p.deliverables.map((d, di) => (
                            <li key={di} className="flex items-start gap-3 text-[15px] text-[rgba(255,255,255,0.72)] font-light leading-[1.65]">
                              <span className="mt-1 w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                <Check size={9} className="text-emerald-400" />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)]">
                          <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.4)]">Output</span>
                          <p className="text-[14px] text-primary font-medium mt-1">{p.output}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I principi</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Le regole che non negoziamo.
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {principles.map((pr, i) => (
                <FadeIn key={i} delay={0.06 * i}>
                  <div className="rounded-xl glass-card p-8 h-full">
                    <h3 className="font-display text-[19px] font-semibold mb-3">{pr.title}</h3>
                    <p className="text-[15px] text-[rgba(255,255,255,0.62)] font-light leading-[1.8]">{pr.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-12" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                Domande frequenti sul metodo.
              </h2>
            </FadeIn>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="p-7 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
                    <h3 className="font-display text-[17px] font-semibold mb-3 text-white">{f.q}</h3>
                    <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8]">{f.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Approfondimenti — internal linking */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-8">Approfondimenti</span>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { to: "/articoli/ai-grandi-aziende-italia-2026", label: "AI per grandi aziende: governance, ROI e scalabilità", tag: "Enterprise" },
                  { to: "/articoli/quanto-costa-ai-pmi-italiana-guida-2026", label: "Quanto costa l'AI per una PMI italiana? Guida prezzi", tag: "Strategia" },
                  { to: "/sicurezza", label: "Sicurezza e conformità: dati, GDPR e AI Act", tag: "Trust" },
                ].map((l, i) => (
                  <Link key={i} to={l.to} className="group p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-primary/30 transition-all">
                    <span className="font-mono text-[9px] uppercase tracking-[2px] text-primary block mb-3">{l.tag}</span>
                    <p className="text-[14px] text-[rgba(255,255,255,0.75)] font-light leading-[1.6] group-hover:text-white transition-colors">{l.label}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-[11px] font-mono uppercase tracking-[1px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Leggi <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 text-center">
          <div className="max-w-[720px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                Il primo passo è l'assessment.
              </h2>
              <p className="text-[16px] text-[rgba(255,255,255,0.6)] font-light mb-10">
                45 minuti sul tuo caso specifico. Esci con la mappa dei processi automatizzabili e una stima concreta — che tu prosegua con noi o no.
              </p>
              <Link
                to="/contatti"
                className="shimmer-btn glow-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] rounded-lg relative overflow-hidden"
              >
                Prenota l'assessment <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Metodo;
