import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Logo from "./Logo";
import { BRAND, NAV_LINKS, SOCIALS } from "../data/content";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-gold">
        <Check size={16} /> Thank you — you're on the list.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-navy-950 transition hover:bg-gold-light"
      >
        <Send size={16} />
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.3fr] lg:gap-10 lg:py-20">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Connecting people with extraordinary homes and smart investments
            since 2010. Integrity, transparency, and client satisfaction — at
            the heart of everything we do.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
            Explore
          </h4>
          <ul className="mt-6 space-y-3">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.kind === "route" ? item.to : `/#${item.to}`}
                  className="text-sm text-white/65 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
            Contact
          </h4>
          <ul className="mt-6 space-y-4 text-sm text-white/65">
            <li>
              <a
                href={BRAND.phoneHref}
                className="flex items-start gap-3 transition-colors hover:text-gold"
              >
                <Phone size={15} className="mt-0.5 shrink-0 text-gold" />
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a
                href={BRAND.emailHref}
                className="flex items-start gap-3 transition-colors hover:text-gold"
              >
                <Mail size={15} className="mt-0.5 shrink-0 text-gold" />
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {BRAND.address}
                <br />
                {BRAND.address2}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
            Newsletter
          </h4>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            New listings and market insights, delivered monthly.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>{BRAND.hours}</p>
        </div>
      </div>
    </footer>
  );
}
