import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import ImpactTV from "@/components/ImpactTV";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <ImpactTV />
        <Testimonials />
        <QuoteForm />
        <Map />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
