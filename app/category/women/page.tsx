"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/product-card";
import { useLanguage } from "@/context/language-context";

// Sample product data
const products = [
  {
    id: "women-1",
    name: "Oversized Cotton Shirt",
    price: 49.99,
    image: "/images/women/Oversized-Cotton-Shirt.png",
    category: "women",
    rating: 4.5,
  },
  {
    id: "women-2",
    name: "High-Waisted Jeans",
    price: 79.99,
    image: "/images/women/High-Waisted-Jeans.png",
    category: "women",
    rating: 4.2,
  },
  {
    id: "women-3",
    name: "Knit Sweater",
    price: 59.99,
    image: "/images/women/Knit-Sweater.png",
    category: "women",
    rating: 4.7,
  },
  {
    id: "women-4",
    name: "Midi Dress",
    price: 89.99,
    image: "/images/women/Midi-Dress.png",
    category: "women",
    rating: 4.0,
  },
  {
    id: "women-5",
    name: "Linen Blazer",
    price: 129.99,
    image: "/images/women/linen-blazer.png",
    category: "women",
    rating: 4.8,
  },
  {
    id: "women-6",
    name: "Pleated Skirt",
    price: 69.99,
    image: "/images/women/Pleated-Skirt.png",
    category: "women",
    rating: 4.3,
  },
  {
    id: "women-7",
    name: "Silk Blouse",
    price: 99.99,
    image: "/images/women/Silk-Blouse.png",
    category: "women",
    rating: 4.6,
  },
  {
    id: "women-8",
    name: "Wide-Leg Trousers",
    price: 89.99,
    image: "/images/women/Wide-Leg-Trousers.png",
    category: "women",
    rating: 3.9,
  },
];

export default function WomenPage() {
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
    console.log("WomenPage: Language changed to", language);
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

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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
        <span className="text-gray-900">{t.women || "Women"}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t["women.title"] || "Women's Collection"}
        </h1>
        <p className="text-gray-600">
          {products.length} {t["category.products"] || "products"}
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <button
            className="flex items-center gap-2 text-sm font-medium"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
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
                <h3 className="font-medium mb-3">
                  {t["women.category"] || "Category"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tops"
                      checked={activeFilters.includes("tops")}
                      onCheckedChange={() => toggleFilter("tops")}
                    />
                    <Label htmlFor="tops">{t["women.tops"] || "Tops"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bottoms"
                      checked={activeFilters.includes("bottoms")}
                      onCheckedChange={() => toggleFilter("bottoms")}
                    />
                    <Label htmlFor="bottoms">
                      {t["women.bottoms"] || "Bottoms"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dresses"
                      checked={activeFilters.includes("dresses")}
                      onCheckedChange={() => toggleFilter("dresses")}
                    />
                    <Label htmlFor="dresses">
                      {t["women.dresses"] || "Dresses"}
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["women.size"] || "Size"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="xs"
                      checked={activeFilters.includes("xs")}
                      onCheckedChange={() => toggleFilter("xs")}
                    />
                    <Label htmlFor="xs">XS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="s"
                      checked={activeFilters.includes("s")}
                      onCheckedChange={() => toggleFilter("s")}
                    />
                    <Label htmlFor="s">S</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="m"
                      checked={activeFilters.includes("m")}
                      onCheckedChange={() => toggleFilter("m")}
                    />
                    <Label htmlFor="m">M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="l"
                      checked={activeFilters.includes("l")}
                      onCheckedChange={() => toggleFilter("l")}
                    />
                    <Label htmlFor="l">L</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["women.color"] || "Color"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="black"
                      checked={activeFilters.includes("black")}
                      onCheckedChange={() => toggleFilter("black")}
                    />
                    <Label htmlFor="black">{t["women.black"] || "Black"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="white"
                      checked={activeFilters.includes("white")}
                      onCheckedChange={() => toggleFilter("white")}
                    />
                    <Label htmlFor="white">{t["women.white"] || "White"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="beige"
                      checked={activeFilters.includes("beige")}
                      onCheckedChange={() => toggleFilter("beige")}
                    />
                    <Label htmlFor="beige">{t["women.beige"] || "Beige"}</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["women.price"] || "Price"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="under50"
                      checked={activeFilters.includes("under50")}
                      onCheckedChange={() => toggleFilter("under50")}
                    />
                    <Label htmlFor="under50">
                      {t["women.under50"] || "Under $50"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="50to100"
                      checked={activeFilters.includes("50to100")}
                      onCheckedChange={() => toggleFilter("50to100")}
                    />
                    <Label htmlFor="50to100">
                      {t["women.50to100"] || "$50 - $100"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="over100"
                      checked={activeFilters.includes("over100")}
                      onCheckedChange={() => toggleFilter("over100")}
                    />
                    <Label htmlFor="over100">
                      {t["women.over100"] || "Over $100"}
                    </Label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 text-sm font-medium"
            onClick={() => setSortOpen(!sortOpen)}
          >
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
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === "featured" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSortOption("featured");
                    setSortOpen(false);
                  }}
                >
                  {t["category.featured"] || "Featured"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === "price-low" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSortOption("price-low");
                    setSortOpen(false);
                  }}
                >
                  {t["category.priceLowToHigh"] || "Price: Low to High"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === "price-high" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSortOption("price-high");
                    setSortOpen(false);
                  }}
                >
                  {t["category.priceHighToLow"] || "Price: High to Low"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === "rating" ? "bg-gray-100" : ""
                  }`}
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

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setActiveFilters([])}
            className="text-sm text-gray-500 hover:text-gray-700 ml-2"
          >
            {t["category.clearFilters"] || "Clear all"}
          </button>
        </div>
      )}

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
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
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

function X(props: React.ComponentProps<typeof import("lucide-react").X>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
