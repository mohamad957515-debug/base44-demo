/** Formats a USD price in millions, e.g. 2350000 -> "$2.35 Million". */
export const formatPrice = (price) =>
  `$${parseFloat((price / 1_000_000).toFixed(2))} Million`;

/** Compact price, e.g. 2350000 -> "$2.35M". */
export const formatPriceShort = (price) =>
  `$${parseFloat((price / 1_000_000).toFixed(2))}M`;

/** Thousands-separated area, e.g. 4800 -> "4,800". */
export const formatNumber = (n) => n.toLocaleString("en-US");
