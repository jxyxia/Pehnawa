
import { Button } from "@/components/ui/button";

const CartPaymentOptions = () => {
  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-white/50 rounded-premium border border-gray-100">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                alt="Visa" className="h-4 object-contain mb-1" />
            <span className="text-xs">Visa</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                alt="Mastercard" className="h-4 object-contain mb-1" />
            <span className="text-xs">Mastercard</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Google_Pay_Logo_%282018-2020%29.svg/2560px-Google_Pay_Logo_%282018-2020%29.svg.png" 
                alt="Google Pay" className="h-4 object-contain mb-1" />
            <span className="text-xs">Google Pay</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
                alt="UPI" className="h-4 object-contain mb-1" />
            <span className="text-xs">UPI</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPaymentOptions;
