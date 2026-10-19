import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import FeaturedProperties from "../sections/FeaturedProperties";
import Services from "../sections/Services";
import WhyChoose from "../sections/WhyChoose";
import Team from "../sections/Team";
import CtaSection from "../sections/CtaSection";

export default function Home() {
  const location = useLocation();

  // Smooth-scroll to a section after navigating from another route.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;
    const timer = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState({}, "");
    }, 80);
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChoose />
      <Team />
      <CtaSection />
    </>
  );
}
