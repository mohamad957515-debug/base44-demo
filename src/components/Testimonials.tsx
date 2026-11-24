import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-light via-cloud-soft to-cloud-soft py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />

      <div className="shell relative">
        <SectionHeading
          align="center"
          eyebrow="تجربه مسافران"
          title="مسافرانی که به ما اعتماد کردند"
          subtitle="روایت واقعی کسانی که سفرشان را به سوری سیما سپردند."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 100}>
              <figure className="flex h-full flex-col rounded-[26px] border border-white/80 bg-white/65 p-6 shadow-card backdrop-blur-xl transition-all duration-500 ease-smooth hover:-translate-y-1 hover:bg-white/85 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} size={13} className="fill-brand text-brand" />
                    ))}
                  </div>
                  <Quote size={22} className="text-brand/35" />
                </div>

                <blockquote className="mt-5 flex-1 text-[13px] leading-[2] text-ink/85">
                  «{testimonial.text}»
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-[11.5px] font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-ink">
                      {testimonial.name}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-ink-soft">
                      سفر به {testimonial.destination}
                    </span>
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
