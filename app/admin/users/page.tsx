"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Mail, Phone, ArrowUpDown, Eye, UserCog, UserX } from "lucide-react"

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

// Sample users data
const users = [
  {
    id: "USER-1001",
    name: "Javohir Doe",
    email: "javohir@example.com",
    phone: "+998 90 123 4567",
    orders: 8,
    status: "Faol",
    lastActive: "Bugun",
    role: "Mijoz",
  },
  {
    id: "USER-1002",
    name: "Sarvar Alimov",
    email: "sarvar@example.com",
    phone: "+998 91 234 5678",
    orders: 12,
    status: "Faol",
    lastActive: "Bugun",
    role: "Mijoz",
  },
  {
    id: "USER-1003",
    name: "Gulnora Usmonova",
    email: "gulnora@example.com",
    phone: "+998 99 345 6789",
    orders: 5,
    status: "Faol",
    lastActive: "Kecha",
    role: "Mijoz",
  },
  {
    id: "USER-1004",
    name: "Olim Mahmudov",
    email: "olim@example.com",
    phone: "+998 93 456 7890",
    orders: 3,
    status: "Faol",
    lastActive: "3 kun oldin",
    role: "Mijoz",
  },
  {
    id: "USER-1005",
    name: "Zarina Karimova",
    email: "zarina@example.com",
    phone: "+998 94 567 8901",
    orders: 0,
    status: "Nofaol",
    lastActive: "2 hafta oldin",
    role: "Mijoz",
  },
  {
    id: "ADMIN-101",
    name: "Admin Adminov",
    email: "admin@example.com",
    phone: "+998 90 987 6543",
    orders: 0,
    status: "Faol",
    lastActive: "Bugun",
    role: "Admin",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Foydalanuvchilar</h1>
        <p className="text-muted-foreground">Barcha foydalanuvchilarni ko&apos;rish va boshqarish</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Foydalanuvchilarni qidirish..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1">
                  Foydalanuvchi
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Aloqa</TableHead>
              <TableHead>Buyurtmalar</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>So&apos;nggi faollik</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge variant="outline" className="mr-1">
                          {user.role}
                        </Badge>
                        <span>{user.id}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-3 w-3" />
                      {user.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>
                  <Badge className={user.status === "Faol" ? "bg-green-500" : "bg-red-500"}>{user.status}</Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
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
                        <span>Profil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Tahrirlash</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Bloklash</span>
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
