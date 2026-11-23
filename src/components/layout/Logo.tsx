import { Link } from 'react-router-dom'
import { Needle } from '../ui/Icons'

export default function Logo({
  light = false,
  className = '',
}: {
  light?: boolean
  className?: string
}) {
  return (
    <Link
      to="/"
      aria-label="آتلیهٔ طباطبایی — صفحهٔ اصلی"
      className={`group flex items-center gap-3 ${className}`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
          light ? 'border-white/35 group-hover:border-white' : 'border-ink/20 group-hover:border-gold'
        }`}
      >
        <Needle className="h-[18px] w-[18px] text-gold" />
      </span>
      <span className="leading-none">
        <span className="block text-[16px] font-extrabold tracking-tight">
          آتلیهٔ طباطبایی
        </span>
        <span className="latin mt-1.5 block text-[8px] tracking-[0.34em] opacity-55">
          Atelier Tabatabaei
        </span>
      </span>
    </Link>
  )
}
