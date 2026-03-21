

## Piano: Nuove sezioni con dati reali AI, immagini potenti e confronto storico

### Panoramica
Aggiungere 3 nuove sezioni alla homepage tra quelle esistenti, con dati reali sull'impatto dell'AI, un parallelo storico AI vs Social Media, e immagini potenti da Unsplash. Aggiornare anche le sezioni esistenti con immagini di sfondo.

### Nuove sezioni da aggiungere

**A. "La Rivoluzione AI in Numeri" (dopo "I Numeri", prima di "Prima/Dopo")**

Sezione con dati reali e verificabili sull'impatto dell'AI:
- Sfondo con immagine Unsplash di server/data center in overlay scuro (opacity 10%)
- Griglia di 6 dati con icone e source attribution:
  - **$15.7 trilioni** — Impatto economico globale dell'AI entro il 2030 (PwC)
  - **40%** — Aumento produttività media con AI generativa (McKinsey)
  - **97 milioni** — Nuovi posti di lavoro creati dall'AI entro il 2025 (World Economic Forum)
  - **300%** — ROI medio delle aziende che adottano AI (Accenture)
  - **75%** — Delle aziende adotterà AI entro il 2027 (Gartner)
  - **€3.200/mese** — Risparmio medio per PMI con automazione AI (AEDIX internal)
- Ogni dato con counter animato gold grande + label + fonte in monospace piccolo
- Sfondo alternato con immagine tech in overlay

**B. "AI Oggi = Social Media nel 2010" (dopo "Prima/Dopo", prima di "Chi Siamo")**

Parallelo storico potente con timeline visiva:
- Headline: "Chi ha ignorato i social nel 2010 ha perso un decennio. Chi ignora l'AI oggi perderà tutto."
- Tabella/timeline a 2 colonne side-by-side:
  - Colonna sinistra "Social Media 2010": "Sono una moda" → Oggi fatturano $200B/anno | "Non servono alla mia azienda" → Oggi sono il canale #1 | "Costa troppo, non ho tempo" → Chi ha iniziato prima ha vinto
  - Colonna destra "AI 2025": "È troppo complicata" → Si configura in giorni | "Non serve nel mio settore" → Già usata in edilizia, ristorazione, retail | "Aspetto che maturi" → Chi aspetta, perde
- Immagine di sfondo: grafico di crescita esponenziale o network/connections
- CTA in basso: "Non restare indietro. → Parla con noi"

**C. "Il Vantaggio Competitivo dell'AI" (dopo "Chi Siamo", prima di "Progetti")**

Sezione visiva con immagine grande e dati affiancati:
- Layout: immagine a sinistra (50%, Unsplash robot/AI/futuristico con overlay gold), contenuto a destra
- Headline: "Mentre i tuoi competitor dormono, l'AI lavora per te."
- 4 punti con icone animate:
  - **24/7** — I tuoi agenti AI non dormono mai
  - **0 errori umani** — Processi automatizzati = zero dimenticanze
  - **10x velocità** — Preventivi, risposte, report in secondi
  - **−60% costi** — Meno persone per le stesse attività
- Ogni punto con barra di progresso animata che si riempie al scroll

### Immagini

Usare immagini Unsplash via URL diretto (no download):
- Hero: aggiungere immagine di sfondo tech/futuristica con overlay scuro
- Sezione AI Numeri: `https://images.unsplash.com/photo-1558494949-ef010cbdcc31` (data center)
- Sezione AI vs Social: `https://images.unsplash.com/photo-1451187580459-43490279c0fa` (network globale)
- Sezione Vantaggio: `https://images.unsplash.com/photo-1677442136019-21780ecad995` (AI abstract)
- Chi Siamo: aggiungere immagine team/ufficio tech come sfondo sottile

### Modifiche alle sezioni esistenti

- **Hero**: aggiungere immagine di sfondo futuristica con overlay 90% opacità del navy
- **Progetti**: aggiungere un'immagine piccola/icona per ogni card progetto
- **CTA Finale**: aggiungere immagine di sfondo con overlay scuro e glow piu intenso

### File coinvolti
- `src/pages/Index.tsx` — 3 nuove sezioni + immagini di sfondo nelle sezioni esistenti

### Ordine finale sezioni
1. Navbar
2. Hero (con immagine sfondo)
3. Cosa Facciamo
4. I Numeri
5. **La Rivoluzione AI in Numeri** (NUOVA)
6. Prima/Dopo
7. **AI Oggi = Social Media nel 2010** (NUOVA)
8. Chi Siamo
9. **Il Vantaggio Competitivo dell'AI** (NUOVA)
10. I Nostri Progetti
11. Come Lavoriamo
12. Social Proof
13. CTA Finale (con immagine sfondo)
14. Footer

