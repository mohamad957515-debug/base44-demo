/**
 * Jalaali (Persian) <-> Gregorian conversion, based on the well-known
 * jalaali-js algorithm. Day numbers are Julian Day Numbers.
 */

const div = (a: number, b: number) => Math.trunc(a / b)
const mod = (a: number, b: number) => a - Math.trunc(a / b) * b

const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324,
  2394, 2456, 3178,
]

function jalCal(jy: number, withoutLeap = false) {
  const bl = BREAKS.length
  const gy = jy + 621
  let leapJ = -14
  let jp = BREAKS[0]
  let jm = 0
  let jump = 0
  let leap = 0
  let leapG = 0
  let march = 0
  let n = 0

  if (jy < jp || jy >= BREAKS[bl - 1]) throw new Error(`Invalid Jalaali year ${jy}`)

  for (let i = 1; i < bl; i += 1) {
    jm = BREAKS[i]
    jump = jm - jp
    if (jy < jm) break
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
    jp = jm
  }
  n = jy - jp
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150
  march = 20 + leapJ - leapG

  if (!withoutLeap) {
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33
    leap = mod(mod(n + 1, 33) - 1, 4)
    if (leap === -1) leap = 4
  }

  return { leap, gy, march }
}

export function g2d(gy: number, gm: number, gd: number) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
  return d
}

export function d2g(jdn: number) {
  let j = 4 * jdn + 139361631
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
  const i = div(mod(j, 1461), 4) * 5 + 308
  const gd = div(mod(i, 153), 5) + 1
  const gm = mod(div(i, 153), 12) + 1
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6)
  return { gy, gm, gd }
}

export function j2d(jy: number, jm: number, jd: number) {
  const r = jalCal(jy, true)
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
}

export function d2j(jdn: number) {
  const gy = d2g(jdn).gy
  let jy = gy - 621
  const r = jalCal(jy)
  const jdn1f = g2d(gy, 3, r.march)
  let k = jdn - jdn1f

  if (k >= 0) {
    if (k <= 185) return { jy, jm: 1 + div(k, 31), jd: mod(k, 31) + 1 }
    k -= 186
  } else {
    jy -= 1
    k += 179
    if (r.leap === 1) k += 1
  }

  return { jy, jm: 7 + div(k, 30), jd: mod(k, 30) + 1 }
}

export const toJalaali = (gy: number, gm: number, gd: number) => d2j(g2d(gy, gm, gd))
export const toGregorian = (jy: number, jm: number, jd: number) => d2g(j2d(jy, jm, jd))

export const isLeapJalaaliYear = (jy: number) => jalCal(jy).leap === 0

export function jalaaliMonthLength(jy: number, jm: number) {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  return isLeapJalaaliYear(jy) ? 30 : 29
}

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]

export const JALALI_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

const pad = (value: number) => String(value).padStart(2, '0')

/** "YYYY-MM-DD" (Gregorian) -> { jy, jm, jd } */
export function isoToJalali(iso: string) {
  const [gy, gm, gd] = iso.split('-').map(Number)
  return toJalaali(gy, gm, gd)
}

/** { jy, jm, jd } -> "YYYY-MM-DD" (Gregorian) */
export function jalaliToIso(jy: number, jm: number, jd: number) {
  const { gy, gm, gd } = toGregorian(jy, jm, jd)
  return `${gy}-${pad(gm)}-${pad(gd)}`
}

/** Weekday column of a Jalali day, where Saturday is 0. */
export function jalaliWeekday(jy: number, jm: number, jd: number) {
  const { gy, gm, gd } = toGregorian(jy, jm, jd)
  return (new Date(Date.UTC(gy, gm - 1, gd)).getUTCDay() + 1) % 7
}
