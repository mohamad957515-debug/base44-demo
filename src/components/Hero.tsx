import { useEffect, useRef } from 'react'
import { ArrowLeft, Compass, Headphones, RotateCcw, ShieldCheck } from 'lucide-react'
import { useParallax } from '../lib/hooks'

export default function Hero() {
  const offset = useParallax(0.18, 170)
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Keep the footage playing whenever the hero is on screen, and let it rest
  // (no decoding, no bandwidth) once the visitor scrolls past it.
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#061a2b]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays keep the Persian copy readable without flattening the footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04121f]/80 via-[#062a45]/35 to-[#04121f]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(95%_70%_at_50%_8%,rgba(98,196,255,0.2),transparent_62%)]" />

      <div
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-[190px] pt-28 text-center sm:pb-[210px]"
        style={{ transform: `translate3d(0, ${offset}px, 0)`, opacity: Math.max(0.15, 1 - offset / 620) }}
      >
        <span
          className="rise glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11.5px] font-medium text-white/85"
          style={{ animationDelay: '80ms' }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          آژانس مسافرتی سوری سیما · از ۱۳۸۷
        </span>

        <h1
          className="rise hero-shadow mt-6 max-w-[900px] text-[clamp(2.05rem,5.6vw,4.5rem)] font-black leading-[1.32] text-white"
          style={{ animationDelay: '180ms' }}
        >
          سفر بعدی شما،
          <span className="mt-1 block text-brand-light">از اینجا آغاز می‌شود</span>
        </h1>

        <p
          className="rise mt-6 max-w-[600px] text-[14.5px] leading-[2.1] text-white/80 sm:text-[17px]"
          style={{ animationDelay: '340ms' }}
        >
          بلیط هواپیما، تورهای داخلی و خارجی و تجربه‌ای متفاوت از سفر را با ما تجربه کنید.
        </p>

        <div
          className="rise mt-9 flex w-full max-w-[420px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          style={{ animationDelay: '460ms' }}
        >
          <a href="#flights" className="btn-primary group w-full sm:w-auto">
            رزرو بلیط
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 ease-smooth group-hover:-translate-x-1"
            />
          </a>
          <a href="#destinations" className="btn-glass group w-full sm:w-auto">
            <Compass size={17} className="transition-transform duration-500 group-hover:rotate-45" />
            کشف مقاصد
          </a>
        </div>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/65 sm:gap-x-7 sm:text-[12.5px]"
          style={{ animationDelay: '600ms' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Headphones size={14} className="text-brand" /> پشتیبانی ۲۴ ساعته
          </span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-brand" /> پرداخت امن
          </span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw size={14} className="text-brand" /> استرداد آسان
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[150px] z-10 hidden justify-center sm:flex">
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[9px] font-medium tracking-[0.35em] text-white/45">SCROLL</span>
          <span className="scroll-cue relative block h-10 w-[17px] overflow-hidden rounded-full border border-white/30" />
        </div>
      </div>
    </section>
  )
}
