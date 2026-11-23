import { Link } from 'react-router-dom'
import { contact, courses } from '../../data/site'
import { Instagram, Mail, MapPin, Phone, Telegram, Whatsapp, ArrowUpLeft } from '../ui/Icons'
import Logo from './Logo'
import { toFa } from '../../lib/format'

const academyLinks = [
  { label: 'دربارهٔ آتلیه', href: '/#atelier' },
  { label: 'تجربهٔ آکادمی', href: '/#experience' },
  { label: 'هنرجویان', href: '/#testimonials' },
  { label: 'مقالات', href: '/#journal' },
]

const supportLinks = [
  { label: 'سوالات متداول', href: '/#faq' },
  { label: 'شرایط ثبت‌نام', href: '/#faq' },
  { label: 'تماس با ما', href: '/#contact' },
  { label: 'حریم خصوصی', href: '/#contact' },
]

const socials = [
  { label: 'اینستاگرام', Icon: Instagram, href: 'https://instagram.com' },
  { label: 'تلگرام', Icon: Telegram, href: 'https://telegram.org' },
  { label: 'واتساپ', Icon: Whatsapp, href: 'https://whatsapp.com' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]"
      />
      <div className="shell relative py-20 md:py-24">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="latin text-[10px] text-gold">Atelier Tabatabaei</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold leading-[1.25] tracking-tightest">
              از یک کوک،
              <br />
              تا یک امضا.
            </h2>
          </div>
          <a
            href={`tel:${contact.phoneHref}`}
            className="btn-light w-fit"
            dir="ltr"
          >
            <Phone className="h-4 w-4" />
            {contact.phone}
          </a>
        </div>

        <div className="grid gap-12 pt-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-xs text-[14px] leading-[1.9] text-paper/55">
              آکادمی خیاطی و طراحی لباس خانمک طباطبایی؛ فضایی برای یادگیریِ دقیق،
              آرام و حرفه‌ایِ هنر دوخت.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-paper/70 transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="آکادمی" className="lg:col-span-2">
            <h3 className="latin text-[10px] text-gold">Academy</h3>
            <ul className="mt-5 space-y-3 text-[13.5px] text-paper/65">
              {academyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="دوره‌ها" className="lg:col-span-3">
            <h3 className="latin text-[10px] text-gold">Courses</h3>
            <ul className="mt-5 space-y-3 text-[13.5px] text-paper/65">
              {courses.slice(0, 4).map((course) => (
                <li key={course.slug}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="transition-colors duration-300 hover:text-paper"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="پشتیبانی" className="lg:col-span-1">
            <h3 className="latin text-[10px] text-gold">Support</h3>
            <ul className="mt-5 space-y-3 text-[13.5px] text-paper/65">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="latin text-[10px] text-gold">Visit</h3>
            <ul className="mt-5 space-y-4 text-[13px] leading-[1.9] text-paper/65">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                <a href={`mailto:${contact.email}`} className="hover:text-paper">
                  {contact.email}
                </a>
              </li>
              <li className="text-paper/45">{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-[12px] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {toFa(1404)} — تمامی حقوق این وب‌سایت برای آکادمی خیاطی خانمک
            طباطبایی محفوظ است.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-gold"
          >
            بازگشت به بالا
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
