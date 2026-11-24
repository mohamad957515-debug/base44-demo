import { ArrowLeft, BedDouble, Clock3, Star } from 'lucide-react'
import { packages } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Packages() {
  return (
    <section id="tours" className="scroll-mt-24 bg-cloud-soft py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="تورهای ویژه"
            title="سفرهایی که برای شما طراحی شده‌اند"
            subtitle="بسته‌های کامل پرواز، اقامت و گشت، با قیمت نهایی و بدون هزینه پنهان."
          />
          <Reveal delay={180} className="shrink-0">
            <a href="#tours" className="btn-outline group">
              همه تورها
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-ink/[0.06] bg-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-[220px] overflow-hidden sm:h-[240px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10.5px] font-semibold text-ink backdrop-blur-md">
                    <Clock3 size={12} className="text-brand-deep" />
                    {item.duration}
                  </span>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink/45 px-2.5 py-1.5 text-[10.5px] font-bold text-white backdrop-blur-md">
                    <Star size={11} className="fill-brand text-brand" />
                    {item.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-[18px] font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink-soft">
                    <BedDouble size={13} className="text-brand-deep" />
                    {item.hotel}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-ink/[0.07] pt-4">
                    <p className="text-[10.5px] text-ink-soft">
                      از
                      <b className="mx-1 text-[15px] font-extrabold text-ink">
                        {item.price}
                      </b>
                      تومان
                    </p>
                    <a
                      href="#flights"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[11.5px] font-semibold text-ink transition-all duration-300 ease-smooth group-hover:border-brand-deep group-hover:bg-brand-deep group-hover:text-white"
                    >
                      مشاهده تور
                      <ArrowLeft size={13} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
