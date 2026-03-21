import { useState, useEffect, useRef, useCallback } from "react";
import aedixLogo from "@/assets/aedix_logo.png";
import { motion, useInView, useMotionValue, animate, useScroll, useTransform } from "framer-motion";
import { Menu, X, Shield, RefreshCw, Target, Cloud, HardHat, Brain, Rocket, Handshake, ScanFace, Briefcase, TrendingUp, DollarSign, Users, BarChart3, Building2, Zap, Clock, Bot, Gauge, BadgeCheck, MessageSquareQuote, HelpCircle, ChevronDown, Cpu, Database, Globe, Lock, Sparkles } from "lucide-react";

// ─── Animated Progress Bar ───────────────────────────────────
const AnimatedBar = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="w-full h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

// ─── Custom Cursor ───────────────────────────────────────────
const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
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
      // Only render every 2nd frame
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

// ─── Floating Badge (CSS animation, no Framer Motion) ────────
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

// ─── Section Divider ─────────────────────────────────────────
const SectionDivider = () => <div className="section-divider w-full" />;

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

// ─── Data ────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="20" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="20" width="14" height="14" rx="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Piattaforme SaaS Verticali",
    text: "Software gestionale, sicurezza, back-office in outsourcing. Ogni piattaforma elimina un costo fisso dalla tua azienda e ti restituisce ore. Non giorni — ore.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Agenti AI Operativi",
    text: "Non chatbot decorativi. Agenti che rispondono ai clienti, qualificano lead, compilano preventivi e gestiscono appuntamenti. Lavorano di notte. Non chiedono ferie.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polyline points="4,28 12,20 20,24 32,8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="8" r="3" fill="currentColor" />
      </svg>
    ),
    title: "Marketing & Vendita a Performance",
    text: "L'unica struttura in Italia che lavora a commissione sulle vendite chiuse. Se non vendi, non ci paghi. Il nostro fatturato dipende dal tuo.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L30 12V24L18 32L6 24V12L18 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M18 4V18M18 18L30 12M18 18L6 12M18 18V32M18 18L30 24M18 18L6 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    ),
    title: "Consulenza e Formazione",
    text: "Vendita, gestione aziendale, recruiting. Metodi testati su imprese reali — non teoria da manuale. Ogni strategia che insegniamo, la usiamo prima su noi stessi.",
  },
];

const stats = [
  { value: 7, suffix: "", label: "Piattaforme sviluppate e operative" },
  { value: 11, suffix: "", label: "Agenti AI attivi 24/7" },
  { value: 44, suffix: "", label: "Workflow automatizzati" },
  { value: 8, suffix: "+", label: "Anni nel mercato italiano" },
];

const comparison = [
  { today: "Segretaria a tempo pieno", aedix: "Agente AI a €200/mese", impact: "−80%" },
  { today: "Agenzia marketing a canone", aedix: "Paghi solo sulle vendite chiuse", impact: "−100% rischio" },
  { today: "Gestionale generico inadatto", aedix: "Piattaforma verticale per il tuo settore", impact: "+3h/giorno" },
  { today: "Commerciale che non chiude", aedix: "Metodo di vendita testato e replicabile", impact: "+35% chiusure" },
  { today: "Contabilità e burocrazia interna", aedix: "Outsourcing pay-per-use", impact: "−2 dipendenti" },
];

const projectIcons: Record<string, React.ReactNode> = {
  "Edilizia in Cloud": <Cloud size={32} />,
  "Cantiere in Cloud": <Shield size={32} />,
  "Edilizia.io": <Brain size={32} />,
  "Marketing Edile": <Rocket size={32} />,
  "Vendita Edile": <Target size={32} />,
  "TalentProfile 360°": <ScanFace size={32} />,
  "Impresa Leggera": <Briefcase size={32} />,
};

