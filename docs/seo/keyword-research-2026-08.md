# Ricerca keyword e piano SEO — aedix.it

**Data:** 8 agosto 2026
**Base analizzata:** commit `3053dcc` — 11 pagine statiche, 38 articoli, 49 URL prerenderizzati

> **Limite dichiarato di questa analisi.** Non contiene volumi di ricerca esatti.
> I connettori Ahrefs / Semrush / Similarweb non erano autenticati in sessione,
> e inventare numeri di volume sarebbe peggio che non darli. La domanda è stimata
> qualitativamente da: SERP osservate, dati di mercato pubblicati e presenza di
> competitor che già investono sul termine. Le voci marcate **[verificare]**
> vanno confermate con uno strumento prima di allocarci budget.

---

## 1. Dove siamo — stato reale

Il sito ha completato un riposizionamento: da *"AI per PMI italiane"* a
**"sviluppo software AI / sistemi AI ibridi per aziende"**.

| Pagina | Keyword primaria targettizzata |
|---|---|
| `/` | Sviluppo software AI per aziende + sistemi ibridi |
| `/sviluppo-software-ai` | Sviluppo software AI per aziende |
| `/servizi` | Sistemi AI ibridi — i 4 componenti |
| `/metodo` | Implementare l'AI in azienda in 4 fasi |
| `/sicurezza` | Dati, GDPR e AI Act |
| `/edilizia-in-cloud` | Gestionale imprese edili |
| `/perche-noi` | Chi siamo |
| `/articoli` | Blog |

38 articoli distribuiti su 7 categorie: AI, Enterprise, PMI, Automazione,
Marketing, Strategia.

### Copertura per intento

| Intento | Copertura | Note |
|---|---|---|
| Informazionale — "cos'è / come funziona" | **Forte** | sistema ibrido, RAG, human-in-the-loop, agenti vs chatbot |
| Commerciale — "quanto costa / come scegliere" | **Buona** | costi software AI, costi AI PMI, scegliere fornitore, build vs buy |
| Commerciale — "chi lo fa / per il mio settore" | **Debole** | pochi verticali, nessuna pagina servizio per settore |
| Transazionale — "agenzia / azienda / preventivo" | **Debole** | solo la landing generica |
| Normativo | **Media** | AI Act e GDPR presenti ma non aggiornati (vedi §3) |

---

## 2. Tre problemi trovati nel sito

### 2.1 Cannibalizzazione: homepage vs `/sviluppo-software-ai` — **priorità alta**

Le due pagine dichiarano quasi lo stesso title:

```
/                       Sviluppo Software AI per Aziende — AEDIX | Sistemi Ibridi
/sviluppo-software-ai   Sviluppo Software AI per Aziende — AEDIX
```

Stessa keyword primaria, stesso intento. Google deve scegliere quale mostrare:
i segnali si dividono e nessuna delle due si consolida. È il problema classico
di una landing costruita *dopo* che la homepage già presidiava il termine.

**Correzione consigliata** — separare gli intenti:

| Pagina | Ruolo | Title proposto |
|---|---|---|
| `/` | Brand + categoria proprietaria | `Sistemi AI Ibridi per Aziende — AEDIX` |
| `/sviluppo-software-ai` | Cattura query commerciale | `Sviluppo Software AI per Aziende — AEDIX` |

La homepage tiene "sistemi AI ibridi" (categoria che AEDIX sta costruendo e su
cui non ha concorrenza), la landing tiene la query commerciale ad alta domanda.
Nessuna delle due perde: smettono di competere fra loro.

### 2.2 Nessuna copertura del Digital Omnibus — **opportunità di tempismo**

I due articoli sull'AI Act (`ai-act-2026-pmi-italiane-cosa-cambia`,
`ai-act-grandi-imprese-governance-2026`) **non citano date specifiche**, quindi
non sono diventati sbagliati. Ma nessuno dei due copre il fatto più rilevante
del momento:

- il **2 agosto 2026** (sei giorni fa) sono scattati solo gli obblighi di
  **trasparenza** (art. 50);
- il **Digital Omnibus** ha rinviato gli obblighi sui sistemi ad **alto rischio**
  a **dicembre 2027** (Allegato III) e **agosto 2028** (Allegato I).

Chi cerca oggi "AI Act cosa cambia" trova soprattutto articoli scritti *prima*
del rinvio, quindi imprecisi. È una finestra di freschezza che si chiude in
poche settimane.

### 2.3 I riferimenti della skill SEO sono disallineati — **priorità media**

