import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { faNum, formatNumber, formatPriceShort } from "../lib/format";

/**
 * Reusable property card. `size="large"` renders the editorial hero card
 * used for the first slide of the featured carousel.
 */
export default function PropertyCard({ property, size = "default" }) {
  const large = size === "large";

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group block focus-visible:outline-offset-4"
      aria-label={`${property.name} — ${formatPriceShort(property.price)}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-navy-100">
        <img
          src={property.images[0]}
          alt={property.name}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        />
        <span className="absolute start-4 top-4 rounded-full bg-navy-950/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {property.type}
        </span>
        {property.isNew && (
          <span className="absolute bottom-4 start-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-navy-950">
            جدید
          </span>
        )}
        <span className="absolute end-4 top-4">
          <FavoriteButton propertyId={property.id} />
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-gold ${
              large ? "text-2xl" : "text-lg"
            }`}
          >
            {property.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin size={14} className="shrink-0 text-gold" />
            {property.location.city}، {property.location.state}
          </p>
        </div>
        <p
          className={`shrink-0 font-bold text-navy ${large ? "text-xl" : "text-lg"}`}
        >
          {formatPriceShort(property.price)}
        </p>
      </div>

      {large && (
        <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-ink/10 pt-4 text-sm text-ink/60">
          <span className="flex items-center gap-2">
            <BedDouble size={16} className="text-gold" /> {faNum(property.beds)} خواب
          </span>
          <span className="flex items-center gap-2">
            <Bath size={16} className="text-gold" /> {faNum(property.baths)} حمام
          </span>
          <span className="flex items-center gap-2">
            <Ruler size={16} className="text-gold" />{" "}
            {formatNumber(property.sqft)} فوت مربع
          </span>
        </div>
      )}
    </Link>
  );
}
