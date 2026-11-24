import {
  ArrowUpLeft,
  CarFront,
  Compass,
  FileCheck2,
  Hotel,
  ShieldCheck,
  Ticket,
  type LucideIcon,
} from 'lucide-react'
import { services } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const icons: Record<string, LucideIcon> = {
  ticket: Ticket,
  compass: Compass,
  hotel: Hotel,
  visa: FileCheck2,
  shield: ShieldCheck,
  car: CarFront,
}

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="خدمات ما"
          title="همه چیز برای یک سفر بی‌دغدغه"
          subtitle="از لحظه‌ای که تصمیم به سفر می‌گیرید تا بازگشت به خانه، تمام جزئیات را ما مدیریت می‌کنیم."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Compass
            return (
              <Reveal key={service.title} delay={index * 60} className="h-full">
                <article className="group relative flex h-full flex-col bg-white p-7 transition-colors duration-500 hover:bg-brand-light/45 sm:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-ink/10 text-ink-soft transition-all duration-500 ease-smooth group-hover:border-brand/50 group-hover:bg-white group-hover:text-brand-deep">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.95] text-ink-soft">
                    {service.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-deep opacity-0 transition-all duration-500 ease-smooth group-hover:opacity-100">
                    اطلاعات بیشتر
                    <ArrowUpLeft size={13} />
                  </span>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
