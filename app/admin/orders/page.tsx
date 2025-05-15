"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Eye, Truck, XCircle } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample orders data
const orders = [
  {
    id: "#4832",
    customer: {
      name: "Javohir Doe",
      email: "javohir@example.com",
    },
    date: "23.05.2023",
    status: "Yetkazilgan",
    items: 3,
    total: 450000,
  },
  {
    id: "#4831",
    customer: {
      name: "Sarvar Alimov",
      email: "sarvar@example.com",
    },
    date: "22.05.2023",
    status: "Yuborilmoqda",
    items: 2,
    total: 780000,
  },
  {
    id: "#4830",
    customer: {
      name: "Gulnora Usmonova",
      email: "gulnora@example.com",
    },
    date: "21.05.2023",
    status: "Tayyorlanmoqda",
    items: 1,
    total: 320000,
  },
  {
    id: "#4829",
    customer: {
      name: "Olim Mahmudov",
      email: "olim@example.com",
    },
    date: "20.05.2023",
    status: "Yetkazilgan",
    items: 4,
    total: 650000,
  },
  {
    id: "#4828",
    customer: {
      name: "Zarina Karimova",
      email: "zarina@example.com",
    },
    date: "19.05.2023",
    status: "Yetkazilgan",
    items: 2,
    total: 520000,
  },
  {
    id: "#4827",
    customer: {
      name: "Bobur Kamolov",
      email: "bobur@example.com",
    },
    date: "18.05.2023",
    status: "Bekor qilingan",
    items: 3,
    total: 420000,
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Buyurtmalar</h1>
        <p className="text-muted-foreground">Barcha buyurtmalarni ko&apos;rish va boshqarish</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buyurtmalarni qidirish..."
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1">
                  Buyurtma ID
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Mijoz</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>Mahsulotlar</TableHead>
              <TableHead>Jami</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={order.customer.name} />
                      <AvatarFallback>{order.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{order.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.status === "Yetkazilgan"
                        ? "bg-green-500"
                        : order.status === "Yuborilmoqda"
                          ? "bg-orange-500"
                          : order.status === "Tayyorlanmoqda"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total.toLocaleString()} so&apos;m</TableCell>
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
                        <span>Batafsil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="mr-2 h-4 w-4" />
                        <span>Holatini o&apos;zgartirish</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Bekor qilish</span>
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
