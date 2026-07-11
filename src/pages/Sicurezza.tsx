import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShieldCheck, Database, Eye, FileCheck, Lock, Scale, UserCheck, Server } from "lucide-react";
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

const pillars = [
  {
    icon: <Database size={26} />,
    title: "I tuoi dati restano tuoi",
    points: [
      "Nessun dato aziendale viene usato per addestrare modelli AI di terze parti",
      "Server e infrastruttura in Unione Europea",
      "Esportazione completa dei dati in formato standard, in qualsiasi momento",
      "Cancellazione garantita alla chiusura del contratto",
    ],
  },
  {
    icon: <UserCheck size={26} />,
    title: "Supervisione umana by design",
    points: [
      "Ogni azione critica (invii, prezzi, impegni contrattuali) richiede approvazione umana",
      "Log completo di ogni interazione AI: chi, cosa, quando",
      "Possibilità di intervento e correzione in ogni punto del flusso",
      "Escalation automatica a un operatore nei casi ambigui",
    ],
  },
  {
    icon: <Scale size={26} />,
    title: "Conformità AI Act",
    points: [
      "Classificazione del rischio documentata per ogni sistema che implementiamo",
      "Trasparenza verso gli utenti: l'AI si dichiara sempre come tale",
      "Registro dei sistemi AI pronto per audit e clienti enterprise",
      "Documentazione di conformità fornita, non promessa",
    ],
  },
  {
    icon: <Lock size={26} />,
    title: "GDPR operativo",
    points: [
      "Base giuridica definita per ogni trattamento con AI",
      "DPA (Data Processing Agreement) con ogni fornitore della filiera",
      "Supporto alla DPIA per i trattamenti ad alto rischio",
      "Informative privacy aggiornate per l'uso di sistemi AI",
    ],
  },
];

const practices = [
  { icon: <Server size={20} />, label: "Infrastruttura EU", text: "Dati ospitati su data center europei, cifrati at-rest e in-transit." },
  { icon: <Eye size={20} />, label: "Auditabilità", text: "Ogni decisione AI è tracciata e ricostruibile — per te e per un eventuale auditor." },
  { icon: <FileCheck size={20} />, label: "Documentazione", text: "Contratti, DPA e dichiarazioni di conformità consegnati prima del go-live." },
  { icon: <ShieldCheck size={20} />, label: "Accessi minimi", text: "Ogni componente accede solo ai dati necessari alla sua funzione. Nessun accesso superfluo." },
];

const faqs = [
  {
    q: "I nostri dati vengono usati per addestrare i modelli AI?",
    a: "No. I dati della tua azienda alimentano esclusivamente il tuo sistema — knowledge base, contesto delle risposte, automazioni. Non vengono usati per addestrare modelli di terze parti, né condivisi tra clienti.",
  },
  {
    q: "Dove vengono elaborati i dati?",
    a: "Su infrastruttura in Unione Europea. Quando un caso d'uso richiede modelli con elaborazione extra-UE, lo dichiariamo esplicitamente in fase di progettazione e adottiamo le garanzie previste dal GDPR (SCC, valutazioni di trasferimento).",
  },
  {
    q: "Chi è responsabile se l'AI sbaglia?",
    a: "Il sistema è progettato perché l'errore non arrivi al cliente: le azioni critiche passano da approvazione umana e ogni interazione è tracciata. Contrattualmente, ruoli e responsabilità (titolare/responsabile del trattamento, deployer AI Act) sono definiti nero su bianco, non lasciati all'interpretazione.",
  },
  {
    q: "Cosa succede ai dati se interrompiamo il contratto?",
    a: "Ricevi l'esportazione completa dei tuoi dati in formato standard e i dati vengono cancellati dai nostri sistemi entro i termini contrattuali. Nessun lock-in: è un impegno contrattuale, non una promessa commerciale.",
  },
  {
    q: "Siete conformi all'AI Act?",
    a: "Ogni sistema che implementiamo viene classificato per livello di rischio secondo il Regolamento UE 2024/1689, con gli obblighi di trasparenza e supervisione umana applicati by design. Forniamo la documentazione necessaria per il tuo registro dei sistemi AI — quella che i tuoi clienti enterprise ti chiederanno.",
  },
];

const Sicurezza = () => {
  return (
    <>
      <SEO
        title="Sicurezza e Conformità — Dati, GDPR e AI Act | AEDIX"
        description="Come AEDIX protegge i dati aziendali: infrastruttura EU, nessun training su dati dei clienti, supervisione umana, conformità GDPR e AI Act documentata."
        path="/sicurezza"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Sicurezza", url: "/sicurezza" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sicurezza e Conformità AEDIX",
            url: "https://www.aedix.it/sicurezza",
            inLanguage: "it-IT",
            description: "Sicurezza dei dati, conformità GDPR e AI Act nei sistemi AI ibridi AEDIX.",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-[140px] pb-16 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Sicurezza & Conformità</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                L'AI in azienda si giudica<br />
                <span className="italic font-light text-primary">da come tratta i dati.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[640px] font-light leading-[1.8]">
                Prima di mettere l'AI a contatto con clienti, preventivi e documenti, devi sapere dove vanno i dati,
                chi può accedervi e chi risponde se qualcosa va storto. Questa pagina risponde a queste domande —
                le stesse che farebbe il tuo legale.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-5 lg:gap-6">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <div className="rounded-xl glass-card p-8 lg:p-9 h-full">
                  <div className="text-primary mb-5">{p.icon}</div>
                  <h2 className="font-display text-[21px] font-semibold mb-5">{p.title}</h2>
                  <ul className="space-y-3">
                    {p.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-3 text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.65]">
                        <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Practices strip */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practices.map((pr, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] h-full">
                  <div className="text-primary mb-3">{pr.icon}</div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-white mb-2">{pr.label}</p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.55)] font-light leading-[1.7]">{pr.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-12" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                Le domande che ci fanno i legali.
              </h2>
            </FadeIn>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="p-7 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
                    <h3 className="font-display text-[17px] font-semibold mb-3 text-white">{f.q}</h3>
                    <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8]">{f.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 text-center">
          <div className="max-w-[720px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold leading-[1.1] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                Serve la documentazione per il tuo legale?
              </h2>
              <p className="text-[16px] text-[rgba(255,255,255,0.6)] font-light mb-10">
                DPA, classificazione AI Act, dettagli sull'infrastruttura: te li forniamo prima della firma, non dopo.
              </p>
              <Link
                to="/contatti"
                className="shimmer-btn glow-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] rounded-lg relative overflow-hidden"
              >
                Richiedi la documentazione <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Sicurezza;
