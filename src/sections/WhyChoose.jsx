import { Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { STATS, WHY_POINTS } from "../data/content";

/** Dark navy credibility section with gold stats. */
export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_10%,rgba(70,110,151,0.35),transparent)]"
      />
      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="label-gold">چرا هورایزن</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            استانداردی بالاتر
            <br />
            از معمول
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
            ما موفقیت را در روابط چنددهه‌ای می‌سنجیم، نه در معاملات — قولی
            آرام که در هر خانه‌ای نمایندگی می‌کنیم، پاس داشته می‌شود.
          </p>
          <ul className="mt-8 space-y-4">
            {WHY_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/50">
                  <Check size={11} className="text-gold" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex h-full flex-col justify-center bg-navy-950/40 p-8 lg:p-10">
                <p className="text-3xl font-bold tracking-tight text-gold lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/60">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
