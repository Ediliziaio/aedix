

## Piano: Fix Performance — Homepage troppo lenta

### Problema identificato

La homepage ha 3 canvas animati + cursore custom + floating badges che girano tutti contemporaneamente con `requestAnimationFrame`, causando lag pesante:

1. **ParticleField** (il piu grave) — Canvas grande quanto l'INTERA pagina scrollabile (migliaia di pixel di altezza), moltiplicato per `devicePixelRatio`. Ogni frame: cancella tutto, ridisegna 70 particelle, calcola O(n²) = 2.415 connessioni tra particelle. Su un canvas di ~10.000+ pixel di altezza a 2x DPR, questo e' devastante.

2. **HexagonCanvas** — Griglia di esagoni ridisegnata ogni frame con calcoli trigonometrici. Meno grave ma si somma.

3. **CustomCursor** — Loop lerp continuo (impatto minore).

4. **FloatingBadge** x4 — Animazioni Framer Motion infinite in loop.

5. **FadeIn e SectionDivider** — Warning React `forwardRef` (non causa lag ma indica un problema).

### Soluzione

**File: `src/pages/Index.tsx`**

1. **ParticleField — Ottimizzazione drastica**:
   - Canvas limitato alla viewport (`window.innerHeight`) anziche' all'intera pagina
   - Ridurre particelle da 70 a 40
   - Ridurre `MAX_DIST` da 150 a 100 (meno connessioni)
   - Usare `position: fixed` (gia' fa) ma dimensionare il canvas solo come la viewport
   - Aggiungere throttle: disegnare ogni 2 frame (`skipFrame` counter)

2. **HexagonCanvas — Ottimizzazione**:
   - Ridurre la frequenza di animazione (disegnare ogni 2-3 frame)
   - Ridurre `time += 0.003` cosi' il ridisegno meno frequente non si nota

3. **FloatingBadge — Semplificare**:
   - Sostituire `motion.div` con animazione CSS pura (`@keyframes float`) — molto piu' leggero di Framer Motion per animazioni infinite

4. **FadeIn — Fixare forwardRef warning**:
   - Il componente FadeIn usa `motion.div` con `ref` correttamente, ma quando viene usato dentro certi contesti Framer Motion tenta di passare un ref. Nessun impatto performance ma pulire il warning.

### Impatto atteso
- Da 3 canvas pesanti in loop continuo a 2 canvas ottimizzati con frame skipping
- Riduzione del carico GPU/CPU del ~60-70%
- Scrolling fluido senza scatti

