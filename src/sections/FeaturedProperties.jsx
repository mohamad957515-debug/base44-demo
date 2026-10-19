import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import Reveal from "../components/Reveal";
import { faNum } from "../lib/format";
import { properties } from "../data/properties";

/**
 * Horizontal featured-properties carousel (drag / swipe / buttons / keyboard).
 * Runs in RTL: "next" advances leftward, matching the Persian layout.
 */
export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: "rtl",
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return undefined;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // RTL: the left arrow moves forward, the right arrow moves back.
  const onKeydown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollNext();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollPrev();
    }
  };

  return (
    <section id="featured" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="label-gold">ویژه</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            ملک‌های شاخص
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-12 lg:mt-16">
        <div
          ref={emblaRef}
          className="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="ملک‌های شاخص"
          tabIndex={0}
          onKeyDown={onKeydown}
        >
          <div className="container-x flex cursor-grab gap-6 active:cursor-grabbing lg:gap-8">
            {featured.map((property, i) => (
              <div
                key={property.id}
                className={`shrink-0 pl-1 pr-1 ${
                  i === 0
                    ? "w-[86vw] sm:w-[540px] lg:w-[620px]"
                    : "w-[78vw] sm:w-[380px] lg:w-[400px]"
                }`}
              >
                <Reveal delay={i * 70}>
                  <PropertyCard
                    property={property}
                    size={i === 0 ? "large" : "default"}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Edge navigation (desktop) — RTL: next sits on the left. */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="ملک‌های قبلی"
          className="absolute right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-card transition-all duration-300 hover:bg-navy hover:text-white lg:grid"
        >
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="ملک‌های بعدی"
          className="absolute left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-card transition-all duration-300 hover:bg-navy hover:text-white lg:grid"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Mobile progress dots */}
      <div className="mt-8 flex justify-center gap-2 lg:hidden">
        {featured.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`رفتن به ملک ${faNum(i + 1)}`}
            aria-current={i === selected}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-6 bg-navy" : "w-1.5 bg-navy/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
