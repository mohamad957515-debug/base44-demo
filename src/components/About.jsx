import { ArrowUpLeft, Check } from 'lucide-react'
import Reveal from './ui/Reveal'

const points = [
  'تیم اعزامی با تجهیزات سینمایی و پهپاد',
  'رعایت کامل الزامات ایمنی و NDA',
  'تحویل نسخه‌های چندپلتفرمی و چندزبانه',
  'گزارش عملکرد شفاف در کمپین‌ها',
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-azure/[0.06] blur-[130px]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-azure-400 shadow-[0_0_12px_2px_rgba(61,130,255,0.8)]" />
              درباره سوری سیما
            </span>
            <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.3] text-white">
              ۱۷ سال در دل صنعت،
              <br />
              نه پشت میز
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-9 text-muted">
              ما زبان کارخانه را می‌فهمیم؛ محدودیت‌های ایمنی، حساسیت‌های فنی و فشار زمان‌بندی تولید.
              خروجی دقیقاً همان چیزی است که واحد بازرگانی برای فروش به آن نیاز دارد.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-9 grid gap-3.5 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-white/75">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-azure/15 text-azure-300 ring-1 ring-azure/25">
                    <Check className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="mt-9 rounded-2xl border-r-2 border-azure bg-white/[0.03] px-6 py-5">
              <p className="text-[14.5px] leading-8 text-white/80">
                «هر پروژه با یک پرسش شروع می‌شود: مخاطب شما بعد از دیدن این تصویر، باید چه تصمیمی
                بگیرد؟»
              </p>
              <footer className="mt-3 text-[12px] text-white/40">— تیم تولید سوری سیما</footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.26}>
            <a href="#process" className="btn-ghost mt-9">
              مسیر همکاری
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.09]">
            <img
              src="/images/about-refinery.jpg"
              alt="مجتمع صنعتی در نور گرگ‌ومیش"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="glass absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl px-5 py-4">
              <span className="text-3xl font-extrabold text-white">۱۷</span>
              <span className="text-[12.5px] leading-6 text-white/65">
                سال تجربهٔ تخصصی
                <br />
                در دل صنعت ایران
              </span>
            </div>
          </div>
          <div className="float-soft absolute -start-4 bottom-24 hidden w-36 overflow-hidden rounded-2xl border border-white/10 shadow-card sm:block">
            <img
              src="/images/hero-detail.jpg"
              alt="جزئیات سازه‌های صنعتی"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
