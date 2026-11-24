import { ArrowLeft, Check } from 'lucide-react'
import Reveal from './ui/Reveal'

const image =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80'

const points = [
  'برنامه‌ریزی سفر اختصاصی، بر اساس سلیقه و زمان شما',
  'اقامتگاه‌های منتخب که خودمان دیده‌ایم',
  'پشتیبانی فارسی‌زبان، در تمام طول سفر',
]

export default function Experience() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[30px] bg-ink sm:rounded-[36px]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[540px]">
              <img
                src={image}
                alt="منظره غروب از پنجره هواپیما"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent lg:bg-gradient-to-l lg:from-ink lg:via-ink/30" />
              <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[11px] font-medium text-white backdrop-blur-md ring-1 ring-white/25">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                تجربه سفر سوری سیما
              </div>
            </div>

            <div className="relative flex flex-col justify-center p-7 sm:p-12 lg:p-14">
              <span className="eyebrow text-brand">تجربه سفر</span>
              <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold text-white">
                بیشتر از یک بلیط، یک تجربه
              </h2>
              <p className="mt-4 max-w-[460px] text-[13.5px] leading-[2] text-white/65 sm:text-[14.5px]">
                سوری سیما از انتخاب پرواز تا آخرین شب اقامت همراه شماست؛ با اقامتگاه‌های منتخب،
                راهنمای محلی و جزئیاتی که سفر را از یک جابه‌جایی ساده جدا می‌کند.
              </p>

              <ul className="mt-7 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[12.5px] text-white/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <a href="#services" className="btn-light group mt-9 w-fit">
                مشاهده خدمات
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
