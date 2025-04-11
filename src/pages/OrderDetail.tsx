
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Truck, CheckCircle, Loader2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  size?: string;
  duration?: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  payment_status: string;
  payment_id?: string;
  dispatch_date: string | null;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  address: string;
  phone: string;
  items?: OrderItem[];
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    async function checkAuthAndFetchOrder() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to view your order details",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }
      
      fetchOrderDetails();
    }
    
    checkAuthAndFetchOrder();
  }, [id, navigate]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (orderError) throw orderError;

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", id);

      if (itemsError) throw itemsError;

      setOrder({ ...orderData, items: itemsData || [] });
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: "Failed to load order details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order || !id) return;
    
    setCancelling(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;

      setOrder({ ...order, status: "cancelled" });
      
      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled",
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Error",
        description: "Failed to cancel your order",
        variant: "destructive"
      });
    } finally {
      setCancelling(false);
      setShowCancelDialog(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not available";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatAmount = (amount: number) => {
    return `₹${(amount / 100).toFixed(2)}`;
  };

  const getDeliveryStage = () => {
    if (order?.actual_delivery_date) return 3; // Delivered
    if (order?.dispatch_date) return 2; // Dispatched
    return 1; // Processing
  };

  const canCancel = () => {
    if (!order) return false;
    return order.status !== "cancelled" && order.status !== "completed" && !order.dispatch_date;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pehnawa-terracotta" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-xl font-medium">Order not found</h2>
          <Button onClick={() => navigate("/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const deliveryStage = getDeliveryStage();

  return (
    <div className="container mx-auto py-10 px-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate("/orders")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
      </Button>

      <div className="bg-white/50 rounded-premium border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Order #{order.id.slice(0, 8)}</h1>
            <p className="text-gray-500">Placed on {formatDate(order.created_at)}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
            <p className="mt-2 font-medium">Total: {formatAmount(order.total_amount)}</p>
          </div>
        </div>
        {canCancel() && (
          <div className="mt-4 flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setShowCancelDialog(true)}
              disabled={cancelling}
              className="flex items-center gap-1"
            >
              {cancelling ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <XCircle className="h-4 w-4 mr-1" />
              )}
              Cancel Order
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/50 rounded-premium border border-gray-100 p-6">
          <h2 className="font-bold text-lg mb-4">Delivery Status</h2>
          <div className="relative">
            <div className="border-l-2 border-gray-200 absolute h-full left-[15px] z-0"></div>
            
            <div className="flex items-start mb-8 relative z-10">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${deliveryStage >= 1 ? 'bg-pehnawa-terracotta text-white' : 'bg-gray-200'}`}>
                <Package className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Order Processed</h3>
                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-8 relative z-10">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${deliveryStage >= 2 ? 'bg-pehnawa-terracotta text-white' : 'bg-gray-200'}`}>
                <Truck className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Order Dispatched</h3>
                <p className="text-sm text-gray-500">
                  {order.dispatch_date ? formatDate(order.dispatch_date) : "Pending"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start relative z-10">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${deliveryStage >= 3 ? 'bg-pehnawa-terracotta text-white' : 'bg-gray-200'}`}>
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Delivered</h3>
                <p className="text-sm text-gray-500">
                  {order.actual_delivery_date 
                    ? formatDate(order.actual_delivery_date) 
                    : order.estimated_delivery_date 
                    ? `Estimated: ${formatDate(order.estimated_delivery_date)}` 
                    : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/50 rounded-premium border border-gray-100 p-6">
          <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
          <p className="whitespace-pre-line">{order.address}</p>
          <p className="mt-4">
            <span className="font-medium">Phone:</span> {order.phone}
          </p>
        </div>
        
        <div className="bg-white/50 rounded-premium border border-gray-100 p-6">
          <h2 className="font-bold text-lg mb-4">Payment Information</h2>
          <div className="flex items-center mb-2">
            <span className="font-medium w-36">Payment Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              order.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.payment_status}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium w-36">Payment ID:</span>
            <span>{order.payment_id || "Not available"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-36">Total Amount:</span>
            <span>{formatAmount(order.total_amount)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/50 rounded-premium border border-gray-100 p-6">
        <h2 className="font-bold text-lg mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items && order.items.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-medium">{item.product_name}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {item.size && <span className="mr-4">Size: {item.size}</span>}
                  {item.duration && <span>Duration: {item.duration}</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatAmount(item.price)}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep order</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelOrder}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, cancel order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderDetail;
