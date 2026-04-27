import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle, ArrowRight, ChevronDown, Users, FileText, Smartphone,
  BarChart3, Briefcase, Calendar, Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import TiltCard from "@/components/TiltCard";
import eicLogo from "@/assets/edilizia-in-cloud-logo.png";

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

const features = [
  { icon: <Briefcase size={28} />, title: "Gestione cantieri e commesse", desc: "Pianifica, monitora e governa ogni cantiere in un'unica vista. Ore, costi, avanzamento, margini in tempo reale." },
  { icon: <FileText size={28} />, title: "Documentazione digitale", desc: "Tutti i documenti del cantiere centralizzati. Firma elettronica, archivio a norma, scadenze monitorate automaticamente." },
  { icon: <BarChart3 size={28} />, title: "Dashboard in tempo reale", desc: "Margini, costi e produttività sempre aggiornati. Niente più 'secondo me' nelle riunioni — solo dati." },
  { icon: <Users size={28} />, title: "Gestione team e risorse", desc: "Pianifica turni, assegna ruoli, traccia presenze e produttività direttamente dalla piattaforma." },
  { icon: <Calendar size={28} />, title: "Fatturazione e contabilità", desc: "Emissione fatture, scadenzario incassi, riconciliazione automatica integrati nella stessa piattaforma." },
  { icon: <Smartphone size={28} />, title: "App mobile per il cantiere", desc: "Tutto quello che serve in cantiere, anche offline. Sincronizzazione automatica appena torna la connessione." },
];

const useCases = [
  "Imprese edili con 5–50 dipendenti che vogliono digitalizzare i processi",
  "General contractor e subappaltatori con cantieri multipli da coordinare",
  "Studi tecnici e progettisti che gestiscono direzioni lavori",
];

const stats = [
  { value: "+3h", label: "risparmiate al giorno per dipendente" },
  { value: "−40%", label: "tempo speso in burocrazia di cantiere" },
  { value: "100%", label: "documentazione sempre a norma" },
];

