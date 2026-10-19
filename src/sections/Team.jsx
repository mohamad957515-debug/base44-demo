import { Linkedin, Mail } from "lucide-react";
import Reveal from "../components/Reveal";
import { TEAM } from "../data/content";

/** Premium team cards with an elegant hover reveal. */
export default function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="label-gold">Our Team</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Meet the Experts
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 80}>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl bg-navy-100">
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 bg-gradient-to-t from-navy-950/80 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-gold hover:text-navy-950"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href="mailto:hello@horizonproperties.com"
                      aria-label={`Email ${member.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-gold hover:text-navy-950"
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-gold">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
