import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

/**
 * فرم کوتاه ثبت درخواست مشاوره — جایگزین نمایش قیمت در کارت و صفحه پروژه‌ها.
 * فقط نام و شماره تماس برای پیگیری لازم است.
 */
export default function ConsultationForm({ propertyName }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 size={40} className="mx-auto text-gold" strokeWidth={1.5} />
        <h3 className="mt-4 text-lg font-bold text-navy">درخواست شما ثبت شد</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          کارشناسان سهند برای مشاوره
          {propertyName ? ` درباره «${propertyName}»` : ""} با شما تماس
          می‌گیرند.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-outline mt-6"
        >
          ثبت درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="consult-name"
          className="mb-2 block text-sm font-semibold text-navy"
        >
          نام و نام خانوادگی
        </label>
        <input id="consult-name" required placeholder="نام شما" className="field" />
      </div>
      <div>
        <label
          htmlFor="consult-phone"
          className="mb-2 block text-sm font-semibold text-navy"
        >
          شماره تماس
        </label>
        <input
          id="consult-phone"
          type="tel"
          inputMode="tel"
          required
          placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
          className="field"
        />
      </div>
      <div>
        <label
          htmlFor="consult-note"
          className="mb-2 block text-sm font-semibold text-navy"
        >
          توضیح کوتاه (اختیاری)
        </label>
        <textarea
          id="consult-note"
          rows={3}
          placeholder="کمی درباره نیاز خود بنویسید…"
          className="field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        <Send size={15} />
        ثبت درخواست مشاوره
      </button>
    </form>
  );
}
