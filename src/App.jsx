import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Works from './components/Works'
import About from './components/About'
import Process from './components/Process'
import Industries from './components/Industries'
import Testimonials from './components/Testimonials'
import Insights from './components/Insights'
import ContactCta from './components/ContactCta'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div className="relative min-h-screen bg-ink">
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-right bg-gradient-to-l from-azure to-azure-300"
      />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Works />
        <About />
        <Process />
        <Industries />
        <Testimonials />
        <Insights />
        <ContactCta />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
