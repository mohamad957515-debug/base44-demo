import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { courses, getCourse, photo, type Course } from '../data/site'
import { faPrice, toFa } from '../lib/format'
import { ArrowLeft, ArrowUpLeft, Check, Plus, Shield, Hanger, Clock } from '../components/ui/Icons'
import { Reveal, ZoomImage } from '../components/ui/motion'
import NotFound from './NotFound'

function Syllabus({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="mt-2">
      {course.syllabus.map((module, index) => {
        const isOpen = open === index
        return (
          <li key={module.title} className="border-b border-ink/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`syllabus-${index}`}
              className="group flex w-full items-center justify-between gap-6 py-5 text-right"
            >
              <span className="flex items-center gap-4">
                <span className="latin text-[10px] text-gold/80">
                  {toFa(String(index + 1).padStart(2, '0'))}
                </span>
                <span
                  className={`text-[14px] font-semibold tracking-tight transition-colors duration-500 ${
                    isOpen ? 'text-gold-deep' : 'text-ink group-hover:text-gold-deep'
                  }`}
                >
                  {module.title}
                </span>
              </span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-silk ${
                  isOpen
                    ? 'rotate-45 border-gold bg-gold text-white'
                    : 'border-ink/15 text-ink/50 group-hover:border-gold group-hover:text-gold'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  id={`syllabus-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2.5 pb-6 pr-9">
                    {module.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-stone">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                        {item}
                      </li>
                    ))}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

function EnrollSection({ course }: { course: Course }) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="enroll" className="mt-20 scroll-mt-28 border-t border-ink/10 bg-mist/50 py-16 sm:py-20">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ثبت‌نام
            </p>
            <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold leading-[1.28] tracking-tightest">
              جای شما در آتلیه
              <br />
              رزرو شود.
            </h2>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.95] text-stone">
              فرم را تکمیل کنید؛ در کمتر از یک روز کاری برای تعیین سطح و
              هماهنگی زمان با شما تماس می‌گیریم.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-7 space-y-3 text-[12.5px] text-ink/75">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-gold" />
                شروع {course.startDate} — {course.duration}
              </li>
              <li className="flex items-center gap-2.5">
                <Hanger className="h-4 w-4 text-gold" />
                ظرفیت گروه: {course.seats}
              </li>
              <li className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-gold" />
                امکان پرداخت در دو قسط
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_40px_100px_-70px_rgba(17,17,17,0.6)] backdrop-blur-xl sm:p-8">
              {sent ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center" role="status">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-6 text-[20px] font-extrabold tracking-tight">
                    درخواست شما ثبت شد
                  </h3>
                  <p className="mt-3 max-w-sm text-[13px] leading-[1.95] text-stone">
                    {name ? `${name} عزیز، ` : ''}
                    به‌زودی برای هماهنگی دورهٔ «{course.title}» با شما تماس
                    می‌گیریم.
                  </p>
                  <Link to="/#courses" className="btn-ghost mt-7">
                    مشاهدهٔ دوره‌های دیگر
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={submit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enroll-name" className="mb-2 block text-[11.5px] text-stone">
                        نام و نام خانوادگی
                      </label>
                      <input
                        id="enroll-name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="field"
                        placeholder="نام شما"
                      />
                    </div>
                    <div>
                      <label htmlFor="enroll-phone" className="mb-2 block text-[11.5px] text-stone">
                        شمارهٔ تماس
                      </label>
                      <input
                        id="enroll-phone"
                        type="tel"
                        required
                        className="field"
                        placeholder="۰۹۱۲ ..."
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enroll-email" className="mb-2 block text-[11.5px] text-stone">
                      ایمیل (اختیاری)
                    </label>
                    <input
                      id="enroll-email"
                      type="email"
                      className="field"
                      placeholder="you@example.com"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label htmlFor="enroll-note" className="mb-2 block text-[11.5px] text-stone">
                      تجربهٔ قبلی یا سوال شما
                    </label>
                    <textarea
                      id="enroll-note"
                      rows={3}
                      className="field resize-none"
                      placeholder="اگر تجربهٔ قبلی دارید یا سوالی دارید، اینجا بنویسید."
                    />
                  </div>
                  <button type="submit" className="btn-gold mt-1 w-full">
                    ارسال درخواست ثبت‌نام
                    <ArrowUpLeft className="h-4 w-4" />
                  </button>
                  <p className="text-center text-[11px] text-stone/80">
                    با ارسال این فرم، شرایط ثبت‌نام آکادمی را می‌پذیرید.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Related({ current }: { current: string }) {
  const others = courses.filter((course) => course.slug !== current).slice(0, 3)

  return (
    <section className="shell py-16 sm:py-20">
      <div className="flex items-end justify-between">
        <h2 className="text-[22px] font-extrabold tracking-tight">دوره‌های دیگر آتلیه</h2>
        <Link
          to="/#courses"
          className="group inline-flex items-center gap-2 text-[12.5px] font-medium text-ink/70 hover:text-gold"
        >
          همهٔ دوره‌ها
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((course) => (
          <Link key={course.slug} to={`/courses/${course.slug}`} className="group block">
            <div className="overflow-hidden rounded-[1.2rem] bg-mist">
              <img
                src={course.image}
                alt={course.imageAlt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-bold tracking-tight transition-colors group-hover:text-gold-deep">
                  {course.title}
                </h3>
                <p className="mt-1 text-[11.5px] text-stone">
                  {course.level} — {course.duration}
                </p>
              </div>
              <span className="text-[12px] text-stone">{faPrice(course.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function CoursePage() {
  const { slug } = useParams()
  const course = getCourse(slug)

  if (!course) return <NotFound />

  return (
    <main className="pb-20 lg:pb-0">
      <div className="shell pt-28 sm:pt-32">
        <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[11.5px] text-stone">
          <Link to="/" className="transition-colors hover:text-ink">
            خانه
          </Link>
          <span className="text-ink/25">/</span>
          <Link to="/#courses" className="transition-colors hover:text-ink">
            دوره‌ها
          </Link>
          <span className="text-ink/25">/</span>
          <span className="text-ink/70">{course.title}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                دورهٔ تخصصی — {course.index}
              </p>
              <h1 className="mt-6 text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.18] tracking-tightest">
                {course.title}
              </h1>
              <p className="latin mt-4 text-[11px] text-gold">{course.english}</p>
              <p className="mt-6 max-w-2xl text-[15px] leading-[2.05] text-stone">
                {course.summary}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[1.1rem] border border-ink/10 bg-ink/10 sm:grid-cols-4">
                {[
                  { label: 'سطح', value: course.level },
                  { label: 'مدت', value: course.duration },
                  { label: 'جلسات', value: course.sessions },
                  { label: 'شروع', value: course.startDate },
                ].map((item) => (
                  <div key={item.label} className="bg-paper px-4 py-4">
                    <dt className="text-[10.5px] text-stone">{item.label}</dt>
                    <dd className="mt-1 text-[13px] font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <section className="mt-14">
              <h2 className="text-[21px] font-extrabold tracking-tight">پس از این دوره</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 rounded-xl border border-ink/10 px-4 py-3 text-[13px] text-ink/80"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check className="h-3 w-3" strokeWidth={1.8} />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <div className="flex items-end justify-between border-b border-ink/10 pb-4">
                <h2 className="text-[21px] font-extrabold tracking-tight">سرفصل‌های دوره</h2>
                <span className="text-[11.5px] text-stone">
                  {toFa(course.syllabus.length)} فصل
                </span>
              </div>
              <Syllabus course={course} />
            </section>

            <section className="mt-14 rounded-[1.4rem] border border-ink/10 bg-mist/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={photo(8516528, 200)}
                  alt="خانمک طباطبایی"
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-[14px] font-bold">خانمک طباطبایی</p>
                  <p className="mt-1 text-[11.5px] text-stone">
                    مدرس دوره، طراح لباس و بنیان‌گذار آکادمی
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[13px] leading-[2] text-stone">
                این دوره با تمرکز بر کار عملی و بازخورد فردی طراحی شده است؛ هر
                جلسه با یک تمرین کوچک شروع می‌شود و با پروِ کار شما پایان
                می‌یابد.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[1.4rem] border border-ink/10 bg-white/70 p-6 backdrop-blur">
                <p className="text-[11.5px] text-stone">شهریهٔ دوره</p>
                <p className="mt-2 text-[26px] font-extrabold tracking-tight">
                  {faPrice(course.price)}{' '}
                  <span className="text-[12.5px] font-medium text-stone">تومان</span>
                </p>
                <p className="mt-1 text-[11px] text-stone">امکان پرداخت در دو قسط</p>
                <a href="#enroll" className="btn-gold mt-5 w-full">
                  ثبت‌نام در این دوره
                  <ArrowUpLeft className="h-4 w-4" />
                </a>
                <ul className="mt-5 space-y-2.5 text-[12px] text-stone">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-gold" />
                    ظرفیت گروه: {course.seats}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-gold" />
                    ابزار و کارگاه در اختیار هنرجو
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-gold" />
                    گواهی پایان دورهٔ آکادمی
                  </li>
                </ul>
              </div>
              <ZoomImage
                src={course.image}
                alt={course.imageAlt}
                className="mt-5 aspect-[4/5] rounded-[1.5rem] bg-mist"
              />
            </div>
          </aside>
        </div>
      </div>

      <EnrollSection course={course} />
      <Related current={course.slug} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10.5px] text-stone">شهریهٔ دوره</p>
            <p className="text-[15px] font-bold">{faPrice(course.price)} تومان</p>
          </div>
          <a href="#enroll" className="btn-gold px-5 py-2.5 text-[12.5px]">
            ثبت‌نام در این دوره
          </a>
        </div>
      </div>
    </main>
  )
}
