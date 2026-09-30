export type SearchDoc = { t: string; u: string; k: string; d: string; x: string };

let loaded: Promise<SearchDoc[]> | null = null;
export function loadIndex() {
  if (!loaded) loaded = fetch("/search-index.json").then((r) => (r.ok ? r.json() : [])).catch(() => { loaded = null; return []; });
  return loaded;
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, " ");

/** Lightweight weighted search: title > keywords > description, with prefix matching. */
export function search(docs: SearchDoc[], query: string, limit = 12) {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return docs
    .map((doc) => {
      const t = norm(doc.t), x = norm(doc.x), d = norm(doc.d);
      let score = 0;
      for (const term of terms) {
        const re = new RegExp(`\\b${term}`);
        const s = (re.test(t) ? 10 : t.includes(term) ? 5 : 0) + (re.test(x) ? 4 : 0) + (re.test(d) ? 2 : 0);
        if (!s) return { doc, score: 0 };
        score += s;
      }
      if (doc.k === "Service" || doc.k === "Product") score += 1;
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.doc);
}
