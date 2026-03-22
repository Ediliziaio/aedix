import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Cloud, CheckCircle, ArrowRight, Brain, Rocket, BookOpen, ChevronDown, MessageSquare, Settings, BarChart3 } from "lucide-react";
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

const pillars = [
  {
    icon: <Cloud size={36} />, title: "Piattaforme SaaS Verticali",
    desc: "Software gestionale, sicurezza, back-office — tutto costruito specificamente per il tuo settore. Non adattamenti di tool generici, ma piattaforme native che parlano la tua lingua.",
    features: ["Gestionale cantieri e documenti in tempo reale", "Sicurezza e adempimenti normativi automatizzati", "Back-office in outsourcing: fatturazione, buste paga, adempimenti", "Dashboard personalizzate per ogni ruolo aziendale", "Integrazione con i tuoi strumenti esistenti"],
    color: "#00D4FF",
  },
  {
    icon: <Brain size={36} />, title: "Agenti AI Operativi",
    desc: "Non chatbot decorativi. Agenti che rispondono ai clienti, qualificano lead, compilano preventivi, gestiscono appuntamenti. Lavorano 24/7. Non chiedono ferie.",
    features: ["Risponditore automatico con AI conversazionale", "Qualificazione lead e booking appuntamenti", "Generazione preventivi e documenti automatizzata", "Follow-up intelligente su pipeline di vendita", "Report e analytics in tempo reale"],
    color: "#A855F7",
  },
  {
    icon: <Rocket size={36} />, title: "Marketing & Vendita Digitale",
    desc: "Strategie di marketing digitale su misura con ROI misurabile. Campagne ads, funnel, landing page e lead generation — tutto gestito e ottimizzato dall'AI per massimizzare i tuoi risultati.",
    features: ["Campagne ads gestite e ottimizzate dall'AI", "Landing page e funnel di conversione personalizzati", "Metodo di vendita ibrido: AI + persone", "Tracking completo: dal click alla vendita chiusa", "Investimento calibrato sui tuoi obiettivi"],
    color: "#10B981",
  },
  {
    icon: <BookOpen size={36} />, title: "Consulenza e Formazione",
    desc: "Vendita, gestione aziendale, recruiting. Metodi testati su imprese reali — non teoria da manuale. Ogni strategia che insegniamo, la usiamo prima su noi stessi.",
    features: ["Formazione vendita per team tecnici e commerciali", "Consulenza strategica su processi e automazione", "Assessment aziendale con TalentProfile 360°", "Affiancamento operativo sul campo", "Workshop personalizzati per il tuo team"],
    color: "#F59E0B",
  },
];

const comparison = [
  { feature: "Setup e configurazione", traditional: "Settimane / mesi", aedix: "Giorni" },
  { feature: "Costo mensile", traditional: "€2.000 – €5.000", aedix: "Da €200/mese" },
  { feature: "Personalizzazione", traditional: "Generica", aedix: "Verticale per settore" },
  { feature: "AI integrata", traditional: "No", aedix: "11 agenti attivi 24/7" },
  { feature: "Marketing", traditional: "Canone fisso", aedix: "A performance" },
  { feature: "Supporto", traditional: "Ticket standard", aedix: "Partner dedicato" },
  { feature: "ROI medio", traditional: "Incerto", aedix: "4.2x in 6 mesi" },
];

const steps = [
  { icon: <MessageSquare size={28} />, title: "Parla con noi", desc: "Una call gratuita per capire le tue esigenze. Nessun impegno." },
  { icon: <Settings size={28} />, title: "Configurazione", desc: "Setup della piattaforma e onboarding in 3-14 giorni." },
  { icon: <BarChart3 size={28} />, title: "Risultati", desc: "Monitori i risultati in tempo reale. ROI visibile dal primo mese." },
];

