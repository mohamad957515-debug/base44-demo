import { industries } from '../data/content'

export default function Industries() {
  const loop = [...industries, ...industries]
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <p className="text-center text-[11.5px] tracking-[0.22em] text-white/35">
          در خدمت بیش از ۴۰ صنعت و حوزهٔ کاری
        </p>
      </div>
      <div className="relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center whitespace-nowrap text-[15px] font-medium text-white/30 transition-colors duration-300 hover:text-white/70"
            >
              {name}
              <span className="mx-8 h-1 w-1 rounded-full bg-azure/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
