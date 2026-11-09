import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { splitEditorialParagraphs, renderEditorialInline } from "./editorialText";

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
describe("editorial text", () => {
  it("does not lose unfinished final sentences, decimals, URLs or paragraph boundaries", () => {
    for (const source of [
      "Prima frase. La parte finale non ha un punto",
      "Valore 20.5. Fonte https://example.com/documento. Ultimo riferimento",
      "Testo senza punteggiatura",
      ("Un periodo completo. ").repeat(80) + "Conclusione da conservare",
      "Primo paragrafo\n\nSecondo paragrafo senza punto",
    ]) expect(normalize(splitEditorialParagraphs(source).join(" "))).toBe(normalize(source));
    expect(splitEditorialParagraphs("Prima parte\n\nSeconda parte")).toEqual(["Prima parte", "Seconda parte"]);
  });
  it("renders real crawlable links while retaining literal unsafe markup as escaped text", () => {
    const result = renderToStaticMarkup(<p>{renderEditorialInline('[Guida](/articoli/guida) e [Fonte](https://example.com/fonte) [No](javascript:alert) <script>')}</p>);
    expect(result).toContain('href="/articoli/guida"');
    expect(result).toContain('href="https://example.com/fonte"');
    expect(result).not.toContain('href="javascript:');
    expect(result).toContain('&lt;script&gt;');
    expect(result).toContain('[No](javascript:alert)');
  });
});
