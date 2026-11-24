import Reveal from './Reveal'

export default function SectionHeading({ label, title, desc, action, className = '' }) {
  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}>
      <Reveal className="max-w-2xl">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-azure-400 shadow-[0_0_12px_2px_rgba(61,130,255,0.8)]" />
          {label}
        </span>
        <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.3] text-white">
          {title}
        </h2>
        {desc && <p className="mt-5 max-w-xl text-[15px] leading-8 text-muted">{desc}</p>}
      </Reveal>
      {action && (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
