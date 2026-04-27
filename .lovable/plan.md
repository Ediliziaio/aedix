

## Piano: Animazioni avanzate — Parallax + Micro-interazioni

### Cosa faremo

Aggiungere parallax scrolling sulle immagini hero di tutte le pagine e micro-interazioni sulle card (tilt 3D, glow on hover, stagger animations).

### Modifiche

**1. Componente `ParallaxImage` condiviso**
- Creare un componente riutilizzabile che usa `useScroll` + `useTransform` di Framer Motion per muovere le immagini di sfondo a velocita diversa dallo scroll (effetto parallax)
- Usato nelle hero section di Index, Servizi, Progetti, PercheNoi, Articoli, Contatti

**2. Card con effetto 3D tilt + glow**
- Componente `TiltCard` che traccia la posizione del mouse e applica `rotateX/rotateY` con `perspective`
- Glow radiale che segue il cursore sulla card
- Applicato a: card progetti (Progetti.tsx), card servizi (Servizi.tsx), card articoli (Articoli.tsx), card valori (PercheNoi.tsx)

**3. Stagger animations migliorate**
- Le griglie di card usano `staggerChildren` con varianti Framer Motion invece di delay manuali
- Effetto "cascade" piu fluido sulle griglie

**4. Micro-interazioni specifiche**
- Icone nelle card: leggera rotazione + scale al hover della card parent
- Tag/badge: slide-in da destra con delay
- Stat counter: bounce finale dopo il conteggio
- CTA buttons: effetto magnetic (si avvicinano leggermente al cursore)
- Immagini card: zoom lento continuo (ken burns) + accelerazione al hover

### File coinvolti
- `src/components/ParallaxImage.tsx` — nuovo componente
- `src/components/TiltCard.tsx` — nuovo componente  
- `src/pages/Index.tsx` — parallax hero + tilt cards
- `src/pages/Servizi.tsx` — parallax hero + tilt pillar cards
- `src/pages/Progetti.tsx` — parallax hero + tilt project cards
- `src/pages/PercheNoi.tsx` — parallax hero + tilt value cards
- `src/pages/Articoli.tsx` — tilt article cards
- `src/pages/Contatti.tsx` — parallax hero

