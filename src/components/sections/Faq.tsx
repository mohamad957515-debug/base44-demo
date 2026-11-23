import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqItems } from '../../data/site'
import { Plus } from '../ui/Icons'
import { Reveal } from '../ui/motion'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="shell pb-20 sm:pb-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              ۰۷ — سوالات متداول
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.26] tracking-tightest">
              هر چیزی که
              <br />
              باید بدانید.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.95] text-stone">
              پاسخ سوال‌های رایج هنرجویان. اگر پاسخ خود را پیدا نکردید، یک
              پیام کوتاه کافی است.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="/#contact" className="btn-ghost mt-7">
              پرسش دیگری دارم
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink/10">
            {faqItems.map((item, index) => {
              const isOpen = open === index
              return (
                <Reveal as="li" key={item.q} delay={index * 0.03} className="border-b border-ink/10">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-right"
                      >
                        <span
                          className={`text-[14.5px] font-semibold leading-[1.8] tracking-tight transition-colors duration-500 ${
                            isOpen ? 'text-gold-deep' : 'text-ink group-hover:text-gold-deep'
                          }`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-silk ${
                            isOpen
                              ? 'rotate-45 border-gold bg-gold text-white'
                              : 'border-ink/15 text-ink/60 group-hover:border-gold group-hover:text-gold'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${index}`}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pl-12 text-[13px] leading-[2] text-stone">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
