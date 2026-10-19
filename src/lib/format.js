/** Converts a number to Persian (fa-IR) digits & separators. */
export const faNum = (n) => n.toLocaleString("fa-IR");

/** Full price label, e.g. 2350000 -> "۲٫۳۵ میلیون دلار". */
export const formatPrice = (price) =>
  `${faNum(parseFloat((price / 1_000_000).toFixed(2)))} میلیون دلار`;

/** Compact price for cards, e.g. 2350000 -> "۲٫۳۵ م.د" (میلیون دلار). */
export const formatPriceShort = (price) =>
  `${faNum(parseFloat((price / 1_000_000).toFixed(2)))} م.د`;

/** Persian thousands-separated area, e.g. 4800 -> "۴٬۸۰۰". */
export const formatNumber = (n) => faNum(n);