const projects = [
  { name: "Edilizia in Cloud", color: "#00D4FF", desc: "Il sistema operativo per le imprese edili. Gestionale, cantieri, documenti, team — tutto in una piattaforma." },
  { name: "Cantiere in Cloud", color: "#FF6B35", desc: "Sicurezza cantiere e documentazione a norma. Ogni obbligo di legge sotto controllo, in tempo reale." },
  { name: "Edilizia.io", color: "#A855F7", desc: "Agenti AI as a Service. 11 agenti operativi che lavorano per la tua impresa 24 ore su 24." },
  { name: "Marketing Edile", color: "#10B981", desc: "Marketing a performance. Paghi solo sulle vendite chiuse. Zero canone, zero rischio." },
  { name: "Vendita Edile", color: "#F59E0B", desc: "Il metodo di vendita ibrido per imprese tecniche. Chiudi di più, chiudi meglio, chiudi prima." },
  { name: "TalentProfile 360°", color: "#EC4899", desc: "242 domande. 15 tratti comportamentali. Assumi la persona giusta al primo colpo." },
  { name: "Impresa Leggera", color: "#6366F1", desc: "Back-office in outsourcing pay-per-use. Fatturazione, buste paga, adempimenti — senza assumere nessuno." },
];

const aiStats = [
  { value: "$15.7T", label: "Impatto economico globale dell'AI entro il 2030", source: "PwC", icon: <DollarSign size={24} /> },
  { value: "40%", label: "Aumento produttività media con AI generativa", source: "McKinsey", icon: <TrendingUp size={24} /> },
  { value: "97M", label: "Nuovi posti di lavoro creati dall'AI entro il 2025", source: "World Economic Forum", icon: <Users size={24} /> },
  { value: "300%", label: "ROI medio delle aziende che adottano AI", source: "Accenture", icon: <BarChart3 size={24} /> },
  { value: "75%", label: "Delle aziende adotterà AI entro il 2027", source: "Gartner", icon: <Building2 size={24} /> },
  { value: "€3.200", label: "Risparmio medio mensile per PMI con AI", source: "AEDIX internal", icon: <Zap size={24} /> },
];

const socialVsAi = [
  { social: { myth: '"Sono una moda"', reality: "Oggi fatturano $200B/anno" }, ai: { myth: '"È troppo complicata"', reality: "Si configura in giorni, non mesi" } },
  { social: { myth: '"Non servono alla mia azienda"', reality: "Oggi sono il canale di vendita #1" }, ai: { myth: '"Non serve nel mio settore"', reality: "Già usata in edilizia, retail, ristorazione" } },
  { social: { myth: '"Costa troppo, non ho tempo"', reality: "Chi ha iniziato prima ha vinto" }, ai: { myth: '"Aspetto che maturi"', reality: "Chi aspetta, perde. Per sempre." } },
];

const competitivePoints = [
  { icon: <Clock size={28} />, stat: "24/7", label: "I tuoi agenti AI non dormono mai", bar: 100 },
  { icon: <BadgeCheck size={28} />, stat: "0", label: "Errori umani — processi automatizzati = zero dimenticanze", bar: 95 },
  { icon: <Gauge size={28} />, stat: "10x", label: "Velocità — preventivi, risposte, report in secondi", bar: 90 },
  { icon: <DollarSign size={28} />, stat: "−60%", label: "Costi — meno persone per le stesse attività", bar: 85 },
];

const timeline = [
  { num: "01", title: "Analisi", text: "Analizziamo la tua impresa: costi, processi, team, vendite. Identifichiamo dove stai perdendo soldi e dove puoi guadagnare di più." },
  { num: "02", title: "Strategia", text: "Disegniamo il piano d'azione: quali piattaforme attivare, quali agenti AI configurare, quali processi automatizzare per primi." },
  { num: "03", title: "Attivazione", text: "Configuriamo tutto. Le piattaforme vanno online, gli agenti AI iniziano a lavorare, i flussi di vendita partono. Tu non devi toccare niente." },
  { num: "04", title: "Risultati", text: "Primi numeri reali: lead generati, appuntamenti fissati, ore risparmiate, costi tagliati. Da qui si scala." },
];

