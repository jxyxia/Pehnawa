
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, Eye, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  priceString: string;
  image: string;
  isInCart: boolean;
  isInWishlist: boolean;
  onAddToCart: (id: string, name: string, image: string) => void;
  onToggleWishlist: (id: string, name: string, image: string) => void;
  onViewDetails: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  priceString,
  image,
  isInCart,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
}: ProductCardProps) => {
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const openZoomModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomModalOpen(true);
  };

  return (
    <Card className="border-pehnawa-green/20 overflow-hidden hover:shadow-md transition-shadow group">
      <CardContent className="p-0">
        <div className="aspect-w-1 aspect-h-1 w-full h-40 relative group cursor-pointer" onClick={openZoomModal}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="text-white h-8 w-8 drop-shadow-md" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{name}</span>
            <span className="text-pehnawa-terracotta font-bold">{priceString}</span>
          </div>
          
          <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddToCart(id, name, image)}
              className={cn(
                "h-8 text-xs",
                isInCart ? "bg-pehnawa-green/20 border-pehnawa-green" : ""
              )}
            >
              <ShoppingBag className="h-3 w-3 mr-1" /> 
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewDetails(id)}
                className="h-8 w-8 rounded-full"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleWishlist(id, name, image)}
                className={cn(
                  "h-8 w-8 rounded-full",
                  isInWishlist ? "text-red-500 bg-red-50" : ""
                )}
              >
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Zoom Modal */}
      <ImageZoomModal 
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        imageUrl={image}
        productName={name}
      />
    </Card>
  );
};

export default ProductCard;
