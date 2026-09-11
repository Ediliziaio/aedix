/**
 * Parametri di campagna per il form Edilizia in Cloud incorporato.
 *
 * Il form vive in un iframe su app.ediliziaincloud.com e il browser non gli
 * lascia vedere l'indirizzo di questa pagina: UTM, gclid e fbclid arrivano al
 * CRM solo se li aggiungiamo noi all'indirizzo del form. E vanno ricordati
 * dall'atterraggio: chi arriva da un annuncio sulla home e poi apre
 * "Contatti" non ha più i parametri nell'indirizzo.
 */
const CHIAVI = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "wbraid", "gbraid", "fbclid", "ttclid", "msclkid", "li_fat_id",
] as const;
const CHIAVE_STORAGE = "eic_parametri_campagna";
/** Oltre questa età i parametri non si attribuiscono più (finestra tipica degli annunci). */
const DURATA_MS = 30 * 24 * 60 * 60 * 1000;

/** Salva i parametri dell'indirizzo corrente. Ultimo clic vince: un nuovo annuncio sovrascrive. */
export function salvaParametriCampagna(): void {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const trovati: Record<string, string> = {};
    for (const k of CHIAVI) {
      const v = qs.get(k);
      if (v) trovati[k] = v.slice(0, 300);
    }
    if (Object.keys(trovati).length === 0) return;
    localStorage.setItem(CHIAVE_STORAGE, JSON.stringify({ t: Date.now(), p: trovati }));
  } catch {
    /* storage bloccato: il form funziona lo stesso, senza campagna */
  }
}

function parametriSalvati(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CHIAVE_STORAGE);
    if (!raw) return {};
    const { t, p } = JSON.parse(raw) as { t?: number; p?: Record<string, string> };
    if (!t || Date.now() - t > DURATA_MS) return {};
    return p ?? {};
  } catch {
    return {};
  }
}

/** Indirizzo del form con i parametri di campagna in coda. */
export function urlFormConCampagna(base: string): string {
  if (typeof window === "undefined") return base;
  salvaParametriCampagna();
  const extra = Object.entries(parametriSalvati())
    .filter(([k]) => !new RegExp(`[?&]${k}=`).test(base))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  return extra.length ? `${base}${base.includes("?") ? "&" : "?"}${extra.join("&")}` : base;
}
