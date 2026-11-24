import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { stats } from '../data/content'
import Reveal from './ui/Reveal'

function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString('fa-IR')}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-night/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-azure/50 to-transparent" />
      <div className="container-x grid grid-cols-2 gap-y-10 py-12 sm:py-14 lg:grid-cols-4">
        {stats.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 0.08}
            className={`flex flex-col gap-2 px-2 lg:px-8 ${
              i !== 0 ? 'lg:border-r lg:border-white/[0.07]' : ''
            } ${i % 2 !== 0 ? 'border-r border-white/[0.07] pr-5 lg:pr-8' : ''}`}
          >
            <p className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-none text-white">
              <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
            </p>
            <p className="text-[12.5px] text-muted">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
