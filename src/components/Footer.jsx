import { Instagram, Linkedin, Send, Youtube, ArrowUpLeft } from 'lucide-react'
import { contact, navLinks, services } from '../data/content'

const socials = [
  { icon: Instagram, label: 'اینستاگرام', href: '#' },
  { icon: Linkedin, label: 'لینکدین', href: '#' },
  { icon: Send, label: 'تلگرام', href: '#' },
  { icon: Youtube, label: 'آپارات', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-night">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-azure/40 to-transparent" />

      <div className="container-x grid gap-12 pt-16 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div>
          <a href="#home" className="flex items-center gap-3" aria-label="سوری سیما">
            <img src="/logo.png" alt="لوگوی سوری سیما" className="h-12 w-12 rounded-full ring-1 ring-white/15" />
            <span className="leading-tight">
              <span className="block text-[18px] font-extrabold text-white">سوری سیما</span>
              <span dir="ltr" className="block text-[9.5px] tracking-[0.26em] text-white/40">
                SORISIMA STUDIO
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-[13px] leading-7 text-muted">
            استودیو تخصصی تصویر، فیلم و مارکتینگ صنعتی؛ از ۱۳۸۷ تا امروز در کنار شرکت‌های صنعتی ایران.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/55 transition-all duration-300 hover:border-azure/50 hover:bg-azure/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">خدمات</h3>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 5).map((service) => (
              <li key={service.title}>
                <a
                  href="#services"
                  className="text-[12.5px] text-white/50 transition-colors hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">دسترسی سریع</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[12.5px] text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">تماس با ما</h3>
          <ul className="mt-5 space-y-3.5 text-[12.5px] text-white/50">
            <li>
              <a href={contact.phoneHref} dir="ltr" className="block transition-colors hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="block transition-colors hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>{contact.area}</li>
            <li>{contact.hours}</li>
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold text-azure-300 transition-colors hover:text-white"
          >
            رزرو مشاوره رایگان
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="container-x mt-14 flex flex-col gap-3 border-t border-white/[0.07] py-6 text-[11.5px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>تمامی حقوق این وب‌سایت برای استودیو سوری سیما محفوظ است. © ۱۴۰۴</p>
        <p>طراحی و توسعه: استودیو سوری سیما</p>
      </div>

      <p
        dir="ltr"
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center text-[clamp(3rem,13vw,11rem)] font-extrabold leading-none tracking-tighter text-white/[0.025]"
      >
        SORISIMA
      </p>
    </footer>
  )
}
