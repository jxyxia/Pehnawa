
import { supabase } from "@/integrations/supabase/client";
import { CartItemType } from "@/components/cart/CartItem";

export const createOrder = async (
  userId: string,
  cartTotal: number,
  address: string,
  phone: string,
  cartItems: CartItemType[]
) => {
  // Get random delivery timeframe (2-3 days)
  const deliveryDays = Math.floor(Math.random() * 2) + 2; // Random number between 2-3
  
  // Create order in database
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_amount: cartTotal,
      status: "processing",
      payment_status: "completed", // For demo purposes we set as completed
      dispatch_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      estimated_delivery_date: new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toISOString(), // 2-3 days from now
      address,
      phone,
      payment_id: `demo_${Date.now()}`
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Add order items
  const orderItems = cartItems.map(item => ({
    order_id: orderData.id,
    product_id: item.id,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    duration: item.duration
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData;
};
