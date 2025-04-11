
import Navbar from "@/components/Navbar";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-pehnawa-cream">
      <Navbar />
      <div className="pt-8">
        <HowItWorksComponent />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
