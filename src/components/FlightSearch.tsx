import { useState, type ReactNode } from 'react'
import {
  Armchair,
  ArrowLeftRight,
  Check,
  MapPin,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import PersianDatePicker from './ui/PersianDatePicker'
import { toFa } from '../lib/format'

const cabins = ['اکونومی', 'بیزینس', 'فرست کلاس']
const passengerOptions = ['۱ مسافر', '۲ مسافر', '۳ مسافر', '۴ مسافر', '۵ مسافر', '۶ مسافر']

type FieldProps = {
  label: string
  icon: ReactNode
  children: ReactNode
  className?: string
}

function Field({ label, icon, children, className = '' }: FieldProps) {
  return (
    <label
      className={`group flex cursor-pointer items-center gap-2.5 rounded-2xl px-3.5 py-2.5 transition-colors duration-300 hover:bg-brand-light/60 focus-within:bg-brand-light/70 ${className}`}
    >
      <span className="text-brand-deep transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[10.5px] font-medium text-ink-soft">{label}</span>
        {children}
      </span>
    </label>
  )
}

export default function FlightSearch() {
  const [from, setFrom] = useState('تهران')
  const [to, setTo] = useState('استانبول')
  const [depart, setDepart] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('۲ مسافر')
  const [cabin, setCabin] = useState('اکونومی')
  const [flip, setFlip] = useState(false)
  const [result, setResult] = useState<null | {
    from: string
    to: string
    passengers: string
    cabin: string
  }>(null)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setFlip(true)
    window.setTimeout(() => setFlip(false), 480)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div id="flights" className="relative z-20 -mt-[132px] scroll-mt-28 sm:-mt-[150px]">
      <div className="shell">
        <Reveal>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setResult({ from, to, passengers, cabin })
            }}
            className="rounded-[26px] border border-white/70 bg-white/85 p-2.5 shadow-soft backdrop-blur-xl sm:p-3.5"
          >
            <div className="grid gap-1.5 lg:grid-cols-12 lg:items-center">
              {/* route */}
              <div className="relative grid gap-1.5 sm:grid-cols-2 lg:col-span-6">
                <Field label="مبدا" icon={<PlaneTakeoff size={18} />}>
                  <input
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    className="w-full bg-transparent text-[15px] font-bold text-ink outline-none placeholder:font-medium placeholder:text-ink/35"
                    placeholder="شهر یا فرودگاه"
                    aria-label="مبدا"
                  />
                </Field>

                <button
                  type="button"
                  onClick={swap}
                  aria-label="جابه‌جایی مبدا و مقصد"
                  className="mx-auto -my-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white text-brand-deep shadow-card transition-transform duration-500 hover:scale-110 sm:hidden"
                >
                  <ArrowLeftRight
                    size={15}
                    className={`transition-transform duration-500 ${flip ? 'rotate-180' : ''}`}
                  />
                </button>

                <Field label="مقصد" icon={<PlaneLanding size={18} />}>
                  <input
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    className="w-full bg-transparent text-[15px] font-bold text-ink outline-none placeholder:font-medium placeholder:text-ink/35"
                    placeholder="شهر یا فرودگاه"
                    aria-label="مقصد"
                  />
                </Field>

                <button
                  type="button"
                  onClick={swap}
                  aria-label="جابه‌جایی مبدا و مقصد"
                  className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-white text-brand-deep shadow-card transition-transform duration-500 hover:scale-110 sm:grid"
                >
                  <ArrowLeftRight
                    size={15}
                    className={`transition-transform duration-500 ${flip ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* dates */}
              <div className="grid gap-1.5 sm:grid-cols-2 lg:col-span-4">
                <PersianDatePicker
                  label="تاریخ رفت"
                  value={depart}
                  onChange={setDepart}
                  min={today}
                  placeholder="انتخاب تاریخ"
                />
                <PersianDatePicker
                  label="تاریخ برگشت"
                  value={returnDate}
                  onChange={setReturnDate}
                  min={depart || today}
                  placeholder="انتخاب تاریخ"
                />
              </div>

              {/* travellers */}
              <div className="lg:col-span-2">
                <Field label="مسافران" icon={<Users size={18} />}>
                  <select
                    value={passengers}
                    onChange={(event) => setPassengers(event.target.value)}
                    className="w-full cursor-pointer appearance-none bg-transparent text-[14px] font-bold text-ink outline-none"
                    aria-label="تعداد مسافران"
                  >
                    {passengerOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="mt-1.5 flex flex-col gap-2 border-t border-ink/[0.07] px-1 pt-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-[150px] shrink-0">
                  <Field label="کلاس پروازی" icon={<Armchair size={17} />}>
                    <select
                      value={cabin}
                      onChange={(event) => setCabin(event.target.value)}
                      className="w-full cursor-pointer appearance-none bg-transparent text-[13.5px] font-bold text-ink outline-none"
                      aria-label="کلاس پروازی"
                    >
                      {cabins.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <p className="hidden text-[11.5px] text-ink-soft sm:block">
                  تضمین بهترین نرخ · بدون هزینه پنهان
                </p>
              </div>

              <button type="submit" className="btn-primary group w-full sm:w-auto sm:!px-8">
                <Search
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                جستجوی پرواز
              </button>
            </div>
          </form>
        </Reveal>

        {result && (
          <div className="mt-2.5 flex flex-col items-start justify-between gap-2 rounded-2xl border border-brand/30 bg-white/80 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:px-5">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-ink-soft">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-deep text-white">
                <Check size={12} />
              </span>
              جستجوی شما ثبت شد:
              <b className="font-bold text-ink">{result.from}</b>
              <span className="text-brand-deep">به</span>
              <b className="font-bold text-ink">{result.to}</b>
              <span className="text-ink/30">·</span>
              {result.passengers}
              <span className="text-ink/30">·</span>
              {result.cabin}
            </p>
            <a
              href="tel:+982191002233"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-ink hover:text-brand-deep"
            >
              <MapPin size={13} />
              مشاهده پروازهای موجود با پشتیبانی {toFa('24/7')}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
