import { stats } from '../data/site'
import { faNumber } from '../lib/format'
import { useCountUp, useInView } from '../lib/hooks'
import Reveal from './ui/Reveal'

function StatItem({
  value,
  prefix,
  label,
  delay,
}: {
  value: number
  prefix: string
  label: string
  delay: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35)
  const count = useCountUp(value, inView)

  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={ref}
        className="flex h-full flex-col items-center justify-center px-3 py-6 text-center sm:px-6"
      >
        <p className="text-[clamp(1.9rem,4vw,3rem)] font-black leading-none tracking-tight text-ink">
          <span className="text-brand-deep">{prefix}</span>
          {faNumber(count)}
        </p>
        <p className="mt-3 text-[11.5px] text-ink-soft">{label}</p>
      </div>
    </Reveal>
  )
}

export default function Stats() {
  return (
    <section className="border-y border-ink/[0.07] bg-white py-8 sm:py-12">
      <div className="shell">
        <div className="grid grid-cols-2 divide-ink/[0.07] lg:grid-cols-4 lg:divide-x">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              label={stat.label}
              delay={index * 80}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
