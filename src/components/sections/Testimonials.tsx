import { testimonials } from '../../data/site'
import { Star } from '../ui/Icons'
import { Reveal } from '../ui/motion'

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F1F1EC_0%,#F9F9F7_100%)] py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-gold/[0.08] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="float-slower pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-white blur-[90px]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                ۰۵ — هنرجویان
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.24] tracking-tightest">
                هنرجویانی که
                <br />
                به ما اعتماد کردند.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 text-[12.5px] text-stone">
              <span className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5" />
                ))}
              </span>
              <span>۴٫۹ از ۵ — بر اساس ۳۸۰ نظر ثبت‌شده</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/70 bg-white/55 p-7 shadow-[0_30px_80px_-60px_rgba(17,17,17,0.5)] backdrop-blur-xl transition-transform duration-700 ease-silk hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex gap-0.5 text-gold">
                      {Array.from({ length: item.rating }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-3.5 w-3.5" />
                      ))}
                    </span>
                    <span className="latin text-[9px] text-stone/60">
                      {`0${index + 1}`}
                    </span>
                  </div>
                  <blockquote className="mt-6 text-[13.5px] leading-[2.05] text-ink/80">
                    «{item.quote}»
                  </blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">{item.name}</p>
                    <p className="mt-1 text-[11px] text-stone">
                      {item.course} — {item.city}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
