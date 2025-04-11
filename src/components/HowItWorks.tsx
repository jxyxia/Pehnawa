
import { Search, Calendar, ShoppingBag, Shirt } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-pehnawa-terracotta" />,
      title: "Browse & Select",
      description: "Browse our extensive collection and select the perfect outfit for your occasion."
    },
    {
      icon: <Calendar className="h-8 w-8 text-pehnawa-terracotta" />,
      title: "Book Your Dates",
      description: "Choose your rental duration - from a single day to multiple weeks."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-pehnawa-terracotta" />,
      title: "Receive Your Outfit",
      description: "Get your clean, pressed outfit delivered right to your doorstep."
    },
    {
      icon: <Shirt className="h-8 w-8 text-pehnawa-terracotta" />,
      title: "Return When Done",
      description: "Simply return the outfit. No cleaning required - we take care of everything!"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-pehnawa-blue/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pehnawa-blue mb-4">
            How Pehnawa Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Renting designer clothing has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-5 flex justify-center">
                <div className="h-16 w-16 bg-pehnawa-cream rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-pehnawa-blue mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
              <div className="flex justify-center mt-4">
                <div className="h-8 w-8 bg-pehnawa-cream rounded-full flex items-center justify-center text-pehnawa-terracotta font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-pehnawa-terracotta to-pehnawa-blue rounded-xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                First-Time Renter?
              </h3>
              <p className="text-white/90 mb-6">
                Get 20% off your first rental! Use code <span className="font-bold">FIRST20</span> at checkout.
              </p>
              <button className="bg-white text-pehnawa-blue hover:bg-white/90 px-6 py-3 rounded-lg font-medium">
                Claim Offer
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-2">Free Delivery</h4>
                <p className="text-white/80 text-sm">On all orders above ₹1000</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-2">Easy Returns</h4>
                <p className="text-white/80 text-sm">Pre-paid return shipping</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-2">No Deposits</h4>
                <p className="text-white/80 text-sm">Just pay the rental fee</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-2">Cleaning Included</h4>
                <p className="text-white/80 text-sm">Return as is after use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
