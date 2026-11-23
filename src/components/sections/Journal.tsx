import { journal } from '../../data/site'
import { ArrowLeft, ArrowUpLeft } from '../ui/Icons'
import { Reveal, ZoomImage } from '../ui/motion'

export default function Journal() {
  const [lead, ...rest] = journal

  return (
    <section id="journal" className="shell py-20 sm:py-28">
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ۰۶ — مجلهٔ آتلیه
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.24] tracking-tightest">
              الهام‌بخش دوخت بعدی شما.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a
            href="#journal"
            className="group inline-flex items-center gap-2 text-[12.5px] font-medium text-ink/70 transition-colors hover:text-gold"
          >
            همهٔ مقالات
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
          </a>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <a href="#journal" className="group block">
            <div className="overflow-hidden rounded-[1.4rem] bg-mist">
              <ZoomImage
                src={lead.image}
                alt={lead.title}
                className="aspect-[16/11]"
                imgClassName="transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-6 flex items-center gap-3 text-[11px] text-stone">
              <span className="rounded-full border border-ink/12 px-3 py-1 text-ink/70">
                {lead.category}
              </span>
              <span>{lead.date}</span>
              <span className="h-1 w-1 rounded-full bg-ink/25" />
              <span>{lead.read} مطالعه</span>
            </div>
            <h3 className="mt-4 max-w-xl text-[20px] font-extrabold leading-[1.6] tracking-tight transition-colors duration-500 group-hover:text-gold-deep sm:text-[23px]">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-xl text-[13.5px] leading-[1.95] text-stone">
              {lead.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink">
              خواندن مقاله
              <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
            </span>
          </a>
        </Reveal>

        <div className="lg:col-span-5">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {rest.map((post, index) => (
              <Reveal as="li" key={post.title} delay={index * 0.06}>
                  <a href="#journal" className="group flex gap-5 py-6">
                    <div className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-[0.9rem] bg-mist sm:h-[104px] sm:w-[104px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10.5px] text-stone">
                        <span className="text-gold-deep">{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-ink/20" />
                        <span>{post.read}</span>
                      </div>
                      <h3 className="mt-2 text-[14.5px] font-bold leading-[1.75] tracking-tight transition-colors duration-500 group-hover:text-gold-deep">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 text-[11.5px] text-stone">{post.date}</p>
                    </div>
                  </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-6 rounded-[1.2rem] border border-gold/25 bg-gold/[0.05] p-6">
              <p className="latin text-[9px] text-gold">Note from the atelier</p>
              <p className="mt-3 text-[13px] leading-[1.95] text-ink/75">
                هر هفته یک یادداشت کوتاه از کارگاه منتشر می‌کنیم؛ نکته‌های
                کوچکی که کیفیت دوخت را چند پله بالا می‌برد.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
