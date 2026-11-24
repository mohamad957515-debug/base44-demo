const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export const toFa = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)])

export const faNumber = (value: number) =>
  toFa(value.toLocaleString('en-US').replace(/,/g, '٬'))
