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

// Sample product data for perfumery
const products = [
  {
    id: "perfume-1",
    name: "Aventus Creed",
    price: 99.99,
    image: "/images/perfumery/aventus-creed.jpg",
    category: "perfumery",
    rating: 4.8,
  },
  {
    id: "perfume-2",
    name: "Le Beau Paradise Garden Jean Paul",
    price: 85.99,
    image: "/images/perfumery/gaulter.jpg",
    category: "perfumery",
    rating: 4.6,
  },
  {
    id: "perfume-3",
    name: "Green Irish Tweed Greed",
    price: 75.99,
    image: "/images/perfumery/tweed-creed.jpg",
    category: "perfumery",
    rating: 4.5,
  },
  {
    id: "perfume-4",
    name: "Clementine California Atelier Cologne",
    price: 120.99,
    image: "/images/perfumery/Clementie-California.jpg",
    category: "perfumery",
    rating: 4.9,
  },
  {
    id: "perfume-5",
    name: "Blue Talisman Ex Nihilo",
    price: 65.99,
    image: "/images/perfumery/blue-talisman.jpg",
    category: "perfumery",
    rating: 4.3,
  },
  {
    id: "perfume-6",
    name: "Absolu Aventus Creed",
    price: 89.99,
    image: "/images/perfumery/absolu-aventus-creed.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-7",
    name: "Layton Parfums de Marly",
    price: 79.99,
    image: "/images/perfumery/layton-parfums.jpg",
    category: "perfumery",
    rating: 4.4,
  },
  {
    id: "perfume-8",
    name: "Kirke Tizina Terenzi",
    price: 110.99,
    image: "/images/perfumery/Kirke-tiziana.jpg",
    category: "perfumery",
    rating: 4.8,
  },
  {
    id: "perfume-9",
    name: "Silver Mountain Water Creed",
    price: 95.99,
    image: "/images/perfumery/Silver-mountain.jpg",
    category: "perfumery",
    rating: 4.6,
  },
  {
    id: "perfume-10",
    name: "Tilia Marc-Antoine Barrois",
    price: 115.99,
    image: "/images/perfumery/Tilia-Marc-Antoine.jpg",
    category: "perfumery",
    rating: 4.9,
  },
  {
    id: "perfume-11",
    name: "Emporio Armani Stronger With You",
    price: 69.99,
    image: "/images/perfumery/Emporio-Armani.jpg",
    category: "perfumery",
    rating: 4.2,
  },
  {
    id: "perfume-12",
    name: "Versace Pour Homme Versace",
    price: 105.99,
    image: "/images/perfumery/Versace.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-13",
    name: "Eau de Lacoste L.12.12. White",
    price: 99.99,
    image: "/images/perfumery/Lacoste-Fragrances.jpg",
    category: "perfumery",
    rating: 4.8,
  },
  {
    id: "perfume-14",
    name: "Blue Seduction Antonio Banderas",
    price: 85.99,
    image: "/images/perfumery/Blue-seduction.jpg",
    category: "perfumery",
    rating: 4.6,
  },
  {
    id: "perfume-15",
    name: "Enigma Pour Homme Roja Dove",
    price: 75.99,
    image: "/images/perfumery/Enigma-Pour.jpg",
    category: "perfumery",
    rating: 4.5,
  },
  {
    id: "perfume-16",
    name: "Montabaco Intensivo Ormonde Jayne",
    price: 120.99,
    image: "/images/perfumery/Montabaco-Intensivo.jpg",
    category: "perfumery",
    rating: 4.9,
  },
  {
    id: "perfume-17",
    name: "Gumin Tiziana Terenzi",
    price: 65.99,
    image: "/images/perfumery/Gumin-tiziana.jpg",
    category: "perfumery",
    rating: 4.3,
  },
  {
    id: "perfume-18",
    name: "Molecule 02 Escentric Molecules",
    price: 89.99,
    image: "/images/perfumery/Molecule-02.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-19",
    name: "Ganymede Marc-Antoine Barrois",
    price: 79.99,
    image: "/images/perfumery/Ganymede.jpg",
    category: "perfumery",
    rating: 4.4,
  },
  {
    id: "perfume-20",
    name: "Megamare Orto Parisi",
    price: 110.99,
    image: "/images/perfumery/Megamare-Orto.jpg",
    category: "perfumery",
    rating: 4.8,
  },
  {
    id: "perfume-21",
    name: "My Way Giorgio Armani",
    price: 95.99,
    image: "/images/perfumery/my-way-giorgio.jpg",
    category: "perfumery",
    rating: 4.6,
  },
  {
    id: "perfume-22",
    name: "Miss Dior Blooming Bouquet Dior",
    price: 115.99,
    image: "/images/perfumery/Miss-Dior.jpg",
    category: "perfumery",
    rating: 4.9,
  },
  {
    id: "perfume-23",
    name: "L'Imperatrice Limited Edition",
    price: 69.99,
    image: "/images/perfumery/dolce-gabbana.jpg",
    category: "perfumery",
    rating: 4.2,
  },
  {
    id: "perfume-24",
    name: "Ocean Lounge Escada",
    price: 105.99,
    image: "/images/perfumery/Ocean-Lounge-Escada.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-25",
    name: "Lost Cherry Tom Ford",
    price: 69.99,
    image: "/images/perfumery/Lost-Cherry.jpg",
    category: "perfumery",
    rating: 4.2,
  },
  {
    id: "perfume-26",
    name: "Chance Eau Tendre Eau de Parfum",
    price: 105.99,
    image: "/images/perfumery/Change-Eau.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-27",
    name: "Bombshell Victoria's Secret",
    price: 99.99,
    image: "/images/perfumery/Bombshell-Victoria.jpg",
    category: "perfumery",
    rating: 4.8,
  },
  {
    id: "perfume-28",
    name: "Libre Intense Yves Sain Laurent",
    price: 85.99,
    image: "/images/perfumery/Libre-Intense.jpg",
    category: "perfumery",
    rating: 4.6,
  },
  {
    id: "perfume-29",
    name: "Cherry in the Air Escada",
    price: 75.99,
    image: "/images/perfumery/Cherry-in-Air.jpg",
    category: "perfumery",
    rating: 4.5,
  },
  {
    id: "perfume-30",
    name: "Gucci Guilty Pour Homme Parfum",
    price: 120.99,
    image: "/images/perfumery/Gucci-guilty.jpg",
    category: "perfumery",
    rating: 4.9,
  },
  {
    id: "perfume-31",
    name: "Accento Sospiro Perfumes",
    price: 65.99,
    image: "/images/perfumery/Accento-Sospiro.jpg",
    category: "perfumery",
    rating: 4.3,
  },
  {
    id: "perfume-32",
    name: "Red Tobacco Mancera",
    price: 89.99,
    image: "/images/perfumery/Red-Tobacco.jpg",
    category: "perfumery",
    rating: 4.7,
  },
  {
    id: "perfume-33",
    name: "Boss Bottled Hugo Boss",
    price: 79.99,
    image: "/images/perfumery/Boss-Bottled.jpg",
    category: "perfumery",
    rating: 4.4,
  },
];

