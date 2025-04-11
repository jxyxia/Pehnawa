
export interface CartItemType {
  id: string;
  name: string;
  price: number;
  size: string;
  duration: string;
  image: string;
  quantity: number;
}

export interface WishlistItemType {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CategoriesProps {
  initialFilter?: string | null;
  searchTerm?: string | null;
}
