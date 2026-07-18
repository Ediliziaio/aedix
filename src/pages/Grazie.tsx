import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Clock, MessageSquare, CalendarCheck, ArrowRight, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const steps = [
  { icon: <MessageSquare size={22} />, title: "Leggiamo la tua richiesta", text: "Una persona del team — non un autorisponditore — analizza quello che ci hai scritto." },
  { icon: <Clock size={22} />, title: "Ti ricontattiamo entro 24 ore", text: "Via email o telefono, nei giorni lavorativi. Se hai lasciato il numero, preferiamo chiamarti." },
  { icon: <CalendarCheck size={22} />, title: "Fissiamo una call conoscitiva", text: "30 minuti per capire il tuo caso: processi, priorità e se un sistema AI ibrido ha senso per te." },
];

const Grazie = () => {
  // Evento per GTM: conversione lead tracciabile sia come pageview /grazie
  // sia come evento custom 'lead_form_submitted'
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "lead_form_submitted" });
  }, []);

  return (
    <>
      <SEO
        title="Richiesta ricevuta — AEDIX"
        description="Abbiamo ricevuto la tua richiesta. Ti ricontattiamo entro 24 ore lavorative."
        path="/grazie"
        noIndex
      />
      <Layout>
        <section className="relative min-h-[85vh] flex flex-col justify-center pt-[112px] sm:pt-[140px] pb-24 px-6 lg:px-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 20%, rgba(246,190,9,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)",
            }}
          />
          <div className="relative max-w-[860px] mx-auto w-full text-center">
            <FadeIn>
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
              >
                <CheckCircle2 size={40} className="text-emerald-400" />
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(34px, 5vw, 60px)" }}>
                Richiesta ricevuta.<br />
                <span className="italic font-light text-primary">Ora tocca a noi.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[560px] mx-auto font-light leading-[1.8] mb-14">
                Grazie per averci scritto. La tua richiesta è già nella coda del team — ecco esattamente cosa succede adesso.
              </p>
            </FadeIn>

            {/* Cosa succede ora */}
            <div className="grid sm:grid-cols-3 gap-4 lg:gap-5 mb-14 text-left">
              {steps.map((s, i) => (
                <FadeIn key={i} delay={0.2 + 0.1 * i}>
                  <div className="relative rounded-xl glass-card p-6 lg:p-7 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                        {s.icon}
                      </div>
                      <span className="font-mono text-[12px] font-bold text-primary">0{i + 1}</span>
                    </div>
                    <h2 className="font-display text-[16px] font-semibold mb-2">{s.title}</h2>
                    <p className="text-[13.5px] text-[rgba(255,255,255,0.6)] font-light leading-[1.75]">{s.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Urgenza? Contatto diretto */}
            <FadeIn delay={0.5}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-8 py-5 mb-14">
                <span className="text-[13px] text-[rgba(255,255,255,0.5)] font-light">Hai fretta? Saltaci la coda:</span>
                <a href="tel:+393483467567" className="flex items-center gap-2 text-[14px] text-white hover:text-primary transition-colors">
                  <Phone size={15} className="text-primary" /> +39 348 346 7567
                </a>
                <a href="mailto:info@aedix.it" className="flex items-center gap-2 text-[14px] text-white hover:text-primary transition-colors">
                  <Mail size={15} className="text-primary" /> info@aedix.it
                </a>
              </div>
            </FadeIn>

            {/* Nel frattempo */}
            <FadeIn delay={0.6}>
              <p className="font-mono text-[11px] uppercase tracking-[4px] text-[rgba(255,255,255,0.35)] mb-6">
                Nel frattempo, se vuoi arrivare preparato
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/articoli/sistema-ai-ibrido-cose-e-come-funziona"
                  className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[12px] uppercase tracking-[2px] px-8 py-4 rounded-lg hover:border-primary/50 hover:text-primary transition-all"
                >
                  Cos'è un sistema AI ibrido <ArrowRight size={14} />
                </Link>
                <Link
                  to="/metodo"
                  className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.15)] text-white font-bold text-[12px] uppercase tracking-[2px] px-8 py-4 rounded-lg hover:border-primary/50 hover:text-primary transition-all"
                >
                  Il nostro metodo <ArrowRight size={14} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[2px] text-[rgba(255,255,255,0.45)] hover:text-white px-4 py-4 transition-colors"
                >
                  Torna alla home
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Grazie;
