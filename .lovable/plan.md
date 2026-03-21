

## Piano: Aggiungere "Articoli" al menu + creare pagina Articoli + ottimizzare pagine esistenti

### 1. Navbar — aggiungere sezioni mancanti

Attualmente il menu ha solo 3 link: "Cosa Facciamo", "Progetti", "Perché Noi?". Manca "Articoli".

**File: `src/components/Navbar.tsx`**
- Aggiungere `{ label: "Articoli", to: "/articoli" }` ai `navLinks`

### 2. Creare pagina Articoli (`src/pages/Articoli.tsx`)

Pagina blog con 6-8 articoli hardcoded su AI, PMI, automazione. Ogni articolo con:
- Immagine Unsplash, titolo, categoria (tag), data, excerpt
- Card cliccabili verso `/articoli/:slug`
- Filtro per categoria (Tutti, AI, PMI, Automazione, Marketing)

**File: `src/pages/ArticoloDettaglio.tsx`**
- Pagina singolo articolo con contenuto lungo hardcoded
- Layout: hero con immagine, titolo, data, autore → corpo articolo con paragrafi, citazioni, CTA finale

### 3. Aggiornare routing

**File: `src/App.tsx`**
- Aggiungere route `/articoli` e `/articoli/:slug`

### 4. Aggiornare Footer

**File: `src/components/Footer.tsx`**
- Aggiungere link "Articoli" nella colonna "Azienda"

### 5. Ottimizzare pagine esistenti

**Contatti (`src/pages/Contatti.tsx`)**:
- Aggiungere sezione FAQ sotto il form ("Quanto costa?", "Quanto ci vuole?", "Siete affidabili?")
- Aggiungere mappa/embed placeholder o indirizzo completo
- Aggiungere social proof: "Rispondiamo entro 4 ore in media"

**Perché Noi (`src/pages/PercheNoi.tsx`)**:
- Aggiungere sezione "I Numeri" con 4 stat counter (7 piattaforme, 11 agenti, 44 workflow, 8+ anni)
- Aggiungere sezione clienti/settori serviti con icone
- Aggiungere CTA finale con glow prima del footer

**Servizi (`src/pages/Servizi.tsx`)**:
- Aggiungere sezione FAQ specifica sui servizi (6 domande)
- Aggiungere sezione "Come iniziare" con 3 step (Parla con noi → Configurazione → Risultati)
- Aggiungere testimonial/social proof placeholder

**Progetti (`src/pages/Progetti.tsx`)**:
- Aggiungere sezione "L'ecosistema in numeri" con stat (7 piattaforme, 44 workflow, etc.)
- Aggiungere CTA finale

**ProgettoDettaglio (`src/pages/ProgettoDettaglio.tsx`)**:
- Aggiungere sezione "Progetti correlati" con 2-3 card degli altri progetti
- Aggiungere sezione FAQ specifica per ogni progetto
- Aggiungere screenshot/mockup placeholder

### File coinvolti
- `src/components/Navbar.tsx` — aggiungere link Articoli
- `src/components/Footer.tsx` — aggiungere link Articoli
- `src/App.tsx` — nuove route
- `src/pages/Articoli.tsx` — nuova pagina (lista articoli)
- `src/pages/ArticoloDettaglio.tsx` — nuova pagina (singolo articolo)
- `src/pages/Contatti.tsx` — FAQ + social proof
- `src/pages/PercheNoi.tsx` — numeri + settori + CTA
- `src/pages/Servizi.tsx` — FAQ + onboarding steps + social proof
- `src/pages/Progetti.tsx` — stat + CTA
- `src/pages/ProgettoDettaglio.tsx` — progetti correlati + FAQ

### Ordine di implementazione
1. Navbar + Footer (link Articoli)
2. App.tsx (route)
3. Articoli.tsx + ArticoloDettaglio.tsx
4. Ottimizzazione Contatti
5. Ottimizzazione Perché Noi
6. Ottimizzazione Servizi
7. Ottimizzazione Progetti + ProgettoDettaglio

