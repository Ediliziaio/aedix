import { useState, useEffect, useRef } from "react";
import aedixLogo from "@/assets/aedix_logo.png";
import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Check, Star, ArrowUpRight, ArrowRight,
  Shield, Clock, Zap, Menu, X, Send, User, Briefcase,
  MessageSquare, Globe, Search, Share2, BarChart3, FileText,
  Plus, Minus, Quote, Users, Award, Headphones, Calendar,
  TrendingUp, ThumbsDown, ThumbsUp, Instagram, Facebook, MessageCircle,
  Gift
} from "lucide-react";

// ─── Images ──────────────────────────────────────────────────
import serviceConstruction from "@/assets/service-construction.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceSocial from "@/assets/service-social.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import ctaAerial from "@/assets/cta-aerial.jpg";
import ctaInline from "@/assets/cta-inline.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import beforeSite from "@/assets/before-site.jpg";
import afterSite from "@/assets/after-site.jpg";

// ─── Data ─────────────────────────────────────────────────────

const companies = [
  "Rossi Costruzioni", "Edil Bianchi", "Muratori Uniti", "Costruzioni Ferrari",
  "Impresa Colombo", "Edilizia Moretti", "Fratelli Ricci", "Cantieri Lombardi",
  "Edil Service Roma", "Costruzioni Napoli", "Impresa Greco", "Edil Pro Milano"
];

const services = [
  { icon: Globe, title: "Sito Web Professionale", desc: "Design moderno e responsive, ottimizzato per convertire visitatori in clienti.", image: serviceConstruction },
  { icon: Search, title: "SEO Locale", desc: "Posizionamento su Google per le ricerche nella tua zona. Più visibilità, più clienti.", image: serviceSeo },
  { icon: Share2, title: "Google My Business", desc: "Profilo ottimizzato per apparire nelle ricerche locali e su Google Maps.", image: serviceGmb },
  { icon: BarChart3, title: "Social Media", desc: "Pagine Facebook e Instagram configurate e collegate al tuo sito web.", image: serviceSocial },
];

const projects = [
  { title: "Sito Web Rossi Costruzioni", category: "Sito Web Completo", desc: "Sito moderno con portfolio lavori, galleria fotografica e form contatto integrato.", image: project1 },
  { title: "Landing Page Edil Bianchi", category: "Lead Generation", desc: "Landing page ottimizzata per generare preventivi con SEO locale integrato.", image: project2 },
  { title: "Portale Costruzioni Ferrari", category: "Portale Aziendale", desc: "Portale completo con galleria progetti, preventivi online e area clienti.", image: project3 },
];

const blogPosts = [
  { title: "Come un sito web può raddoppiare i tuoi clienti in edilizia", date: "15 Mar 2026", image: blog1, category: "Marketing" },
  { title: "5 errori che le imprese edili fanno online", date: "10 Mar 2026", image: blog2, category: "Strategia" },
  { title: "SEO locale: la guida per imprese di costruzione", date: "5 Mar 2026", image: blog3, category: "SEO" },
];

const whyUs = [
  { icon: Shield, title: "Zero Anticipo", desc: "Paghi solo a sito completato e approvato da te." },
  { icon: Clock, title: "Consegna 48h", desc: "Il tuo sito online in soli 2 giorni lavorativi." },
  { icon: Zap, title: "Soddisfatto o Rimborsato", desc: "Non ti piace? Ti restituiamo tutto, senza domande." },
  { icon: Headphones, title: "Supporto Dedicato", desc: "30 giorni di assistenza gratuita dopo la consegna." },
];

const steps = [
  { num: "01", title: "Chiamata Conoscitiva", desc: "15 minuti per capire la tua impresa, i tuoi servizi e i tuoi obiettivi. Nessun impegno.", time: "15 min" },
  { num: "02", title: "Anteprima in 24 Ore", desc: "Ti mostriamo la prima bozza del tuo sito. Tu approvi o chiedi modifiche illimitate.", time: "24 ore" },
  { num: "03", title: "Online in 48 Ore", desc: "Sito pubblicato, ottimizzato per Google e pronto a ricevere clienti ogni giorno.", time: "48 ore" },
];

