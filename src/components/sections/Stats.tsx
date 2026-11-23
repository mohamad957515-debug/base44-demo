import { stats } from '../../data/site'
import { Counter, Reveal } from '../ui/motion'

export default function Stats() {
  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="shell grid grid-cols-2 gap-y-10 py-14 sm:py-16 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.06}
            className={`px-2 sm:px-6 ${
              index % 2 === 1 ? 'border-r border-ink/10' : ''
            } ${index > 1 ? 'border-t border-ink/10 pt-10 lg:border-t-0 lg:pt-0' : ''} ${
              index === 2 ? 'lg:border-r lg:border-ink/10' : ''
            }`}
          >
            <p className="text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-none tracking-tightest text-ink">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-4 text-[12.5px] tracking-wide text-stone">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
