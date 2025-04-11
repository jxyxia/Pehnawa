
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PaymentOptions from "@/components/PaymentOptions";
import AboutTeam from "@/components/AboutTeam";

const Index = () => {
  return (
    <div className="min-h-screen bg-pehnawa-cream">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <PaymentOptions />
      <Testimonials />
      <AboutTeam />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
