import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpLeft, Menu, X } from 'lucide-react'
import { navLinks, contact } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-x">
          <div
            className={`mt-3 flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'glass shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <a href="#home" className="flex items-center gap-3" aria-label="سوری سیما، صفحه اصلی">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                <img src="/logo.png" alt="لوگوی استودیو سوری سیما" className="h-full w-full object-cover" />
              </span>
              <span className="leading-tight">
                <span className="block text-[17px] font-extrabold tracking-tight text-white">سوری سیما</span>
                <span dir="ltr" className="block text-[9.5px] font-medium tracking-[0.26em] text-white/45">
                  SORISIMA STUDIO
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="ناوبری اصلی">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-[14px] text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-azure-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[13.5px] font-semibold text-white ring-1 ring-white/15 transition-all duration-300 hover:bg-azure hover:ring-azure sm:inline-flex"
              >
                رزرو مشاوره رایگان
                <ArrowUpLeft className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/15 transition-colors hover:bg-white/10 lg:hidden"
                aria-label="باز کردن منو"
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
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              className="relative flex h-full flex-col px-6 pb-10 pt-5"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="" className="h-10 w-10 rounded-full ring-1 ring-white/20" />
                  <span className="text-[16px] font-extrabold text-white">سوری سیما</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/15"
                  aria-label="بستن منو"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1" aria-label="ناوبری موبایل">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/[0.07] py-4 text-[19px] font-semibold text-white/85"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  >
                    {link.label}
                    <ArrowUpLeft className="h-4 w-4 text-azure-400" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  رزرو مشاوره رایگان
                </a>
                <p dir="ltr" className="text-center text-[13px] text-white/45">
                  {contact.phone}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
