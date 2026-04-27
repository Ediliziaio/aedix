import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle, ArrowRight, ChevronDown, Users, FileText, Smartphone,
  BarChart3, Briefcase, Calendar, AlertTriangle, Clock, Mail, FileX,
  Wallet, Zap, Star, Shield, X, Check,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import TiltCard from "@/components/TiltCard";
import eicLogo from "@/assets/edilizia-in-cloud-logo.png";

const PORTAL_URL = "https://www.ediliziaincloud.com";
const DEMO_URL = "https://www.ediliziaincloud.com/demo";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const pains = [
  { icon: <Mail size={22} />, title: "Documenti sparsi tra email, WhatsApp e cartelle condivise", desc: "Cerchi un DDT del 2024 e ci impieghi 20 minuti. Quando lo trovi, scopri che il PDF è la versione vecchia." },
  { icon: <Clock size={22} />, title: "Preventivi che richiedono ore tra Excel e PriMus", desc: "Apri 4 fogli, copi celle, stampi PDF, mandi via mail. Per un singolo preventivo, sono 90 minuti del tuo tempo." },
  { icon: <FileX size={22} />, title: "Documentazione di sicurezza dimenticata o in ritardo", desc: "Il DURC scade e nessuno se n'è accorto. Il subappalto si blocca. Il cantiere si ferma. Il cliente s'incazza." },
  { icon: <AlertTriangle size={22} />, title: "Margini di cantiere che scopri solo a fine lavori", desc: "Hai chiuso il cantiere. Solo ora calcoli. Hai fatturato 100, hai speso 95. Sei rimasto bruciato — di nuovo." },
];

const features = [
  { icon: <Briefcase size={28} />, title: "Gestione cantieri e commesse", desc: "Pianifica, monitora e governa ogni cantiere in un'unica vista. Ore, costi, avanzamento, margini in tempo reale.", anchor: "/funzionalita/gestione-cantieri" },
  { icon: <BarChart3 size={28} />, title: "Margini di cantiere live", desc: "Vedi i margini reali mentre il cantiere è ancora aperto — non a chiusura. Correggi la rotta prima che sia tardi.", anchor: "/funzionalita/margini-cantiere" },
  { icon: <FileText size={28} />, title: "Preventivi rapidi e professionali", desc: "Da 90 minuti a 8 minuti per preventivo. Listino integrato, computi metrici, PDF brandizzato pronto al cliente.", anchor: "/funzionalita/preventivi-edilizia" },
  { icon: <Wallet size={28} />, title: "Fatturazione elettronica integrata", desc: "Emissione fatture, invio SDI, scadenzario incassi, recupero crediti automatizzato. Tutto dentro la piattaforma.", anchor: "/funzionalita/fatturazione-elettronica" },
  { icon: <Users size={28} />, title: "Gestione team e fornitori", desc: "Pianifica turni, assegna ruoli, traccia presenze. Database fornitori con DURC, scadenze, valutazioni.", anchor: "/funzionalita" },
  { icon: <Smartphone size={28} />, title: "App mobile per il cantiere", desc: "Tutto quello che serve in cantiere, anche offline. Sincronizzazione automatica appena torna la connessione.", anchor: "/funzionalita" },
];

const numbers = [
  { value: "+3h", label: "risparmiate al giorno per dipendente" },
  { value: "−85%", label: "tempo per generare un preventivo" },
  { value: "0", label: "documenti smarriti o in ritardo" },
  { value: "100%", label: "conforme normativa edilizia italiana" },
];

const useCases = [
  { title: "Imprese edili 5–50 dipendenti", desc: "Hai un titolare, qualche capocantiere, un amministrativo che sta annegando in carta. Edilizia in Cloud è progettato esattamente per la tua dimensione." },
  { title: "General contractor e subappaltatori", desc: "Coordini più cantieri contemporaneamente con team diversi e subappalti incrociati. Tutto sotto controllo da una dashboard." },
  { title: "Studi tecnici e progettisti", desc: "Direzione lavori, computi, contabilità di cantiere, rapporti con il committente. Strumenti pensati per il tuo workflow tecnico." },
];

