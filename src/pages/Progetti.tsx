import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Cloud, Shield, Brain, Briefcase, ArrowRight, Cpu, Zap, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";
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

const projects = [
  { name: "Edilizia in Cloud", slug: "edilizia-in-cloud", color: "#00D4FF", icon: <Cloud size={32} />, desc: "Il sistema operativo per le imprese edili. Gestionale, cantieri, documenti, team — tutto in una piattaforma.", tag: "SaaS", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
  { name: "Edilizia.io", slug: "edilizia-io", color: "#A855F7", icon: <Brain size={32} />, desc: "AI operativa per la tua impresa. Agenti intelligenti che rispondono ai clienti, qualificano lead e gestiscono appuntamenti — 24 ore su 24.", tag: "AI", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" },
  { name: "Impresa Leggera", slug: "impresa-leggera", color: "#6366F1", icon: <Briefcase size={32} />, desc: "Back-office in outsourcing pay-per-use. Fatturazione, buste paga, adempimenti — senza assumere nessuno.", tag: "Operations", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80" },
  { name: "TutelAI", slug: "tutelai", color: "#10B981", icon: <Shield size={32} />, desc: "Tutela legale e compliance per le PMI, potenziata dall'AI. Contratti, scadenze normative, GDPR — sotto controllo, in automatico.", tag: "Legal AI", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" },
];

const ecosystemStats = [
  { value: "4", label: "Piattaforme attive" },
  { value: "AI", label: "Nativamente integrata" },
  { value: "24/7", label: "Operativi" },
  { value: "EU", label: "GDPR compliant" },
];

const ecosystemFlow = [
  { icon: <Zap size={28} />, title: "Input", desc: "Dati, richieste, processi aziendali" },
  { icon: <Cpu size={28} />, title: "AI Processing", desc: "Agenti AI + automazione intelligente dei processi" },
  { icon: <BarChart3 size={28} />, title: "Output", desc: "Risultati misurabili, decisioni informate" },
];

const Progetti = () => (
  <>
    <SEO
      title="Progetti AEDIX — 4 Piattaforme AI per PMI Italiane"
      description="Le 4 piattaforme dell'ecosistema AEDIX: Edilizia in Cloud, Edilizia.io, Impresa Leggera, TutelAI. Software AI nativa per PMI italiane."
      path="/progetti"
    />
    <Layout>
    {/* Hero with parallax bg */}
    <section className="relative pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
        alt="Ecosistema di 4 piattaforme AEDIX per PMI italiane"
        className="absolute inset-0"
        speed={0.2}
        overlay={<div className="absolute inset-0 bg-background/[0.92]" />}
      />
      <div className="relative max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I Nostri Progetti</span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Quattro piattaforme.<br />
            Un unico <span className="italic font-light text-primary">ecosistema.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-20">
            Ogni brand risolve un problema specifico. Insieme, creano un vantaggio competitivo impossibile da replicare.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Project Cards with images */}
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {projects.map((p, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
              <TiltCard className="h-full rounded-lg" glowColor={p.color}>
                <Link to={`/progetti/${p.slug}`} className="group relative rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all block h-full overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${p.color}20 0%, ${p.color}60 100%)` }} />
                    <motion.span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full border border-white/20 text-white/80 bg-black/30 backdrop-blur-sm" initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05 }}>{p.tag}</motion.span>
                  </div>
                  <div className="p-8">
                    <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-lg" style={{ background: p.color }} />
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: p.color }} whileHover={{ rotate: 15, scale: 1.2 }}>{p.icon}</motion.div>
                      <h3 className="text-[18px] font-semibold group-hover:text-primary transition-colors" style={{ color: p.color }}>{p.name}</h3>
                    </div>
                    <p className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7] mb-4">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-[12px] font-semibold uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                      Scopri <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How the Ecosystem Works */}
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Come Funziona</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            L'ecosistema in <span className="italic font-light text-primary">azione.</span>
          </h2>
        </FadeIn>
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting arrows */}
          <div className="hidden md:block absolute top-1/2 left-[33%] right-[33%] -translate-y-1/2 z-0">
            <div className="flex items-center justify-between px-8">
              <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-primary/20" />
              <ArrowRight size={16} className="text-primary mx-2" />
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-primary/50" />
              <ArrowRight size={16} className="text-primary mx-2" />
            </div>
          </div>
          {ecosystemFlow.map((step, i) => (
            <FadeIn key={i} delay={0.15 * i}>
              <div className="relative text-center p-10 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="font-display text-[20px] font-semibold mb-3">{step.title}</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Ecosystem Stats */}
    <section className="py-20 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">L'Ecosistema in Numeri</span>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ecosystemStats.map((s, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                <motion.div className="font-mono text-[40px] font-bold text-primary leading-none mb-2" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
                  {s.value}
                </motion.div>
                <div className="text-[13px] text-[rgba(255,255,255,0.6)] font-light">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Vuoi vedere l'ecosistema <span className="italic font-light text-primary">in azione?</span>
          </h2>
          <p className="text-[17px] text-[rgba(255,255,255,0.65)] font-light mb-10">Prenota una demo gratuita e scopri come le nostre piattaforme possono trasformare la tua azienda.</p>
          <Link to="/contatti" className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden">
            Richiedi una Demo <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
    </Layout>
  </>
);

export default Progetti;
