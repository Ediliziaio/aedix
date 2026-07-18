import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send, Building2, Clock, MessageCircle, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
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

const faqs = [
  { q: "Quanto costa?", a: "Dipende dal servizio. Le piattaforme SaaS partono da €200/mese. Il marketing ha pacchetti su misura in base ai tuoi obiettivi. Contattaci per un preventivo personalizzato — è gratuito." },
  { q: "Quanto ci vuole per partire?", a: "Le piattaforme SaaS si configurano in 3-5 giorni. Gli agenti AI sono operativi in 7-14 giorni. Le campagne marketing partono entro 2 settimane dall'onboarding." },
  { q: "Siete affidabili?", a: "Usiamo le stesse piattaforme sulle nostre imprese. Se non funzionassero, noi per primi avremmo un problema. Ogni strumento che proponiamo è testato internamente prima ancora di diventare un prodotto." },
  { q: "Funziona anche per il mio settore?", a: "Le nostre piattaforme e agenti AI sono progettati per qualsiasi PMI italiana. Automazione, AI e marketing digitale si applicano a ogni settore. Parliamone." },
  { q: "Posso provare prima di impegnarmi?", a: "Certo. Offriamo demo gratuite per tutte le piattaforme e periodi di test. Se non vedi risultati, puoi interrompere quando vuoi." },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.06 * index}>
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
          <span className="text-[16px] font-medium text-[rgba(255,255,255,0.9)] group-hover:text-primary transition-colors pr-4">{faq.q}</span>
          <ChevronDown size={20} className={`text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light leading-[1.8] pb-6">{faq.a}</p>
        </motion.div>
      </div>
    </FadeIn>
  );
};

const Contatti = () => {
  // FAQ schema for Google rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Contatti AEDIX — Progetta il tuo sistema AI ibrido"
        description="Compila il form e ti ricontattiamo entro 24 ore. Capiamo insieme quale sistema AI ibrido serve alla tua azienda. Nessun impegno, nessun costo."
        path="/contatti"
        jsonLd={faqSchema}
      />
      <Layout>
      {/* Social Proof Banner */}
      <section className="pt-[112px] sm:pt-[140px] pb-4 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: <Clock size={16} />, text: "Rispondiamo entro 4 ore in media" },
                { icon: <MessageCircle size={16} />, text: "Parli con una persona reale" },
                { icon: <Send size={16} />, text: "Zero impegno, zero costo" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.6)]">
                  <span className="text-primary">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Contatti</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold leading-[1.08] tracking-[-2px] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Parliamo del tuo<br />
              <span className="italic font-light text-primary">prossimo passo.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-[18px] text-[rgba(255,255,255,0.7)] max-w-[560px] font-light mb-20">
              Compila il form e ti ricontatteremo entro 24 ore. Nessun impegno, nessun costo — solo una conversazione per capire quale sistema AI ibrido può fare la differenza nella tua azienda.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-5 gap-16">
            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-white">
                <iframe
                  src="https://app.ediliziaincloud.com/f?slug=aedix&company_id=00000000-0000-0000-0000-000000000001"
                  width="100%"
                  height={640}
                  style={{ border: 0, maxWidth: 640, margin: "0 auto", display: "block" }}
                  loading="lazy"
                  title="Richiedi informazioni"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="lg:col-span-2">
              <div className="space-y-8">
                <div className="p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <h3 className="font-display text-[20px] font-semibold mb-6">Informazioni</h3>
                  <div className="space-y-5">
                    {[
                      { icon: <Mail size={18} />, label: "Email", value: "info@aedix.it", href: "mailto:info@aedix.it" },
                      { icon: <Phone size={18} />, label: "Telefono", value: "+39 348 346 7567", href: "tel:+393483467567" },
                      { icon: <MapPin size={18} />, label: "Sede legale", value: "Via Aurelio Saffi 29, 20123 Milano" },
                      { icon: <Building2 size={18} />, label: "Azienda", value: "Domus Group S.r.l." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">{item.icon}</div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.45)] block mb-1">{item.label}</span>
                          {item.href ? (
                            <a href={item.href} className="text-[15px] text-[rgba(255,255,255,0.8)] hover:text-primary transition-colors">{item.value}</a>
                          ) : (
                            <span className="text-[15px] text-[rgba(255,255,255,0.8)]">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-lg border border-primary/20 bg-primary/[0.05]">
                  <h3 className="font-display text-[18px] font-semibold mb-3 text-primary">Risposta garantita</h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.65)] font-light leading-[1.7]">
                    Ti ricontatteremo entro 24 ore lavorative. Nessun chatbot — parlerai con una persona reale del nostro team.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-6 lg:px-12 bg-alt">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6 text-center">Domande Frequenti</span>
            <h2 className="font-display font-bold leading-[1.08] tracking-[-1.5px] mb-16 text-center" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Le risposte che <span className="italic font-light text-primary">cerchi.</span>
            </h2>
          </FadeIn>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>
      </Layout>
    </>
  );
};

export default Contatti;
