export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
}
