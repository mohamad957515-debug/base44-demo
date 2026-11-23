const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Converts latin digits in a string or number to Persian digits. */
export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)])
}

/** ۴۹۰۰۰۰۰۰ → «۴۹٬۰۰۰٬۰۰۰» */
export function faPrice(value: number): string {
  return toFa(value.toLocaleString('en-US')).replace(/,/g, '٬')
}

export function pad2(value: number): string {
  return toFa(String(value).padStart(2, '0'))
}
