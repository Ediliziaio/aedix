import type { ReactNode } from "react";

/** Preserve complete text, including a final sentence without punctuation. */
export function splitEditorialParagraphs(text: string): string[] {
  const paragraphs: string[] = [];
  for (const block of text.split(/\n\s*\n/).map(value => value.trim()).filter(Boolean)) {
    const sentences = block.match(/[\s\S]+?(?:[.!?]+["»']?(?=\s|$)|$)/g) ?? [block];
    let current = "";
    for (const sentence of sentences) {
      current += sentence;
      if (current.length > 380) {
        paragraphs.push(current.trim());
        current = "";
      }
    }
    if (current.trim()) paragraphs.push(current.trim());
  }
  return paragraphs;
}

/** Render only explicit internal or HTTP(S) links; keep all other text escaped. */
export function renderEditorialInline(text: string): ReactNode[] {
  const output: ReactNode[] = [];
  const links = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/(?!\/)[^\s)]*)\)/g;
  let start = 0;
  for (const match of text.matchAll(links)) {
    output.push(text.slice(start, match.index));
    output.push(<a key={match.index} href={match[2]} className="text-primary underline underline-offset-4">{match[1]}</a>);
    start = match.index! + match[0].length;
  }
  output.push(text.slice(start));
  return output;
}
