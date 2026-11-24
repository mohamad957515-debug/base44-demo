import { motion } from 'framer-motion'
import { ArrowUpLeft, Check, Play } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 sm:pt-32"
    >
      <motion.div
        className="absolute inset-0 -z-30"
        initial={{ scale: 1.14, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <img
          src="/images/hero-industrial.jpg"
          alt="نمای هوایی از مجتمع صنعتی در گرگ‌ومیش"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_left,rgba(5,7,12,0.97)_10%,rgba(5,7,12,0.8)_48%,rgba(5,7,12,0.42)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-ink via-ink/20 to-ink/70" />
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-azure/20 blur-[140px]" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[12.5px] text-white/75"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure-400" />
            </span>
            استودیو تخصصی صنعت — از ۱۳۸۷ تا امروز
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.25rem,5.2vw,4.5rem)] font-extrabold leading-[1.24] tracking-tight text-white">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              صنعت شما دیده نمی‌شود،
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38, ease }}
            >
              مگر آنکه <span className="text-gradient">درست روایت شود.</span>
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[15.5px] leading-9 text-white/65"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease }}
          >
            سوری سیما با ۱۷ سال تجربه و بیش از ۱۰۰۰ پروژه، تصویر، وب‌سایت و کمپین دیجیتال شرکت‌های
            صنعتی را در سطحی می‌سازد که در مذاکره، نمایشگاه و بازار صادراتی برگ برندهٔ شما باشد.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.64, ease }}
          >
            <a href="#contact" className="btn-primary group">
              رزرو جلسه مشاوره رایگان
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#work" className="btn-ghost group">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-azure">
                <Play className="h-3 w-3 fill-white text-white" />
              </span>
              تماشای نمونه‌کارها
            </a>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {['قرارداد محرمانگی و رعایت HSE', 'پاسخ‌گویی کمتر از ۲۴ ساعت', 'تهران، البرز و قزوین'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-azure-400" />
                  {item}
                </li>
              ),
            )}
          </motion.ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[400px] lg:col-span-5 lg:ms-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease }}
        >
          <div className="glass overflow-hidden rounded-[30px] p-2.5">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[22px]">
              <img
                src="/images/experience-reel.jpg"
                alt="نورافکن و فضای فیلم‌برداری استودیو"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p dir="ltr" className="text-right text-[10px] tracking-[0.28em] text-white/45">
                    SHOWREEL 2026
                  </p>
                  <p className="mt-1.5 text-[15px] font-semibold text-white">روایت تصویری صنعت</p>
                </div>
                <a
                  href="#work"
                  aria-label="تماشای شوریل نمونه‌کارها"
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-azure hover:ring-azure"
                >
                  <Play className="h-5 w-5 fill-white text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="float-soft glass absolute -start-3 top-10 hidden rounded-2xl px-5 py-3.5 sm:block">
            <p className="text-2xl font-extrabold text-white">+۱۰۰۰</p>
            <p className="mt-0.5 text-[11px] text-white/55">پروژه موفق صنعتی</p>
          </div>

          <div className="glass absolute -bottom-5 start-6 hidden items-center gap-2.5 rounded-full px-4 py-2.5 text-[11.5px] text-white/65 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            تیم اعزامی با تجهیزات سینمایی و پهپاد
          </div>
        </motion.div>
      </div>

      <motion.div
        className="container-x mt-14 hidden items-center gap-3 text-[11px] tracking-[0.2em] text-white/35 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  )
}
