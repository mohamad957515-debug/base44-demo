/** Converts a number to Persian (fa-IR) digits & separators. */
export const faNum = (n) => n.toLocaleString("fa-IR");

const round = (n, digits) => parseFloat(n.toFixed(digits));

/** Full price label in toman, e.g. 16500000000 -> "۱۶٫۵ میلیارد تومان". */
export const formatPrice = (price) => {
  if (price == null) return "استعلام قیمت";
  if (price >= 1_000_000_000)
    return `${faNum(round(price / 1_000_000_000, 2))} میلیارد تومان`;
  return `${faNum(round(price / 1_000_000, 0))} میلیون تومان`;
};

/** Compact price for cards, e.g. 16500000000 -> "۱۶٫۵ میلیارد". */
export const formatPriceShort = (price) => {
  if (price == null) return "استعلام قیمت";
  if (price >= 1_000_000_000)
    return `${faNum(round(price / 1_000_000_000, 2))} میلیارد`;
  return `${faNum(round(price / 1_000_000, 0))} میلیون`;
};

/** Persian thousands-separated area, e.g. 148 -> "۱۴۸". */
export const formatNumber = (n) => faNum(n);
