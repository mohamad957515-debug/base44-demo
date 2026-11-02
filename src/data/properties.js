import { SAHAND_PHOTO } from "./content";

/**
 * پروژه‌های گروه ساختمانی سهند.
 * Structured as plain data so the portfolio can later be swapped for a
 * database or API without touching the UI components (see
 * services/propertyService.js for the access layer).
 * All copy is Persian (fa-IR); numbers render through lib/format.js.
 * Prices are in toman. Photos are the group's real project media.
 */
export const properties = [
  {
    id: 1,
    slug: "sahand-ladan",
    name: "پروژه لادن",
    type: "آپارتمان لوکس",
    location: { city: "خیابان بوستان", state: "کرج", country: "ایران" },
    price: 16_500_000_000,
    beds: 3,
    baths: 2,
    area: 148,
    lot: "—",
    yearBuilt: 2025,
    featured: true,
    isNew: true,
    listedAt: "2026-09-12",
    description: [
      "پروژه لادن، در خیابان بوستان و نبش کوچه لادن، یکی از شاخص‌ترین پروژه‌های مسکونی گروه ساختمانی سهند در کرج است؛ نمونه‌ای از توان اجرایی گروه در ساخت مسکونی سطح یک.",
      "خطوط تمیز نما، پلان‌های کاربردی و توجه به جزئیات اجرا، این پروژه را برای سکونت و سرمایه‌گذاری جذاب می‌کند. برای بازدید حضوری و بررسی واحدهای در دسترس با تیم سهند در تماس باشید.",
    ],
    features: [
      "نمای شاخص و طراحی مدرن",
      "پلان بهینه و نورگیری مناسب",
      "جزئیات اجرایی و متریال سطح یک",
      "دسترسی مناسب در خیابان بوستان",
      "پارکینگ اختصاصی",
      "لابی و مشاعات باکیفیت",
    ],
    amenities: [
      "آسانسور",
      "پارکینگ",
      "انبار",
      "لابی",
      "درب ضد سرقت",
      "گرمایش مرکزی",
    ],
    images: [
      SAHAND_PHOTO("2025/02/p_ladan-1.jpg"),
      SAHAND_PHOTO("2025/02/p_ladan-5.jpg"),
      SAHAND_PHOTO("2025/02/p_ladan-6.jpg"),
    ],
  },
  {
    id: 2,
    slug: "sahand-azadi",
    name: "پروژه بلوار آزادی",
    type: "آپارتمان",
    location: { city: "بلوار آزادی", state: "کرج", country: "ایران" },
    price: 13_000_000_000,
    beds: 2,
    baths: 2,
    area: 125,
    lot: "—",
    yearBuilt: 2024,
    featured: true,
    isNew: false,
    listedAt: "2026-08-20",
    description: [
      "پروژه بلوار آزادی در فرعی یکم، با دسترسی مناسب به مسیرهای اصلی کرج، گزینه‌ای برای خرید، پیش‌خرید و سرمایه‌گذاری ملکی است.",
      "معماری متناسب با بافت محله، متریال باکیفیت و اجرای دقیق، ارزش سکونت و ارزش آینده ملک را هم‌زمان مدنظر قرار می‌دهد.",
    ],
    features: [
      "موقعیت دسترسی مناسب در بلوار آزادی",
      "پلان کاربردی و بهینه",
      "اجرای دقیق و متریال باکیفیت",
      "مناسب سکونت و سرمایه‌گذاری",
      "پارکینگ اختصاصی",
      "مشاعات باکیفیت",
    ],
    amenities: ["آسانسور", "پارکینگ", "انبار", "لابی", "درب ضد سرقت"],
    images: [
      SAHAND_PHOTO("2025/02/p_faree-3.jpg"),
      SAHAND_PHOTO("2025/02/p_faree-4.jpg"),
      SAHAND_PHOTO("2025/02/p_faree-5.jpg"),
    ],
  },
  {
    id: 3,
    slug: "sahand-mehrshahr",
    name: "پروژه مهرشهر",
    type: "آپارتمان",
    location: { city: "مهرشهر", state: "کرج", country: "ایران" },
    price: 11_800_000_000,
    beds: 3,
    baths: 2,
    area: 135,
    lot: "—",
    yearBuilt: 2026,
    featured: true,
    isNew: true,
    listedAt: "2026-09-28",
    description: [
      "پروژه مهرشهر در یکی از مناطق رو به رشد کرج اجرا می‌شود؛ منطقه‌ای که سهند برای سکونت، سرمایه‌گذاری و مشارکت در ساخت ظرفیت بالایی برای آن می‌بیند.",
      "این پروژه فرصتی برای پیش‌خرید و همراهی از مرحله ساخت تا تحویل است. برای دریافت جزئیات واحدها و زمان‌بندی تحویل با تیم مشاوره سهند گفت‌وگو کنید.",
    ],
    features: [
      "در منطقه رو به رشد مهرشهر",
      "امکان پیش‌خرید",
      "پلان‌های متنوع واحدها",
      "اجرای خوش‌ساخت سهند",
      "پارکینگ اختصاصی",
      "تحویل طبق زمان‌بندی",
    ],
    amenities: ["آسانسور", "پارکینگ", "انبار", "لابی", "مشاعات سبز"],
    images: [SAHAND_PHOTO("2025/08/sahand_post_mehrshahr_01.jpg")],
  },
];