const reviews = [
  { name: "Marco Rossi", company: "Rossi Costruzioni", city: "Milano", text: "In 2 giorni avevo il sito online. Il mese dopo ho ricevuto 12 richieste di preventivo. Mai visto nulla di simile.", rating: 5, avatar: "MR" },
  { name: "Giuseppe Bianchi", company: "Edil Bianchi", city: "Roma", text: "Finalmente un'agenzia che capisce le esigenze di chi lavora in cantiere. Professionali, veloci e il risultato è eccezionale.", rating: 5, avatar: "GB" },
  { name: "Antonio Ferrari", company: "Costruzioni Ferrari", city: "Napoli", text: "Il sito ha dato una svolta alla mia attività. Ora i clienti mi trovano su Google e mi chiamano ogni settimana.", rating: 5, avatar: "AF" },
  { name: "Luca Colombo", company: "Impresa Colombo", city: "Torino", text: "Zero anticipo e risultato eccellente. Lo consiglio a tutti i colleghi del settore edile.", rating: 5, avatar: "LC" },
  { name: "Salvatore Greco", company: "Impresa Greco", city: "Palermo", text: "Pensavo fosse impossibile avere un sito professionale in 48 ore. Mi sbagliavo. Lavoro impeccabile.", rating: 5, avatar: "SG" },
  { name: "Roberto Conti", company: "Edil Pro Milano", city: "Milano", text: "Il mio vecchio sito non portava nessun cliente. Con il nuovo sito ricevo 3-4 richieste a settimana.", rating: 5, avatar: "RC" },
];

const stats = [
  { value: 127, suffix: "+", label: "Imprese Servite" },
  { value: 12, suffix: "+", label: "Anni di Esperienza" },
  { value: 98, suffix: "%", label: "Clienti Soddisfatti" },
  { value: 48, suffix: "h", label: "Tempo di Consegna" },
];

const offerFeatures = [
  "Sito web professionale su misura",
  "Ottimizzato per Google (SEO)",
  "Design responsive (mobile-first)",
  "Galleria lavori fotografica",
  "Form contatto integrato",
  "Velocità di caricamento ottimale",
  "Dominio e hosting per 1 anno",
  "Certificato SSL incluso",
];

const bonuses = [
  { title: "Setup Google My Business", value: "€200" },
  { title: "Pagine Facebook & Instagram", value: "€150" },
  { title: "Google Analytics configurato", value: "€100" },
  { title: "Guida PDF marketing edile", value: "€50" },
];

const faqs = [
  { q: "Quanto costa il sito web?", a: "Il prezzo è di €1.000 (invece di €1.400) tutto incluso. Dominio, hosting, SSL, design, copywriting e ottimizzazione SEO. Nessun costo nascosto." },
  { q: "Devo pagare un anticipo?", a: "No, zero anticipo. Paghi solo dopo aver visto e approvato il sito completato. Se non ti piace, non paghi nulla." },
  { q: "In quanto tempo sarà pronto?", a: "Il sito viene consegnato in 48 ore lavorative dalla chiamata conoscitiva. Riceverai un'anteprima entro le prime 24 ore." },
  { q: "Il sito sarà visibile su Google?", a: "Assolutamente sì. Ogni sito viene ottimizzato SEO per posizionarsi nelle ricerche locali della tua zona." },
  { q: "Cosa succede se non mi piace?", a: "Garanzia soddisfatti o rimborsati. Se il risultato non ti convince, ti restituiamo l'intero importo senza domande." },
];

const tickerLine1 = "PORTIAMO CLIENTI IN CANTIERE";
const tickerLine2 = "SITI WEB ◆ SEO ◆ GOOGLE MY BUSINESS ◆ SOCIAL MEDIA ◆ BRANDING ◆ MARKETING";

// ─── Helpers ──────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, className = "", speed = 0.2 }: { src: string; alt: string; className?: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y }} className="w-full h-full object-cover scale-[1.2]" />
    </div>
  );
}

function ClipReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label mb-6">( {children} )</p>;
}

