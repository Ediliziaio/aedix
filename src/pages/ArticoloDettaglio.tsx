import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
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

const articleContent: Record<string, {
  title: string; category: string; date: string; readTime: string; author: string;
  image: string; intro: string; sections: { heading: string; text: string }[]; quote?: string;
}> = {
  "perche-le-pmi-italiane-hanno-paura-dellai": {
    title: "Perché le PMI Italiane Hanno Paura dell'AI (e Come Superarla)",
    category: "AI", date: "29 Mar 2026", readTime: "12 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    intro: "Secondo l'Osservatorio AI del Politecnico di Milano, il 73% delle PMI italiane considera l'intelligenza artificiale una priorità strategica per i prossimi tre anni. Eppure solo il 18% l'ha adottata in modo strutturato. Il gap non è tecnologico — è psicologico. E costa. Ogni mese che passa senza AI è un mese in cui i competitor guadagnano terreno, i processi restano inefficienti e il fatturato potenziale rimane sul tavolo. Questa è la mappa dei 5 blocchi mentali che frenano le imprese italiane — con le risposte concrete, basate sui dati, per superarli uno alla volta.",
    sections: [
      { heading: "Il ritardo italiano: i numeri che nessuno vuole sentire", text: "L'Italia occupa il 25° posto in Europa per adozione dell'AI nelle PMI, secondo il Digital Economy and Society Index 2025. La media UE è al 28% di imprese che usano almeno uno strumento AI in modo strutturato — in Italia siamo al 14%. Quasi la metà. Non è un dato neutro: significa che ogni due PMI italiane che competono sullo stesso mercato, una sta usando strumenti che moltiplicano la produttività e l'altra no. Il paradosso italiano è noto: abbiamo tra gli imprenditori più capaci e creativi d'Europa, eppure siamo tra i più lenti ad adottare nuove tecnologie su scala. Le ragioni sono storiche — la nostra struttura produttiva è fatta di imprese familiari, spesso di seconda o terza generazione, con processi consolidati e diffidenza culturale verso il cambiamento. Ma questa volta il cambiamento non è facoltativo. L'AI non è una moda del momento: è un cambio di paradigma produttivo comparabile all'introduzione dei computer negli anni '80 o di internet negli anni '00. Chi si è mosso prima in quei casi ha costruito vantaggi impossibili da recuperare. La stessa logica si applica oggi." },
      { heading: "Blocco 1: 'Costa troppo' — Il calcolo che nessuno fa", text: "Questa è l'obiezione più diffusa. Ed è anche quella più facile da smontare con i numeri. Un agente AI che risponde ai clienti su WhatsApp e email, qualifica i lead e prenota gli appuntamenti ha un costo mensile di €200-400. Un collaboratore part-time con le stesse mansioni — disponibile solo di giorno, solo nei giorni feriali, soggetto a malattie e ferie — costa 10-15 volte di più. Ma il problema non è solo il confronto diretto. Il vero calcolo è quello del costo opportunità. Ogni ora che un membro del tuo team passa a rispondere alle stesse domande dei clienti, a copiare dati da un foglio all'altro, a mandare solleciti di pagamento — è un'ora non spesa a chiudere nuovi contratti, a migliorare il servizio, a fare le cose che solo le persone sanno fare. McKinsey stima che nelle PMI, il 40-60% del tempo lavorativo è dedicato ad attività che potrebbero essere automatizzate con le tecnologie disponibili oggi. Moltiplica per il costo orario medio e ottieni una cifra che fa riflettere. L'AI non è una spesa. È un investimento con uno dei ROI più veloci disponibili oggi sul mercato." },
      { heading: "Blocco 2: 'Non ho personale tecnico' — Il mito del programmatore necessario", text: "Fino a cinque anni fa, implementare soluzioni AI richiedeva data scientist, ingegneri del software, infrastruttura cloud proprietaria. Era vero. Oggi non lo è più. Le piattaforme AI di nuova generazione sono progettate esplicitamente per utenti non tecnici. L'interfaccia è in linguaggio naturale: descrivi cosa vuoi che faccia il sistema, e il sistema lo fa. Non c'è codice da scrivere, non ci sono configurazioni complesse, non serve una laurea in informatica. Un negozio di ottica in Toscana ha attivato un sistema di prenotazione AI e risposta automatica alle FAQ in meno di una settimana — con il titolare che ha 58 anni e non aveva mai usato un software più complesso di WhatsApp. Un'agenzia di comunicazione a Napoli ha integrato un agente AI per la gestione dei brief clienti e il follow-up delle offerte — senza assumere nessun tecnico. Uno studio odontoiatrico a Verona ha automatizzato i promemoria appuntamenti e le comunicazioni post-visita — con il personale di reception che lo gestisce in autonomia dal giorno due. McKinsey conferma: il 70% delle PMI che adottano AI non assume nuovo personale tecnico. Usa le persone che ha già, liberate dal lavoro ripetitivo per fare cose più utili." },
      { heading: "Blocco 3: 'I miei dati non sono al sicuro' — La paura giusta, le domande sbagliate", text: "La preoccupazione per la privacy dei dati è legittima. Anzi, è doverosa. Il problema è che spesso viene usata come ragione per non fare nulla, invece che come criterio per fare le scelte giuste. La prima distinzione da fare è che non tutta l'AI è uguale. Esistono soluzioni che inviano i tuoi dati a server americani senza garanzie chiare — e quelle andrebbero evitate. Ma esistono anche soluzioni che operano su server europei certificati, conformi al GDPR dalla fase di progettazione, con cifratura end-to-end e contratti DPA (Data Processing Agreement) espliciti. Con l'EU AI Act entrato in vigore nel 2024, l'Europa ha il regime normativo sull'AI più stringente al mondo. Le aziende che operano all'interno di questo framework sono sottoposte a audit regolari, obblighi di trasparenza e sanzioni severe in caso di violazioni. In questo contesto, il rischio dell'AI gestita correttamente — con un fornitore europeo, contratti chiari, dati sul territorio UE — è oggettivamente inferiore al rischio di avere un dipendente che gestisce i dati dei clienti su un foglio Excel non protetto. Le domande giuste da fare al fornitore sono: dove vengono elaborati i dati? Con quali standard di cifratura? Cosa prevede il DPA? Il sistema è conforme all'EU AI Act? Se il fornitore non sa rispondere, cambia fornitore." },
      { heading: "Blocco 4: 'L'AI toglierà lavoro ai miei dipendenti' — La verità che nessuno dice", text: "Questa è la paura più emotiva, quella che tocca le relazioni umane. Ed è comprensibile — soprattutto per un imprenditore che ha costruito la sua squadra nel tempo e si sente responsabile delle persone che ci lavorano. Ma la realtà che vediamo nelle aziende che hanno adottato AI è quasi sempre diversa da quella temuta. Il World Economic Forum stima che l'AI sostituirà circa 85 milioni di posti di lavoro entro il 2025, ma ne creerà 97 milioni. Saldo netto: +12 milioni. Nelle PMI la dinamica è ancora più diretta: l'AI non toglie lavoro alle persone — toglie il lavoro che le persone odiano fare. Nessun commerciale ha scelto questo lavoro per rispondere alle stesse dieci domande via email ogni giorno. Nessuna amministrativa è appassionata di copiare dati da un PDF a un foglio Excel. Nessun responsabile acquisti ama mandare i solleciti di pagamento. Quando queste attività vengono automatizzate, le persone si concentrano su ciò che sa fare solo l'essere umano: costruire relazioni, risolvere problemi complessi, prendere decisioni che richiedono giudizio e contesto. Deloitte ha rilevato che l'88% dei dipendenti in aziende che hanno adottato strumenti AI si dichiara più soddisfatto del proprio lavoro. Non meno. Il rischio reale non è perdere persone — è perderle perché sono sovraccariche di lavoro burocratico che potrebbe essere automatizzato." },
      { heading: "Blocco 5: 'Non so da dove iniziare' — Il problema reale e la soluzione pratica", text: "Questo è il blocco più onesto che sentiamo. E quello che rispettiamo di più. L'offerta AI è diventata caotica: migliaia di tool, decine di consulenti che promettono rivoluzioni, nessuno che dica con chiarezza 'per un'azienda come la tua, con queste caratteristiche, in questo settore, inizia da qui.' Il risultato è la paralisi. Si guarda, si valuta, si rimanda. Nel frattempo, i competitor si muovono. Il metodo che funziona è semplice: inizia da un singolo problema, non da una trasformazione. Qual è il processo che ti costa più tempo ogni settimana? Qual è l'attività che, se potessi delegarla completamente, ti cambierebbe la settimana? Parti da quella. Un sistema di risposta automatica ai clienti, un agente che gestisce i preventivi, un workflow che automatizza i solleciti di pagamento. Un pezzo alla volta, misurabile, con risultati visibili in settimane — non mesi. AEDIX è nata esattamente per questo: guidare le PMI italiane attraverso questo percorso, senza hype, senza jargon tecnico, con soluzioni concrete che funzionano nei settori reali — dal retail al manifatturiero, dai servizi professionali all'artigianato. Il modo più rapido per capire da dove partire è una conversazione. Trenta minuti, gratuiti, senza impegno." },
    ],
    quote: "La finestra per avere un vantaggio competitivo sull'AI per PMI italiane esiste ancora — ma si sta chiudendo. Tra 3-5 anni, l'adozione dell'AI sarà la norma, non il differenziatore.",
  },
  "5-processi-pmi-italiana-automatizzare-oggi": {
    title: "5 Processi che Ogni PMI Italiana Può Automatizzare Oggi con l'AI",
    category: "Automazione", date: "29 Mar 2026", readTime: "11 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    intro: "McKinsey stima che il 60% delle attività lavorative nelle PMI è parzialmente o totalmente automatizzabile con le tecnologie AI oggi disponibili. Non tra cinque anni — oggi. Eppure la maggior parte delle imprese italiane perde ogni settimana decine di ore in processi che potrebbero girare da soli, 24 ore su 24, senza errori, senza stipendio. Il costo non è solo economico: è strategico. Ogni ora spesa in lavoro ripetitivo è un'ora non investita in vendite, in relazioni con i clienti, in innovazione. Questi sono i 5 processi da cui partire — con i dati di mercato, i risultati reali e le istruzioni pratiche per iniziare.",
    sections: [
      { heading: "Il costo nascosto dei processi manuali: i numeri che cambiano prospettiva", text: "Secondo l'Osservatorio PMI di Confindustria Digitale (2025), una piccola impresa italiana con 10-20 dipendenti spende in media 18 ore a settimana in attività amministrative ripetitive. Sembrano poche. Moltiplicate per 50 settimane lavorative, diventano 900 ore. A un costo orario medio di €28, sono più di 25.000€ l'anno di lavoro a basso valore — prodotto da persone che potrebbero fare cose molto più utili. Il dato più sorprendente è che solo il 14% delle PMI italiane ha digitalizzato questi processi in modo strutturato. L'86% restante gestisce ancora tutto via email, fogli Excel condivisi e telefonate. Non perché non voglia cambiare — ma perché nessuno ha mai mostrato loro concretamente come farlo, quanto costa e cosa si ottiene in cambio. Questo articolo cerca di colmare quel gap. Processo per processo, con dati reali e senza promesse esagerate." },
      { heading: "Processo 1: Risposta ai clienti e qualificazione dei lead", text: "HubSpot ha analizzato oltre 100.000 aziende e ha rilevato che rispondere a un lead entro 5 minuti aumenta del 391% le probabilità di conversione. Entro 10 minuti, le probabilità scendono già del 400% rispetto ai 5 minuti. Eppure la stragrande maggioranza delle PMI italiane risponde in ore — e alcune in giorni. Il motivo è semplice: i lead arrivano da canali diversi (email, WhatsApp, modulo sito, Instagram, LinkedIn), ognuno richiede attenzione, e il team ha altre cose da fare. Un agente AI di prima risposta risolve questo problema in modo radicale. Risponde in secondi su tutti i canali contemporaneamente, 24 ore su 24 e 7 giorni su 7. Non solo risponde: raccoglie le informazioni necessarie, qualifica il lead secondo i criteri della tua azienda e lo passa al team commerciale già pronto per la trattativa. Una piccola società di consulenza fiscale a Bologna ha implementato questo sistema e ridotto il tempo medio di prima risposta da 9 ore a 4 minuti. Le pratiche gestite nel mese successivo sono aumentate del 60%, senza assumere nessuno. Un'officina meccanica a Brescia ha visto aumentare del 45% le prenotazioni online nel primo trimestre, semplicemente perché i clienti ricevevano risposta immediata invece di aspettare il lunedì mattina." },
      { heading: "Processo 2: Generazione automatica di preventivi", text: "Chiedete a qualsiasi titolare di PMI quanto tempo passa a fare preventivi. La risposta tipica è tra 1,5 e 3 ore per preventivo, secondo la ricerca CNA del 2024 su PMI italiane di servizi, consulenza e artigianato. Se ricevete 20 richieste al mese, state spendendo tra 30 e 60 ore solo per questo. Un sistema AI connesso al vostro listino prezzi, alle vostre specifiche tecniche e ai vostri margini cambia completamente questa matematica. L'agente raccoglie i dati del cliente e le specifiche della richiesta attraverso una conversazione naturale. Il sistema genera automaticamente il preventivo — personalizzato, completo, professionale. Il responsabile lo rivede, approva con un click e lo invia. Il tempo per preventivo scende a 8-15 minuti. Uno studio di interior design a Firenze ha triplicato il volume di preventivi gestibili nello stesso tempo, aumentando il fatturato del 38% in sei mesi senza aumentare l'organico." },
      { heading: "Processo 3: Gestione documentale e scadenze", text: "La burocrazia è il grande nemico nascosto delle PMI italiane. Contratti con i clienti, accordi con i fornitori, scadenze contrattuali, rinnovi, adempimenti normativi, registri obbligatori. Ogni documento ha una scadenza. Ogni scadenza dimenticata ha un costo — a volte economico, a volte legale, sempre in termini di stress e reputazione. Il problema non è la quantità di documenti: è che sono sparsi ovunque. Nella casella email, nei cassetti, nel server condiviso con cartelle dal nome incomprensibile, nella memoria del titolare. Una piattaforma di gestione documentale AI centralizza tutto in un unico posto, indicizza automaticamente ogni documento, estrae le date chiave e genera alert proattivi settimane prima delle scadenze. Un'agenzia immobiliare di 6 persone a Torino ha azzerato le pratiche dimenticate, ridotto del 40% il tempo amministrativo e smesso di pagare penali per scadenze mancate. In sei mesi ha recuperato più di quanto avesse speso per il sistema intero." },
      { heading: "Processo 4: Fatturazione e recupero crediti automatizzati", text: "L'Italia ha uno dei tassi di ritardo pagamenti più alti d'Europa: in media 26 giorni oltre la scadenza per le transazioni B2B, secondo l'Intrum European Payment Report 2025. Il problema non sono i clienti — la maggior parte paga, semplicemente paga tardi perché nessuno li ha sollecitati nel momento giusto. Un sistema di fatturazione automatizzato risolve questo senza generare imbarazzo. Emette la fattura alla data concordata. Invia un promemoria gentile 7 giorni prima della scadenza. Un secondo promemoria il giorno della scadenza. Un terzo più formale a 10 giorni di ritardo. Solo a quel punto, se necessario, il team interviene personalmente. Le PMI che hanno implementato questo sistema riportano una riduzione del 35-40% dei tempi medi di incasso — senza una sola conversazione imbarazzante con i clienti. Il cash flow diventa prevedibile. La pianificazione finanziaria diventa possibile." },
      { heading: "Processo 5: Analytics e dashboard decisionali in tempo reale", text: "La maggior parte degli imprenditori italiani prende decisioni basandosi su sensazioni, memoria e intuizione. Non perché non vogliano i dati — ma perché raccoglierli richiede ore e quando sono pronti sono già vecchi. Una dashboard AI live aggrega automaticamente i dati da tutti i sistemi — gestionale, CRM, fatturazione, magazzino, marketing — e presenta ogni mattina un quadro chiaro: dove sta andando bene il business, dove c'è un problema nascente, cosa richiede attenzione oggi. Fine delle riunioni basate su 'secondo me'. Inizio delle decisioni basate su evidenze. Secondo Accenture, le PMI che adottano l'automazione per fasi successive registrano un ROI medio di 3.8x nei primi 12 mesi. La chiave è non cercare di cambiare tutto in una volta: scegli il processo più doloroso, automatizzalo, misura il risultato, poi passa al successivo." },
    ],
    quote: "L'automazione processi aziendali PMI non è un lusso. È la risposta strutturale alla pressione sui margini. Non elimina i problemi — li gestisce meglio, con meno risorse, in meno tempo.",
  },
  "agenti-ai-per-pmi-cosa-sono-e-come-usarli": {
    title: "Agenti AI per PMI: Cosa Sono e Come Usarli nella Tua Azienda",
    category: "AI", date: "29 Mar 2026", readTime: "13 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    intro: "Il mercato degli agenti AI per le imprese crescerà da 5,1 miliardi di dollari nel 2024 a 47,1 miliardi nel 2030, secondo Grand View Research. Non è hype: è la risposta concreta a un problema reale che ogni PMI italiana conosce bene. Troppe ore dedicate a lavoro ripetitivo. Troppi lead persi per risposte lente. Troppi preventivi che si accumulano. Troppa burocrazia che consuma energia che potrebbe andare alla crescita. Gli agenti AI non sono robot della fantascienza. Sono strumenti operativi che lavorano per te — 24 ore su 24, senza errori, senza stipendio, senza ferie. Questo articolo spiega cosa sono davvero, come funzionano e come le PMI italiane li stanno usando in settori completamente diversi tra loro.",
    sections: [
      { heading: "La differenza fondamentale: chatbot vs agente AI", text: "La confusione tra chatbot e agenti AI è comprensibile — entrambi 'parlano' con gli utenti. Ma sono strumenti radicalmente diversi. Un chatbot tradizionale segue uno script rigido. Il programmatore definisce le domande possibili e le risposte corrispondenti. Se il cliente chiede qualcosa di non previsto, il chatbot si blocca, risponde in modo generico o passa a un operatore umano. Non capisce il contesto. Non impara. Non esegue azioni. È utile per rispondere a FAQ semplici, nulla di più. Un agente AI ragiona. Capisce il linguaggio naturale con tutte le sue sfumature, abbreviazioni, errori ortografici e ambiguità. Interpreta l'intento reale dietro le parole. Fa domande di follow-up intelligenti. Accede a sistemi esterni in tempo reale — CRM, calendario, database prodotti, sistema di fatturazione. E prende decisioni in autonomia sulla base di queste informazioni. Se un cliente chiede 'siete disponibili per un incontro martedì pomeriggio?', il chatbot risponde 'per prenotare un appuntamento chiama il numero X'. L'agente AI verifica la disponibilità del calendario, propone gli orari liberi, conferma la prenotazione, invia il promemoria al cliente e aggiorna il CRM — tutto nella stessa conversazione, in tempo reale. Gartner prevede che entro il 2028 il 33% di tutte le interazioni aziendali passerà attraverso agenti AI. Oggi siamo al 4%. La finestra per costruire un vantaggio competitivo è aperta — per ora." },
      { heading: "Come funziona un agente AI: i tre componenti essenziali", text: "Per capire cosa può fare un agente AI nella tua azienda, aiuta capire come è costruito. Ogni agente AI operativo ha tre componenti fondamentali. Il primo è il Cervello — il modello linguistico (LLM) che processa il linguaggio naturale, capisce il contesto e genera risposte coerenti. Pensa a GPT-4, Claude o Gemini come al motore: è quello che rende l'agente capace di conversazione vera, non di script predefiniti. Il secondo componente è la Memoria — il database personalizzato con le informazioni della tua azienda specifica: il listino prezzi aggiornato, il catalogo prodotti con tutte le specifiche, le policy aziendali, le FAQ più frequenti, lo storico dei clienti, gli orari di apertura, le disponibilità del team. L'agente attinge costantemente a questa memoria per dare risposte accurate e contestuali — non risposte generiche. Il terzo componente sono le Azioni — la capacità di fare cose concrete nei sistemi esterni. Inserire un nuovo lead nel CRM. Generare un preventivo in PDF. Prenotare un appuntamento nel calendario. Inviare un'email di conferma. Creare un ticket di assistenza. Aggiornare uno stato in un gestionale. È questa componente che trasforma l'agente da 'assistente che risponde' a 'collega digitale che agisce'. La combinazione di questi tre elementi rende gli agenti AI qualcosa di fondamentalmente nuovo rispetto a qualsiasi software precedente." },
      { heading: "Casi d'uso reali: quattro settori, quattro storie diverse", text: "Il valore degli agenti AI emerge chiaramente guardando come vengono usati in settori diversi — perché i problemi che risolvono sono trasversali, anche se la forma cambia. Nel settore HR e recruiting, una società di selezione del personale a Milano riceveva oltre 200 candidature al mese per ogni posizione aperta. Il team passava 3 ore a settimana solo per le risposte iniziali e lo screening preliminare. Con un agente AI: lo screening avviene in automatico sulla base dei criteri definiti, i candidati non idonei ricevono risposta professionale entro minuti, quelli qualificati vengono contattati per un colloquio con l'agente. Il tempo del team HR è sceso a 45 minuti a settimana, con qualità dei candidati filtrati superiore del 40%. Nel retail, un'azienda di arredamento su misura a Firenze gestiva manualmente le richieste di reso e assistenza post-vendita — 20 ore al mese, con frequenti errori e ritardi che generavano recensioni negative. L'agente AI gestisce ora l'intero flusso: verifica l'ordine, valuta il caso secondo la policy, propone la soluzione e avvia la procedura. Risultato: meno di 2 ore al mese di gestione manuale, customer satisfaction in aumento del 22%. Nei servizi professionali, uno studio di architettura a Roma impiegava in media 2 ore per ogni preventivo. Con un agente connesso al sistema tariffario interno, il preventivo si genera in 10 minuti. Il volume di richieste gestibili è triplicato. Nel settore formazione, un'azienda di corsi professionali a Torino usava 4 ore a settimana per rispondere alle domande sui corsi e gestire le iscrizioni. L'agente AI ora gestisce tutto il processo informativo e iscrittivo. Le iscrizioni online sono aumentate del 55% nel primo trimestre." },
      { heading: "I limiti reali degli agenti AI: onestà prima di tutto", text: "Gli agenti AI non sono infallibili. E chi vi dice il contrario sta cercando di vendervi qualcosa. Ci sono situazioni in cui un agente AI non è la risposta giusta, e riconoscerle è fondamentale per usarli bene. Gli agenti AI fanno fatica quando le conversazioni diventano molto lunghe e complesse su argomenti non documentati nella loro knowledge base. Quando un cliente è emotivamente coinvolto — arrabbiato per un problema, deluso per un servizio — la risposta umana è ancora insostituibile: l'empatia, il tono, la capacità di leggere le emozioni non sono ancora replicabili dall'AI con la stessa efficacia. E quando la decisione richiede giudizio su casi unici, senza precedenti nella policy aziendale, la supervisione umana rimane essenziale. Dove invece gli agenti AI eccellono: rispondere a domande ripetitive con precisione costante e senza stanchezza, gestire volumi elevati di interazioni simultanee su più canali, raccogliere e strutturare informazioni in modo sistematico, eseguire azioni predefinite in modo autonomo e affidabile, operare 24/7 senza costi aggiuntivi. La regola pratica è questa: usa gli agenti AI per tutto il lavoro scalabile, standardizzabile e ripetitivo. Tieni le persone per il lavoro che richiede relazione profonda, giudizio complesso e creatività." },
      { heading: "Quanto costa davvero e come si calcola il ROI", text: "La risposta sui costi è meno spaventosa di quanto molti pensino. Un agente di prima risposta su WhatsApp e email — il punto d'ingresso più comune — parte da €200-400 al mese per una PMI media. Meno del costo orario di un dipendente amministrativo per una settimana. Un agente più completo, con preventivazione automatica, integrazione CRM e workflow avanzati, si posiziona tra €400 e €800 al mese. Il calcolo del ROI è immediato. Parti dal costo orario medio del tuo team. Moltiplica per le ore settimanali dedicate alle attività che vuoi automatizzare. Moltiplica per 50 settimane. Quello è il costo attuale dell'inazione. Confrontalo con il costo mensile dell'agente e calcola il break-even. Per la maggior parte delle PMI italiane, il payback avviene in 2-4 mesi. Salesforce ha rilevato che le aziende che usano AI per la gestione dei lead registrano un aumento medio del 50% dei lead qualificati e una riduzione del 60% dei costi per lead. Non sono numeri teorici: sono la media di migliaia di aziende reali, in settori diversi, con dimensioni diverse." },
      { heading: "Come iniziare: il metodo dei 5 passi che funziona davvero", text: "Il modo sbagliato di approcciare gli agenti AI è cercare di implementare tutto insieme, su tutti i canali, con tutti i workflow, dalla settimana uno. È la strada più sicura verso il fallimento — tecnologico e organizzativo. Il modo giusto è partire piccolo, misurare subito, espandere sulla base dei risultati. Il metodo si articola in cinque fasi. Prima fase, Analisi: identifica il singolo processo che ha il volume più alto di interazioni ripetitive — di solito la prima risposta ai clienti o la gestione delle FAQ. Seconda fase, Configurazione: costruisci la knowledge base dell'agente con le informazioni specifiche della tua azienda. Questo richiede un lavoro iniziale di 3-5 giorni: raccogliere le domande più frequenti, le risposte corrette, il listino, le policy. Terza fase, Test interno: prima di andare live, simula 50-100 conversazioni reali per verificare la qualità delle risposte e identificare i gap. Quarta fase, Lancio graduale: attiva l'agente su un solo canale per le prime due settimane. Raccogli feedback. Aggiusta. Quinta fase, Ottimizzazione continua: monitora settimanalmente le conversazioni, aggiorna la knowledge base con i nuovi casi, espandi progressivamente a nuovi canali e workflow. Il primo agente richiede 48-72 ore per andare live. Dal secondo in poi, il tempo si dimezza perché la knowledge base è già costruita." },
    ],
    quote: "Nel prossimo anno, la diffusione degli agenti AI per PMI italiane accelererà significativamente. Chi li adotta oggi costruisce un vantaggio strutturale. Chi aspetta non recupera un ritardo — eredita uno svantaggio.",
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

  return (
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
  );
};

export default ArticoloDettaglio;
