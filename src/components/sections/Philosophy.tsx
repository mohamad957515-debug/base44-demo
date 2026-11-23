import { trustPoints } from '../../data/site'
import { ArrowUpLeft } from '../ui/Icons'
import { Reveal } from '../ui/motion'

export default function Philosophy() {
  return (
    <section id="atelier" className="relative overflow-hidden bg-mist/50 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-gold/[0.07] blur-[120px]"
      />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                ۰۲ — چرا آتلیهٔ ما
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.24] tracking-tightest">
                دوخت، وقتی هنر می‌شود
                <br />
                که با دقت آغاز شود.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[14.5px] leading-[2] text-stone">
                آکادمی طباطبایی با همین باور ساخته شده است: خیاطی فقط مهارت
                دست نیست؛ شناختِ فرم، صبر و سلیقه است. اینجا یاد می‌گیرید
                لباس را بفهمید، نه فقط بدوزید.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="/#contact" className="btn-ghost">
                  گفت‌وگو با آکادمی
                  <ArrowUpLeft className="h-4 w-4" />
                </a>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold">خانمک طباطبایی</p>
                  <p className="text-[11.5px] text-stone">بنیان‌گذار و مدرس اوت‌کوتور</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-ink/10">
            {trustPoints.map((point, index) => (
              <Reveal
                as="li"
                key={point.title}
                delay={index * 0.04}
                className="group grid grid-cols-[auto_1fr] gap-5 border-b border-ink/10 py-6 transition-colors duration-500 hover:border-gold/50 sm:gap-8 sm:py-7"
              >
                <span className="latin pt-1 text-[10px] text-gold/80">
                  {`0${index + 1}`}
                </span>
                <div>
                  <h3 className="text-[16.5px] font-bold tracking-tight transition-colors duration-500 group-hover:text-gold-deep">
                    {point.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[13.5px] leading-[1.95] text-stone">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
