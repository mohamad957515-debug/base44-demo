import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  JALALI_MONTHS,
  JALALI_WEEKDAYS,
  isoToJalali,
  jalaaliMonthLength,
  jalaliToIso,
  jalaliWeekday,
} from '../../lib/jalali'
import { toFa } from '../../lib/format'

type Props = {
  label: string
  value: string
  onChange: (iso: string) => void
  min?: string
  placeholder?: string
}

export default function PersianDatePicker({ label, value, onChange, min, placeholder }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const selected = useMemo(() => (value ? isoToJalali(value) : null), [value])
  const base = selected ?? isoToJalali(todayIso)
  const [view, setView] = useState({ jy: base.jy, jm: base.jm })

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const toggle = () => {
    if (!open) {
      const anchor = selected ?? isoToJalali(todayIso)
      setView({ jy: anchor.jy, jm: anchor.jm })
    }
    setOpen((current) => !current)
  }

  const shiftMonth = (delta: number) => {
    setView((current) => {
      let jm = current.jm + delta
      let jy = current.jy
      if (jm < 1) {
        jm = 12
        jy -= 1
      } else if (jm > 12) {
        jm = 1
        jy += 1
      }
      return { jy, jm }
    })
  }

  const days = useMemo(() => {
    const length = jalaaliMonthLength(view.jy, view.jm)
    const lead = jalaliWeekday(view.jy, view.jm, 1)
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length }, (_, index) => index + 1),
    ]
  }, [view])

  const display = selected
    ? `${toFa(selected.jd)} ${JALALI_MONTHS[selected.jm - 1]} ${toFa(selected.jy)}`
    : placeholder ?? 'انتخاب تاریخ'

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        className="flex w-full items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-right transition-colors duration-300 hover:bg-brand-light/60 focus-visible:bg-brand-light/70"
      >
        <CalendarDays size={18} className="shrink-0 text-brand-deep" />
        <span className="min-w-0 flex-1">
          <span className="mb-0.5 block text-[10.5px] font-medium text-ink-soft">{label}</span>
          <span
            className={`block truncate text-[13.5px] font-semibold ${
              selected ? 'text-ink' : 'font-medium text-ink/35'
            }`}
          >
            {display}
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`انتخاب ${label}`}
          className="absolute right-0 top-full z-30 mt-2 w-[286px] rounded-2xl border border-ink/[0.07] bg-white p-3 shadow-soft"
        >
          <div className="flex items-center justify-between px-1 pb-2">
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="ماه بعد"
              className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-brand-light hover:text-brand-deep"
            >
              <ChevronLeft size={15} />
            </button>
            <p className="text-[12.5px] font-bold text-ink">
              {JALALI_MONTHS[view.jm - 1]} {toFa(view.jy)}
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="ماه قبل"
              className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-brand-light hover:text-brand-deep"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 pb-1 text-center">
            {JALALI_WEEKDAYS.map((weekday) => (
              <span key={weekday} className="text-[10px] font-medium text-ink-soft/60">
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day, index) => {
              if (!day) return <span key={`blank-${index}`} />
              const iso = jalaliToIso(view.jy, view.jm, day)
              const disabled = Boolean(min && iso < min)
              const isSelected = value === iso
              const isToday = todayIso === iso
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso)
                    setOpen(false)
                  }}
                  className={`grid h-8 place-items-center rounded-lg text-[11.5px] font-semibold transition-colors duration-200 ${
                    isSelected
                      ? 'bg-brand-deep text-white'
                      : disabled
                        ? 'cursor-not-allowed text-ink/20'
                        : 'text-ink hover:bg-brand-light'
                  } ${!isSelected && isToday ? 'ring-1 ring-inset ring-brand/60' : ''}`}
                >
                  {toFa(day)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
