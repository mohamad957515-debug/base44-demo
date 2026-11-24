import { useState } from 'react'
import { Minus, Phone, Plus } from 'lucide-react'
import { faqs } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-cloud-soft py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="پرسش‌های متداول"
              title="پاسخ سوال‌های شما"
              subtitle="اگر پاسخ پرسش‌تان را پیدا نکردید، تیم پشتیبانی ما ۲۴ ساعته در دسترس است."
            />
            <Reveal delay={200}>
              <a
                href="tel:+982191002233"
                className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-ink/[0.08] bg-white px-5 py-4 text-[12.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-light text-brand-deep">
                  <Phone size={14} />
                </span>
                <span>
                  تماس با پشتیبانی
                  <span dir="ltr" className="mt-0.5 block text-[11px] font-medium text-ink-soft">
                    ۰۲۱ - ۹۱۰۰ ۲۲۳۳
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-[26px] border border-ink/[0.06] bg-white px-5 sm:px-7">
            {faqs.map((faq, index) => {
              const isOpen = open === index
              return (
                <Reveal key={faq.q} delay={index * 50}>
                  <div className="border-b border-ink/[0.07] last:border-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-right"
                    >
                      <span
                        className={`text-[13.5px] font-bold transition-colors duration-300 sm:text-[14.5px] ${
                          isOpen ? 'text-brand-ink' : 'text-ink'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-smooth ${
                          isOpen
                            ? 'border-brand-deep bg-brand-deep text-white'
                            : 'border-ink/12 text-ink-soft'
                        }`}
                      >
                        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-smooth ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-10 text-[12.5px] leading-[2] text-ink-soft">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
