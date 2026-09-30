export type Author = { id: string; name: string; role: string; bio: string; url?: string };

// Add real named authors (with consent) as the team publishes. Never invent people.
export const authors: Record<string, Author> = {
  "fairbazaar-editorial": {
    id: "fairbazaar-editorial",
    name: "FairBazaar Editorial Team",
    role: "Engineering & product team",
    bio: "Written and reviewed by FairBazaar's engineers and product specialists who build SaaS products, custom software and AI solutions for businesses.",
  },
};
