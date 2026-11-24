import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FlightSearch from './components/FlightSearch'
import Destinations from './components/Destinations'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Experience from './components/Experience'
import Airlines from './components/Airlines'
import Packages from './components/Packages'
import Testimonials from './components/Testimonials'
import Stats from './components/Stats'
import Inspiration from './components/Inspiration'
import Newsletter from './components/Newsletter'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud-soft">
      <Navbar />
      <main>
        <Hero />
        <FlightSearch />
        <Destinations />
        <Services />
        <WhyUs />
        <Experience />
        <Airlines />
        <Packages />
        <Testimonials />
        <Stats />
        <Inspiration />
        <Newsletter />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
