import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield, Users, Target, Heart, Building, Utensils, Wrench, ShoppingBag, ArrowRight, Code, Database, BrainCircuit, Server } from "lucide-react";
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

const milestones = [
  { year: "2016", title: "La nascita", desc: "Fondiamo la prima impresa edile. Scopriamo sulla nostra pelle i problemi delle PMI italiane." },
  { year: "2018", title: "Il primo software", desc: "Costruiamo il primo gestionale interno. Non esiste nulla di adatto al nostro settore." },
  { year: "2020", title: "Edilizia in Cloud", desc: "Lanciamo la prima piattaforma SaaS verticale per l'edilizia. Inizia l'ecosistema." },
  { year: "2022", title: "L'espansione", desc: "5 piattaforme attive, primi clienti esterni. Il modello funziona e si replica." },
  { year: "2024", title: "L'era AI", desc: "Integriamo agenti AI operativi nelle nostre piattaforme. 11 agenti attivi 24/7." },
  { year: "2026", title: "Oggi", desc: "7 piattaforme, 44 workflow automatizzati, un ecosistema completo per le PMI italiane." },
];

const values = [
  { icon: <Target size={28} />, title: "Risultati, non promesse", desc: "Ogni euro che spendi con noi ha un ROI misurabile. Monitoriamo tutto in tempo reale." },
  { icon: <Shield size={28} />, title: "Testato su noi stessi", desc: "Ogni piattaforma viene prima usata internamente sulle nostre aziende. Se non funziona per noi, non esiste per te." },
  { icon: <Users size={28} />, title: "Costruito per le PMI", desc: "Non siamo una big tech che si adatta verso il basso. Siamo nati dalle PMI, per le PMI." },
  { icon: <Heart size={28} />, title: "Partner, non fornitore", desc: "Il nostro successo dipende dal tuo. Lavoriamo fianco a fianco per raggiungere i tuoi obiettivi." },
];

const stats = [
  { value: "7", label: "Piattaforme attive" },
  { value: "11", label: "Agenti AI operativi" },
  { value: "44", label: "Workflow automatizzati" },
  { value: "8+", label: "Anni di esperienza" },
];

const sectors = [
  { icon: <Building size={24} />, name: "Edilizia" },
  { icon: <Wrench size={24} />, name: "Impiantistica" },
  { icon: <ShoppingBag size={24} />, name: "Retail" },
  { icon: <Utensils size={24} />, name: "Ristorazione" },
];

const team = [
  { name: "Founder & CEO", role: "Strategia, Visione, Business Development", initials: "FD" },
  { name: "CTO", role: "Architettura, AI, Sviluppo piattaforme", initials: "CT" },
  { name: "Head of Marketing", role: "Performance marketing, Growth, Vendite", initials: "HM" },
  { name: "Head of Operations", role: "Processi, Automazione, Customer Success", initials: "HO" },
];

const technologies = [
  { icon: <BrainCircuit size={28} />, name: "OpenAI", desc: "AI & NLP" },
  { icon: <Database size={28} />, name: "Supabase", desc: "Database & Auth" },
  { icon: <Code size={28} />, name: "React", desc: "Frontend" },
  { icon: <Server size={28} />, name: "AWS", desc: "Cloud Infra" },
];

