import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Solutions from './components/Solutions';
import Technology from './components/Technology';
import About from './components/About';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Header />

      <main className="pt-16">
        <Hero />
        <Clients />
        <Solutions />
        <Technology />
        <About />
        <CallToAction />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
