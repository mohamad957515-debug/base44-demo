import { SAHAND_PHOTO } from "./content";

/**
 * پروژه‌های گروه ساختمانی سهند.
 * Structured as plain data so the portfolio can later be swapped for a
 * database or API without touching the UI components (see
 * services/propertyService.js for the access layer).
 * All copy is Persian (fa-IR); numbers render through lib/format.js.
 * Prices and unit details are not published — every project leads to a
 * consultation request. Photos are the group's real project media.
 */
export const properties = [
  {
    id: 1,
    slug: "sahand-ladan",
    name: "پروژه لادن",
    type: "آپارتمان لوکس",
    location: { city: "خیابان بوستان", state: "کرج", country: "ایران" },
    featured: true,
    isNew: true,
    listedAt: "2026-09-12",
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
    featured: true,
    isNew: false,
    listedAt: "2026-08-20",
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
    featured: true,
    isNew: true,
    listedAt: "2026-09-28",
    images: [SAHAND_PHOTO("2025/08/sahand_post_mehrshahr_01.jpg")],
  },
];
