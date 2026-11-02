import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { faNum } from "../lib/format";
import { useLockBodyScroll } from "../lib/hooks";

/** Image gallery with thumbnail navigation and a fullscreen viewer (RTL). */
export default function Gallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;
  useLockBodyScroll(lightbox);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    if (!lightbox) return undefined;
    // RTL: the left arrow moves forward, the right arrow moves back.
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        aria-label="باز کردن نمایشگر تصاویر"
        className="group relative block w-full overflow-hidden rounded-2xl bg-navy-100"
      >
        <img
          key={index}
          src={images[index]}
          alt={`${name} — تصویر ${faNum(index + 1)} از ${faNum(total)}`}
          className="gallery-img aspect-[16/10] w-full object-cover"
        />
        <span className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy backdrop-blur transition-colors group-hover:bg-navy group-hover:text-white">
          <Maximize2 size={15} />
        </span>
      </button>

      <div className="mt-3 grid grid-cols-5 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`نمایش تصویر ${faNum(i + 1)}`}
            aria-current={i === index}
            className={`overflow-hidden rounded-xl transition ${
              i === index
                ? "ring-2 ring-gold ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="anim-fade fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`نمایشگر تصاویر ${name}`}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="بستن نمایشگر تصاویر"
            className="absolute end-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="تصویر قبلی"
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ArrowRight size={20} />
          </button>
          <img
            src={images[index]}
            alt={`${name} — تصویر ${faNum(index + 1)}`}
            className="anim-zoom max-h-[82vh] max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={next}
            aria-label="تصویر بعدی"
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ArrowLeft size={20} />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest text-white/70">
            {faNum(index + 1)} / {faNum(total)}
          </p>
        </div>
      )}
    </div>
  );
}
