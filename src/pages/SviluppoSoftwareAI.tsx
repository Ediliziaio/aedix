import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Bot, Layers, Plug, Rocket, Check, X, ArrowRight, ChevronDown,
  ShieldCheck, Gauge, UserCheck, FlaskConical,
} from "lucide-react";
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

const offerte = [
  {
    icon: <Bot size={30} />, color: "#A855F7",
    title: "Agenti AI su misura",
    text: "Agenti che rispondono ai clienti, qualificano lead, generano preventivi e documenti, monitorano scadenze. Ancorati ai dati reali della tua azienda (RAG), con supervisione umana sulle azioni critiche.",
  },
  {
    icon: <Layers size={30} />, color: "#00D4FF",
    title: "Software gestionale con AI nativa",
    text: "Piattaforme verticali dove l'AI non è un plugin ma parte dell'architettura: come Edilizia in Cloud, il nostro gestionale per imprese edili. Progettiamo lo stesso modello per altri settori.",
  },
  {
    icon: <Plug size={30} />, color: "#10B981",
    title: "Integrazione AI nei sistemi esistenti",
    text: "Colleghiamo l'AI a ERP, CRM e gestionali che usi già: l'AI legge e scrive sui tuoi sistemi di record, senza sostituirli. Niente migrazioni traumatiche, niente silos nuovi.",
  },
  {
    icon: <Rocket size={30} />, color: "#F59E0B",
    title: "Prodotti SaaS: da idea a produzione",
    text: "Sviluppo completo di piattaforme SaaS con AI: architettura, sviluppo, deploy su cloud europeo, conformità e manutenzione evolutiva. Dall'MVP validato al prodotto che scala.",
  },
];

const confronto = [
  { generica: "Consegna il codice e sparisce", aedix: "Sistema in produzione, misurato ogni mese, con manutenzione evolutiva" },
  { generica: "Demo brillante, produzione fragile", aedix: "Architettura ibrida: AI + dati reali + supervisione umana — regge il carico vero" },
  { generica: "L'AI come feature decorativa", aedix: "L'AI progettata dentro i processi: ogni automazione ha un numero attaccato" },
  { generica: "Compliance rimandata a dopo", aedix: "GDPR e AI Act by design: tracciabilità, human-in-the-loop, dati su infrastruttura EU" },
];

const fasi = [
  { num: "01", title: "Analisi", text: "Mappiamo i processi ad alto impatto e misuriamo la baseline: dove si perdono ore, lead e margini. Senza baseline non esiste ROI dimostrabile." },
  { num: "02", title: "Progettazione", text: "Architettura del sistema: cosa automatizza l'AI, cosa resta alle persone, come si integra con i tuoi sistemi. Piano con costi e tempi chiari." },
  { num: "03", title: "Sviluppo e attivazione", text: "Sviluppo in cicli brevi, test su casi reali, formazione del team. In produzione in settimane, non in trimestri." },
  { num: "04", title: "Misura ed evoluzione", text: "Metriche visibili ogni mese: ore liberate, pratiche gestite, tempi di risposta. Il sistema cresce un processo alla volta." },
];

