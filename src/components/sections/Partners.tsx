import { partners } from '../../data/site'
import { Reveal } from '../ui/motion'

export default function Partners() {
  return (
    <section className="border-b border-ink/10 py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Reveal>
          <p className="eyebrow shrink-0">
            <span className="eyebrow-line" />
            ابزار و برندهای همکار
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-10">
          {partners.map((name, index) => (
            <Reveal key={name} delay={index * 0.04}>
              <span className="latin cursor-default text-[13px] tracking-[0.26em] text-ink/30 transition-colors duration-500 hover:text-ink/70">
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
