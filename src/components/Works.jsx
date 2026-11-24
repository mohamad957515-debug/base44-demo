import { ArrowUpLeft } from 'lucide-react'
import { works } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Works() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="نمونه‌کارها"
          title="تصویری که اعتبار صنعتی می‌سازد"
          desc="گزیده‌ای از پروژه‌های تصویر، فیلم و محتوایی که برای مجموعه‌های صنعتی ایران ساخته‌ایم."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <Reveal key={work.title} delay={(i % 3) * 0.08} className={i % 2 === 1 ? 'lg:mt-10' : ''}>
              <a href="#contact" className="group block">
                <article className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/[0.07] bg-panel">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-all duration-[1100ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-ink/40 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
                      {work.category}
                    </span>
                    <span className="text-[11px] tracking-widest text-white/50">{work.year}</span>
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-[19px] font-bold leading-snug text-white">{work.title}</h3>
                      <span className="mt-2 inline-block h-px w-8 bg-azure-400 transition-all duration-500 group-hover:w-14" />
                    </div>
                    <span className="inline-flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:bg-azure group-hover:opacity-100">
                      <ArrowUpLeft className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a href="#contact" className="btn-ghost">
            مشاهده همه نمونه‌کارها
            <ArrowUpLeft className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
