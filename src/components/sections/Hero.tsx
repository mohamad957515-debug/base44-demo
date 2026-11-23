import { motion, useReducedMotion } from 'framer-motion'
import { HERO_POSTER, HERO_VIDEO, type Level } from '../../data/site'
import { ArrowLeft, ArrowUpLeft, Sparkle } from '../ui/Icons'
import { WordReveal } from '../ui/motion'

const levels: Level[] = ['مبتدی', 'متوسط', 'پیشرفته']

export default function Hero({
  level,
  onLevelChange,
}: {
  level: Level | null
  onLevelChange: (level: Level) => void
}) {
  const reduce = useReducedMotion()

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative" id="top">
      <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,249,247,0.78)_0%,rgba(249,249,247,0.34)_38%,rgba(249,249,247,0.6)_68%,rgba(249,249,247,0.95)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(75%_70%_at_32%_46%,rgba(249,249,247,0.82)_0%,rgba(249,249,247,0.25)_58%,transparent_100%)]"
        />

        <div className="relative z-10 flex h-full flex-col justify-end pb-36 sm:justify-center sm:pb-24">
          <div className="shell">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow text-ink/60"
            >
              <span className="eyebrow-line bg-gold" />
              آکادمی خیاطی و طراحی لباس — تهران
            </motion.div>

            <h1 className="mt-7 max-w-4xl text-[clamp(2.4rem,6.2vw,5.4rem)] font-extrabold leading-[1.14] tracking-tightest text-ink">
              <WordReveal text="هنرِ تن‌پوش،" delay={0.3} />
              <span className="block text-gold-deep">
                <WordReveal text="با دستانِ شما." delay={0.5} />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-[15px] leading-[2] text-ink/65 sm:text-[17px]"
            >
              از اولین کوک تا اوت‌کوتور؛ مسیری آرام و دقیق برای تبدیل پارچه به
              لباسی که فقط از آنِ شماست.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button type="button" onClick={scrollToCourses} className="btn-primary">
                مشاهدهٔ دوره‌ها
                <ArrowLeft className="h-4 w-4" />
              </button>
              <a
                href="/#atelier"
                onClick={(event) => {
                  event.preventDefault()
                  document
                    .getElementById('atelier')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center gap-2 px-2 py-3 text-[13.5px] font-medium text-ink/70 transition-colors hover:text-ink"
              >
                دربارهٔ آتلیه
                <span className="h-px w-7 bg-ink/25 transition-all duration-500 group-hover:w-10 group-hover:bg-gold" />
              </a>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-40 left-8 hidden items-center gap-3 [writing-mode:vertical-rl] lg:flex">
            <span className="h-14 w-px bg-gradient-to-b from-transparent to-ink/40" />
            <span className="latin text-[9px] text-ink/45">Scroll</span>
          </div>
        </div>
      </section>

      {/* Floating skill selector — overlaps the hero */}
      <div className="relative z-20 -mt-28 sm:-mt-24">
        <div className="shell">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="card-glass rounded-[1.6rem] p-5 sm:p-7"
          >
            <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold sm:grid">
                  <Sparkle className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-stone">
                    <span className="eyebrow-line" />
                    از کجا شروع کنیم؟
                  </p>
                  <h2 className="mt-2 text-[19px] font-extrabold tracking-tight">
                    سطح مهارت خود را انتخاب کنید
                  </h2>
                  <p className="mt-1 text-[12.5px] text-stone">
                    دوره‌های متناسب با سطح شما نمایش داده می‌شود.
                  </p>
                </div>
              </div>

              <div
                role="group"
                aria-label="انتخاب سطح مهارت"
                className="flex flex-wrap gap-2"
              >
                {levels.map((item) => {
                  const active = level === item
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onLevelChange(item)}
                      className={`rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-500 ease-silk ${
                        active
                          ? 'border-ink bg-ink text-paper'
                          : 'border-ink/12 bg-white/50 text-ink/70 hover:border-ink/40 hover:text-ink'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={scrollToCourses}
                  className="btn-primary whitespace-nowrap"
                >
                  دیدن دوره‌های پیشنهادی
                  <ArrowUpLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
