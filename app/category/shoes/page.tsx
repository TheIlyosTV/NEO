"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ProductCard from "@/components/product-card"
import { useLanguage } from "@/context/language-context"

// Sample product data (as before)
const products = [
  {
    id: 1,
    name: "Leather Loafers",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Canvas Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Ankle Boots",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Strappy Sandals",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.0,
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Slip-On Mules",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.3,
  },
  {
    id: 7,
    name: "Platform Heels",
    price: 139.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Espadrilles",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "shoes",
    rating: 3.9,
  },
];

export default function ShoesPage() {
  const { t, language } = useLanguage();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Force re-render when language changes
  const [, forceUpdate] = useState({});
  useEffect(() => {
    console.log("ShoesPage: Language changed to", language);
    forceUpdate({});
  }, [language]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0; // Default: featured
  });

  // Apply active filters
  const filteredProducts = sortedProducts.filter((product) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.some((filter) => {
      // Category filters
      if (filter === "sneakers") return product.name.toLowerCase().includes("sneaker");
      if (filter === "boots") return product.name.toLowerCase().includes("boot");
      if (filter === "sandals") return product.name.toLowerCase().includes("sandal");
      if (filter === "heels") return product.name.toLowerCase().includes("heel");

      // Price filters
      if (filter === "under75") return product.price < 75;
      if (filter === "75to125") return product.price >= 75 && product.price <= 125;
      if (filter === "over125") return product.price > 125;

      // Other filters would go here
      return false;
    });
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          {t.home || "Home"}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">{t.shoes || "Shoes"}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t["shoes.title"] || "Shoes Collection"}</h1>
        <p className="text-gray-600">
          {products.length} {t["category.products"] || "products"}
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <button className="flex items-center gap-2 text-sm font-medium" onClick={() => setFiltersOpen(!filtersOpen)}>
            <Filter size={18} />
            {t["category.filters"] || "Filters"}
            {filtersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg"
            >
              <div>
                <h3 className="font-medium mb-3">{t["shoes.category"] || "Category"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sneakers"
                      checked={activeFilters.includes("sneakers")}
                      onCheckedChange={() => toggleFilter("sneakers")}
                    />
                    <Label htmlFor="sneakers">{t["shoes.sneakers"] || "Sneakers"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="boots"
                      checked={activeFilters.includes("boots")}
                      onCheckedChange={() => toggleFilter("boots")}
                    />
                    <Label htmlFor="boots">{t["shoes.boots"] || "Boots"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sandals"
                      checked={activeFilters.includes("sandals")}
                      onCheckedChange={() => toggleFilter("sandals")}
                    />
                    <Label htmlFor="sandals">{t["shoes.sandals"] || "Sandals"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heels"
                      checked={activeFilters.includes("heels")}
                      onCheckedChange={() => toggleFilter("heels")}
                    />
                    <Label htmlFor="heels">{t["shoes.heels"] || "Heels"}</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">{t["shoes.price"] || "Price"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="under75"
                      checked={activeFilters.includes("under75")}
                      onCheckedChange={() => toggleFilter("under75")}
                    />
                    <Label htmlFor="under75">{t["shoes.under75"] || "Under $75"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="75to125"
                      checked={activeFilters.includes("75to125")}
                      onCheckedChange={() => toggleFilter("75to125")}
                    />
                    <Label htmlFor="75to125">{t["shoes.75to125"] || "$75 - $125"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="over125"
                      checked={activeFilters.includes("over125")}
                      onCheckedChange={() => toggleFilter("over125")}
                    />
                    <Label htmlFor="over125">{t["shoes.over125"] || "Over $125"}</Label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <button className="flex items-center gap-2 text-sm font-medium" onClick={() => setSortOpen(!sortOpen)}>
            {t["category.sortBy"] || "Sort by:"}{" "}
            {sortOption === "featured"
              ? t["category.featured"] || "Featured"
              : sortOption === "price-low"
                ? t["category.priceLowToHigh"] || "Price: Low to High"
                : sortOption === "price-high"
                  ? t["category.priceHighToLow"] || "Price: High to Low"
                  : t["category.rating"] || "Rating"}
            {sortOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {sortOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
            >
              <div className="py-1">
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "featured" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("featured");
                    setSortOpen(false);
                  }}
                >
                  {t["category.featured"] || "Featured"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "price-low" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("price-low");
                    setSortOpen(false);
                  }}
                >
                  {t["category.priceLowToHigh"] || "Price: Low to High"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "price-high" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("price-high");
                    setSortOpen(false);
                  }}
                >
                  {t["category.priceHighToLow"] || "Price: High to Low"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "rating" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("rating");
                    setSortOpen(false);
                  }}
                >
                  {t["category.rating"] || "Rating"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {currentProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t["category.noProducts"] || "No products match your filters"}</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800" onClick={() => setActiveFilters([])}>
            {t["category.clearFilters"] || "Clear all filters"}
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {t["category.previous"] || "Previous"}
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              {t["category.next"] || "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}