const comparison = [
  { feature: "Setup", excel: "0€ (ma costa ore tutti i giorni)", competitor: "2-6 mesi di consulenza", eic: "3-5 giorni operativo" },
  { feature: "Costo mensile", excel: "Tempo del titolare in burocrazia", competitor: "€500-2.000/mese", eic: "Da listino su ediliziaincloud.com" },
  { feature: "App mobile in cantiere", excel: "—", competitor: "Spesso un add-on a parte", eic: "Inclusa, anche offline" },
  { feature: "Specializzazione settore edile", excel: "Quella che ti costruisci tu", competitor: "Adattamento di gestionali generici", eic: "Nato dentro un'impresa edile" },
  { feature: "Margini cantiere in tempo reale", excel: "A fine cantiere, se ti va bene", competitor: "Modulo extra a pagamento", eic: "Incluso, sempre live" },
  { feature: "Conformità SDI / DURC / DDT", excel: "Manuale, soggetta a errori", competitor: "Sì, ma con limitazioni", eic: "Automatizzata e verificata" },
];

const testimonials = [
  { quote: "Prima ci mettevo 2 giornate per chiudere il SAL. Adesso lo apro la mattina e a pranzo ho già firmato. La parte del cantiere la fanno i miei capocantiere direttamente dall'app, in tempo reale.", author: "Marco R.", role: "Titolare impresa edile, Brescia" },
  { quote: "Avevo 3 cantieri aperti e non sapevo quale stesse rendendo davvero. Edilizia in Cloud me lo dice ogni giorno. Ho chiuso un cantiere che mi stava bruciando 800€ al giorno senza che me ne accorgessi.", author: "Luigi T.", role: "General contractor, Verona" },
  { quote: "Il vero cambio è stato in cantiere. I miei operai aggiornano le ore dall'app, scattano la foto del DDT al fornitore, firmano il rapporto del giorno. Niente più carta che torna in ufficio sgualcita.", author: "Andrea M.", role: "Imprenditore, Milano" },
];