// ─── Main Component ──────────────────────────────────────────
const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden custom-cursor-page">
      <CustomCursor />
      <ParticleField />

      {/* ───── NAVBAR ───── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-[rgba(255,255,255,0.04)]" : ""
        }`}
        style={{ background: "rgba(10,19,34,0.7)", backdropFilter: "blur(24px)" }}
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between px-6 lg:px-12 py-[18px]">
          <img src={aedixLogo} alt="AEDIX" className="h-12" />

          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "Cosa Facciamo", id: "cosa-facciamo" },
              { label: "Progetti", id: "progetti" },
              { label: "Chi Siamo", id: "chi-siamo" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="font-mono text-[13px] uppercase tracking-[1.5px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("cta-finale")}
            className="hidden md:block bg-primary text-primary-foreground font-bold text-[12px] uppercase tracking-[2px] px-6 py-2.5 hover:bg-white transition-colors"
          >
            Contattaci
          </button>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ background: "rgba(10,19,34,0.95)" }}
          >
            {["cosa-facciamo", "progetti", "chi-siamo"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-mono text-[13px] uppercase tracking-[1.5px] text-[rgba(255,255,255,0.7)] hover:text-white text-left"
              >
                {id.replace(/-/g, " ")}
              </button>
            ))}
            <button
              onClick={() => scrollTo("cta-finale")}
              className="bg-primary text-primary-foreground font-bold text-[12px] uppercase tracking-[2px] px-6 py-2.5 mt-2"
            >
              Contattaci
            </button>
          </motion.div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
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
          {/* Overline with typing effect */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-primary" />
              <TypingText text="Tecnologia Avanzata per le PMI Italiane" delay={0.5} />
            </div>
          </FadeIn>

          {/* H1 with glow */}
          <FadeIn delay={0.1}>
            <div className="relative">
              {/* Glow behind text */}
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
                Costruiamo il Futuro<br />
                con l'AI <span className="italic font-light text-primary">e le Persone.</span>
              </h1>
            </div>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.2}>
            <p className="text-[20px] leading-[1.75] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-10">
              Aedix è la tech company italiana che sviluppa{" "}
              <span className="text-[rgba(255,255,255,0.85)] font-medium">
                piattaforme SaaS, agenti AI e sistemi di vendita
              </span>{" "}
              per le piccole e medie imprese. Un unico ecosistema per tagliare i costi fissi, vendere di più e riprendere il controllo della tua azienda.
            </p>
          </FadeIn>

          {/* CTAs */}
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

          {/* Stats bar */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-16 mt-16">
              {[
                { val: 7, suf: "", label: "Piattaforme Attive" },
                { val: 11, suf: "", label: "Agenti AI Operativi" },
                { val: 8, suf: "+", label: "Anni di R&D" },
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
              Cosa Facciamo
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              Tutto ciò che serve alla tua PMI<br />
              per <span className="italic font-light text-primary">dominare</span> i prossimi 10 anni.
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-20">
              Non siamo una software house generica. Non siamo una web agency. Siamo un ecosistema tecnologico costruito per risolvere i problemi reali delle imprese italiane.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.04)]">
            {services.map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="group relative bg-background p-14 hover:bg-[rgba(255,255,255,0.02)] transition-all hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="text-primary mb-6">{s.icon}</div>
                  <h3 className="font-display text-[22px] font-semibold mb-4">{s.title}</h3>
                  <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.7)] font-light">{s.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── I NUMERI ───── */}
      <section className="bg-alt py-40 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
              I Numeri
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              Non promettiamo risultati.<br />
              <span className="italic font-light text-primary">Li misuriamo.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className={`py-8 px-6 ${i > 0 ? "lg:border-l border-[rgba(255,255,255,0.06)]" : ""}`}>
                  <span className="font-mono text-[56px] font-bold text-primary leading-none block glow-text">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-[14px] text-[rgba(255,255,255,0.65)] font-light mt-3 block">
                    {s.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── LA RIVOLUZIONE AI IN NUMERI ───── */}
      <section className="relative py-40 px-6 lg:px-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-background/[0.92]" />

        <div className="relative max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
              La Rivoluzione AI
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              L'AI non è il futuro.<br />
              <span className="italic font-light text-primary">È il presente che stai ignorando.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-16">
              Dati reali da fonti globali. Non opinioni — numeri che ogni imprenditore dovrebbe conoscere prima di decidere se "aspettare ancora un po'."
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiStats.map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="group relative p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="text-primary mb-4 opacity-70">{s.icon}</div>
                  <div className="font-mono text-[36px] font-bold text-primary leading-none mb-3 glow-text">
                    {s.value}
                  </div>
                  <p className="text-[14px] text-[rgba(255,255,255,0.55)] font-light leading-[1.6] mb-3">
                    {s.label}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.2)]">
                    Fonte: {s.source}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
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
              Il tuo business oggi costa troppo<br />
              e <span className="italic font-light text-primary">produce troppo poco.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[17px] text-[rgba(255,255,255,0.65)] max-w-[600px] font-light mb-[72px]">
              Ogni riga qui sotto è un costo che stai pagando adesso, un problema che puoi eliminare in 30 giorni, e un risultato misurabile. Nessuna promessa generica — solo numeri.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)]">
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-left px-6 py-4 font-normal">Oggi</th>
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-left px-6 py-4 font-normal">Con AEDIX</th>
                    <th className="font-mono text-[10px] uppercase tracking-[3px] text-[rgba(255,255,255,0.25)] text-right px-6 py-4 font-normal">Impatto</th>
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

      {/* ───── AI vs SOCIAL MEDIA ───── */}
      <section className="relative bg-alt py-40 px-6 lg:px-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-background/[0.93]" />

        <div className="relative max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
              La Lezione della Storia
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Chi ha ignorato i social nel 2010<br />
              ha perso un decennio.<br />
              <span className="italic font-light text-primary">Chi ignora l'AI oggi perderà tutto.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[17px] text-[rgba(255,255,255,0.65)] max-w-[600px] font-light mb-16">
              La storia si ripete. Ogni rivoluzione tecnologica divide il mercato in due: chi si adatta e chi scompare. Stai scegliendo da che parte stare.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Social Media 2010 Column */}
            <FadeIn delay={0.2}>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden">
                <div className="bg-[rgba(255,255,255,0.04)] px-8 py-5 border-b border-[rgba(255,255,255,0.06)]">
                  <h3 className="font-mono text-[12px] uppercase tracking-[3px] text-[rgba(255,255,255,0.65)]">
                    🕐 Social Media — 2010
                  </h3>
                </div>
                {socialVsAi.map((row, i) => (
                  <div key={i} className="px-8 py-6 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <p className="text-[15px] text-[rgba(255,255,255,0.6)] font-light line-through decoration-[rgba(255,100,100,0.4)] mb-2">
                      {row.social.myth}
                    </p>
                    <p className="text-[14px] text-green-impact font-medium">
                      → {row.social.reality}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* AI 2025 Column */}
            <FadeIn delay={0.3}>
              <div className="rounded-lg border border-primary/20 overflow-hidden">
                <div className="bg-primary/[0.08] px-8 py-5 border-b border-primary/10">
                  <h3 className="font-mono text-[12px] uppercase tracking-[3px] text-primary">
                    ⚡ Intelligenza Artificiale — 2025
                  </h3>
                </div>
                {socialVsAi.map((row, i) => (
                  <div key={i} className="px-8 py-6 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light mb-2">
                      {row.ai.myth}
                    </p>
                    <p className="text-[14px] text-primary font-semibold">
                      → {row.ai.reality}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center">
              <button
                onClick={() => scrollTo("cta-finale")}
                className="shimmer-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden"
              >
                Non Restare Indietro →
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />
      <section id="chi-siamo" className="py-40 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
              Chi Siamo
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
                  , ma costruita per il loro mondo — fatto di clienti da seguire, cantieri da gestire, burocrazia da sbrigare e margini da proteggere.
                </p>
                <p>
                  Non abbiamo iniziato da un ufficio. Abbiamo iniziato sul campo — gestendo un'impresa vera, vendendo ai clienti finali, sbattendo la testa su problemi che nessun software generico riusciva a risolvere.
                </p>
                <p>
                  Ogni piattaforma che sviluppiamo viene{" "}
                  <strong className="text-white font-semibold">prima testata internamente</strong>{" "}
                  sulle nostre stesse aziende. Se non funziona per noi, non esiste per te.
                </p>
                <p>
                  Oggi Aedix è un ecosistema di brand e piattaforme che coprono l'intera catena del valore di una PMI:{" "}
                  <strong className="text-white font-semibold">
                    dall'acquisizione clienti alla gestione operativa, dalla vendita al back-office, dall'intelligenza artificiale alla formazione del team.
                  </strong>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <blockquote
                className="italic font-light text-[rgba(255,255,255,0.75)] leading-[1.55] border-l-[3px] border-primary pl-8"
                style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
              >
                "Costruiamo tecnologia per imprenditori che non hanno tempo di studiare la tecnologia. Funziona, o non esiste."
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── VANTAGGIO COMPETITIVO ───── */}
      <section className="relative py-40 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <FadeIn>
              <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/[0.05]" />
              </div>
            </FadeIn>

            {/* Right: Content */}
            <div>
              <FadeIn>
                <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
                  Il Vantaggio
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2
                  className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-12"
                  style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                >
                  Mentre i tuoi competitor dormono,<br />
                  <span className="italic font-light text-primary">l'AI lavora per te.</span>
                </h2>
              </FadeIn>

              <div className="space-y-8">
                {competitivePoints.map((p, i) => (
                  <FadeIn key={i} delay={0.12 * i + 0.16}>
                    <div className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                          {p.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[28px] font-bold text-primary leading-none">{p.stat}</span>
                          <p className="text-[14px] text-[rgba(255,255,255,0.7)] font-light mt-1">{p.label}</p>
                        </div>
                      </div>
                      <AnimatedBar value={p.bar} delay={0.1 * i + 0.3} />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />
      <section id="progetti" className="bg-alt py-40 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">
              I Nostri Progetti
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              Sette piattaforme.<br />
              Un unico <span className="italic font-light text-primary">ecosistema.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-16">
              Ogni brand risolve un problema specifico. Insieme, creano un vantaggio competitivo impossibile da replicare.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <motion.div
                  className="group relative p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] transition-all"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  style={{ ["--brand-color" as string]: p.color }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-lg"
                    style={{ background: p.color }}
                  />
                  <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: p.color }}>
                    {projectIcons[p.name]}
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3" style={{ color: p.color }}>
                    {p.name}
                  </h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">
                    {p.desc}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
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
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              Dal primo contatto ai risultati.<br />
              <span className="italic font-light text-primary">In 4 settimane.</span>
            </h2>
          </FadeIn>

          <div ref={timelineRef} className="grid md:grid-cols-4 gap-8 relative">
            {/* Animated connection line */}
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

      {/* ───── SOCIAL PROOF ───── */}
      <section className="bg-alt py-40 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2
              className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              Costruito da chi fa impresa.<br />
              <span className="italic font-light text-primary">Per chi fa impresa.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {[
                { icon: <Shield className="text-primary" size={28} />, text: "Ogni tecnologia testata prima sulle nostre aziende" },
                { icon: <RefreshCw className="text-primary" size={28} />, text: "Performance-based: se non funziona, non ci paghi" },
                { icon: <Target className="text-primary" size={28} />, text: "Verticale sulle PMI italiane dal 2016" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-3 max-w-[200px]"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <p className="text-[14px] text-[rgba(255,255,255,0.7)] font-light">{b.text}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ───── CTA FINALE ───── */}
      <section id="cta-finale" className="relative py-[200px] px-6 lg:px-12 text-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-background/[0.94]" />
        {/* Animated glow */}
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
              <button className="shimmer-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden">
                Parla Con Noi →
              </button>
              <button className="border border-[rgba(255,255,255,0.15)] text-white font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:border-primary hover:text-primary transition-all">
                Scopri Le Piattaforme
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[rgba(255,255,255,0.04)] py-12 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={aedixLogo} alt="AEDIX" className="h-10" />
          <span className="text-[12px] text-[rgba(255,255,255,0.2)] tracking-[1px]">
            © 2026 AEDIX — Domus Group S.r.l. — Tutti i diritti riservati
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
