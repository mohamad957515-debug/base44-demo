import { ArrowUpLeft } from 'lucide-react'
import { articles } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Inspiration() {
  const [featured, ...rest] = articles

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="مجله سفر"
            title="الهام‌بخش سفر بعدی شما"
            subtitle="راهنماها و روایت‌هایی که پیش از بستن چمدان باید بخوانید."
          />
          <Reveal delay={180} className="shrink-0">
            <a href="#faq" className="btn-outline group">
              همه مقالات
              <ArrowUpLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <a
              href="#faq"
              className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-ink/[0.06] bg-cloud-soft"
            >
              <div className="relative h-[260px] overflow-hidden sm:h-[360px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10.5px] font-semibold text-ink backdrop-blur-md">
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[10.5px] tracking-wide text-ink-soft/80">{featured.meta}</p>
                <h3 className="mt-2 text-[20px] font-extrabold leading-[1.6] text-ink transition-colors duration-300 group-hover:text-brand-ink sm:text-[23px]">
                  {featured.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-[2] text-ink-soft">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-deep">
                  خواندن مقاله
                  <ArrowUpLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </span>
              </div>
            </a>
          </Reveal>

          <div className="flex flex-col gap-3 lg:col-span-5">
            {rest.map((article, index) => (
              <Reveal key={article.title} delay={index * 90} className="flex-1">
                <a
                  href="#faq"
                  className="group flex h-full items-center gap-4 rounded-[22px] border border-transparent bg-cloud-soft/70 p-2.5 transition-all duration-500 ease-smooth hover:border-ink/[0.06] hover:bg-white hover:shadow-card"
                >
                  <div className="relative h-[92px] w-[104px] shrink-0 overflow-hidden rounded-[16px] sm:h-[104px] sm:w-[124px]">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.07]"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="flex items-center gap-2 text-[10px] text-ink-soft/80">
                      <span className="font-semibold text-brand-deep">{article.category}</span>
                      <span className="h-1 w-1 rounded-full bg-ink/15" />
                      {article.meta}
                    </p>
                    <h3 className="mt-1.5 text-[14px] font-bold leading-[1.75] text-ink transition-colors duration-300 group-hover:text-brand-ink">
                      {article.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[11.5px] text-ink-soft">{article.excerpt}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
