
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
    <div className="flex gap-4 bg-white/50 p-3 rounded-premium border border-gray-100">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <div className="text-sm text-gray-500 mt-1">
          <p>Size: {item.size}</p>
          <p>Duration: {item.duration}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">₹{item.price}</p>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
