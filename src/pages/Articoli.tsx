import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
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

const categories = ["Tutti", "AI", "PMI", "Automazione", "Marketing", "Strategia"];

const articles = [
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <FadeIn key={article.slug} delay={0.08 * i}>
                <Link
                  to={`/articoli/${article.slug}`}
                  className="group block h-full rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] overflow-hidden hover:bg-[rgba(255,255,255,0.06)] transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full border border-primary/30 text-primary">{article.category}</span>
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articoli;
