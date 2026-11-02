import { properties } from "../data/properties";

/**
 * Access layer for property data. Currently resolves against the local
 * records in data/properties.js; the async signatures intentionally mirror
 * an API so this file can be swapped for real backend calls later.
 * Prices and unit details are intentionally not part of the data model —
 * each project leads to a consultation request instead.
 */

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProperties() {
  await delay();
  return properties;
}

export async function fetchPropertyBySlug(slug) {
  await delay();
  return properties.find((p) => p.slug === slug) ?? null;
}

export async function fetchSimilarProperties(slug, limit = 3) {
  await delay();
  const current = properties.find((p) => p.slug === slug);
  if (!current) return [];
  const scored = properties
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.type === current.type) score += 2;
      if (p.location.city === current.location.city) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || a.p.id - b.p.id);
  return scored.slice(0, limit).map((s) => s.p);
}

/** Pure client-side filter + sort used by the Properties page. */
export function filterAndSortProperties(list, filters) {
  const result = list.filter((p) => {
    if (filters.query) {
      const q = filters.query.trim().toLowerCase();
      const haystack =
        `${p.name} ${p.location.city} ${p.location.state} ${p.location.country} ${p.type}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.location !== "all" && p.location.city !== filters.location)
      return false;
    if (filters.type !== "all" && p.type !== filters.type) return false;
    return true;
  });

  switch (filters.sort) {
    case "newest":
      return [...result].sort((a, b) =>
        (b.listedAt ?? "").localeCompare(a.listedAt ?? "")
      );
    default:
      return [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id
      );
  }
}