const faqs = [
  { q: "Posso importare i dati dal mio gestionale attuale?", a: "Sì. Offriamo migrazione assistita gratuita dai principali gestionali del settore edile (TeamSystem, PriMus, SteelProject e altri)." },
  { q: "Funziona offline in cantiere?", a: "L'app mobile ha funzionalità offline complete con sincronizzazione automatica appena il dispositivo torna online. In cantiere il segnale è spesso debole — ne abbiamo tenuto conto fin dal design." },
  { q: "Quanto tempo richiede l'attivazione?", a: "Il setup base richiede 3–5 giorni lavorativi. Per le imprese più strutturate, includiamo onboarding dedicato di 2 settimane con configurazione personalizzata." },
  { q: "È adatto a un'impresa con 8 dipendenti?", a: "Sì, è progettato esattamente per la fascia 5–50 dipendenti. Niente complessità da multinazionale, niente tagli da gestionale gratuito." },
  { q: "Quanto costa?", a: "Edilizia in Cloud parte da abbonamenti mensili pensati per le PMI italiane, senza costi nascosti né vincoli annuali. Trovi il listino aggiornato e una demo gratuita su ediliziaincloud.com." },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.06 * index}>
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
      title="Edilizia in Cloud — Il Prodotto AEDIX"
      description="Edilizia in Cloud: il gestionale per imprese edili italiane. Cantieri, documenti, team, fatturazione in un'unica piattaforma cloud. Sviluppato da AEDIX."
      path="/edilizia-in-cloud"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Edilizia in Cloud",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        url: "https://www.ediliziaincloud.com",
        publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
        offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
        description: "Gestionale cloud per imprese edili italiane: cantieri, documenti, team, fatturazione, app mobile.",
      }}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Edilizia in Cloud", url: "/edilizia-in-cloud" },
      ]}
    />
    <Layout>
      {/* Hero */}
      <section className="pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il nostro prodotto</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <img
                src={eicLogo}
                alt="Edilizia in Cloud — logo"
                className="h-16 w-16 mb-6 rounded-lg"
              />
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="font-display font-bold leading-[1.04] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}>
                Edilizia in Cloud.<br />
                <span className="italic font-light text-primary">Il sistema operativo per le imprese edili.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="text-[18px] text-[rgba(255,255,255,0.75)] max-w-[600px] font-light mb-10 leading-[1.7]">
                Gestionale completo per imprese edili italiane: cantieri, documenti, team, fornitori, contabilità — tutto in un'unica piattaforma cloud. Progettato da chi gestisce cantieri, per chi gestisce cantieri.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.ediliziaincloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
                >
                  Vai a ediliziaincloud.com <ArrowRight size={16} />
                </a>
                <Link
                  to="/contatti"
                  className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                >
                  Parla con noi
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <TiltCard className="rounded-lg" tiltAmount={6}>
              <div
                className="relative rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, rgba(30,58,95,0.85) 60%, rgba(10,19,34,1) 100%)",
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

      {/* Stats */}
      <section className="py-16 px-6 lg:px-12 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <div className="font-mono text-[44px] font-bold text-primary leading-none mb-3">{s.value}</div>
                  <div className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.6]">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Funzionalità</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Tutto quello che serve.<br />
              <span className="italic font-light text-primary">In un unico posto.</span>
            </h2>
          </FadeIn>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <div className="h-full p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-all">
                  <div className="text-primary mb-4">{f.icon}</div>
                  <h3 className="font-display text-[18px] font-semibold mb-3">{f.title}</h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 lg:px-12 bg-alt">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Per chi è</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Costruito per chi <span className="italic font-light text-primary">conosce il cantiere.</span>
            </h2>
            <p className="text-[16px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8] mb-8">
              Edilizia in Cloud non è un gestionale generico adattato all'edilizia. È nato dentro un'impresa edile reale e ha la grammatica del settore nei suoi campi, nei suoi workflow, nelle sue metriche.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-4">
              {useCases.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-4 p-5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]"
                >
                  <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-[15px] text-[rgba(255,255,255,0.85)] font-light leading-[1.7]">{u}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Roadmap / Ecosystem Vision */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">La visione AEDIX</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Sparkles size={32} className="mx-auto text-primary mb-6 opacity-80" />
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Edilizia in Cloud è il primo passo.<br />
              <span className="italic font-light text-primary">Non l'arrivo.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="text-[17px] text-[rgba(255,255,255,0.75)] font-light leading-[1.9] space-y-5 max-w-[720px] mx-auto">
              <p>
                AEDIX è la tech company italiana che parte da Edilizia in Cloud per arrivare a un ecosistema di soluzioni AI per le PMI italiane.
              </p>
              <p>
                Il piano è chiaro: ogni nuovo prodotto risolve un problema operativo specifico delle PMI — gestione, sicurezza, conformità, marketing — e si integra con quelli già esistenti per generare un vantaggio competitivo che cresce nel tempo.
              </p>
              <p>
                Quando aggiungeremo nuovi prodotti all'ecosistema, li racconteremo qui. Solo dopo averli costruiti — non prima.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.24}>
            <Link
              to="/contatti"
              className="mt-12 inline-flex items-center gap-3 border border-primary/30 text-primary font-mono text-[12px] uppercase tracking-[2px] px-8 py-4 hover:bg-primary/10 transition-colors"
            >
              Resta aggiornato <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto text-center p-12 rounded-lg border border-primary/20 bg-primary/[0.04]">
          <FadeIn>
            <h2 className="font-display font-bold leading-[1.1] tracking-[-1px] mb-6" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
              Vuoi vedere Edilizia in Cloud in azione?
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-[16px] text-[rgba(255,255,255,0.7)] font-light mb-10 max-w-[600px] mx-auto leading-[1.7]">
              Demo gratuita, senza impegno. Ti mostriamo solo le funzionalità che ti servono — niente presentazione PowerPoint da 60 minuti.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.ediliziaincloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                Visita ediliziaincloud.com <ArrowRight size={16} />
              </a>
              <Link
                to="/contatti"
                className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Prenota una demo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  </>
);

export default EdiliziaInCloud;
