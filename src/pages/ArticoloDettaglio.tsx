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
    category: "AI", date: "29 Mar 2026", readTime: "8 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    intro: "Le PMI italiane sono tra le più creative e resilienti d'Europa. Eppure, quando si parla di AI per PMI italiane, scatta un riflesso automatico: 'non fa per noi'. Il problema non è la tecnologia — è la narrativa che la circonda, fatta di scenari fantascientifici e costi proibitivi. Questa narrativa fa paura. E la paura paralizza.",
    sections: [
      { heading: "I numeri: chi sta davvero usando l'AI", text: "Nel database proprietario di AEDIX sono presenti oltre 19.000 imprese edili italiane. Negli ultimi 18 mesi abbiamo parlato con centinaia di titolari. Solo il 12% usa l'AI in modo strutturato. Il 61% ci sta pensando ma non sa da dove iniziare. Il 27% pensa che non faccia per lui. Quello che accomuna il 61% e il 27% è un blocco. Non è ignoranza — è paura." },
      { heading: "Blocco 1: 'Costa troppo'", text: "Un agente AI che risponde ai clienti via WhatsApp, qualifica i lead e prenota appuntamenti costa meno di un collaboratore part-time. Le piattaforme SaaS verticali per PMI partono da €200/mese. Il costo reale dell'AI per PMI italiane non è l'abbonamento mensile — è il costo opportunità di non adottarla mentre i competitor lo fanno. Ogni giorno che non automatizzi le operazioni ripetitive è un giorno in cui paghi qualcuno per fare qualcosa che una macchina fa in 0,3 secondi." },
      { heading: "Blocco 2: 'Non ho personale tecnico'", text: "Le piattaforme AI moderne sono progettate per imprenditori e team non tecnici. Niente codice. Niente configurazioni complesse. Abbiamo clienti con dipendenti che usano tablet sul cantiere per aggiornare documenti, inviare report e comunicare con i subappaltatori — zero formazione tecnica richiesta. La curva di apprendimento è simile a imparare WhatsApp nel 2012." },
      { heading: "Blocco 3: 'I miei dati non sono al sicuro'", text: "Non tutta l'AI è uguale. Esistono soluzioni che elaborano i dati in cloud su server europei, conformi al GDPR, e soluzioni che lavorano completamente on-premise. Con l'EU AI Act entrato in vigore, le aziende europee sono soggette ai controlli più severi al mondo. Prima di rifiutare l'AI per ragioni di sicurezza, chiedi al fornitore: dove vengono elaborati i dati? Sono conformi al GDPR?" },
      { heading: "Blocco 4: 'L'AI toglierà lavoro ai miei dipendenti'", text: "L'AI non sostituisce le persone. Libera le persone dalle attività che odiano fare. Nessun muratore vuole passare tre ore a riempire fogli di presenza. Nessun responsabile commerciale vuole rispondere alle stesse 10 domande dei clienti per la quinta volta. I nostri clienti che hanno introdotto agenti AI operativi hanno riportato in media un aumento del 30% nella soddisfazione del personale." },
      { heading: "Blocco 5: 'Non so da dove iniziare'", text: "Non sai da dove iniziare perché l'offerta è caotica. Ci sono centinaia di tool e nessuno che ti dica chiaramente: 'per un'azienda come la tua, inizia da qui.' La risposta è AEDIX. Abbiamo costruito un ecosistema verticale per le PMI italiane — con piattaforme specifiche per l'edilizia, la gestione dei cantieri, la sicurezza e la burocrazia. Il modo più rapido per capire da dove iniziare? Una call di 30 minuti. Gratuita." },
    ],
    quote: "La finestra per avere un vantaggio competitivo sull'AI per PMI italiane esiste ancora — ma si sta chiudendo. Tra 3-5 anni, l'adozione dell'AI sarà la norma, non il differenziatore.",
  },
  "5-processi-pmi-italiana-automatizzare-oggi": {
    title: "5 Processi che Ogni PMI Italiana Può Automatizzare Oggi con l'AI",
    category: "Automazione", date: "29 Mar 2026", readTime: "7 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    intro: "Se sei un imprenditore italiano, probabilmente passi almeno 2-3 ore al giorno su attività che non producono valore diretto. L'automazione processi aziendali PMI non è più un privilegio delle grandi aziende. Con l'AI disponibile oggi, anche un'impresa da 3 persone può automatizzare i processi ripetitivi e recuperare tempo da reinvestire nella crescita.",
    sections: [
      { heading: "Il costo nascosto dei processi manuali", text: "Nel database di 19.000 imprese edili italiane di AEDIX, il tempo medio perso su attività amministrative ripetitive è di 14 ore a settimana per azienda. Su 50 settimane lavorative, sono 700 ore. A un costo orario medio di €30, sono 21.000€ all'anno di lavoro a basso valore. L'Italia ha 4,2 milioni di PMI. Solo il 14% ha introdotto strumenti di automazione digitale in modo strutturato. Il restante 86% gestisce ancora processi critici con email, fogli Excel e telefonate." },
      { heading: "Processo 1: Risposta clienti e qualificazione lead", text: "Le domande arrivano via email, WhatsApp, modulo contatti, Instagram Direct. Ogni canale richiede attenzione, ogni risposta richiede tempo. E se non rispondi in meno di 5 minuti, il cliente va dal competitor. Un agente AI conversazionale risponde immediatamente su tutti i canali, raccoglie le informazioni base (tipo di lavoro, zona, budget, urgenza) e qualifica il lead. Risultato tipico: -70% del tempo sulla comunicazione iniziale, lead già qualificati che arrivano al team." },
      { heading: "Processo 2 e 3: Preventivi e documentazione cantiere", text: "Per molte PMI edili, generare un preventivo richiede da 30 minuti a 3 ore. Con un sistema AI connesso al listino prezzi, si arriva a 8 minuti per preventivo — 40 ore risparmiate al mese su 20 richieste. Per la documentazione di cantiere, fascicoli di sicurezza, DDT, DURC e registri: una piattaforma cloud centralizza tutto, aggiorna in automatico e invia notifiche per le scadenze. Zero documenti smarriti, zero sanzioni." },
      { heading: "Processo 4 e 5: Fatturazione e analytics", text: "La gestione dei pagamenti è uno dei problemi più acuti delle PMI italiane. Un sistema automatizzato emette fatture alla data concordata, invia promemoria a 7, 15 e 30 giorni dalla scadenza e avvisa per i ritardi significativi. Risultato: -35-40% sui tempi di incasso. Per gli analytics: una dashboard aggrega automaticamente i dati da tutti i sistemi e mostra ogni mattina cosa richiede attenzione. Fine dei 'secondo me' nelle riunioni — solo dati." },
      { heading: "Come iniziare: il metodo AEDIX", text: "Non cercare di automatizzare tutto in una volta. Scegli il processo che ti costa più tempo ogni settimana e parti da lì. Il metodo che usiamo: Assessment (mappiamo i processi che costano più tempo e più errori), Implementazione (introduciamo la soluzione con onboarding dedicato), Misurazione (monitoriamo i KPI e ottimizziamo). Il risultato medio dopo 6 mesi: ROI di 4.2x. Le PMI che hanno introdotto l'automazione nei processi core riportano una riduzione del 22% dei costi operativi e un aumento del 31% della capacità commerciale — senza assumere nessuno." },
    ],
    quote: "L'automazione processi aziendali PMI non è un lusso. È la risposta strutturale alla pressione sui margini. Non elimina i problemi — li gestisce meglio, con meno risorse, in meno tempo.",
  },
  "agenti-ai-per-pmi-cosa-sono-e-come-usarli": {
    title: "Agenti AI per PMI: Cosa Sono e Come Usarli nella Tua Azienda",
    category: "AI", date: "29 Mar 2026", readTime: "9 min", author: "Florin Andriciuc",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    intro: "Gli agenti AI per PMI sono programmi che eseguono compiti in autonomia — rispondono ai clienti, qualificano i lead, inviano documenti, prenotano appuntamenti — senza supervisione umana. Lavorano 24/7. Non chiedono ferie. Non si ammalano. Negli ultimi 12 mesi, il numero di PMI italiane che ha adottato almeno un agente AI operativo è triplicato.",
    sections: [
      { heading: "Chatbot vs Agente AI: la differenza che conta", text: "Un chatbot tradizionale segue uno script predefinito: se il cliente dice X, rispondi Y. Non capisce il contesto, non impara, non si adatta. Un agente AI ragiona: capisce il linguaggio naturale, interpreta l'intento del cliente, fa domande di follow-up, accede a database e sistemi esterni e prende decisioni in autonomia. Se un cliente chiede 'avete qualcuno disponibile martedì pomeriggio?', l'agente verifica il calendario e propone un orario — tutto in tempo reale. La differenza non è di grado. È di natura." },
      { heading: "Come funziona: cervello, memoria, azioni", text: "Un agente AI operativo ha tre componenti: il Cervello (modello linguistico che capisce e genera testo naturale), la Memoria (database con listino prezzi, catalogo, policy, FAQ, storico clienti — l'agente attinge qui per risposte accurate), e le Azioni (capacità di fare cose concrete: inserire un lead nel CRM, generare un preventivo PDF, aggiornare un calendario, inviare email). Gli agenti moderni non si limitano a rispondere — agiscono." },
      { heading: "Casi d'uso reali: da 14 ore a 2 minuti", text: "Un'impresa edile lombarda riceveva 40 contatti al mese. Il titolare rispondeva personalmente con ritardi di 12-24 ore. Dopo l'introduzione di un agente AI: tempo di prima risposta da 14 ore a 2 minuti, lead qualificati +85%, conversione lead→appuntamento dal 18% al 34%. Un serramentista veneto con 300+ prodotti impiegava 2,5 ore per preventivo. Con agente AI connesso al listino: 8 minuti per preventivo, 35 ore risparmiate al mese." },
      { heading: "Quanto costa e qual è il ROI", text: "Un agente di prima risposta base su WhatsApp e email parte da €200-400/mese — meno del costo di un collaboratore part-time per lo stesso lavoro. Un agente più completo con preventivazione e integrazione CRM: €400-800/mese. Il ROI medio che vediamo nei clienti dopo 3 mesi è di 3-5x sull'investimento. Non perché sia magia — ma perché il tempo liberato viene reinvestito in attività commerciali che generano fatturato." },
      { heading: "Come iniziare: 5 passi", text: "Il metodo AEDIX: 1) Analisi — capiamo quali domande riceve più spesso il team, 2) Configurazione — costruiamo la knowledge base dell'agente con le tue informazioni, 3) Test — simuliamo conversazioni reali per verificare la qualità, 4) Lancio — l'agente va live sui canali scelti, 5) Ottimizzazione — nelle prime 4 settimane monitoriamo e aggiustiamo. In AEDIX abbiamo già attivi 11 agenti AI operativi. Li usiamo prima su noi stessi, poi li proponiamo ai clienti. Niente che non abbiamo testato internamente." },
    ],
    quote: "Nel prossimo anno, la diffusione degli agenti AI per PMI italiane accelererà significativamente. Chi li adotta oggi costruisce un vantaggio. Chi aspetta recupera un ritardo.",
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
