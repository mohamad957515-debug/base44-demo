import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";
import Gallery from "../components/Gallery";
import Modal from "../components/Modal";
import PropertyCard from "../components/PropertyCard";
import FavoriteButton from "../components/FavoriteButton";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import { BRAND } from "../data/content";
import { formatNumber, formatPrice } from "../lib/format";
import {
  fetchPropertyBySlug,
  fetchSimilarProperties,
  resolveAgent,
} from "../services/propertyService";

/* ---------------- Modal form bodies ---------------- */

function SuccessMessage({ title, text, onDone }) {
  return (
    <div className="py-6 text-center">
      <CheckCircle2 size={44} className="mx-auto text-gold" strokeWidth={1.5} />
      <h4 className="mt-4 text-lg font-bold text-navy">{title}</h4>
      <p className="mt-2 text-sm text-ink/60">{text}</p>
      <button type="button" onClick={onDone} className="btn-primary mt-6">
        Done
      </button>
    </div>
  );
}

function ContactAgentForm({ property, onClose }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <SuccessMessage
        title="Message sent"
        text={`Thank you — our advisor will respond within one business day about ${property.name}.`}
        onDone={onClose}
      />
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
        <label htmlFor="contact-name" className="sr-only">Full name</label>
        <input id="contact-name" required placeholder="Full name" className="field" />
      </div>
      <div>
        <label htmlFor="contact-email" className="sr-only">Email</label>
        <input id="contact-email" type="email" required placeholder="Email address" className="field" />
      </div>
      <div>
        <label htmlFor="contact-phone" className="sr-only">Phone (optional)</label>
        <input id="contact-phone" type="tel" placeholder="Phone (optional)" className="field" />
      </div>
      <div>
        <label htmlFor="contact-msg" className="sr-only">Message</label>
        <textarea
          id="contact-msg"
          rows={4}
          required
          defaultValue={`Hello, I'd like more information about ${property.name} (${formatPrice(property.price)}).`}
          className="field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        <Mail size={15} />
        Send Message
      </button>
    </form>
  );
}

function ViewingForm({ property, onClose }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <SuccessMessage
        title="Viewing requested"
        text={`We'll confirm your tour of ${property.name} by email shortly.`}
        onDone={onClose}
      />
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
        <label htmlFor="viewing-name" className="sr-only">Full name</label>
        <input id="viewing-name" required placeholder="Full name" className="field" />
      </div>
      <div>
        <label htmlFor="viewing-email" className="sr-only">Email</label>
        <input id="viewing-email" type="email" required placeholder="Email address" className="field" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="viewing-date" className="sr-only">Preferred date</label>
          <input id="viewing-date" type="date" required className="field" />
        </div>
        <div>
          <label htmlFor="viewing-time" className="sr-only">Preferred time</label>
          <select id="viewing-time" className="field cursor-pointer">
            <option>10:00 AM</option>
            <option>12:00 PM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
            <option>6:00 PM</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary w-full">
        <Calendar size={15} />
        Request Viewing
      </button>
    </form>
  );
}

/* ---------------- Page ---------------- */

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [contactOpen, setContactOpen] = useState(false);
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
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-navy/15 border-t-gold" aria-label="Loading property" />
      </div>
    );
  }

  if (!property) return <NotFound />;

  const agent = resolveAgent(property.agent);
  const specs = [
    { icon: BedDouble, value: `${property.beds}`, label: "Bedrooms" },
    { icon: Bath, value: `${property.baths}`, label: "Bathrooms" },
    { icon: Ruler, value: `${formatNumber(property.sqft)}`, label: "Square Feet" },
    { icon: Calendar, value: `${property.yearBuilt}`, label: "Year Built" },
  ];

  return (
    <article className="bg-white">
      <div className="container-x pt-28 lg:pt-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-ink/50">
          <Link to="/" className="transition-colors hover:text-navy">Home</Link>
          <ChevronRight size={12} />
          <Link to="/properties" className="transition-colors hover:text-navy">Properties</Link>
          <ChevronRight size={12} />
          <span className="text-navy">{property.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          {/* Main column */}
          <div className="lg:col-span-8">
            <Gallery images={property.images} name={property.name} />

            {/* Title & price */}
            <div className="mt-10 flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="label-gold">{property.type} · For Sale</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {property.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-ink/60">
                  <MapPin size={16} className="text-gold" />
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-3xl font-bold tracking-tight text-navy">
                  {formatPrice(property.price)}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-navy/10 px-2 py-1">
                  <FavoriteButton
                    propertyId={property.id}
                    variant="bordered"
                    withLabel
                  />
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-navy/10 sm:grid-cols-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-4 border-navy/10 p-5 odd:border-r sm:border-r sm:last:border-r-0 sm:odd:border-r"
                >
                  <spec.icon size={26} className="shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="text-lg font-bold text-navy">{spec.value}</p>
                    <p className="text-xs text-ink/50">{spec.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <Reveal className="mt-12">
              <h2 className="text-xl font-bold text-navy">About This Property</h2>
              {property.description.map((para) => (
                <p key={para.slice(0, 24)} className="mt-4 leading-relaxed text-ink/70">
                  {para}
                </p>
              ))}
            </Reveal>

            {/* Key features */}
            <Reveal className="mt-12">
              <h2 className="text-xl font-bold text-navy">Key Features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-ink/70">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Amenities */}
            <Reveal className="mt-12">
              <h2 className="text-xl font-bold text-navy">Amenities</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-navy/10 bg-ivory px-4 py-2 text-xs font-semibold text-ink/70"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Aside — agent */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-7">
                {agent && (
                  <div className="flex items-center gap-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
                    />
                    <div>
                      <p className="font-bold text-navy">{agent.name}</p>
                      <p className="text-xs font-medium text-gold">{agent.role}</p>
                      <a
                        href={BRAND.phoneHref}
                        className="mt-1 flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-navy"
                      >
                        <Phone size={11} /> {BRAND.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="btn-primary w-full"
                  >
                    <Mail size={15} />
                    Contact Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingOpen(true)}
                    className="btn-outline w-full"
                  >
                    <CalendarDays size={15} />
                    Schedule a Viewing
                  </button>
                </div>
                <p className="mt-5 text-center text-xs text-ink/40">
                  Response within one business day.
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
                Similar Properties
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
                <ArrowLeft size={15} />
                Browse All Properties
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Mobile floating CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-navy/10 bg-white/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <div>
          <p className="text-lg font-bold text-navy">{formatPrice(property.price)}</p>
          <p className="text-[11px] text-ink/50">{property.location.city}, {property.location.state}</p>
        </div>
        <button
          type="button"
          onClick={() => setViewingOpen(true)}
          className="btn-primary px-6 py-3"
        >
          Schedule Viewing
          <ArrowRight size={15} />
        </button>
      </div>
      <div className="h-[76px] lg:hidden" aria-hidden="true" />

      {/* Modals */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contact the Agent">
        <ContactAgentForm property={property} onClose={() => setContactOpen(false)} />
      </Modal>
      <Modal open={viewingOpen} onClose={() => setViewingOpen(false)} title="Schedule a Viewing">
        <ViewingForm property={property} onClose={() => setViewingOpen(false)} />
      </Modal>
    </article>
  );
}
