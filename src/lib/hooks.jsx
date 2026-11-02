import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** Tracks window scroll position (rAF-throttled) for the sticky header. */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setY(window.scrollY);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/** Locks body scroll while a modal / menu is open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

/* ---------------- Favorites (localStorage-backed) ---------------- */

const FAVORITES_KEY = "horizon-favorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable — favorites stay in memory */
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
