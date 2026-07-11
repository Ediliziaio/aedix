import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import aedixLogo from "@/assets/aedix_logo.png";
import eicLogo from "@/assets/edilizia-in-cloud-logo.png";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Shield, RefreshCw, Target, MessageSquareQuote, ChevronDown,
  ArrowRight, Check, X as XIcon, Zap, BadgeCheck, Cpu, Globe,
  Layers, Bot, UserCheck,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

// ─── Custom Cursor (desktop only) ───────────────────────────
const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, a, [role='button'], input, textarea, select")) setIsHovering(true);
    };
    const onOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    let raf: number;
    const lerp = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] transition-[width,height,opacity] duration-200"
        style={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          marginLeft: isHovering ? -8 : 0,
          marginTop: isHovering ? -8 : 0,
          border: `1.5px solid rgba(246,190,9,${isHovering ? 0.8 : 0.4})`,
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: 8,
          height: 8,
          background: "hsl(var(--gold))",
          borderRadius: "50%",
          opacity: isHovering ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
};

// ─── Typing Effect ──────────────────────────────────────────
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className="font-mono text-[12px] uppercase tracking-[6px] text-primary">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ─── Rotating Word ──────────────────────────────────────────
const words = ["clienti", "lead", "preventivi", "appuntamenti", "documenti", "processi"];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span
      className="inline-block text-primary italic font-light"
      style={{
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        minWidth: "280px",
        display: "inline-block",
      }}
    >
      {words[index]}.
    </span>
  );
};

// ─── Floating Badge ─────────────────────────────────────────
const FloatingBadge = ({ text, x, y, delay }: { text: string; x: string; y: string; delay: number }) => (
  <div
    className="absolute hidden lg:block font-mono text-[10px] uppercase tracking-[3px] text-primary/40 border border-primary/10 rounded-full px-4 py-1.5 backdrop-blur-sm bg-background/30"
    style={{
      left: x,
      top: y,
      animation: `float ${4 + delay}s ease-in-out ${delay}s infinite`,
    }}
  >
    {text}
  </div>
);

// ─── Animated Counter ───────────────────────────────────────
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(motionVal, value, { duration, ease: [0.16, 1, 0.3, 1] });
      const unsub = motionVal.on("change", (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      });
      return unsub;
    }
  }, [isInView, value, suffix, duration, motionVal]);

  return <span ref={ref}>0{suffix}</span>;
};

// ─── FadeIn ─────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Section Divider ────────────────────────────────────────
const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        className="section-divider w-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
};

// ─── 3D Tilt Card ───────────────────────────────────────────
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (y - 0.5) * -10, rotateY: (x - 0.5) * 10 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
    >
      {children}
    </motion.div>
  );
};

// ─── FAQ Item ───────────────────────────────────────────────
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(255,255,255,0.06)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-[16px] font-medium text-[rgba(255,255,255,0.85)] group-hover:text-white transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-[15px] text-[rgba(255,255,255,0.6)] font-light leading-[1.8] pb-6">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

// ─── Data ───────────────────────────────────────────────────
const services = [
  {
    num: "01",
    color: "#00D4FF",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="20" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="20" width="14" height="14" rx="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Piattaforma SaaS Verticale",
    text: "Usi ancora Excel, email e carta per gestire la tua azienda. Ogni documento sparso è un errore che aspetta di succedere. Edilizia in Cloud fa sparire il problema.",
    bullets: ["Da Excel e carta a una dashboard unica — tutto sotto controllo", "Cantieri, documenti, team e fatturazione in un'unica piattaforma cloud", "Dati aggiornati in tempo reale, anche dall'app mobile in cantiere"],
    link: "/edilizia-in-cloud",
    linkLabel: "Vedi Edilizia in Cloud",
  },
  {
    num: "02",
    color: "#A855F7",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Agenti AI Operativi",
    text: "Sei in riunione. Il cliente scrive. Non risponde nessuno — e nel tempo che passa, ha già contattato il competitor. Progettiamo agenti AI custom che rispondono al posto tuo.",
    bullets: ["Zero lead persi per mancata risposta — mai più", "Preventivi e appuntamenti gestiti in autonomia, senza intervento umano", "Operativi in pochi giorni — nessun tecnico interno necessario"],
    link: "/contatti",
    linkLabel: "Parla con noi",
  },
  {
    num: "03",
    color: "#10B981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polyline points="4,28 12,20 20,24 32,8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="8" r="3" fill="currentColor" />
      </svg>
    ),
    title: "Marketing & Vendita Digitale",
    text: "Hai investito in ads ma non sai cosa funziona. I lead arrivano ma non si chiudono. Costruiamo il sistema che trasforma ogni euro in fatturato misurabile.",
    bullets: ["Ogni euro tracciato dal click alla firma — zero sprechi", "Funnel e landing page costruiti per convertire, non per essere belli", "L'AI ottimizza le campagne in autonomia, tu guardi i risultati"],
    link: "/servizi",
    linkLabel: "Scopri i Servizi",
  },
  {
    num: "04",
    color: "#F59E0B",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L30 12V24L18 32L6 24V12L18 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M18 4V18M18 18L30 12M18 18L6 12M18 18V32M18 18L30 24M18 18L6 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    ),
    title: "Consulenza e Formazione",
    text: "Sai che potresti vendere di più. Ma senza un metodo strutturato stai improvvisando. Ti diamo il sistema che usiamo sulle nostre stesse imprese.",
    bullets: ["Un metodo di vendita replicabile, anche per chi vende 'a sensazione'", "Scopri dove stai perdendo soldi oggi — assessment processi incluso", "Affiancamento operativo: niente slide, solo risultati concreti"],
    link: "/servizi",
    linkLabel: "Vai ai Servizi",
  },
];

