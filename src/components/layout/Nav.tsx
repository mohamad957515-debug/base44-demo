import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems, contact } from '../../data/site'
import { Close, Menu, Phone, ArrowUpLeft } from '../ui/Icons'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const solid = scrolled || !isHome
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 48))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/${href}`)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="shell">
          <div
            className={`mt-3 flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-700 ease-silk sm:mt-5 sm:px-6 ${
              solid
                ? 'border-ink/10 bg-paper/85 text-ink shadow-[0_18px_60px_-40px_rgba(17,17,17,0.5)] backdrop-blur-2xl'
                : 'border-white/70 bg-white/55 text-ink shadow-[0_18px_60px_-50px_rgba(17,17,17,0.45)] backdrop-blur-xl'
            }`}
          >
            <Logo />

            <nav
              aria-label="ناوبری اصلی"
              className="hidden items-center gap-7 lg:flex"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`/${item.href}`}
                  onClick={(event) => {
                    event.preventDefault()
                    go(item.href)
                  }}
                  className="group relative text-[13px] font-medium opacity-80 transition-opacity duration-300 hover:opacity-100"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 right-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-silk group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${contact.phoneHref}`}
                aria-label="تماس تلفنی با آکادمی"
                className="hidden h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors duration-500 hover:border-ink/40 md:grid"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="/#courses"
                onClick={(event) => {
                  event.preventDefault()
                  go('#courses')
                }}
                className="hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-paper transition-all duration-500 ease-silk hover:bg-gold sm:inline-flex"
              >
                ثبت‌نام دوره
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="باز کردن منو"
                aria-expanded={open}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 lg:hidden ${
                  solid ? 'border-ink/15' : 'border-ink/20'
                }`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-paper/95 text-ink backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-full flex-col">
              <div className="shell flex items-center justify-between py-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="بستن منو"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/50"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>

              <nav
                aria-label="ناوبری موبایل"
                className="shell flex flex-1 flex-col justify-center"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={`/${item.href}`}
                      onClick={(event) => {
                        event.preventDefault()
                        go(item.href)
                      }}
                      className="group flex items-baseline justify-between border-b border-ink/10 py-4"
                    >
                      <span className="text-[26px] font-extrabold tracking-tight transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                        {item.label}
                      </span>
                      <span className="latin text-[10px] text-stone">
                        {`0${index + 1}`.replace(/\d/g, (d) =>
                          '۰۱۲۳۴۵۶۷۸۹'[Number(d)],
                        )}
                      </span>
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-8 flex flex-col gap-3"
                >
                  <a
                    href="/#courses"
                    onClick={(event) => {
                      event.preventDefault()
                      go('#courses')
                    }}
                    className="btn-gold w-full"
                  >
                    ثبت‌نام در دوره‌ها
                    <ArrowUpLeft className="h-4 w-4" />
                  </a>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="btn-ghost w-full"
                    dir="ltr"
                  >
                    {contact.phone}
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
