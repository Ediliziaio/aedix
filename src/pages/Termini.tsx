import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const Termini = () => (
  <>
    <SEO
      title="Termini di Servizio — AEDIX"
      description="Termini e condizioni di utilizzo del sito aedix.it e dei servizi AEDIX (Domus Group S.r.l.). Versione vigente."
      path="/termini"
    />
    <Layout>
    <section className="pt-[140px] pb-20 px-6 lg:px-12 min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Legale</span>
        <h1 className="font-display font-bold text-[40px] tracking-[-2px] mb-12">Termini e Condizioni</h1>

        <div className="space-y-8">
          {[
            { title: "1. Premesse", text: "Il presente sito web è di proprietà di Domus Group S.r.l. (\"AEDIX\"). L'accesso e l'utilizzo del sito sono regolati dai presenti termini e condizioni. Utilizzando il sito, l'utente accetta integralmente i presenti termini." },
            { title: "2. Servizi", text: "AEDIX offre piattaforme SaaS, servizi di intelligenza artificiale, marketing a performance e consulenza aziendale per PMI. Le caratteristiche specifiche di ogni servizio sono descritte nelle rispettive pagine del sito e nei contratti individuali." },
            { title: "3. Proprietà intellettuale", text: "Tutti i contenuti presenti sul sito (testi, immagini, loghi, software, design) sono protetti da diritto d'autore e sono di proprietà esclusiva di Domus Group S.r.l. o dei rispettivi titolari. È vietata qualsiasi riproduzione non autorizzata." },
            { title: "4. Limitazione di responsabilità", text: "AEDIX si impegna a mantenere il sito aggiornato e funzionante, ma non garantisce l'assenza di errori o interruzioni. AEDIX non è responsabile per danni diretti o indiretti derivanti dall'uso del sito." },
            { title: "5. Legge applicabile", text: "I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente il Foro di riferimento della sede legale di Domus Group S.r.l." },
            { title: "6. Modifiche", text: "AEDIX si riserva il diritto di modificare i presenti termini in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione sul sito. Ultima modifica: marzo 2026." },
          ].map((s, i) => (
            <div key={i}>
              <h2 className="font-display text-[20px] font-semibold mb-3">{s.title}</h2>
              <p className="text-[15px] text-[rgba(255,255,255,0.7)] font-light leading-[1.8]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>
  </>
);

export default Termini;
