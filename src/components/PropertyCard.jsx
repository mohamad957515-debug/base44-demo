import { Link } from "react-router-dom";
import { MapPin, Phone, Send } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { BRAND } from "../data/content";

/**
 * Reusable property card. `size="large"` renders the editorial hero card
 * used for the first slide of the featured carousel.
 * Prices and unit details are not published — the price slot carries the
 * consultation phone number instead.
 */
export default function PropertyCard({ property, size = "default" }) {
  const large = size === "large";
  const detailPath = `/properties/${property.slug}`;

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-navy-100">
        <Link
          to={detailPath}
          aria-label={`مشاهده ${property.name}`}
          className="block focus-visible:outline-offset-4"
        >
          <img
            src={property.images[0]}
            alt={property.name}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              large ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          />
        </Link>
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
            <Link to={detailPath}>{property.name}</Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin size={14} className="shrink-0 text-gold" />
            {property.location.city}، {property.location.state}
          </p>
        </div>
        <a
          href={BRAND.phoneHref}
          className="shrink-0 text-end transition-colors hover:text-gold"
        >
          <span className="block text-[11px] font-medium text-ink/40">
            مشاوره و بازدید
          </span>
          <span
            dir="ltr"
            className={`mt-1 flex items-center justify-end gap-1.5 font-bold text-navy ${
              large ? "text-lg" : "text-sm"
            }`}
          >
            <Phone size={13} className="text-gold" />
            {BRAND.phone}
          </span>
        </a>
      </div>

      <Link
        to={detailPath}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors duration-300 hover:text-gold"
      >
        <Send size={14} className="text-gold" />
        ثبت درخواست مشاوره
      </Link>
    </div>
  );
}
