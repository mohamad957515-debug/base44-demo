import { Star } from 'lucide-react'
import { testimonials } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="روایت کارفرمایان"
          title="اعتمادی که در پروژهٔ بعدی تکرار می‌شود"
          desc="۹۶٪ کارفرمایان ما پس از پروژهٔ اول، همکاری را ادامه داده‌اند. این عدد حاصل شفافیت در اجرا و تعهد به نتیجه است."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.09}>
              <figure className="glass flex h-full flex-col rounded-[26px] p-7 transition-colors duration-500 hover:border-azure/30">
                <div className="flex items-center gap-1 text-azure-300">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-[14px] leading-8 text-white/75">
                  «{item.quote}»
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/[0.08] pt-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-azure/40 to-azure/10 text-[13px] font-bold text-white ring-1 ring-white/15">
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-semibold text-white">{item.name}</span>
                    <span className="mt-0.5 block text-[11.5px] text-white/45">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
