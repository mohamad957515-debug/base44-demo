type IconProps = {
  className?: string
  strokeWidth?: number
}

function base({ className, strokeWidth = 1.25 }: IconProps) {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
    focusable: 'false' as const,
  }
}

export const ArrowLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
)

export const ArrowUpLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M17 17 7 7" />
    <path d="M7 17V7h10" />
  </svg>
)

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2.6l2.7 6.1 6.6.6-5 4.4 1.5 6.5-5.8-3.5-5.8 3.5 1.5-6.5-5-4.4 6.6-.6z" />
  </svg>
)

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h10" />
  </svg>
)

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Scissors = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="6" cy="18" r="2.4" />
    <path d="M8.2 7.6 20 18M8.2 16.4 20 6" />
  </svg>
)

export const Needle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20 17.5 6.5" />
    <path d="M15 4.5c1.6-1.4 4.1-1.2 5 .2.8 1.3.1 3.4-1.7 4.6" />
    <path d="M16.6 12.9c1.4-.2 2.6.1 3.4.9" />
  </svg>
)

export const Spool = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 4h8M8 20h8" />
    <path d="M9 4v16M15 4v16" />
    <path d="M9 8h6M9 12h6M9 16h6" />
  </svg>
)

export const Hanger = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 7.5a2 2 0 1 1 2-2" />
    <path d="M12 7.5 3.5 14.2c-.9.7-.4 2.1.7 2.1h15.6c1.1 0 1.6-1.4.7-2.1L12 7.5Z" />
  </svg>
)

export const Ruler = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="8.5" width="19" height="7" rx="1.4" />
    <path d="M7 8.5v3M11 8.5v2M15 8.5v3M19 8.5v2" />
  </svg>
)

export const Iron = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 16.5h16" />
    <path d="M6.5 16.5c0-4.4 3.4-8 7.6-8H20l-1.2 8" />
    <path d="M3 19.5h18" />
  </svg>
)

export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 19 6v6c0 4-3 7-7 8.5C8 19 5 16 5 12V6l7-2.5Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
)

export const Headset = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
    <rect x="3" y="12.5" width="4" height="6" rx="1.6" />
    <rect x="17" y="12.5" width="4" height="6" rx="1.6" />
    <path d="M19 18.5c0 1.4-1.6 2.5-4 2.5" />
  </svg>
)

export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5v5M12 15.5v5M4.5 12h5M14.5 12h5" />
    <path d="m6.7 6.7 2.2 2.2M15.1 15.1l2.2 2.2M17.3 6.7l-2.2 2.2M8.9 15.1l-2.2 2.2" />
  </svg>
)

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 7 8.2 6 8.2-6" />
  </svg>
)

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5h2.2l1.4 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.4v2.2c0 1.6-1.3 2.9-2.9 2.7C9.4 17.5 5 13.1 3.8 6.4 3.6 4.8 4.9 3.5 6.5 3.5Z" />
  </svg>
)

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17 7h.01" />
  </svg>
)

export const Telegram = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m20.5 4.5-3 15-5.2-3.8-2.6 2.6-.6-4.6 8.6-7.6-10.4 6L4 11.4l16.5-6.9Z" />
  </svg>
)

export const Whatsapp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" />
    <path d="M9.2 8.9c-.4.7-.2 2 .6 3.2.9 1.3 2.1 2.1 3.1 2.3.8.1 1.4-.3 1.7-.8" />
  </svg>
)
