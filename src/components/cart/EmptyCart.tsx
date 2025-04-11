
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p className="text-gray-500 mt-2">Browse our collection to add items</p>
    </div>
  );
};

export default EmptyCart;
