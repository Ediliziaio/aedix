

## Piano: Sostituire il logo con il nuovo (AEDIX)

### Cosa cambia
Il logo attuale (`clientiedili_dark.png`) viene usato in 2 punti di `src/pages/Index.tsx`:
- **Navbar** (riga 265)
- **Footer** (riga 1289)

### Passaggi

1. **Copiare** l'immagine caricata (`Progetto_senza_titolo_12.png`) in `src/assets/aedix_logo.png`

2. **Aggiornare `src/pages/Index.tsx`**:
   - Cambiare l'import da `clientiedili_dark.png` a `aedix_logo.png`
   - Aggiornare gli `alt` text e i riferimenti testuali ("ClientiEdili" → "AEDIX") in tutto il file:
     - Navbar logo
     - Footer logo
     - Sezione comparativa ("Senza ClientiEdili" / "Con ClientiEdili")
     - Info contatto (email, copyright)
     - Qualsiasi altro testo che menziona "ClientiEdili"

### File coinvolti
- `src/assets/aedix_logo.png` (nuovo file)
- `src/pages/Index.tsx` (aggiornamento import + testi)