export default function PerfumeryPage() {
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
    console.log("PerfumeryPage: Language changed to", language);
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
        <span className="text-gray-900">{t.perfumery || "Perfumery"}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t["perfumery.title"] || "Perfumery Collection"}
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
                  {t["perfumery.scentType"] || "Scent Type"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="floral"
                      checked={activeFilters.includes("floral")}
                      onCheckedChange={() => toggleFilter("floral")}
                    />
                    <Label htmlFor="floral">
                      {t["perfumery.floral"] || "Floral"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="woody"
                      checked={activeFilters.includes("woody")}
                      onCheckedChange={() => toggleFilter("woody")}
                    />
                    <Label htmlFor="woody">
                      {t["perfumery.woody"] || "Woody"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="citrus"
                      checked={activeFilters.includes("citrus")}
                      onCheckedChange={() => toggleFilter("citrus")}
                    />
                    <Label htmlFor="citrus">
                      {t["perfumery.citrus"] || "Citrus"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="oriental"
                      checked={activeFilters.includes("oriental")}
                      onCheckedChange={() => toggleFilter("oriental")}
                    />
                    <Label htmlFor="oriental">
                      {t["perfumery.oriental"] || "Oriental"}
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["perfumery.size"] || "Size"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="30ml"
                      checked={activeFilters.includes("30ml")}
                      onCheckedChange={() => toggleFilter("30ml")}
                    />
                    <Label htmlFor="30ml">30ml</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="50ml"
                      checked={activeFilters.includes("50ml")}
                      onCheckedChange={() => toggleFilter("50ml")}
                    />
                    <Label htmlFor="50ml">50ml</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="75ml"
                      checked={activeFilters.includes("75ml")}
                      onCheckedChange={() => toggleFilter("75ml")}
                    />
                    <Label htmlFor="75ml">75ml</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="100ml"
                      checked={activeFilters.includes("100ml")}
                      onCheckedChange={() => toggleFilter("100ml")}
                    />
                    <Label htmlFor="100ml">100ml</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["perfumery.brand"] || "Brand"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="luxmode"
                      checked={activeFilters.includes("luxmode")}
                      onCheckedChange={() => toggleFilter("luxmode")}
                    />
                    <Label htmlFor="luxmode">
                      {t["perfumery.luxmode"] || "LUXMODE"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="elegance"
                      checked={activeFilters.includes("elegance")}
                      onCheckedChange={() => toggleFilter("elegance")}
                    />
                    <Label htmlFor="elegance">
                      {t["perfumery.elegance"] || "Elegance"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aroma"
                      checked={activeFilters.includes("aroma")}
                      onCheckedChange={() => toggleFilter("aroma")}
                    />
                    <Label htmlFor="aroma">
                      {t["perfumery.aroma"] || "Aroma"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scent"
                      checked={activeFilters.includes("scent")}
                      onCheckedChange={() => toggleFilter("scent")}
                    />
                    <Label htmlFor="scent">
                      {t["perfumery.scent"] || "Scent"}
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t["perfumery.price"] || "Price"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="under75"
                      checked={activeFilters.includes("under75")}
                      onCheckedChange={() => toggleFilter("under75")}
                    />
                    <Label htmlFor="under75">
                      {t["perfumery.under75"] || "Under $75"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="75to100"
                      checked={activeFilters.includes("75to100")}
                      onCheckedChange={() => toggleFilter("75to100")}
                    />
                    <Label htmlFor="75to100">
                      {t["perfumery.75to100"] || "$75 - $100"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="100to125"
                      checked={activeFilters.includes("100to125")}
                      onCheckedChange={() => toggleFilter("100to125")}
                    />
                    <Label htmlFor="100to125">
                      {t["perfumery.100to125"] || "$100 - $125"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="over125"
                      checked={activeFilters.includes("over125")}
                      onCheckedChange={() => toggleFilter("over125")}
                    />
                    <Label htmlFor="over125">
                      {t["perfumery.over125"] || "Over $125"}
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
              animate={{ opacity: 1, y:0 }}
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