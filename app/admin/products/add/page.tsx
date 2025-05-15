"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { addProduct } from "@/lib/storage"
import { Product } from "@/types/product"
import Image from "next/image"

// Sample categories
const categories = [
  { id: "men", name: "Erkaklar" },
  { id: "women", name: "Ayollar" },
  { id: "kids", name: "Bolalar" },
]

// Sample subcategories
const subcategories = {
  men: [
    { id: "footwear", name: "Oyoq kiyim" },
    { id: "perfumes", name: "Atirlar" },
    { id: "accessories", name: "Aksessuarlar" },
    { id: "clothing", name: "Kiyimlar" },
  ],
  women: [
    { id: "footwear", name: "Oyoq kiyim" },
    { id: "perfumes", name: "Atirlar" },
    { id: "accessories", name: "Aksessuarlar" },
    { id: "clothing", name: "Kiyimlar" },
    { id: "bags", name: "Sumkalar" },
  ],
  kids: [
    { id: "footwear", name: "Oyoq kiyim" },
    { id: "clothing", name: "Kiyimlar" },
    { id: "toys", name: "O'yinchoqlar" },
  ],
}

export default function AddProductPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [variants, setVariants] = useState([{ size: "", color: "", stock: 0 }])
  const formRef = useRef<HTMLFormElement>(null)

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result.toString())
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Add variant
  const addVariant = () => {
    setVariants((prev) => [...prev, { size: "", color: "", stock: 0 }])
  }

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }

  // Update variant
  const updateVariant = (index: number, field: string, value: string | number) => {
    setVariants((prev) => prev.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const product: Omit<Product, "id" | "createdAt"> = {
      name: formData.get("name") as string,
      category: selectedCategory,
      subcategory: formData.get("subcategory") as string,
      price: Number(formData.get("price")),
      discount: Number(formData.get("discount")) || 0,
      stock: Number(formData.get("stock")),
      description: formData.get("description") as string,
      features: formData.get("features") as string,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      images,
      variants,
    }

    addProduct(product)
    console.log("Product added:", product)
    router.push("/admin/products")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yangi mahsulot qo&apos;shish</h1>
          <p className="text-muted-foreground">Yangi mahsulot ma&apos;lumotlarini kiriting</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Asosiy ma&apos;lumotlar</TabsTrigger>
          <TabsTrigger value="images">Rasmlar</TabsTrigger>
          <TabsTrigger value="variants">Variantlar</TabsTrigger>
        </TabsList>

        <form ref={formRef} onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Mahsulot nomi</Label>
                  <Input id="name" name="name" placeholder="Mahsulot nomini kiriting" required />
                </div>

                <div>
                  <Label htmlFor="category">Kategoriya</Label>
                  <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subkategoriya</Label>
                  <Select disabled={!selectedCategory} name="subcategory" required>
                    <SelectTrigger id="subcategory">
                      <SelectValue placeholder="Subkategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory &&
                        subcategories[selectedCategory as keyof typeof subcategories].map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Narxi (so&apos;m)</Label>
                  <Input id="price" name="price" type="number" min="0" placeholder="0" required />
                </div>

                <div>
                  <Label htmlFor="discount">Chegirma (foizda)</Label>
                  <Input id="discount" name="discount" type="number" min="0" max="100" placeholder="0" />
                </div>

                <div>
                  <Label htmlFor="stock">Umumiy miqdori</Label>
                  <Input id="stock" name="stock" type="number" min="0" placeholder="0" required />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mahsulot haqida batafsil ma'lumot"
                  className="min-h-32"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="features">Xususiyatlari</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="Mahsulotning asosiy xususiyatlari"
                  className="min-h-24"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" name="featured" />
                  <Label htmlFor="featured">Tavsiya etilgan mahsulot</Label>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="published" name="published" defaultChecked />
                  <Label htmlFor="published">Nashr qilish</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <Label>Mahsulot rasmlari</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50">
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Rasm yuklash</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP</p>
                      </div>
                      <Input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Mahsulot variantlari</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                      <Plus className="h-4 w-4 mr-2" />
                      Variant qo&apos;shish
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                          <div>
                            <Label htmlFor={`size-${index}`}>O&apos;lcham</Label>
                            <Input
                              id={`size-${index}`}
                              value={variant.size}
                              onChange={(e) => updateVariant(index, "size", e.target.value)}
                              placeholder="M, L, XL, 42, 43..."
                            />
                          </div>
                          <div>
                            <Label htmlFor={`color-${index}`}>Rang</Label>
                            <Input
                              id={`color-${index}`}
                              value={variant.color}
                              onChange={(e) => updateVariant(index, "color", e.target.value)}
                              placeholder="Qora, Oq, Qizil..."
                            />
                          </div>
                          <div>
                            <Label htmlFor={`stock-${index}`}>Miqdori</Label>
                            <Input
                              id={`stock-${index}`}
                              type="number"
                              min="0"
                              value={variant.stock}
                              onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        {variants.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariant(index)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Bekor qilish
            </Button>
            <Button type="submit">Saqlash</Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}