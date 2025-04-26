"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context"; // Import the language context

// First, let's modify the Product interface to handle string IDs
interface Product {
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

// Now update the products array to include the perfumery products
const products: Product[] = [
  // Keep existing products 1-4
  {
    id: 1,
    name: "Slim Fit Cotton Shirt",
    price: 49.99,
    category: "men",
    image: "/images/Slim-Fit.png",
    rating: 4.5,
    reviewCount: 124,
    description:
      "This premium cotton shirt features a modern slim fit design with a subtle texture. Made from 100% organic cotton, it's both comfortable and stylish for any occasion.",
    details: [
      "100% organic cotton",
      "Slim fit design",
      "Button-down collar",
      "Machine washable",
      "Imported",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
      { name: "Navy", value: "navy" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/Slim-Fit.png",
      "/images/Slim-Fit2.png",
      "/images/Slim-Fit4.png",
      "/images/Slim-Fit5.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Alex Johnson",
        rating: 5,
        date: "2 months ago",
        content:
          "Excellent quality and fit. The material feels premium and it's very comfortable to wear all day.",
      },
      {
        id: 2,
        author: "Sam Wilson",
        rating: 4,
        date: "1 month ago",
        content:
          "Great shirt, fits as expected. The only reason for 4 stars is that it wrinkles a bit more than I'd like.",
      },
      {
        id: 3,
        author: "Jamie Smith",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Perfect fit and very comfortable. I've already ordered another one in a different color.",
      },
    ],
  },
  {
    id: 2,
    name: "Relaxed Linen Dress",
    price: 79.99,
    category: "women",
    image: "/placeholder.svg?height=600&width=500",
    rating: 4.8,
    reviewCount: 86,
    description:
      "This elegant linen dress features a relaxed fit and breathable fabric, perfect for warm weather. The timeless design makes it versatile for both casual and semi-formal occasions.",
    details: [
      "100% linen",
      "Relaxed fit",
      "Side pockets",
      "Machine washable",
      "Imported",
    ],
    colors: [
      { name: "Beige", value: "beige" },
      { name: "Light Blue", value: "lightblue" },
      { name: "Sage", value: "sage" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Emily Parker",
        rating: 5,
        date: "1 month ago",
        content:
          "Beautiful dress! The linen is high quality and the fit is perfect. I've received many compliments.",
      },
      {
        id: 2,
        author: "Sophia Lee",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Love the style and comfort. The only downside is that it wrinkles easily, but that's expected with linen.",
      },
    ],
  },
  {
    id: 3,
    name: "Premium Leather Sneakers",
    price: 129.99,
    category: "shoes",
    image: "/placeholder.svg?height=600&width=500",
    rating: 4.7,
    reviewCount: 152,
    description:
      "These premium leather sneakers combine style and comfort with their minimalist design and cushioned insoles. Perfect for everyday wear, they pair well with both casual and smart-casual outfits.",
    details: [
      "Genuine leather upper",
      "Rubber outsole",
      "Cushioned insole",
      "Breathable lining",
      "Handcrafted",
    ],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Tan", value: "tan" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Michael Brown",
        rating: 5,
        date: "2 months ago",
        content:
          "These are the most comfortable sneakers I've ever owned. Great quality and they look even better in person.",
      },
      {
        id: 2,
        author: "David Chen",
        rating: 4,
        date: "1 month ago",
        content:
          "Very stylish and well-made. They took a few days to break in but now they're perfect.",
      },
    ],
  },
  {
    id: 4,
    name: "Minimalist Watch",
    price: 159.99,
    category: "accessories",
    image: "/placeholder.svg?height=600&width=500",
    rating: 4.9,
    reviewCount: 78,
    description:
      "This elegant minimalist watch features a clean dial design, premium stainless steel case, and genuine leather strap. Water-resistant and built to last, it's the perfect accessory for any occasion.",
    details: [
      "Stainless steel case",
      "Genuine leather strap",
      "Japanese quartz movement",
      "Water-resistant to 30m",
      "2-year warranty",
    ],
    colors: [
      { name: "Black/Silver", value: "black" },
      { name: "Brown/Gold", value: "brown" },
      { name: "Blue/Silver", value: "blue" },
    ],
    sizes: ["36mm", "40mm", "42mm"],
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Jennifer Adams",
        rating: 5,
        date: "3 months ago",
        content:
          "Beautiful watch! The minimalist design goes with everything and it keeps perfect time.",
      },
      {
        id: 2,
        author: "Robert Taylor",
        rating: 5,
        date: "1 month ago",
        content:
          "Excellent quality for the price. The leather strap is soft and comfortable, and the watch face is elegant.",
      },
    ],
  },
  // Add the perfumery products from the perfumery page
  {
    id: "perfume-1",
    name: "Aventus Creed",
    price: 99.99,
    image: "/images/perfumery/aventus-creed.jpg",
    category: "perfumery",
    rating: 4.8,
    reviewCount: 65,
    description:
      "A sophisticated fragrance with notes of bergamot, jasmine, and sandalwood.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Cruelty-free",
    ],
    colors: [{ name: "Gold", value: "gold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/aventus-creed.jpg",
      "/images/perfumery/aventus-creed.jpg",
      "/images/perfumery/aventus-creed.jpg",
      "/images/perfumery/aventus-creed.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Emma Davis",
        rating: 5,
        date: "1 month ago",
        content:
          "Amazing scent, lasts all day! I get compliments every time I wear it.",
      },
      {
        id: 2,
        author: "Thomas Wright",
        rating: 4,
        date: "2 weeks ago",
        content:
          "Sophisticated fragrance that's perfect for special occasions. A little goes a long way.",
      },
    ],
  },
  {
    id: "perfume-2",
    name: "Le Beau Paradise Garden Jean Paul",
    price: 85.99,
    image: "/images/perfumery/gaulter.jpg",
    category: "perfumery",
    rating: 4.6,
    reviewCount: 42,
    description:
      "A delicate floral fragrance with notes of rose, peony, and vanilla.",
    details: [
      "75ml bottle",
      "Medium-lasting scent",
      "Feminine fragrance",
      "Made in Italy",
      "Recyclable packaging",
    ],
    colors: [{ name: "Rose Gold", value: "rosegold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/gaulter.jpg",
      "/images/perfumery/gaulter.jpg",
      "/images/perfumery/gaulter.jpg",
      "/images/perfumery/gaulter.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Olivia Johnson",
        rating: 5,
        date: "3 weeks ago",
        content:
          "This perfume is absolutely beautiful! The floral notes are perfectly balanced.",
      },
      {
        id: 2,
        author: "Sophia Miller",
        rating: 4,
        date: "1 month ago",
        content:
          "Lovely scent that's perfect for spring and summer. Wish it lasted a bit longer though.",
      },
    ],
  },
  {
    id: "perfume-3",
    name: "Green Irish Tweed Greed",
    price: 75.99,
    image: "/images/perfumery/tweed-creed.jpg",
    category: "perfumery",
    rating: 4.5,
    reviewCount: 38,
    description:
      "A refreshing citrus fragrance with notes of lemon, bergamot, and cedar.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Masculine fragrance",
      "Made in Spain",
      "Travel-friendly",
    ],
    colors: [{ name: "Blue", value: "blue" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/tweed-creed.jpg",
      "/images/perfumery/tweed-creed.jpg",
      "/images/perfumery/tweed-creed.jpg",
      "/images/perfumery/tweed-creed.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "James Wilson",
        rating: 5,
        date: "2 months ago",
        content:
          "Perfect summer scent! Fresh and invigorating without being overwhelming.",
      },
      {
        id: 2,
        author: "Daniel Brown",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Great everyday cologne. The citrus notes are perfect for the office.",
      },
    ],
  },
  {
    id: "perfume-4",
    name: "Clementine California Atelier Cologne",
    price: 120.99,
    image: "/images/perfumery/Clementie-California.jpg",
    category: "perfumery",
    rating: 4.9,
    reviewCount: 56,
    description:
      "A rich, exotic fragrance with notes of amber, oud, and spices.",
    details: [
      "50ml bottle",
      "Very long-lasting",
      "Unisex fragrance",
      "Made in UAE",
      "Luxury packaging",
    ],
    colors: [{ name: "Black", value: "black" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Clementie-California.jpg",
      "/images/perfumery/Clementie-California.jpg",
      "/images/perfumery/Clementie-California.jpg",
      "/images/perfumery/Clementie-California.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Aisha Khan",
        rating: 5,
        date: "1 month ago",
        content:
          "This is the most luxurious perfume I've ever owned. The scent is intoxicating and lasts for days.",
      },
      {
        id: 2,
        author: "Mohammed Al-Farsi",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Exceptional quality and depth. This is a true masterpiece of perfumery.",
      },
    ],
  },
  {
    id: "perfume-5",
    name: "Blue Talisman Ex Nihilo",
    price: 65.99,
    image: "/images/perfumery/blue-talisman.jpg",
    category: "perfumery",
    rating: 4.3,
    reviewCount: 38,
    description:
      "A refreshing oceanic fragrance with notes of sea salt, citrus, and musk.",
    details: [
      "75ml bottle",
      "Medium-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Elegant bottle design",
    ],
    colors: [{ name: "Blue", value: "blue" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/blue-talisman.jpg",
      "/images/perfumery/blue-talisman.jpg",
      "/images/perfumery/blue-talisman.jpg",
      "/images/perfumery/blue-talisman.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 4,
        date: "1 month ago",
        content:
          "Fresh and clean scent, perfect for everyday wear. Not too overpowering.",
      },
      {
        id: 2,
        author: "Mark Williams",
        rating: 5,
        date: "2 weeks ago",
        content:
          "This has become my signature scent. I get compliments everywhere I go!",
      },
    ],
  },
  {
    id: "perfume-6",
    name: "Absolu Aventus Creed",
    price: 89.99,
    image: "/images/perfumery/absolu-aventus-creed.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 50,
    description:
      "A bold and refined fragrance with notes of blackcurrant, pineapple, and patchouli.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Premium ingredients",
    ],
    colors: [{ name: "Silver", value: "silver" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/absolu-aventus-creed.jpg",
      "/images/perfumery/absolu-aventus-creed.jpg",
      "/images/perfumery/absolu-aventus-creed.jpg",
      "/images/perfumery/absolu-aventus-creed.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Liam Carter",
        rating: 5,
        date: "1 month ago",
        content:
          "Incredible fragrance! The fruity notes are vibrant and long-lasting.",
      },
      {
        id: 2,
        author: "Sophie Green",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Very elegant scent, great for evening wear. Slightly strong at first but settles nicely.",
      },
    ],
  },
  {
    id: "perfume-7",
    name: "Layton Parfums de Marly",
    price: 79.99,
    image: "/images/perfumery/layton-parfums.jpg",
    category: "perfumery",
    rating: 4.4,
    reviewCount: 45,
    description:
      "A warm and spicy fragrance with notes of apple, lavender, and vanilla.",
    details: [
      "75ml bottle",
      "Medium-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Sophisticated packaging",
    ],
    colors: [{ name: "White Gold", value: "whitegold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/layton-parfums.jpg",
      "/images/perfumery/layton-parfums.jpg",
      "/images/perfumery/layton-parfums.jpg",
      "/images/perfumery/layton-parfums.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Ella Thompson",
        rating: 4,
        date: "2 months ago",
        content:
          "Lovely warm scent, perfect for cooler weather. The vanilla is divine.",
      },
      {
        id: 2,
        author: "Jacob Lee",
        rating: 5,
        date: "1 month ago",
        content:
          "A fantastic fragrance that feels luxurious and versatile for any occasion.",
      },
    ],
  },
  {
    id: "perfume-8",
    name: "Kirke Tizina Terenzi",
    price: 110.99,
    image: "/images/perfumery/Kirke-tiziana.jpg",
    category: "perfumery",
    rating: 4.8,
    reviewCount: 60,
    description:
      "A fruity and musky fragrance with notes of passion fruit, peach, and sandalwood.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in Italy",
      "Artisanal craftsmanship",
    ],
    colors: [{ name: "Purple", value: "purple" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Kirke-tiziana.jpg",
      "/images/perfumery/Kirke-tiziana.jpg",
      "/images/perfumery/Kirke-tiziana.jpg",
      "/images/perfumery/Kirke-tiziana.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Mia Roberts",
        rating: 5,
        date: "1 month ago",
        content:
          "Absolutely stunning! The fruity notes are so vibrant and unique.",
      },
      {
        id: 2,
        author: "Lucas Adams",
        rating: 4,
        date: "2 weeks ago",
        content:
          "A bold fragrance that stands out. Perfect for those who love something different.",
      },
    ],
  },
  {
    id: "perfume-9",
    name: "Silver Mountain Water Creed",
    price: 95.99,
    image: "/images/perfumery/Silver-mountain.jpg",
    category: "perfumery",
    rating: 4.6,
    reviewCount: 48,
    description:
      "A crisp and clean fragrance with notes of green tea, blackcurrant, and musk.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Elegant design",
    ],
    colors: [{ name: "Silver", value: "silver" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Silver-mountain.jpg",
      "/images/perfumery/Silver-mountain.jpg",
      "/images/perfumery/Silver-mountain.jpg",
      "/images/perfumery/Silver-mountain.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Charlotte Evans",
        rating: 5,
        date: "3 weeks ago",
        content:
          "So refreshing and light! Perfect for daytime wear in any season.",
      },
      {
        id: 2,
        author: "Henry Clark",
        rating: 4,
        date: "1 month ago",
        content: "Great scent, but I wish it lasted a bit longer on my skin.",
      },
    ],
  },
  {
    id: "perfume-10",
    name: "Tilia Marc-Antoine Barrois",
    price: 115.99,
    image: "/images/perfumery/Tilia-Marc-Antoine.jpg",
    category: "perfumery",
    rating: 4.9,
    reviewCount: 55,
    description:
      "A luxurious floral fragrance with notes of linden blossom, jasmine, and amber.",
    details: [
      "50ml bottle",
      "Very long-lasting",
      "Unisex fragrance",
      "Made in France",
      "Minimalist packaging",
    ],
    colors: [{ name: "Cream", value: "cream" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Tilia-Marc-Antoine.jpg",
      "/images/perfumery/Tilia-Marc-Antoine.jpg",
      "/images/perfumery/Tilia-Marc-Antoine.jpg",
      "/images/perfumery/Tilia-Marc-Antoine.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Isabella Wright",
        rating: 5,
        date: "2 weeks ago",
        content:
          "This is pure elegance in a bottle. The floral notes are divine.",
      },
      {
        id: 2,
        author: "Ethan Harris",
        rating: 5,
        date: "1 month ago",
        content:
          "A masterpiece! Long-lasting and sophisticated, worth every penny.",
      },
    ],
  },
  {
    id: "perfume-11",
    name: "Emporio Armani Stronger With You",
    price: 69.99,
    image: "/images/perfumery/Emporio-Armani.jpg",
    category: "perfumery",
    rating: 4.2,
    reviewCount: 40,
    description:
      "A warm and spicy fragrance with notes of cardamom, chestnut, and vanilla.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Masculine fragrance",
      "Made in Italy",
      "Modern design",
    ],
    colors: [{ name: "Bronze", value: "bronze" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Emporio-Armani.jpg",
      "/images/perfumery/Emporio-Armani.jpg",
      "/images/perfumery/Emporio-Armani.jpg",
      "/images/perfumery/Emporio-Armani.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Noah Walker",
        rating: 4,
        date: "1 month ago",
        content:
          "Nice everyday scent with a warm, inviting feel. Good for casual settings.",
      },
      {
        id: 2,
        author: "Ava King",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Love the spicy notes, but it fades a bit faster than expected.",
      },
    ],
  },
  {
    id: "perfume-12",
    name: "Versace Pour Homme Versace",
    price: 105.99,
    image: "/images/perfumery/Versace.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 52,
    description:
      "A fresh and vibrant fragrance with notes of bergamot, neroli, and cedarwood.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Masculine fragrance",
      "Made in Italy",
      "Luxury branding",
    ],
    colors: [{ name: "Gold", value: "gold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Versace.jpg",
      "/images/perfumery/Versace.jpg",
      "/images/perfumery/Versace.jpg",
      "/images/perfumery/Versace.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Mason Scott",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Classic and timeless. Perfect for any occasion, from work to nights out.",
      },
      {
        id: 2,
        author: "Lily Turner",
        rating: 4,
        date: "1 month ago",
        content: "Very fresh and clean, but I prefer something a bit sweeter.",
      },
    ],
  },
  {
    id: "perfume-13",
    name: "Eau de Lacoste L.12.12. White",
    price: 99.99,
    image: "/images/perfumery/Lacoste-Fragrances.jpg",
    category: "perfumery",
    rating: 4.8,
    reviewCount: 47,
    description:
      "A clean and sporty fragrance with notes of grapefruit, rosemary, and cedar.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Masculine fragrance",
      "Made in France",
      "Athletic vibe",
    ],
    colors: [{ name: "White", value: "white" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Lacoste-Fragrances.jpg",
      "/images/perfumery/Lacoste-Fragrances.jpg",
      "/images/perfumery/Lacoste-Fragrances.jpg",
      "/images/perfumery/Lacoste-Fragrances.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Logan Baker",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Perfect for active days! Fresh and energizing, lasts all day.",
      },
      {
        id: 2,
        author: "Chloe Hill",
        rating: 4,
        date: "1 month ago",
        content: "Great for casual wear, but not as complex as I’d hoped.",
      },
    ],
  },
  {
    id: "perfume-14",
    name: "Blue Seduction Antonio Banderas",
    price: 85.99,
    image: "/images/perfumery/Blue-seduction.jpg",
    category: "perfumery",
    rating: 4.6,
    reviewCount: 44,
    description:
      "A cool and aquatic fragrance with notes of melon, mint, and amber.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Masculine fragrance",
      "Made in Spain",
      "Affordable luxury",
    ],
    colors: [{ name: "Blue", value: "blue" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Blue-seduction.jpg",
      "/images/perfumery/Blue-seduction.jpg",
      "/images/perfumery/Blue-seduction.jpg",
      "/images/perfumery/Blue-seduction.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Elijah Moore",
        rating: 5,
        date: "2 weeks ago",
        content: "Fantastic value for money! Smells fresh and summery.",
      },
      {
        id: 2,
        author: "Grace Allen",
        rating: 4,
        date: "1 month ago",
        content: "Nice and light, but I’d love it to last a bit longer.",
      },
    ],
  },
  {
    id: "perfume-15",
    name: "Enigma Pour Homme Roja Dove",
    price: 75.99,
    image: "/images/perfumery/Enigma-Pour.jpg",
    category: "perfumery",
    rating: 4.5,
    reviewCount: 39,
    description:
      "A mysterious and spicy fragrance with notes of cognac, tobacco, and vanilla.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Masculine fragrance",
      "Made in UK",
      "Luxury craftsmanship",
    ],
    colors: [{ name: "Brown", value: "brown" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Enigma-Pour.jpg",
      "/images/perfumery/Enigma-Pour.jpg",
      "/images/perfumery/Enigma-Pour.jpg",
      "/images/perfumery/Enigma-Pour.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Oliver James",
        rating: 5,
        date: "1 month ago",
        content: "Rich and complex, perfect for evening wear. A true standout.",
      },
      {
        id: 2,
        author: "Amelia Young",
        rating: 4,
        date: "3 weeks ago",
        content: "Very unique scent, but a bit too strong for daily use.",
      },
    ],
  },
  {
    id: "perfume-16",
    name: "Montabaco Intensivo Ormonde Jayne",
    price: 120.99,
    image: "/images/perfumery/Montabaco-Intensivo.jpg",
    category: "perfumery",
    rating: 4.9,
    reviewCount: 58,
    description:
      "A smoky and woody fragrance with notes of tobacco, leather, and suede.",
    details: [
      "50ml bottle",
      "Very long-lasting",
      "Unisex fragrance",
      "Made in UK",
      "Niche perfumery",
    ],
    colors: [{ name: "Dark Brown", value: "darkbrown" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Montabaco-Intensivo.jpg",
      "/images/perfumery/Montabaco-Intensivo.jpg",
      "/images/perfumery/Montabaco-Intensivo.jpg",
      "/images/perfumery/Montabaco-Intensivo.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Harper Lewis",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Incredibly rich and luxurious. A must-have for niche fragrance lovers.",
      },
      {
        id: 2,
        author: "William Hall",
        rating: 5,
        date: "1 month ago",
        content:
          "The tobacco and leather notes are perfection. Long-lasting and bold.",
      },
    ],
  },
  {
    id: "perfume-17",
    name: "Gumin Tiziana Terenzi",
    price: 65.99,
    image: "/images/perfumery/Gumin-tiziana.jpg",
    category: "perfumery",
    rating: 4.3,
    reviewCount: 36,
    description:
      "A sweet and fruity fragrance with notes of mandarin, pineapple, and musk.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Unisex fragrance",
      "Made in Italy",
      "Vibrant packaging",
    ],
    colors: [{ name: "Orange", value: "orange" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Gumin-tiziana.jpg",
      "/images/perfumery/Gumin-tiziana.jpg",
      "/images/perfumery/Gumin-tiziana.jpg",
      "/images/perfumery/Gumin-tiziana.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Scarlett Ward",
        rating: 4,
        date: "1 month ago",
        content: "Fun and fruity, great for summer days. Not too heavy.",
      },
      {
        id: 2,
        author: "Jack Morris",
        rating: 4,
        date: "2 weeks ago",
        content: "Nice scent, but I prefer something with more depth.",
      },
    ],
  },
  {
    id: "perfume-18",
    name: "Molecule 02 Escentric Molecules",
    price: 89.99,
    image: "/images/perfumery/Molecule-02.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 49,
    description:
      "A minimalist and unique fragrance with a single note of ambroxan.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in Germany",
      "Modern simplicity",
    ],
    colors: [{ name: "Clear", value: "clear" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Molecule-02.jpg",
      "/images/perfumery/Molecule-02.jpg",
      "/images/perfumery/Molecule-02.jpg",
      "/images/perfumery/Molecule-02.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Luna Phillips",
        rating: 5,
        date: "3 weeks ago",
        content:
          "So unique! It smells different on everyone, and I love it on me.",
      },
      {
        id: 2,
        author: "Owen Reed",
        rating: 4,
        date: "1 month ago",
        content:
          "Subtle but intriguing. Great for those who like minimalist scents.",
      },
    ],
  },
  {
    id: "perfume-19",
    name: "Ganymede Marc-Antoine Barrois",
    price: 79.99,
    image: "/images/perfumery/Ganymede.jpg",
    category: "perfumery",
    rating: 4.4,
    reviewCount: 41,
    description:
      "A futuristic and mineral fragrance with notes of mandarin, saffron, and suede.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Avant-garde design",
    ],
    colors: [{ name: "Grey", value: "grey" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Ganymede.jpg",
      "/images/perfumery/Ganymede.jpg",
      "/images/perfumery/Ganymede.jpg",
      "/images/perfumery/Ganymede.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Aria Brooks",
        rating: 4,
        date: "2 weeks ago",
        content:
          "Very modern and unique. Takes some getting used to but I love it now.",
      },
      {
        id: 2,
        author: "Eli Hayes",
        rating: 5,
        date: "1 month ago",
        content: "A standout fragrance that feels like nothing else out there.",
      },
    ],
  },
  {
    id: "perfume-20",
    name: "Megamare Orto Parisi",
    price: 110.99,
    image: "/images/perfumery/Megamare-Orto.jpg",
    category: "perfumery",
    rating: 4.8,
    reviewCount: 53,
    description:
      "A powerful oceanic fragrance with notes of seaweed, ambergris, and musk.",
    details: [
      "50ml bottle",
      "Very long-lasting",
      "Unisex fragrance",
      "Made in Italy",
      "Bold packaging",
    ],
    colors: [{ name: "Navy", value: "navy" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Megamare-Orto.jpg",
      "/images/perfumery/Megamare-Orto.jpg",
      "/images/perfumery/Megamare-Orto.jpg",
      "/images/perfumery/Megamare-Orto.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Zoe Parker",
        rating: 5,
        date: "1 month ago",
        content: "Like the ocean in a bottle! Incredibly strong and unique.",
      },
      {
        id: 2,
        author: "Finn Campbell",
        rating: 4,
        date: "2 weeks ago",
        content: "Love the concept, but it’s a bit intense for everyday wear.",
      },
    ],
  },
  {
    id: "perfume-21",
    name: "My Way Giorgio Armani",
    price: 95.99,
    image: "/images/perfumery/my-way-giorgio.jpg",
    category: "perfumery",
    rating: 4.6,
    reviewCount: 46,
    description:
      "A floral and powdery fragrance with notes of orange blossom, tuberose, and vanilla.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in Italy",
      "Sustainable packaging",
    ],
    colors: [{ name: "Pink", value: "pink" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/my-way-giorgio.jpg",
      "/images/perfumery/my-way-giorgio.jpg",
      "/images/perfumery/my-way-giorgio.jpg",
      "/images/perfumery/my-way-giorgio.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Mila Foster",
        rating: 5,
        date: "3 weeks ago",
        content: "So feminine and elegant! Perfect for romantic occasions.",
      },
      {
        id: 2,
        author: "Leo Bennett",
        rating: 4,
        date: "1 month ago",
        content:
          "Bought this for my wife, and she loves it. Very soft and pleasant.",
      },
    ],
  },
  {
    id: "perfume-22",
    name: "Miss Dior Blooming Bouquet Dior",
    price: 115.99,
    image: "/images/perfumery/Miss-Dior.jpg",
    category: "perfumery",
    rating: 4.9,
    reviewCount: 57,
    description:
      "A delicate and romantic fragrance with notes of peony, rose, and apricot.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in France",
      "Iconic design",
    ],
    colors: [{ name: "Light Pink", value: "lightpink" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Miss-Dior.jpg",
      "/images/perfumery/Miss-Dior.jpg",
      "/images/perfumery/Miss-Dior.jpg",
      "/images/perfumery/Miss-Dior.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Emma Stone",
        rating: 5,
        date: "2 weeks ago",
        content:
          "My favorite Dior scent! So fresh and feminine, perfect for spring.",
      },
      {
        id: 2,
        author: "Ryan Carter",
        rating: 5,
        date: "1 month ago",
        content: "Got this for my girlfriend, and it’s her go-to perfume now.",
      },
    ],
  },
  {
    id: "perfume-23",
    name: "L'Imperatrice Limited Edition",
    price: 69.99,
    image: "/images/perfumery/dolce-gabbana.jpg",
    category: "perfumery",
    rating: 4.2,
    reviewCount: 37,
    description:
      "A vibrant and fruity fragrance with notes of kiwi, watermelon, and cyclamen.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Feminine fragrance",
      "Made in Italy",
      "Playful packaging",
    ],
    colors: [{ name: "Red", value: "red" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/dolce-gabbana.jpg",
      "/images/perfumery/dolce-gabbana.jpg",
      "/images/perfumery/dolce-gabbana.jpg",
      "/images/perfumery/dolce-gabbana.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Sophie Bell",
        rating: 4,
        date: "1 month ago",
        content: "Fun and fruity, great for casual days. Not too overpowering.",
      },
      {
        id: 2,
        author: "Max Hughes",
        rating: 4,
        date: "3 weeks ago",
        content: "Nice scent, but it doesn’t last as long as I’d like.",
      },
    ],
  },
  {
    id: "perfume-24",
    name: "Ocean Lounge Escada",
    price: 105.99,
    image: "/images/perfumery/Ocean-Lounge-Escada.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 50,
    description:
      "A tropical and fruity fragrance with notes of mango, passion fruit, and hibiscus.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in Germany",
      "Summer vibe",
    ],
    colors: [{ name: "Turquoise", value: "turquoise" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Ocean-Lounge-Escada.jpg",
      "/images/perfumery/Ocean-Lounge-Escada.jpg",
      "/images/perfumery/Ocean-Lounge-Escada.jpg",
      "/images/perfumery/Ocean-Lounge-Escada.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Avery Gray",
        rating: 5,
        date: "2 weeks ago",
        content: "Feels like a tropical vacation! Bright and uplifting scent.",
      },
      {
        id: 2,
        author: "Caleb Ross",
        rating: 4,
        date: "1 month ago",
        content: "Really nice for summer, but a bit too sweet for my taste.",
      },
    ],
  },
  {
    id: "perfume-25",
    name: "Lost Cherry Tom Ford",
    price: 69.99,
    image: "/images/perfumery/Lost-Cherry.jpg",
    category: "perfumery",
    rating: 4.2,
    reviewCount: 35,
    description:
      "A sweet and gourmand fragrance with notes of cherry, almond, and tonka bean.",
    details: [
      "50ml bottle",
      "Medium-lasting scent",
      "Unisex fragrance",
      "Made in USA",
      "Luxury bottle",
    ],
    colors: [{ name: "Cherry Red", value: "cherryred" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Lost-Cherry.jpg",
      "/images/perfumery/Lost-Cherry.jpg",
      "/images/perfumery/Lost-Cherry.jpg",
      "/images/perfumery/Lost-Cherry.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Ruby Fox",
        rating: 4,
        date: "3 weeks ago",
        content: "Smells like a cherry dessert! Sweet but not overwhelming.",
      },
      {
        id: 2,
        author: "Jude Perry",
        rating: 4,
        date: "1 month ago",
        content: "Nice scent, but I expected it to be a bit more complex.",
      },
    ],
  },
  {
    id: "perfume-26",
    name: "Chance Eau Tendre Eau de Parfum",
    price: 105.99,
    image: "/images/perfumery/Change-Eau.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 51,
    description:
      "A soft and fruity fragrance with notes of grapefruit, jasmine, and white musk.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in France",
      "Timeless elegance",
    ],
    colors: [{ name: "Soft Pink", value: "softpink" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Change-Eau.jpg",
      "/images/perfumery/Change-Eau.jpg",
      "/images/perfumery/Change-Eau.jpg",
      "/images/perfumery/Change-Eau.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Violet Hayes",
        rating: 5,
        date: "2 weeks ago",
        content: "So delicate and lovely! Perfect for everyday elegance.",
      },
      {
        id: 2,
        author: "Asher Cole",
        rating: 4,
        date: "1 month ago",
        content: "Great feminine scent, but a bit too soft for my preference.",
      },
    ],
  },
  {
    id: "perfume-27",
    name: "Bombshell Victoria's Secret",
    price: 99.99,
    image: "/images/perfumery/Bombshell-Victoria.jpg",
    category: "perfumery",
    rating: 4.8,
    reviewCount: 54,
    description:
      "A glamorous and floral fragrance with notes of peony, vanilla orchid, and grapefruit.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in USA",
      "Bold packaging",
    ],
    colors: [{ name: "Gold", value: "gold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Bombshell-Victoria.jpg",
      "/images/perfumery/Bombshell-Victoria.jpg",
      "/images/perfumery/Bombshell-Victoria.jpg",
      "/images/perfumery/Bombshell-Victoria.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Sienna Price",
        rating: 5,
        date: "3 weeks ago",
        content: "My go-to scent! It’s flirty, fun, and lasts all day.",
      },
      {
        id: 2,
        author: "Micah Stone",
        rating: 4,
        date: "1 month ago",
        content: "Really nice, but a bit too floral for my taste.",
      },
    ],
  },
  {
    id: "perfume-28",
    name: "Libre Intense Yves Sain Laurent",
    price: 85.99,
    image: "/images/perfumery/Libre-Intense.jpg",
    category: "perfumery",
    rating: 4.6,
    reviewCount: 48,
    description:
      "A bold and sensual fragrance with notes of lavender, orange blossom, and vanilla.",
    details: [
      "50ml bottle",
      "Long-lasting scent",
      "Feminine fragrance",
      "Made in France",
      "Luxury design",
    ],
    colors: [{ name: "Gold", value: "gold" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Libre-Intense.jpg",
      "/images/perfumery/Libre-Intense.jpg",
      "/images/perfumery/Libre-Intense.jpg",
      "/images/perfumery/Libre-Intense.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Lila Brooks",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Absolutely stunning! The vanilla and lavender combo is perfection.",
      },
      {
        id: 2,
        author: "Ezra Lane",
        rating: 4,
        date: "1 month ago",
        content:
          "Great scent, but I prefer something a bit lighter for daytime.",
      },
    ],
  },
  {
    id: "perfume-29",
    name: "Cherry in the Air Escada",
    price: 75.99,
    image: "/images/perfumery/Cherry-in-Air.jpg",
    category: "perfumery",
    rating: 4.5,
    reviewCount: 42,
    description:
      "A playful and sweet fragrance with notes of cherry, raspberry, and marshmallow.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Feminine fragrance",
      "Made in Germany",
      "Youthful vibe",
    ],
    colors: [{ name: "Pink", value: "pink" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Cherry-in-Air.jpg",
      "/images/perfumery/Cherry-in-Air.jpg",
      "/images/perfumery/Cherry-in-Air.jpg",
      "/images/perfumery/Cherry-in-Air.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Freya Dunn",
        rating: 5,
        date: "3 weeks ago",
        content: "So fun and sweet! Makes me feel like I’m in a candy shop.",
      },
      {
        id: 2,
        author: "Theo Fox",
        rating: 4,
        date: "1 month ago",
        content:
          "Nice for casual days, but a bit too sweet for formal settings.",
      },
    ],
  },
  {
    id: "perfume-30",
    name: "Gucci Guilty Pour Homme Parfum",
    price: 120.99,
    image: "/images/perfumery/Gucci-guilty.jpg",
    category: "perfumery",
    rating: 4.9,
    reviewCount: 59,
    description:
      "A bold and woody fragrance with notes of rose, chili pepper, and cedarwood.",
    details: [
      "50ml bottle",
      "Very long-lasting",
      "Masculine fragrance",
      "Made in Italy",
      "Luxury branding",
    ],
    colors: [{ name: "Black", value: "black" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Gucci-guilty.jpg",
      "/images/perfumery/Gucci-guilty.jpg",
      "/images/perfumery/Gucci-guilty.jpg",
      "/images/perfumery/Gucci-guilty.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Jasper Cole",
        rating: 5,
        date: "2 weeks ago",
        content: "Incredibly bold and masculine. Perfect for confident men.",
      },
      {
        id: 2,
        author: "Nora Wade",
        rating: 5,
        date: "1 month ago",
        content: "Bought this for my husband, and it’s his new favorite!",
      },
    ],
  },
  {
    id: "perfume-31",
    name: "Accento Sospiro Perfumes",
    price: 65.99,
    image: "/images/perfumery/Accento-Sospiro.jpg",
    category: "perfumery",
    rating: 4.3,
    reviewCount: 38,
    description:
      "A bright and floral fragrance with notes of pineapple, hyacinth, and musk.",
    details: [
      "100ml bottle",
      "Medium-lasting scent",
      "Unisex fragrance",
      "Made in Italy",
      "Elegant bottle",
    ],
    colors: [{ name: "White", value: "white" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Accento-Sospiro.jpg",
      "/images/perfumery/Accento-Sospiro.jpg",
      "/images/perfumery/Accento-Sospiro.jpg",
      "/images/perfumery/Accento-Sospiro.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Ivy Grant",
        rating: 4,
        date: "3 weeks ago",
        content: "Fresh and floral, great for spring. Not too heavy.",
      },
      {
        id: 2,
        author: "Silas Hart",
        rating: 4,
        date: "1 month ago",
        content: "Nice scent, but I prefer something with more intensity.",
      },
    ],
  },
  {
    id: "perfume-32",
    name: "Red Tobacco Mancera",
    price: 89.99,
    image: "/images/perfumery/Red-Tobacco.jpg",
    category: "perfumery",
    rating: 4.7,
    reviewCount: 50,
    description:
      "A warm and spicy fragrance with notes of tobacco, cinnamon, and oud.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Unisex fragrance",
      "Made in France",
      "Bold character",
    ],
    colors: [{ name: "Red", value: "red" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Red-Tobacco.jpg",
      "/images/perfumery/Red-Tobacco.jpg",
      "/images/perfumery/Red-Tobacco.jpg",
      "/images/perfumery/Red-Tobacco.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Esme Ford",
        rating: 5,
        date: "2 weeks ago",
        content: "Rich and smoky, perfect for winter evenings. Love it!",
      },
      {
        id: 2,
        author: "Rory Blake",
        rating: 4,
        date: "1 month ago",
        content: "Great scent, but it’s a bit too intense for daily wear.",
      },
    ],
  },
  {
    id: "perfume-33",
    name: "Boss Bottled Hugo Boss",
    price: 79.99,
    image: "/images/perfumery/Boss-Bottled.jpg",
    category: "perfumery",
    rating: 4.4,
    reviewCount: 43,
    description:
      "A classic and versatile fragrance with notes of apple, cinnamon, and sandalwood.",
    details: [
      "100ml bottle",
      "Long-lasting scent",
      "Masculine fragrance",
      "Made in Germany",
      "Timeless appeal",
    ],
    colors: [{ name: "Silver", value: "silver" }],
    sizes: ["3ml", "5ml", "10ml", "30ml", "50ml", "100ml"],
    images: [
      "/images/perfumery/Boss-Bottled.jpg",
      "/images/perfumery/Boss-Bottled.jpg",
      "/images/perfumery/Boss-Bottled.jpg",
      "/images/perfumery/Boss-Bottled.jpg",
    ],
    reviews: [
      {
        id: 1,
        author: "Felix Dunn",
        rating: 5,
        date: "3 weeks ago",
        content: "A true classic! Perfect for work and casual settings alike.",
      },
      {
        id: 2,
        author: "Clara Wells",
        rating: 4,
        date: "1 month ago",
        content: "Very nice and clean, but I prefer something a bit bolder.",
      },
    ],
  },
];

