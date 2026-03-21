

## Piano: Riscrittura completa copy e sezioni Index.tsx

### Problema
Il file `src/pages/Index.tsx` contiene ancora tutto il contenuto vecchio (imprese edili, servizi web, portfolio costruzioni, recensioni, pricing). Deve essere riscritto interamente con il copy AEDIX tech company.

### Cosa cambia

**Un solo file**: `src/pages/Index.tsx` — riscrittura completa (~1400 righe)

Il design system (CSS, Tailwind, font) e' gia' stato aggiornato correttamente nel messaggio precedente. Si tratta solo di riscrivere il componente React.

### Struttura del nuovo file

Componenti helper interni:
- `AnimatedCounter` — conta da 0 al valore finale con Framer Motion
- `FadeIn` — wrapper con animazione scroll-triggered (translateY 50px, cubic-bezier)
- `SectionDivider` — gradiente gold trasparente
- `HexagonCanvas` — canvas animato con pattern geometrico nella hero

Sezioni in ordine:
1. **Navbar** — fixed, backdrop-blur, logo immagine, 3 link centrali, CTA gold, hamburger mobile
2. **Hero** — overline JetBrains Mono + H1 con "e le Persone." italic gold + sottotitolo con highlight + 2 CTA + barra 3 numeri animati + glow radiale + HexagonCanvas
3. **Cosa Facciamo** — griglia 2x2, 4 card con icone SVG gold inline (SaaS, AI, Marketing, Consulenza)
4. **I Numeri** — sfondo alt, 4 stats gold con counter animato (7 piattaforme, 11 agenti, 44 workflow, 8+ anni)
5. **Prima/Dopo** — tabella 3 colonne (oggi barrato rosso, con AEDIX, impatto verde), 5 righe
6. **Chi Siamo** — 2 colonne: manifesto con bold highlights + quote border-left gold
7. **I Nostri Progetti** — sfondo alt, griglia 3 col, 7 card con colori brand individuali e hover colorato
8. **Come Lavoriamo** — timeline 4 step orizzontale/verticale con numeri gold e linea connessione
9. **Social Proof** — sfondo alt, 3 badge trust centrati con icone SVG gold
10. **CTA Finale** — headline grande + glow + 2 CTA
11. **Footer** — logo + copyright Domus Group

Tutto il copy esatto come specificato nel prompt. Divider tra ogni sezione. Framer Motion per tutte le animazioni.

### Cosa viene rimosso
Tutti i dati vecchi: companies, services, projects, blogPosts, whyUs, steps, reviews, stats, offerFeatures, bonuses, FAQ, pricing, immagini di costruzioni.