const comparison = [
  { today: "Software generico che non si adatta al tuo settore", aedix: "Edilizia in Cloud — verticale per imprese edili italiane", impact: "Fit reale" },
  { today: "Prima risposta ai clienti in ore — o giorni", aedix: "Risposta automatica immediata, 24 ore su 24", impact: "Sempre live" },
  { today: "Burocrazia e documenti gestiti a mano", aedix: "Processi digitalizzati e automatizzati in cloud", impact: "Zero carta" },
  { today: "Decisioni basate su intuizione e memoria", aedix: "Dashboard AI con dati aggiornati in tempo reale", impact: "Dati, non sensazioni" },
  { today: "Compliance AI Act e GDPR fai-da-te", aedix: "Implementazioni AI già conformi by design", impact: "EU compliant" },
];

const timeline = [
  { num: "01", title: "Analisi gratuita", text: "Mappiamo dove stai perdendo soldi oggi — processi manuali, lead non seguiti, costi fissi evitabili. Nessun impegno." },
  { num: "02", title: "Piano su misura", text: "Ti diciamo esattamente cosa attivare, in quale ordine, per avere il massimo impatto nel minor tempo." },
  { num: "03", title: "Attivazione in 3–14 giorni", text: "Configuriamo tutto noi. Parti in pochi giorni. Zero tecnici interni, zero interruzioni alla tua operatività." },
  { num: "04", title: "Risultati misurabili", text: "Vedi i numeri in tempo reale: lead gestiti, ore risparmiate, processi automatizzati. Ogni euro ha una risposta concreta." },
];

const testimonials = [
  {
    quote: "Perdevo 3 ore al giorno tra email, Excel e telefonate per gestire la mia azienda. Adesso quella roba la fa il software. Quelle 3 ore le uso per vendere.",
    result: "3 ore al giorno restituite all'imprenditore",
    sector: "PMI Serramenti",
    metric: "3h",
    metricLabel: "al giorno recuperate",
  },
  {
    quote: "I lead arrivavano dal sito ma non li seguiva nessuno fuori orario. Con l'agente AI, ogni richiesta riceve una risposta entro 60 secondi — anche di domenica alle 23.",
    result: "Zero lead persi per mancata risposta",
    sector: "PMI Impiantistica",
    metric: "60s",
    metricLabel: "tempo medio di risposta AI",
  },
  {
    quote: "Investivamo in ads senza sapere cosa funzionava davvero. Adesso ogni euro ha un numero attaccato. Sappiamo esattamente quale campagna genera clienti.",
    result: "Budget tracciato dal click alla firma",
    sector: "PMI Retail",
    metric: "100%",
    metricLabel: "tracciabilità investimento",
  },
];