const faqs = [
  { q: "Quanto costa sviluppare un software AI per un'azienda?", a: "Dipende dal punto di partenza. Un sistema costruito su una piattaforma verticale esistente parte da qualche migliaio di euro di setup più un canone mensile; uno sviluppo su misura con integrazioni ERP/CRM si colloca tipicamente tra 30.000 e 80.000 euro il primo anno; un prodotto SaaS completo da zero supera i 100.000. In ogni caso definiamo prima la baseline, così il ritorno si misura — nei progetti ben scoperti il pareggio arriva in 6-12 mesi." },
  { q: "Quanto tempo serve per mettere in produzione un software AI?", a: "Con il nostro metodo, le prime automazioni vanno in produzione in 2-6 settimane: analisi (1-2 settimane), progettazione, sviluppo in cicli brevi e attivazione. Un prodotto SaaS completo richiede 3-6 mesi. Diffida dei progetti AI che promettono tutto e restano in demo: il ritmo sano è un processo alla volta, in produzione, misurato." },
  { q: "Meglio sviluppare un software AI su misura o adottare una piattaforma?", a: "Nella maggioranza dei casi conviene l'approccio ibrido: partire da una piattaforma matura e personalizzarla sui propri processi, riservando lo sviluppo su misura ai componenti che costituiscono un vero vantaggio competitivo. Il build puro da zero costa 5-10 volte tanto e arriva a valore in 12-18 mesi invece che in settimane. Nella call iniziale valutiamo insieme quale mix ha senso per il tuo caso." },
  { q: "Come scelgo l'azienda di sviluppo software AI giusta?", a: "Verifica quattro cose: se ha prodotti propri in produzione (chi sviluppa solo per terzi non vive i problemi della produzione), come gestisce le allucinazioni dell'AI (la risposta giusta è: dati reali + supervisione umana, non 'il modello è bravo'), se la conformità GDPR e AI Act è progettata dall'inizio, e se propone metriche misurabili con baseline. AEDIX sviluppa e usa i propri sistemi ogni giorno, a partire da Edilizia in Cloud." },
  { q: "I miei dati aziendali sono al sicuro con l'AI?", a: "Nei nostri sistemi i dati restano nel perimetro del software aziendale su infrastruttura europea, non vengono usati per addestrare modelli pubblici di terzi, e ogni azione dell'AI è tracciata e verificabile. Le decisioni critiche passano da approvazione umana (human-in-the-loop), in linea con l'articolo 14 dell'AI Act e l'articolo 22 del GDPR." },
  { q: "Fornite anche manutenzione e aggiornamento dei modelli AI?", a: "Sì, ed è una parte essenziale: i modelli AI evolvono ogni pochi mesi e un sistema fermo perde qualità. I nostri contratti includono manutenzione evolutiva, aggiornamento dei modelli, monitoraggio delle performance e un report mensile con le metriche del sistema." },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.05 * index}>
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
          <span className="text-[16px] font-medium text-[rgba(255,255,255,0.9)] group-hover:text-primary transition-colors pr-4">{faq.q}</span>
          <ChevronDown size={20} className={`text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.9] pb-6">{faq.a}</p>
        </motion.div>
      </div>
    </FadeIn>
  );
};

const SviluppoSoftwareAI = () => (
  <>
    <SEO
      title="Sviluppo Software AI per Aziende — AEDIX"
      description="Azienda italiana di sviluppo software AI: agenti AI su misura, gestionali con AI nativa, integrazione con ERP e CRM, prodotti SaaS. In produzione in settimane, conformi AI Act e GDPR."
      path="/sviluppo-software-ai"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Sviluppo Software AI", url: "/sviluppo-software-ai" },
      ]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sviluppo software AI per aziende",
          serviceType: "Sviluppo software basato su intelligenza artificiale",
          provider: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
          areaServed: { "@type": "Country", name: "IT" },
          description:
            "Progettazione e sviluppo di software basato su intelligenza artificiale per aziende italiane: agenti AI operativi, gestionali verticali con AI nativa, integrazione AI con ERP e CRM, prodotti SaaS completi. Architettura ibrida con supervisione umana, conforme AI Act e GDPR.",
          url: "https://www.aedix.it/sviluppo-software-ai",
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
      <section className="relative pt-[112px] sm:pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 25% 30%, rgba(246,190,9,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 50%)" }}
        />
        <div className="relative max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Sviluppo Software AI</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold leading-[1.06] tracking-[-2px] mb-6 max-w-[900px]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Sviluppo software AI per aziende.<br />
              <span className="italic font-light text-primary">Fatto per andare in produzione.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.72)] max-w-[680px] font-light leading-[1.8] mb-10">
              AEDIX è un'azienda italiana di sviluppo software basato su intelligenza artificiale. Progettiamo{" "}
              <span className="text-white font-medium">agenti AI, gestionali con AI nativa, integrazioni con i sistemi esistenti e prodotti SaaS completi</span>{" "}
              — con un'architettura ibrida che unisce AI, dati reali e supervisione umana. Perché la differenza tra una demo e un software che lavora davvero è tutta lì.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="flex flex-wrap gap-4">
              <Link to="/contatti" className="shimmer-btn glow-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg relative overflow-hidden inline-block">
                Parlaci del tuo progetto →
              </Link>
              <Link to="/metodo" className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg hover:border-primary/50 hover:text-primary transition-all inline-block">
                Come lavoriamo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cosa sviluppiamo */}
      <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Cosa Sviluppiamo</span>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.8vw, 50px)" }}>
              Quattro tipi di software AI.<br />
              <span className="italic font-light text-primary">Un'unica architettura affidabile.</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {offerte.map((o, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="group relative rounded-xl glass-card p-8 lg:p-9 h-full flex flex-col hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: o.color }} />
                  <div className="mb-5 transition-transform duration-300 group-hover:scale-110" style={{ color: o.color }}>{o.icon}</div>
                  <h3 className="font-display text-[21px] font-semibold mb-3">{o.title}</h3>
                  <p className="text-[15px] leading-[1.85] text-[rgba(255,255,255,0.65)] font-light">{o.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Perché AEDIX vs software house generica */}
      <section className="py-20 sm:py-28 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Perché AEDIX</span>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.8vw, 50px)" }}>
              Non siamo una software house<br />
              <span className="italic font-light text-primary">che ha aggiunto "AI" al listino.</span>
            </h2>
            <p className="text-[16px] text-[rgba(255,255,255,0.62)] font-light max-w-[640px] mb-14 leading-[1.8]">
              Sviluppiamo sistemi AI ibridi e li usiamo ogni giorno sulle nostre stesse aziende, a partire da Edilizia in Cloud. Quello che vendiamo è quello che abbiamo già collaudato sul campo.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {confronto.map((row, i) => (
              <FadeIn key={i} delay={0.07 * i}>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                  <div className="flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0"><X size={11} className="text-red-400" /></span>
                    <p className="text-[14px] text-[rgba(255,255,255,0.5)] font-light leading-[1.65]">{row.generica}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0"><Check size={11} className="text-emerald-400" /></span>
                    <p className="text-[14px] text-[rgba(255,255,255,0.8)] font-light leading-[1.65]">{row.aedix}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Garanzie */}
          <FadeIn delay={0.3}>
            <div className="mt-14 grid sm:grid-cols-4 gap-4">
              {[
                { icon: <FlaskConical size={20} />, text: "Testato prima sulle nostre aziende" },
                { icon: <UserCheck size={20} />, text: "Supervisione umana by design" },
                { icon: <ShieldCheck size={20} />, text: "GDPR & AI Act, dati su cloud EU" },
                { icon: <Gauge size={20} />, text: "Metriche misurabili ogni mese" },
              ].map((g, i) => (
                <div key={i} className="p-5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)]">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">{g.icon}</div>
                  <p className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.6]">{g.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il Processo</span>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.8vw, 50px)" }}>
              Dal problema al software in produzione,<br />
              <span className="italic font-light text-primary">in quattro fasi misurate.</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {fasi.map((f, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 mb-5 bg-background">
                    <span className="font-mono text-[20px] font-bold text-primary">{f.num}</span>
                  </div>
                  <h3 className="font-display text-[19px] font-semibold mb-3">{f.title}</h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.75]">{f.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-12">
              <Link to="/metodo" className="inline-flex items-center gap-2 text-primary font-mono text-[12px] uppercase tracking-[2px] hover:gap-3 transition-all">
                Il metodo completo <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Domande Frequenti</span>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-14 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              Sviluppo software AI:<br />
              <span className="italic font-light text-primary">le risposte che cerchi.</span>
            </h2>
          </FadeIn>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Hai un processo da automatizzare<br />
              <span className="italic font-light text-primary">o un software da costruire?</span>
            </h2>
            <p className="text-[17px] text-[rgba(255,255,255,0.65)] font-light mb-10 max-w-[520px] mx-auto">
              Una call di 30 minuti per capire il tuo caso: cosa automatizzare, con quale architettura, in quanto tempo. Nessun impegno.
            </p>
            <Link to="/contatti" className="shimmer-btn glow-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] rounded-lg relative overflow-hidden">
              Prenota la call →
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  </>
);

export default SviluppoSoftwareAI;
