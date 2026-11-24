import { ArrowLeft, MapPin } from 'lucide-react'
import { destinations } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const layout = [
  'col-span-2 h-[300px] sm:h-[380px] lg:col-span-2 lg:row-span-2 lg:h-full',
  'col-span-2 h-[220px] sm:h-[280px] lg:col-span-2 lg:h-full',
  'col-span-1 h-[200px] sm:h-[240px] lg:col-span-1 lg:h-full',
  'col-span-1 h-[200px] sm:h-[240px] lg:col-span-1 lg:h-full',
  'col-span-2 h-[220px] sm:h-[280px] lg:col-span-2 lg:h-full',
  'col-span-2 h-[220px] sm:h-[280px] lg:col-span-2 lg:h-full',
]

export default function Destinations() {
  return (
    <section id="destinations" className="scroll-mt-24 bg-cloud-soft py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="مقاصد محبوب"
            title="مقصد بعدی شما کجاست؟"
            subtitle="از شهرهای پرهیجان دنیا تا آرام‌ترین سواحل، مقصد مورد علاقه‌تان را پیدا کنید."
          />
          <Reveal delay={180} className="shrink-0">
            <a href="#tours" className="btn-outline group">
              همه مقاصد
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:auto-rows-[236px] lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <Reveal
              key={destination.name}
              delay={index * 70}
              className={`group relative ${layout[index] ?? ''}`}
            >
              <a
                href="#flights"
                className="relative block h-full w-full overflow-hidden rounded-[22px] bg-ink/10 sm:rounded-[26px]"
              >
                <img
                  src={destination.image}
                  alt={`نمای ${destination.name}، ${destination.country}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#04121f]/85 via-[#04121f]/15 to-transparent transition-opacity duration-500 group-hover:from-[#04121f]/92" />

                <div className="relative flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-white/65">
                    <MapPin size={11} />
                    {destination.country}
                  </span>
                  <h3 className="mt-1 text-[21px] font-extrabold text-white sm:text-[24px]">
                    {destination.name}
                  </h3>

                  <div className="mt-2.5 flex flex-wrap items-end justify-between gap-2">
                    <p className="text-[10.5px] text-white/65">
                      شروع قیمت
                      <b className="mx-1 text-[12.5px] font-bold text-white">
                        {destination.price} تومان
                      </b>
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[10.5px] font-semibold text-white backdrop-blur-md transition-all duration-500 ease-smooth hover:bg-white/25 lg:translate-y-1.5 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      مشاهده مقصد
                      <ArrowLeft size={12} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