const faqs = [
  {
    q: "Quanto costa implementare l'AI nella mia azienda?",
    a: "Dipende dalle esigenze, ma il nostro modello è pensato per le PMI: le piattaforme partono da abbonamenti mensili accessibili, senza costi di setup nascosti e senza vincoli annuali. Organizziamo una demo gratuita per valutare insieme la soluzione più adatta.",
  },
  {
    q: "Devo avere competenze tecniche per usare le vostre piattaforme?",
    a: "Assolutamente no. Ogni piattaforma è progettata per imprenditori, non per programmatori. Configuriamo tutto noi, formiamo il tuo team in una sessione di 2 ore, e offriamo supporto continuo.",
  },
  {
    q: "In quanto tempo vedo i primi risultati?",
    a: "I primi risultati misurabili arrivano entro 4 settimane: lead generati, appuntamenti fissati, ore risparmiate. Il nostro processo è strutturato in 4 fasi da 1 settimana ciascuna.",
  },
  {
    q: "L'AI sostituirà i miei dipendenti?",
    a: "No. L'AI automatizza le attività ripetitive e a basso valore aggiunto, liberando il tuo team per concentrarsi su ciò che conta: vendere, gestire clienti, far crescere l'azienda. Non sostituisci persone — le potenzi.",
  },
  {
    q: "Funziona anche nel mio settore?",
    a: "Le nostre piattaforme e agenti AI sono progettati per qualsiasi PMI italiana. Se hai un'azienda con clienti da gestire e processi da ottimizzare, funziona anche per te.",
  },
  {
    q: "E se non funziona? Che rischio corro?",
    a: "Minimo. Offriamo demo gratuite per tutte le piattaforme e periodi di test. Ogni investimento è calibrato sui tuoi obiettivi con ROI misurabile. Se non vedi risultati, puoi interrompere in qualsiasi momento.",
  },
];