`references/keyword-map.md` e `competitor-analysis.md` descrivono ancora:

- pillar *"AI per PMI italiane"* come priorità assoluta → **superato** dal riposizionamento;
- il claim *"database 19.000 imprese edili"* come leva di credibilità → **rimosso
  deliberatamente dal sito** nel commit `06e638c`.

Chi userà la skill in futuro produrrà contenuti sul posizionamento vecchio.
Vanno riallineati, o continueranno a generare lavoro da buttare.

---

## 3. Cosa dice il mercato (dati verificati)

| Dato | Valore | Perché conta per AEDIX |
|---|---|---|
| Mercato AI Italia 2025 | **1,8 mld €**, +50% su 2024 | Domanda in forte espansione |
| Imprese ≥10 addetti che usano AI | **16,4%** (era 8,2% nel 2024) | Raddoppio in un anno |
| Imprese ≥250 addetti | **53,1%** | Il segmento enterprise è già dentro |
| Grandi imprese con progetti AI | **71%**, ma solo 1 su 5 in modo pervasivo | Il problema è *scalare*, non iniziare |
| "AI Scaler" (AI stabile nel modello) | **26%** | 74% è bloccato fra pilot e sperimentazione |
| PMI senza investimenti AI né previsti | **76%** | Mercato ampio ma freddo: educare costa |
| Voucher Doppia Transizione | **150 mln €**, domande dall'8 lug 2026 | Leva commerciale immediata |

**Lettura strategica.** Il dato più sfruttabile non è "poche aziende usano l'AI"
— è che **il 74% di chi ha iniziato è bloccato in pilot che non scalano**, e il
95% dei pilot GenAI non produce impatto misurabile (MIT). Questo è esattamente
il problema che il posizionamento "sistema ibrido" risolve. La domanda non è
*"cos'è l'AI"*: è *"perché il mio pilot non è arrivato in produzione"*.

