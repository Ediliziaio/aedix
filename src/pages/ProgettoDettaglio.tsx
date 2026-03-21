import { useState, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Cloud, Shield, Brain, Rocket, Target, ScanFace, Briefcase, CheckCircle, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const projectData: Record<string, {
  name: string; color: string; icon: React.ReactNode; tagline: string; desc: string;
  features: string[]; useCases: string[]; stat: string; statLabel: string;
  faqs: { q: string; a: string }[];
}> = {
  "edilizia-in-cloud": {
    name: "Edilizia in Cloud", color: "#00D4FF", icon: <Cloud size={48} />,
    tagline: "Il sistema operativo per le imprese edili.",
    desc: "Gestionale completo per imprese edili: cantieri, documenti, team, fornitori, contabilità — tutto in un'unica piattaforma cloud. Progettato da chi gestisce cantieri, per chi gestisce cantieri.",
    features: ["Gestione cantieri e commesse", "Documentazione digitale e firma elettronica", "Dashboard in tempo reale su margini e costi", "Gestione team e assegnazione risorse", "Fatturazione e contabilità integrata", "App mobile per il cantiere"],
    useCases: ["Imprese edili con 5-50 dipendenti", "General contractor e subappaltatori", "Studi tecnici e progettisti"],
    stat: "+3h", statLabel: "risparmiate al giorno per dipendente",
    faqs: [
      { q: "Posso importare i dati dal mio gestionale attuale?", a: "Sì, offriamo migrazione assistita gratuita dai principali gestionali." },
      { q: "Funziona offline in cantiere?", a: "L'app mobile ha funzionalità offline con sincronizzazione automatica." },
    ],
  },
  "cantiere-in-cloud": {
    name: "Cantiere in Cloud", color: "#FF6B35", icon: <Shield size={48} />,
    tagline: "Sicurezza cantiere. Sotto controllo.",
    desc: "Tutti gli adempimenti di sicurezza cantiere gestiti digitalmente. POS, DUVRI, verbali, scadenze, formazione — ogni obbligo di legge monitorato e automatizzato.",
    features: ["POS e DUVRI digitali", "Scadenzario automatico obblighi formativi", "Verbali di coordinamento digitali", "Registro presenze e accessi cantiere", "Alert automatici su scadenze", "Archivio documentale a norma"],
    useCases: ["CSP/CSE e coordinatori della sicurezza", "Imprese edili con cantieri attivi", "RSPP e responsabili sicurezza"],
    stat: "100%", statLabel: "conformità normativa garantita",
    faqs: [
      { q: "È conforme alle normative vigenti?", a: "Sì, aggiorniamo costantemente la piattaforma in base alle normative italiane ed europee." },
      { q: "Posso gestire più cantieri contemporaneamente?", a: "Sì, senza limiti. Dashboard centralizzata con vista su tutti i cantieri." },
    ],
  },
  "edilizia-io": {
    name: "Edilizia.io", color: "#A855F7", icon: <Brain size={48} />,
    tagline: "11 agenti AI. Sempre attivi.",
    desc: "Agenti AI as a Service progettati per il settore edile e le PMI italiane. Rispondono ai clienti, qualificano lead, generano preventivi, gestiscono appuntamenti — 24 ore su 24, 7 giorni su 7.",
    features: ["Risponditore AI conversazionale multicanale", "Qualificazione automatica lead", "Generazione preventivi intelligente", "Booking appuntamenti autonomo", "Follow-up automatizzato pipeline", "Analytics e reportistica in tempo reale"],
    useCases: ["PMI che ricevono richieste via web/social", "Aziende senza reparto commerciale strutturato", "Imprese con picchi stagionali di domanda"],
    stat: "24/7", statLabel: "operativi senza interruzioni",
    faqs: [
      { q: "L'AI capisce il dialetto o il gergo tecnico?", a: "Sì, gli agenti sono addestrati sul linguaggio specifico del settore edile e delle PMI italiane." },
      { q: "Posso personalizzare le risposte?", a: "Assolutamente. Ogni agente viene configurato con il tuo tono di voce, i tuoi prodotti e le tue policy." },
    ],
  },
  "marketing-edile": {
    name: "Marketing Edile", color: "#10B981", icon: <Rocket size={48} />,
    tagline: "Marketing a performance. Zero rischio.",
    desc: "L'unica struttura di marketing in Italia che lavora a commissione sulle vendite chiuse. Nessun canone fisso, nessun budget minimo — se non vendi, non ci paghi.",
    features: ["Campagne ads su Google, Meta, LinkedIn", "Landing page e funnel ottimizzati dall'AI", "Tracking completo dal click alla vendita", "Ottimizzazione continua basata su dati reali", "Report trasparenti e condivisi", "Modello 100% a performance"],
    useCases: ["Imprese che spendono in marketing senza risultati", "Aziende che vogliono crescere senza rischio", "PMI senza reparto marketing interno"],
    stat: "4.2x", statLabel: "ROI medio in 6 mesi",
    faqs: [
      { q: "Devo anticipare il budget ads?", a: "No. Gestiamo tutto noi, incluso il budget pubblicitario." },
      { q: "Come tracciate le vendite chiuse?", a: "CRM integrato con tracking end-to-end: dal click all'annuncio alla firma del contratto." },
    ],
  },
  "vendita-edile": {
    name: "Vendita Edile", color: "#F59E0B", icon: <Target size={48} />,
    tagline: "Il metodo di vendita per imprese tecniche.",
    desc: "Un sistema di vendita ibrido (AI + persone) progettato per imprese del settore tecnico. Script, processi, formazione — tutto quello che serve per chiudere di più, meglio, prima.",
    features: ["Metodo di vendita strutturato e replicabile", "Script e obiezioni testate sul campo", "CRM integrato con AI per follow-up", "Formazione vendita per team tecnici", "Dashboard performance commerciale", "A/B testing su approcci di vendita"],
    useCases: ["Titolari che vendono ancora 'a sensazione'", "Team commerciali senza metodo strutturato", "Aziende con tasso di chiusura sotto il 20%"],
    stat: "+35%", statLabel: "aumento tasso di chiusura",
    faqs: [
      { q: "Funziona anche per chi non ha un team commerciale?", a: "Sì. Il metodo è pensato anche per titolari che vendono direttamente." },
      { q: "Quanto dura la formazione?", a: "Il programma base è di 4 settimane con affiancamento operativo." },
    ],
  },
  "talentprofile-360": {
    name: "TalentProfile 360°", color: "#EC4899", icon: <ScanFace size={48} />,
    tagline: "Assumi la persona giusta. Al primo colpo.",
    desc: "Assessment comportamentale avanzato: 242 domande, 15 tratti misurati, profilo completo del candidato. Sai chi stai assumendo prima di firmare il contratto.",
    features: ["242 domande scientificamente validate", "15 tratti comportamentali misurati", "Report dettagliato con grafici e insight", "Confronto con profilo ideale per il ruolo", "Storico assessment per ogni dipendente", "Integrazione con processi HR"],
    useCases: ["PMI che assumono e sbagliano (costa €30k per errore)", "Aziende in crescita con recruiting frequente", "HR manager che vogliono dati oggettivi"],
    stat: "−70%", statLabel: "turnover nei primi 12 mesi",
    faqs: [
      { q: "È scientificamente validato?", a: "Sì, basato su modelli psicometrici riconosciuti e validati su campioni italiani." },
      { q: "Quanto tempo richiede il test?", a: "Circa 25-30 minuti per il candidato. Il report è immediato." },
    ],
  },
  "impresa-leggera": {
    name: "Impresa Leggera", color: "#6366F1", icon: <Briefcase size={48} />,
    tagline: "Back-office senza assumere nessuno.",
    desc: "Outsourcing pay-per-use di tutte le attività amministrative: fatturazione, buste paga, adempimenti fiscali, gestione documentale. Paghi solo quello che usi.",
    features: ["Fatturazione elettronica automatizzata", "Elaborazione buste paga", "Adempimenti fiscali e scadenzario", "Gestione documentale digitale", "Consulenza fiscale e tributaria", "Dashboard costi e cash flow"],
    useCases: ["Micro-imprese che non possono permettersi un ufficio admin", "Aziende che vogliono variabilizzare i costi fissi", "Imprenditori che perdono ore in burocrazia"],
    stat: "−2", statLabel: "dipendenti amministrativi necessari",
    faqs: [
      { q: "Come funziona il pay-per-use?", a: "Paghi solo per i servizi che usi: tot per fattura, tot per busta paga. Nessun canone fisso." },
      { q: "Posso iniziare con un solo servizio?", a: "Certo. Scegli quello che ti serve ora e aggiungi il resto quando vuoi." },
    ],
  },
};

const allProjects = [
  { name: "Edilizia in Cloud", slug: "edilizia-in-cloud", color: "#00D4FF", icon: <Cloud size={24} /> },
  { name: "Cantiere in Cloud", slug: "cantiere-in-cloud", color: "#FF6B35", icon: <Shield size={24} /> },
  { name: "Edilizia.io", slug: "edilizia-io", color: "#A855F7", icon: <Brain size={24} /> },
  { name: "Marketing Edile", slug: "marketing-edile", color: "#10B981", icon: <Rocket size={24} /> },
  { name: "Vendita Edile", slug: "vendita-edile", color: "#F59E0B", icon: <Target size={24} /> },
  { name: "TalentProfile 360°", slug: "talentprofile-360", color: "#EC4899", icon: <ScanFace size={24} /> },
  { name: "Impresa Leggera", slug: "impresa-leggera", color: "#6366F1", icon: <Briefcase size={24} /> },
];

const FAQItem = ({ faq, index, color }: { faq: { q: string; a: string }; index: number; color: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(255,255,255,0.06)]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-[15px] font-medium text-[rgba(255,255,255,0.9)] group-hover:text-primary transition-colors pr-4">{faq.q}</span>
        <ChevronDown size={18} style={{ color }} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] pb-5">{faq.a}</p>
      </motion.div>
    </div>
  );
};

