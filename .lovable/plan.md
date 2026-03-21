

## Piano: Effetto WOW — Animazioni avanzate, immagini, cursore custom

### Panoramica
Aggiungere effetti visivi spettacolari alla homepage AEDIX per creare un impatto "WOW": cursore custom animato, particelle fluttuanti, logo piu grande, glitch/typing effects, glow pulsanti, e immagini tech di sfondo nelle sezioni.

### Modifiche a `src/pages/Index.tsx`

**1. Logo piu grande nella Navbar e Footer**
- Navbar: da `h-8` a `h-12` (48px)
- Footer: da `h-6` a `h-10` (40px)

**2. Cursore custom animato**
- Componente `CustomCursor`: cerchio gold che segue il mouse con ritardo (lerp), si espande al hover sui bottoni/link
- Nascosto su mobile (touch devices)
- `cursor: none` globale su desktop
- Cerchio esterno 40px con bordo gold + punto interno 8px gold pieno
- Effetto magnetico: il cursore si ingrandisce e cambia opacita passando su elementi interattivi

**3. Particelle fluttuanti (ParticleField)**
- Canvas a schermo intero con 80-100 particelle gold semitrasparenti
- Le particelle si muovono lentamente e si connettono con linee quando sono vicine (effetto neural network)
- Posizionato come sfondo fisso dietro tutta la pagina
- Opacita molto bassa (0.15) per non interferire col contenuto

**4. Hero — Effetti aggiuntivi**
- Typing effect sull'overline "Tecnologia Avanzata per le PMI Italiane" (lettere che appaiono una alla volta)
- Glow pulsante animato dietro l'H1 (pulse lento con scale e opacity)
- Floating badges/chips animati attorno alla hero: "SaaS", "AI", "Automation", "Cloud" che fluttuano con moto sinusoidale

**5. Sezione Progetti — Icone/immagini tech**
- Aggiungere emoji/icone grandi (48px) sopra ogni nome progetto nelle card:
  - Edilizia in Cloud: cloud icon
  - Cantiere in Cloud: hard hat/shield
  - Edilizia.io: robot/AI brain
  - Marketing Edile: chart/rocket
  - Vendita Edile: handshake/target
  - TalentProfile: user/scan
  - Impresa Leggera: briefcase/lightning

**6. Sezione Numeri — Effetto glow sui numeri**
- I numeri gold ottengono un `text-shadow` pulsante con glow gold
- Animazione `@keyframes glow-pulse` che oscilla l'intensita del glow

**7. Timeline — Linea animata**
- La linea di connessione orizzontale si "disegna" da sinistra a destra quando entra in viewport (width da 0% a 100%)
- I numeri hanno un bordo cerchio gold che appare con scale animation

**8. CTA Finale — Effetti extra**
- Glow piu intenso e pulsante
- Shimmer effect sul bottone primario (gradiente che scorre da sinistra a destra)

### Modifiche a `src/index.css`

- Aggiungere `cursor: none` su body per desktop (`@media (hover: hover)`)
- Keyframes per `glow-pulse`, `shimmer`, `float`
- Classe `.shimmer-btn` per il bottone CTA con gradiente animato

### File coinvolti
- `src/pages/Index.tsx` — nuovi componenti (CustomCursor, ParticleField, FloatingBadge, typing effect) + logo sizing + icone progetti
- `src/index.css` — nuove animazioni CSS (glow-pulse, shimmer, float, cursor)

### Dipendenze
- Nessuna nuova — tutto con Framer Motion (gia installato) + Canvas API + CSS

