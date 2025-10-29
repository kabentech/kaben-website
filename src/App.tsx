import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Technology from './components/Technology';
import Consulting from './components/Consulting';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function App() {
  return (
    <div className="min-h-screen bg-[#08070A] text-gray-200 antialiased scroll-smooth">
      <Header />

      <main className="pt-24">
        <Hero />
        <Solutions />
        <Technology />
        <Consulting />
        <About />
        <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY || ""}>
          <Contact />
        </GoogleReCaptchaProvider>
        <Footer />
      </main>

      <style jsx>{`
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(122, 88, 255, 0.25); }
      `}</style>
    </div>
  );
}
