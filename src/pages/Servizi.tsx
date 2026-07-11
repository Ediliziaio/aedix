import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Cloud, CheckCircle, ArrowRight, Brain, Rocket, BookOpen, ChevronDown, MessageSquare, Settings, BarChart3, X, Check, Layers, Bot, UserCheck, ShieldCheck, ScrollText, Lock, ArrowDown } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const pillarImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
];

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
    features: ["Formazione vendita per team tecnici e commerciali", "Consulenza strategica su processi e automazione", "Assessment aziendale e analisi dei processi", "Affiancamento operativo sul campo", "Workshop personalizzati per il tuo team"],
    color: "#F59E0B",
  },
];

const comparison = [
  { feature: "Setup e configurazione", traditional: "Settimane / mesi", aedix: "Giorni", aedixWins: true },
  { feature: "Costo mensile", traditional: "€2.000 – €5.000", aedix: "Da €200/mese", aedixWins: true },
  { feature: "Personalizzazione", traditional: "Generica", aedix: "Verticale per settore", aedixWins: true },
  { feature: "AI integrata", traditional: "No", aedix: "Sì, nativamente integrata", aedixWins: true },
  { feature: "Marketing", traditional: "Canone fisso", aedix: "ROI misurabile", aedixWins: true },
  { feature: "Supporto", traditional: "Ticket standard", aedix: "Partner dedicato", aedixWins: true },
  { feature: "ROI medio", traditional: "Incerto", aedix: "Misurabile in tempo reale", aedixWins: true },
];

const steps = [
  { icon: <MessageSquare size={28} />, title: "Parla con noi", desc: "Una call gratuita per capire le tue esigenze. Nessun impegno." },
  { icon: <Settings size={28} />, title: "Configurazione", desc: "Setup della piattaforma e onboarding in 3-14 giorni." },
  { icon: <BarChart3 size={28} />, title: "Risultati", desc: "Monitori i risultati in tempo reale. Miglioramenti misurabili dall'attivazione." },
];

