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

// Sample product data
const products = [
  {
    id: "men-1",
    name: "Classic Oxford Shirt",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.5,
  },
  {
    id: "men-2",
    name: "Slim Fit Chinos",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.3,
  },
  {
    id: "men-3",
    name: "Wool Blend Blazer",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.7,
  },
  {
    id: "men-4",
    name: "Crew Neck T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.2,
  },
  {
    id: "men-5",
    name: "Denim Jeans",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.6,
  },
  {
    id: "men-6",
    name: "Merino Wool Sweater",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.8,
  },
  {
    id: "men-7",
    name: "Leather Belt",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.4,
  },
  {
    id: "men-8",
    name: "Tailored Suit",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.9,
  },
  {
    id: "men-9",
    name: "Casual Polo Shirt",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.3,
  },
  {
    id: "men-10",
    name: "Lightweight Jacket",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.5,
  },
  {
    id: "men-11",
    name: "Formal Dress Shoes",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.7,
  },
  {
    id: "men-12",
    name: "Patterned Socks Set",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.2,
  },
]

export default function MenPage() {
  const { t, language } = useLanguage()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // Force re-render when language changes
  const [, forceUpdate] = useState({})
  useEffect(() => {
    console.log("MenPage: Language changed to", language)
    forceUpdate({})
  }, [language])

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price
    if (sortOption === "price-high") return b.price - a.price
    if (sortOption === "rating") return b.rating - a.rating
    return 0 // Default: featured
  })

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          {t.home || "Home"}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">{t.men || "Men"}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t["men.title"] || "Men's Collection"}</h1>
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
                <h3 className="font-medium mb-3">{t["men.category"] || "Category"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shirts"
                      checked={activeFilters.includes("shirts")}
                      onCheckedChange={() => toggleFilter("shirts")}
                    />
                    <Label htmlFor="shirts">{t["men.shirts"] || "Shirts"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pants"
                      checked={activeFilters.includes("pants")}
                      onCheckedChange={() => toggleFilter("pants")}
                    />
                    <Label htmlFor="pants">{t["men.pants"] || "Pants"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="suits"
                      checked={activeFilters.includes("suits")}
                      onCheckedChange={() => toggleFilter("suits")}
                    />
                    <Label htmlFor="suits">{t["men.suits"] || "Suits"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accessories"
                      checked={activeFilters.includes("accessories")}
                      onCheckedChange={() => toggleFilter("accessories")}
                    />
                    <Label htmlFor="accessories">{t["men.accessories"] || "Accessories"}</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">{t["men.size"] || "Size"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="s" checked={activeFilters.includes("s")} onCheckedChange={() => toggleFilter("s")} />
                    <Label htmlFor="s">S</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="m" checked={activeFilters.includes("m")} onCheckedChange={() => toggleFilter("m")} />
                    <Label htmlFor="m">M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="l" checked={activeFilters.includes("l")} onCheckedChange={() => toggleFilter("l")} />
                    <Label htmlFor="l">L</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="xl"
                      checked={activeFilters.includes("xl")}
                      onCheckedChange={() => toggleFilter("xl")}
                    />
                    <Label htmlFor="xl">XL</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">{t["men.color"] || "Color"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="black"
                      checked={activeFilters.includes("black")}
                      onCheckedChange={() => toggleFilter("black")}
                    />
                    <Label htmlFor="black">{t["men.black"] || "Black"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="blue"
                      checked={activeFilters.includes("blue")}
                      onCheckedChange={() => toggleFilter("blue")}
                    />
                    <Label htmlFor="blue">{t["men.blue"] || "Blue"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="white"
                      checked={activeFilters.includes("white")}
                      onCheckedChange={() => toggleFilter("white")}
                    />
                    <Label htmlFor="white">{t["men.white"] || "White"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gray"
                      checked={activeFilters.includes("gray")}
                      onCheckedChange={() => toggleFilter("gray")}
                    />
                    <Label htmlFor="gray">{t["men.gray"] || "Gray"}</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">{t["men.price"] || "Price"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="under50"
                      checked={activeFilters.includes("under50")}
                      onCheckedChange={() => toggleFilter("under50")}
                    />
                    <Label htmlFor="under50">{t["men.under50"] || "Under $50"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="50to100"
                      checked={activeFilters.includes("50to100")}
                      onCheckedChange={() => toggleFilter("50to100")}
                    />
                    <Label htmlFor="50to100">{t["men.50to100"] || "$50 - $100"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="100to200"
                      checked={activeFilters.includes("100to200")}
                      onCheckedChange={() => toggleFilter("100to200")}
                    />
                    <Label htmlFor="100to200">{t["men.100to200"] || "$100 - $200"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="over200"
                      checked={activeFilters.includes("over200")}
                      onCheckedChange={() => toggleFilter("over200")}
                    />
                    <Label htmlFor="over200">{t["men.over200"] || "Over $200"}</Label>
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
                    setSortOption("featured")
                    setSortOpen(false)
                  }}
                >
                  {t["category.featured"] || "Featured"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "price-low" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("price-low")
                    setSortOpen(false)
                  }}
                >
                  {t["category.priceLowToHigh"] || "Price: Low to High"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "price-high" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("price-high")
                    setSortOpen(false)
                  }}
                >
                  {t["category.priceHighToLow"] || "Price: High to Low"}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "rating" ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSortOption("rating")
                    setSortOpen(false)
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
            <div key={filter} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
              <span>{filter}</span>
              <button onClick={() => toggleFilter(filter)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button onClick={() => setActiveFilters([])} className="text-sm text-gray-500 hover:text-gray-700 ml-2">
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              {t["category.next"] || "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
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
  )
}
