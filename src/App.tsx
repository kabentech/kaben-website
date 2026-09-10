import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Problem from './components/Problem';
import Pillars from './components/Pillars';
import WhatWeDo from './components/WhatWeDo';
import Technology from './components/Technology';
import HowWeWork from './components/HowWeWork';
import Outcomes from './components/Outcomes';
import UseCases from './components/UseCases';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08070A] text-gray-200 antialiased scroll-smooth">
      <Header />

      <main className="pt-24">
        <Hero />
        <Problem />
        <Pillars />
        <WhatWeDo />
        <Technology />
        <HowWeWork />
        <Outcomes />
        <UseCases />
        {/* <Clients /> */}
        <About />
        <Contact />
        <Footer />
      </main>

      <style jsx>{`
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(122, 88, 255, 0.25); }
      `}</style>
    </div>
  );
}
