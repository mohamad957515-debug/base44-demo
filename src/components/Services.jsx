import {
  ArrowUpLeft,
  Camera,
  Clapperboard,
  Compass,
  MonitorSmartphone,
  Radio,
  TrendingUp,
} from 'lucide-react'
import { services } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const icons = {
  camera: Camera,
  clapperboard: Clapperboard,
  monitor: MonitorSmartphone,
  trending: TrendingUp,
  radio: Radio,
  compass: Compass,
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[720px] -translate-x-1/2 rounded-full bg-azure/[0.07] blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          label="خدمات"
          title="یک تیم، تمام مسیر تصویر و بازاریابی صنعتی"
          desc="به‌جای هماهنگی با چند پیمانکار پراکنده، همه‌چیز را از یک تیم با یک استاندارد کیفی دریافت می‌کنید."
          action={
            <a href="#contact" className="btn-ghost">
              درخواست مشاوره
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.07}>
                <article className="card group h-full p-7">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-azure-300 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-azure group-hover:text-white group-hover:ring-azure">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[12px] tracking-[0.2em] text-white/25">{service.id}</span>
                  </div>
                  <h3 className="mt-7 text-[19px] font-bold text-white">{service.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-7 text-muted">{service.desc}</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors duration-300 group-hover:text-azure-300"
                  >
                    جزئیات خدمت
                    <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
