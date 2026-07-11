import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Search, DraftingCompass, Rocket, LineChart } from "lucide-react";
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
    icon: <Search size={26} />,
    weeks: "Settimana 1",
    title: "Assessment",
    subtitle: "Capiamo dove l'AI genera valore nella tua azienda — e dove no.",
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
    icon: <DraftingCompass size={26} />,
    weeks: "Settimana 2",
    title: "Progettazione",
    subtitle: "Progettiamo il sistema sui tuoi processi reali, non su un template.",
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
    icon: <Rocket size={26} />,
    weeks: "Settimane 2-4",
    title: "Attivazione",
    subtitle: "Configuriamo, integriamo e testiamo. Il tuo team lavora come sempre.",
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
    icon: <LineChart size={26} />,
    weeks: "Dal giorno 30",
    title: "Misura e iterazione",
    subtitle: "Confrontiamo i numeri con la baseline. Quello che non rende, si corregge.",
    deliverables: [
      "Report mensile: ore recuperate, lead gestiti, tempi di risposta",
      "Ottimizzazione continua della knowledge base e dei flussi",
      "Estensione a nuovi processi solo quando il primo è a regime",
      "Revisione trimestrale del ROI rispetto alla baseline",
    ],
    output: "ROI documentato, non dichiarato",
  },
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

const Metodo = () => {
  return (
    <>
      <SEO
        title="Il Metodo AEDIX — Dall'assessment al ROI misurato"
        description="Come lavoriamo: assessment con baseline, progettazione sui processi reali, attivazione in 2-4 settimane, ROI misurato ogni mese. Nessun progetto IT infinito."
        path="/metodo"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Metodo", url: "/metodo" },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Il Metodo AEDIX",
          url: "https://www.aedix.it/metodo",
          inLanguage: "it-IT",
          description: "Il processo AEDIX in 4 fasi: assessment, progettazione, attivazione, misura del ROI.",
        }}
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
              <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[640px] font-light leading-[1.8]">
                La maggior parte dei progetti AI muore tra il pilota e la produzione. Il nostro processo è costruito per evitarlo:
                baseline misurata prima di iniziare, integrazione con i sistemi che hai già, supervisione umana su ogni azione critica,
                e numeri confrontabili ogni mese.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Phases */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto space-y-6">
            {phases.map((p, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <div className="rounded-xl glass-card p-8 lg:p-10">
                  <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-[32px] font-bold text-primary/40">{p.num}</span>
                        <div className="text-primary">{p.icon}</div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.4)] block mb-2">{p.weeks}</span>
                      <h2 className="font-display text-[26px] font-bold mb-3">{p.title}</h2>
                      <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7]">{p.subtitle}</p>
                    </div>
                    <div className="flex flex-col">
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
