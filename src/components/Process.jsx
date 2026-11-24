import { process } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Process() {
  return (
    <section id="process" className="relative border-y border-white/[0.06] bg-night/40 py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading label="مسیر همکاری" title="چهار گام روشن، بدون ابهام" />

        <div className="relative mt-14">
          <div className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-l from-transparent via-white/15 to-transparent md:block" />
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1} className="group relative">
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink text-[15px] font-bold text-azure-300 transition-all duration-500 group-hover:border-azure/50 group-hover:bg-azure group-hover:text-white group-hover:shadow-glow">
                  {item.step}
                </span>
                <h3 className="mt-6 text-[17px] font-bold text-white">{item.title}</h3>
                <p className="mt-2.5 max-w-[240px] text-[13px] leading-7 text-muted">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