// Update the ProductPage component to handle string IDs
export default function ProductPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const productId = params.id;

  // Find product by ID (handling both string and number IDs)
  const product =
    products.find((p) => p.id.toString() === productId.toString()) ||
    products[0];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.value || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { toast } = useToast();
  const { t, language } = useLanguage(); // Use the language context

  // Force re-render when language changes
  const [, forceUpdate] = useState({});
  useEffect(() => {
    console.log("ProductPage: Language changed to", language);
    forceUpdate({});
  }, [language]);


  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: t["product.pleaseSelectSize"] || "Please select a size",
        description:
          t["product.selectSizeMessage"] ||
          "You must select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addItem(
      {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );

    toast({
      title: t["product.addedToCart"] || "Added to cart",
      description: `${product.name} (${selectedSize}) ${
        t["product.hasBeenAddedToCart"] || "has been added to your cart"
      }`,
    });
  };
  const handleCheckout = () => {
    if (!selectedSize) {
      toast({
        title: t["product.pleaseSelectSize"] || "Please select a size",
        description:
          t["product.selectSizeMessage"] ||
          "You must select a size before checkout",
        variant: "destructive",
      });
      return;
    }
  };
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
      toast({
        title: t["product.removedFromWishlist"] || "Removed from wishlist",
        description: `${product.name} ${
          t["product.hasBeenRemovedFromWishlist"] ||
          "has been removed from your wishlist"
        }`,
      });
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
      toast({
        title: t["product.addedToWishlist"] || "Added to wishlist",
        description: `${product.name} ${
          t["product.hasBeenAddedToWishlist"] ||
          "has been added to your wishlist"
        }`,
      });
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <main className="">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              {t["product.home"] || "Home"}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href={`/category/${product.category}`}
              className="hover:text-gray-700"
            >
              {t[product.category] ||
                product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mainImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={product.images[mainImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-md ${
                      mainImage === index
                        ? "ring-2 ring-gray-900"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} ({product.reviewCount}{" "}
                    {t["product.reviews"] || "reviews"})
                  </span>
                </div>

                <p className="mt-6 text-2xl font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>

                <div className="mt-8">
                  <h2 className="text-sm font-medium text-gray-900">
                    {t["product.color"] || "Color"}
                  </h2>
                  <div className="mt-2 flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`relative h-8 w-8 rounded-full ${
                          selectedColor === color.value
                            ? "ring-2 ring-gray-900 ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={`Color: ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">
                      {t["product.size"] || "Size"}
                    </h2>
                    <Link
                      href="/size-guide"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      {t["product.sizeGuide"] || "Size Guide"}
                    </Link>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="mt-2 grid grid-cols-6 gap-2"
                  >
                    {product.sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 peer-data-[state=checked]:border-gray-900 peer-data-[state=checked]:bg-gray-900 peer-data-[state=checked]:text-white hover:bg-gray-50 peer-data-[state=checked]:hover:bg-gray-800"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mt-8">
                  <h2 className="text-sm font-medium text-gray-900">
                    {t["product.quantity"] || "Quantity"}
                  </h2>
                  <div className="mt-2 flex items-center space-x-3">
                    <button
                      onClick={decrementQuantity}
                      className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {t["product.addToCart"] || "Add to Cart"}
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white hover:bg-primary-dark"
                  >
                    {t["product.buyNow"] || "Buy Now"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWishlistToggle}
                    className="flex items-center justify-center gap-2"
                  >
                    {isInWishlist(product.id.toString()) ? (
                      <>
                        <Heart className="h-5 w-5 fill-current" />{" "}
                        {t["product.removeFromWishlist"] ||
                          "Remove from Wishlist"}
                      </>
                    ) : (
                      <>
                        <Heart className="h-5 w-5" />{" "}
                        {t["product.addToWishlist"] || "Add to Wishlist"}
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    {t["product.freeShipping"] || "Free shipping over $100"}
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    {t["product.freeReturns"] || "Free 30-day returns"}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Product Details Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger className="text-sm font-medium text-gray-900">
                      {t["product.description"] || "Description"}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="details">
                    <AccordionTrigger className="text-sm font-medium text-gray-900">
                      {t["product.details"] || "Details"}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping">
                    <AccordionTrigger className="text-sm font-medium text-gray-900">
                      {t["product.shippingReturns"] || "Shipping & Returns"}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      <p className="mb-2">
                        {t["product.shippingInfo1"] ||
                          "Free standard shipping on orders over $100."}
                      </p>
                      <p className="mb-2">
                        {t["product.shippingInfo2"] ||
                          "Express shipping available at checkout."}
                      </p>
                      <p>
                        {t["product.returnsInfo"] ||
                          "Returns accepted within 30 days of delivery. Items must be unworn with original tags attached."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container mx-auto px-4 py-8 border-t">
          <h2 className="text-2xl font-bold mb-6">
            {t["product.customerReviews"] || "Customer Reviews"}
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-medium">
                    {product.rating} {t["product.outOf5"] || "out of 5"}
                  </span>
                </div>
                <p className="text-gray-600">
                  {product.reviewCount}{" "}
                  {t["product.customerRatings"] || "customer ratings"}
                </p>

                <div className="mt-6">
                  <div className="flex items-center mb-2">
                    <span className="w-12 text-sm text-gray-600">
                      5 {t["product.star"] || "star"}
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600">70%</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-12 text-sm text-gray-600">
                      4 {t["product.star"] || "star"}
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600">20%</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-12 text-sm text-gray-600">
                      3 {t["product.star"] || "star"}
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600">5%</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-12 text-sm text-gray-600">
                      2 {t["product.star"] || "star"}
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: "3%" }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600">3%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-12 text-sm text-gray-600">
                      1 {t["product.star"] || "star"}
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: "2%" }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600">2%</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white">
                  {t["product.writeReview"] || "Write a Review"}
                </Button>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="border-b pb-6"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{review.author}</h3>
                      <span className="text-gray-500 text-sm">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </motion.div>
                ))}
              </div>

              {product.reviews.length > 3 && (
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    {t["product.loadMore"] || "Load More Reviews"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="container mx-auto px-4 py-12 border-t">
          <h2 className="text-2xl font-bold mb-8">
            {t["product.relatedProducts"] || "Related Products"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: relatedProducts.indexOf(relatedProduct) * 0.1,
                }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={{
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.price,
                    image: relatedProduct.image,
                    category: relatedProduct.category,
                    rating: relatedProduct.rating,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
