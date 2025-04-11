import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);

  useEffect(() => {
    // Get the order ID from URL search params
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("order_id");
    setOrderId(id);

    if (id) {
      fetchOrderDetails(id);
    }
  }, [location.search]);

  const fetchOrderDetails = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // If we have an estimated delivery date, use that
      if (data.estimated_delivery_date) {
        setEstimatedDelivery(format(new Date(data.estimated_delivery_date), "MMMM dd, yyyy"));
      } else {
        // Otherwise calculate an estimated date (7 days from now)
        setEstimatedDelivery(format(addDays(new Date(), 7), "MMMM dd, yyyy"));
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: "Failed to load order details",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="bg-white/50 rounded-premium border border-gray-100 p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your payment and are processing your order.
        </p>
        
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Order Reference</p>
            <p className="font-medium">{orderId.slice(0, 8)}</p>
          </div>
        )}
        
        {estimatedDelivery && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-medium">{estimatedDelivery}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => orderId ? navigate(`/orders/${orderId}`) : navigate('/orders')}
          >
            View Order Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
