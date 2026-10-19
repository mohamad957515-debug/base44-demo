import { TEAM } from "../data/content";
import { properties } from "../data/properties";

/**
 * Access layer for property data. Currently resolves against the local
 * records in data/properties.js; the async signatures intentionally mirror
 * an API so this file can be swapped for real backend calls later.
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
      if (p.location.state === current.location.state) score += 1;
      score -= Math.abs(p.price - current.price) / 5_000_000;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

export function resolveAgent(agentId) {
  return TEAM.find((m) => m.id === agentId) ?? null;
}

/** Pure client-side filter + sort used by the Properties page. */
export function filterAndSortProperties(list, filters) {
  const inPriceBand = (p, band) => {
    switch (band) {
      case "under-2":
        return p.price < 2_000_000;
      case "2-3.5":
        return p.price >= 2_000_000 && p.price <= 3_500_000;
      case "3.5-5":
        return p.price > 3_500_000 && p.price <= 5_000_000;
      case "over-5":
        return p.price > 5_000_000;
      default:
        return true;
    }
  };

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
    if (!inPriceBand(p, filters.price)) return false;
    if (filters.beds !== "all" && p.beds < Number(filters.beds)) return false;
    if (filters.baths !== "all" && p.baths < Number(filters.baths)) return false;
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...result].sort((a, b) => b.price - a.price);
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
