import Reveal from "../components/Reveal";
import { PROCESS } from "../data/content";

/** روند همکاری — چهار گام از انتخاب مسیر تا تصمیم نهایی. */
export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="label-gold">روند همکاری</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            از اولین تماس تا تصمیم نهایی
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/60">
            مسیر کوتاه و روشن است؛ در هر گام می‌دانید اقدام بعدی چیست.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="group h-full rounded-2xl bg-white p-7 shadow-card transition-colors duration-300 hover:bg-navy">
                <span className="text-sm font-bold tracking-widest text-gold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-white/65">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
