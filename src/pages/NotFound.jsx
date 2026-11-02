import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy-950 px-5 pt-[76px]">
      <div className="text-center">
        <p className="label-gold">خطای ۴۰۴</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          این صفحه پیدا نشد
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-white/60">
          صفحه‌ای که دنبالش هستید احتمالاً جابه‌جا شده یا دیگر وجود ندارد.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowRight size={16} />
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}
