//import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Statistics from '../components/Statistics';
// import Timeline from '../components/Timeline';
import Timeline from '../components/timeline01'; // Import the new Timeline component
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Timeline />
      {/* <Statistics /> */}
      <Partners />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}