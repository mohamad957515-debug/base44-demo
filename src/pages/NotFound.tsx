import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpLeft } from '../components/ui/Icons'

export default function NotFound() {
  return (
    <main className="shell flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
      <p className="latin text-[11px] text-gold">404</p>
      <h1 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tightest">
        این صفحه در آتلیه پیدا نشد.
      </h1>
      <p className="mt-4 max-w-sm text-[13.5px] leading-[1.95] text-stone">
        ممکن است نشانی تغییر کرده باشد. از صفحهٔ اصلی مسیرتان را ادامه دهید.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          بازگشت به خانه
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Link to="/#courses" className="btn-ghost">
          دوره‌ها
          <ArrowUpLeft className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
