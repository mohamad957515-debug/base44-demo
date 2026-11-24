import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

const columns = [
  {
    title: 'خدمات',
    links: [
      { label: 'رزرو بلیط هواپیما', href: '#flights' },
      { label: 'تورهای مسافرتی', href: '#tours' },
      { label: 'رزرو هتل', href: '#services' },
      { label: 'خدمات ویزا', href: '#services' },
      { label: 'بیمه مسافرتی', href: '#services' },
    ],
  },
  {
    title: 'مقاصد',
    links: [
      { label: 'استانبول', href: '#destinations' },
      { label: 'دبی', href: '#destinations' },
      { label: 'پاریس', href: '#destinations' },
      { label: 'مالدیو', href: '#destinations' },
      { label: 'توکیو', href: '#destinations' },
    ],
  },
  {
    title: 'شرکت',
    links: [
      { label: 'درباره ما', href: '#about' },
      { label: 'تورها', href: '#tours' },
      { label: 'سوالات متداول', href: '#faq' },
      { label: 'تماس با ما', href: '#contact' },
    ],
  },
]

const socials = [
  { icon: Instagram, label: 'اینستاگرام' },
  { icon: Send, label: 'تلگرام' },
  { icon: MessageCircle, label: 'واتس‌اپ' },
  { icon: Linkedin, label: 'لینکدین' },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-brand-light via-[#F1FAFF] to-[#E4F3FC] pt-16 sm:pt-20"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/80 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="shell relative">
        <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:gap-8">
          {/* brand */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="لوگوی سوری سیما"
                width={52}
                height={52}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-white/70"
              />
              <span>
                <span className="block text-[17px] font-extrabold text-ink">سوری سیما</span>
                <span className="mt-1 block text-[9px] font-medium tracking-[0.34em] text-ink-soft/70">
                  TRAVEL &amp; AIR
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-[320px] text-[12.5px] leading-[2] text-ink-soft">
              آژانس مسافرتی و هواپیمایی سوری سیما؛ از سال ۱۳۸۷ در کنار مسافرانی که سفر را جدی
              می‌گیرند.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#contact"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand-deep"
                >
                  <social.icon size={15} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h3 className="text-[12.5px] font-bold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-ink-soft transition-colors duration-300 hover:text-brand-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[12.5px] font-bold text-ink">تماس</h3>
            <ul className="mt-4 space-y-3 text-[12px] text-ink-soft">
              <li>
                <a
                  href="tel:+982191002233"
                  className="flex items-start gap-2 transition-colors duration-300 hover:text-brand-ink"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-brand-deep" />
                  <span dir="ltr">۰۲۱ - ۹۱۰۰ ۲۲۳۳</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@sorisima.com"
                  className="flex items-start gap-2 transition-colors duration-300 hover:text-brand-ink"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-brand-deep" />
                  <span dir="ltr">hello@sorisima.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-deep" />
                تهران، خیابان ولیعصر، برج سفر
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-ink/[0.08] py-6 text-center sm:flex-row sm:text-right">
          <p className="text-[11px] text-ink-soft">تمامی حقوق این وب‌سایت محفوظ است.</p>
          <p className="text-[10.5px] text-ink-soft/70">
            © ۱۴۰۴ سوری سیما · طراحی با نگاه به آسمان
          </p>
        </div>
      </div>
    </footer>
  )
}
