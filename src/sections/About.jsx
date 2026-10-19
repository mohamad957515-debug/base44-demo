import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "../components/Reveal";
import { unsplash } from "../lib/images";

/** Editorial "Who We Are" section with an asymmetric image composition. */
export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="label-gold">درباره ما</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            ما که هستیم
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
            در هورایزن پروپرتیز، مردم را با خانه‌های استثنایی و
            سرمایه‌گذاری‌های هوشمند به هم پیوند می‌زنیم. صداقت، شفافیت و رضایت
            مشتری، جوهره همه‌ی کاری است که می‌کنیم.
          </p>
          <Link to="/contact" className="btn-primary mt-9">
            بیشتر بدانید
            <ArrowLeft size={16} />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="group relative">
            <div className="grid grid-cols-5 items-end gap-4">
              <div className="col-span-3 overflow-hidden rounded-2xl">
                <img
                  src={unsplash("1613490493576-7fde63acd811", 900)}
                  alt="خانه لوکس مدرن با استخر در غروب"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl pb-10">
                <img
                  src={unsplash("1570129477492-45c003edd2be", 600)}
                  alt="اقامتگاه معماری مدرن در شب"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
            <Link
              to="/properties"
              aria-label="مشاهده ملک‌های ما"
              className="absolute bottom-2 left-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-navy-950 shadow-card transition-all duration-300 hover:bg-navy hover:text-white sm:left-10"
            >
              <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
