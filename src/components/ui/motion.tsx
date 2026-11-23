import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { toFa } from '../../lib/format'

const EASE = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()
  const animation = {
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8% 0px -8% 0px' },
    transition: { duration: 0.95, delay, ease: EASE },
  } as const

  if (as === 'li') {
    return (
      <motion.li className={className} {...animation}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div className={className} {...animation}>
      {children}
    </motion.div>
  )
}

/** Headline that reveals word by word. */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={reduce ? false : { y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.055, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function Parallax({
  children,
  className,
  distance = 48,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

/** Image that settles from a slight zoom as it enters the viewport. */
export function ZoomImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        initial={reduce ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </div>
  )
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} dir="rtl">
      {prefix}
      {toFa(display.toLocaleString('en-US')).replace(/,/g, '٬')}
      {suffix}
    </span>
  )
}
