import { useState } from 'react'
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { contact, serviceOptions } from '../data/content'
import Reveal from './ui/Reveal'

const details = [
  { icon: Phone, label: 'تماس مستقیم', value: contact.phone, href: contact.phoneHref, ltr: true },
  { icon: Mail, label: 'ایمیل', value: contact.email, href: `mailto:${contact.email}`, ltr: true },
  { icon: MapPin, label: 'محدوده خدمات', value: contact.area },
  { icon: Clock, label: 'ساعات پاسخ‌گویی', value: contact.hours },
]

export default function ContactCta() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-[34px] border border-white/[0.09] bg-[radial-gradient(130%_130%_at_88%_0%,rgba(10,92,255,0.32),rgba(10,16,26,0.85)_46%,rgba(5,7,12,0.98))] p-7 sm:p-11 lg:p-14">
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-azure/20 blur-[110px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-azure-400 shadow-[0_0_12px_2px_rgba(61,130,255,0.8)]" />
                شروع همکاری
              </span>
              <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.9rem)] font-extrabold leading-[1.35] text-white">
                آمادهٔ روایت تصویری
                <br />
                مجموعه‌تان هستید؟
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-8 text-white/60">
                یک جلسهٔ ۲۰ دقیقه‌ای رایگان؛ نقشهٔ راه تصویری، بازهٔ زمانی و بودجهٔ تقریبی را دریافت
                کنید.
              </p>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {details.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <>
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-azure-300 ring-1 ring-white/10">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] text-white/40">{item.label}</span>
                        <span
                          dir={item.ltr ? 'ltr' : 'rtl'}
                          className={`mt-1 block truncate text-[13.5px] font-medium text-white/85 ${
                            item.ltr ? 'text-left' : ''
                          }`}
                        >
                          {item.value}
                        </span>
                      </span>
                    </>
                  )
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3">{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <p className="mt-8 flex items-center gap-2 text-[11.5px] text-white/40">
                <Check className="h-3.5 w-3.5 text-azure-400" />
                اطلاعات شما محرمانه می‌ماند و پاسخ اولیه در کمتر از ۲۴ ساعت کاری ارسال می‌شود.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="glass rounded-[26px] p-6 sm:p-7">
                {sent ? (
                  <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-azure/20 text-azure-200 ring-1 ring-azure/40">
                      <Check className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-[18px] font-bold text-white">درخواست شما ثبت شد</h3>
                    <p className="mt-2 max-w-[260px] text-[13px] leading-7 text-white/55">
                      تیم سوری سیما در کمتر از ۲۴ ساعت کاری با شما تماس می‌گیرد.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 text-[12.5px] font-medium text-azure-300 hover:text-white"
                    >
                      ارسال درخواست جدید
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[11.5px] text-white/50">نام و نام خانوادگی</span>
                        <input required type="text" placeholder="نام شما" className="field" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[11.5px] text-white/50">نام شرکت</span>
                        <input type="text" placeholder="نام مجموعه" className="field" />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[11.5px] text-white/50">شماره تماس</span>
                      <input
                        required
                        type="tel"
                        dir="ltr"
                        placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
                        className="field text-left"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[11.5px] text-white/50">خدمت موردنظر</span>
                      <select className="field appearance-none text-white/85" defaultValue="">
                        <option value="" disabled className="bg-panel">
                          یک گزینه را انتخاب کنید
                        </option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option} className="bg-panel">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[11.5px] text-white/50">توضیح کوتاه پروژه</span>
                      <textarea
                        rows={3}
                        placeholder="در چند جمله دربارهٔ پروژه بنویسید…"
                        className="field resize-none"
                      />
                    </label>

                    <button type="submit" className="btn-primary w-full">
                      دریافت مشاوره رایگان
                      <Send className="h-4 w-4" />
                    </button>
                    <p className="text-center text-[10.5px] text-white/30">
                      با ارسال این فرم، با تماس تیم سوری سیما موافقت می‌کنید.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
