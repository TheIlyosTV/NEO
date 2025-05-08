export interface Product {
    id: string | number;
    name: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    reviewCount: number;
    description: string;
    details: string[];
    colors: { name: string; value: string }[];
    sizes: string[];
    images: string[];
    reviews: {
      id: number;
      author: string;
      rating: number;
      date: string;
      content: string;
    }[];
  }