import {
  BadgeCheck,
  CreditCard,
  Headphones,
  Plane,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { features } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const icons: Record<string, LucideIcon> = {
  wallet: Wallet,
  zap: Zap,
  headset: Headphones,
  card: CreditCard,
  plane: Plane,
  badge: BadgeCheck,
}

const cabinImage =
  'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80'

export default function WhyUs() {
  return (
    <section id="about" className="scroll-mt-24 bg-cloud-soft py-20 sm:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="چرا سوری سیما"
            title="سفر، وقتی بهتر است که خیالتان راحت باشد"
            subtitle="ما فقط بلیط نمی‌فروشیم؛ مسئولیت کامل سفر شما را می‌پذیریم."
          />

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = icons[feature.icon] ?? BadgeCheck
              return (
                <Reveal key={feature.title} delay={index * 70}>
                  <div className="flex gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-deep shadow-[0_8px_20px_-12px_rgba(23,43,58,0.4)]">
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="text-[14.5px] font-bold text-ink">{feature.title}</h3>
                      <p className="mt-1 text-[12.5px] leading-[1.9] text-ink-soft">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={140} className="relative">
          <div className="relative overflow-hidden rounded-[30px] shadow-soft">
            <img
              src={cabinImage}
              alt="کابین لوکس هواپیما"
              loading="lazy"
              className="h-[380px] w-full object-cover sm:h-[500px]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-md ring-1 ring-white/25">
              <p className="text-[11.5px] text-white/85">پروازهای مستقیم به بیش از ۱۲۰ مقصد</p>
              <Plane size={16} className="text-white/80" />
            </div>
          </div>

          <div className="glass-light absolute -bottom-7 right-4 rounded-2xl px-5 py-4 shadow-card sm:right-8">
            <p className="text-[26px] font-extrabold leading-none text-ink">۹۸٪</p>
            <p className="mt-1.5 text-[11px] text-ink-soft">رضایت مسافران</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
