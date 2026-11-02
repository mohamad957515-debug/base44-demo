import { unsplash } from "../lib/images";

/** Global brand & contact constants — گروه ساختمانی سهند. */
export const BRAND = {
  name: "گروه ساختمانی سهند",
  tagline: "ساخت و سرمایه‌گذاری ملکی لوکس در کرج",
  phone: "۰۹۱۲ ۱۶۴ ۲۱۶۰",
  phoneHref: "tel:+989121642160",
  officePhone: "۰۲۶ ۳۳۴۰ ۱۰۲۰",
  officePhoneHref: "tel:+982633401020",
  email: "info@grohesahand.com",
  emailHref: "mailto:info@grohesahand.com",
  address: "کرج، مهرشهر، بلوار ارم",
  address2: "حدفاصل خیابان ۳۰۹ و ۳۱۱",
  hours: "شنبه تا پنجشنبه · ۹ تا ۱۸",
};

export const NAV_LINKS = [
  { label: "خانه", to: "/", kind: "route" },
  { label: "پروژه‌ها", to: "/properties", kind: "route" },
  { label: "درباره ما", to: "about", kind: "section" },
  { label: "خدمات", to: "services", kind: "section" },
  { label: "روند همکاری", to: "process", kind: "section" },
  { label: "تماس", to: "/contact", kind: "route" },
];

export const SOCIALS = [
  { label: "فیسبوک", href: "https://www.facebook.com", key: "facebook" },
  { label: "اینستاگرام", href: "https://www.instagram.com", key: "instagram" },
  { label: "لینکدین", href: "https://www.linkedin.com", key: "linkedin" },
  { label: "ایکس", href: "https://www.x.com", key: "x" },
];

export const SERVICES = [
  {
    number: "۰۱",
    title: "خرید و پیش‌خرید واحد لوکس",
    text: "معرفی پروژه‌های شاخص، موقعیت، کیفیت ساخت و امکان بازدید حضوری برای خریداران جدی.",
  },
  {
    number: "۰۲",
    title: "سرمایه‌گذاری ملکی در کرج",
    text: "تمرکز روی فرصت‌های کم‌ریسک‌تر، رشد ارزش منطقه و انتخاب پروژه‌های در حال توسعه.",
  },
  {
    number: "۰۳",
    title: "مشارکت در ساخت",
    text: "برای مالکان زمین و ساختمان‌های کلنگی که به دنبال سازنده‌ای خوش‌نام، دقیق و متعهد هستند.",
  },
  {
    number: "۰۴",
    title: "طراحی و اجرا",
    text: "نگاه همزمان به معماری، کیفیت ساخت، متریال و فروش‌پذیری نهایی پروژه.",
  },
  {
    number: "۰۵",
    title: "بازدید و ارزیابی ملک",
    text: "بررسی موقعیت، ظرفیت ساخت و ارزش آینده ملک؛ همراه با امکان بازدید حضوری از پروژه‌ها.",
  },
  {
    number: "۰۶",
    title: "مشاوره اختصاصی",
    text: "مسیر شفاف از اولین تماس تا تصمیم نهایی — مشاوره، برآورد ظرفیت و پیشنهاد اجرایی قابل تصمیم.",
  },
];

/** مسیر همکاری — چهار گام از اولین تماس تا تصمیم نهایی. */
export const PROCESS = [
  {
    number: "۰۱",
    title: "انتخاب مسیر",
    text: "خرید، پیش‌خرید، سرمایه‌گذاری یا مشارکت در ساخت — مسیر مناسب شما مشخص می‌شود.",
  },
  {
    number: "۰۲",
    title: "مشاوره اولیه",
    text: "ثبت درخواست و تماس سریع کارشناس سهند برای شناخت دقیق نیاز شما.",
  },
  {
    number: "۰۳",
    title: "بازدید یا ارزیابی",
    text: "بررسی پروژه، زمین یا هدف سرمایه‌گذاری؛ با امکان بازدید حضوری.",
  },
  {
    number: "۰۴",
    title: "پیشنهاد اختصاصی",
    text: "ارائه مسیر شفاف و قابل تصمیم برای رسیدن به انتخاب نهایی.",
  },
];

export const WHY_POINTS = [
  "طراحی و اجرای خوش‌ساخت با متریال و جزئیات سطح یک",
  "شناخت موقعیت‌های ارزشمند کرج، مهرشهر و البرز",
  "مسیر شفاف از بررسی موقعیت تا پیشنهاد اجرایی",
  "همراهی از انتخاب مسیر تا تحویل نهایی",
];

export const STATS = [
  { value: "کرج و البرز", label: "تمرکز پروژه‌ها" },
  { value: "۳ مسیر", label: "خرید، سرمایه‌گذاری، مشارکت" },
  { value: "مهرشهر", label: "مقر دفتر و تمرکز ساخت" },
  { value: "شفاف", label: "مسیر تصمیم‌گیری" },
];

/** عکس‌های واقعی پروژه‌های سهند (میزبان: سایت رسمی گروه). */
export const SAHAND_PHOTO = (file) =>
  `https://grohesahand.com/wp-content/uploads/${file}`;

export const ABOUT_PHOTOS = {
  primary: SAHAND_PHOTO("2015/10/modern-home-1500x1000.jpg"),
  secondary: SAHAND_PHOTO("2025/02/p_ladan-5.jpg"),
  fallback: unsplash("1613490493576-7fde63acd811", 900),
};
