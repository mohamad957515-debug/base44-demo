import { academyServices, CRAFT_VIDEO } from '../../data/site'
import { ArrowLeft, Check, Hanger, Headset, Needle, Ruler, Scissors, Sparkle } from '../ui/Icons'
import { Reveal } from '../ui/motion'

const serviceIcons = [Needle, Scissors, Hanger, Ruler, Sparkle, Headset]

const bullets = [
  'کارگاه مجهز و پارچهٔ تمرین در اختیار شما',
  'بازخورد فردی روی هر پرو و هر کوک',
  'مسیر مشخص از مبتدی تا پروژهٔ سفارشی',
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-ink">
            <video
              className="aspect-[4/5] w-full object-cover opacity-95"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={CRAFT_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.15)_0%,rgba(17,17,17,0)_45%,rgba(17,17,17,0.7)_100%)]" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <p className="latin text-[9px] text-white/60">The Atelier</p>
                <p className="mt-2 text-[17px] font-bold">کارگاه آکادمی، تهران</p>
              </div>
              <span className="rounded-full border border-white/30 px-3 py-1 text-[10.5px] text-white/85 backdrop-blur-md">
                هر روز، ۹ تا ۱۹
              </span>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ۰۳ — تجربهٔ آکادمی
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.24] tracking-tightest">
              بیشتر از یک دوره،
              <br />
              یک مسیر.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[14.5px] leading-[2] text-stone">
              ما فقط الگو و کوک آموزش نمی‌دهیم؛ همراه شما هستیم تا سبک خودتان
              را پیدا کنید. از انتخاب پارچه تا پروِ نهایی و عکاسی از کار،
              آکادمی در تمام مسیر کنار شماست.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-7 space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13.5px] text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                    <Check className="h-3 w-3" strokeWidth={1.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#services" className="btn-primary">
                مشاهدهٔ خدمات
                <ArrowLeft className="h-4 w-4" />
              </a>
              <a href="#courses" className="btn-ghost">
                دوره‌ها
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div id="services" className="shell mt-24 scroll-mt-28">
        <div className="flex flex-col gap-6 border-t border-ink/10 pt-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="max-w-lg text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.3] tracking-tightest">
              همه چیز برای یک مسیر بی‌دغدغه.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-sm text-[13.5px] leading-[1.95] text-stone">
              خدمات آکادمی، از انتخاب پارچه تا ورود به بازار کار، در یک
              اکوسیستم آرام و حرفه‌ای.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.4rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {academyServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]
            return (
              <Reveal key={service.title} delay={(index % 3) * 0.05}>
                <div className="group h-full bg-paper p-7 transition-colors duration-500 hover:bg-white sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink/70 transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-[16px] font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.95] text-stone">
                    {service.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
