import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import Reveal from "../components/Reveal";
import {
  fetchProperties,
  filterAndSortProperties,
} from "../services/propertyService";

const INITIAL_FILTERS = {
  query: "",
  location: "all",
  type: "all",
  price: "all",
  beds: "all",
  baths: "all",
  sort: "featured",
};

const selectClass = "field cursor-pointer appearance-none pr-8";

function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"
      />
      <div className="container-x relative text-center">
        <p className="label-gold">Our Listings</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Find Your Ideal Property
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Browse our portfolio of exceptional homes — filter by location,
          type, price, and more.
        </p>
      </div>
    </section>
  );
}

export default function Properties() {
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    let live = true;
    fetchProperties().then((list) => {
      if (live) setAll(list);
    });
    return () => {
      live = false;
    };
  }, []);

  const update = (key) => (e) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }));

  const results = useMemo(
    () => filterAndSortProperties(all, filters),
    [all, filters]
  );

  const locations = useMemo(
    () => [...new Set(all.map((p) => p.location.city))].sort(),
    [all]
  );
  const types = useMemo(
    () => [...new Set(all.map((p) => p.type))].sort(),
    [all]
  );

  const isFiltered =
    filters.query !== "" ||
    filters.location !== "all" ||
    filters.type !== "all" ||
    filters.price !== "all" ||
    filters.beds !== "all" ||
    filters.baths !== "all" ||
    filters.sort !== "featured";

  return (
    <>
      <PageHeader />

      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          {/* Filter bar */}
          <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-[0.2em] text-navy/50">
              <SlidersHorizontal size={14} />
              Refine your search
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative sm:col-span-2 lg:col-span-2 xl:col-span-2">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40"
                />
                <input
                  type="search"
                  value={filters.query}
                  onChange={update("query")}
                  placeholder="Search by name, city, or state…"
                  aria-label="Search properties"
                  className="field pl-11"
                />
              </div>
              <label className="sr-only" htmlFor="filter-location">
                Location
              </label>
              <select
                id="filter-location"
                value={filters.location}
                onChange={update("location")}
                className={selectClass}
              >
                <option value="all">All Locations</option>
                {locations.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="filter-type">
                Property type
              </label>
              <select
                id="filter-type"
                value={filters.type}
                onChange={update("type")}
                className={selectClass}
              >
                <option value="all">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="filter-price">
                Price range
              </label>
              <select
                id="filter-price"
                value={filters.price}
                onChange={update("price")}
                className={selectClass}
              >
                <option value="all">Any Price</option>
                <option value="under-2">Under $2M</option>
                <option value="2-3.5">$2M – $3.5M</option>
                <option value="3.5-5">$3.5M – $5M</option>
                <option value="over-5">$5M+</option>
              </select>
              <label className="sr-only" htmlFor="filter-beds">
                Bedrooms
              </label>
              <select
                id="filter-beds"
                value={filters.beds}
                onChange={update("beds")}
                className={selectClass}
              >
                <option value="all">Any Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
                <option value="6">6+ Beds</option>
              </select>
              <label className="sr-only" htmlFor="filter-baths">
                Bathrooms
              </label>
              <select
                id="filter-baths"
                value={filters.baths}
                onChange={update("baths")}
                className={selectClass}
              >
                <option value="all">Any Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
                <option value="5">5+ Baths</option>
              </select>
              <label className="sr-only" htmlFor="filter-sort">
                Sort by
              </label>
              <select
                id="filter-sort"
                value={filters.sort}
                onChange={update("sort")}
                className={selectClass}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Listings</option>
              </select>
            </div>
          </div>

          {/* Results header */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-ink/60" aria-live="polite">
              Showing{" "}
              <span className="font-bold text-navy">{results.length}</span> of{" "}
              {all.length} properties
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                <RotateCcw size={14} />
                Reset filters
              </button>
            )}
          </div>

          {/* Results grid */}
          {results.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {results.map((property, i) => (
                <Reveal key={property.id} delay={(i % 3) * 70}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-navy/5 text-navy/40">
                <Search size={24} />
              </span>
              <h2 className="mt-6 text-xl font-bold text-navy">
                No properties match your criteria
              </h2>
              <p className="mt-2 max-w-sm text-sm text-ink/60">
                Try widening your price range or removing a filter to see more
                results.
              </p>
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="btn-primary mt-8"
              >
                <RotateCcw size={15} />
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
