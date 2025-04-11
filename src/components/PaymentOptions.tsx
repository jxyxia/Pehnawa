
import { CreditCard } from "lucide-react";

const PaymentOptions = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="/pehnawa-logo.png" 
              alt="Pehnawa" 
              className="h-12 mr-4" 
            />
            <h2 className="text-3xl font-bold text-gray-800">Payment Options</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer multiple secure payment methods for your convenience and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/50 border border-gray-100 rounded-premium premium-shadow hover:scale-105 transition-transform">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
              alt="Visa" 
              className="h-8 mb-4 object-contain" 
            />
            <h3 className="font-medium text-gray-800">Visa</h3>
            <p className="text-sm text-gray-500 text-center mt-2">Credit & Debit Cards</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/50 border border-gray-100 rounded-premium premium-shadow hover:scale-105 transition-transform">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
              alt="Mastercard" 
              className="h-8 mb-4 object-contain" 
            />
            <h3 className="font-medium text-gray-800">Mastercard</h3>
            <p className="text-sm text-gray-500 text-center mt-2">Credit & Debit Cards</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/50 border border-gray-100 rounded-premium premium-shadow hover:scale-105 transition-transform">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Google_Pay_Logo_%282018-2020%29.svg/2560px-Google_Pay_Logo_%282018-2020%29.svg.png" 
              alt="Google Pay" 
              className="h-8 mb-4 object-contain" 
            />
            <h3 className="font-medium text-gray-800">Google Pay</h3>
            <p className="text-sm text-gray-500 text-center mt-2">Fast & Secure</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/50 border border-gray-100 rounded-premium premium-shadow hover:scale-105 transition-transform">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
              alt="UPI" 
              className="h-8 mb-4 object-contain" 
            />
            <h3 className="font-medium text-gray-800">UPI</h3>
            <p className="text-sm text-gray-500 text-center mt-2">Instant Transfer</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">All transactions are secure and encrypted</p>
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Your payment information is never stored on our servers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