const serviceFaqs = [
  { q: "Posso usare solo una piattaforma?", a: "Assolutamente sì. Ogni piattaforma funziona in autonomia. Puoi iniziare con una e aggiungerne altre quando vuoi." },
  { q: "Serve personale tecnico interno?", a: "No. Le nostre piattaforme sono progettate per imprenditori e team non tecnici. Forniamo formazione e supporto dedicato." },
  { q: "Come funziona il marketing a performance?", a: "Zero canone fisso. Noi creiamo e gestiamo le campagne. Tu paghi solo una commissione sulle vendite effettivamente chiuse." },
  { q: "Gli agenti AI sostituiscono i dipendenti?", a: "No. Gli agenti AI automatizzano le attività ripetitive, liberando i tuoi dipendenti per attività a più alto valore." },
  { q: "Quanto costa iniziare?", a: "Le piattaforme SaaS partono da €200/mese. Il marketing è a performance. La consulenza ha un costo personalizzato. Contattaci per un preventivo." },
  { q: "Offrite un periodo di prova?", a: "Sì. Offriamo demo gratuite per tutte le piattaforme e il marketing a performance è per definizione senza rischio." },
];

const FAQItem = ({ faq, index }: { faq: typeof serviceFaqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.06 * index}>
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
          <span className="text-[16px] font-medium text-[rgba(255,255,255,0.9)] group-hover:text-primary transition-colors pr-4">{faq.q}</span>
          <ChevronDown size={20} className={`text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] pb-6">{faq.a}</p>
        </motion.div>
      </div>
    </FadeIn>
  );
};

const Servizi = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-[140px] pb-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I Nostri Servizi</span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Quattro pilastri.<br />
            Un unico <span className="italic font-light text-primary">ecosistema.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light">
            Non siamo una software house generica. Siamo un ecosistema tecnologico costruito per risolvere i problemi reali delle PMI italiane.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Pillars */}
    {pillars.map((p, i) => (
      <section key={i} className={`py-32 px-6 lg:px-12 ${i % 2 === 0 ? "bg-alt" : ""}`}>
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <div className="mb-6 opacity-80" style={{ color: p.color }}>{p.icon}</div>
                <h2 className="font-display font-bold text-[32px] leading-[1.15] tracking-[-1px] mb-6">{p.title}</h2>
                <p className="text-[17px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8] mb-8">{p.desc}</p>
                <Link to="/contatti" className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] uppercase tracking-[1.5px] hover:gap-4 transition-all">
                  Scopri di più <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.5)] mb-6">Cosa include</h3>
                <ul className="space-y-4">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-[15px] text-[rgba(255,255,255,0.75)] font-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    ))}

    {/* Comparison Table */}
    <section className="py-32 px-6 lg:px-12 bg-alt">
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Il Confronto</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Approccio tradizionale vs <span className="italic font-light text-primary">AEDIX</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.4)] text-left px-6 py-4 font-normal"></th>
                  <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.4)] text-left px-6 py-4 font-normal">Tradizionale</th>
                  <th className="font-mono text-[10px] uppercase tracking-[3px] text-primary text-left px-6 py-4 font-normal">AEDIX</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(246,190,9,0.03)] transition-colors">
                    <td className="px-6 py-5 text-[14px] text-[rgba(255,255,255,0.8)] font-medium">{row.feature}</td>
                    <td className="px-6 py-5 text-[14px] text-[rgba(255,255,255,0.5)] font-light">{row.traditional}</td>
                    <td className="px-6 py-5 text-[14px] text-primary font-semibold">{row.aedix}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Come iniziare */}
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Come Iniziare</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Tre passi verso il <span className="italic font-light text-primary">futuro.</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.12 * i}>
              <div className="relative text-center p-10 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold text-[14px]">{i + 1}</div>
                <div className="text-primary mb-6 flex justify-center mt-4">{step.icon}</div>
                <h3 className="font-display text-[20px] font-semibold mb-3">{step.title}</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/contatti" className="shimmer-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden">
              Inizia Ora →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-32 px-6 lg:px-12 bg-alt">
      <div className="max-w-[800px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">FAQ</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Domande <span className="italic font-light text-primary">frequenti.</span>
          </h2>
        </FadeIn>
        {serviceFaqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Servizi;
