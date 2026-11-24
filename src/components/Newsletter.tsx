import { useState } from 'react'
import { ArrowLeft, Check, Mail } from 'lucide-react'
import Reveal from './ui/Reveal'

const skyImage =
  'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1920&q=80'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[30px] sm:rounded-[38px]">
          <img
            src={skyImage}
            alt="آسمان آبی و ابرهای روشن"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-[#0b4a72]/72 via-[#0d6ba0]/60 to-[#0b4a72]/78" />
          <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl cloud-drift" />

          <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-[520px] text-[clamp(1.6rem,3.4vw,2.5rem)] font-extrabold text-white">
              مقصد بعدی‌تان را از دست ندهید
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[13px] leading-[2] text-white/80 sm:text-[14px]">
              با عضویت در خبرنامه، از جدیدترین پیشنهادهای سفر و قیمت‌های ویژه باخبر شوید.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                setJoined(true)
              }}
              className="mx-auto mt-8 flex max-w-[520px] flex-col gap-2 sm:flex-row"
            >
              <label className="flex flex-1 items-center gap-2.5 rounded-full border border-white/30 bg-white/15 px-5 py-3 backdrop-blur-md transition-colors duration-300 focus-within:border-white/60 focus-within:bg-white/25">
                <Mail size={16} className="text-white/70" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="آدرس ایمیل شما"
                  aria-label="آدرس ایمیل شما"
                  className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/55"
                />
              </label>
              <button type="submit" className="btn-light group shrink-0 !px-7">
                عضویت
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </button>
            </form>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/65">
              {joined ? (
                <>
                  <Check size={13} className="text-white" />
                  عضویت شما ثبت شد؛ اولین پیشنهاد سفر به‌زودی برایتان ارسال می‌شود.
                </>
              ) : (
                'بدون تبلیغات مزاحم؛ فقط پیشنهادهای واقعی سفر.'
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