const serviceFaqs = [
  { q: "Posso usare solo una piattaforma?", a: "Assolutamente sì. Ogni piattaforma funziona in autonomia. Puoi iniziare con una e aggiungerne altre quando vuoi." },
  { q: "Serve personale tecnico interno?", a: "No. Le nostre piattaforme sono progettate per imprenditori e team non tecnici. Forniamo formazione e supporto dedicato." },
  { q: "Come funziona il marketing digitale?", a: "Creiamo e gestiamo le campagne con pacchetti su misura per i tuoi obiettivi. Ogni euro investito è tracciato con ROI misurabile e report trasparenti." },
  { q: "Gli agenti AI sostituiscono i dipendenti?", a: "No. Gli agenti AI automatizzano le attività ripetitive, liberando i tuoi dipendenti per attività a più alto valore." },
  { q: "Quanto costa iniziare?", a: "Le piattaforme SaaS partono da €200/mese. Il marketing ha pacchetti personalizzati. La consulenza ha un costo su misura. Contattaci per un preventivo gratuito." },
  { q: "Offrite un periodo di prova?", a: "Sì. Offriamo demo gratuite per tutte le piattaforme e periodi di test per verificare i risultati prima di impegnarti." },
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
  <>
    <SEO
      title="Servizi — I quattro componenti di un sistema AI ibrido | AEDIX"
      description="Software verticale, agenti AI operativi, marketing a performance e consulenza: i quattro componenti che compongono un sistema AI ibrido per la tua azienda. Affidabile, conforme, misurabile."
      path="/servizi"
    />
    <Layout>
    {/* Hero with parallax background */}
    <section className="relative pt-[112px] sm:pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
        alt="Servizi AI per PMI italiane — software, agenti, marketing, formazione"
        className="absolute inset-0"
        speed={0.2}
        overlay={<div className="absolute inset-0 bg-background/[0.92]" />}
      />
      <div className="relative max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I Componenti del Sistema</span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Quattro componenti.<br />
            Un unico <span className="italic font-light text-primary">sistema AI ibrido.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[620px] font-light">
            Non siamo una software house generica. Progettiamo sistemi AI ibridi per le aziende italiane: software verticale, agenti AI e persone che lavorano insieme. Puoi partire da un componente o costruire l'intero sistema.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Architettura — 3-layer diagram */}
    <section className="py-20 sm:py-28 px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">L'Architettura</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Come si compone un <span className="italic font-light text-primary">sistema AI ibrido.</span>
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.6)] font-light max-w-[600px] mx-auto text-center mb-16">
            Tre strati che lavorano insieme. I dati salgono dal software agli agenti; le persone supervisionano l'intero flusso e mantengono il controllo.
          </p>
        </FadeIn>

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-stretch">
          {/* Stack of 3 layers */}
          <div className="flex flex-col gap-4">
            {[
              { color: "#00D4FF", icon: <Layers size={26} />, tag: "Strato 1 · La base", title: "Software verticale", text: "Gestionale, dati e processi del tuo settore. La fonte di verità, sempre aggiornata." },
              { color: "#A855F7", icon: <Bot size={26} />, tag: "Strato 2 · L'intelligenza", title: "Agenti AI operativi", text: "Rispondono, qualificano, generano preventivi e documenti — sui tuoi dati reali, 24/7." },
              { color: "#10B981", icon: <BarChart3 size={26} />, tag: "Output", title: "Risultati misurabili", text: "Lead gestiti, ore risparmiate, margini sotto controllo. Ogni euro con un numero attaccato." },
            ].map((layer, i, arr) => (
              <FadeIn key={i} delay={0.12 * i}>
                <div className="relative">
                  <div className="group relative rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-6 lg:p-7 flex items-start gap-5 hover:border-[rgba(255,255,255,0.14)] transition-colors">
                    <div
                      className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: `${layer.color}1a`, color: layer.color, border: `1px solid ${layer.color}33` }}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[2px] block mb-1.5" style={{ color: layer.color }}>{layer.tag}</span>
                      <h3 className="font-display text-[19px] font-semibold mb-1.5">{layer.title}</h3>
                      <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.6]">{layer.text}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-1.5">
                      <ArrowDown size={18} className="text-primary/40" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Human supervision — spans the full height */}
          <FadeIn delay={0.3}>
            <div className="relative h-full rounded-xl border border-primary/25 bg-primary/[0.05] p-6 lg:p-7 flex lg:flex-col items-center lg:items-start gap-4 lg:w-[260px]">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <UserCheck size={26} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-primary block mb-1.5">Strato 3 · Il controllo</span>
                <h3 className="font-display text-[19px] font-semibold mb-1.5">Supervisione umana</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.6]">
                  Le persone approvano, correggono e decidono nei casi critici. Responsabilità e conformità restano sempre in mano tua — su ogni strato.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Pillars */}
    {pillars.map((p, i) => (
      <section key={i} className={`py-20 sm:py-28 px-6 lg:px-12 ${i % 2 === 0 ? "bg-alt" : ""}`}>
        <div className="max-w-[1320px] mx-auto">
          <div className={`grid lg:grid-cols-2 gap-16 items-start ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
            <FadeIn className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
              <div>
                <motion.div className="mb-6 opacity-80" style={{ color: p.color }} whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>{p.icon}</motion.div>
                <h2 className="font-display font-bold text-[32px] leading-[1.15] tracking-[-1px] mb-6">{p.title}</h2>
                <p className="text-[17px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8] mb-8">{p.desc}</p>
                <Link to="/contatti" className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] uppercase tracking-[1.5px] hover:gap-4 transition-all">
                  Scopri di più <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
              <TiltCard className="rounded-lg" glowColor={p.color}>
                <div className="relative rounded-lg overflow-hidden mb-6 aspect-video">
                  <motion.img src={pillarImages[i]} alt={p.title} className="w-full h-full object-cover" loading="lazy" whileHover={{ scale: 1.08 }} transition={{ duration: 0.7 }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.color}30, transparent)` }} />
                </div>
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-8">
                  <h3 className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.5)] mb-6">Cosa include</h3>
                  <ul className="space-y-4">
                    {p.features.map((f, fi) => (
                      <motion.li key={fi} className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * fi }}>
                        <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-[15px] text-[rgba(255,255,255,0.75)] font-light">{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>
    ))}

    {/* Comparison Table */}
    <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
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
                    <td className="px-6 py-5 text-[14px] text-[rgba(255,255,255,0.5)] font-light">
                      <span className="inline-flex items-center gap-2">
                        <X size={14} className="text-red-400 shrink-0" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-primary font-semibold">
                      <span className="inline-flex items-center gap-2">
                        <Check size={14} className="text-emerald-400 shrink-0" />
                        {row.aedix}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Governance & AI Act */}
    <section className="py-20 sm:py-28 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Governance &amp; Conformità</span>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                AI che puoi mettere in <span className="italic font-light text-primary">produzione.</span>
              </h2>
              <p className="text-[17px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8] mb-6">
                Il problema dell'AI in azienda non è la potenza — è il controllo. Chi risponde se sbaglia? Dove finiscono i dati? È conforme? Il modello ibrido nasce per rispondere a queste domande <strong className="text-white font-medium">prima</strong> che diventino un rischio.
              </p>
              <p className="text-[15px] text-[rgba(255,255,255,0.55)] font-light leading-[1.8]">
                Ogni sistema che progettiamo tiene traccia di cosa fa l'AI, lascia l'ultima parola alle persone e resta dentro i confini normativi europei — by design, non come aggiunta successiva.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <ShieldCheck size={24} />, title: "AI Act ready", desc: "Classificazione del rischio, trasparenza e supervisione umana secondo il Regolamento UE 2024/1689." },
                { icon: <Lock size={24} />, title: "GDPR by design", desc: "Server europei. I tuoi dati restano tuoi e non addestrano modelli pubblici di terzi." },
                { icon: <ScrollText size={24} />, title: "Tracciabilità", desc: "Ogni azione dell'agente AI è registrata e verificabile. Niente scatole nere." },
                { icon: <UserCheck size={24} />, title: "Human-in-the-loop", desc: "Sui processi critici l'AI propone, la persona approva. Il controllo resta tuo." },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-6 hover:border-primary/20 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">{item.icon}</div>
                  <h3 className="font-display text-[16px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.6)] font-light leading-[1.65]">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Come iniziare */}
    <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Come Iniziare</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Tre passi verso il <span className="italic font-light text-primary">futuro.</span>
          </h2>
        </FadeIn>
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 -translate-y-1/2 z-0" />
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.12 * i}>
              <div className="relative text-center p-10 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm z-10">
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
    <section className="py-20 sm:py-28 px-6 lg:px-12">
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
  </>
);

export default Servizi;
