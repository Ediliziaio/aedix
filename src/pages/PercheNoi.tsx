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
  { year: "2022", title: "L'espansione", desc: "Primi clienti esterni. Il modello funziona — e inizia a replicarsi." },
  { year: "2024", title: "L'era AI", desc: "Integriamo agenti AI nelle nostre piattaforme. Automazione intelligente per le PMI italiane." },
  { year: "2026", title: "Oggi", desc: "4 piattaforme attive, un ecosistema completo per le PMI italiane. E non ci fermiamo qui." },
];

const values = [
  { icon: <Target size={28} />, title: "Risultati, non promesse", desc: "Ogni euro che spendi con noi ha un ROI misurabile. Monitoriamo tutto in tempo reale." },
  { icon: <Shield size={28} />, title: "Testato su noi stessi", desc: "Ogni piattaforma viene prima usata internamente sulle nostre aziende. Se non funziona per noi, non esiste per te." },
  { icon: <Users size={28} />, title: "Costruito per le PMI", desc: "Non siamo una big tech che si adatta verso il basso. Siamo nati dalle PMI, per le PMI." },
  { icon: <Heart size={28} />, title: "Partner, non fornitore", desc: "Il nostro successo dipende dal tuo. Lavoriamo fianco a fianco per raggiungere i tuoi obiettivi." },
];

const stats = [
  { value: "2016", label: "Anno della prima impresa fondata" },
  { value: "19k+", label: "Imprese edili nel database proprietario" },
  { value: "4", label: "Piattaforme attive" },
  { value: "EU", label: "Infrastruttura dati europea" },
];

const sectors = [
  { icon: <Building size={24} />, name: "Edilizia" },
  { icon: <Wrench size={24} />, name: "Impiantistica" },
  { icon: <ShoppingBag size={24} />, name: "Retail" },
  { icon: <Utensils size={24} />, name: "Ristorazione" },
];

const teamAreas = [
  { area: "Prodotto & AI", desc: "Architettura delle piattaforme, agenti AI, integrazione con i sistemi aziendali." },
  { area: "Operations & Customer Success", desc: "Onboarding, formazione, supporto continuo alle imprese clienti." },
  { area: "Marketing & Vendite", desc: "Performance marketing, crescita e sviluppo commerciale." },
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
      title="Chi Siamo — AEDIX | Da Impresa Edile a Tech Company"
      description="AEDIX nasce nel 2016 da un'impresa edile reale. Oggi progetta sistemi AI ibridi per le aziende italiane: storia, valori e persone dietro la tecnologia."
      path="/perche-noi"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Chi Siamo", url: "/perche-noi" },
      ]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Chi Siamo — AEDIX",
          url: "https://www.aedix.it/perche-noi",
          inLanguage: "it-IT",
          description:
            "La storia di AEDIX: fondata da imprenditori del settore edile, oggi progetta sistemi AI ibridi per le aziende italiane. Ogni piattaforma viene testata internamente prima di arrivare ai clienti.",
          mainEntity: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Florin Andriciuc",
          jobTitle: "Founder & CEO",
          worksFor: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
          url: "https://www.aedix.it/perche-noi",
          knowsAbout: ["Intelligenza artificiale per aziende", "Sistemi AI ibridi", "Digitalizzazione settore edile", "SaaS verticale"],
          sameAs: ["https://www.linkedin.com/company/aedix"],
        },
      ]}
    />
    <Layout>
    {/* Hero — split layout */}
    <section className="pt-[112px] sm:pt-[140px] pb-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Chi Siamo</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Non siamo una software house.<br />
              <span className="italic font-light text-primary">Siamo imprenditori come te.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[600px] font-light mb-8">
              Abbiamo costruito, gestito e fatto crescere imprese reali. Per questo i nostri sistemi AI ibridi — software, agenti AI e persone insieme — nascono da problemi che abbiamo vissuto in prima persona e risolto. Testati su di noi prima che su di te.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <TiltCard className="rounded-lg" tiltAmount={6}>
            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
              <motion.img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                alt="Ecosistema AEDIX di AI per PMI italiane — software, agenti, automazioni"
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
    <section className="py-20 sm:py-28 px-6 lg:px-12">
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
    <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
      <div className="max-w-[1320px] mx-auto">
        <FadeIn>
          <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il Team</span>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Le persone dietro la <span className="italic font-light text-primary">tecnologia.</span>
          </h2>
        </FadeIn>

        {/* Founder spotlight */}
        <FadeIn delay={0.1}>
          <div className="rounded-xl glass-card p-8 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
              <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center bg-primary/[0.08] shrink-0">
                <span className="font-mono text-[26px] font-bold text-primary">FA</span>
              </div>
              <div>
                <h3 className="font-display text-[24px] font-bold mb-1">Florin Andriciuc</h3>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary mb-5">Founder & CEO</p>
                <p className="text-[16px] text-[rgba(255,255,255,0.7)] font-light leading-[1.85] max-w-[720px]">
                  Imprenditore edile prima che fondatore tech. Nel 2016 fonda la sua prima impresa nel settore
                  costruzioni e si scontra con un problema che nessun software risolveva: gestire un'azienda edile
                  italiana con strumenti pensati per tutt'altro. Nel 2020 quel problema diventa Edilizia in Cloud,
                  e nel 2024 AEDIX — la tech company che progetta sistemi AI ibridi per le aziende italiane.
                  Il principio non è mai cambiato: ogni soluzione viene usata prima sulle nostre imprese,
                  poi proposta ai clienti.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Team areas */}
        <div className="grid md:grid-cols-3 gap-5">
          {teamAreas.map((t, i) => (
            <FadeIn key={i} delay={0.08 * i}>
              <div className="p-7 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] h-full">
                <h3 className="font-display text-[17px] font-semibold mb-3">{t.area}</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7]">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Manifesto */}
    <section className="relative py-28 sm:py-40 lg:py-48 px-6 lg:px-12 overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
        alt="Ufficio AEDIX — tech company italiana per PMI"
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
    <section className="py-20 sm:py-28 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Vuoi capire se un sistema ibrido<br />
            <span className="italic font-light text-primary">ha senso per la tua azienda?</span>
          </h2>
          <p className="text-[17px] text-[rgba(255,255,255,0.65)] font-light mb-10">
            45 minuti sul tuo caso specifico. Oppure parti dal <Link to="/metodo" className="text-primary hover:underline">metodo</Link> o
            dalla pagina <Link to="/sicurezza" className="text-primary hover:underline">sicurezza e conformità</Link>.
          </p>
          <Link
            to="/contatti"
            className="shimmer-btn inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden"
          >
            Prenota una demo <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
    </Layout>
  </>
);

export default PercheNoi;
