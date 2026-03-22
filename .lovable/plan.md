

## Piano: Fix FAQ e riferimenti errati

### Problemi identificati

1. **FAQ troppo focalizzate sull'edilizia** — Le FAQ nella homepage, Contatti e Servizi menzionano spesso "imprese edili", "serramentisti", "cantiere", dando l'impressione che AEDIX lavori solo nell'edilizia. Vanno rese più generiche per tutte le PMI.

2. **"Marketing a performance" è sbagliato** — In più punti il sito dice "lavoriamo a performance", "paghi solo sulle vendite chiuse", "a commissione". Questo va corretto in tutte le pagine.

### File e modifiche

**`src/pages/Index.tsx`** (FAQ sezione + servizi + progetti)
- FAQ "Funziona anche nel mio settore?" → rimuovere lista "imprese edili, serramentisti, impiantisti" e generalizzare
- FAQ "E se non funziona?" → rimuovere "modello di marketing è a performance: paghi solo sulle vendite chiuse"
- Servizio "Marketing & Vendita a Performance" → rinominare (es. "Marketing & Vendita Digitale") e riscrivere descrizione senza "a performance/commissione"
- Card progetti: "Marketing Edile" desc → rimuovere "a performance. Paghi solo sulle vendite chiuse"
- Social proof badge "Performance-based: se non funziona, non ci paghi" → riscrivere

**`src/pages/Contatti.tsx`** (FAQ)
- "Il marketing è a performance (paghi solo sulle vendite)" → correggere
- "Il marketing a performance parte entro 2 settimane" → correggere
- "marketing a performance si applicano a qualsiasi PMI" → correggere
- "il marketing è a performance — se non vendi, non ci paghi" → correggere

**`src/pages/Servizi.tsx`** (pilastro + tabella + FAQ)
- Pilastro "Marketing & Vendita a Performance" → rinominare e riscrivere
- Riga tabella "Marketing: A performance" → correggere
- FAQ "Come funziona il marketing a performance?" → riscrivere
- FAQ "Quanto costa iniziare?" → rimuovere "Il marketing è a performance"
- FAQ "il marketing a performance è per definizione senza rischio" → correggere

**`src/pages/ProgettoDettaglio.tsx`** (progetto Marketing Edile)
- Descrizione e FAQ del progetto Marketing Edile → rimuovere riferimenti a performance

### Sostituzione contenuti

Dove dice "a performance / paghi solo sulle vendite" → sostituire con modello reale (es. "pacchetti su misura", "canone mensile + gestione campagne", "ROI misurabile", o qualsiasi sia il vero modello di business). Se preferisci posso usare un testo generico tipo "investimento calibrato sui tuoi obiettivi" finché non mi indichi il modello corretto.

Dove le FAQ sono troppo edilizia-centriche → generalizzare con "PMI italiane di qualsiasi settore" senza elenchi specifici di settori.

