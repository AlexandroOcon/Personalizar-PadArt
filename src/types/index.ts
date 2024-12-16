export interface Product {
  id: string;
  name: string;
  category: 'keyboard' | 'mouse' | 'mousepad';
  basePrice: number;
  description: string;
  image: string;
  customizationOptions: CustomizationOption[];
}

export interface CustomizationOption {
  type: 'color' | 'size' | 'image' | 'switch' | 'processor' | 'keycaps';
  name: string;
  options: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }[];
}

export interface CustomizationValues {
  color?: string;
  image?: {
    url: string;
    position: { x: number; y: number };
  };
  [key: string]: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations: Record<string, any>;
  totalPrice: number;
}