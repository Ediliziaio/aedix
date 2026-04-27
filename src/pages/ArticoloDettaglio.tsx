import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
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

const articleContent: Record<string, {
  title: string; category: string; date: string; readTime: string; author: string;
  image: string; intro: string; sections: { heading: string; text: string }[]; quote?: string;
  metaTitle?: string; metaDescription?: string; publishedISO?: string;
}> = {
  "quanto-costa-ai-pmi-italiana-guida-2026": {
    title: "Quanto costa l'AI per una PMI italiana? Guida prezzi 2026",
    metaTitle: "Quanto Costa l'AI per una PMI Italiana? Guida 2026 | AEDIX",
    metaDescription: "Da €200 a €5.000/mese: i prezzi reali dell'AI per PMI italiane nel 2026. Cosa include ogni fascia, e quale ROI aspettarsi. Guida completa.",
    publishedISO: "2026-04-27",
    category: "Strategia", date: "27 Apr 2026", readTime: "8 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    intro: "\"Quanto costa l'AI per una PMI italiana?\" è la prima domanda che ci fanno tutti. La risposta varia da €200 a €5.000 al mese — e dipende meno dalla tecnologia e più da cosa vuoi automatizzare. In questa guida ti diamo numeri reali, fascia per fascia, con esempi concreti di imprese italiane che stanno già pagando questi prezzi.",
    sections: [
      { heading: "Perché la domanda è mal posta (e come riformularla)", text: "Quando un imprenditore chiede \"quanto costa l'AI?\", in realtà sta chiedendo: \"l'AI mi conviene per il mio caso?\". Il prezzo isolato non significa niente. €500/mese sono tantissimi se l'AI non risolve un problema, e pochi se libera 30 ore di lavoro qualificato. La domanda giusta è: \"qual è il costo dell'inazione?\". Quante ore costa oggi gestire manualmente i lead in entrata, generare i preventivi, inseguire i pagamenti? Quel numero è il vero benchmark." },
      { heading: "Fascia 1: €200-400/mese — Agenti AI base", text: "Questa fascia copre i casi più comuni: un agente conversazionale che risponde su WhatsApp, email e modulo contatti, qualifica i lead e li passa al commerciale con una scheda completa. Cosa include: configurazione iniziale (di solito una tantum €500-1.500), knowledge base con le FAQ e il listino, integrazione email/WhatsApp Business, dashboard di monitoraggio. Per chi è: imprese da 1-10 dipendenti che vogliono smettere di perdere lead per lentezza di risposta. ROI tipico: 3-5x nei primi 6 mesi." },
      { heading: "Fascia 2: €400-1.200/mese — AI con preventivazione e CRM", text: "Salendo, gli agenti AI fanno cose concrete: generano preventivi PDF a partire dalla conversazione, sincronizzano dati con il CRM, prenotano appuntamenti sul calendario, inviano follow-up automatici. Cosa include: tutto della fascia 1 + integrazione CRM (HubSpot, Salesforce, Zoho o gestionali italiani), modulo preventivi, automazioni di follow-up, reporting settimanale. Per chi è: PMI da 5-30 dipendenti con processo commerciale strutturato. ROI tipico: 4-7x nei primi 6 mesi." },
      { heading: "Fascia 3: €1.200-3.000/mese — Piattaforme verticali", text: "Qui entriamo nei gestionali AI verticali: piattaforme che gestiscono cantieri, documentazione, fatturazione, sicurezza — il tutto con AI integrata. Esempi: Edilizia in Cloud per imprese edili, Cantiere in Cloud per la sicurezza, Edilizia.io per ecosistemi di agenti multipli. Cosa include: software gestionale completo + AI nativa, app mobile, multi-utente illimitato, supporto dedicato, formazione. Per chi è: imprese da 10-50 dipendenti che vogliono digitalizzare l'intero workflow operativo. ROI tipico: 5-8x nei primi 12 mesi." },
      { heading: "Fascia 4: €3.000-5.000+/mese — Soluzioni custom", text: "Per realtà più strutturate o processi molto specifici, le soluzioni custom partono da €3.000/mese. Si tratta di agenti AI sviluppati su misura, integrazioni con sistemi proprietari, automazioni cross-piattaforma. Esempio: un'impresa edile con 30 dipendenti che integra la piattaforma di cantiere con il proprio software contabile preesistente, con un agente AI che monitora i SAL e segnala anomalie automaticamente. Per chi è: PMI strutturate, gruppi industriali, holding. Lead time implementazione: 2-4 mesi." },
      { heading: "Costi nascosti che nessuno ti racconta", text: "Tre voci che non vedi nelle slide commerciali. Setup iniziale: variabile da €500 a €5.000+, una tantum. Spesso negoziabile. Formazione del team: 2-8 ore di onboarding incluso, ma se il team è grande potresti voler aggiungere sessioni dedicate (€200-400/h). Consumo API: alcuni vendor fatturano i token LLM consumati a parte. Su volumi alti può aggiungere €100-500/mese. La regola: chiedi sempre il TCO (Total Cost of Ownership) a 12 mesi, non il prezzo lista." },
      { heading: "Come capire qual è la fascia giusta per te", text: "Tre domande pratiche. 1) Quante ore a settimana il tuo team spende su attività ripetitive? Se sono <10, parti dalla fascia 1. Se sono 10-30, fascia 2. Se sono 30+, fascia 3. 2) Hai un gestionale che vuoi mantenere? Se sì, fascia 2. Se vuoi sostituirlo, fascia 3. 3) Hai processi specifici del tuo settore? Se sì e sei nell'edilizia, fascia 3 (piattaforma verticale). Se sei in altri settori, valuta fascia 2 + custom incrementale. La fascia giusta è quella che ti restituisce il tempo investito in 6 mesi." },
    ],
    quote: "Il costo dell'AI non si misura in euro al mese. Si misura in ore liberate, lead non persi e preventivi che oggi non riesci a chiudere.",
  },
  "ai-act-2026-pmi-italiane-cosa-cambia": {
    title: "AI Act 2026: cosa cambia per le PMI italiane (e come prepararsi)",
    metaTitle: "AI Act 2026 per PMI Italiane: Cosa Cambia | AEDIX",
    metaDescription: "L'AI Act è in vigore. Cosa devono fare le PMI italiane per adeguarsi senza spendere migliaia di euro in consulenza. Guida pratica 2026.",
    publishedISO: "2026-04-28",
    category: "Strategia", date: "28 Apr 2026", readTime: "9 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80",
    intro: "L'AI Act europeo è in vigore. Per molti imprenditori italiani la prima reazione è stata: \"un'altra normativa, un'altra burocrazia\". La realtà è meno drammatica. Per la maggior parte delle PMI italiane, l'AI Act richiede pochi adempimenti pratici — ma chi non li fa rischia sanzioni fino al 7% del fatturato globale. Ecco cosa devi sapere e come metterti in regola senza spendere migliaia di euro in consulenza.",
    sections: [
      { heading: "Cos'è l'AI Act e perché riguarda anche te", text: "L'AI Act (Regolamento UE 2024/1689) è la prima legge al mondo che disciplina l'uso dell'intelligenza artificiale in modo organico. Si applica a chiunque sviluppi, distribuisca o usi sistemi AI nell'Unione Europea — incluse le PMI italiane che usano agenti AI per la gestione clienti, software gestionali con funzioni AI, o servizi di marketing automation basati su AI. Anche se compri \"solo\" un agente AI da un fornitore italiano, sei tu il \"deployer\" del sistema, e hai obblighi precisi. Non scappa nessuno." },
      { heading: "Le 4 categorie di rischio (e dove ricade la tua AI)", text: "L'AI Act classifica i sistemi in 4 livelli. Rischio inaccettabile: vietati (es. social scoring stile Cina). Rischio alto: sistemi che impattano sicurezza, lavoro, accesso a servizi essenziali — richiedono valutazione di conformità formale. Rischio limitato: chatbot, deepfake — obbligo di trasparenza (\"stai parlando con un'AI\"). Rischio minimo: la maggior parte delle applicazioni business — nessun obbligo specifico. Per fortuna, il 95% dei sistemi AI usati dalle PMI italiane (agenti di prima risposta, preventivatori, AI per documentazione) ricade nelle categorie 3 e 4." },
      { heading: "Cosa devi fare se usi un agente AI nei rapporti con i clienti", text: "Se hai un chatbot o un agente AI che parla con i tuoi clienti, ricadi nel \"rischio limitato\" e devi: 1) informare l'utente che sta interagendo con un'AI (banner, messaggio iniziale, o nota a piè pagina del chat), 2) tenere un registro interno dei sistemi AI in uso (basta un foglio Excel con: nome del sistema, fornitore, finalità, data attivazione), 3) verificare che il fornitore abbia fatto la valutazione di conformità (chiedi la dichiarazione UE — i fornitori seri ce l'hanno già pronta). Tempo richiesto: 2-4 ore di lavoro, una volta." },
      { heading: "Cosa devi fare se usi AI per HR (selezione personale)", text: "Attenzione: i sistemi AI per la selezione del personale (screening CV automatico, punteggi candidati, analisi comportamentali) ricadono nel \"rischio alto\" — anche se vengono usati da una PMI con 5 dipendenti. Gli obblighi sono significativi: documentazione tecnica, sistema di gestione del rischio, trasparenza verso i candidati, supervisione umana sulle decisioni. Se usi piattaforme tipo TalentProfile 360°, verifica con il fornitore che abbia completato la valutazione di conformità — tu poi devi tenere il fascicolo e nominare un responsabile interno per il monitoraggio." },
      { heading: "Sanzioni: chi rischia (e quanto)", text: "Le sanzioni sono salate ma graduate. Pratiche vietate: fino a €35M o 7% del fatturato globale annuo. Violazioni obblighi rischio alto: fino a €15M o 3%. Mancanza di trasparenza (rischio limitato): fino a €7,5M o 1,5%. Per una PMI italiana media (fatturato 1-5M), parliamo realisticamente di sanzioni da €15.000 a €75.000 — che possono essere mortali. Ma le sanzioni si applicano dopo verifica e contraddittorio, e nella pratica le autorità daranno tempo per adeguarsi alle PMI in buona fede. Il rischio reale non è la prima sanzione, ma le ricadute reputazionali e contrattuali (i clienti grossi cominciano a chiedere prove di conformità AI Act ai fornitori)." },
      { heading: "La checklist pratica per la tua PMI", text: "Sei step concreti da fare in 1-2 giornate di lavoro. 1) Inventario: lista di tutti i sistemi AI in uso (incluse le funzioni AI dei tuoi gestionali). 2) Classificazione: per ognuno, identifica la categoria di rischio. 3) Documentazione: chiedi ai fornitori la dichiarazione di conformità UE. 4) Trasparenza: aggiorna privacy policy e flussi conversazionali per dichiarare l'uso di AI. 5) Responsabile interno: designa una persona (può essere il titolare in PMI piccole) che monitora i sistemi e tiene il registro. 6) Revisione annuale: aggiorna il registro ogni 12 mesi. Costo totale realistico: €0-2.000 (se ti aiuti con un consulente)." },
      { heading: "Cosa NON fare: errori comuni delle PMI", text: "Tre errori che vediamo ricorrere. Errore 1: ignorare l'AI Act sperando che \"tanto la mia AI è piccola\". L'AI Act non guarda la dimensione, guarda la finalità. Errore 2: spendere €5-10K in consulenza specializzata per una PMI di rischio minimo. Per la maggior parte dei casi, basta un paio di pomeriggi di lavoro interno + le dichiarazioni dei fornitori. Errore 3: scegliere fornitori che non hanno la conformità AI Act pronta. Verificalo prima di firmare il contratto — se il fornitore ti dice \"ci stiamo lavorando\", scegli un altro." },
    ],
    quote: "L'AI Act non è un freno all'innovazione. È il bollino di qualità che separa i fornitori seri da quelli improvvisati — e la prima cosa che chiederanno i tuoi clienti grossi.",
  },
  "come-scegliere-fornitore-ai-pmi-italiana": {
    title: "Come scegliere un fornitore AI per la tua PMI: 7 domande chiave",
    metaTitle: "Come Scegliere un Fornitore AI per PMI: 7 Domande | AEDIX",
    metaDescription: "Stai valutando un fornitore di AI per la tua PMI italiana? Ecco le 7 domande che ti salvano da contratti pessimi e progetti falliti.",
    publishedISO: "2026-04-29",
    category: "Strategia", date: "29 Apr 2026", readTime: "8 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    intro: "Scegliere il fornitore AI sbagliato è il modo più veloce per buttare €10.000-50.000 in 6 mesi. Negli ultimi 18 mesi abbiamo visto decine di PMI italiane firmare contratti AI \"sulla carta\" perfetti, e poi ritrovarsi con sistemi che non funzionano, vendor irraggiungibili, o costi triplicati. Ecco le 7 domande che separano i fornitori AI seri dagli imbonitori.",
    sections: [
      { heading: "Domanda 1: \"In quante PMI italiane è già attivo questo sistema?\"", text: "I numeri non mentono. Un fornitore con 200 PMI italiane attive ha già visto e risolto i problemi che troverai tu. Un fornitore con \"i primi pilot\" ti renderà la cavia. Chiedi: numero di clienti italiani attivi nel tuo settore, anzianità media del rapporto, lista referenze contattabili. Se rifiutano di darti referenze concrete (\"per privacy\"), è una bandiera rossa. La privacy non vieta di darti il numero clienti aggregato e 2-3 referenze che hanno acconsentito. Pretendi numeri reali, non case study marketing." },
      { heading: "Domanda 2: \"Cosa succede ai miei dati quando interrompo il contratto?\"", text: "Lock-in dei dati = dipendenza tossica. Se quando interrompi il contratto i tuoi clienti, le tue conversazioni e il tuo storico restano nei sistemi del fornitore (o peggio: te li danno in formato proprietario inutilizzabile), sei in trappola. Pretendi: export completo in formato standard (CSV, JSON), tempi massimi di consegna (es. 30 giorni), garanzia di cancellazione definitiva entro 90 giorni dall'interruzione. Mettilo nero su bianco nel contratto, non fidarti dei \"tranquilli, ci pensiamo noi\"." },
      { heading: "Domanda 3: \"Quanto costa davvero a 24 mesi?\"", text: "Il prezzo del primo anno è marketing. Il prezzo del secondo anno è la verità. Molti fornitori AI fanno discount aggressivi sul primo anno, poi ricaricano del 30-50% al rinnovo. Chiedi sempre il TCO (Total Cost of Ownership) a 24 mesi, includendo: canone mensile primo anno, canone mensile dal secondo anno, setup una tantum, costo per utente aggiuntivo, costo per integrazione aggiuntiva, eventuale consumo a token. Confronta i preventivi su questa base, non sul prezzo civetta." },
      { heading: "Domanda 4: \"Avete la conformità AI Act?\"", text: "Dal 2026 non è più un'opzione. Un fornitore AI serio per il mercato europeo deve aver completato la valutazione di conformità AI Act per i propri sistemi. Pretendi la dichiarazione UE in PDF, con data e firma. Se ti dicono \"ci stiamo lavorando\", vuol dire 2 cose: 1) il loro prodotto non è pronto, 2) sei tu a portarti a casa il rischio sanzionatorio. Vai oltre. Vedi anche il nostro articolo su AI Act per le PMI italiane." },
      { heading: "Domanda 5: \"Chi sviluppa il modello AI sotto al cofano?\"", text: "Tre opzioni, tre rischi diversi. Modello proprietario del fornitore: massimo controllo ma alto rischio se l'azienda chiude. Modello commerciale (OpenAI, Anthropic, Google): performance massima ma il fornitore può cambiare provider improvvisamente impattandoti. Modello open source self-hosted: privacy massima ma performance generalmente inferiori e costi infrastrutturali. Non esiste l'opzione perfetta — ma il fornitore deve dichiarartelo trasparentemente. Se ti dice \"abbiamo la nostra AI\" senza specificare cosa c'è sotto, sta nascondendo qualcosa." },
      { heading: "Domanda 6: \"Quanto è italiano davvero?\"", text: "L'AI generica capisce l'italiano, ma non capisce il contesto italiano. La differenza la fanno: terminologia di settore (un \"DDT\" non è uguale a un \"shipping note\"), abitudini commerciali (in Italia si fa il preventivo prima della firma, non l'ordine d'acquisto), normative locali (fatturazione elettronica SDI, codici ATECO, gestione dei subappalti). Un fornitore AI \"localizzato\" su 10 mercati ti darà un servizio mediocre in tutti. Preferisci fornitori con focus sul mercato italiano o EU, soprattutto per processi regolati come edilizia, sicurezza, fiscalità." },
      { heading: "Domanda 7: \"Quanto durerà l'implementazione, e cosa succede se non funziona?\"", text: "Una promessa di \"tutto pronto in 7 giorni\" è quasi sempre menzogna. Tempi realistici: agente AI base 2-4 settimane, gestionale completo 6-12 settimane, integrazione custom 2-4 mesi. Pretendi un piano di onboarding scritto con milestone settimanali, e una clausola contrattuale: se entro 90 giorni il sistema non raggiunge KPI concordati (es. tempo medio di risposta < X minuti, % preventivi automatizzati > Y%), hai diritto al rimborso del setup e alla disdetta gratuita. I fornitori seri accettano. I fornitori improvvisati no." },
      { heading: "Bonus: la regola del 10x", text: "Una scorciatoia mentale che ci ha salvato decine di volte. Prima di firmare un contratto AI, chiediti: \"se questo sistema costasse 10x quello che mi stanno chiedendo, lo comprerei comunque?\". Se la risposta è no, il valore percepito è troppo basso — probabilmente stai comprando per FOMO o per pressione commerciale, non perché ti serve davvero. Se la risposta è sì, vuol dire che il problema è grande abbastanza da meritare la soluzione. Solo allora vai avanti — e a quel punto il prezzo \"vero\" è quasi un dettaglio." },
    ],
    quote: "Un fornitore AI sbagliato non ti costa solo i soldi del contratto. Ti costa 6 mesi di tempo, la fiducia del team e l'opportunità di adottare l'AI con il vendor giusto.",
  },
  "perche-le-pmi-italiane-hanno-paura-dellai": {
    title: "Perché le PMI italiane hanno paura dell'AI (e come superarla)",
    metaTitle: "Perché le PMI Italiane Hanno Paura dell'AI | AEDIX",
    metaDescription: "Il 73% delle PMI italiane sa che dovrebbe usare l'AI. Ma non sa da dove iniziare. Ecco i 5 blocchi mentali più comuni — e come superarli con esempi reali.",
    publishedISO: "2026-03-29",
    category: "AI", date: "29 Mar 2026", readTime: "8 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
    intro: "Le PMI italiane sono tra le più creative e resilienti d'Europa. Eppure, quando si parla di AI per PMI italiane, scatta un riflesso automatico: \"non fa per noi\". Il problema non è la tecnologia — è la narrativa che la circonda. In questo articolo smontiamo i 5 blocchi mentali più comuni con esempi reali.",
    sections: [
      { heading: "Il punto di partenza: cosa sta succedendo davvero", text: "Nel database proprietario di AEDIX sono presenti oltre 19.000 imprese edili italiane. Negli ultimi 18 mesi abbiamo parlato direttamente con centinaia di titolari. Le risposte alla domanda \"stai usando l'AI?\" si dividono così: \"Sì, ma in modo sporadico\" 12%, \"Ci sto pensando ma non so da dove iniziare\" 61%, \"Non fa per me\" 27%. Quello che accomuna l'88% non è ignoranza — è paura. E la paura si può smontare." },
      { heading: "Blocco 1: \"Costa troppo\"", text: "Per anni l'AI era roba da grandi aziende con budget da capogiro. Oggi non è più così. Un agente AI che risponde via WhatsApp, qualifica i lead e prenota appuntamenti costa meno di un collaboratore part-time. Le piattaforme SaaS verticali per PMI partono da €200/mese — meno di quanto spende un'impresa media in cancelleria. Il costo reale dell'AI per PMI italiane non è l'abbonamento. È il costo opportunità di non adottarla mentre i competitor lo fanno." },
      { heading: "Blocco 2: \"Non ho personale tecnico\"", text: "\"Per usare l'AI devo assumere un ingegnere informatico.\" Falso. Le piattaforme moderne sono progettate per essere usate da chi non scrive una riga di codice. L'interfaccia è simile a quella di WhatsApp o Excel. La configurazione la fa il fornitore. Tu impari a usarla in 2-3 ore. I tuoi dipendenti? Si adattano in pochi giorni — perché l'AI moderna parla italiano, ragiona come una persona e non richiede comandi tecnici." },
      { heading: "Blocco 3: \"I miei dati non sono al sicuro\"", text: "È una preoccupazione legittima — ma anche qui la realtà è diversa dalla percezione. Le piattaforme AI serie (incluse le nostre) sono ospitate su data center europei conformi al GDPR. I tuoi dati restano tuoi e non vengono usati per addestrare modelli pubblici. La trasparenza contrattuale è la prima cosa da chiedere a un fornitore: dove sono i dati, chi può accederli, come vengono cancellati." },
      { heading: "Blocco 4: \"L'AI sostituirà le persone\"", text: "Questo è il blocco emotivamente più forte. Ma la realtà delle nostre 19.000 imprese clienti è opposta: l'AI non sostituisce le persone, sostituisce le attività ripetitive che le persone fanno male o malvolentieri. Il data entry, le risposte standard, i report manuali. Le persone si spostano su attività a più alto valore: relazioni, strategia, problem solving. Il fatturato per dipendente sale. Nessuno viene licenziato." },
      { heading: "Blocco 5: \"Non so da dove iniziare\"", text: "Questo è il più diffuso — il 61% delle PMI lo dice esplicitamente. La risposta è semplice: non parti da \"l'AI\". Parti da un singolo processo che ti costa tempo. La gestione dei contatti in entrata. La generazione dei preventivi. Il follow-up sui lead. Scegli quello che ti pesa di più, lo automatizzi, misuri il risultato. Poi passi al successivo. In 90 giorni hai un ecosistema operativo." },
    ],
    quote: "L'AI non è un salto nel buio. È una serie di piccoli passi misurabili. Chi aspetta il \"momento giusto\" sta solo dando vantaggio ai competitor che hanno già iniziato.",
  },
  "5-processi-pmi-italiana-automatizzare-oggi": {
    title: "5 processi che ogni PMI italiana può automatizzare oggi con l'AI",
    metaTitle: "5 Processi PMI da Automatizzare Subito con l'AI | AEDIX",
    metaDescription: "Ogni PMI italiana ha 5 processi da automatizzare con l'AI. Ecco quali sono, quanto costano e quanto risparmieresti. Guida pratica con esempi reali.",
    publishedISO: "2026-03-30",
    category: "Automazione", date: "30 Mar 2026", readTime: "8 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80",
    intro: "Se sei un imprenditore italiano, probabilmente passi 2-3 ore al giorno su attività che non producono valore: rispondere alle stesse email, compilare Excel, inseguire i clienti per i pagamenti. L'automazione processi aziendali PMI non è più privilegio delle grandi aziende. Ecco 5 processi concreti che puoi automatizzare questa settimana.",
    sections: [
      { heading: "Perché l'automazione è urgente per le PMI italiane", text: "L'Italia ha 4,2 milioni di PMI. Solo il 14% ha introdotto strumenti di automazione digitale in modo strutturato. Il restante 86% gestisce processi critici con email, Excel e telefonate. Secondo le nostre analisi su imprese edili italiane, il tempo medio perso su attività amministrative ripetitive è di 14 ore a settimana per azienda. Su 50 settimane, sono 700 ore. A €30/h sono €21.000 all'anno di lavoro a basso valore." },
      { heading: "1. Risposta clienti e qualificazione lead", text: "\"Quanto costa?\" \"Siete disponibili?\" \"Posso avere un preventivo?\" — queste domande arrivano via email, WhatsApp, modulo, Instagram. Se non rispondi in meno di 5 minuti, il cliente va dal competitor. Cosa automatizzare: un agente AI conversazionale che risponde immediatamente su tutti i canali, raccoglie le info base (tipo lavoro, zona, budget, urgenza) e qualifica il lead prima che arrivi al commerciale. Risultato tipico: -70% del tempo speso sulla comunicazione iniziale." },
      { heading: "2. Generazione preventivi", text: "Per molte PMI edili e artigianali, generare un preventivo richiede da 30 minuti a 3 ore. Se ricevi 20 richieste al mese e ne converti il 30%, stai spendendo 40-60 ore per chiudere 6 contratti. Cosa automatizzare: un sistema AI che — a partire dai dati raccolti dall'agente di qualificazione — genera in automatico un preventivo personalizzato con prezzi, materiali e tempi. Il commerciale rivede, approva e invia con un click. Da 2 ore a 8 minuti per preventivo." },
      { heading: "3. Gestione documentazione di cantiere", text: "La documentazione è il tallone d'Achille di ogni impresa edile italiana. Fascicoli sicurezza, piani di lavoro, DDT, registri presenze, DURC. Ogni cantiere genera decine di documenti. La gestione manuale è lenta, soggetta a errori, e spesso causa di problemi nelle ispezioni. Cosa automatizzare: una piattaforma cloud (vedi Edilizia in Cloud) che centralizza tutto, aggiorna in automatico sulla base degli eventi e invia notifiche sulle scadenze. Risultato: 0 documenti smarriti, 0 sanzioni." },
      { heading: "4. Fatturazione e solleciti di pagamento", text: "I clienti pagano in ritardo, i solleciti sono imbarazzanti, il cashflow ne risente. Cosa automatizzare: un sistema che emette le fatture alla data concordata, invia promemoria a 7, 15 e 30 giorni dalla scadenza, e ti avvisa quando un cliente è in ritardo significativo. Senza che tu debba alzare un dito. Risultato tipico: riduzione tempi di incasso del 35-40% e cashflow più prevedibile." },
      { heading: "5. Report e analytics aziendali", text: "Quante volte hai finito la settimana senza sapere davvero come andava il business? Fatturato, ordini aperti, cantieri in corso, costi vs. previsti, pipeline commerciale. Raccogliere questi dati manualmente richiede ore — e quando sono pronti sono già vecchi. Cosa automatizzare: una dashboard che aggrega in automatico i dati da gestionale, CRM e contabilità e ti mostra ogni mattina un riassunto chiaro. Decisioni più veloci, fine dei \"secondo me\" nelle riunioni." },
      { heading: "Come iniziare e quale ROI aspettarsi", text: "Non automatizzare tutto in una volta. Scegli il processo che ti costa più tempo, automatizzalo, misura, passa al successivo. Il metodo che usiamo coi nostri clienti: 1) Assessment dei processi più costosi, 2) Implementazione con onboarding dedicato, 3) Misurazione e ottimizzazione. Il risultato medio dopo 6 mesi: ROI di 4.2x sull'investimento iniziale, riduzione costi operativi del 22%, aumento capacità commerciale del 31% — senza assumere nessuno." },
    ],
    quote: "L'automazione processi aziendali PMI non è un lusso. È la risposta strutturale alla pressione sui margini delle PMI italiane.",
  },
  "agenti-ai-per-pmi-cosa-sono-e-come-usarli": {
    title: "Agenti AI per PMI: cosa sono e come usarli nella tua azienda",
    metaTitle: "Agenti AI per PMI: Cosa Sono e Come Usarli | AEDIX",
    metaDescription: "Gli agenti AI per PMI lavorano 24/7, rispondono ai clienti e generano preventivi. Guida pratica su cosa sono e come usarli nella tua azienda italiana.",
    publishedISO: "2026-03-31",
    category: "AI", date: "31 Mar 2026", readTime: "9 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    intro: "\"Agente AI\" sembra un termine da fantascienza. In realtà, se hai mai chattato con un assistente che ti ha prenotato un appuntamento o risposto a una domanda in modo sensato, hai già interagito con uno. Negli ultimi 12 mesi il numero di PMI italiane che ha adottato almeno un agente AI è triplicato. Ecco cosa sono davvero e come si usano.",
    sections: [
      { heading: "Chatbot vs agente AI: la differenza che conta", text: "Un chatbot tradizionale segue uno script predefinito. \"Se il cliente dice X, rispondi Y.\" Non capisce il contesto, non impara, non si adatta. Un agente AI ragiona: capisce il linguaggio naturale, interpreta l'intento, fa domande di follow-up, accede a database e sistemi esterni, prende decisioni in autonomia. Se un cliente chiede \"avete qualcuno disponibile martedì pomeriggio?\", l'agente verifica il calendario, controlla le disponibilità e propone un orario in tempo reale. La differenza non è di grado, è di natura." },
      { heading: "Come funziona un agente AI per PMI", text: "Un agente AI operativo è composto da tre elementi. Il Cervello (LLM): il modello linguistico che capisce e genera testo — pensa a GPT-4 o Claude come al motore. La Memoria: il database con le informazioni della tua azienda — listino, catalogo, policy, orari, FAQ, storico clienti. Le Azioni: la capacità di fare cose concrete — inserire un lead nel CRM, inviare un'email, generare un preventivo PDF, aggiornare un calendario, creare un ticket. Gli agenti moderni non si limitano a rispondere — agiscono." },
      { heading: "Caso 1: agente di prima risposta", text: "Un'impresa edile lombarda riceveva 40 contatti al mese tra email, WhatsApp e modulo sito. Il titolare rispondeva personalmente con ritardi di 12-24 ore. Dopo l'introduzione di un agente AI come primo punto di contatto, in 90 giorni: tempo di prima risposta da 14 ore a 2 minuti, lead qualificati che arrivano al titolare +85%, tasso di conversione lead → appuntamento da 18% a 34%. L'agente raccoglie nome, tipo di lavoro, zona, budget e urgenza. Il titolare riceve una scheda completa." },
      { heading: "Caso 2: preventivatore automatico", text: "Un serramentista veneto con 300+ prodotti a catalogo impiegava 2,5 ore per preventivo. Con un agente AI connesso a listino e configuratore, il flusso è: 1) il cliente descrive il lavoro, 2) l'agente fa le domande tecniche (misure, materiali, specifiche), 3) il sistema genera il preventivo PDF, 4) il titolare approva con un click e l'agente invia. Tempo medio: 8 minuti. Risparmio mensile: ~35 ore. Vedi Edilizia.io per il sistema di agenti AI per imprese edili con preventivazione automatica." },
      { heading: "Caso 3: agente di follow-up commerciale", text: "Il 68% dei lead non converte alla prima interazione — non perché non interessati, ma perché nessuno li ha seguiti nel momento giusto. Un agente AI di follow-up monitora i lead inattivi e invia messaggi personalizzati nei momenti ottimali: \"Ciao [nome], sei riuscito a decidere per il lavoro in [indirizzo]?\" — automaticamente, basandosi sul comportamento del lead. Risultato tipico: recupero del 15-25% dei lead considerati \"freddi\"." },
      { heading: "Quanto costa un agente AI per la tua PMI", text: "Un agente di prima risposta base (testo su WhatsApp ed email) si attiva a partire da €200-400/mese — meno del costo di un collaboratore part-time per lo stesso lavoro. Un agente più completo, con preventivazione e integrazione CRM, si posiziona tra €400 e €800/mese. Il ROI medio nei nostri clienti dopo 3 mesi è 3-5x sull'investimento. Non per magia — perché il tempo liberato viene reinvestito in attività commerciali che generano fatturato." },
      { heading: "I limiti degli agenti AI (quello che non ti dicono)", text: "Cosa non fanno bene: conversazioni molto lunghe e complesse su temi tecnici non documentati, situazioni emotive delicate (cliente arrabbiato per un lavoro mal fatto), decisioni che richiedono giudizio umano su casi nuovi. Cosa fanno benissimo: rispondere a domande ripetitive con precisione costante, operare su più canali simultaneamente senza stanchezza, raccogliere e strutturare informazioni, eseguire azioni predefinite in modo scalabile. La regola: agenti per il lavoro scalabile e ripetitivo, persone per il lavoro che richiede relazione e giudizio." },
    ],
    quote: "Gli agenti AI non sono il futuro. Sono già qui — e le PMI italiane che li adottano oggi costruiscono un vantaggio difficile da colmare.",
  },
  "ai-pmi-italiane-2025": {
    title: "Come l'AI sta trasformando le PMI italiane nel 2025",
    category: "AI", date: "15 Mar 2026", readTime: "7 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    intro: "L'intelligenza artificiale non è più un tema da Silicon Valley. È qui, nelle PMI italiane, e sta cambiando le regole del gioco. Chi si muove adesso avrà un vantaggio impossibile da colmare tra 2-3 anni.",
    sections: [
      { heading: "Il contesto: perché ora", text: "Secondo PwC, l'impatto economico globale dell'AI raggiungerà i $15.7 trilioni entro il 2030. McKinsey stima un aumento medio della produttività del 40% per le aziende che adottano AI generativa. Ma il dato più importante è un altro: il 75% delle aziende adotterà AI entro il 2027 (Gartner). Chi non si muove ora, resterà indietro." },
      { heading: "Cosa significa per una PMI italiana", text: "Per una PMI da 10-50 dipendenti, l'AI non significa sostituire persone. Significa eliminare le attività ripetitive che rubano ore ogni giorno: rispondere alle stesse email, compilare preventivi, gestire appuntamenti, fare follow-up sui lead. Un agente AI operativo può gestire tutto questo 24/7, senza errori, senza ferie, senza malattia." },
      { heading: "I numeri reali: il caso AEDIX", text: "Nelle nostre imprese, l'AI ha ridotto del 93% il tempo di gestione amministrativa. Un preventivo che richiedeva 45 minuti ora si genera in 30 secondi. Il follow-up sui lead, che veniva dimenticato nel 60% dei casi, ora è automatico e puntuale al 100%. Il risultato? +35% di tasso di chiusura e €3.200/mese risparmiati in media." },
      { heading: "Come iniziare (senza rischi)", text: "Non serve stravolgere l'azienda. Si parte da un singolo processo: il più ripetitivo, il più costoso in termini di tempo. Si automatizza, si misura il risultato, si espande. In 30 giorni puoi avere il primo agente AI operativo. In 90 giorni, un ecosistema che lavora per te mentre dormi." },
    ],
    quote: "Le aziende che adottano AI oggi sono come quelle che hanno aperto un sito web nel 2000. Tra 5 anni, sarà troppo tardi per recuperare.",
  },
  "automazione-processi-aziendali": {
    title: "Automazione dei processi: da 8 ore a 8 minuti",
    category: "Automazione", date: "8 Mar 2026", readTime: "5 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80",
    intro: "44 workflow automatizzati. Zero errori umani. Il 93% del tempo di gestione eliminato. Questi non sono numeri teorici — sono i risultati reali delle nostre piattaforme.",
    sections: [
      { heading: "Il problema: tempo perso in attività a zero valore", text: "In una PMI media, il 60% del tempo viene speso in attività amministrative: email, data entry, report, follow-up, compilazione documenti. Attività necessarie ma che non generano fatturato. Ogni ora spesa in burocrazia è un'ora non spesa con i clienti." },
      { heading: "La soluzione: workflow automatizzati", text: "Un workflow automatizzato è una sequenza di azioni che si esegue da sola quando si verifica un trigger. Un nuovo lead arriva? L'AI lo qualifica, gli risponde, prenota un appuntamento, invia un promemoria. Zero intervento umano. Zero dimenticanze." },
      { heading: "Risultati misurabili", text: "Nelle imprese che usano le nostre piattaforme: fatturazione automatica (-95% errori), gestione documentale digitale (da 3 ore/giorno a 15 minuti), follow-up lead automatico (da 40% dimenticati a 0%), report settimanali generati in automatico (da 2 ore a 0)." },
    ],
  },
  "marketing-performance-edilizia": {
    title: "Marketing a performance: perché il canone fisso è morto",
    category: "Marketing", date: "1 Mar 2026", readTime: "6 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    intro: "Le agenzie tradizionali ti chiedono €3.000/mese. Non ti garantiscono nulla. Il modello è rotto. Ecco perché lavoriamo a commissione sulle vendite chiuse — e perché funziona meglio per tutti.",
    sections: [
      { heading: "Il modello tradizionale è un conflitto di interessi", text: "Un'agenzia a canone fisso guadagna lo stesso che tu venda 0 o 100. Non ha incentivi reali a farti vendere di più. Il suo obiettivo è mantenere il contratto, non aumentare il tuo fatturato. Questo crea un disallineamento fondamentale." },
      { heading: "Il modello a performance allinea gli interessi", text: "Quando il nostro guadagno dipende dalle tue vendite, i nostri interessi sono perfettamente allineati. Ogni euro che investiamo in ads, ogni landing page che creiamo, ogni test che facciamo — tutto punta a un unico obiettivo: farti vendere di più." },
      { heading: "Come funziona in pratica", text: "Nessun canone fisso. Nessun budget minimo obbligatorio. Noi creiamo e gestiamo le campagne, i funnel, le landing page. Tu paghi solo una commissione sulle vendite effettivamente chiuse. Se non vendi, non ci paghi. Punto." },
    ],
    quote: "Il marketing migliore è quello che si paga da solo. Se non genera più di quanto costa, non è marketing — è una spesa.",
  },
  "agenti-ai-vs-chatbot": {
    title: "Agenti AI operativi vs Chatbot: la differenza che conta",
    category: "AI", date: "22 Feb 2026", readTime: "8 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    intro: "Non tutti i bot sono uguali. Un chatbot risponde a domande predefinite. Un agente AI prende decisioni, esegue azioni e genera risultati. La differenza è come quella tra una calcolatrice e un contabile.",
    sections: [
      { heading: "Chatbot: risposte predefinite, valore limitato", text: "Un chatbot tradizionale segue un albero decisionale. Domanda → risposta. Se il cliente chiede qualcosa di non previsto, si blocca. Non impara, non si adatta, non esegue azioni. È utile per FAQ, ma non muove l'ago del business." },
      { heading: "Agenti AI: autonomia operativa", text: "Un agente AI capisce il contesto, prende decisioni e agisce. Può qualificare un lead, capire che tipo di progetto ha in mente, generare un preventivo personalizzato, prenotare un appuntamento e mandare un follow-up — tutto in una singola conversazione. Senza intervento umano." },
      { heading: "11 agenti attivi: cosa fanno concretamente", text: "Nella nostra piattaforma Edilizia.io, abbiamo 11 agenti specializzati: risponditore multicanale, qualificatore lead, generatore preventivi, scheduler appuntamenti, follow-up manager, content creator, data analyst, HR screener, project coordinator, compliance checker, report generator. Ognuno è un dipendente digitale specializzato." },
    ],
  },
  "errori-pmi-digitale": {
    title: "I 5 errori che le PMI fanno nella trasformazione digitale",
    category: "PMI", date: "15 Feb 2026", readTime: "6 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    intro: "Il 70% dei progetti di trasformazione digitale fallisce (McKinsey). Non perché la tecnologia non funziona, ma perché si commettono errori evitabili. Eccoli.",
    sections: [
      { heading: "Errore 1: Comprare software generico", text: "Un gestionale 'per tutti' non è ottimizzato per nessuno. Le PMI hanno esigenze specifiche del loro settore. Un software verticale costa meno, si implementa prima e risolve problemi reali — non generici." },
      { heading: "Errore 2: Non formare il team", text: "Il miglior software del mondo è inutile se nessuno sa usarlo. La formazione non è un costo, è un investimento. Ogni ora di formazione ne risparmia 10 di errori e frustrazione." },
      { heading: "Errore 3: Aspettare il momento giusto", text: "Non esiste il momento giusto. Ogni mese che aspetti è un mese in cui i tuoi competitor si digitalizzano e tu resti indietro. Il costo dell'inazione è sempre più alto del costo dell'azione." },
      { heading: "Errore 4: Fare tutto insieme", text: "La trasformazione digitale si fa un processo alla volta. Si parte dal più doloroso, si automatizza, si misura, si espande. Chi prova a cambiare tutto insieme non cambia niente." },
      { heading: "Errore 5: Scegliere il fornitore sbagliato", text: "Un fornitore che non conosce il tuo settore ti venderà una soluzione generica. Scegli partner che hanno esperienza diretta nel tuo settore — che hanno vissuto i tuoi problemi prima di te." },
    ],
  },
  "roi-intelligenza-artificiale": {
    title: "ROI dell'AI: numeri reali, non promesse",
    category: "Strategia", date: "8 Feb 2026", readTime: "9 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    intro: "Tutti parlano di AI. Pochi mostrano numeri reali. Ecco i dati concreti — sia quelli globali delle ricerche, sia quelli interni delle nostre piattaforme.",
    sections: [
      { heading: "I numeri globali", text: "300% di ROI medio per le aziende che adottano AI (Accenture). $15.7 trilioni di impatto economico entro il 2030 (PwC). 40% di aumento produttività con AI generativa (McKinsey). Ma questi sono numeri di grandi aziende. Cosa succede per una PMI?" },
      { heading: "I nostri numeri interni", text: "€3.200/mese risparmiati per PMI con i nostri workflow automatizzati. 4.2x di ROI medio nei primi 6 mesi con marketing a performance. +35% di tasso di chiusura vendite con metodo ibrido AI + persone. -70% di turnover nei primi 12 mesi con TalentProfile 360°." },
      { heading: "Il calcolo per la tua azienda", text: "Prendi il tuo costo orario medio. Moltiplica per le ore settimanali spese in attività ripetitive. Moltiplica per 4 (settimane/mese). Quello è il costo dell'inazione. Le nostre piattaforme partono da €200/mese. Il calcolo si fa da solo." },
    ],
    quote: "Il ROI dell'AI non si misura in percentuali. Si misura in ore liberate, errori eliminati e vendite chiuse che non avresti mai fatto.",
  },
  "saas-verticale-vs-generico": {
    title: "Software verticale vs generico: perché la specializzazione vince",
    category: "PMI", date: "1 Feb 2026", readTime: "5 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=80",
    intro: "Un coltello svizzero fa tutto, ma niente bene. Un bisturi fa una cosa sola, perfettamente. Nel software aziendale, la specializzazione vince sempre.",
    sections: [
      { heading: "Il problema del software generico", text: "I gestionali generici sono progettati per 'tutti i settori'. Il risultato? Feature che non ti servono, mancanza di quelle che ti servono, interfacce complesse, setup infiniti. Finirai per usare il 20% delle funzionalità e pagare per il 100%." },
      { heading: "Il vantaggio del verticale", text: "Un SaaS verticale parla la tua lingua. I campi del database sono quelli del tuo settore. I workflow sono quelli del tuo lavoro quotidiano. Il setup richiede giorni, non mesi. La formazione è minima perché l'interfaccia è intuitiva per chi fa il tuo lavoro." },
      { heading: "7 piattaforme, 7 problemi risolti", text: "Per questo abbiamo costruito 7 piattaforme separate invece di un unico software monstre. Ognuna risolve un problema specifico, perfettamente. E quando le usi insieme, creano un ecosistema integrato impossibile da replicare con tool generici." },
    ],
  },
  "futuro-lavoro-ai-automazione": {
    title: "Il futuro del lavoro: AI e automazione non rubano posti, li creano",
    category: "AI", date: "25 Gen 2026", readTime: "7 min", author: "Team AEDIX",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
    intro: "La paura è comprensibile: 'L'AI mi ruberà il lavoro.' La realtà è diversa. Il World Economic Forum stima 97 milioni di nuovi posti di lavoro creati dall'AI. Ma servono competenze nuove.",
    sections: [
      { heading: "Cosa cambia davvero", text: "L'AI non sostituisce le persone. Sostituisce le attività ripetitive che le persone fanno. Il data entry, il copy-paste, le risposte standard, i report manuali — queste attività scompaiono. Le persone si spostano su attività a più alto valore: relazioni, strategia, creatività, problem solving." },
      { heading: "I nuovi ruoli", text: "AI Trainer, Prompt Engineer, Automation Specialist, AI Ethics Manager — sono ruoli che non esistevano 3 anni fa. Oggi sono tra i più richiesti. Chi sviluppa competenze in queste aree avrà un vantaggio enorme nel mercato del lavoro dei prossimi 10 anni." },
      { heading: "Come prepararsi", text: "Non serve diventare programmatori. Serve capire come l'AI può potenziare il tuo lavoro attuale. Un commerciale che sa usare l'AI per qualificare i lead vende il doppio. Un amministrativo che automatizza i report libera ore per attività strategiche. La competenza chiave è sapere cosa delegare all'AI e cosa fare di persona." },
    ],
    quote: "L'AI non sostituirà le persone. Ma le persone che usano l'AI sostituiranno quelle che non la usano.",
  },
};

