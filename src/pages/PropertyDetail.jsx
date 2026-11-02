import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  Phone,
} from "lucide-react";
import Gallery from "../components/Gallery";
import Modal from "../components/Modal";
import PropertyCard from "../components/PropertyCard";
import FavoriteButton from "../components/FavoriteButton";
import Reveal from "../components/Reveal";
import ConsultationForm from "../components/ConsultationForm";
import NotFound from "./NotFound";
import { BRAND } from "../data/content";
import {
  fetchPropertyBySlug,
  fetchSimilarProperties,
} from "../services/propertyService";

/* ---------------- Modal form body ---------------- */

function ViewingForm({ property, onClose }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="py-6 text-center">
        <CheckCircle2 size={44} className="mx-auto text-gold" strokeWidth={1.5} />
        <h4 className="mt-4 text-lg font-bold text-navy">شماره شما ثبت شد</h4>
        <p className="mt-2 text-sm text-ink/60">
          برای هماهنگی بازدید از «{property.name}» با شما تماس می‌گیریم.
        </p>
        <button type="button" onClick={onClose} className="btn-primary mt-6">
          انجام شد
        </button>
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="viewing-name" className="sr-only">نام و نام خانوادگی</label>
        <input id="viewing-name" required placeholder="نام و نام خانوادگی" className="field" />
      </div>
      <div>
        <label htmlFor="viewing-phone" className="sr-only">شماره تماس</label>
        <input
          id="viewing-phone"
          type="tel"
          inputMode="tel"
          required
          placeholder="شماره تماس"
          className="field"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="viewing-date" className="sr-only">تاریخ ترجیحی</label>
          <input id="viewing-date" type="date" required className="field" />
        </div>
        <div>
          <label htmlFor="viewing-time" className="sr-only">ساعت ترجیحی</label>
          <select id="viewing-time" className="field cursor-pointer">
            <option>۱۰:۰۰</option>
            <option>۱۲:۰۰</option>
            <option>۱۴:۰۰</option>
            <option>۱۶:۰۰</option>
            <option>۱۸:۰۰</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary w-full">
        <Calendar size={15} />
        درخواست بازدید
      </button>
    </form>
  );
}

/* ---------------- Page ---------------- */

const scrollToConsultation = () =>
  document
    .getElementById("consultation")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [viewingOpen, setViewingOpen] = useState(false);

  useEffect(() => {
    let live = true;
    setLoading(true);
    fetchPropertyBySlug(slug).then((p) => {
      if (!live) return;
      setProperty(p);
      setLoading(false);
      if (p) {
        fetchSimilarProperties(p.slug).then((s) => live && setSimilar(s));
      }
    });
    return () => {
      live = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-[76px]">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-navy/15 border-t-gold" aria-label="در حال بارگذاری ملک" />
      </div>
    );
  }

  if (!property) return <NotFound />;

  return (
    <article className="bg-white">
      <div className="container-x pt-28 lg:pt-32">
        {/* Breadcrumb */}
        <nav aria-label="مسیر صفحه" className="flex items-center gap-1.5 text-xs font-medium text-ink/50">
          <Link to="/" className="transition-colors hover:text-navy">خانه</Link>
          <ChevronLeft size={12} />
          <Link to="/properties" className="transition-colors hover:text-navy">پروژه‌ها</Link>
          <ChevronLeft size={12} />
          <span className="text-navy">{property.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          {/* Main column */}
          <div className="lg:col-span-8">
            <Gallery images={property.images} name={property.name} />

            {/* Title */}
            <div className="mt-10 flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="label-gold">{property.type}</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {property.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-ink/60">
                  <MapPin size={16} className="text-gold" />
                  {property.location.city}، {property.location.state}،{" "}
                  {property.location.country}
                </p>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-navy/10 px-2 py-1">
                <FavoriteButton
                  propertyId={property.id}
                  variant="bordered"
                  withLabel
                />
              </div>
            </div>

            {/* Consultation form — replaces the published price */}
            <div
              id="consultation"
              className="mt-10 scroll-mt-28 rounded-2xl border border-navy/10 bg-ivory p-6 shadow-card sm:p-8"
            >
              <p className="label-gold">بدون انتشار قیمت</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy">
                ثبت درخواست مشاوره
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                برای دریافت شرایط، جزئیات واحدها و زمان‌بندی، شماره تماس خود
                را ثبت کنید؛ کارشناسان سهند با شما تماس می‌گیرند.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <ConsultationForm propertyName={property.name} />
                <div className="flex flex-col justify-center rounded-xl bg-navy p-6 text-white">
                  <p className="text-xs font-semibold text-gold">تماس مستقیم</p>
                  <a
                    href={BRAND.phoneHref}
                    className="mt-2 flex items-center gap-2 text-xl font-bold transition-colors hover:text-gold-light"
                  >
                    <Phone size={17} className="text-gold" />
                    <span dir="ltr">{BRAND.phone}</span>
                  </a>
                  <a
                    href={BRAND.officePhoneHref}
                    className="mt-2 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Phone size={14} className="text-gold" />
                    <span dir="ltr">{BRAND.officePhone}</span>
                  </a>
                  <p className="mt-5 text-xs leading-relaxed text-white/50">
                    {BRAND.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Aside — consultation */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-gold">
                    <Phone size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-bold text-navy">{BRAND.name}</p>
                    <p className="text-xs font-medium text-gold">
                      مشاوره خرید، پیش‌خرید و مشارکت
                    </p>
                    <a
                      href={BRAND.phoneHref}
                      className="mt-1 flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-navy"
                    >
                      <Phone size={11} /> <span dir="ltr">{BRAND.phone}</span>
                    </a>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={scrollToConsultation}
                    className="btn-primary w-full"
                  >
                    ثبت درخواست مشاوره
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingOpen(true)}
                    className="btn-outline w-full"
                  >
                    <CalendarDays size={15} />
                    رزرو بازدید
                  </button>
                </div>
                <p className="mt-5 text-center text-xs text-ink/40">
                  پاسخ در یک روز کاری
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="bg-ivory py-16 lg:py-24">
          <div className="container-x">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                پروژه‌های مشابه
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/properties" className="btn-outline">
                <ArrowRight size={15} />
                مرور همه پروژه‌ها
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Mobile floating CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-navy/10 bg-white/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <a
          href={BRAND.phoneHref}
          className="flex items-center gap-2 text-sm font-bold text-navy"
        >
          <Phone size={16} className="text-gold" />
          <span dir="ltr">{BRAND.phone}</span>
        </a>
        <button
          type="button"
          onClick={scrollToConsultation}
          className="btn-primary px-5 py-3"
        >
          درخواست مشاوره
          <ArrowLeft size={15} />
        </button>
      </div>
      <div className="h-[76px] lg:hidden" aria-hidden="true" />

      {/* Modals */}
      <Modal open={viewingOpen} onClose={() => setViewingOpen(false)} title="رزرو بازدید">
        <ViewingForm property={property} onClose={() => setViewingOpen(false)} />
      </Modal>
    </article>
  );
}
