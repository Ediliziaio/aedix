import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Cloud, Shield, Brain, Rocket, Target, ScanFace, Briefcase, ArrowRight } from "lucide-react";
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

const projects = [
  { name: "Edilizia in Cloud", slug: "edilizia-in-cloud", color: "#00D4FF", icon: <Cloud size={32} />, desc: "Il sistema operativo per le imprese edili. Gestionale, cantieri, documenti, team — tutto in una piattaforma.", tag: "SaaS" },
  { name: "Cantiere in Cloud", slug: "cantiere-in-cloud", color: "#FF6B35", icon: <Shield size={32} />, desc: "Sicurezza cantiere e documentazione a norma. Ogni obbligo di legge sotto controllo, in tempo reale.", tag: "Safety" },
  { name: "Edilizia.io", slug: "edilizia-io", color: "#A855F7", icon: <Brain size={32} />, desc: "Agenti AI as a Service. 11 agenti operativi che lavorano per la tua impresa 24 ore su 24.", tag: "AI" },
  { name: "Marketing Edile", slug: "marketing-edile", color: "#10B981", icon: <Rocket size={32} />, desc: "Marketing a performance. Paghi solo sulle vendite chiuse. Zero canone, zero rischio.", tag: "Marketing" },
  { name: "Vendita Edile", slug: "vendita-edile", color: "#F59E0B", icon: <Target size={32} />, desc: "Il metodo di vendita ibrido per imprese tecniche. Chiudi di più, chiudi meglio, chiudi prima.", tag: "Sales" },
  { name: "TalentProfile 360°", slug: "talentprofile-360", color: "#EC4899", icon: <ScanFace size={32} />, desc: "242 domande. 15 tratti comportamentali. Assumi la persona giusta al primo colpo.", tag: "HR" },
  { name: "Impresa Leggera", slug: "impresa-leggera", color: "#6366F1", icon: <Briefcase size={32} />, desc: "Back-office in outsourcing pay-per-use. Fatturazione, buste paga, adempimenti — senza assumere nessuno.", tag: "Operations" },
];

const ecosystemStats = [
  { value: "7", label: "Piattaforme" },
  { value: "44", label: "Workflow automatizzati" },
  { value: "11", label: "Agenti AI attivi" },
  { value: "24/7", label: "Operativi" },
];

const Progetti = () => (
  <Layout>
    <section className="pt-[140px] pb-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I Nostri Progetti</span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Sette piattaforme.<br />
            Un unico <span className="italic font-light text-primary">ecosistema.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-20">
            Ogni brand risolve un problema specifico. Insieme, creano un vantaggio competitivo impossibile da replicare.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={0.08 * i}>
              <Link to={`/progetti/${p.slug}`} className="group relative p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all hover:-translate-y-1 block h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-lg" style={{ background: p.color }} />
                <div className="flex items-center justify-between mb-4">
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: p.color }}>{p.icon}</div>
                  <span className="font-mono text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.45)]">{p.tag}</span>
                </div>
                <h3 className="text-[18px] font-semibold mb-3 group-hover:text-primary transition-colors" style={{ color: p.color }}>{p.name}</h3>
                <p className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7] mb-4">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-[12px] font-semibold uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Scopri <ArrowRight size={14} />
                </span>
              </Link>
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
);

export default Progetti;