const ArticoloDettaglio = () => {
  const { slug } = useParams();
  const article = slug ? articleContent[slug] : null;

  if (!article) return <Navigate to="/articoli" replace />;

  const seoTitle = article.metaTitle ?? `${article.title} | AEDIX`;
  const seoDescription =
    article.metaDescription ??
    (article.intro.length > 155 ? `${article.intro.slice(0, 152)}...` : article.intro);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/articoli/${slug}`}
        type="article"
        image={article.image}
        category={article.category}
        author={article.author}
        publishedTime={article.publishedISO}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/articoli" },
          { name: article.title, url: `/articoli/${slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: seoDescription,
          image: article.image,
          datePublished: article.publishedISO ?? article.date,
          author: { "@type": "Organization", name: article.author, url: "https://www.aedix.it" },
          publisher: {
            "@type": "Organization",
            name: "AEDIX",
            url: "https://www.aedix.it",
            logo: {
              "@type": "ImageObject",
              url: "https://www.aedix.it/favicon.ico",
            },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.aedix.it/articoli/${slug}` },
          inLanguage: "it-IT",
          articleSection: article.category,
        }}
      />
      <Layout>
      {/* Hero */}
      <section className="pt-[140px] pb-12 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <Link to="/articoli" className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-white text-[13px] font-mono uppercase tracking-[1.5px] mb-8 transition-colors">
              <ArrowLeft size={16} /> Tutti gli articoli
            </Link>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[2px] px-3 py-1 rounded-full border border-primary/30 text-primary">{article.category}</span>
              <span className="flex items-center gap-1 text-[12px] text-[rgba(255,255,255,0.45)]"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-1 text-[12px] text-[rgba(255,255,255,0.45)]"><Clock size={12} /> {article.readTime}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h1 className="font-display font-bold leading-[1.12] tracking-[-1.5px] mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              {article.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <span className="text-[14px] text-[rgba(255,255,255,0.7)]">{article.author}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Image */}
      <FadeIn delay={0.2}>
        <div className="max-w-[1000px] mx-auto px-6 mb-16">
          <div className="aspect-[21/9] rounded-lg overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </FadeIn>

      {/* Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <p className="text-[19px] text-[rgba(255,255,255,0.85)] font-light leading-[1.9] mb-12">{article.intro}</p>
          </FadeIn>

          {article.sections.map((s, i) => (
            <FadeIn key={i} delay={0.08 * i}>
              <div className="mb-12">
                <h2 className="font-display text-[24px] font-bold tracking-[-0.5px] mb-4">{s.heading}</h2>
                <p className="text-[17px] text-[rgba(255,255,255,0.75)] font-light leading-[1.9]">{s.text}</p>
              </div>
            </FadeIn>
          ))}

          {article.quote && (
            <FadeIn>
              <blockquote className="border-l-2 border-primary pl-8 py-4 my-16">
                <p className="text-[20px] text-[rgba(255,255,255,0.9)] italic font-light leading-[1.7]">"{article.quote}"</p>
              </blockquote>
            </FadeIn>
          )}

          {/* CTA */}
          <FadeIn>
            <div className="mt-16 p-10 rounded-lg border border-primary/20 bg-primary/[0.05] text-center">
              <h3 className="font-display text-[24px] font-bold mb-4">Vuoi applicare queste strategie alla tua azienda?</h3>
              <p className="text-[15px] text-[rgba(255,255,255,0.65)] font-light mb-8">Parliamo del tuo caso specifico. Nessun impegno, nessun costo.</p>
              <Link
                to="/contatti"
                className="shimmer-btn inline-block bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-12 py-[18px] hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                Parla Con Noi →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default ArticoloDettaglio;
