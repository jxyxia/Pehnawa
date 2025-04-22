
import { Trash2 } from "lucide-react";

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  size: string;
  duration: string;
  image: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4 bg-white p-3 rounded-premium border border-pehnawa-blue/20 shadow-sm">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-pehnawa-blue/10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-pehnawa-blue">{item.name}</h3>
        <div className="text-sm text-pehnawa-green mt-1 space-y-1">
          <p>Size: {item.size}</p>
          <p>Duration: {item.duration}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium text-pehnawa-terracotta">₹{item.price}</p>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-pehnawa-blue hover:text-pehnawa-terracotta transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
