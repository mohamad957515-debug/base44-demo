import { unsplash } from "../lib/images";

/** Global brand & contact constants. */
export const BRAND = {
  name: "هورایزن پروپرتیز",
  phone: "(555) 246-7890",
  phoneHref: "tel:+15552467890",
  email: "hello@horizonproperties.com",
  emailHref: "mailto:hello@horizonproperties.com",
  address: "خیابان هورایزن، پلاک ۴۱۰، طبقه ۱۲",
  address2: "آستین، تگزاس",
  hours: "شنبه تا پنجشنبه · ۹ تا ۱۸",
};

export const NAV_LINKS = [
  { label: "خانه", to: "/", kind: "route" },
  { label: "املاک", to: "/properties", kind: "route" },
  { label: "درباره ما", to: "about", kind: "section" },
  { label: "خدمات", to: "services", kind: "section" },
  { label: "تیم ما", to: "team", kind: "section" },
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
    title: "فروش خانه‌های لوکس",
    text: "بازاریابی انتخابی و نمایندگی اختصاصی برای خانه‌های استثنایی؛ از نخستین بازدید تا امضای نهایی قرارداد.",
  },
  {
    number: "۰۲",
    title: "سرمایه‌گذاری املاک",
    text: "راهنمایی داده‌محور برای شناسایی، ارزیابی و رشد پرتفوی ملکی مطمئن و پربازده.",
  },
  {
    number: "۰۳",
    title: "بازاریابی ملک",
    text: "عکاسی ادیتوریال، چیدمان و کمپین‌های هدفمند که هر اقامتگاه را در درخشان‌ترین حالت ممکن ارائه می‌کنند.",
  },
  {
    number: "۰۴",
    title: "مشاوره املاک",
    text: "مشاوره راهبردی در تمام مراحل خرید، فروش و مذاکره — محرمانه و وسواس‌گونه.",
  },
  {
    number: "۰۵",
    title: "ارزش‌گذاری ملک",
    text: "ارزش‌گذاری دقیق و مبتنی بر بازار توسط تحلیلگران ارشد؛ نه تخمین‌های خودکار.",
  },
  {
    number: "۰۶",
    title: "خدمات اسکان و نقل‌مکان",
    text: "پشتیبانی سرتاسری برای نقل‌مکان‌هایی بی‌دغدغه — از مدرسه و نیروی کمک تا اسکان، هر جا که باشید.",
  },
];

export const TEAM = [
  {
    id: "daniel-morgan",
    name: "دنیل مورگان",
    role: "مدیرعامل",
    photo: unsplash("1500648767791-00dcc994a43e", 700),
  },
  {
    id: "olivia-carter",
    name: "الیویا کارتر",
    role: "مشاور املاک لوکس",
    photo: unsplash("1573496359142-b8d87734a5a2", 700),
  },
  {
    id: "james-wilson",
    name: "جیمز ویلسون",
    role: "مشاور سرمایه‌گذاری",
    photo: unsplash("1472099645785-5658abf4ff4e", 700),
  },
  {
    id: "sophia-bennett",
    name: "سوفیا بنت",
    role: "متخصص ارشد املاک",
    photo: unsplash("1494790108377-be9c29b29330", 700),
  },
];

export const WHY_POINTS = [
  "دسترسی انحصاری به ملک‌های خارج از بازار",
  "راهنمایی سرمایه‌گذاری مبتنی بر داده",
  "نمایندگی محرمانه، از ابتدا تا انتها",
  "شبکه‌ای مطمئن از معمارها، طراحان و تأمین‌کنندگان اعتبار",
];

export const STATS = [
  { value: "۱۵+", label: "سال تجربه درخشان" },
  { value: "۱٫۲ میلیارد+", label: "دلار فروش املاک" },
  { value: "۵۰۰+", label: "خانواده در خانه‌ای رویایی" },
  { value: "۹۸٪", label: "رضایت مشتریان" },
];
