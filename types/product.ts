// types/product.ts
export interface Product {
    id: string
    name: string
    category: string
    subcategory: string
    price: number
    discount: number
    stock: number
    description: string
    features: string
    featured: boolean
    published: boolean
    images: string[]
    variants: { size: string; color: string; stock: number }[]
    createdAt: string
  }