const ProgettoDettaglio = () => {
  const { slug } = useParams();
  const project = slug ? projectData[slug] : null;

  if (!project) return <Navigate to="/progetti" replace />;

  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-[140px] pb-20 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <Link to="/progetti" className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-white text-[13px] font-mono uppercase tracking-[1.5px] mb-8 transition-colors">
              <ArrowLeft size={16} /> Tutti i progetti
            </Link>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="mb-6 opacity-80" style={{ color: project.color }}>{project.icon}</div>
                <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: project.color }}>{project.name}</h1>
                <p className="text-[22px] text-[rgba(255,255,255,0.8)] font-light mb-6">{project.tagline}</p>
                <p className="text-[17px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] mb-8">{project.desc}</p>
                <Link to="/contatti" className="shimmer-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden">
                  Richiedi Demo →
                </Link>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-10">
                <div className="text-center mb-8">
                  <div className="font-mono text-[56px] font-bold leading-none mb-2" style={{ color: project.color }}>{project.stat}</div>
                  <div className="text-[14px] text-[rgba(255,255,255,0.6)] font-light">{project.statLabel}</div>
                </div>
                <div className="w-full h-px bg-[rgba(255,255,255,0.06)] mb-8" />
                <h3 className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.5)] mb-6">Feature principali</h3>
                <ul className="space-y-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: project.color }} />
                      <span className="text-[15px] text-[rgba(255,255,255,0.75)] font-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 lg:px-12 bg-alt">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-[28px] tracking-[-1px] mb-10">Per chi è pensato</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {project.useCases.map((uc, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4 text-[14px] font-bold font-mono" style={{ background: `${project.color}20`, color: project.color }}>{i + 1}</div>
                  <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light leading-[1.7]">{uc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {project.faqs.length > 0 && (
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[700px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold text-[28px] tracking-[-1px] mb-10">Domande frequenti</h2>
            </FadeIn>
            {project.faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} color={project.color} />
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="py-20 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-[28px] tracking-[-1px] mb-10">Progetti correlati</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((rp, i) => (
              <FadeIn key={rp.slug} delay={0.1 * i}>
                <Link to={`/progetti/${rp.slug}`} className="group flex items-center gap-4 p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all">
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: rp.color }}>{rp.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-semibold group-hover:text-primary transition-colors" style={{ color: rp.color }}>{rp.name}</h3>
                  </div>
                  <ArrowRight size={16} className="text-[rgba(255,255,255,0.3)] group-hover:text-primary transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-8" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Pronto a provare <span className="italic font-light" style={{ color: project.color }}>{project.name}</span>?
          </h2>
          <Link to="/contatti" className="shimmer-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden">
            Parla Con Noi →
          </Link>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default ProgettoDettaglio;
