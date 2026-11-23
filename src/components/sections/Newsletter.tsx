import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from '../ui/Icons'
import { Reveal } from '../ui/motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="shell pb-20 sm:pb-28">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(120%_120%_at_15%_0%,#FFFFFF_0%,#F6F2EA_42%,#EDE6DA_100%)] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-white/70 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow justify-center">
              <span className="eyebrow-line" />
              خبرنامهٔ آتلیه
              <span className="eyebrow-line" />
            </p>
            <h2 className="mt-6 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.28] tracking-tightest">
              دورهٔ بعدی را از دست ندهید.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[13.5px] leading-[2] text-stone">
              با عضویت در خبرنامه، زمان شروع دوره‌ها، ظرفیت‌های جدید و
              نکته‌های کوچک آتلیه را دریافت کنید.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full border border-gold/40 bg-white/70 px-6 py-4 text-[13px] text-ink"
                role="status"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
                ثبت شد. اولین نامهٔ آتلیه به‌زودی برای شما ارسال می‌شود.
              </motion.div>
            ) : (
              <form
                onSubmit={submit}
                className="mx-auto mt-9 flex max-w-md flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  آدرس ایمیل شما
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="آدرس ایمیل شما"
                  className="field h-12 flex-1 rounded-full border-white bg-white/80 px-5 text-center sm:text-right"
                  dir="ltr"
                />
                <button type="submit" className="btn-primary h-12 shrink-0">
                  عضویت
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </form>
            )}

            <p className="mt-4 text-[11px] text-stone/80">
              هفته‌ای یک ایمیل، بدون تبلیغ اضافه. هر زمان بخواهید لغو کنید.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
