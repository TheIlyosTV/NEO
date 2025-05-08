import { NextResponse } from "next/server";
import type { Product } from "@/data/products"; // Interfeysni import qilish

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  // Mahsulotlarni to'g'ridan-to'g'ri shu yerda e'lon qilish
  const products: Product[] = [
    {
      id: 1,
      name: "Leather Loafers",
      price: 129.99,
      category: "shoes",
      image: "/placeholder.svg",
      rating: 4.5,
      reviewCount: 142,
      description: "Classic penny loafers...",
      details: [],
      colors: [],
      sizes: [],
      images: [],
      reviews: []
    },
    // Boshqa mahsulotlar...
  ];

  const results = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query) ||
    (product.description && product.description.toLowerCase().includes(query)) ||
    product.category.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
}