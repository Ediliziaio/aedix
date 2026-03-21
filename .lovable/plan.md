

## Piano: Riscrittura completa Homepage AEDIX — Tech Company

### Panoramica
Riscrivere completamente `src/pages/Index.tsx` e aggiornare gli stili/font per trasformare il sito da "agenzia web per imprese edili" a "tech company italiana per PMI". Il file attuale (~1418 righe) verrà sostituito interamente.

### File coinvolti

1. **`index.html`** — Aggiornare Google Fonts: rimuovere Sora/Syne/Plus Jakarta Sans, aggiungere DM Sans + JetBrains Mono + Space Grotesk
2. **`src/index.css`** — Nuovo design system: colori navy/gold, grain overlay, selection color, divider, scrollbar, animazioni scroll, hover card effects
3. **`tailwind.config.ts`** — Aggiornare font families, colori custom (navy, gold, verde impatto), animazioni
4. **`src/pages/Index.tsx`** — Riscrittura completa con le 9 sezioni + navbar + footer

### Struttura nuova Index.tsx

Il file conterrà:

- **Componenti helper**: `AnimatedCounter` (già presente, da adattare), `FadeIn` (con cubic-bezier custom e delay progressivo), `SectionDivider` (gradiente gold), `HexagonCanvas` (pattern geometrico animato nella hero)
- **Navbar** — Fixed, backdrop-blur, logo AEDIX (immagine caricata), 3 link centrali, CTA "Contattaci" gold
- **Sezione 1 — Hero** — Overline + H1 gigante + sottotitolo + 2 CTA + barra 3 numeri animati + glow radiale + pattern esagonale canvas
- **Sezione 2 — Cosa Facciamo** — Griglia 2x2 con 4 card (SaaS, AI, Marketing, Consulenza), icone SVG gold, hover con barra gold
- **Sezione 3 — I Numeri** — Sfondo alternato, 4 stats in riga con counter animati gold
- **Sezione 4 — Prima/Dopo** — Tabella comparativa 3 colonne (Oggi barrato rosso / Con AEDIX / Impatto verde)
- **Sezione 5 — Chi Siamo** — 2 colonne: manifesto a sinistra + quote con border-left gold a destra
- **Sezione 6 — I Nostri Progetti** — 7 card griglia con colori brand individuali per ogni progetto
- **Sezione 7 — Come Lavoriamo** — Timeline 4 step orizzontale (desktop) / verticale (mobile) con linea animata
- **Sezione 8 — Social Proof** — 3 badge trust centrati con icone SVG gold
- **Sezione 9 — CTA Finale** — Headline grande + glow radiale + 2 CTA
- **Footer** — Logo + copyright Domus Group S.r.l.

### Design system (CSS/Tailwind)

- Colori: `--background: #0A1322`, `--background-alt: #0D1A2D`, `--gold: #F6BE09`, `--gold-light: #E4BC39`, `--green: #10B981`
- Font: Space Grotesk (headlines), DM Sans (body), JetBrains Mono (monospace/tag/numeri)
- Grain overlay via SVG noise filter su `::before` del body
- Selection color gold su testo scuro
- Divider tra sezioni: gradiente `transparent → gold 20% → transparent`
- Animazioni scroll: `translateY(50px) → 0`, easing `cubic-bezier(0.16, 1, 0.3, 1)`, 0.8s, delay progressivo 0.08s
- Hover card: lift -3px, background schiarimento, barra gold 2px top con `scaleX(0→1)`

### Dettagli tecnici

- Framer Motion (già installato) per tutte le animazioni scroll-triggered via `useInView`
- Canvas HTML5 o SVG per pattern esagonale animato nella hero (linee gold trasparenti che si muovono lentamente)
- `Intersection Observer` tramite Framer Motion per counter animati e fade-in
- Responsive mobile-first con breakpoint 768px e 1024px
- Smooth scroll con `scroll-behavior: smooth`
- Le immagini degli asset vecchi (service-construction, blog, ecc.) non serviranno più — solo il logo AEDIX

### Cosa viene rimosso

Tutti i contenuti del vecchio sito "ClientiEdili/AEDIX per edilizia": ticker, services cards con immagini, portfolio con immagini, blog, reviews carousel, pricing/offerta, FAQ accordion, WhatsApp button, before/after con immagini.

