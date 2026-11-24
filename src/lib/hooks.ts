import { useEffect, useRef, useState } from 'react'

/** Fires once when the element enters the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    // A jump (anchor link, restored scroll) can skip past the element without
    // ever intersecting, so also settle once it is at or above the viewport.
    const reached = () => el.getBoundingClientRect().top < window.innerHeight * 0.9

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true)
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    const onScroll = () => {
      if (reached()) setInView(true)
    }

    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (reached()) setInView(true)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [inView, threshold])

  return { ref, inView }
}

/** Eased number counter that starts when `active` becomes true. */
export function useCountUp(target: number, active: boolean, duration = 1900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

/** True once the page is scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Subtle vertical parallax offset driven by page scroll. */
export function useParallax(strength = 0.15, max = 140) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * strength, max))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [strength, max])

  return offset
}
