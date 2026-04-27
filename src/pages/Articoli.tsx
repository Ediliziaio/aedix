import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
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

const categories = ["Tutti", "AI", "PMI", "Automazione", "Marketing", "Strategia"];

const articles = [
  {
    slug: "come-scegliere-fornitore-ai-pmi-italiana",
    title: "Come scegliere un fornitore AI per la tua PMI: 7 domande chiave",
    excerpt: "Stai valutando un fornitore di AI per la tua PMI italiana? Ecco le 7 domande che ti salvano da contratti pessimi e progetti falliti.",
    category: "Strategia",
    date: "29 Apr 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ai-act-2026-pmi-italiane-cosa-cambia",
    title: "AI Act 2026: cosa cambia per le PMI italiane (e come prepararsi)",
    excerpt: "L'AI Act è in vigore. Cosa devono fare le PMI italiane per adeguarsi senza spendere migliaia di euro in consulenza. Guida pratica.",
    category: "Strategia",
    date: "28 Apr 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "quanto-costa-ai-pmi-italiana-guida-2026",
    title: "Quanto costa l'AI per una PMI italiana? Guida prezzi 2026",
    excerpt: "Da €200 a €5.000 al mese: i prezzi reali dell'AI per le PMI italiane nel 2026. Cosa include ogni fascia, e quale ROI aspettarsi.",
    category: "Strategia",
    date: "27 Apr 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "perche-le-pmi-italiane-hanno-paura-dellai",
    title: "Perché le PMI Italiane Hanno Paura dell'AI (e Come Superarla)",
    excerpt: "Il 73% delle PMI italiane considera l'AI una priorità. Solo il 18% l'ha adottata. Il gap non è tecnologico — è psicologico. Smontiamo i 5 blocchi mentali più comuni con dati e risposte concrete.",
    category: "AI",
    date: "29 Mar 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "5-processi-pmi-italiana-automatizzare-oggi",
    title: "5 Processi che Ogni PMI Italiana Può Automatizzare Oggi con l'AI",
    excerpt: "Il 60% delle attività nelle PMI è automatizzabile oggi — non tra 5 anni. Dalla risposta clienti alla fatturazione: ecco i 5 processi da attivare subito, con esempi reali e ROI medio 3.8x.",
    category: "Automazione",
    date: "29 Mar 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "agenti-ai-per-pmi-cosa-sono-e-come-usarli",
    title: "Agenti AI per PMI: Cosa Sono e Come Usarli nella Tua Azienda",
    excerpt: "Non sono chatbot. Gli agenti AI ragionano, prendono decisioni e agiscono. Consulenza, retail, immobiliare, manifatturiero: i casi reali che dimostrano come funzionano nelle PMI italiane.",
    category: "AI",
    date: "29 Mar 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ai-pmi-italiane-2025",
    title: "Come l'AI sta trasformando le PMI italiane nel 2025",
    excerpt: "Il 75% delle aziende adotterà l'intelligenza artificiale entro il 2027. Le PMI italiane che si muovono ora avranno un vantaggio competitivo impossibile da colmare.",
    category: "AI",
    date: "15 Mar 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "automazione-processi-aziendali",
    title: "Automazione dei processi: da 8 ore a 8 minuti",
    excerpt: "44 workflow automatizzati, zero errori umani. Come abbiamo ridotto del 93% il tempo di gestione amministrativa nelle imprese edili.",
    category: "Automazione",
    date: "8 Mar 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "marketing-performance-edilizia",
    title: "Marketing a performance: perché il canone fisso è morto",
    excerpt: "Le agenzie tradizionali ti chiedono €3.000/mese senza garanzie. Noi lavoriamo a commissione sulle vendite chiuse. Ecco perché funziona meglio.",
    category: "Marketing",
    date: "1 Mar 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "agenti-ai-vs-chatbot",
    title: "Agenti AI operativi vs Chatbot: la differenza che conta",
    excerpt: "Un chatbot risponde a domande. Un agente AI qualifica lead, prenota appuntamenti, genera preventivi e chiude vendite. Non sono la stessa cosa.",
    category: "AI",
    date: "22 Feb 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "errori-pmi-digitale",
    title: "I 5 errori che le PMI fanno nella trasformazione digitale",
    excerpt: "Comprare software sbagliato, non formare il team, aspettare troppo. Ecco gli errori che vediamo ogni giorno — e come evitarli.",
    category: "PMI",
    date: "15 Feb 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "roi-intelligenza-artificiale",
    title: "ROI dell'AI: numeri reali, non promesse",
    excerpt: "300% di ROI medio per le aziende che adottano AI (Accenture). Ma come si traduce per una PMI italiana da 10-50 dipendenti? I nostri dati interni.",
    category: "Strategia",
    date: "8 Feb 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "saas-verticale-vs-generico",
    title: "Software verticale vs generico: perché la specializzazione vince",
    excerpt: "Un gestionale generico fa tutto male. Un SaaS verticale fa una cosa perfettamente. Ecco perché abbiamo costruito 7 piattaforme specializzate.",
    category: "PMI",
    date: "1 Feb 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "futuro-lavoro-ai-automazione",
    title: "Il futuro del lavoro: AI e automazione non rubano posti, li creano",
    excerpt: "97 milioni di nuovi posti di lavoro creati dall'AI entro il 2025 (WEF). Ma servono competenze nuove. Come prepararsi al cambiamento.",
    category: "AI",
    date: "25 Gen 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
];

const Articoli = () => {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const filtered = activeCategory === "Tutti" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      <SEO
        title="Blog AEDIX — Insight su AI e PMI Italiane"
        description="Guide pratiche, dati reali e strategie su AI, automazione e crescita per PMI italiane. Aggiornato settimanalmente."
        path="/articoli"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog AEDIX",
          url: "https://www.aedix.it/articoli",
          inLanguage: "it-IT",
          publisher: { "@type": "Organization", name: "AEDIX", url: "https://www.aedix.it" },
        }}
      />
      <Layout>
      <section className="pt-[140px] pb-20 px-6 lg:px-12 min-h-screen">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Blog & Risorse</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Insight per chi vuole<br />
              <span className="italic font-light text-primary">crescere davvero.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[580px] font-light mb-12">
              Guide pratiche, dati reali e strategie concrete su AI, automazione e crescita per PMI italiane.
            </p>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-[11px] uppercase tracking-[2px] px-5 py-2.5 rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.55)] hover:border-primary/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Articles Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {filtered.map((article) => (
              <motion.div key={article.slug} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                <TiltCard className="h-full rounded-lg">
                  <Link
                    to={`/articoli/${article.slug}`}
                    className="group block h-full rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] overflow-hidden hover:bg-[rgba(255,255,255,0.06)] transition-all"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.span className="font-mono text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full border border-primary/30 text-primary" whileHover={{ scale: 1.05 }}>{article.category}</motion.span>
                        <span className="flex items-center gap-1 text-[12px] text-[rgba(255,255,255,0.45)]">
                          <Clock size={12} /> {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-[18px] font-semibold leading-[1.3] mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-light leading-[1.7] mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[rgba(255,255,255,0.4)]">{article.date}</span>
                        <span className="inline-flex items-center gap-1 text-primary text-[12px] font-semibold uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                          Leggi <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default Articoli;