const faqs = [
  { q: "Posso provarlo prima di pagare?", a: "Sì. Su ediliziaincloud.com c'è una demo gratuita guidata. Ti mostriamo le funzionalità sul tuo caso reale, non su quello di un'altra impresa." },
  { q: "Posso importare i dati dal mio gestionale attuale?", a: "Sì. Offriamo migrazione assistita gratuita dai principali gestionali del settore edile (TeamSystem, PriMus, SteelProject e altri). Il tuo storico non si perde." },
  { q: "Funziona offline in cantiere?", a: "L'app mobile ha funzionalità offline complete con sincronizzazione automatica appena il dispositivo torna online. In cantiere il segnale è spesso debole — ne abbiamo tenuto conto fin dal design." },
  { q: "Quanto tempo richiede l'attivazione?", a: "Il setup base richiede 3–5 giorni lavorativi. Per le imprese più strutturate, includiamo onboarding dedicato di 2 settimane con configurazione personalizzata e formazione del team." },
  { q: "È adatto a un'impresa con 8 dipendenti?", a: "Sì, è progettato esattamente per la fascia 5–50 dipendenti. Niente complessità da multinazionale, niente tagli da gestionale gratuito." },
  { q: "Quanto costa esattamente?", a: "Il listino aggiornato è su ediliziaincloud.com — abbonamenti mensili calibrati sulla dimensione dell'impresa, senza costi nascosti né vincoli annuali. Si parte con il piano che ti serve, si scala quando cresci." },
  { q: "Cosa succede se non sono soddisfatto?", a: "Nessun vincolo annuale. Disdici quando vuoi e ti diamo un export completo dei tuoi dati in formato standard entro 30 giorni." },
  { q: "I miei dati dove sono ospitati?", a: "Server europei, conformi GDPR. I dati restano tuoi e non vengono usati per addestrare modelli pubblici. Trovi i dettagli completi su ediliziaincloud.com nella sezione privacy." },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.04 * index}>
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
        >
          <span className="text-[16px] font-medium text-[rgba(255,255,255,0.9)] group-hover:text-primary transition-colors pr-4">
            {faq.q}
          </span>
          <ChevronDown
            size={20}
            className={`text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] pb-6">{faq.a}</p>
        </motion.div>
      </div>
    </FadeIn>
  );
};

const EdiliziaInCloud = () => (
  <>
    <SEO
      title="Edilizia in Cloud — Gestionale per Imprese Edili Italiane"
      description="Edilizia in Cloud: il gestionale cloud verticale per imprese edili italiane. Cantieri, preventivi, fatturazione SDI, app mobile. Demo gratuita."
      path="/edilizia-in-cloud"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Edilizia in Cloud",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        url: PORTAL_URL,
        publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
        offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: PORTAL_URL },
        description: "Gestionale cloud per imprese edili italiane: cantieri, preventivi, fatturazione SDI, documenti, team, app mobile.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120" },
      }}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Edilizia in Cloud", url: "/edilizia-in-cloud" },
      ]}
    />
    <Layout>
      {/* ───── HERO ───── */}
      <section className="pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <img src={eicLogo} alt="Edilizia in Cloud" className="h-10 w-10 rounded-lg" />
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary">Gestionale per imprese edili</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display font-bold leading-[1.04] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                Smetti di gestire l'impresa con<br />
                <span className="italic font-light text-[rgba(255,255,255,0.5)]">Excel, email e WhatsApp.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-[18px] text-[rgba(255,255,255,0.78)] max-w-[600px] font-light mb-10 leading-[1.7]">
                <strong className="text-white font-medium">Edilizia in Cloud</strong> è il gestionale cloud verticale per imprese edili italiane. Cantieri, preventivi, fatturazione SDI, documenti e app mobile — tutto in un'unica piattaforma. Operativa in 3-5 giorni.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
                >
                  Prenota la demo gratuita <ArrowRight size={16} />
                </a>
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                >
                  Vai al portale
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.28}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[rgba(255,255,255,0.5)]">
                <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Demo gratuita</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Nessun vincolo annuale</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Server europei GDPR</span>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.18}>
            <TiltCard className="rounded-lg" tiltAmount={6}>
              <div
                className="relative rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(249,115,22,0.14) 0%, rgba(30,58,95,0.85) 60%, rgba(10,19,34,1) 100%)",
                }}
              >
                <motion.img
                  src={eicLogo}
                  alt="Edilizia in Cloud — gestionale cloud per imprese edili italiane"
                  className="w-[58%] h-auto drop-shadow-[0_20px_60px_rgba(249,115,22,0.25)]"
                  loading="lazy"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="absolute -inset-4 rounded-2xl opacity-40 blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)" }}
                />
              </div>
            </TiltCard>
          </FadeIn>
        </div>
      </section>

      {/* ───── PAIN ───── */}
      <section className="py-24 px-6 lg:px-12 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I problemi reali</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6 max-w-[900px]" style={{ fontSize: "clamp(28px, 3.8vw, 50px)" }}>
              Se almeno una di queste situazioni ti suona familiare,<br />
              <span className="italic font-light text-primary">stai perdendo soldi ogni giorno.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {pains.map((p, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="flex items-start gap-5 p-7 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                  <div className="text-primary/80 shrink-0 mt-0.5">{p.icon}</div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[rgba(255,255,255,0.95)] mb-2 leading-[1.4]">{p.title}</h3>
                    <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7]">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SOLUTION + INLINE CTA ───── */}
      <section className="py-32 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1100px] mx-auto text-center">
          <FadeIn>
            <Zap size={32} className="mx-auto text-primary mb-6 opacity-80" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-8" style={{ fontSize: "clamp(30px, 4vw, 56px)" }}>
              Tutto in un unico posto.<br />
              <span className="italic font-light text-primary">Operativo in 3-5 giorni.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-[18px] text-[rgba(255,255,255,0.75)] font-light leading-[1.85] max-w-[820px] mx-auto mb-12">
              Edilizia in Cloud sostituisce 7-10 strumenti scollegati con un'unica piattaforma cloud progettata per come lavora davvero un'impresa edile italiana. I tuoi cantieri, i preventivi, le fatture SDI, i fornitori, il team, l'app mobile — tutto sincronizzato in tempo reale, accessibile da ufficio o dal cantiere.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
            >
              Esplora il portale → ediliziaincloud.com
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Funzionalità</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Le sei cose che fanno la differenza<br />
              <span className="italic font-light text-primary">ogni singolo giorno.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[16px] text-[rgba(255,255,255,0.65)] font-light max-w-[640px] mb-16 leading-[1.7]">
              Approfondisci ogni funzionalità sul portale del prodotto. Clicca su una card per leggerne la pagina dedicata su ediliziaincloud.com.
            </p>
          </FadeIn>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {features.map((f, i) => (
              <motion.a
                key={i}
                href={`${PORTAL_URL}${f.anchor}`}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                className="group block h-full p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-primary">{f.icon}</div>
                  <ArrowRight size={16} className="text-[rgba(255,255,255,0.3)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-[18px] font-semibold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">{f.desc}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── NUMBERS ───── */}
      <section className="py-20 px-6 lg:px-12 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <h2 className="text-center font-display font-bold leading-[1.08] tracking-[-1px] mb-16" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
              I numeri che misuriamo nelle imprese che lo usano.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {numbers.map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <div className="font-mono text-[40px] md:text-[48px] font-bold text-primary leading-none mb-3">{s.value}</div>
                  <div className="text-[12px] text-[rgba(255,255,255,0.65)] font-light leading-[1.6]">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── USE CASES ───── */}
      <section className="py-24 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Per chi è</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 max-w-[800px]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Costruito per chi <span className="italic font-light text-primary">conosce davvero il cantiere.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="h-full p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <CheckCircle size={24} className="text-primary mb-5" />
                  <h3 className="text-[18px] font-semibold mb-3 leading-[1.4]">{u.title}</h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.75]">{u.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── COMPARISON ───── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Confronto onesto</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 max-w-[840px]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Excel vs gestionale generico vs<br />
              <span className="italic font-light text-primary">Edilizia in Cloud.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.06)]">
              <table className="w-full text-left min-w-[720px]">
                <thead>
                  <tr className="bg-[rgba(255,255,255,0.04)]">
                    <th className="p-5 font-mono text-[11px] uppercase tracking-[2px] text-[rgba(255,255,255,0.5)] font-medium">Voce</th>
                    <th className="p-5 font-mono text-[11px] uppercase tracking-[2px] text-[rgba(255,255,255,0.5)] font-medium">Excel + email</th>
                    <th className="p-5 font-mono text-[11px] uppercase tracking-[2px] text-[rgba(255,255,255,0.5)] font-medium">Gestionale generico</th>
                    <th className="p-5 font-mono text-[11px] uppercase tracking-[2px] text-primary font-bold">Edilizia in Cloud</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-t border-[rgba(255,255,255,0.04)]">
                      <td className="p-5 text-[14px] font-medium text-[rgba(255,255,255,0.85)]">{row.feature}</td>
                      <td className="p-5 text-[14px] text-[rgba(255,255,255,0.55)] font-light">{row.excel}</td>
                      <td className="p-5 text-[14px] text-[rgba(255,255,255,0.55)] font-light">{row.competitor}</td>
                      <td className="p-5 text-[14px] text-primary font-medium">{row.eic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-24 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Cosa dicono le imprese</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 max-w-[800px]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Tre titolari, tre realtà diverse,<br />
              <span className="italic font-light text-primary">stessi risultati misurabili.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="h-full p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-[14px] text-[rgba(255,255,255,0.85)] font-light leading-[1.85] mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-[rgba(255,255,255,0.06)] pt-5">
                    <div className="text-[14px] font-semibold">{t.author}</div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.55)] font-light mt-1">{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PRICING TEASER ───── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent p-12 md:p-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <Wallet size={20} className="text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-[3px] text-primary">Prezzi trasparenti</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1px] mb-6" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Abbonamenti mensili calibrati sulla tua impresa.<br />
                <span className="italic font-light text-primary">Nessun vincolo annuale.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="text-[16px] text-[rgba(255,255,255,0.7)] font-light leading-[1.85] mb-8 max-w-[680px]">
                Il listino completo, le funzionalità incluse in ogni piano e il calcolatore del piano giusto per te sono sul portale del prodotto. Si parte dal piano base, si scala quando l'impresa cresce.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
                >
                  Vedi il listino → ediliziaincloud.com
                </a>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                >
                  Prenota la demo
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="py-24 px-6 lg:px-12 bg-alt">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Domande Frequenti</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Le risposte più <span className="italic font-light text-primary">chieste.</span>
            </h2>
          </FadeIn>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.18) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-[900px] mx-auto text-center">
          <FadeIn>
            <Shield size={32} className="mx-auto text-primary mb-6 opacity-80" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="font-display font-bold leading-[1.05] tracking-[-1.5px] mb-8" style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}>
              Smetti di perdere ore in burocrazia.<br />
              <span className="italic font-light text-primary">Inizia oggi.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-[17px] text-[rgba(255,255,255,0.75)] font-light leading-[1.85] mb-12 max-w-[640px] mx-auto">
              Demo gratuita personalizzata sul tuo caso. Nessun vincolo, nessuna presentazione PowerPoint da 60 minuti — ti mostriamo solo le funzionalità che cambieranno il tuo modo di lavorare.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-14 py-[20px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                Prenota la demo gratuita <ArrowRight size={16} />
              </a>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-14 py-[20px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Esplora ediliziaincloud.com
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-[rgba(255,255,255,0.5)]">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Demo gratuita</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Migrazione dati inclusa</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Operativo in 3-5 giorni</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary" /> Server europei GDPR</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  </>
);

export default EdiliziaInCloud;
