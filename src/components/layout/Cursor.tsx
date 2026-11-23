import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A discreet gold ring that follows the pointer and opens up over
 * links and buttons — a nod to the thimble and the needle's eye.
 * The native cursor is left untouched for usability.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      setActive(Boolean(target?.closest('a, button, [data-cursor="ring"]')))
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70"
        animate={{
          width: active ? 54 : 22,
          height: active ? 54 : 22,
          borderColor: active ? 'rgba(17,17,17,0.55)' : 'rgba(166,137,102,0.75)',
          opacity: active ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
