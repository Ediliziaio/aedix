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

const dataFlow = [
  {
    step: "01",
    title: "Il dato entra",
    text: "Una richiesta cliente, un documento, un'email. Il sistema la riceve su canali cifrati (TLS) e la registra nel log: origine, orario, contenuto.",
  },
  {
    step: "02",
    title: "Il software la contestualizza",
    text: "Il gestionale recupera solo i dati necessari — storico cliente, listino, disponibilità — secondo il principio di minimizzazione. Nessun accesso superfluo.",
  },
  {
    step: "03",
    title: "L'AI elabora",
    text: "Il modello genera la risposta o il documento sui dati reali. L'elaborazione avviene su infrastruttura EU; i dati non vengono usati per addestrare modelli di terze parti.",
  },
  {
    step: "04",
    title: "La persona approva",
    text: "Se l'azione è critica — un prezzo, un impegno, un invio — passa dal punto di approvazione umana. Tutto tracciato: chi ha approvato, cosa, quando.",
  },
];

const riskLevels = [
  {
    level: "Rischio inaccettabile",
    what: "Social scoring, manipolazione — vietati dall'AI Act",
    aedix: "Non progettiamo né integriamo sistemi in questa categoria. Mai.",
    color: "#EF4444",
  },
  {
    level: "Rischio alto",
    what: "HR/selezione, credito, accesso a servizi essenziali",
    aedix: "Se un caso d'uso ricade qui, lo diciamo prima e applichiamo gli obblighi completi: risk management, documentazione tecnica, supervisione rafforzata.",
    color: "#F59E0B",
  },
  {
    level: "Rischio limitato",
    what: "Chatbot, agenti conversazionali, contenuti generati",
    aedix: "La categoria tipica dei nostri agenti: trasparenza obbligatoria (l'AI si dichiara), registro dei sistemi, documentazione fornita per il tuo registro interno.",
    color: "#00D4FF",
  },
  {
    level: "Rischio minimo",
    what: "Automazioni interne, classificazione documenti, analisi",
    aedix: "Nessun obbligo specifico oltre ai principi generali — che applichiamo comunque: log, minimizzazione, supervisione.",
    color: "#10B981",
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
    a: "No. I dati della tua azienda alimentano esclusivamente il tuo sistema — knowledge base, contesto delle risposte, automazioni. Non vengono usati per addestrare modelli di terze parti, né condivisi tra clienti. È un impegno contrattuale definito nel DPA, non una dichiarazione commerciale.",
  },
  {
    q: "Dove vengono elaborati i dati aziendali?",
    a: "Su infrastruttura in Unione Europea, cifrata at-rest e in-transit. Quando un caso d'uso richiede modelli con elaborazione extra-UE, lo dichiariamo esplicitamente in fase di progettazione e adottiamo le garanzie previste dal GDPR: clausole contrattuali standard (SCC) e valutazioni di trasferimento documentate.",
  },
  {
    q: "Chi è responsabile se l'AI sbaglia?",
    a: "Il sistema è progettato perché l'errore non arrivi al cliente: le azioni critiche passano da approvazione umana e ogni interazione è tracciata. Contrattualmente, ruoli e responsabilità (titolare/responsabile del trattamento per il GDPR, deployer per l'AI Act) sono definiti nero su bianco, non lasciati all'interpretazione.",
  },
  {
    q: "Cosa succede ai dati se interrompiamo il contratto?",
    a: "Ricevi l'esportazione completa dei tuoi dati in formato standard e i dati vengono cancellati dai nostri sistemi entro i termini contrattuali. Nessun lock-in: è un impegno contrattuale, non una promessa commerciale.",
  },
  {
    q: "I sistemi AEDIX sono conformi all'AI Act?",
    a: "Ogni sistema che implementiamo viene classificato per livello di rischio secondo il Regolamento UE 2024/1689, con gli obblighi di trasparenza e supervisione umana applicati by design. Forniamo la documentazione necessaria per il tuo registro dei sistemi AI — quella che i tuoi clienti enterprise ti chiederanno.",
  },
  {
    q: "Cos'è la supervisione umana by design?",
    a: "È il principio per cui ogni azione critica del sistema AI — inviare un preventivo, confermare un prezzo, assumere un impegno verso un cliente — richiede l'approvazione esplicita di una persona prima di essere eseguita. L'AI prepara, la persona decide. È uno dei requisiti dell'AI Act per i sistemi che interagiscono con le persone, e nei sistemi AEDIX è parte dell'architettura, non un'opzione.",
  },
  {
    q: "Serve la DPIA per usare un sistema AI in azienda?",
    a: "Dipende dal trattamento. La DPIA (valutazione d'impatto sulla protezione dei dati) è obbligatoria per i trattamenti ad alto rischio: profilazione estesa, decisioni automatizzate con effetti significativi, dati particolari su larga scala. Per i casi d'uso tipici — risposta clienti, preventivi, gestione documenti — generalmente non è richiesta, ma va valutato caso per caso. In fase di progettazione facciamo questa valutazione con te e, se serve, supportiamo la stesura della DPIA.",
  },
  {
    q: "Come gestite gli accessi ai dati all'interno del sistema?",
    a: "Con il principio del minimo privilegio: ogni componente del sistema — agente AI, automazione, integrazione — accede solo ai dati strettamente necessari alla sua funzione. Gli accessi sono tracciati nei log e riesaminabili. Un agente che risponde ai clienti non ha accesso ai dati economici interni; un'automazione documentale non legge le conversazioni commerciali.",
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
            description:
              "Sicurezza dei dati e conformità GDPR e AI Act nei sistemi AI ibridi AEDIX: infrastruttura EU, nessun training su dati dei clienti, supervisione umana by design, documentazione fornita prima del go-live.",
            publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
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
              <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[680px] font-light leading-[1.8]">
                Nei sistemi AI ibridi AEDIX la sicurezza segue quattro regole fisse: i dati restano su infrastruttura
                europea e non addestrano modelli di terze parti, ogni azione critica passa da approvazione umana,
                ogni sistema è classificato secondo l'AI Act, e la documentazione GDPR viene consegnata prima del
                go-live — non promessa dopo. Questa pagina risponde alle domande che farebbe il tuo legale.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-14" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Le quattro garanzie.
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {pillars.map((p, i) => (
                <FadeIn key={i} delay={0.06 * i}>
                  <div className="rounded-xl glass-card p-8 lg:p-9 h-full">
                    <div className="text-primary mb-5">{p.icon}</div>
                    <h3 className="font-display text-[21px] font-semibold mb-5">{p.title}</h3>
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
          </div>
        </section>

        {/* Dove vanno i dati — flusso */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Il flusso del dato</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Dove vanno i dati quando l'AI lavora?
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-[16px] text-[rgba(255,255,255,0.6)] max-w-[640px] font-light mb-14">
                La risposta breve: entrano cifrati, vengono elaborati su infrastruttura EU con accessi minimi,
                e ogni passaggio è tracciato nel log. La risposta completa, passo per passo:
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {dataFlow.map((s, i) => (
                <FadeIn key={i} delay={0.06 * i}>
                  <div className="rounded-xl glass-card p-7 h-full flex flex-col">
                    <span className="font-mono text-[13px] font-bold text-primary mb-4">{s.step}</span>
                    <h3 className="font-display text-[18px] font-semibold mb-3">{s.title}</h3>
                    <p className="text-[14px] text-[rgba(255,255,255,0.62)] font-light leading-[1.7]">{s.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* AI Act — livelli di rischio */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">AI Act</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Come classifichiamo i sistemi secondo l'AI Act?
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-[16px] text-[rgba(255,255,255,0.6)] max-w-[680px] font-light mb-14">
                Il Regolamento UE 2024/1689 classifica i sistemi AI in quattro livelli di rischio, con obblighi
                crescenti. Ogni sistema che progettiamo viene classificato in fase di progettazione — e la
                classificazione entra nella documentazione che ricevi.
              </p>
            </FadeIn>
            <div className="space-y-4">
              {riskLevels.map((r, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="rounded-xl glass-card p-7 lg:p-8">
                    <div className="grid lg:grid-cols-[220px_1fr_1.4fr] gap-5 lg:gap-8 items-start">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color }} />
                        <span className="font-display text-[16px] font-semibold">{r.level}</span>
                      </div>
                      <p className="text-[14px] text-[rgba(255,255,255,0.55)] font-light leading-[1.65]">{r.what}</p>
                      <p className="text-[14px] text-[rgba(255,255,255,0.75)] font-light leading-[1.65]">{r.aedix}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
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

        {/* Approfondimenti — internal linking */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <FadeIn>
              <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-8">Approfondimenti</span>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { to: "/articoli/ai-act-grandi-imprese-governance-2026", label: "AI Act per grandi imprese: la governance della compliance", tag: "Enterprise" },
                  { to: "/articoli/gdpr-ai-pmi-italiane-guida-2026", label: "GDPR e AI: la guida pratica per aziende italiane", tag: "Compliance" },
                  { to: "/metodo", label: "Il metodo AEDIX: dall'assessment al ROI misurato", tag: "Metodo" },
                ].map((l, i) => (
                  <Link key={i} to={l.to} className="group p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-primary/30 transition-all">
                    <span className="font-mono text-[9px] uppercase tracking-[2px] text-primary block mb-3">{l.tag}</span>
                    <p className="text-[14px] text-[rgba(255,255,255,0.75)] font-light leading-[1.6] group-hover:text-white transition-colors">{l.label}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-[11px] font-mono uppercase tracking-[1px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Leggi <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
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
