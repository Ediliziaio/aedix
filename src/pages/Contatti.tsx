import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send, Building2, Clock, MessageCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", email: "", telefono: "", settore: "", messaggio: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.messaggio.trim()) {
      toast({ title: "Compila i campi obbligatori", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Email non valida", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Messaggio inviato!", description: "Ti ricontatteremo entro 24 ore." });
      setForm({ nome: "", email: "", telefono: "", settore: "", messaggio: "" });
    }, 1500);
  };

  return (
    <Layout>
      {/* Social Proof Banner */}
      <section className="pt-[140px] pb-4 px-6 lg:px-12">
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
              Compila il form e ti ricontatteremo entro 24 ore. Nessun impegno, nessun costo — solo una conversazione per capire come possiamo aiutarti.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-5 gap-16">
            <FadeIn delay={0.2} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.55)] block mb-2">Nome *</label>
                    <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-4 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-primary/40 focus:outline-none transition-colors" placeholder="Mario Rossi" maxLength={100} />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.55)] block mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-4 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-primary/40 focus:outline-none transition-colors" placeholder="mario@azienda.it" maxLength={255} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.55)] block mb-2">Telefono</label>
                    <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-4 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-primary/40 focus:outline-none transition-colors" placeholder="+39 333 1234567" maxLength={20} />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.55)] block mb-2">Settore</label>
                    <select value={form.settore} onChange={(e) => setForm({ ...form, settore: e.target.value })} className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-4 text-[15px] text-white focus:border-primary/40 focus:outline-none transition-colors appearance-none">
                      <option value="" className="bg-background">Seleziona...</option>
                      <option value="edilizia" className="bg-background">Edilizia</option>
                      <option value="serramenti" className="bg-background">Serramenti</option>
                      <option value="impiantistica" className="bg-background">Impiantistica</option>
                      <option value="servizi" className="bg-background">Servizi</option>
                      <option value="retail" className="bg-background">Retail</option>
                      <option value="ristorazione" className="bg-background">Ristorazione</option>
                      <option value="altro" className="bg-background">Altro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[3px] text-[rgba(255,255,255,0.55)] block mb-2">Messaggio *</label>
                  <textarea value={form.messaggio} onChange={(e) => setForm({ ...form, messaggio: e.target.value })} rows={5} className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-4 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-primary/40 focus:outline-none transition-colors resize-none" placeholder="Raccontaci la tua esigenza..." maxLength={1000} />
                </div>
                <button type="submit" disabled={sending} className="shimmer-btn bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,190,9,0.25)] transition-all relative overflow-hidden disabled:opacity-50 flex items-center gap-3">
                  <Send size={16} />
                  {sending ? "Invio in corso..." : "Invia Messaggio"}
                </button>
              </form>
            </FadeIn>

            <FadeIn delay={0.3} className="lg:col-span-2">
              <div className="space-y-8">
                <div className="p-8 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]">
                  <h3 className="font-display text-[20px] font-semibold mb-6">Informazioni</h3>
                  <div className="space-y-5">
                    {[
                      { icon: <Mail size={18} />, label: "Email", value: "info@aedix.io" },
                      { icon: <Phone size={18} />, label: "Telefono", value: "+39 XXX XXX XXXX" },
                      { icon: <MapPin size={18} />, label: "Sede", value: "Italia" },
                      { icon: <Building2 size={18} />, label: "Azienda", value: "Domus Group S.r.l." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">{item.icon}</div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.45)] block mb-1">{item.label}</span>
                          <span className="text-[15px] text-[rgba(255,255,255,0.8)]">{item.value}</span>
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
      <section className="py-32 px-6 lg:px-12 bg-alt">
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
  );
};

export default Contatti;