// ─── Main Component ─────────────────────────────────────────
const Index = () => {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO
        title="Sistemi AI ibridi per le aziende — AEDIX"
        description="AEDIX è il punto di riferimento per lo sviluppo di sistemi AI ibridi per le aziende italiane: software verticale + agenti AI + supervisione umana. Affidabili, conformi AI Act e GDPR, con risultati misurabili."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AEDIX",
            url: "https://www.aedix.it",
            inLanguage: "it-IT",
            publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AEDIX",
            url: "https://www.aedix.it",
            slogan: "Il punto di riferimento per lo sviluppo di sistemi AI ibridi per le aziende",
            description:
              "Tech company italiana specializzata nella progettazione di sistemi AI ibridi per le aziende: software verticale, agenti AI operativi e supervisione umana in un'unica architettura affidabile e conforme.",
            legalName: "Domus Group S.r.l.",
            email: "info@aedix.it",
            telephone: "+39 348 346 7567",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Via Aurelio Saffi 29",
              postalCode: "20123",
              addressLocality: "Milano",
              addressCountry: "IT",
            },
          },
        ]}
      />
      <Layout>
        <div className="custom-cursor-page">
          <CustomCursor />

          {/* ════════════════════════════════════════════════════
               HERO — Premium gradient mesh + dot grid
             ════════════════════════════════════════════════════ */}
          <section className="relative min-h-screen flex flex-col justify-center pt-[112px] sm:pt-[140px] pb-24 px-6 lg:px-12 overflow-hidden">
            {/* Layered background: gradient mesh + dot grid */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(246,190,9,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.04) 0%, transparent 50%)",
                }}
              />
              <div className="absolute inset-0 dot-grid" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />

            {/* Animated glow — parallax */}
            <motion.div
              className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(246,190,9,0.06) 0%, transparent 60%)" }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating tech badges */}
            <FloatingBadge text="SaaS" x="75%" y="25%" delay={0} />
            <FloatingBadge text="AI" x="82%" y="45%" delay={1.2} />
            <FloatingBadge text="Automation" x="70%" y="60%" delay={0.6} />
            <FloatingBadge text="Cloud" x="85%" y="70%" delay={1.8} />

            <div className="relative max-w-[1320px] mx-auto w-full">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-primary" />
                  <TypingText text="Sistemi AI ibridi per le aziende" delay={0.5} />
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  className="font-display font-bold leading-[1.04] tracking-[-3px] mb-8"
                  style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
                >
                  L'AI che gestisce<br />
                  i tuoi <RotatingWord />
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-[19px] leading-[1.75] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-10">
                  Uniamo <span className="text-white font-medium">software verticale, agenti AI e supervisione umana</span>{" "}
                  in un'unica architettura. Non un chatbot, non un gestionale in più:{" "}
                  il sistema con cui la tua azienda mette l'AI a lavorare davvero — affidabile, conforme, misurabile.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollTo("cosa-facciamo")}
                    className="shimmer-btn glow-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg relative overflow-hidden"
                  >
                    Scopri L'Ecosistema →
                  </button>
                  <button
                    onClick={() => scrollTo("cta-finale")}
                    className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    Prenota Una Demo
                  </button>
                </div>
              </FadeIn>

              {/* Hero stats — metric cards */}
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-8 lg:gap-12 mt-16 pt-16 border-t border-[rgba(255,255,255,0.06)]">
                  {[
                    { val: 700, suf: "h", label: "risparmiate all'anno" },
                    { val: 100, suf: "%", label: "Made in Italy · GDPR" },
                    { val: 24, suf: "/7", label: "AI sempre operativa" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-mono text-[48px] font-bold text-white leading-none tracking-tight">
                        <AnimatedCounter value={s.val} suffix={s.suf} />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[2px] text-[rgba(255,255,255,0.45)] mt-2">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Trust strip */}
              <FadeIn delay={0.5}>
                <div className="mt-12 flex flex-wrap items-center gap-6">
                  {[
                    { icon: <BadgeCheck size={16} />, text: "GDPR & AI Act compliant" },
                    { icon: <Globe size={16} />, text: "100% italiano" },
                    { icon: <Zap size={16} />, text: "Operativo in 3–14 giorni" },
                    { icon: <Cpu size={16} />, text: "Testato sulle nostre aziende" },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[rgba(255,255,255,0.4)] font-light">
                      <span className="text-primary/60">{badge.icon}</span>
                      {badge.text}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               SISTEMA AI IBRIDO — Category definition
             ════════════════════════════════════════════════════ */}
          <section id="sistema-ibrido" className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Cos'è un sistema AI ibrido
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  L'AI da sola non basta.<br />
                  <span className="italic font-light text-primary">Serve un sistema.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.16}>
                <p className="text-[17px] text-[rgba(255,255,255,0.65)] max-w-[640px] font-light mb-16 lg:mb-20">
                  Un chatbot allucina e non conosce i tuoi dati. Un gestionale è affidabile ma cieco. Un sistema AI ibrido unisce tre strati che si controllano a vicenda — per avere l'intelligenza dell'AI con l'affidabilità del software e il giudizio delle persone.
                </p>
              </FadeIn>

              {/* Three layers */}
              <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-16">
                {[
                  {
                    color: "#00D4FF",
                    icon: <Layers size={30} />,
                    tag: "Strato 1 · La base",
                    title: "Software verticale",
                    text: "Il gestionale che governa dati, documenti e processi del tuo settore. La fonte di verità: strutturata, sempre aggiornata, sotto controllo.",
                  },
                  {
                    color: "#A855F7",
                    icon: <Bot size={30} />,
                    tag: "Strato 2 · L'intelligenza",
                    title: "Agenti AI operativi",
                    text: "Rispondono ai clienti, qualificano lead, generano preventivi e documenti. Lavorano 24/7 sui tuoi dati reali — non su risposte inventate.",
                  },
                  {
                    color: "#10B981",
                    icon: <UserCheck size={30} />,
                    tag: "Strato 3 · Il controllo",
                    title: "Supervisione umana",
                    text: "Le persone restano al comando: approvano, correggono, decidono nei casi critici. Responsabilità e conformità sempre in mano tua.",
                  },
                ].map((layer, i) => (
                  <FadeIn key={i} delay={0.1 * i}>
                    <div className="group relative rounded-xl glass-card p-8 lg:p-9 h-full flex flex-col hover:-translate-y-1">
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        style={{ background: layer.color }}
                      />
                      <div className="mb-5 transition-transform duration-300 group-hover:scale-110" style={{ color: layer.color }}>
                        {layer.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[2px] mb-3" style={{ color: layer.color }}>
                        {layer.tag}
                      </span>
                      <h3 className="font-display text-[21px] lg:text-[23px] font-semibold mb-3">{layer.title}</h3>
                      <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.62)] font-light">{layer.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Why hybrid — 3-way comparison */}
              <FadeIn delay={0.2}>
                <div className="rounded-xl glass-card p-8 lg:p-10">
                  <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
                    {[
                      { label: "AI pura", sub: "ChatGPT & simili", verdict: "Potente ma inaffidabile", points: ["Allucina e inventa", "Non conosce i tuoi dati", "Nessun controllo né conformità"], bad: true },
                      { label: "Software puro", sub: "Gestionali tradizionali", verdict: "Affidabile ma cieco", points: ["Rigido, non capisce il contesto", "Non decide né automatizza", "Non impara dai tuoi dati"], bad: true },
                      { label: "Sistema ibrido", sub: "Il metodo AEDIX", verdict: "Intelligente e affidabile", points: ["Risposte fondate sui tuoi dati", "Automazione con controllo umano", "Conforme AI Act e GDPR by design"], bad: false },
                    ].map((col, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${col.bad ? "" : "rounded-lg border border-primary/25 bg-primary/[0.04] p-6 -m-1 sm:-my-2"}`}
                      >
                        <span className={`font-display text-[18px] font-semibold ${col.bad ? "text-[rgba(255,255,255,0.85)]" : "text-primary"}`}>
                          {col.label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.4)] mt-1 mb-4">
                          {col.sub}
                        </span>
                        <span className={`text-[13px] font-medium mb-5 ${col.bad ? "text-[rgba(255,255,255,0.55)]" : "text-green-impact"}`}>
                          {col.verdict}
                        </span>
                        <ul className="space-y-2.5">
                          {col.points.map((p, pi) => (
                            <li key={pi} className="flex items-start gap-2.5 text-[13px] font-light leading-[1.55] text-[rgba(255,255,255,0.6)]">
                              {col.bad ? (
                                <span className="mt-0.5 w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                                  <XIcon size={9} className="text-red-400" />
                                </span>
                              ) : (
                                <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                  <Check size={9} className="text-emerald-400" />
                                </span>
                              )}
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* In azione — concrete end-to-end scenario */}
              <FadeIn delay={0.24}>
                <div className="mt-16 lg:mt-20 pt-12 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-10">
                    <span className="font-mono text-[11px] uppercase tracking-[4px] text-primary">In azione</span>
                    <span className="text-[15px] text-[rgba(255,255,255,0.55)] font-light">
                      Domenica, ore 23:14. Un cliente scrive dal sito. Ecco cosa succede.
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {[
                      { color: "#00D4FF", step: "01", layer: "Software", text: "Il gestionale riconosce il cliente, recupera storico, listino e disponibilità reali. Nessun dato inventato." },
                      { color: "#A855F7", step: "02", layer: "Agente AI", text: "Risponde in 40 secondi, qualifica la richiesta e prepara una bozza di preventivo sui dati veri." },
                      { color: "#10B981", step: "03", layer: "Persona", text: "Lunedì mattina il titolare trova tutto pronto: controlla, ritocca il prezzo, approva con un clic." },
                      { color: "#F6BE09", step: "04", layer: "Risultato", text: "Preventivo inviato entro le 9. Zero lead persi nel weekend, zero notti in bianco a rispondere." },
                    ].map((s, i) => (
                      <div key={i} className="relative rounded-xl glass-card p-6 lg:p-7 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-[13px] font-bold" style={{ color: s.color }}>{s.step}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[2px] px-2.5 py-1 rounded-full" style={{ color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}2e` }}>
                            {s.layer}
                          </span>
                        </div>
                        <p className="text-[14px] text-[rgba(255,255,255,0.68)] font-light leading-[1.7]">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               COSA FACCIAMO — Cards with always-visible content
             ════════════════════════════════════════════════════ */}
          <section id="cosa-facciamo" className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Il Problema → La Soluzione
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Ogni giorno perdi tempo, soldi<br />
                  e clienti. <span className="italic font-light text-primary">Abbiamo costruito la risposta.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.16}>
                <p className="text-[17px] text-[rgba(255,255,255,0.65)] max-w-[620px] font-light mb-16 lg:mb-20">
                  Quattro problemi cronici di ogni azienda italiana. Quattro componenti che compongono il tuo sistema AI ibrido — non adattamenti di strumenti generici, ma pezzi che lavorano insieme.
                </p>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
                {services.map((s, i) => (
                  <FadeIn key={i} delay={0.08 * i}>
                    <div className="group relative rounded-xl glass-card p-8 lg:p-10 hover:-translate-y-1 h-full flex flex-col">
                      {/* Color accent top border */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        style={{ background: s.color }}
                      />
                      {/* Large faded number */}
                      <span
                        className="absolute top-6 right-8 font-mono text-[64px] font-bold leading-none select-none pointer-events-none"
                        style={{ color: s.color, opacity: 0.06 }}
                      >
                        {s.num}
                      </span>
                      {/* Icon */}
                      <div className="mb-5 transition-transform duration-300 group-hover:scale-110" style={{ color: s.color }}>
                        {s.icon}
                      </div>
                      {/* Title */}
                      <h3 className="font-display text-[20px] lg:text-[22px] font-semibold mb-3 group-hover:text-white transition-colors">
                        {s.title}
                      </h3>
                      {/* Description */}
                      <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.6)] font-light mb-5">
                        {s.text}
                      </p>
                      {/* Bullets — ALWAYS VISIBLE */}
                      <ul className="space-y-2 mb-6">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2.5 text-[13px] text-[rgba(255,255,255,0.55)] font-light leading-[1.6]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {/* CTA link — ALWAYS VISIBLE */}
                      <Link
                        to={s.link}
                        className="mt-auto inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[2px] transition-all duration-300 hover:gap-3"
                        style={{ color: s.color }}
                      >
                        {s.linkLabel} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               PRIMA / DOPO — Responsive cards (not table)
             ════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-gold-light block mb-6">
                  Prima → Dopo
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Riconosci questi problemi?<br />
                  <span className="italic font-light text-primary">Esiste una soluzione concreta.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.16}>
                <p className="text-[17px] text-[rgba(255,255,255,0.6)] max-w-[600px] font-light mb-16">
                  Non è teoria. Sono i problemi che le PMI italiane ci portano ogni settimana — e la risposta che abbiamo costruito.
                </p>
              </FadeIn>

              {/* Responsive card grid — works on every screen */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {comparison.map((row, i) => (
                  <FadeIn key={i} delay={0.08 * i}>
                    <div className="group rounded-xl glass-card p-7 lg:p-8 hover:-translate-y-1 h-full flex flex-col">
                      {/* Problem */}
                      <div className="flex items-start gap-3 mb-5">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <XIcon size={11} className="text-red-400" />
                        </div>
                        <p className="text-[14px] text-[rgba(255,255,255,0.45)] font-light leading-[1.6] line-through decoration-red-400/30">
                          {row.today}
                        </p>
                      </div>
                      {/* Solution */}
                      <div className="flex items-start gap-3 mb-6 flex-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-emerald-400" />
                        </div>
                        <p className="text-[14px] text-[rgba(255,255,255,0.8)] font-medium leading-[1.6]">
                          {row.aedix}
                        </p>
                      </div>
                      {/* Impact badge */}
                      <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="font-mono text-[11px] font-bold text-green-impact uppercase tracking-[2px]">
                          ✓ {row.impact}
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               PERCHÉ NOI
             ════════════════════════════════════════════════════ */}
          <section id="perche-noi" className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Perché Noi?
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Non parliamo di innovazione.<br />
                  <span className="italic font-light text-primary">La costruiamo.</span>
                </h2>
              </FadeIn>

              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                <FadeIn delay={0.16}>
                  <div className="text-[17px] leading-[1.9] text-[rgba(255,255,255,0.65)] font-light space-y-6">
                    <p>
                      Aedix nasce da un principio semplice:{" "}
                      <strong className="text-white font-semibold">
                        le PMI italiane meritano la stessa tecnologia delle multinazionali
                      </strong>
                      , ma costruita per il loro mondo — fatto di clienti da acquisire, processi da gestire, burocrazia da sbrigare e margini da proteggere.
                    </p>
                    <p>
                      Non abbiamo iniziato da un ufficio. Abbiamo iniziato sul campo — gestendo un'impresa vera, vendendo ai clienti finali, sbattendo la testa su problemi che nessun software generico riusciva a risolvere.
                    </p>
                    <p>
                      Ogni soluzione che sviluppiamo viene{" "}
                      <strong className="text-white font-semibold">prima testata internamente</strong>{" "}
                      sulle nostre stesse aziende. Se non funziona per noi, non esiste per te.
                    </p>
                    <p>
                      Oggi AEDIX è una tech company italiana che parte da{" "}
                      <strong className="text-white font-semibold">Edilizia in Cloud</strong>{" "}
                      per costruire un ecosistema di soluzioni AI per le PMI italiane.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.24}>
                  <blockquote
                    className="italic font-light text-[rgba(255,255,255,0.75)] leading-[1.55] border-l-[3px] border-primary pl-8 mb-10"
                    style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
                  >
                    "Costruiamo tecnologia per imprenditori che non hanno tempo di studiare la tecnologia. Funziona, o non esiste."
                  </blockquote>

                  {/* Feature grid — 3 pillars */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: <Shield size={20} />, text: "Testata sulle nostre aziende prima" },
                      { icon: <RefreshCw size={20} />, text: "Cloud-native, zero manutenzione" },
                      { icon: <Target size={20} />, text: "Focus esclusivo PMI italiane" },
                    ].map((b, i) => (
                      <div key={i} className="p-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary mb-3">
                          {b.icon}
                        </div>
                        <p className="text-[13px] text-[rgba(255,255,255,0.6)] font-light leading-[1.6]">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               EDILIZIA IN CLOUD — Showcase
             ════════════════════════════════════════════════════ */}
          <section id="prodotto" className="relative bg-alt py-20 sm:py-28 lg:py-40 px-6 lg:px-12 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)" }}
            />
            <div className="relative max-w-[1320px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <FadeIn>
                    <div className="flex items-center gap-3 mb-6">
                      <img src={eicLogo} alt="Edilizia in Cloud" className="h-11 w-11 rounded-lg" />
                      <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary">Il prodotto AEDIX</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.08}>
                    <h2
                      className="font-display font-bold leading-[1.06] tracking-[-1.5px] mb-6"
                      style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
                    >
                      Edilizia in Cloud.<br />
                      <span className="italic font-light text-primary">Il sistema operativo per imprese edili.</span>
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.14}>
                    <p className="text-[17px] text-[rgba(255,255,255,0.7)] font-light leading-[1.85] mb-8 max-w-[560px]">
                      Cantieri, preventivi, fatturazione SDI, documentazione di sicurezza e app mobile in un'unica piattaforma cloud. Operativa in 3-5 giorni, niente vincoli annuali.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.18}>
                    <div className="space-y-3 mb-10">
                      {[
                        "Cantieri e margini in tempo reale, anche dall'app in cantiere",
                        "Preventivi in 8 minuti — non più 90",
                        "Fatturazione elettronica SDI integrata, scadenzario automatico",
                        "Migrazione gratuita dai principali gestionali del settore",
                      ].map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[15px] text-[rgba(255,255,255,0.75)] font-light leading-[1.65]">{b}</span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.24}>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/edilizia-in-cloud"
                        className="shimmer-btn glow-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg relative overflow-hidden"
                      >
                        Scopri il prodotto <ArrowRight size={16} />
                      </Link>
                      <a
                        href="https://www.ediliziaincloud.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all"
                      >
                        Vai al portale ↗
                      </a>
                    </div>
                  </FadeIn>
                </div>

                <FadeIn delay={0.16}>
                  <TiltCard className="rounded-xl">
                    <div
                      className="relative rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, rgba(30,58,95,0.85) 60%, rgba(10,19,34,1) 100%)",
                      }}
                    >
                      <motion.img
                        src={eicLogo}
                        alt="Edilizia in Cloud — gestionale cloud per imprese edili italiane"
                        className="w-[55%] h-auto drop-shadow-[0_20px_60px_rgba(249,115,22,0.3)]"
                        loading="lazy"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </TiltCard>
                  <FadeIn delay={0.3}>
                    <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                      {[
                        { v: "+3h", l: "al giorno per dipendente" },
                        { v: "−85%", l: "tempo per preventivo" },
                        { v: "3-5gg", l: "operativo dal go-live" },
                      ].map((s, i) => (
                        <div key={i} className="p-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                          <div className="font-mono text-[20px] font-bold text-primary leading-none mb-1.5">{s.v}</div>
                          <div className="text-[10px] text-[rgba(255,255,255,0.5)] font-light uppercase tracking-[1.5px]">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </FadeIn>
              </div>

              <FadeIn delay={0.32}>
                <div className="mt-16 lg:mt-20 pt-10 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-6">
                  <p className="text-[14px] text-[rgba(255,255,255,0.5)] font-light max-w-[640px]">
                    Edilizia in Cloud è il primo prodotto dell'ecosistema AEDIX. Ne seguiranno altri — uno alla volta, solo dopo averli collaudati sul campo.
                  </p>
                  <Link
                    to="/perche-noi"
                    className="inline-flex items-center gap-2 text-primary font-mono text-[12px] uppercase tracking-[2px] hover:gap-3 transition-all"
                  >
                    La storia AEDIX <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               COME LAVORIAMO — Timeline
             ════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Come Lavoriamo
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Dal problema che hai oggi<br />
                  <span className="italic font-light text-primary">ai risultati in 2 settimane.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="text-[17px] text-[rgba(255,255,255,0.6)] max-w-[500px] font-light mb-16">
                  Quattro passi. Nessuna burocrazia. Nessun progetto IT infinito.
                </p>
              </FadeIn>

              <div ref={timelineRef} className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 relative">
                {/* Connecting line (desktop) */}
                <motion.div
                  className="hidden md:block absolute top-[28px] left-[60px] right-[60px] h-px bg-primary/20"
                  initial={{ scaleX: 0 }}
                  animate={timelineInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />

                {timeline.map((step, i) => (
                  <FadeIn key={i} delay={0.15 * i + 0.3}>
                    <div className="relative">
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 mb-5 bg-background"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 * i + 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="font-mono text-[22px] font-bold text-primary">{step.num}</span>
                      </motion.div>
                      <h3 className="font-display text-[18px] lg:text-[20px] font-semibold mb-3">{step.title}</h3>
                      <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7]">
                        {step.text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               TESTIMONIALS — Featured metrics
             ════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[1320px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Voci dal Campo
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Come le PMI usano<br />
                  <span className="italic font-light text-primary">le nostre soluzioni.</span>
                </h2>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                {testimonials.map((t, i) => (
                  <FadeIn key={i} delay={0.1 * i}>
                    <div className="group relative rounded-xl glass-card p-8 hover:-translate-y-1 h-full flex flex-col">
                      {/* Gradient accent top */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-primary/60 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      {/* Featured metric */}
                      <div className="mb-5 pb-5 border-b border-[rgba(255,255,255,0.06)]">
                        <span className="font-mono text-[36px] font-bold text-primary leading-none">{t.metric}</span>
                        <span className="block font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.4)] mt-1.5">
                          {t.metricLabel}
                        </span>
                      </div>

                      <MessageSquareQuote className="text-primary/30 mb-3" size={22} />
                      <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8] italic mb-6 flex-1">
                        "{t.quote}"
                      </p>

                      {/* Attribution */}
                      <div className="pt-5 border-t border-[rgba(255,255,255,0.06)] mt-auto flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-primary text-[11px] font-bold">{t.sector.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-[12px] text-[rgba(255,255,255,0.5)] font-mono">{t.sector}</p>
                          <p className="text-[11px] text-[rgba(255,255,255,0.3)] font-light">{t.result}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               FAQ
             ════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 lg:py-40 px-6 lg:px-12">
            <div className="max-w-[800px] mx-auto">
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">
                  Domande Frequenti
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center"
                  style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
                >
                  Hai domande.<br />
                  <span className="italic font-light text-primary">Noi abbiamo risposte.</span>
                </h2>
              </FadeIn>

              <div className="space-y-0">
                {faqs.map((faq, i) => (
                  <FadeIn key={i} delay={0.06 * i}>
                    <FAQItem question={faq.q} answer={faq.a} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ════════════════════════════════════════════════════
               CTA FINALE — No external dependencies
             ════════════════════════════════════════════════════ */}
          <section id="cta-finale" className="relative py-20 sm:py-28 lg:py-40 px-6 lg:px-12 text-center overflow-hidden">
            {/* Multi-layer gradient background */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 100%, rgba(246,190,9,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 30%, rgba(0,212,255,0.04) 0%, transparent 50%)",
                }}
              />
              <div className="absolute inset-0 dot-grid opacity-50" />
            </div>
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(246,190,9,0.06) 0%, transparent 60%)" }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative max-w-[860px] mx-auto">
              <FadeIn>
                <h2
                  className="font-display font-bold leading-[1.06] tracking-[-2px] mb-8"
                  style={{ fontSize: "clamp(34px, 5vw, 68px)" }}
                >
                  La tua azienda tra 12 mesi<br />
                  sarà <span className="italic font-light text-primary">irriconoscibile.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-[18px] text-[rgba(255,255,255,0.65)] max-w-[520px] mx-auto font-light leading-[1.7] mb-12">
                  Meno costi fissi. Più vendite. Più controllo. Più libertà. Non è una promessa — è un sistema che funziona già per chi lo usa.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contatti"
                    className="shimmer-btn glow-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] rounded-lg relative overflow-hidden inline-block"
                  >
                    Parla Con Noi →
                  </Link>
                  <Link
                    to="/edilizia-in-cloud"
                    className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] rounded-lg hover:border-primary/50 hover:text-primary transition-all inline-block"
                  >
                    Scopri Edilizia in Cloud
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>

        </div>
      </Layout>
    </>
  );
};

export default Index;
