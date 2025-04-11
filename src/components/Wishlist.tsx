
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Load saved wishlist items from localStorage on component mount
  useEffect(() => {
    const savedWishlistItems = localStorage.getItem('wishlistItems');
    const savedWishlistIds = localStorage.getItem('wishlist');
    
    if (savedWishlistItems) {
      setWishlistItems(JSON.parse(savedWishlistItems));
    }
    
    if (savedWishlistIds) {
      setWishlistIds(JSON.parse(savedWishlistIds));
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    // Update the wishlist items array
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    
    // Update the ids array
    const updatedIds = wishlistIds.filter(itemId => itemId !== id);
    setWishlistIds(updatedIds);
    
    // Update localStorage
    localStorage.setItem('wishlist', JSON.stringify(updatedIds));
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    
    toast.info(`Item removed from wishlist`);
  };

  const addToCart = (id: string, item: WishlistItem) => {
    // Add to cart functionality
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      size: "M", // Default size
      duration: "3 days", // Default duration
      image: item.image,
      quantity: 1
    };
    
    // Get existing cart items
    const existingCartItems = localStorage.getItem('cartItems');
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    
    // Add the new item if it doesn't exist
    if (!cartItems.some((cartItem: any) => cartItem.id === id)) {
      const updatedCartItems = [...cartItems, cartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
      // Update cart ids
      const existingCartIds = localStorage.getItem('cart');
      const cartIds = existingCartIds ? JSON.parse(existingCartIds) : [];
      localStorage.setItem('cart', JSON.stringify([...cartIds, id]));
      
      toast.success(`${item.name} added to cart!`);
    } else {
      toast.info(`${item.name} is already in your cart`);
    }
    
    // Remove from wishlist after adding to cart
    removeFromWishlist(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pehnawa-green text-gray-800 text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {wishlistItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist
          </SheetTitle>
          <SheetDescription>
            {wishlistItems.length === 0 ? "Your wishlist is empty" : `${wishlistItems.length} item(s) in your wishlist`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white/50 p-3 rounded-premium border border-gray-100">
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addToCart(item.id, item)}
                    className="text-xs h-8"
                  >
                    <ShoppingBag className="h-3 w-3 mr-1" /> Add to Cart
                  </Button>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {wishlistItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="text-gray-500 mt-2">Save items you love for later</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist;
