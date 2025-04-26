"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronRight, Trash2, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  };

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      // Remove quantity if your cart context calculates it automatically
      // Or keep it if your context expects it
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Wishlist</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Items added to your wishlist will be saved here for you to revisit
              later.
            </p>
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {items.length} items in your wishlist
            </p>
            <Button
              variant="outline"
              onClick={() => {
                clearWishlist();
                toast({
                  title: "Wishlist cleared",
                  description:
                    "All items have been removed from your wishlist.",
                });
              }}
            >
              Clear Wishlist
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {items.map((item: WishlistItem) => (
              <motion.div
                key={item.id}
                className="border rounded-lg overflow-hidden bg-white"
                variants={itemVariant}
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <Link href={`/product/${item.id}`} className="block">
                    <h2 className="font-medium text-lg mb-1 hover:text-gray-600 transition-colors">
                      {item.name}
                    </h2>
                  </Link>
                  {item.category && (
                    <p className="text-gray-500 text-sm mb-2 capitalize">
                      {item.category}
                    </p>
                  )}
                  <p className="font-medium text-gray-900 mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/product/${item.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}