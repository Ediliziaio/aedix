import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Shield, Users, Zap, Target, Brain, TrendingUp, Heart } from "lucide-react";
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

const milestones = [
  { year: "2016", title: "La nascita", desc: "Fondiamo la prima impresa edile. Scopriamo sulla nostra pelle i problemi delle PMI italiane." },
  { year: "2018", title: "Il primo software", desc: "Costruiamo il primo gestionale interno. Non esiste nulla di adatto al nostro settore." },
  { year: "2020", title: "Edilizia in Cloud", desc: "Lanciamo la prima piattaforma SaaS verticale per l'edilizia. Inizia l'ecosistema." },
  { year: "2022", title: "L'espansione", desc: "5 piattaforme attive, primi clienti esterni. Il modello funziona e si replica." },
  { year: "2024", title: "L'era AI", desc: "Integriamo agenti AI operativi nelle nostre piattaforme. 11 agenti attivi 24/7." },
  { year: "2026", title: "Oggi", desc: "7 piattaforme, 44 workflow automatizzati, un ecosistema completo per le PMI italiane." },
];

const values = [
  { icon: <Target size={28} />, title: "Risultati, non promesse", desc: "Ogni euro che spendi con noi ha un ROI misurabile. Se non funziona, non ci paghi." },
  { icon: <Shield size={28} />, title: "Testato su noi stessi", desc: "Ogni piattaforma viene prima usata internamente sulle nostre aziende. Se non funziona per noi, non esiste per te." },
  { icon: <Users size={28} />, title: "Costruito per le PMI", desc: "Non siamo una big tech che si adatta verso il basso. Siamo nati dalle PMI, per le PMI." },
  { icon: <Heart size={28} />, title: "Partner, non fornitore", desc: "Il nostro fatturato dipende dal tuo. Lavoriamo a performance perché crediamo nel nostro lavoro." },
];

const team = [
  { name: "Founder & CEO", role: "Strategia, Visione, Business Development", initials: "FD" },
  { name: "CTO", role: "Architettura, AI, Sviluppo piattaforme", initials: "CT" },
  { name: "Head of Marketing", role: "Performance marketing, Growth, Vendite", initials: "HM" },
  { name: "Head of Operations", role: "Processi, Automazione, Customer Success", initials: "HO" },
];

const PercheNoi = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-[140px] pb-20 px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
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
                  <motion.div
                    className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mb-4 bg-background relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i, duration: 0.5 }}
                  >
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

        <div className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.04)]">
          {values.map((v, i) => (
            <FadeIn key={i} delay={0.08 * i}>
              <div className="group relative bg-background p-14 hover:bg-[rgba(255,255,255,0.02)] transition-all">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="text-primary mb-6">{v.icon}</div>
                <h3 className="font-display text-[22px] font-semibold mb-4">{v.title}</h3>
                <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.7)] font-light">{v.desc}</p>
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
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')" }} />
      <div className="absolute inset-0 bg-background/[0.88]" />
      <div className="relative max-w-[900px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-display font-bold leading-[1.06] tracking-[-2px]" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            "Costruiamo tecnologia per imprenditori che non hanno tempo di studiare la tecnologia.{" "}
            <span className="italic font-light text-primary">Funziona, o non esiste."</span>
          </h2>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default PercheNoi;
