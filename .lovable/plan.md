

## Piano: Creazione pagine + estrazione componenti condivisi

### Panoramica
Creare tutte le pagine del sito AEDIX, estrarre Navbar e Footer come componenti condivisi, e aggiornare il routing. "Chi Siamo" diventa "Perché Noi?".

### File da creare/modificare

**1. Estrazione componenti condivisi**

- `src/components/Navbar.tsx` — Estrarre la navbar da Index.tsx (righe 628-706) in componente autonomo. Aggiungere supporto per navigazione tra pagine (react-router `Link`) oltre allo scroll interno. I link centrali diventano: "Cosa Facciamo" → `/servizi`, "Progetti" → `/progetti`, "Perché Noi?" → `/perche-noi`. CTA "Contattaci" → `/contatti`.
- `src/components/Footer.tsx` — Estrarre il footer espanso (ultime ~60 righe) con le 4 colonne. Aggiornare i link per puntare alle pagine reali.
- `src/components/Layout.tsx` — Wrapper con Navbar + children + Footer, usato da tutte le pagine.

**2. Aggiornare `src/pages/Index.tsx`**
- Rimuovere navbar e footer inline, importare `Layout`
- Aggiornare `navSections` per usare "Perché Noi?" al posto di "Chi Siamo"
- Aggiornare la sezione `id="chi-siamo"` in `id="perche-noi"` e rinominare il titolo

**3. Nuove pagine**

- **`src/pages/Contatti.tsx`** (`/contatti`)
  - Form contatto: nome, email, telefono, settore (select), messaggio
  - Design coerente: sfondo navy, card form con bordo gold, CTA gold
  - Info contatto a fianco: email, telefono, sede
  - Validazione frontend con feedback visivo (toast)

- **`src/pages/PerchéNoi.tsx`** (`/perche-noi`)
  - Sezione hero con headline "Perché scegliere AEDIX?"
  - Timeline aziendale: 2016 → 2026 con milestone
  - Sezione valori/mission con 4 pilastri
  - Sezione team placeholder (3-4 card con avatar placeholder, ruolo, bio breve)
  - Quote/manifesto full-width

- **`src/pages/Servizi.tsx`** (`/servizi`)
  - Hero con headline
  - 4 sezioni dettagliate per ogni pilastro (SaaS, AI, Marketing, Consulenza)
  - Ogni pilastro: icona, titolo, descrizione lunga, lista feature (3-5 punti), CTA
  - Tabella comparativa "Tradizionale vs AEDIX"

- **`src/pages/Progetti.tsx`** (`/progetti`)
  - Griglia delle 7 piattaforme con card colorate (stesse di Index)
  - Ogni card cliccabile verso dettaglio

- **`src/pages/ProgettoDettaglio.tsx`** (`/progetti/:slug`)
  - Hero con colore brand del progetto
  - Descrizione estesa, feature list, use case
  - CTA dedicata "Richiedi Demo"
  - Dati dei 7 progetti hardcoded

- **`src/pages/Privacy.tsx`** (`/privacy`)
  - Testo placeholder privacy policy

- **`src/pages/Termini.tsx`** (`/termini`)
  - Testo placeholder termini e condizioni

**4. Aggiornare `src/App.tsx`**
- Importare tutte le nuove pagine
- Aggiungere route: `/contatti`, `/perche-noi`, `/servizi`, `/progetti`, `/progetti/:slug`, `/privacy`, `/termini`

### Design coerente
Tutte le pagine usano lo stesso design system: sfondo navy, testi bianchi con opacita' corrette, accent gold, font Space Grotesk per headline, DM Sans per body, JetBrains Mono per monospace. Animazioni fade-in con Framer Motion. ScrollProgressBar in ogni pagina tramite Layout.

### Ordine di implementazione
1. Componenti condivisi (Navbar, Footer, Layout)
2. Aggiornamento Index.tsx (rimuovere navbar/footer, rinominare Chi Siamo)
3. App.tsx con tutte le route
4. Pagina Contatti
5. Pagina Perché Noi
6. Pagina Servizi
7. Pagina Progetti + ProgettoDettaglio
8. Pagine legali (Privacy, Termini)

