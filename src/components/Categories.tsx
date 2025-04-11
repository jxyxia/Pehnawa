
import { useState, useEffect } from "react";
import { toast } from "sonner";
import CategoryFilter from "./category/CategoryFilter";
import CategorySection from "./category/CategorySection";
import { categories } from "./category/categoryData";
import { CartItemType, WishlistItemType, CategoriesProps } from "./category/types";

const Categories = ({ initialFilter, searchTerm }: CategoriesProps) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(initialFilter);
  
  // Apply initial filter when component mounts or filter changes
  useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);
  
  // Load initial state from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCart = localStorage.getItem('cart');
    
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [wishlistItems, cartItems]);

  const addToCart = (itemId: string, itemName: string, itemImage: string) => {
    if (!cartItems.includes(itemId)) {
      const updatedCartItems = [...cartItems, itemId];
      setCartItems(updatedCartItems);
      
      // Find the item details
      let itemDetails: { price: number, name: string } | undefined;
      categories.forEach(cat => {
        const found = cat.items.find(item => item.id === itemId);
        if (found) itemDetails = found;
      });
      
      if (itemDetails) {
        // Create a cart item and save to localStorage
        const newCartItem: CartItemType = {
          id: itemId,
          name: itemName,
          price: itemDetails.price,
          size: "M", // Default size
          duration: "3 days", // Default duration
          image: itemImage,
          quantity: 1
        };
        
        const existingCart = localStorage.getItem('cartItems');
        const cartItemsArray = existingCart ? JSON.parse(existingCart) : [];
        localStorage.setItem('cartItems', JSON.stringify([...cartItemsArray, newCartItem]));
      }
      
      toast.success(`${itemName} added to cart!`);
    } else {
      toast.info(`${itemName} is already in your cart`);
    }
  };

  const toggleWishlist = (itemId: string, itemName: string, itemImage: string) => {
    if (wishlistItems.includes(itemId)) {
      // Remove from wishlist
      const updatedWishlistItems = wishlistItems.filter(id => id !== itemId);
      setWishlistItems(updatedWishlistItems);
      
      // Remove from localStorage wishlist items
      const existingWishlist = localStorage.getItem('wishlistItems');
      if (existingWishlist) {
        const wishlistItemsArray = JSON.parse(existingWishlist);
        const updatedWishlistItemsArray = wishlistItemsArray.filter((item: WishlistItemType) => item.id !== itemId);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItemsArray));
      }
      
      toast.info(`${itemName} removed from wishlist`);
    } else {
      // Add to wishlist
      const updatedWishlistItems = [...wishlistItems, itemId];
      setWishlistItems(updatedWishlistItems);
      
      // Find the item details
      let itemDetails: { price: number, name: string } | undefined;
      categories.forEach(cat => {
        const found = cat.items.find(item => item.id === itemId);
        if (found) itemDetails = found;
      });
      
      if (itemDetails) {
        // Create a wishlist item and save to localStorage
        const newWishlistItem: WishlistItemType = {
          id: itemId,
          name: itemName,
          price: itemDetails.price,
          image: itemImage
        };
        
        const existingWishlist = localStorage.getItem('wishlistItems');
        const wishlistItemsArray = existingWishlist ? JSON.parse(existingWishlist) : [];
        localStorage.setItem('wishlistItems', JSON.stringify([...wishlistItemsArray, newWishlistItem]));
      }
      
      toast.success(`${itemName} added to wishlist!`);
    }
  };

  const viewDetails = (itemId: string) => {
    // In a real app, this would navigate to the product details page
    toast.info(`Viewing details for item ${itemId}`);
  };

  // Filter items based on searchTerm
  const filteredCategories = categories.map(category => {
    if (!searchTerm) return category;
    
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      ...category,
      items: filteredItems
    };
  }).filter(category => category.items.length > 0);

  const clearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <CategoryFilter 
          activeFilter={activeFilter} 
          searchTerm={searchTerm} 
          onClearFilter={clearFilter} 
        />

        <div className="space-y-20">
          {(searchTerm ? filteredCategories : categories)
            .filter(category => !activeFilter || category.id === activeFilter)
            .map((category, index) => (
              <CategorySection
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                items={category.items}
                index={index}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                onViewDetails={viewDetails}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
