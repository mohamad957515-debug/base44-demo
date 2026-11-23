import { photo } from '../../data/site'
import { Reveal, ZoomImage } from '../ui/motion'
import { ArrowLeft } from '../ui/Icons'

const facts = [
  { value: '۱۵+', label: 'سال تجربهٔ آتلیه' },
  { value: '۲٬۵۰۰+', label: 'هنرجوی فارغ‌التحصیل' },
  { value: '۴۰+', label: 'دورهٔ تخصصی' },
]

export default function Instructor() {
  return (
    <section id="instructor" className="relative overflow-hidden py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <ZoomImage
              src={photo(8516528, 1100)}
              alt="خانمک طباطبایی در آتلیه، در حال تنظیم لباس روی مانکن"
              className="aspect-[4/5] rounded-[1.6rem] bg-mist"
            />
            <div className="absolute -bottom-6 -left-4 hidden w-[58%] rounded-[1.2rem] border border-ink/10 bg-paper/95 p-5 shadow-soft backdrop-blur sm:block">
              <p className="latin text-[9px] text-gold">Signature</p>
              <p className="mt-2 text-[15px] font-bold">خانمک طباطبایی</p>
              <p className="mt-1 text-[11.5px] leading-[1.8] text-stone">
                بنیان‌گذار آکادمی، طراح لباس و مدرس اوت‌کوتور
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ۰۴ — دربارهٔ بنیان‌گذار
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.24] tracking-tightest">
              کسی که دوخت را
              <br />
              مثل یک زبان آموزش می‌دهد.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-7 border-r border-gold/40 pr-6 text-[17px] font-light leading-[2.1] text-ink/85 sm:text-[19px]">
              «دوخت، صبرِ قابل دیدن است. وقتی فرم را بفهمی، سوزن دیگر ابزار
              نیست؛ ادامهٔ دستِ توست.»
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[14px] leading-[2] text-stone">
              خانمک طباطبایی بیش از پانزده سال است که در آتلیهٔ شخصی خود لباس
              سفارشی می‌دوزد و تدریس می‌کند. تمرکز او بر آموزشِ دقیقِ فرم،
              دراپینگ و پرداخت است؛ همان جزئیاتی که لباس را از «دوخته‌شده» به
              «ساخته‌شده برای تو» تبدیل می‌کند.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-ink/10 pt-7">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[24px] font-extrabold tracking-tight sm:text-[28px]">
                    {fact.value}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-stone">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <a href="#courses" className="btn-ghost mt-9">
              دوره‌های خانم طباطبایی
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
