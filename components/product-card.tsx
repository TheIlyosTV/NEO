"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { toast } = useToast();

  const isWishlisted = isInWishlist(product.id.toString());

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id.toString());
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  // Safe rating display logic
  const renderRating = () => {
    if (!product.rating) return null;

    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center mt-1">
        <div className="flex">
          {/* Full stars */}
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <Star key="half" className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-50" />
          )}
          {/* Empty stars */}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
        <span className="ml-1 text-xs text-gray-500">{product.rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />

        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm z-10 transition-transform hover:scale-110"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600")}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full bg-white text-gray-900 hover:bg-gray-100 group-hover:animate-fadeIn"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block group-hover:text-gray-900">
          <h3 className="font-medium text-gray-900 transition-colors">{product.name}</h3>
        </Link>

        {renderRating()}

        <p className="mt-1 font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}