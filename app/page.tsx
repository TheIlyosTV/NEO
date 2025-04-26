"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import HeroSlider from "@/components/heroSlider";
import { useLanguage } from "@/context/language-context";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t, language } = useLanguage();

  // Force re-render when language changes
  const [, forceUpdate] = useState({});
  useEffect(() => {
    console.log("HomePage: Language changed to", language);
    forceUpdate({});
  }, [language]);

  // Hero slides data
  const heroSlides = [
    {
      image: "/images/perfumery/atirlar.png",
      title: t.heroSlide1Title || "Summer Collection 2025",
      subtitle: t.heroSlide1Subtitle || "Discover the latest trends in fashion",
    },
    {
      image: "/public/images/Slim-Fit2.png",
      title: t.heroSlide2Title || "Premium Footwear",
      subtitle:
        t.heroSlide2Subtitle || "Step into style with our exclusive designs",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: t.heroSlide3Title || "Accessories Collection",
      subtitle:
        t.heroSlide3Subtitle ||
        "Complete your look with our premium accessories",
    },
  ];

  // Featured products data
  const products = [
    {
      id: 1,
      name: t.product1Name || "Slim Fit Cotton Shirt",
      price: 49.99,
      category: "men",
      image: "/images/Slim-Fit.png",
      rating: 4.5,
    },
    {
      id: 2,
      name: t.product2Name || "Relaxed Linen Dress",
      price: 79.99,
      category: "women",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.8,
    },
    {
      id: 3,
      name: t.product3Name || "Premium Leather Sneakers",
      price: 129.99,
      category: "shoes",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.7,
    },
    {
      id: 4,
      name: t.product4Name || "Minimalist Watch",
      price: 159.99,
      category: "accessories",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.9,
    },
    {
      id: 5,
      name: t.product5Name || "Tailored Wool Blazer",
      price: 199.99,
      category: "men",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.6,
    },
    {
      id: 6,
      name: t.product6Name || "Pleated Midi Skirt",
      price: 89.99,
      category: "women",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.4,
    },
    {
      id: 7,
      name: t.product7Name || "Suede Chelsea Boots",
      price: 149.99,
      category: "shoes",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.8,
    },
    {
      id: 8,
      name: t.product8Name || "Leather Crossbody Bag",
      price: 119.99,
      category: "accessories",
      image: "/placeholder.svg?height=600&width=500",
      rating: 4.7,
    },
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Debug current language and translations
  console.log("HomePage: Current language:", language);
  console.log("HomePage: Translation for 'home':", t.home);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section with Sliding Background */}
        <HeroSlider slides={heroSlides} />

        {/* Featured Products Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
              {t.featuredCollection || "Featured Collection"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              {t.featuredCollectionSubtitle ||
                "Discover our carefully curated selection of premium clothing and Perfumery"}
            </motion.p>

            {/* Category Filters */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-md shadow-sm">
                {["all", "men", "women", "shoes", "perfumery"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "relative px-6 py-2 text-sm font-medium transition-all",
                        activeCategory === category
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {category === "all"
                        ? language === "UZB"
                          ? "Barchasi"
                          : language === "RUS"
                            ? "Все"
                            : "All"
                        : t[category] ||
                          category.charAt(0).toUpperCase() + category.slice(1)}
                      {activeCategory === category && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-transform hover:scale-105"
              >
                {t.viewAllProducts || "View All Products"}
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              {t.shopByCategory || "Shop by Category"}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["men", "women", "shoes", "perfumery"].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-lg group h-80"
                >
                  <Image
                    src={`/placeholder.svg?height=600&width=500`}
                    alt={t[category] || category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {t[category] || category}
                    </h3>
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all group-hover:scale-105"
                    >
                      {t.shopNow || "Shop Now"}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-4"
              >
                {t.joinNewsletter || "Join Our Newsletter"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-8"
              >
                {t.newsletterSubtitle ||
                  "Subscribe to receive updates on new arrivals and special promotions"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder || "Your email address"}
                  className="flex-grow"
                />
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  {t.subscribe || "Subscribe"}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}