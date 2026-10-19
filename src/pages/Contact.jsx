import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { BRAND, TEAM } from "../data/content";

function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <CheckCircle2 size={48} className="text-gold" strokeWidth={1.5} />
        <h3 className="mt-5 text-xl font-bold text-navy">Message received</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          Thank you for reaching out — one of our advisors will get back to you
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-outline mt-7"
        >
          Send another message
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
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-navy">
            Full name
          </label>
          <input id="c-name" required placeholder="Jane Cooper" className="field" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm font-semibold text-navy">
            Email
          </label>
          <input id="c-email" type="email" required placeholder="jane@example.com" className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="mb-2 block text-sm font-semibold text-navy">
            Phone (optional)
          </label>
          <input id="c-phone" type="tel" placeholder="(555) 000-0000" className="field" />
        </div>
        <div>
          <label htmlFor="c-subject" className="mb-2 block text-sm font-semibold text-navy">
            I'm interested in
          </label>
          <select id="c-subject" className="field cursor-pointer">
            <option>Buying a home</option>
            <option>Selling a property</option>
            <option>Investment opportunities</option>
            <option>Property valuation</option>
            <option>Something else</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-semibold text-navy">
          Message
        </label>
        <textarea
          id="c-message"
          rows={5}
          required
          placeholder="Tell us a little about what you're looking for…"
          className="field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        <Send size={15} />
        Send Message
      </button>
    </form>
  );
}

const INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: BRAND.phone,
    href: BRAND.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: BRAND.emailHref,
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${BRAND.address}, ${BRAND.address2}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: BRAND.hours,
  },
];

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"
        />
        <div className="container-x relative text-center">
          <p className="label-gold">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let's Start the Conversation
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Whether you're buying, selling, or exploring investments — we'd
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Info column */}
          <div className="space-y-4 lg:col-span-5">
            {INFO.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-gold">
                    <item.icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block font-semibold text-navy transition-colors hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-navy">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={240}>
              <div className="rounded-2xl bg-navy p-7 text-white shadow-card">
                <p className="label-gold">Work with a specialist</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Every Horizon client is paired with a dedicated advisor from
                  our team — no call centers, no hand-offs.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {TEAM.map((m) => (
                      <img
                        key={m.id}
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="h-10 w-10 rounded-full border-2 border-navy object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/60">
                    Meet our team on the <span className="text-gold">home page</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-navy">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-ink/60">
                We reply within one business day.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
