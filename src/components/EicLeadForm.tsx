import { useEffect, useRef, useState, type CSSProperties } from "react";
import { urlFormConCampagna } from "@/lib/eicForm";

const ORIGINE = "https://app.ediliziaincloud.com";

interface EicLeadFormProps {
  /** Slug del form nel Form Builder di Edilizia in Cloud. */
  slug: string;
  companyId?: string;
  title?: string;
  /** Altezza iniziale, finché il form non comunica la sua. */
  height?: number;
  /** Carica subito dove il form è l'elemento principale della pagina. */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Form di Edilizia in Cloud incorporato: i lead arrivano nel CRM con la
 * campagna di provenienza (UTM, gclid, fbclid) e l'altezza segue quella del
 * form, senza barre di scorrimento interne su mobile.
 *
 * L'iframe si monta nel browser: l'indirizzo con i parametri esiste solo lì,
 * e costruirlo nel prerender darebbe un HTML diverso da quello idratato.
 */
export function EicLeadForm({
  slug,
  companyId = "00000000-0000-0000-0000-000000000001",
  title = "Richiedi informazioni",
  height = 640,
  eager = false,
  className,
  style,
}: EicLeadFormProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [altezza, setAltezza] = useState(height);

  useEffect(() => {
    setSrc(urlFormConCampagna(`${ORIGINE}/f?slug=${encodeURIComponent(slug)}&company_id=${encodeURIComponent(companyId)}`));
  }, [slug, companyId]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGINE || e.source !== ref.current?.contentWindow) return;
      const d = e.data as { type?: string; height?: number } | null;
      if (d?.type !== "eic-lead-form-height" || typeof d.height !== "number") return;
      setAltezza(Math.max(360, Math.min(2600, Math.ceil(d.height) + 16)));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const base: CSSProperties = { width: "100%", maxWidth: 640, margin: "0 auto", display: "block", border: 0 };
  if (!src) return <div className={className} style={{ ...base, minHeight: height, ...style }} aria-hidden="true" />;
  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading={eager ? "eager" : "lazy"}
      referrerPolicy="strict-origin-when-cross-origin"
      className={className}
      style={{ ...base, height: altezza, ...style }}
    />
  );
}
