"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Plus, Search, Filter, ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample product data
const products = [
  {
    id: "PROD-1234",
    name: "Erkaklar uchun klassik tufli",
    category: "Erkaklar",
    subcategory: "Oyoq kiyim",
    price: 450000,
    stock: 24,
    status: "Mavjud",
  },
  {
    id: "PROD-1235",
    name: "Ayollar uchun parfyum",
    category: "Ayollar",
    subcategory: "Atirlar",
    price: 320000,
    stock: 18,
    status: "Mavjud",
  },
  {
    id: "PROD-1236",
    name: "Sport krossovka",
    category: "Erkaklar",
    subcategory: "Oyoq kiyim",
    price: 550000,
    stock: 12,
    status: "Mavjud",
  },
  {
    id: "PROD-1237",
    name: "Ayollar uchun sumka",
    category: "Ayollar",
    subcategory: "Aksessuarlar",
    price: 280000,
    stock: 8,
    status: "Kam qoldi",
  },
  {
    id: "PROD-1238",
    name: "Erkaklar uchun atir",
    category: "Erkaklar",
    subcategory: "Atirlar",
    price: 380000,
    stock: 15,
    status: "Mavjud",
  },
  {
    id: "PROD-1239",
    name: "Ayollar uchun baland poshnali tufli",
    category: "Ayollar",
    subcategory: "Oyoq kiyim",
    price: 420000,
    stock: 0,
    status: "Tugagan",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Mahsulotlar</h1>
        <p className="text-muted-foreground">Barcha mahsulotlarni ko&apos;rish va boshqarish</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Mahsulotlarni qidirish..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Link href="/admin/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yangi mahsulot
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rasm</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Nomi
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Narxi</TableHead>
              <TableHead>Miqdori</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{product.category}</span>
                    <span className="text-xs text-muted-foreground">{product.subcategory}</span>
                  </div>
                </TableCell>
                <TableCell>{product.price.toLocaleString()} so&apos;m</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      product.status === "Mavjud"
                        ? "bg-green-500"
                        : product.status === "Kam qoldi"
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Amallar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Amallar</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Ko&apos;rish</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Tahrirlash</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>O&apos;chirish</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
