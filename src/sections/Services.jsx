import Reveal from "../components/Reveal";
import { SERVICES } from "../data/content";

/** Editorial services grid — numbered rows, fine rules, no icon boxes. */
export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="label-gold">چه می‌کنیم</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              خدماتی که برای شما ساخته شده
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-base leading-relaxed text-ink/60 lg:ml-auto">
              از نخستین گفت‌وگو تا مدت‌ها پس از تحویل کلیدها، متخصصان ما
              استانداردی از خدمات ارائه می‌کنند که به‌ندرت در بازار دیده
              می‌شود.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={(i % 3) * 90}>
              <div className="group border-t border-navy/10 pt-6 transition-colors duration-300 hover:border-gold">
                <span className="text-sm font-bold tracking-widest text-gold">
                  {service.number}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-gold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {service.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
