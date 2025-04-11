
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CartItem, { CartItemType } from "@/components/cart/CartItem";
import CartPaymentOptions from "@/components/cart/CartPaymentOptions";
import ShippingForm from "@/components/cart/ShippingForm";
import EmptyCart from "@/components/cart/EmptyCart";
import { createOrder } from "@/services/CartService";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartIds, setCartIds] = useState<string[]>([]);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedCartIds = localStorage.getItem('cart');
    
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    
    if (savedCartIds) {
      setCartIds(JSON.parse(savedCartIds));
    }
  }, []);

  // Update localStorage when component unmounts or when cartItems changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cart', JSON.stringify(cartIds));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems, cartIds]);

  const removeFromCart = (id: string) => {
    // Update the cart items array
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    
    // Update the ids array
    const updatedIds = cartIds.filter(itemId => itemId !== id);
    setCartIds(updatedIds);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedIds));
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setIsSubmitting(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to checkout",
          variant: "destructive",
        });
        setSheetOpen(false);
        navigate("/auth");
        return;
      }
      
      if (!address || !phone) {
        toast({
          title: "Missing information",
          description: "Please provide your shipping address and phone number",
          variant: "destructive",
        });
        return;
      }

      const orderData = await createOrder(
        session.user.id,
        cartTotal,
        address,
        phone,
        cartItems
      );

      // Clear cart after successful order
      setCartItems([]);
      setSheetOpen(false);
      
      // Navigate to success page
      navigate(`/payment-success?order_id=${orderData.id}`);
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase",
      });

    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pehnawa-terracotta text-gray-800 text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}

          {cartItems.length === 0 && <EmptyCart />}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="py-4 mt-4 border-t border-gray-100">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {showCheckout && (
              <ShippingForm 
                address={address}
                setAddress={setAddress}
                phone={phone}
                setPhone={setPhone}
              />
            )}

            <CartPaymentOptions />

            <SheetFooter className="mt-6">
              {!showCheckout ? (
                <Button 
                  className="w-full bg-pehnawa-terracotta text-gray-800 hover:bg-pehnawa-terracotta/80 premium-shadow"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <div className="flex flex-col w-full space-y-2">
                  <Button 
                    className="w-full bg-pehnawa-terracotta text-gray-800 hover:bg-pehnawa-terracotta/80 premium-shadow"
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" /> Complete Purchase
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back to Cart
                  </Button>
                </div>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
