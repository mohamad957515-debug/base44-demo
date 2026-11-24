import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faq } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative border-t border-white/[0.06] py-24 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            label="سوالات متداول"
            title="پاسخ پرسش‌های رایج"
            desc="اگر پاسخ پرسش‌تان را پیدا نکردید، در یک تماس کوتاه همه‌چیز را روشن می‌کنیم."
          />

          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {faq.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-right"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-[14.5px] font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-white/75'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-azure/50 bg-azure text-white'
                            : 'border-white/15 text-white/60'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 pl-12 text-[13.5px] leading-8 text-muted">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
