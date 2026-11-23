import { useState } from 'react'
import type { Level } from '../data/site'
import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import Courses from '../components/sections/Courses'
import Philosophy from '../components/sections/Philosophy'
import Experience from '../components/sections/Experience'
import Stats from '../components/sections/Stats'
import Partners from '../components/sections/Partners'
import Instructor from '../components/sections/Instructor'
import Testimonials from '../components/sections/Testimonials'
import Journal from '../components/sections/Journal'
import Newsletter from '../components/sections/Newsletter'
import Faq from '../components/sections/Faq'

export default function Home() {
  const [level, setLevel] = useState<Level | null>(null)

  return (
    <main>
      <Hero
        level={level}
        onLevelChange={(next) => setLevel((current) => (current === next ? null : next))}
      />
      <Marquee />
      <Courses level={level} onReset={() => setLevel(null)} />
      <Philosophy />
      <Experience />
      <Stats />
      <Partners />
      <Instructor />
      <Testimonials />
      <Journal />
      <Newsletter />
      <Faq />
    </main>
  )
}
