// lib/storage.ts
import { Product } from "@/types/product"
import { v4 as uuidv4 } from "uuid"

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return []
  const products = localStorage.getItem("products")
  return products ? JSON.parse(products) : []
}

export const addProduct = (product: Omit<Product, "id" | "createdAt">): Product => {
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
  const products = getProducts()
  const updatedProducts = [...products, newProduct]
  localStorage.setItem("products", JSON.stringify(updatedProducts))
  return newProduct
}

export const clearProducts = () => {
  localStorage.removeItem("products")
}