

## Piano: Testi più leggibili + sezioni mancanti

### 1. Fix leggibilità testi

Il problema: molti testi usano `rgba(255,255,255,0.3)`, `0.35`, `0.4`, `0.45` — troppo scuri sul navy. L'occhio fa fatica.

**Sostituzione globale in `src/pages/Index.tsx`**:
- `rgba(255,255,255,0.3)` → `rgba(255,255,255,0.55)` (label piccole, stat labels)
- `rgba(255,255,255,0.35)` → `rgba(255,255,255,0.6)` (testo barrato tabella)
- `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.65)` (sottotitoli, descrizioni)
- `rgba(255,255,255,0.45)` → `rgba(255,255,255,0.7)` (body text, card descriptions, nav links)

In pratica: alzare ogni opacità di circa +0.25 per rendere tutto più leggibile mantenendo la gerarchia visiva.

### 2. Sezioni che mancano (suggerimenti)

Il sito attuale ha: Hero, Cosa Facciamo, I Numeri, AI Revolution, Prima/Dopo, AI vs Social, Chi Siamo, Vantaggio Competitivo, Progetti, Come Lavoriamo, Social Proof, CTA, Footer.

Sezioni che un sito tech company serio dovrebbe avere e che mancano:

- **FAQ** — Domande frequenti su AI, costi, tempi, come funziona. Riduce l'attrito pre-contatto. Accordion con 6-8 domande.
- **Testimonial / Case Study** — Risultati concreti ottenuti con clienti reali (anche anonimi). Numeri + citazione. Dà credibilità.
- **Team / Founder** — Chi c'è dietro AEDIX. Foto, ruolo, una riga. Un investitore vuole vedere le facce.
- **Partner / Tecnologie** — Loghi delle tecnologie usate (OpenAI, Supabase, AWS, ecc.) o partner. Dà autorevolezza.
- **Blog / Risorse** — Link a contenuti, guide, articoli. Posizionamento SEO e thought leadership.

Vuoi che implementi il fix leggibilità e aggiunga alcune di queste sezioni? Dimmi quali ti interessano.

### File coinvolti
- `src/pages/Index.tsx` — aggiornamento opacità testi + eventuali nuove sezioni

