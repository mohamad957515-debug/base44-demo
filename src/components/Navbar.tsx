import { useEffect, useState } from 'react'
import { ArrowLeft, Menu, Phone, X } from 'lucide-react'
import { navLinks } from '../data/site'
import { useScrolled } from '../lib/hooks'

export default function Navbar() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const solid = scrolled || open

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="shell">
          <div
            className={`mt-3 flex items-center justify-between gap-2 rounded-[26px] px-3 py-2.5 transition-all duration-500 ease-smooth sm:px-4 ${
              solid ? 'glass-light shadow-card' : 'glass-dark'
            }`}
          >
            {/* Logo */}
            <a href="#home" className="group flex shrink-0 items-center gap-2.5">
              <img
                src="/logo.png"
                alt="لوگوی سوری سیما"
                width={44}
                height={44}
                className="h-10 w-10 rounded-full object-cover shadow-[0_6px_18px_-6px_rgba(4,18,31,0.6)] ring-1 ring-white/40 transition-transform duration-500 ease-smooth group-hover:scale-105 sm:h-11 sm:w-11"
              />
              <span className="leading-none">
                <span
                  className={`block text-[15px] font-extrabold tracking-tight transition-colors duration-500 ${
                    solid ? 'text-ink' : 'text-white'
                  }`}
                >
                  سوری سیما
                </span>
                <span
                  className={`mt-1 block text-[9px] font-medium tracking-[0.34em] transition-colors duration-500 ${
                    solid ? 'text-ink-soft/80' : 'text-white/55'
                  }`}
                >
                  TRAVEL
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                    solid ? 'text-ink/70 hover:text-ink' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-3.5 bottom-0.5 h-px origin-right scale-x-0 bg-current opacity-70 transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
              <a
                href="#flights"
                className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  solid ? 'text-ink-soft hover:text-ink' : 'text-white/75 hover:text-white'
                }`}
              >
                ورود / ثبت‌نام
              </a>
              <a href="#flights" className="btn-primary !px-5 !py-2.5 text-[13px]">
                رزرو بلیط
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                solid
                  ? 'bg-ink/[0.06] text-ink hover:bg-ink/10'
                  : 'bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20'
              }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[84px] overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-5 shadow-soft backdrop-blur-2xl transition-all duration-500 ease-smooth ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${open ? index * 40 + 80 : 0}ms` }}
                className={`flex items-center justify-between border-b border-ink/[0.06] py-3.5 text-[15.5px] font-semibold text-ink transition-all duration-500 last:border-0 ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
              >
                {link.label}
                <ArrowLeft size={15} className="text-brand-deep/60" />
              </a>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <a href="#flights" onClick={() => setOpen(false)} className="btn-primary w-full">
              رزرو بلیط
            </a>
            <a
              href="#flights"
              onClick={() => setOpen(false)}
              className="btn-outline w-full !py-2.5 text-[13px]"
            >
              ورود / ثبت‌نام
            </a>
          </div>
          <a
            href="tel:+982191002233"
            className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-ink-soft"
          >
            <Phone size={14} className="text-brand-deep" />
            <span dir="ltr">۰۲۱ - ۹۱۰۰ ۲۲۳۳</span>
          </a>
        </div>
      </div>
    </>
  )
}
