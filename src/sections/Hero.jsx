/** Homepage hero — centered headline over deep navy, editorial image below. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* soft architectural glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"
      />
      <div className="container-x relative pb-12 pt-32 text-center sm:pt-40 lg:pb-16 lg:pt-44">
        <h1 className="hero-in mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[64px]">
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </h1>
        <p className="hero-in-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Premium properties in prime locations. Find your dream home or the
          perfect investment with confidence.
        </p>
      </div>
      <div className="hero-media">
        <img
          src="/images/hero.jpg"
          alt="Modern luxury villa with illuminated glass walls and an infinity pool at dusk"
          fetchpriority="high"
          className="aspect-[16/10] w-full object-cover sm:aspect-[16/8] lg:aspect-[16/7]"
        />
      </div>
    </section>
  );
}
