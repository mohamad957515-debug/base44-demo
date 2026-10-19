import { Link } from "react-router-dom";

/** Abstract architectural mark — three vertical lines above a horizon rule. */
export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <rect x="6.5" y="13" width="3" height="10" rx="0.6" />
      <rect x="12.2" y="7" width="3" height="16" rx="0.6" />
      <rect x="17.9" y="10.5" width="3" height="12.5" rx="0.6" />
      <rect x="6.5" y="25" width="14.4" height="1.8" rx="0.9" />
    </svg>
  );
}

export default function Logo({ light = true }) {
  return (
    <Link
      to="/"
      aria-label="هورایزن پروپرتیز — صفحه اصلی"
      className="flex items-center gap-2.5"
    >
      <LogoMark className="h-8 w-8 shrink-0 text-gold" />
      <span
        className={`text-[13px] font-bold leading-[1.15] tracking-[0.18em] sm:text-sm ${
          light ? "text-white" : "text-navy"
        }`}
      >
        HORIZON
        <span className="block text-[9px] font-semibold tracking-[0.5em] text-gold sm:text-[10px]">
          PROPERTIES
        </span>
      </span>
    </Link>
  );
}
