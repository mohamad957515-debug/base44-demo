import Reveal from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : ''} max-w-[720px] ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={`eyebrow ${tone === 'light' ? 'text-white/70' : ''} ${isCenter ? 'justify-center' : ''}`}
          >
            <span className="h-px w-8 bg-current opacity-50" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={`mt-4 text-[clamp(1.75rem,3.6vw,2.9rem)] font-extrabold ${
            tone === 'light' ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p
            className={`mt-4 text-[15px] leading-[2] ${
              tone === 'light' ? 'text-white/75' : 'text-ink-soft'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
