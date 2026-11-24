import { ArrowUpLeft } from 'lucide-react'
import { posts } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Insights() {
  return (
    <section id="insights" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="بینش‌ها"
          title="الهام‌بخش روایت بعدی شما"
          desc="یادداشت‌ها و تجربه‌های تیم سوری سیما دربارهٔ تصویر، محتوا و بازار صنعتی."
          action={
            <a href="#insights" className="btn-ghost">
              همهٔ مقالات
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <a href="#insights" className="group block">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] border border-white/[0.07]">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-85 transition-all duration-[1000ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                  <span className="absolute inset-x-4 top-4 w-fit rounded-full border border-white/15 bg-ink/45 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[17px] font-bold leading-8 text-white transition-colors duration-300 group-hover:text-azure-200">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-7 text-muted">{post.excerpt}</p>
                    <p className="mt-4 text-[11.5px] text-white/35">{post.meta}</p>
                  </div>
                  <ArrowUpLeft className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-azure-300" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
