import { airlines } from '../data/site'

export default function Airlines() {
  const items = [...airlines, ...airlines]

  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="shell">
        <p className="text-center text-[11px] font-medium tracking-[0.24em] text-ink-soft/60">
          همکاران هوایی ما
        </p>
      </div>

      <div className="marquee relative mt-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />

        <div className="marquee-track flex w-max items-center gap-10 sm:gap-16" dir="ltr">
          {items.map((airline, index) => (
            <span
              key={`${airline}-${index}`}
              className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.16em] text-ink/30 transition-colors duration-500 hover:text-ink/75 sm:text-[16px]"
            >
              {airline}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
