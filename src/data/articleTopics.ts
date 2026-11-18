export const articleTopics = [
  {
    id: "iniziare",
    title: "Scegliere il primo progetto AI",
    description: "Processi, persone e criteri per partire da un problema preciso.",
    slugs: ["ai-generativa-pmi-italiane-2026", "5-processi-pmi-italiana-automatizzare-oggi", "come-implementare-intelligenza-artificiale-azienda", "consulenza-intelligenza-artificiale-guida", "cultura-aziendale-ai-come-preparare-team-cambiamento", "errori-pmi-digitale", "ai-pmi-italiane-2025", "perche-le-pmi-italiane-hanno-paura-dellai"],
  },
  {
    id: "automazione",
    title: "Automatizzare con controllo umano",
    description: "Dalle conversazioni WhatsApp agli agenti collegati ai dati aziendali.",
    slugs: ["whatsapp-business-ai-pmi-italiane", "agenti-ai-per-pmi-cosa-sono-e-come-usarli", "agenti-ai-vs-chatbot", "rag-retrieval-augmented-generation-spiegato", "sistema-ai-ibrido-cose-e-come-funziona", "human-in-the-loop-guida-aziende", "intelligenza-artificiale-in-azienda-esempi", "automazione-processi-aziendali", "come-costruire-agente-ai-aziendale-7-giorni", "prompt-engineering-imprenditori-italiani-guida-completa"],
  },
  {
    id: "costi",
    title: "Confrontare costi, fornitori e risultati",
    description: "Budget, ritorno atteso e scelte tra prodotto pronto e sviluppo su misura.",
    slugs: ["quanto-costa-ai-pmi-italiana-guida-2026", "quanto-costa-sviluppare-software-ai", "roi-intelligenza-artificiale", "come-scegliere-fornitore-ai-pmi-italiana", "enterprise-ai-build-vs-buy-2026", "sviluppare-saas-ai-mvp-prodotto", "saas-verticale-vs-generico"],
  },
  {
    id: "governance",
    title: "AI Act, privacy e responsabilità",
    description: "Guide per orientare le domande su dati, ruoli e supervisione dei sistemi.",
    slugs: ["ai-act-2026-pmi-italiane-cosa-cambia", "ai-act-agosto-2026-cosa-e-cambiato-davvero", "gdpr-ai-pmi-italiane-guida-2026", "ai-act-grandi-imprese-governance-2026", "ai-grandi-aziende-italia-2026", "futuro-lavoro-ai-automazione"],
  },
  {
    id: "applicazioni",
    title: "Applicazioni e contesto italiano",
    description: "Letture per settore, strumenti e contesto delle imprese italiane.",
    slugs: ["marketing-performance-edilizia", "claude-gpt-gemini-quale-ai-scegliere-azienda-2026", "caso-studio-impresa-edile-200-lead-ai", "ai-made-in-italy-prodotto-italiano-2026", "ai-ristorazione-italiana-menu-magazzino-personale", "ai-ecommerce-italiano-conversioni-logistica-2026", "intelligenza-artificiale-studi-professionali-commercialisti-avvocati", "piano-nazionale-ai-italia-miliardo-pmi", "incentivi-ai-imprese-italiane-2026-guida"],
  },
] as const;

export const getArticleTopic = (slug: string) =>
  articleTopics.find((topic) => (topic.slugs as readonly string[]).includes(slug));

/** A next reading plus relevant alternatives; avoids the same first 3 cards. */
export const getRelatedArticleSlugs = (
  slug: string,
  articles: Record<string, { title: string; category: string }>,
  limit = 3,
): string[] => {
  const current = articles[slug];
  if (!current || limit <= 0) return [];
  const topic = getArticleTopic(slug);
  const path: readonly string[] = topic?.slugs ?? [];
  const index = path.indexOf(slug);
  const next = path.length > 1 ? path[(index + 1) % path.length] : undefined;
  const words = (text: string) => new Set(text.toLowerCase().split(/[^a-zà-ù0-9]+/).filter((word) => word.length > 4 && !["guida", "italiane", "italiani", "azienda", "aziende"].includes(word)));
  const tokens = words(current.title);
  const ranked = Object.entries(articles)
    .filter(([candidate]) => candidate !== slug)
    .map(([candidate, article]) => ({
      slug: candidate,
      score: (path.includes(candidate) ? 100 : 0)
        + [...words(article.title)].filter((word) => tokens.has(word)).length * 5
        + (article.category === current.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return [...new Set([...(next && articles[next] ? [next] : []), ...ranked.map((item) => item.slug)])].slice(0, limit);
};
