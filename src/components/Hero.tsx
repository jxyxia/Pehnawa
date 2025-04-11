import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToCategories = (gender: string) => {
    navigate("/categories", { state: { filter: gender } });
  };

  return (
    <section className="py-16 md:py-24 bg-pehnawa-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pehnawa-cream via-transparent to-pehnawa-cream opacity-30 z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="h-1 w-20 bg-pehnawa-terracotta"></div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Elevate Your Style,
                <br />
                <span className="text-pehnawa-terracotta">Rent with Ease</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              Discover premium designer clothing without the premium price tag.
              Style meets affordability with our curated collection.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => goToCategories("women")}
                  className="bg-pehnawa-blue text-gray-800 hover:bg-pehnawa-blue/80 premium-shadow group relative overflow-hidden"
                >
                  <span className="relative z-10">Women's Collection</span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <ArrowRight className="relative z-10 h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  onClick={() => goToCategories("men")}
                  variant="outline"
                  className="border-pehnawa-green text-gray-800 hover:bg-pehnawa-green/20 premium-shadow group relative overflow-hidden"
                >
                  <span className="relative z-10">Men's Collection</span>
                  <span className="absolute inset-0 bg-pehnawa-green/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <ArrowRight className="relative z-10 h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pehnawa-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Premium Quality</p>
                  <p className="text-sm text-gray-500">Designer clothing</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pehnawa-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Affordable</p>
                  <p className="text-sm text-gray-500">Rent, don't buy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[550px] w-full">
            {heroImages.map((image, index) => (
              <div
                key={index}
                onClick={() => goToCategories(index === 0 ? "women" : "men")}
                className={`absolute inset-0 cursor-pointer transition-all duration-1000 ease-in-out rounded-premium overflow-hidden premium-shadow transform hover:scale-[1.02] ${
                  index === currentImageIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
              >
                <div className="absolute inset-0 premium-gradient z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-90"
                  style={{ backgroundImage: `url('${image}')` }}
                ></div>
                <div className="absolute bottom-8 left-8 z-20 bg-white/80 backdrop-blur-sm p-4 rounded-lg max-w-xs">
                  <p className="font-medium text-gray-800">
                    {index === 0 ? "Designer Casual Collection" : "Premium Formal Attire"}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 rounded-md overflow-hidden">
                    {[1, 2].map((thumbIndex) => (
                      <div key={thumbIndex} className="h-16 w-16 overflow-hidden">
                        <img
                          src={`https://source.unsplash.com/collection/${index === 0 ? '9284237' : '14312554'}/${thumbIndex}`}
                          alt="Outfit preview"
                          className="w-full h-full object-cover filter brightness-90 blur-[1px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 right-4 z-30 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-pehnawa-terracotta w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-pehnawa-cream z-10"></div>
    </section>
  );
};

export default Hero;
