import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Mail, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { BRAND, NAV_LINKS } from "../data/content";
import { useLockBodyScroll, useScrollY } from "../lib/hooks";

const underline =
  "relative after:absolute after:-bottom-1.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100";

/** In-page section link that also works from other routes (navigates home first). */
function SectionLink({ hash, label, className, onClick }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <a
      href={`/#${hash}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== "/") navigate("/", { state: { scrollTo: hash } });
        else
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: "smooth" });
        onClick?.();
      }}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const scrollY = useScrollY();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = !isHome || scrollY > 40;
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  useLockBodyScroll(open);

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkColor = (active) =>
    `text-[13px] font-semibold tracking-[0.08em] transition-colors duration-300 ${
      solid
        ? active
          ? "text-navy"
          : "text-navy/70 hover:text-navy"
        : active
          ? "text-white"
          : "text-white/70 hover:text-white"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-white/95 shadow-[0_1px_0_rgba(10,35,66,0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between">
          <Logo light={!solid} />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((item) =>
              item.kind === "route" ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${linkColor(isActive)} ${underline} ${
                      isActive ? "after:scale-x-100" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <SectionLink
                  key={item.label}
                  hash={item.to}
                  label={item.label}
                  className={`${linkColor(false)} ${underline}`}
                />
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <a
              href={BRAND.phoneHref}
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                solid
                  ? "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white"
                  : "border border-white/40 text-white hover:border-gold hover:text-gold"
              }`}
            >
              <Phone size={14} strokeWidth={2} />
              {BRAND.phone}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
              solid ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-navy-950 pt-[76px] anim-fade lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav className="container-x flex flex-1 flex-col justify-center gap-1 pb-16" aria-label="Mobile">
            {NAV_LINKS.map((item, i) =>
              item.kind === "route" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeMenu}
                  style={{ animationDelay: `${60 + i * 55}ms` }}
                  className={`menu-item border-b border-white/10 py-4 text-2xl font-semibold tracking-wide text-white/90 transition-colors hover:text-gold ${
                    pathname === item.to ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <SectionLink
                  key={item.label}
                  hash={item.to}
                  label={item.label}
                  onClick={closeMenu}
                  className="menu-item border-b border-white/10 py-4 text-2xl font-semibold tracking-wide text-white/90 transition-colors hover:text-gold"
                />
              )
            )}
            <div
              className="menu-item mt-8 flex flex-col gap-3 text-white/70"
              style={{ animationDelay: "420ms" }}
            >
              <a href={BRAND.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-white">
                <Phone size={18} className="text-gold" /> {BRAND.phone}
              </a>
              <a href={BRAND.emailHref} className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gold" /> {BRAND.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
