
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

interface CategoryItem {
  id: string;
  name: string;
  price: number;
  priceString: string;
  image: string;
}

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  items: CategoryItem[];
  index: number;
  cartItems: string[];
  wishlistItems: string[];
  onAddToCart: (id: string, name: string, image: string) => void;
  onToggleWishlist: (id: string, name: string, image: string) => void;
  onViewDetails: (id: string) => void;
}

const CategorySection = ({ 
  id, 
  title, 
  description, 
  image, 
  items, 
  index,
  cartItems,
  wishlistItems,
  onAddToCart,
  onToggleWishlist,
  onViewDetails
}: CategorySectionProps) => {
  return (
    <div 
      id={id}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center",
        index % 2 === 1 ? "lg:grid-flow-dense" : ""
      )}
    >
      <div className={cn(
        "space-y-6",
        index % 2 === 1 ? "lg:col-start-2" : ""
      )}>
        <h3 className="text-2xl md:text-3xl font-bold text-pehnawa-blue">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              priceString={item.priceString}
              image={item.image}
              isInCart={cartItems.includes(item.id)}
              isInWishlist={wishlistItems.includes(item.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
        
        <a 
          href="#" 
          className={buttonVariants({
            variant: "default",
            className: "mt-2 bg-pehnawa-blue hover:bg-pehnawa-blue/90"
          })}
        >
          View All {title.split(' ')[0]}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
      
      <div className={cn(
        "h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl relative",
        index % 2 === 1 ? "lg:col-start-1" : ""
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-pehnawa-blue/20 to-pehnawa-terracotta/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
    </div>
  );
};

export default CategorySection;
