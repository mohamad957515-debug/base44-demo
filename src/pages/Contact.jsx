import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { BRAND } from "../data/content";

function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <CheckCircle2 size={48} className="text-gold" strokeWidth={1.5} />
        <h3 className="mt-5 text-xl font-bold text-navy">درخواست شما ثبت شد</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          ممنون که با سهند در تماس هستید — کارشناسان ما ظرف یک روز کاری
          پاسخ‌تان را می‌دهند.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-outline mt-7"
        >
          ارسال درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-navy">
            نام و نام خانوادگی
          </label>
          <input id="c-name" required placeholder="سارا محمدی" className="field" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm font-semibold text-navy">
            ایمیل
          </label>
          <input id="c-email" type="email" required placeholder="sara@example.com" className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="mb-2 block text-sm font-semibold text-navy">
            شماره تماس (اختیاری)
          </label>
          <input id="c-phone" type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" className="field" />
        </div>
        <div>
          <label htmlFor="c-subject" className="mb-2 block text-sm font-semibold text-navy">
            نوع درخواست
          </label>
          <select id="c-subject" className="field cursor-pointer">
            <option>خرید</option>
            <option>پیش‌خرید</option>
            <option>سرمایه‌گذاری</option>
            <option>مشارکت در ساخت</option>
            <option>درخواست بازدید</option>
            <option>سایر</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-semibold text-navy">
          توضیحات کوتاه
        </label>
        <textarea
          id="c-message"
          rows={5}
          required
          placeholder="کمی درباره نیاز یا هدف ملکی خود بنویسید…"
          className="field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        <Send size={15} />
        ارسال درخواست
      </button>
    </form>
  );
}

const INFO = [
  {
    icon: Phone,
    label: "تماس مستقیم",
    value: BRAND.phone,
    href: BRAND.phoneHref,
  },
  {
    icon: Phone,
    label: "تلفن دفتر",
    value: BRAND.officePhone,
    href: BRAND.officePhoneHref,
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: BRAND.email,
    href: BRAND.emailHref,
  },
  {
    icon: MapPin,
    label: "نشانی دفتر",
    value: `${BRAND.address}، ${BRAND.address2}`,
  },
  {
    icon: Clock,
    label: "ساعت کاری",
    value: BRAND.hours,
  },
];

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"
        />
        <div className="container-x relative text-center">
          <p className="label-gold">تماس</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            برای یک تصمیم بزرگ، گفت‌وگویی دقیق شروع کنید
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            برای خرید، پیش‌خرید، سرمایه‌گذاری ملکی یا مشارکت در ساخت با تیم
            سهند در ارتباط باشید.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Info column */}
          <div className="space-y-4 lg:col-span-5">
            {INFO.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-gold">
                    <item.icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink/40">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block font-semibold text-navy transition-colors hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-navy">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={320}>
              <div className="rounded-2xl bg-navy p-7 text-white shadow-card">
                <p className="label-gold">مشاوره اختصاصی</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  هر درخواست توسط کارشناسان سهند بررسی می‌شود — بدون مرکز
                  تماس، بدون واسطه. برای تصمیم‌های ملکی بزرگ، گفت‌وگویی دقیق
                  شروع کنید.
                </p>
                <a
                  href={BRAND.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  <Phone size={14} />
                  <span dir="ltr">{BRAND.phone}</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-navy">
                درخواست مشاوره
              </h2>
              <p className="mt-2 text-sm text-ink/60">
                ظرف یک روز کاری پاسخ می‌دهیم.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