const PercheNoi = () => (
  <>
    <SEO
      title="Perché Scegliere AEDIX — Storia e Approccio"
      description="Da impresa edile a ecosistema AI per PMI italiane. 7 piattaforme, 11 agenti AI, 19.000 imprese nel network. Scopri il metodo AEDIX."
      path="/perche-noi"
    />
    <Layout>
    {/* Hero — split layout */}
    <section className="pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Perché Noi?</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Non siamo una software house.<br />
              <span className="italic font-light text-primary">Siamo imprenditori come te.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-8">
              Abbiamo costruito, gestito e fatto crescere imprese reali. Ogni piattaforma che sviluppiamo nasce da un problema che abbiamo vissuto in prima persona — e risolto.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <TiltCard className="rounded-lg" tiltAmount={6}>
            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
              <motion.img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                alt="AI Technology"
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/60" />
            </div>
            <div className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }} />
          </TiltCard>
        </FadeIn>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                <motion.div
                  className="font-mono text-[48px] font-bold text-primary leading-none mb-3"
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: [0.3, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.6, times: [0, 0.7, 1] }}
                >
                  {s.value}
                </motion.div>
                <div className="text-[13px] text-[rgba(255,255,255,0.6)] font-light">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">La Nostra Storia</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Dal campo alla <span className="italic font-light text-primary">tecnologia.</span>
          </h2>
        </FadeIn>
        <div className="relative">
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-px bg-primary/20" />
          <div className="grid md:grid-cols-6 gap-8">
            {milestones.map((m, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="relative">
                  <motion.div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mb-4 bg-background relative z-10" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
                    <span className="font-mono text-[14px] font-bold text-primary">{m.year}</span>
                  </motion.div>
                  <h3 className="font-display text-[16px] font-semibold mb-2">{m.title}</h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Valori */}
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">I Nostri Valori</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Quello in cui <span className="italic font-light text-primary">crediamo.</span>
          </h2>
        </FadeIn>
        <motion.div className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.04)]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          {values.map((v, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
              <TiltCard className="h-full" tiltAmount={5}>
                <div className="group relative bg-background p-14 hover:bg-[rgba(255,255,255,0.02)] transition-all h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <motion.div className="text-primary mb-6" whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>{v.icon}</motion.div>
                  <h3 className="font-display text-[22px] font-semibold mb-4">{v.title}</h3>
                  <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.7)] font-light">{v.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Tecnologie */}
    <section className="py-20 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Il Nostro Stack</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Tecnologie che <span className="italic font-light text-primary">usiamo.</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((t, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-primary/20 transition-colors group">
                <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">{t.icon}</div>
                <span className="text-[16px] font-semibold block mb-1">{t.name}</span>
                <span className="text-[12px] text-[rgba(255,255,255,0.5)] font-light">{t.desc}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Settori serviti */}
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Settori Serviti</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Dove facciamo la <span className="italic font-light text-primary">differenza.</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sectors.map((s, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-primary/20 transition-colors">
                <div className="text-primary mb-4 flex justify-center">{s.icon}</div>
                <span className="text-[15px] font-medium">{s.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-32 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il Team</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Le persone dietro la <span className="italic font-light text-primary">tecnologia.</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="group text-center p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 bg-primary/[0.08]">
                  <span className="font-mono text-[20px] font-bold text-primary">{t.initials}</span>
                </div>
                <h3 className="font-display text-[18px] font-semibold mb-2">{t.name}</h3>
                <p className="text-[13px] text-[rgba(255,255,255,0.6)] font-light">{t.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Manifesto */}
    <section className="relative py-48 px-6 lg:px-12 overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
        alt="Office"
        className="absolute inset-0"
        speed={0.3}
        overlay={<div className="absolute inset-0 bg-gradient-to-b from-background/[0.85] via-background/[0.75] to-background/[0.90]" />}
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)" }} />
      <div className="relative max-w-[900px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.06] tracking-[-2px]" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            "Costruiamo tecnologia per imprenditori che non hanno tempo di studiare la tecnologia.{" "}
            <span className="italic font-light text-primary">Funziona, o non esiste."</span>
          </h2>
        </FadeIn>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Pronto a scoprire come possiamo <span className="italic font-light text-primary">aiutarti?</span>
          </h2>
          <p className="text-[17px] text-[rgba(255,255,255,0.65)] font-light mb-10">Nessun impegno. Parliamo del tuo caso specifico.</p>
          <Link
            to="/contatti"
            className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden"
          >
            Contattaci <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
    </Layout>
  </>
);

export default PercheNoi;
