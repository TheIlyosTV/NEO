"use client"

import { useState } from "react"
import { BarChart3, DollarSign, Package, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bosh sahifa</h1>
        <p className="text-muted-foreground">Saytingiz statistikasi va so&apos;nggi ma&apos;lumotlar</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Umumiy ko&apos;rinish</TabsTrigger>
          <TabsTrigger value="analytics">Statistika</TabsTrigger>
          <TabsTrigger value="reports">Hisobotlar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami daromad</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,500,000 so&apos;m</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1%
                  </span>
                  o&apos;tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buyurtmalar</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12.2%
                  </span>
                  o&apos;tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mahsulotlar</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +8.4%
                  </span>
                  o&apos;tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Foydalanuvchilar</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-red-500 flex items-center mr-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> -2.5%
                  </span>
                  o&apos;tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>So&apos;nggi buyurtmalar</CardTitle>
                <CardDescription>Bu oy qilingan so&apos;nggi 5 ta buyurtma</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyurtma ID</TableHead>
                      <TableHead>Mijoz</TableHead>
                      <TableHead>Holati</TableHead>
                      <TableHead className="text-right">Narxi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#4832</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span>Javohir Doe</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Yetkazilgan</Badge>
                      </TableCell>
                      <TableCell className="text-right">450,000 so&apos;m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#4831</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>SA</AvatarFallback>
                          </Avatar>
                          <span>Sarvar Alimov</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-orange-500">Yuborilmoqda</Badge>
                      </TableCell>
                      <TableCell className="text-right">780,000 so&apos;m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#4830</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>GU</AvatarFallback>
                          </Avatar>
                          <span>Gulnora Usmonova</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge>Tayyorlanmoqda</Badge>
                      </TableCell>
                      <TableCell className="text-right">320,000 so&apos;m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#4829</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <span>Olim Mahmudov</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Yetkazilgan</Badge>
                      </TableCell>
                      <TableCell className="text-right">650,000 so&apos;m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#4828</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>ZK</AvatarFallback>
                          </Avatar>
                          <span>Zarina Karimova</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Yetkazilgan</Badge>
                      </TableCell>
                      <TableCell className="text-right">520,000 so&apos;m</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ko&apos;p sotilgan mahsulotlar</CardTitle>
                <CardDescription>Eng ko&apos;p sotilgan 5 ta mahsulot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Erkaklar uchun klassik tufli</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Erkaklar</span>
                        <span className="mx-1">•</span>
                        <span>Oyoq kiyim</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">128 dona</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Ayollar uchun parfyum</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Ayollar</span>
                        <span className="mx-1">•</span>
                        <span>Atirlar</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">96 dona</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Sport krossovka</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Erkaklar</span>
                        <span className="mx-1">•</span>
                        <span>Oyoq kiyim</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">87 dona</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Ayollar uchun sumka</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Ayollar</span>
                        <span className="mx-1">•</span>
                        <span>Aksessuarlar</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">76 dona</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Erkaklar uchun atir</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Erkaklar</span>
                        <span className="mx-1">•</span>
                        <span>Atirlar</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">65 dona</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistika</CardTitle>
              <CardDescription>Saytingiz statistikasi va tahlillar</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Statistika ma&apos;lumotlari</h3>
                <p className="text-sm text-muted-foreground">Bu yerda batafsil statistika ma&apos;lumotlari ko&apos;rsatiladi</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hisobotlar</CardTitle>
              <CardDescription>Saytingiz hisobotlari va tahlillar</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Hisobot ma&apos;lumotlari</h3>
                <p className="text-sm text-muted-foreground">Bu yerda batafsil hisobot ma&apos;lumotlari ko&apos;rsatiladi</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
