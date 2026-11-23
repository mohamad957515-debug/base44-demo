import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { courses, type Course, type Level } from '../../data/site'
import { faPrice } from '../../lib/format'
import { ArrowLeft, Close } from '../ui/Icons'
import { Reveal, ZoomImage } from '../ui/motion'

const spans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-6',
  'lg:col-span-6',
]

const offsets = ['', 'lg:mt-16', '', 'lg:mt-16', '', '']

function CourseCard({ course, index }: { course: Course; index: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`${spans[index % spans.length]} ${offsets[index % offsets.length]}`}
    >
      <Link
        to={`/courses/${course.slug}`}
        className="group relative block"
        aria-label={`${course.title} — ${course.level}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mist sm:aspect-[5/6]">
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]">
            <ZoomImage
              src={course.image}
              alt={course.imageAlt}
              className="h-full w-full"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.18)_0%,rgba(17,17,17,0)_35%,rgba(17,17,17,0.78)_100%)]" />

          <span className="latin absolute right-5 top-5 text-[10px] text-white/75">
            {course.english}
          </span>
          <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10.5px] font-medium text-white backdrop-blur-md">
            {course.level}
          </span>

          <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-6 sm:bottom-6">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-[21px] font-extrabold leading-snug tracking-tight sm:text-[25px]">
                {course.title}
              </h3>
              <span className="latin hidden pb-1 text-[10px] text-white/45 sm:block">
                {course.index}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3 text-[11.5px] text-white/70">
              <span>{course.duration}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{course.sessions}</span>
            </div>

            <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-700 ease-silk lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
              <div className="overflow-hidden">
                <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                  <span className="text-[12.5px] text-white/85">
                    از {faPrice(course.price)} تومان
                  </span>
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
                    مشاهدهٔ دوره
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Courses({
  level,
  onReset,
}: {
  level: Level | null
  onReset: () => void
}) {
  const list = level ? courses.filter((course) => course.level === level) : courses

  return (
    <section id="courses" className="shell py-20 sm:py-28">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ۰۱ — دوره‌های آکادمی
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.2] tracking-tightest">
              هر دوره، یک پروژهٔ هنری.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <p className="text-[14.5px] leading-[2] text-stone">
              دوره‌ها به‌صورت پروژه‌محور طراحی شده‌اند؛ از جلسهٔ اول پارچه در
              دست شماست و در پایان، یک لباسِ کامل با امضای خودتان.
            </p>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {level && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-8 flex flex-wrap items-center gap-3 border-y border-ink/10 py-3"
          >
            <span className="text-[12.5px] text-stone">
              نمایش دوره‌های سطح <strong className="font-semibold text-ink">{level}</strong>
            </span>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 px-3 py-1 text-[11.5px] text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
            >
              <Close className="h-3 w-3" />
              نمایش همه
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
        {list.map((course, index) => (
          <CourseCard key={course.slug} course={course} index={index} />
        ))}
      </div>

      <Reveal className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6">
        <p className="text-[12.5px] text-stone">
          ظرفیت هر گروه محدود است؛ برای تعیین سطح، یک گفت‌وگوی کوتاه کافی است.
        </p>
        <a
          href="/#faq"
          onClick={(event) => {
            event.preventDefault()
            document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="hidden items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-gold sm:inline-flex"
        >
          سوالات متداول
          <ArrowLeft className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </section>
  )
}
