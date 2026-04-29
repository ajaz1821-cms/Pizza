export enum ItemCategory {
  VEG = 'veg',
  NON_VEG = 'non-veg',
  GLUTEN_FREE = 'gluten-free'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
  image: string;
  isSpecial?: boolean;
}

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out-for-delivery',
  DELIVERED = 'delivered'
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: any; // Firestore Timestamp
  deliveryLocation?: {
    address: string;
    lat: number;
    lng: number;
  };
}

export interface Review {
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}
