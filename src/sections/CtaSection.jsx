import { Link } from "react-router-dom";
import { ArrowRight, KeyRound } from "lucide-react";
import Reveal from "../components/Reveal";

/** Compact call-to-action band. */
export default function CtaSection() {
  return (
    <section className="bg-navy-50 py-16 lg:py-24">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-7 sm:flex-row lg:items-center">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy text-gold shadow-card">
                <KeyRound size={26} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="mt-2 text-base text-ink/60">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
