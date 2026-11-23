const words = [
  'الگوسازی',
  'دوخت',
  'اوت‌کوتور',
  'دراپینگ',
  'طراحی مد',
  'پرداخت',
  'پارچه‌شناسی',
  'کرست‌سازی',
]

export default function Marquee() {
  const line = [...words, ...words]
  return (
    <div className="mt-16 border-y border-ink/10 bg-paper py-4 sm:mt-20">
      <div className="mask-fade-x overflow-hidden">
        <div className="marquee-track items-center gap-10 px-4">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
              {line.map((word, index) => (
                <span
                  key={`${copy}-${word}-${index}`}
                  className="flex items-center gap-10 whitespace-nowrap text-[12.5px] tracking-[0.22em] text-stone"
                >
                  {word}
                  <span className="h-1 w-1 rotate-45 bg-gold/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