function CarinoButton({ children, href, variant = "filled" }: { children: string; href: string; variant?: "filled" | "outline" }) {
  const cls = variant === "filled" ? "btn-carino" : "btn-carino-outline";
  return (
    <a href={href} className={cls}>
      {children}
      <span className="arrow-circle">
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
}

// ─── Scroll Progress ──────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />;
}

// ─── Top Offer Banner ─────────────────────────────────────────

function TopBanner({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 h-10 relative">
        <Gift size={16} className="shrink-0 hidden sm:block" />
        <p className="text-xs sm:text-sm font-ui font-bold tracking-wide text-center">
          Offerta: Se non sei soddisfatto del nostro servizio, il sito te lo lasciamo <span className="underline underline-offset-2">GRATIS</span>
        </p>
        <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity" aria-label="Chiudi">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────

function Navbar({ bannerVisible }: { bannerVisible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Servizi", href: "#servizi" },
    { label: "Progetti", href: "#progetti" },
    { label: "Recensioni", href: "#recensioni" },
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${bannerVisible ? "top-10" : "top-0"} ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#" className="flex items-center">
          <img src={aedixLogo} alt="AEDIX" className="h-10" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-ui">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <CarinoButton href="#contatti">Contattaci</CarinoButton>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 pb-6 pt-2 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground py-2 font-ui">{l.label}</a>
          ))}
          <a href="#contatti" onClick={() => setMobileOpen(false)} className="btn-carino text-center justify-center mt-2">
            Contattaci
            <span className="arrow-circle"><ArrowUpRight size={18} /></span>
          </a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage src={heroBg} alt="" className="absolute inset-0 w-full h-full" speed={0.1} />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>

      {/* Social sidebar */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-6 top-1/2 -translate-y-1/2 z-40">
        {[
          { icon: Facebook, href: "#", label: "Facebook" },
          { icon: Instagram, href: "#", label: "Instagram" },
          { icon: MessageCircle, href: "https://wa.me/390212345678", label: "WhatsApp" },
        ].map((s, i) => (
          <a key={i} href={s.href} aria-label={s.label} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
            <s.icon size={16} />
          </a>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center py-16 lg:py-0 relative z-10">
        {/* Left */}
        <div className="space-y-8">

          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] font-bold">
              Il sito che porta{" "}
              <span className="text-gradient-lime">clienti</span>{" "}
              alla tua impresa.{" "}
              <span className="text-primary">In 48 ore.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="border-l-2 border-primary pl-5">
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Creiamo siti web professionali per imprese edili italiane. Zero anticipo, consegna in 48 ore, garanzia soddisfatti o rimborsati.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <CarinoButton href="#contatti">Parliamone Subito</CarinoButton>
              <CarinoButton href="#offerta" variant="outline">Scopri l'Offerta</CarinoButton>
            </div>
          </FadeIn>
        </div>

        {/* Right — Testimonial card + floating image */}
        <FadeIn delay={0.3} className="hidden lg:block">
          <div className="relative">
            {/* Project image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="img-card aspect-[4/3] rounded-2xl overflow-hidden glow-lime"
            >
              <img src={project1} alt="Progetto villa moderna" className="w-full h-full object-cover" />
              <div className="img-overlay" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-ui text-xs text-primary tracking-wider uppercase mb-1">Progetto Recente</p>
                <p className="font-display text-xl text-foreground font-semibold">Sito Web Rossi Costruzioni</p>
              </div>
            </motion.div>

            {/* Testimonial card floating */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-card border border-border rounded-xl p-5 max-w-[280px] backdrop-blur-lg"
            >
              <Quote size={24} className="text-primary/30 mb-2" />
              <p className="text-foreground/80 text-sm leading-relaxed italic mb-3">
                "In 2 giorni avevo il sito online. 12 richieste di preventivo il mese dopo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                  MR
                </div>
                <div>
                  <p className="font-ui font-semibold text-sm">Marco Rossi</p>
                  <p className="text-muted-foreground text-xs">Milano</p>
                </div>
              </div>
            </motion.div>

            {/* Avatar cluster */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-ui font-bold text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["MR", "GB", "AF"].map((initials, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-primary-foreground/20 text-[10px] font-bold flex items-center justify-center border border-primary">
                      {initials}
                    </div>
                  ))}
                </div>
                <span>+127 imprese</span>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Clients Ticker ───────────────────────────────────────────

function ClientsTicker() {
  return (
    <section className="py-10 border-y border-border">
      <FadeIn>
        <div className="flex items-center gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="section-label whitespace-nowrap">Alcuni dei Nostri Clienti</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </FadeIn>
      <div className="overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...companies, ...companies].map((name, i) => (
            <span key={i} className="mx-8 text-muted-foreground/30 font-ui text-xl tracking-widest uppercase">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About / Stats ────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <FadeIn>
              <SectionLabel>Chi Siamo</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8 font-bold">
                La tua visione, la nostra{" "}
                <span className="text-gradient-lime">esperienza.</span>{" "}
                Insieme costruiamo il tuo successo online.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Siamo specializzati nella creazione di siti web per imprese edili italiane.
                Conosciamo il tuo settore, i tuoi clienti e le sfide che affronti ogni giorno.
                La nostra missione è semplice: portarti più clienti con un sito che funziona davvero.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500">
                  <div className="font-display text-5xl sm:text-6xl text-primary mb-2 font-bold">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-muted-foreground text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Services with Images ─────────────────────────────────────

function ServicesSection() {
  return (
    <section id="servizi" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>I Nostri Servizi</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4 max-w-3xl font-bold">
            Tutto quello che ti serve per portare{" "}
            <span className="text-gradient-lime">clienti</span> in cantiere
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-muted-foreground text-lg mb-16 max-w-xl">
            Servizi completi di web marketing specifici per il settore edile.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ClipReveal key={i} delay={i * 0.12}>
              <div className="img-card group cursor-pointer h-[400px]">
                <img src={s.image} alt={s.title} loading="lazy" />
                <div className="img-overlay" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <s.icon size={22} className="text-primary" />
                    </div>
                    <span className="font-ui text-xs tracking-wider uppercase text-primary">Servizio {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-2">{s.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {s.desc}
                  </p>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-0 rotate-45 transition-all duration-500">
                  <ArrowUpRight size={20} className="text-foreground" />
                </div>
              </div>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section (NEW) ──────────────────────────────────

function ProjectsSection() {
  return (
    <section id="progetti" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn>
              <SectionLabel>Progetti Recenti</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-2xl font-bold">
                I siti che abbiamo{" "}
                <span className="text-gradient-lime">costruito</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <CarinoButton href="#contatti" variant="outline">Vedi Tutti i Progetti</CarinoButton>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="img-card group cursor-pointer h-[500px]">
                <ParallaxImage src={p.image} alt={p.title} className="absolute inset-0 w-full h-full" speed={0.2} />
                <div className="img-overlay" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                  <span className="font-ui text-xs tracking-wider uppercase text-primary mb-2">{p.category}</span>
                  <h3 className="font-display text-2xl text-foreground mb-2">{p.title}</h3>
                  <p className="text-foreground/60 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {p.desc}
                  </p>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 z-10">
                  <ArrowUpRight size={18} className="text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Results Section (NEW) ────────────────────────────────────

const results = [
  { value: 340, suffix: "%", prefix: "+", label: "Aumento Traffico", desc: "Media di crescita del traffico organico per i nostri clienti nei primi 3 mesi." },
  { value: 12, suffix: "", prefix: "", label: "Preventivi / Mese", desc: "Richieste di preventivo mensili medie generate dai siti che creiamo." },
  { value: 180, suffix: "k", prefix: "€", label: "Fatturato Generato", desc: "Volume d'affari generato per i nostri clienti nell'ultimo anno." },
];

function ResultsSection() {
  return (
    <section className="py-24 sm:py-32 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>Risultati Concreti</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            Numeri che <span className="text-gradient-lime">parlano</span> da soli
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((r, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative bg-card border border-border rounded-2xl p-10 hover:border-primary/40 transition-all duration-500 group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="font-display text-6xl sm:text-7xl text-primary font-bold mb-4">
                  <AnimatedCounter value={r.value} suffix={r.suffix} prefix={r.prefix} />
                </div>
                <h3 className="font-ui font-semibold text-lg mb-2">{r.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Before & After Section (NEW) ─────────────────────────────

function BeforeAfterSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>Prima & Dopo</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            La differenza è <span className="text-gradient-lime">evidente</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <FadeIn delay={0.1}>
            <div className="bg-card border border-destructive/30 rounded-2xl overflow-hidden group">
              <div className="relative h-[280px] overflow-hidden">
                <img src={beforeSite} alt="Sito web vecchio e datato" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <ThumbsDown size={18} className="text-destructive" />
                  </div>
                  <span className="font-ui font-semibold text-destructive">Senza AEDIX</span>
                </div>
                <ul className="space-y-3">
                  {["Sito datato o inesistente", "Zero richieste da Google", "Nessuna presenza su Maps", "Clienti solo dal passaparola"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <X size={14} className="text-destructive shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* After */}
          <FadeIn delay={0.25}>
            <div className="bg-card border border-primary/30 rounded-2xl overflow-hidden group glow-lime">
              <div className="relative h-[280px] overflow-hidden">
                <img src={afterSite} alt="Sito web moderno e professionale" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ThumbsUp size={18} className="text-primary" />
                  </div>
                  <span className="font-ui font-semibold text-primary">Con AEDIX</span>
                </div>
                <ul className="space-y-3">
                  {["Sito moderno e professionale", "10+ richieste al mese da Google", "Prima pagina su Google Maps", "Clienti nuovi ogni settimana"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80 text-sm">
                      <Check size={14} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────

function WhyUsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>Perché Noi</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            Garanzie che nessun altro ti <span className="text-gradient-lime">offre</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((w, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-2 glow-lime transition-all duration-500 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <w.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-xl mb-3">{w.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Double Marquee Ticker ────────────────────────────────────

function DoubleMarquee() {
  const repeat = (text: string, count: number) => Array(count).fill(text).join(" ◆ ");
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="mb-4">
        <div className="flex animate-ticker whitespace-nowrap">
          <span className="font-display text-5xl sm:text-7xl lg:text-8xl text-foreground/5 mx-4">
            {repeat(tickerLine1, 6)}
          </span>
        </div>
      </div>
      <div>
        <div className="flex animate-ticker-reverse whitespace-nowrap">
          <span className="font-ui text-lg sm:text-xl text-muted-foreground/20 tracking-[0.2em] uppercase mx-4">
            {repeat(tickerLine2, 4)}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────

function ProcessSection() {
  return (
    <section id="processo" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>Come Funziona</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            Tre passi per il tuo <span className="text-gradient-lime">nuovo sito</span>
          </h2>
        </FadeIn>

        {/* Timeline layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="relative flex gap-8 mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg items-center justify-center relative z-10">
                  {s.num}
                </div>

                {/* Content card */}
                <div className="flex-1 bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
                  <span className="font-display text-8xl text-primary/5 absolute -top-4 -right-2 group-hover:text-primary/10 transition-colors">
                    {s.num}
                  </span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="md:hidden font-display text-sm font-bold text-primary">{s.num}</span>
                      <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 font-ui text-xs font-semibold">
                        {s.time}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section id="recensioni" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>Recensioni</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            Cosa dicono i nostri <span className="text-gradient-lime">clienti</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                <Quote size={32} className="text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 flex-1 italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-sm">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.company}, {r.city}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-ui font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                      ✓ Verificato
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner with Inline Images ───────────────────────────

function CTABanner() {
  return (
    <section className="py-24 sm:py-32 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-center font-bold">
            Trasformiamo la tua{" "}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={ctaAerial} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover inline-block border-2 border-primary" />
            </span>{" "}
            impresa edile in un{" "}
            <span className="text-gradient-lime">magnete</span>{" "}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={ctaInline} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover inline-block border-2 border-primary" />
            </span>{" "}
            per clienti
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex justify-center mt-12">
            <CarinoButton href="#contatti">Inizia Ora</CarinoButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="offerta" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel>L'Offerta</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-16 max-w-3xl font-bold">
            Un investimento che si <span className="text-gradient-lime">ripaga</span> da solo
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto">
            {/* Urgency Banner */}
            <div className="animate-urgency-glow bg-primary/10 border border-primary/30 rounded-2xl p-4 mb-6 text-center">
              <p className="font-ui font-semibold text-sm text-primary">
                ⚡ Solo 5 posti disponibili a Marzo — <span className="underline">Prenota ora</span>
              </p>
            </div>

            <div className="bg-card border-2 border-primary rounded-3xl overflow-hidden glow-lime">
              <div className="bg-primary/10 p-8 text-center">
                <span className="font-ui text-xs tracking-wider uppercase text-primary">Pacchetto Completo</span>
                <div className="mt-4 flex items-baseline justify-center gap-3">
                  <span className="text-muted-foreground line-through text-2xl">€1.400</span>
                  <span className="font-display text-6xl sm:text-7xl text-primary">€1.000</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">Pagamento unico · Zero anticipo</p>
              </div>
              <div className="p-8 space-y-4">
                {offerFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-primary shrink-0" />
                    <span className="text-foreground/90">{f}</span>
                  </div>
                ))}
                <div className="pt-6 border-t border-border mt-6">
                  <p className="font-ui font-semibold text-sm text-primary mb-4">🎁 Bonus Inclusi (valore €500)</p>
                  {bonuses.map((b, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-primary" />
                        <span className="text-sm text-foreground/80">{b.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground line-through">{b.value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 flex justify-center">
                  <CarinoButton href="#contatti">Parliamone Subito</CarinoButton>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Guarantee Section ────────────────────────────────────────

function GuaranteeSection() {
  return (
    <section className="py-24 sm:py-32 bg-card/50">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-primary/30 bg-card p-10 sm:p-16 text-center glow-lime-lg"
        >
          {/* Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-ui text-xs font-bold uppercase tracking-widest text-primary-foreground">
              <Award size={16} /> Garanzia 100%
            </span>
          </div>

          {/* Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 animate-urgency-glow">
            <Shield size={48} className="text-primary" />
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Se non sei soddisfatto,{" "}
            <br className="hidden sm:block" />
            il sito è <span className="text-gradient-lime">GRATIS</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Crediamo così tanto nel nostro lavoro che ci mettiamo la faccia. Se il risultato non ti convince, non paghi nulla e il sito resta tuo. Zero rischi, zero sorprese.
          </p>

          {/* 3 Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Shield, label: "Zero rischio", desc: "Non paghi se non sei soddisfatto" },
              { icon: Check, label: "Nessun vincolo", desc: "Libertà totale, nessun contratto lungo" },
              { icon: Users, label: "Trasparenza totale", desc: "Comunicazione chiara in ogni fase" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon size={24} className="text-primary" />
                </div>
                <span className="font-ui font-semibold text-foreground">{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a href="#contatti" className="btn-carino">
            Inizia Senza Rischi
            <span className="arrow-circle"><ArrowUpRight size={18} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog Section (NEW) ──────────────────────────────────────

function BlogSection() {
  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn>
              <SectionLabel>Insights</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-2xl font-bold">
                Risorse per far crescere la tua <span className="text-gradient-lime">impresa</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <CarinoButton href="#" variant="outline">Tutti gli Articoli</CarinoButton>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <ScaleIn key={i} delay={i * 0.15}>
              <div className="group cursor-pointer">
                <div className="img-card aspect-[4/3] mb-5">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-ui text-xs tracking-wider uppercase text-primary">{post.category}</span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <h3 className="font-display text-xl group-hover:text-primary transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <FadeIn>
              <SectionLabel>Domande Frequenti</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-6 font-bold">
                Hai qualche <span className="text-gradient-lime">domanda?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Ecco le risposte alle domande più frequenti. Non trovi quello che cerchi? Contattaci direttamente.
              </p>
              <CarinoButton href="#contatti" variant="outline">Contattaci</CarinoButton>
            </FadeIn>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${openIndex === i ? "border-primary/40 bg-card" : "border-border hover:border-primary/20"}`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="font-ui font-semibold text-sm sm:text-base">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === i ? "bg-primary border-primary rotate-180" : ""}`}>
                      {openIndex === i ?
                        <Minus size={14} className="text-primary-foreground" /> :
                        <Plus size={14} className="text-muted-foreground" />
                      }
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contatti" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <SectionLabel>Contattaci</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-8 font-bold">
                Pronto a portare <span className="text-gradient-lime">clienti</span> in cantiere?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Compila il form o contattaci direttamente. Ti rispondiamo entro 2 ore lavorative.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "+39 02 1234 5678" },
                { icon: Mail, label: "info@clientiedili.it" },
                { icon: MapPin, label: "Milano, Italia" },
              ].map((c, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.1}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <c.icon size={20} className="text-primary" />
                    </div>
                    <span className="text-foreground">{c.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            {submitted ? (
              <div className="bg-card border border-primary/40 rounded-2xl p-10 text-center glow-lime flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Check size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-4">Messaggio Inviato!</h3>
                <p className="text-muted-foreground">Ti ricontattiamo entro 2 ore lavorative.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-ui text-xs uppercase tracking-wider text-muted-foreground mb-2">Nome *</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-ui text-xs uppercase tracking-wider text-muted-foreground mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-ui text-xs uppercase tracking-wider text-muted-foreground mb-2">Telefono</label>
                  <input
                    type="tel"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-ui text-xs uppercase tracking-wider text-muted-foreground mb-2">Messaggio *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-carino w-full justify-center">
                  Invia Messaggio
                  <span className="arrow-circle"><Send size={16} /></span>
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <SectionLabel>Inizia Oggi</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-8 font-bold">
            Collaboriamo<span className="text-primary">!</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Il tuo prossimo cliente sta cercando su Google un'impresa come la tua. Fatti trovare.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <CarinoButton href="#contatti">Parliamone Subito</CarinoButton>
            <CarinoButton href="tel:+390212345678" variant="outline">Chiama Ora</CarinoButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={clientiEdiliLogo} alt="ClientiEdili" className="h-10" />
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Siti web professionali per imprese edili italiane. Più clienti, più lavoro, più crescita.
            </p>

            {/* Google Reviews badge */}
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <span className="text-sm text-foreground font-semibold">4.9/5</span>
              <span className="text-xs text-muted-foreground">su Google Reviews</span>
            </div>

            {/* Newsletter */}
            <div>
              <p className="font-ui text-xs uppercase tracking-wider text-muted-foreground mb-3">Newsletter</p>
              <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex gap-2">
                <input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <button type="submit" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 font-ui text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Iscriviti
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="font-ui font-semibold mb-4 text-sm">Link Utili</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#servizi" className="hover:text-foreground transition-colors">Servizi</a></li>
              <li><a href="#progetti" className="hover:text-foreground transition-colors">Progetti</a></li>
              <li><a href="#recensioni" className="hover:text-foreground transition-colors">Recensioni</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold mb-4 text-sm">Contatti</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>+39 02 1234 5678</li>
              <li>info@clientiedili.it</li>
              <li>Milano, Italia</li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: "https://wa.me/390212345678" },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2026 ClientiEdili. Tutti i diritti riservati.</p>
          <div className="flex gap-6 text-muted-foreground text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp Button ─────────────────────────────────

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/390212345678"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center animate-whatsapp-pulse transition-transform hover:scale-110"
      style={{ backgroundColor: "hsl(142 70% 49%)" }}
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Index() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBanner visible={bannerVisible} onClose={() => setBannerVisible(false)} />
      <ScrollProgress />
      <Navbar bannerVisible={bannerVisible} />
      <Hero />
      <ClientsTicker />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ResultsSection />
      <BeforeAfterSection />
      <WhyUsSection />
      <DoubleMarquee />
      <ProcessSection />
      <TestimonialsSection />
      <CTABanner />
      <PricingSection />
      <GuaranteeSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
