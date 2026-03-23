

## Piano: Migliorare UX + aggiungere immagini AI nelle pagine Servizi, Progetti, Perché Noi

### Problemi attuali
- Le 3 pagine sono solo testo + icone Lucide — visivamente piatte, mancano immagini
- Progetti.tsx ha ancora testo "Marketing a performance" (bug non fixato)
- PercheNoi ha ancora "Lavoriamo a performance" nei valori
- Le sezioni sono funzionali ma mancano di impatto visivo

### Modifiche per pagina

**1. Servizi (`src/pages/Servizi.tsx`)**
- Hero: aggiungere immagine Unsplash di sfondo (tech/AI) con overlay scuro 90%
- Ogni pilastro: aggiungere immagine Unsplash tematica nella colonna features (sopra la lista), con bordo gold sottile e rounded corners
  - SaaS: `photo-1460925895917-afdab827c52f` (dashboard)
  - AI: `photo-1677442136019-21780ecad995` (AI abstract)
  - Marketing: `photo-1460925895917-afdab827c52f` (analytics)
  - Consulenza: `photo-1552664730-d307ca884978` (team meeting)
- Tabella comparativa: aggiungere icone check/X per rendere più scannable
- "Come iniziare": aggiungere linea di connessione tra i 3 step

**2. Progetti (`src/pages/Progetti.tsx`)**
- Fix bug: "Marketing a performance" → descrizione corretta
- Hero: aggiungere immagine sfondo con overlay
- Ogni card progetto: aggiungere immagine Unsplash piccola (aspect ratio 16:9) sopra il contenuto, con overlay del colore brand
  - Edilizia in Cloud: `photo-1504307651254-35680f356dfd` (cantiere)
  - Cantiere in Cloud: `photo-1581094794329-c8112a89af12` (safety)
  - Edilizia.io: `photo-1485827404703-89b55fcc595e` (robot)
  - Marketing Edile: `photo-1533750349088-cd871a92f312` (marketing)
  - Vendita Edile: `photo-1556745757-8d76bdb6984b` (sales)
  - TalentProfile: `photo-1573497019940-1c28c88b4f3e` (people)
  - Impresa Leggera: `photo-1554224155-8d04cb21cd6c` (office)
- Aggiungere sezione "Come funziona l'ecosistema" con schema visivo (3 blocchi connessi: Input → AI Processing → Output)

**3. Perché Noi (`src/pages/PercheNoi.tsx`)**
- Fix: valore "Partner, non fornitore" → rimuovere "Lavoriamo a performance"
- Hero: layout split — testo a sinistra, immagine AI/futuristica a destra con glow gold
- Timeline: aggiungere immagini piccole accanto a ogni milestone
- Manifesto: migliorare con gradient overlay più drammatico
- Aggiungere sezione "Tecnologie che usiamo" con loghi/badge (OpenAI, Supabase, React, AWS) — icone stilizzate in griglia

### File coinvolti
- `src/pages/Servizi.tsx`
- `src/pages/Progetti.tsx`
- `src/pages/PercheNoi.tsx`

