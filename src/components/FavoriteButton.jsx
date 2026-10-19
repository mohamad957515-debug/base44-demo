import { Heart } from "lucide-react";
import { useFavorites } from "../lib/hooks";

/** Save/favorite toggle, synced across the app via localStorage. */
export default function FavoriteButton({
  propertyId,
  variant = "on-image",
  withLabel = false,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(propertyId);

  const base =
    "grid place-items-center rounded-full transition-all duration-300 focus-visible:outline-none";
  const styles =
    variant === "on-image"
      ? "h-10 w-10 bg-white/90 text-navy backdrop-blur hover:bg-navy hover:text-white"
      : "h-11 w-11 border border-navy/15 text-navy hover:border-navy hover:bg-navy";

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? "Remove from favorites" : "Save to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
      className={`${base} ${styles}`}
    >
      <Heart
        size={17}
        strokeWidth={1.8}
        className={fav ? "fill-gold text-gold" : ""}
      />
      {withLabel && (
        <span className="ml-2 text-sm font-semibold">
          {fav ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
