"use client"

import { useState } from "react"
import { Layers, Plus, Search, MoreHorizontal, Pencil, Trash2, ArrowUpDown } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample categories data
const categories = [
  {
    id: "CAT-1",
    name: "Erkaklar",
    subcategories: ["Oyoq kiyim", "Atirlar", "Aksessuarlar", "Kiyimlar"],
    products: 124,
    status: "Faol",
  },
  {
    id: "CAT-2",
    name: "Ayollar",
    subcategories: ["Oyoq kiyim", "Atirlar", "Aksessuarlar", "Kiyimlar", "Sumkalar"],
    products: 156,
    status: "Faol",
  },
  {
    id: "CAT-3",
    name: "Bolalar",
    subcategories: ["Oyoq kiyim", "Kiyimlar", "O'yinchoqlar"],
    products: 48,
    status: "Faol",
  },
  {
    id: "CAT-4",
    name: "Elektronika",
    subcategories: ["Telefonlar", "Kompyuterlar", "Aksessuarlar"],
    products: 0,
    status: "Nofaol",
  },
]

export default function CategoriesPage() {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Kategoriyalar</h1>
        <p className="text-muted-foreground">Barcha kategoriyalarni ko&apos;rish va boshqarish</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Kategoriyalarni qidirish..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi kategoriya
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yangi kategoriya qo&apos;shish</DialogTitle>
              <DialogDescription>Yangi kategoriya ma&apos;lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="category-name">Kategoriya nomi</Label>
                  <Input id="category-name" placeholder="Kategoriya nomini kiriting" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="parent-category">Asosiy kategoriya</Label>
                  <Select>
                    <SelectTrigger id="parent-category" className="mt-1">
                      <SelectValue placeholder="Asosiy kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Yo&apos;q (Asosiy kategoriya)</SelectItem>
                      <SelectItem value="men">Erkaklar</SelectItem>
                      <SelectItem value="women">Ayollar</SelectItem>
                      <SelectItem value="kids">Bolalar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Holati</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue placeholder="Holatini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="inactive">Nofaol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit">Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1">
                  Nomi
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Subkategoriyalar</TableHead>
              <TableHead>Mahsulotlar</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    {category.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.map((sub, index) => (
                      <Badge key={index} variant="outline" className="mr-1">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{category.products}</TableCell>
                <TableCell>
                  <Badge className={category.status === "Faol" ? "bg-green-500" : "bg-red-500"}>
                    {category.status}
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
