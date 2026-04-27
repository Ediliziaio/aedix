import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import aedixLogo from "@/assets/aedix_logo.png";
import eicLogo from "@/assets/edilizia-in-cloud-logo.png";
import { motion, useInView, useMotionValue, animate, useScroll } from "framer-motion";
import { Shield, RefreshCw, Target, Cloud, Brain, Rocket, ScanFace, Briefcase, TrendingUp, DollarSign, Users, BarChart3, Building2, Zap, Clock, Gauge, BadgeCheck, MessageSquareQuote, ChevronDown, Cpu, Database, Globe, Lock, Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

// ─── Scroll Progress Bar ─────────────────────────────────────
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// ─── Animated Progress Bar ───────────────────────────────────
// ─── Custom Cursor ───────────────────────────────────────────
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
      if (t.closest("button, a, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
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

// ─── Particle Field (optimized) ──────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const COUNT = 35;
    const MAX_DIST = 100;
    let frameCount = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    let raf: number;
    const draw = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(246,190,9,0.15)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(246,190,9,${0.06 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

// ─── Typing Effect ───────────────────────────────────────────
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
        minWidth: "320px",
        display: "inline-block",
      }}
    >
      {words[index]}.
    </span>
  );
};

// ─── Floating Badge (CSS animation) ─────────────────────────
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

// ─── Animated Counter ────────────────────────────────────────
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

// ─── FadeIn ──────────────────────────────────────────────────
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

// ─── Animated Section Divider ────────────────────────────────
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

// ─── Hexagon Canvas ──────────────────────────────────────────
const HexagonCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawHex = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(246, 190, 9, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      if (frameCount % 3 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.009;

      const size = 60;
      const cols = Math.ceil(w / (size * 1.75)) + 2;
      const rows = Math.ceil(h / (size * 1.5)) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * size * 1.75 + (row % 2 ? size * 0.875 : 0);
          const cy = row * size * 1.5;
          const dist = Math.sqrt((cx - w * 0.7) ** 2 + (cy - h * 0.3) ** 2);
          const wave = Math.sin(dist * 0.008 - time * 2) * 0.5 + 0.5;
          const alpha = wave * 0.06;
          if (alpha > 0.01) drawHex(cx, cy, size * 0.5, alpha);
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// ─── 3D Tilt Card ────────────────────────────────────────────
const TiltCard = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -12,
      rotateY: (x - 0.5) * 12,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// ─── Data ────────────────────────────────────────────────────
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
    text: "Usi ancora Excel, email e carta per gestire la tua azienda. Ogni documento sparso è un errore che aspetta di succedere. Ogni ora di burocrazia è un'ora che non fatturi. Edilizia in Cloud fa sparire il problema.",
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
    text: "Sei in riunione. Il cliente scrive. Non risponde nessuno — e nel tempo che passa, ha già contattato il competitor. Progettiamo agenti AI custom che rispondono al posto tuo in meno di un minuto, ogni ora del giorno, ogni giorno dell'anno.",
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
    text: "Hai investito in ads ma non sai cosa funziona. Il sito porta traffico ma non porta clienti. I lead arrivano ma non si chiudono. Costruiamo il sistema di acquisizione che trasforma ogni euro di budget in fatturato misurabile.",
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
    text: "Sai che potresti vendere di più. Sai che perdi opportunità ogni settimana. Ma senza un metodo strutturato stai improvvisando. Ti diamo il sistema che usiamo sulle nostre stesse imprese — collaudato sul campo, non in aula.",
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

const projectIcons: Record<string, React.ReactNode> = {
  "Edilizia in Cloud": <img src={eicLogo} alt="Edilizia in Cloud" className="w-9 h-9 rounded-md" />,
};

const projects = [
  {
    name: "Edilizia in Cloud",
    color: "#00D4FF",
    desc: "Il gestionale cloud per imprese edili italiane. Cantieri, documenti, team, fatturazione — tutto connesso in un'unica piattaforma. È il primo prodotto dell'ecosistema AEDIX.",
    url: "https://www.ediliziaincloud.com",
  },
];

const timeline = [
  { num: "01", title: "Analisi gratuita", text: "Mappiamo dove stai perdendo soldi oggi — processi manuali, lead non seguiti, costi fissi evitabili, ore bruciate in burocrazia. Nessun impegno." },
  { num: "02", title: "Piano su misura", text: "Ti diciamo esattamente cosa attivare, in quale ordine, per avere il massimo impatto nel minor tempo. Senza tecnologia inutile." },
  { num: "03", title: "Attivazione in 3–14 giorni", text: "Configuriamo tutto noi. Parti in pochi giorni. Zero tecnici interni, zero interruzioni alla tua operatività attuale." },
  { num: "04", title: "Risultati misurabili", text: "Vedi i numeri in tempo reale: lead gestiti, ore risparmiate, processi automatizzati. Ogni euro speso ha una risposta concreta." },
];

// ─── FAQ Item Component ──────────────────────────────────────
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

// ─── Nav sections for active tracking ────────────────────────
const navSections = [
  { label: "Cosa Facciamo", id: "cosa-facciamo" },
  { label: "Progetti", id: "progetti" },
  { label: "Perché Noi?", id: "perche-noi" },
];

// ─── Main Component ──────────────────────────────────────────
const Index = () => {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO
        title="AI per PMI Italiane — AEDIX | Soluzioni Pratiche"
        description="AEDIX sviluppa soluzioni AI su misura per PMI italiane. Software, agenti AI e automazioni. Risultati misurabili."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AEDIX",
          url: "https://www.aedix.it",
          inLanguage: "it-IT",
          publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
        }}
      />
      <Layout>
        <div className="custom-cursor-page">
        <CustomCursor />
        <ParticleField />


      {/* ───── HERO with Video Background ───── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-abstract-technology-background-2774/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/[0.92]" />
        {/* Glow with parallax */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(246,190,9,0.08) 0%, transparent 60%)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <HexagonCanvas />

        {/* Floating badges */}
        <FloatingBadge text="SaaS" x="75%" y="25%" delay={0} />
        <FloatingBadge text="AI" x="82%" y="45%" delay={1.2} />
        <FloatingBadge text="Automation" x="70%" y="60%" delay={0.6} />
        <FloatingBadge text="Cloud" x="85%" y="70%" delay={1.8} />

        <div className="relative max-w-[1320px] mx-auto w-full">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-primary" />
              <TypingText text="AI operativa per le PMI italiane" delay={0.5} />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative">
              <motion.div
                className="absolute -inset-20 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 50%, rgba(246,190,9,0.04) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1
                className="font-display font-bold leading-[1.04] tracking-[-3px] mb-8 relative"
                style={{ fontSize: "clamp(44px, 6.5vw, 88px)" }}
              >
                L'AI che gestisce<br />
                i tuoi <RotatingWord />
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[20px] leading-[1.75] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-10">
              Piattaforme SaaS, agenti AI e automazione intelligente per{" "}
              <span className="text-[rgba(255,255,255,0.85)] font-medium">
                qualsiasi PMI italiana.
              </span>{" "}
              Taglia i costi fissi, rispondi ai clienti 24/7 e prendi decisioni con dati reali — tutto in un unico ecosistema.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("cosa-facciamo")}
                className="shimmer-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden"
              >
                Scopri L'Ecosistema →
              </button>
              <button
                onClick={() => scrollTo("cta-finale")}
                className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:border-primary hover:text-primary transition-all"
              >
                Prenota Una Demo
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-16 mt-16">
              {[
                { val: 700, suf: "h", label: "all'anno per dipendente · ~20k€ recuperati" },
                { val: 100, suf: "%", label: "Made in Italy · GDPR" },
                { val: 24, suf: "/7", label: "AI sempre operativa" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-[52px] font-bold text-white leading-none">
                    <AnimatedCounter value={s.val} suffix={s.suf} />
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[2.5px] text-[rgba(255,255,255,0.55)] mt-2">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ───── COSA FACCIAMO ───── */}
      <section id="cosa-facciamo" className="py-40 px-6 lg:px-12">
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
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-20">
              Quattro problemi cronici di ogni PMI italiana. Quattro soluzioni costruite da zero per risolverli — non adattamenti di strumenti generici che non parlano la tua lingua.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="group relative rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-10 hover:bg-[rgba(255,255,255,0.04)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                  {/* Color accent top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: s.color }}
                  />
                  {/* Large faded number */}
                  <span
                    className="absolute top-6 right-8 font-mono text-[72px] font-bold leading-none select-none pointer-events-none transition-opacity duration-500"
                    style={{ color: s.color, opacity: 0.06 }}
                  >
                    {s.num}
                  </span>
                  {/* Icon */}
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110" style={{ color: s.color }}>{s.icon}</div>
                  {/* Title */}
                  <h3 className="font-display text-[22px] font-semibold mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                  {/* Description */}
                  <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.65)] font-light mb-6">{s.text}</p>
                  {/* Bullets — reveal on hover */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100">
                    <ul className="space-y-2 mb-6">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-[13px] text-[rgba(255,255,255,0.7)] font-light">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* CTA link */}
                  <Link
                    to={s.link}
                    className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
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

      {/* ───── PRIMA / DOPO ───── */}
      <section className="py-40 px-6 lg:px-12">
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
            <p className="text-[17px] text-[rgba(255,255,255,0.65)] max-w-[600px] font-light mb-[72px]">
              Non è teoria. Sono i problemi che le PMI italiane ci portano ogni settimana. Qui sotto il problema — e la risposta che abbiamo costruito per risolverlo.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)]">
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-left px-6 py-4 font-normal">Problema attuale</th>
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-left px-6 py-4 font-normal">Con AEDIX</th>
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-right px-6 py-4 font-normal">Risultato</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(246,190,9,0.03)] transition-colors"
                    >
                      <td className="px-6 py-7 text-[15px] text-[rgba(255,255,255,0.6)] font-light line-through decoration-[rgba(255,100,100,0.4)]">
                        {row.today}
                      </td>
                      <td className="px-6 py-7 text-[15px] text-[rgba(255,255,255,0.8)] font-medium">
                        {row.aedix}
                      </td>
                      <td className="px-6 py-7 text-right font-mono text-[14px] font-bold text-green-impact">
                        {row.impact}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>


      <SectionDivider />

      {/* ───── PERCHÉ NOI ───── */}
      <section id="perche-noi" className="py-40 px-6 lg:px-12">
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

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn delay={0.16}>
              <div className="text-[17px] leading-[1.9] text-[rgba(255,255,255,0.7)] font-light space-y-6">
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
                  per costruire un ecosistema di soluzioni AI per le PMI italiane. Un prodotto alla volta, solo dopo averlo collaudato sul campo.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <blockquote
                className="italic font-light text-[rgba(255,255,255,0.75)] leading-[1.55] border-l-[3px] border-primary pl-8 mb-12"
                style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
              >
                "Costruiamo tecnologia per imprenditori che non hanno tempo di studiare la tecnologia. Funziona, o non esiste."
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                {[
                  { icon: <Shield size={20} />, text: "Ogni piattaforma testata sulle nostre aziende prima" },
                  { icon: <RefreshCw size={20} />, text: "Cloud-native: sempre aggiornato, zero manutenzione" },
                  { icon: <Target size={20} />, text: "Focus esclusivo sulle PMI italiane" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      {b.icon}
                    </div>
                    <p className="text-[13px] text-[rgba(255,255,255,0.6)] font-light">{b.text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── EDILIZIA IN CLOUD — SHOWCASE ───── */}
      <section id="prodotto" className="relative bg-alt py-40 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                <p className="text-[17px] text-[rgba(255,255,255,0.75)] font-light leading-[1.85] mb-8 max-w-[560px]">
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
                      <span className="text-[15px] text-[rgba(255,255,255,0.78)] font-light leading-[1.65]">{b}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.24}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/edilizia-in-cloud"
                    className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
                  >
                    Scopri il prodotto <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://www.ediliziaincloud.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-10 py-[18px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  >
                    Vai al portale ↗
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.16}>
              <TiltCard className="rounded-xl" tiltAmount={5}>
                <div
                  className="relative rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, rgba(30,58,95,0.85) 60%, rgba(10,19,34,1) 100%)",
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
                      <div className="text-[10px] text-[rgba(255,255,255,0.55)] font-light uppercase tracking-[1.5px]">{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </FadeIn>
          </div>

          <FadeIn delay={0.32}>
            <div className="mt-20 pt-10 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-6">
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] font-light max-w-[640px]">
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

      {/* ───── COME LAVORIAMO ───── */}
      <section className="py-40 px-6 lg:px-12">
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

          <div ref={timelineRef} className="grid md:grid-cols-4 gap-8 relative">
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
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i + 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-[24px] font-bold text-primary">{step.num}</span>
                  </motion.div>
                  <h3 className="font-display text-[20px] font-semibold mb-3">{step.title}</h3>
                  <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light leading-[1.7]">
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      <SectionDivider />

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-40 px-6 lg:px-12">
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

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Perdevo 3 ore al giorno tra email, Excel e telefonate per gestire la mia azienda. Adesso quella roba la fa il software. Quelle 3 ore le uso per vendere.",
                result: "3 ore al giorno restituite all'imprenditore",
                sector: "PMI Serramenti",
                metric: "3h",
                metricLabel: "al giorno recuperate",
              },
              {
                quote: "I lead arrivavano dal sito ma non li seguiva nessuno fuori orario. Con l'agente AI di prima risposta che ci hanno costruito, ogni richiesta riceve una risposta entro 60 secondi — anche di domenica alle 23.",
                result: "Zero lead persi per mancata risposta",
                sector: "PMI Impiantistica",
                metric: "60s",
                metricLabel: "tempo medio di risposta AI",
              },
              {
                quote: "Investivamo in ads senza sapere cosa funzionava davvero. Adesso ogni euro ha un numero attaccato. Sappiamo esattamente quale campagna genera clienti e quale brucia budget.",
                result: "Budget tracciato dal click alla firma",
                sector: "PMI Retail",
                metric: "100%",
                metricLabel: "tracciabilità investimento",
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="group relative p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all hover:-translate-y-1 h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <MessageSquareQuote className="text-primary/50 mb-4" size={24} />
                  <p className="text-[15px] text-[rgba(255,255,255,0.75)] font-light leading-[1.8] italic mb-6 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-[rgba(255,255,255,0.06)] pt-5 mt-auto flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary text-[11px] font-bold">{t.sector.charAt(0)}</span>
                    </div>
                    <p className="text-[12px] text-[rgba(255,255,255,0.45)] font-mono">{t.sector}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── FAQ ───── */}
      <section className="py-40 px-6 lg:px-12">
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
            {[
              {
                q: "Quanto costa implementare l'AI nella mia azienda?",
                a: "Dipende dalle esigenze, ma il nostro modello è pensato per le PMI: le piattaforme partono da abbonamenti mensili accessibili, senza costi di setup nascosti e senza vincoli annuali. Organizziamo una demo gratuita per valutare insieme la soluzione più adatta alla tua situazione specifica.",
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
            ].map((faq, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <FAQItem question={faq.q} answer={faq.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── CTA FINALE ───── */}
      <section id="cta-finale" className="relative py-[200px] px-6 lg:px-12 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-background/[0.94]" />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(246,190,9,0.08) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-[900px] mx-auto">
          <FadeIn>
            <h2
              className="font-display font-bold leading-[1.06] tracking-[-2px] mb-8"
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
            >
              La tua azienda tra 12 mesi<br />
              sarà <span className="italic font-light text-primary">irriconoscibile.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[540px] mx-auto font-light leading-[1.7] mb-12">
              Meno costi fissi. Più vendite. Più controllo. Più libertà. Non è una promessa — è un sistema che funziona già per chi lo usa.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contatti" className="shimmer-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden inline-block">
                Parla Con Noi →
              </Link>
              <Link to="/edilizia-in-cloud" className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:border-primary hover:text-primary transition-all inline-block">
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
