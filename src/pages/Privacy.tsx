import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy — AEDIX"
      description="Informativa privacy di AEDIX (aedix.it). Come trattiamo i dati personali in conformità al GDPR e ai diritti dell'interessato."
      path="/privacy"
    />
    <Layout>
    <section className="pt-[140px] pb-20 px-6 lg:px-12 min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[5px] text-primary block mb-6">Legale</span>
        <h1 className="font-display font-bold text-[40px] tracking-[-2px] mb-12">Privacy Policy</h1>

        <div className="prose-custom space-y-8">
          {[
            { title: "1. Titolare del trattamento", text: "Il titolare del trattamento dei dati personali è Domus Group S.r.l. (\"AEDIX\"), con sede in Italia. Per qualsiasi richiesta relativa al trattamento dei dati personali, è possibile contattarci all'indirizzo info@aedix.io." },
            { title: "2. Dati raccolti", text: "Raccogliamo i dati personali che l'utente fornisce volontariamente attraverso i moduli di contatto presenti sul sito (nome, email, telefono, settore, messaggio). Raccogliamo inoltre dati di navigazione anonimi tramite cookie tecnici e analitici." },
            { title: "3. Finalità del trattamento", text: "I dati personali sono trattati per: rispondere alle richieste di contatto, fornire informazioni sui nostri servizi, migliorare l'esperienza di navigazione, adempiere agli obblighi di legge." },
            { title: "4. Base giuridica", text: "Il trattamento dei dati si basa sul consenso dell'interessato (art. 6, par. 1, lett. a del GDPR) e sull'esecuzione di misure precontrattuali (art. 6, par. 1, lett. b del GDPR)." },
            { title: "5. Conservazione dei dati", text: "I dati personali saranno conservati per il tempo strettamente necessario alle finalità per le quali sono stati raccolti e comunque non oltre 24 mesi dall'ultimo contatto." },
            { title: "6. Diritti dell'interessato", text: "L'interessato ha diritto di accedere ai propri dati, rettificarli, cancellarli, limitarne il trattamento, opporsi al trattamento e richiederne la portabilità. Per esercitare questi diritti, contattare info@aedix.io." },
            { title: "7. Aggiornamenti", text: "La presente privacy policy può essere aggiornata periodicamente. L'ultima modifica risale a marzo 2026." },
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

export default Privacy;
