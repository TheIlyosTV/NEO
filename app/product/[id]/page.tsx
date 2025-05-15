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

// Now update the products array to include the perfumery products
const products: Product[] = [
  // Mens
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
    id: "men-1",
    name: "Classic Oxford Shirt",
    price: 59.99,
    category: "men",
    image: "/images/men/Classic-Oxford-Shirt.png",
    rating: 4.5,
    reviewCount: 87,
    description:
      "A timeless Oxford shirt made from premium cotton with a button-down collar, perfect for both casual and business casual occasions.",
    details: [
      "100% premium cotton",
      "Button-down collar",
      "Regular fit",
      "Machine washable",
      "Made in USA",
    ],
    colors: [
      { name: "Light Blue", value: "lightblue" },
      { name: "White", value: "white" },
      { name: "Pale Pink", value: "pink" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Classic-Oxford-Shirt.png",
      "/images/men/Classic-Oxford-Shirt.png",
      "/images/men/Classic-Oxford-Shirt.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Michael Brown",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Perfect fit and excellent quality. The fabric is soft yet durable.",
      },
      {
        id: 2,
        author: "David Wilson",
        rating: 4,
        date: "1 month ago",
        content:
          "Great shirt, but runs slightly large. Would recommend sizing down.",
      },
    ],
  },
  {
    id: "men-2",
    name: "Slim Fit Chinos",
    price: 49.99,
    category: "men",
    image: "/images/men/Slim-Fit-Chinos.png",
    rating: 4.3,
    reviewCount: 112,
    description:
      "Modern slim-fit chinos with stretch technology for comfort and mobility, suitable for both office and casual wear.",
    details: [
      "98% cotton, 2% elastane",
      "Slim fit through thigh and leg",
      "Button and zip fly",
      "Machine wash cold",
      "Two rear pockets",
    ],
    colors: [
      { name: "Khaki", value: "khaki" },
      { name: "Navy", value: "navy" },
      { name: "Charcoal", value: "charcoal" },
    ],
    sizes: ["28x30", "30x30", "32x30", "34x30", "36x30"],
    images: [
      "/images/men/Slim-Fit-Chinos.png",
      "/images/men/Slim-Fit-Chinos.png",
      "/images/men/Slim-Fit-Chinos.png",
    ],
    reviews: [
      {
        id: 1,
        author: "James Taylor",
        rating: 5,
        date: "2 months ago",
        content:
          "Extremely comfortable and the perfect slim fit. I own three pairs now.",
      },
      {
        id: 2,
        author: "Robert Johnson",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Great pants, but the color fades slightly after several washes.",
      },
    ],
  },
  {
    id: "men-3",
    name: "Wool Blend Blazer",
    price: 129.99,
    category: "men",
    image: "/images/men/Wool-Blend-Blazer.png",
    rating: 4.7,
    reviewCount: 45,
    description:
      "A versatile wool blend blazer that transitions seamlessly from office to evening occasions with its modern tailored fit.",
    details: [
      "70% wool, 30% polyester",
      "Notched lapel",
      "Two-button closure",
      "Two front flap pockets",
      "Dry clean only",
    ],
    colors: [
      { name: "Navy", value: "navy" },
      { name: "Charcoal", value: "charcoal" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Wool-Blend-Blazer.png",
      "/images/men/Wool-Blend-Blazer.png",
      "/images/men/Wool-Blend-Blazer.png",
    ],
    reviews: [
      {
        id: 3,
        author: "William Davis",
        rating: 5,
        date: "1 month ago",
        content:
          "Excellent quality for the price. Fits perfectly off the rack.",
      },
      {
        id: 4,
        author: "Thomas Miller",
        rating: 4,
        date: "2 months ago",
        content: "Great blazer, but the sleeves needed slight tailoring.",
      },
    ],
  },
  {
    id: "men-4",
    name: "Crew Neck T-Shirt",
    price: 24.99,
    category: "men",
    image: "/images/men/Crew-Neck-T-Shirt.png",
    rating: 4.2,
    reviewCount: 203,
    description:
      "Essential crew neck t-shirt made from soft, breathable cotton with a comfortable regular fit for everyday wear.",
    details: [
      "100% combed cotton",
      "Regular fit",
      "Crew neckline",
      "Machine washable",
      "Reinforced shoulder seams",
    ],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Heather Gray", value: "gray" },
      { name: "Navy", value: "navy" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Crew-Neck-T-Shirt.png",
      "/images/men/Crew-Neck-T-Shirt.png",
    ],
    reviews: [
      {
        id: 5,
        author: "Christopher Wilson",
        rating: 5,
        date: "1 week ago",
        content:
          "Perfect basic tee. Soft fabric and holds its shape well after washing.",
      },
      {
        id: 6,
        author: "Daniel Moore",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Great quality but runs slightly small. Size up if between sizes.",
      },
    ],
  },
  {
    id: "men-5",
    name: "Denim Jeans",
    price: 69.99,
    category: "men",
    image: "/images/men/Denim-Jeans.png",
    rating: 4.6,
    reviewCount: 156,
    description:
      "Classic straight fit denim jeans with a mid-rise waist and comfortable stretch for all-day wear.",
    details: [
      "98% cotton, 2% elastane",
      "Straight leg fit",
      "Zip fly with button closure",
      "Five-pocket styling",
      "Machine wash cold",
    ],
    colors: [
      { name: "Dark Wash", value: "darkwash" },
      { name: "Medium Wash", value: "mediumwash" },
      { name: "Black", value: "black" },
    ],
    sizes: ["28x30", "30x30", "32x30", "34x30", "36x30", "38x30"],
    images: [
      "/images/men/Denim-Jeans.png",
      "/images/men/Denim-Jeans.png",
      "/images/men/Denim-Jeans.png",
    ],
    reviews: [
      {
        id: 7,
        author: "Matthew Taylor",
        rating: 5,
        date: "2 months ago",
        content: "Best jeans I've owned. Perfect fit and comfortable all day.",
      },
      {
        id: 8,
        author: "Andrew Anderson",
        rating: 4,
        date: "1 month ago",
        content: "Great quality denim, but the color bleeds slightly at first.",
      },
    ],
  },
  {
    id: "men-6",
    name: "Merino Wool Sweater",
    price: 89.99,
    category: "men",
    image: "/images/men/Merino-Wool-Sweater.png",
    rating: 4.8,
    reviewCount: 78,
    description:
      "Luxurious merino wool sweater with a crew neckline and fine gauge knit for warmth without bulk.",
    details: [
      "100% merino wool",
      "Crew neck",
      "Regular fit",
      "Hand wash only",
      "Made in Italy",
    ],
    colors: [
      { name: "Charcoal", value: "charcoal" },
      { name: "Navy", value: "navy" },
      { name: "Camel", value: "camel" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Merino-Wool-Sweater.png",
      "/images/men/Merino-Wool-Sweater.png",
    ],
    reviews: [
      {
        id: 9,
        author: "Joseph Martin",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Incredibly soft and warm. Perfect for winter without being bulky.",
      },
      {
        id: 10,
        author: "Kevin White",
        rating: 5,
        date: "2 months ago",
        content: "Worth every penny. The quality is exceptional.",
      },
    ],
  },
  {
    id: "men-7",
    name: "Leather Belt",
    price: 39.99,
    category: "men",
    image: "/images/men/Leather-Belt.png",
    rating: 4.4,
    reviewCount: 134,
    description:
      "Classic genuine leather belt with a polished buckle that pairs well with both casual and dress outfits.",
    details: [
      "Genuine leather",
      '1.5" width',
      "Brushed nickel buckle",
      "Adjustable sizing",
      "Made in USA",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Brown", value: "brown" },
    ],
    sizes: ["32", "34", "36", "38", "40", "42"],
    images: ["/images/men/Leather-Belt.png", "/images/men/Leather-Belt.png"],
    reviews: [
      {
        id: 11,
        author: "Brian Clark",
        rating: 5,
        date: "1 month ago",
        content:
          "High quality leather that's getting better with age. Perfect dress belt.",
      },
      {
        id: 12,
        author: "Jason Lewis",
        rating: 4,
        date: "2 months ago",
        content: "Great belt, but the buckle scratches easily.",
      },
    ],
  },
  {
    id: "men-8",
    name: "Tailored Suit",
    price: 299.99,
    category: "men",
    image: "/images/men/Tailored-Suit.png",
    rating: 4.9,
    reviewCount: 62,
    description:
      "Premium tailored suit featuring a modern slim fit, half-canvas construction, and fine Italian wool fabric.",
    details: [
      "100% Italian wool",
      "Slim fit",
      "Two-button jacket",
      "Flat front trousers",
      "Dry clean only",
    ],
    colors: [
      { name: "Navy", value: "navy" },
      { name: "Charcoal", value: "charcoal" },
      { name: "Black", value: "black" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Tailored-Suit.png",
      "/images/men/Tailored-Suit.png",
      "/images/men/Tailored-Suit.png",
    ],
    reviews: [
      {
        id: 13,
        author: "Richard Walker",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Exceptional quality for the price. Fit perfectly with minimal alterations needed.",
      },
      {
        id: 14,
        author: "Charles Hall",
        rating: 5,
        date: "1 month ago",
        content:
          "Wore this to my wedding. Received countless compliments on the fit and fabric.",
      },
    ],
  },
  {
    id: "men-9",
    name: "Casual Polo Shirt",
    price: 34.99,
    category: "men",
    image: "/images/men/Casual-Polo-Shirt.png",
    rating: 4.3,
    reviewCount: 187,
    description:
      "Classic pique knit polo shirt with a comfortable fit and moisture-wicking properties for all-day comfort.",
    details: [
      "100% pima cotton",
      "Three-button placket",
      "Ribbed collar",
      "Machine washable",
      "Tagless label",
    ],
    colors: [
      { name: "Navy", value: "navy" },
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Burgundy", value: "burgundy" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Casual-Polo-Shirt.png",
      "/images/men/Casual-Polo-Shirt.png",
    ],
    reviews: [
      {
        id: 15,
        author: "Edward Young",
        rating: 4,
        date: "2 weeks ago",
        content:
          "Great polo that holds its shape well. The fabric is nice and thick.",
      },
      {
        id: 16,
        author: "Ronald Allen",
        rating: 5,
        date: "1 month ago",
        content:
          "Perfect fit and extremely comfortable. I own several in different colors.",
      },
    ],
  },
  {
    id: "men-10",
    name: "Lightweight Jacket",
    price: 79.99,
    category: "men",
    image: "/images/men/Lightweight-Jacket.png",
    rating: 4.5,
    reviewCount: 93,
    description:
      "Versatile lightweight jacket with water-resistant finish, perfect for transitional weather and travel.",
    details: [
      "Nylon shell",
      "Water-resistant",
      "Zip front closure",
      "Three exterior pockets",
      "Machine washable",
    ],
    colors: [
      { name: "Olive", value: "olive" },
      { name: "Navy", value: "navy" },
      { name: "Black", value: "black" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Lightweight-Jacket.png",
      "/images/men/Lightweight-Jacket-2.png",
    ],
    reviews: [
      {
        id: 17,
        author: "Donald King",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Perfect spring/fall jacket. Blocks wind well and keeps me dry in light rain.",
      },
      {
        id: 18,
        author: "Steven Scott",
        rating: 4,
        date: "2 months ago",
        content: "Great jacket, but the sizing runs slightly large.",
      },
    ],
  },
  {
    id: "men-11",
    name: "Formal Dress Shoes",
    price: 119.99,
    category: "men",
    image: "/images/men/Formal-Dress-Shoes.png",
    rating: 4.7,
    reviewCount: 104,
    description:
      "Classic oxford dress shoes crafted from premium leather with a comfortable cushioned insole for all-day wear.",
    details: [
      "Genuine leather upper",
      "Leather sole",
      "Cushioned insole",
      "Goodyear welt construction",
      "Made in England",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Brown", value: "brown" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    images: [
      "/images/men/Formal-Dress-Shoes.png",
      "/images/men/Formal-Dress-Shoes.png",
    ],
    reviews: [
      {
        id: 19,
        author: "Paul Green",
        rating: 5,
        date: "1 month ago",
        content:
          "Beautiful shoes that broke in quickly. Very comfortable for dress shoes.",
      },
      {
        id: 20,
        author: "Mark Adams",
        rating: 4,
        date: "3 months ago",
        content: "Excellent quality leather, but needed some breaking in.",
      },
    ],
  },
  {
    id: "men-12",
    name: "Patterned Socks Set",
    price: 19.99,
    category: "men",
    image: "/images/men/Patterned-Socks-Set.png",
    rating: 4.2,
    reviewCount: 215,
    description:
      "Set of four patterned dress socks made from breathable cotton with reinforced heels and toes for durability.",
    details: [
      "80% cotton, 15% polyester, 5% elastane",
      "Set of 4 pairs",
      "Reinforced heel and toe",
      "Machine washable",
      "One size fits most",
    ],
    colors: [
      { name: "Assorted Patterns", value: "assorted" },
      { name: "Solid Colors", value: "solid" },
    ],
    sizes: ["One Size"],
    images: [
      "/images/men/Patterned-Socks-Set.png",
      "/images/men/Patterned-Socks-Set.png",
    ],
    reviews: [
      {
        id: 21,
        author: "George Baker",
        rating: 5,
        date: "2 weeks ago",
        content: "Great quality socks that stay up all day. Fun patterns too.",
      },
      {
        id: 22,
        author: "Kenneth Nelson",
        rating: 4,
        date: "1 month ago",
        content:
          "Comfortable and durable, though some patterns are bolder than expected.",
      },
    ],
  },
  // Add the Main products from the main page
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
    id: 3,
    name: "Premium Leather Sneakers",
    price: 129.99,
    category: "shoes",
    image: "/images/Premium-Leather-Sneakers.png",
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
      "/images/Premium-Leather-Sneakers.png",
      "/images/Premium-Leather-Sneakers.png",
      "/images/Premium-Leather-Sneakers.png",
      "/images/Premium-Leather-Sneakers.png",
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
    name: "Oversize Hudi",
    price: 159.99,
    category: "men",
    image: "/images/men/Oversize-Hudi.png",
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
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Oversize-Hudi.png",
      "/images/men/Oversize-Hudi.png",
      "/images/men/Oversize-Hudi.png",
      "/images/men/Oversize-Hudi.png",
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
  {
    id: 5,
    name: "Tailored Wool Blazer",
    price: 229.99,
    category: "men",
    image: "/images/men/Tailored-Wool-Blazer.png",
    rating: 4.7,
    reviewCount: 54,
    description:
      "Crafted from premium wool, this tailored blazer features a sleek silhouette, notched lapels, and a soft inner lining. Ideal for both formal and casual outfits.",
    details: [
      "100% premium wool",
      "Soft inner lining",
      "Notched lapels",
      "Double-button closure",
      "Dry clean only",
    ],
    colors: [
      { name: "Charcoal Grey", value: "grey" },
      { name: "Classic Black", value: "black" },
      { name: "Navy Blue", value: "navy" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/men/Tailored-Wool-Blazer.png",
      "/images/men/Tailored-Wool-Blazer.png",
      "/images/men/Tailored-Wool-Blazer.png",
      "/images/men/Tailored-Wool-Blazer.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Emma Johnson",
        rating: 5,
        date: "2 months ago",
        content: "Elegant and warm—perfect for fall and winter office days.",
      },
      {
        id: 2,
        author: "Sophia Lee",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Great fit and quality, though the sleeves were a bit long for me.",
      },
    ],
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    price: 89.99,
    category: "women",
    image: "/images/women/Pleated-Midi-Skirt.png",
    rating: 4.6,
    reviewCount: 38,
    description:
      "A flowy and elegant midi skirt featuring crisp pleats and a high-waisted fit. Made from lightweight fabric for all-day comfort.",
    details: [
      "High-waisted design",
      "Lightweight breathable fabric",
      "Zipper closure at the side",
      "Machine washable",
      "Knee to mid-calf length",
    ],
    colors: [
      { name: "Cream", value: "cream" },
      { name: "Dusty Pink", value: "pink" },
      { name: "Olive Green", value: "green" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/images/women/Pleated-Midi-Skirt.png",
      "/images/women/Pleated-Midi-Skirt.png",
      "/images/women/Pleated-Midi-Skirt.png",
      "/images/women/Pleated-Midi-Skirt.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Mia Williams",
        rating: 5,
        date: "1 month ago",
        content: "So comfy and pretty! The pleats stay sharp after washing.",
      },
      {
        id: 2,
        author: "Isabella Clark",
        rating: 4,
        date: "2 weeks ago",
        content: "Nice skirt but runs slightly large. I recommend sizing down.",
      },
    ],
  },
  {
    id: 7,
    name: "Suede Chelsea Boots",
    price: 149.99,
    category: "shoes",
    image: "/images/shoes/Suede-Chelsea-Boots.png",
    rating: 4.8,
    reviewCount: 63,
    description:
      "Classic Chelsea boots made from genuine suede leather with elastic side panels and a durable sole. Stylish and versatile for any season.",
    details: [
      "Genuine suede upper",
      "Elastic side panels",
      "Slip-on style",
      "Durable rubber outsole",
      "Comfort insole",
    ],
    colors: [
      { name: "Tan", value: "tan" },
      { name: "Chocolate", value: "brown" },
      { name: "Black", value: "black" },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [
      "/images/shoes/Suede-Chelsea-Boots.png",
      "/images/shoes/Suede-Chelsea-Boots.png",
      "/images/shoes/Suede-Chelsea-Boots.png",
      "/images/shoes/Suede-Chelsea-Boots.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Daniel Brooks",
        rating: 5,
        date: "1 month ago",
        content: "High-quality suede, fits perfectly, and looks sharp.",
      },
      {
        id: 2,
        author: "Liam Turner",
        rating: 4,
        date: "2 weeks ago",
        content: "Love the look. Slightly stiff at first but broke in quickly.",
      },
    ],
  },
  {
    id: 8,
    name: "Leather Crossbody Bag",
    price: 119.99,
    category: "women",
    image: "/images/women/Leather-Crossbody-Bag.png",
    rating: 4.9,
    reviewCount: 47,
    description:
      "Compact and stylish, this genuine leather crossbody bag is designed for everyday use. Features adjustable strap and multiple compartments.",
    details: [
      "Genuine leather",
      "Adjustable shoulder strap",
      "Multiple compartments",
      "Secure zip closure",
      "Compact and lightweight",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Burgundy", value: "burgundy" },
      { name: "Taupe", value: "taupe" },
    ],
    sizes: ["One Size"],
    images: [
      "/images/women/Leather-Crossbody-Bag.png",
      "/images/women/Leather-Crossbody-Bag.png",
      "/images/women/Leather-Crossbody-Bag.png",
      "/images/women/Leather-Crossbody-Bag.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Chloe Martin",
        rating: 5,
        date: "3 weeks ago",
        content: "Perfect size and very stylish. I get compliments all the time.",
      },
      {
        id: 2,
        author: "Ava Scott",
        rating: 5,
        date: "1 week ago",
        content: "Love the quality and it fits all my essentials easily.",
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
  // Add the Womens products from the Womens page
  {
    id: "women-1",
    name: "Oversized Cotton Shirt",
    price: 49.99,
    category: "women",
    image: "/images/women/Oversized-Cotton-Shirt.png",
    rating: 4.5,
    reviewCount: 128,
    description:
      "This elegant minimalist watch features a clean dial design, premium stainless steel case, and genuine leather strap. Water-resistant and built to last, it's the perfect accessory for any occasion.",
    details: [
      "100% organic cotton",
      "Oversized fit",
      "Button-down collar",
      "Machine washable",
      "Made in Portugal",
    ],
    colors: [
      { name: "White", value: "white" },
      { name: "Striped", value: "bluewhite" },
      { name: "Chambray", value: "lightblue" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/images/women/Oversized-Cotton-Shirt.png",
      "/images/women/Oversized-Cotton-Shirt.png",
      "/images/women/Oversized-Cotton-Shirt.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Emma Johnson",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Perfect oversized fit - not too boxy. The fabric is so soft and gets better with each wash.",
      },
      {
        id: 2,
        author: "Sophia Williams",
        rating: 4,
        date: "1 month ago",
        content:
          "Love the shirt but the sleeves are longer than expected. Still keeping it though!",
      },
    ],
  },
  {
    id: "women-2",
    name: "High-Waisted Jeans",
    price: 79.99,
    category: "women",
    image: "/images/women/High-Waisted-Jeans.png",
    rating: 4.2,
    reviewCount: 215,
    description:
      "Flattering high-waisted jeans with stretch technology that sculpts and lifts while providing all-day comfort.",
    details: [
      "98% cotton, 2% elastane",
      "High-rise waist",
      "Slim straight leg",
      "Zip fly with button closure",
      "Machine wash cold",
    ],
    colors: [
      { name: "Medium Wash", value: "mediumwash" },
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["24", "26", "28", "30", "32"],
    images: [
      "/images/women/High-Waisted-Jeans.png",
      "/images/women/High-Waisted-Jeans.png",
    ],
    reviews: [
      {
        id: 3,
        author: "Olivia Brown",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Finally found jeans that don't gap at the waist! These are so flattering and comfortable.",
      },
      {
        id: 4,
        author: "Ava Jones",
        rating: 4,
        date: "2 months ago",
        content:
          "Great quality but runs slightly small. Size up if between sizes.",
      },
    ],
  },
  {
    id: "women-3",
    name: "Knit Sweater",
    price: 59.99,
    category: "women",
    image: "/images/women/Knit-Sweater.png",
    rating: 4.7,
    reviewCount: 187,
    description:
      "Cozy ribbed knit sweater with a relaxed fit and balloon sleeves for a stylish winter look.",
    details: [
      "50% cotton, 50% acrylic",
      "Oversized fit",
      "Balloon sleeves",
      "Machine wash cold",
      "Imported",
    ],
    colors: [
      { name: "Cream", value: "cream" },
      { name: "Pink", value: "dustypink" },
      { name: "Forest Green", value: "forestgreen" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/images/women/Knit-Sweater.png",
      "/images/women/Knit-Sweater.png",
    ],
    reviews: [
      {
        id: 5,
        author: "Isabella Garcia",
        rating: 5,
        date: "1 month ago",
        content:
          "So soft and warm! The sleeves are dramatic in the best way. Gets lots of compliments.",
      },
      {
        id: 6,
        author: "Mia Martinez",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Beautiful sweater but pills a bit after several wears. Still love it though.",
      },
    ],
  },
  {
    id: "women-4",
    name: "Midi Dress",
    price: 89.99,
    category: "women",
    image: "/images/women/Midi-Dress.png",
    rating: 4.0,
    reviewCount: 96,
    description:
      "Elegant midi-length dress with a wrap front, puff sleeves, and flattering A-line silhouette for any occasion.",
    details: [
      "100% viscose",
      "Wrap front design",
      "Puff sleeves",
      "Machine wash delicate",
      "Lined bodice",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Floral Print", value: "floral" },
      { name: "Emerald", value: "emerald" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/images/women/Midi-Dress.png",
      "/images/women/Midi-Dress.png",
      "/images/women/Midi-Dress.png",
    ],
    reviews: [
      {
        id: 7,
        author: "Charlotte Rodriguez",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Wore this to a wedding and got so many compliments! Flattering on all body types.",
      },
      {
        id: 8,
        author: "Amelia Wilson",
        rating: 3,
        date: "1 month ago",
        content:
          "Beautiful dress but the wrap doesn't stay closed very well. Needs a safety pin.",
      },
    ],
  },
  {
    id: "women-5",
    name: "Linen Blazer",
    price: 129.99,
    category: "women",
    image: "/images/women/linen-blazer.png",
    rating: 4.8,
    reviewCount: 74,
    description:
      "Tailored linen blazer with a relaxed fit, notch lapels, and functional pockets - perfect for summer layering.",
    details: [
      "100% linen",
      "Unlined construction",
      "Notch lapels",
      "Two front pockets",
      "Dry clean recommended",
    ],
    colors: [
      { name: "Beige", value: "beige" },
      { name: "Navy", value: "navy" },
      { name: "Black", value: "black" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/images/women/linen-blazer.png",
      "/images/women/linen-blazer.png",
      "/images/women/linen-blazer.png",
    ],
    reviews: [
      {
        id: 9,
        author: "Harper Lee",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Perfect summer blazer - lightweight but still structured enough to look professional.",
      },
      {
        id: 10,
        author: "Evelyn Clark",
        rating: 4,
        date: "2 months ago",
        content:
          "Love the relaxed fit, but wrinkles very easily as expected with linen.",
      },
    ],
  },
  {
    id: "women-6",
    name: "Pleated Skirt",
    price: 69.99,
    category: "women",
    image: "/images/women/Pleated-Skirt.png",
    rating: 4.3,
    reviewCount: 112,
    description:
      "Flowy midi-length pleated skirt with an elasticated waistband for comfort and effortless movement.",
    details: [
      "100% polyester",
      "Elastic waistband",
      "Pleated design",
      "Machine wash cold",
      "Knee-length",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Burgundy", value: "burgundy" },
      { name: "Dusty Pink", value: "dustypink" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/images/women/Pleated-Skirt.png",
      "/images/women/Pleated-Skirt.png",
    ],
    reviews: [
      {
        id: 11,
        author: "Abigail Young",
        rating: 5,
        date: "1 month ago",
        content:
          "So flattering and comfortable! The pleats hold their shape beautifully.",
      },
      {
        id: 12,
        author: "Emily Hernandez",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Love the skirt but it's slightly sheer - need to wear with a slip.",
      },
    ],
  },
  {
    id: "women-7",
    name: "Silk Blouse",
    price: 99.99,
    category: "women",
    image: "/images/women/Silk-Blouse.png",
    rating: 4.6,
    reviewCount: 89,
    description:
      "Luxurious silk blouse with a delicate pussybow tie neck and French cuffs for elegant styling options.",
    details: [
      "100% mulberry silk",
      "Pussybow neckline",
      "French cuffs",
      "Dry clean only",
      "Made in Italy",
    ],
    colors: [
      { name: "Ivory", value: "ivory" },
      { name: "Blush", value: "blush" },
      { name: "Navy", value: "navy" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/images/women/Silk-Blouse.png",
      "/images/women/Silk-Blouse.png",
      "/images/women/Silk-Blouse.png",
    ],
    reviews: [
      {
        id: 13,
        author: "Elizabeth King",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Worth every penny. The silk quality is exceptional and it drapes beautifully.",
      },
      {
        id: 14,
        author: "Sofia Lopez",
        rating: 4,
        date: "1 month ago",
        content:
          "Gorgeous blouse but the bow is tricky to tie evenly. Still love it though!",
      },
    ],
  },
  {
    id: "women-8",
    name: "Wide-Leg Trousers",
    price: 89.99,
    category: "women",
    image: "/images/women/Wide-Leg-Trousers.png",
    rating: 3.9,
    reviewCount: 67,
    description:
      "Tailored wide-leg trousers with a high waist and clean lines for a polished, sophisticated look.",
    details: [
      "65% polyester, 30% viscose, 5% elastane",
      "High-waisted",
      "Wide leg silhouette",
      "Crease-resistant",
      "Machine wash cold",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Cream", value: "cream" },
      { name: "Pinstripe", value: "pinstripe" },
    ],
    sizes: ["00", "0", "2", "4", "6", "8", "10"],
    images: [
      "/images/women/Wide-Leg-Trousers.png",
      "/images/women/Wide-Leg-Trousers.png",
    ],
    reviews: [
      {
        id: 15,
        author: "Victoria Scott",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Very flattering cut and comfortable waistband. Runs slightly long.",
      },
      {
        id: 16,
        author: "Madison Green",
        rating: 3,
        date: "2 months ago",
        content:
          "Nice fabric but the sizing is inconsistent. Had to exchange for a different size.",
      },
    ],
  },
  // Add the Shoes products from the Shoes page
  {
    id: "shoes-1",
    name: "Leather Loafers",
    price: 129.99,
    category: "shoes",
    image: "/images/shoes/Leather-Loafers.png",
    rating: 4.5,
    reviewCount: 142,
    description:
      "Classic penny loafers crafted from premium leather with a comfortable cushioned insole and durable rubber sole.",
    details: [
      "Genuine leather upper",
      "Rubber sole",
      "Cushioned insole",
      "Slip-on style",
      "Made in Italy",
    ],
    colors: [
      { name: "Dark Brown", value: "#5c3a21" },
      { name: "Black", value: "#000000" },
      { name: "Burgundy", value: "#800020" },
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    images: [
      "/images/shoes/Leather-Loafers.png",
      "/images/shoes/Leather-Loafers.png",
      "/images/shoes/Leather-Loafers.png",
    ],
    reviews: [
      {
        id: 1,
        author: "Michael Johnson",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Extremely comfortable right out of the box. The leather quality is exceptional.",
      },
      {
        id: 2,
        author: "David Wilson",
        rating: 4,
        date: "1 month ago",
        content:
          "Great shoes but run slightly narrow. Had to break them in for a week.",
      },
    ],
  },
  {
    id: "shoes-2",
    name: "Canvas Sneakers",
    price: 79.99,
    category: "shoes",
    image: "/images/shoes/Canvas-Sneakers.png",
    rating: 4.2,
    reviewCount: 198,
    description:
      "Casual low-top sneakers with canvas upper and vulcanized rubber sole for everyday comfort and style.",
    details: [
      "100% cotton canvas",
      "Vulcanized rubber sole",
      "Lace-up closure",
      "Reinforced toe cap",
      "Machine washable",
    ],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" },
      { name: "Red", value: "#ff0000" },
    ],
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    images: [
      "/images/shoes/Canvas-Sneakers.png",
      "/images/shoes/Canvas-Sneakers.png",
    ],
    reviews: [
      {
        id: 3,
        author: "James Brown",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Perfect everyday sneakers. Comfortable and go with everything.",
      },
      {
        id: 4,
        author: "Robert Taylor",
        rating: 3,
        date: "2 months ago",
        content: "Good quality but the sole wears out quickly with daily use.",
      },
    ],
  },
  {
    id: "shoes-3",
    name: "Ankle Boots",
    price: 149.99,
    category: "shoes",
    image: "/images/shoes/Ankle-Boots.png",
    rating: 4.7,
    reviewCount: 87,
    description:
      "Chic leather ankle boots with a block heel, side zipper, and cushioned footbed for all-day comfort.",
    details: [
      "Genuine leather upper",
      "2.5 inch block heel",
      "Side zipper closure",
      "Cushioned insole",
      "Leather lining",
    ],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Taupe", value: "#b38b6d" },
      { name: "Dark Brown", value: "#5c3a21" },
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "/images/shoes/Ankle-Boots.png",
      "/images/shoes/Ankle-Boots.png",
      "/images/shoes/Ankle-Boots.png",
    ],
    reviews: [
      {
        id: 5,
        author: "Jennifer Adams",
        rating: 5,
        date: "1 month ago",
        content:
          "Worth every penny! Comfortable enough to wear all day at work.",
      },
      {
        id: 6,
        author: "Sarah Miller",
        rating: 4,
        date: "3 weeks ago",
        content:
          "Beautiful boots but the leather scuffs easily. Need to polish regularly.",
      },
    ],
  },
  {
    id: "shoes-4",
    name: "Strappy Sandals",
    price: 89.99,
    category: "shoes",
    image: "/images/shoes/Strappy-Sandals.png",
    rating: 4.0,
    reviewCount: 113,
    description:
      "Elegant strappy sandals with adjustable ankle straps and a comfortable low heel for summer occasions.",
    details: [
      "Genuine leather straps",
      "1.5 inch heel",
      "Adjustable buckle closure",
      "Padded footbed",
      "Synthetic sole",
    ],
    colors: [
      { name: "Nude", value: "#f5d0b9" },
      { name: "Black", value: "#000000" },
      { name: "Gold", value: "#ffd700" },
    ],
    sizes: ["5", "6", "7", "8", "9"],
    images: [
      "/images/shoes/Strappy-Sandals.png",
      "/images/shoes/Strappy-Sandals.png",
    ],
    reviews: [
      {
        id: 7,
        author: "Emily Clark",
        rating: 4,
        date: "2 weeks ago",
        content:
          "Pretty sandals that are comfortable for several hours of wear.",
      },
      {
        id: 8,
        author: "Jessica Wilson",
        rating: 3,
        date: "1 month ago",
        content: "The straps dig in after a while. Not great for all-day wear.",
      },
    ],
  },
  {
    id: "shoes-5",
    name: "Running Shoes",
    price: 119.99,
    category: "shoes",
    image: "/images/shoes/Running-Shoes.png",
    rating: 4.8,
    reviewCount: 231,
    description:
      "High-performance running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.",
    details: [
      "Breathable mesh upper",
      "Responsive foam midsole",
      "Rubber traction outsole",
      "Removable insole",
      "Lightweight design",
    ],
    colors: [
      { name: "Black/Red", value: "#000000/#ff0000" },
      { name: "White/Blue", value: "#ffffff/#0000ff" },
      { name: "Gray/Orange", value: "#808080/#ffa500" },
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    images: [
      "/images/shoes/Running-Shoes.png",
      "/images/shoes/Running-Shoes.png",
      "/images/shoes/Running-Shoes.png",
    ],
    reviews: [
      {
        id: 9,
        author: "Daniel Moore",
        rating: 5,
        date: "3 weeks ago",
        content: "Best running shoes I've owned. Great support and cushioning.",
      },
      {
        id: 10,
        author: "Christopher Lee",
        rating: 5,
        date: "2 months ago",
        content:
          "Perfect for my marathon training. No blisters even on long runs.",
      },
    ],
  },
  {
    id: "shoes-6",
    name: "Slip-On Mules",
    price: 99.99,
    category: "shoes",
    image: "/images/shoes/Slip-On-Mules.png",
    rating: 4.3,
    reviewCount: 97,
    description:
      "Trendy slip-on mules with a square toe, chunky heel, and soft faux fur lining for comfort and style.",
    details: [
      "Suede upper",
      "2 inch chunky heel",
      "Faux fur lining",
      "Slip-on design",
      "Synthetic sole",
    ],
    colors: [
      { name: "Cream", value: "#fffdd0" },
      { name: "Black", value: "#000000" },
      { name: "Taupe", value: "#b38b6d" },
    ],
    sizes: ["5", "6", "7", "8", "9"],
    images: [
      "/images/shoes/Slip-On-Mules.png",
      "/images/shoes/Slip-On-Mules.png",
    ],
    reviews: [
      {
        id: 11,
        author: "Olivia Martin",
        rating: 4,
        date: "1 month ago",
        content:
          "Super comfortable and stylish. The fur lining makes them cozy.",
      },
      {
        id: 12,
        author: "Sophia White",
        rating: 3,
        date: "3 weeks ago",
        content: "Cute but the heel makes a clicking sound when walking.",
      },
    ],
  },
  {
    id: "shoes-7",
    name: "Platform Heels",
    price: 139.99,
    category: "shoes",
    image: "/images/shoes/Platform-Heels.png",
    rating: 4.6,
    reviewCount: 78,
    description:
      "Statement platform heels with a chunky sole, pointed toe, and adjustable ankle strap for secure fit.",
    details: [
      "Faux leather upper",
      "4 inch platform heel",
      "Adjustable ankle strap",
      "Pointed toe",
      "Synthetic sole",
    ],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Leopard Print", value: "#d4a017/#000000" },
    ],
    sizes: ["5", "6", "7", "8", "9"],
    images: [
      "/images/shoes/Platform-Heels.png",
      "/images/shoes/Platform-Heels.png",
      "/images/shoes/Platform-Heels.png",
    ],
    reviews: [
      {
        id: 13,
        author: "Ava Thompson",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Surprisingly comfortable for such high heels. Got tons of compliments!",
      },
      {
        id: 14,
        author: "Isabella Harris",
        rating: 4,
        date: "1 month ago",
        content:
          "Stunning shoes but take some time to break in. Worth it though.",
      },
    ],
  },
  {
    id: "shoes-8",
    name: "Espadrilles",
    price: 69.99,
    category: "shoes",
    image: "/images/shoes/Espadrilles.png",
    rating: 3.9,
    reviewCount: 64,
    description:
      "Classic canvas espadrilles with jute-wrapped wedge and comfortable cotton lining for summer wear.",
    details: [
      "Cotton canvas upper",
      "Jute-wrapped wedge",
      "1.5 inch heel",
      "Elastic gore panels",
      "Textile lining",
    ],
    colors: [
      { name: "Natural", value: "#f5e8d0" },
      { name: "Striped", value: "blue/white" },
      { name: "Black", value: "#000000" },
    ],
    sizes: ["5", "6", "7", "8", "9"],
    images: ["/images/shoes/Espadrilles.png", "/images/shoes/Espadrilles.png"],
    reviews: [
      {
        id: 15,
        author: "Mia Lewis",
        rating: 4,
        date: "3 weeks ago",
        content: "Cute summer shoes but not very supportive for long walks.",
      },
      {
        id: 16,
        author: "Charlotte Walker",
        rating: 3,
        date: "2 months ago",
        content:
          "The jute started unraveling after just a few wears. Disappointed.",
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

                <div className="mt-8 space-y-4">
                  {/* Add to Cart – tepadan alohida, to‘liq eni */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {t["product.addToCart"] || "Add to Cart"}
                  </Button>

                  {/* Buy Now + Wishlist – yonma-yon pastda, har biri 50% eni */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleCheckout}
                      className="w-1/2 bg-primary text-white hover:bg-primary-dark"
                    >
                      {t["product.buyNow"] || "Buy Now"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleWishlistToggle}
                      className="w-1/2 flex items-center justify-center gap-2"
                    >
                      {isInWishlist(product.id.toString()) ? (
                        <>
                          <Heart className="h-5 w-5 fill-current" />
                          {t["product.removeFromWishlist"] ||
                            "Remove from Wishlist"}
                        </>
                      ) : (
                        <>
                          <Heart className="h-5 w-5" />
                          {t["product.addToWishlist"] || "Add to Wishlist"}
                        </>
                      )}
                    </Button>
                  </div>
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