Fonti: [Osservatori PoliMi](https://www.osservatori.net/comunicato/artificial-intelligence/intelligenza-artificiale-italia/) · [AI4Business](https://www.ai4business.it/intelligenza-artificiale/pmi-piu-spesa-digitale-ma-poca-visione-sullai-il-nodo-resta-competitivo/) · [Altalex — AI Act](https://www.altalex.com/documents/2026/07/31/act-cambia-davvero-2-agosto-2026-imprese-professionisti) · [Digitalic — Digital Omnibus](https://www.digitalic.it/intelligenza-artificiale/ai-act-2-agosto-2026-digital-omnibus-cosa-cambia) · [Incentivi Transizione 5.0](https://www.incentivimpresa.it/transizione-5-0-intelligenza-artificiale-incentivi/)

---

## 4. Panorama competitivo osservato

| Competitor | Presidia | Debolezza sfruttabile |
|---|---|---|
| [extra-web.it](https://www.extra-web.it/agenzia-sviluppo-software-ai/) | "agenzia sviluppo AI" + varianti città | Agenzia generalista, nessuna categoria propria |
| [lucasammarco.com](https://lucasammarco.com/blog/integrare-ai-gestionale-aziendale) | Blog aggressivo: bandi, integrazione gestionali | Personal brand, nessun prodotto verticale |
| [everestinnovation.it](https://www.everestinnovation.it/ai-agent-pmi-italiane-guida-automazione-2026/) | "agenti AI PMI" | Contenuto generico, poca prova operativa |
| [besttechpartner.ai](https://www.besttechpartner.ai/2026/05/29/ai-agenti-cosa-significa-davvero-per-le-imprese-guida-strategica-2026/) | Guide strategiche agenti AI | Nessun caso reale misurato |
| TeamSystem / Zucchetti | Gestionali + moduli AI nativi | Costosi, lock-in, non integrano software terzi |

**Dove AEDIX può vincere davvero:** non su "agenzia AI" (affollato, indifferenziato),
ma su **"il pilot non scala"** e **"AI sopra il gestionale che già hai"**. Sono i
due punti dove ha prodotto reale (Edilizia in Cloud), casi misurabili e una tesi
tecnica difendibile — e dove i competitor generalisti non hanno nulla da mostrare.

---

## 5. Gap keyword — cosa manca, per priorità

### Priorità 1 — alto intento, basso sforzo, allineate al posizionamento

| Cluster / termine | Intento | Perché | Formato |
|---|---|---|---|
| Integrare AI nel gestionale esistente (TeamSystem, Zucchetti, SAP) | Commerciale | **Cuore del posizionamento ibrido**: €4–25k vs €100k+ per sostituire. Competitor già presenti → contenuto migliore vince | Articolo pillar + sezione in `/servizi` |
| Incentivi e bandi AI 2026 (Voucher Doppia Transizione, iperammortamento) | Transazionale | Denaro pubblico disponibile *ora*, chi cerca ha budget e urgenza | Articolo + aggiornamento periodico |
| AI Act: cosa è scattato e cosa è slittato | Informazionale, alta freschezza | Finestra aperta, SERP piena di contenuti pre-Omnibus | Articolo + link da `/sicurezza` |
| Perché il pilot AI non arriva in produzione | Commerciale | **La tesi centrale di AEDIX.** 74% bloccato, 95% pilot falliti | Articolo pillar → link a `/metodo` |

### Priorità 2 — verticali di settore (pagine servizio, non solo articoli)

Oggi esistono articoli settoriali (ristorazione, e-commerce, studi professionali)
ma **nessuna pagina servizio per settore**. Gli articoli intercettano ricerca
informazionale; le pagine servizio intercettano chi vuole comprare.

| Settore | Base già presente | Nota |
|---|---|---|
| Manifattura / industria | — | Il verticale italiano più grande, legato agli incentivi |
| Edilizia e costruzioni | Prodotto + caso studio | Asset più forte, ma senza pagina servizio dedicata |
| Studi professionali | Articolo | TeamSystem Studio AI presidia — serve angolo "custom vs suite" |
| Logistica / trasporti | — | **[verificare]** domanda reale |

### Priorità 3 — copertura tecnica da completare

| Termine | Stato |
|---|---|
| Fine-tuning vs RAG | RAG coperto, confronto assente |
| Agenti vocali / centralino AI | Assente — **[verificare]** domanda |
| MCP e interoperabilità fra agenti | Assente, emergente, alto valore GEO |
| AI on-premise vs cloud (sovranità del dato) | Solo accennato in `/sicurezza` |

### Da NON fare

- **"agenzia AI [città]"** — Extra-Web presidia con pagine per città; battaglia
  costosa su un termine indifferenziato che non riflette il posizionamento.
- **Riscrivere gli articoli PMI esistenti** verso l'enterprise: sono 20+ pezzi
  che portano traffico informazionale. Vanno lasciati e collegati, non convertiti.

---

## 6. Piano operativo consigliato

**Settimana 1 — igiene tecnica (poche ore, impatto immediato)**
1. Risolvere la cannibalizzazione homepage / landing (§2.1).
2. Riallineare `keyword-map.md` e `competitor-analysis.md` al posizionamento reale (§2.3).
3. Ripresentare a indicizzazione in Search Console le 3 pagine ancora ferme.

**Settimana 2 — i due contenuti a scadenza**
4. AI Act post-Digital Omnibus (finestra che si chiude).
5. Incentivi e bandi AI 2026 (Voucher aperto ora).

**Settimana 3–4 — i due pillar strategici**
6. "Integrare l'AI nel gestionale che hai già" → il pezzo più allineato al posizionamento.
7. "Perché il tuo pilot AI non arriva in produzione" → la tesi AEDIX, con i dati MIT/PoliMi.

**Mese 2 — verticali**
8. Pagina servizio manifattura, agganciata agli incentivi.
9. Pagina servizio edilizia, agganciata a Edilizia in Cloud.

**Prima di allocare budget:** verificare con Ahrefs/Semrush i volumi dei termini
marcati **[verificare]** e i due pillar di priorità 1. Il resto è sostenuto da
evidenza di mercato o di SERP.

---

## 7. Nota GEO (citazione da parte degli LLM)

Il sito ha già le fondamenta giuste: prerendering statico, JSON-LD per articolo,
`llms.txt` aggiornato. Per essere citato serve ciò che manca ancora:

- **dati proprietari citabili** — un LLM cita numeri che trova solo da te.
  Dopo la rimozione del claim "19.000 imprese", AEDIX non ha più una statistica
  propria. Serve sostituirla con qualcosa di vero e misurato (es. risultati
  aggregati e verificabili dei clienti Edilizia in Cloud);
- **definizioni nette** della categoria "sistema AI ibrido" — già presenti
  nell'articolo pillar, da ripetere in modo coerente su tutte le pagine;
- **risposte esaustive a domande singole** — il formato FAQ già usato negli
  articoli recenti è quello giusto: va esteso alle pagine servizio.
