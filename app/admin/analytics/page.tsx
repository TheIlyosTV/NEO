"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, Users, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for charts
const salesData = [
  { name: "Yan", total: 4500000 },
  { name: "Fev", total: 3800000 },
  { name: "Mar", total: 5200000 },
  { name: "Apr", total: 4900000 },
  { name: "May", total: 6300000 },
  { name: "Iyn", total: 5800000 },
  { name: "Iyl", total: 6100000 },
  { name: "Avg", total: 7200000 },
  { name: "Sen", total: 6700000 },
  { name: "Okt", total: 7800000 },
  { name: "Noy", total: 8500000 },
  { name: "Dek", total: 9200000 },
]

const visitorsData = [
  { name: "Yan", visitors: 1200 },
  { name: "Fev", visitors: 1400 },
  { name: "Mar", visitors: 1800 },
  { name: "Apr", visitors: 1600 },
  { name: "May", visitors: 2100 },
  { name: "Iyn", visitors: 1900 },
  { name: "Iyl", visitors: 2200 },
  { name: "Avg", visitors: 2500 },
  { name: "Sen", visitors: 2300 },
  { name: "Okt", visitors: 2700 },
  { name: "Noy", visitors: 3000 },
  { name: "Dek", visitors: 3200 },
]

const categoryData = [
  { name: "Erkaklar", value: 45 },
  { name: "Ayollar", value: 35 },
  { name: "Bolalar", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const productPerformanceData = [
  { name: "Oyoq kiyim", erkaklar: 42, ayollar: 35, bolalar: 15 },
  { name: "Atirlar", erkaklar: 28, ayollar: 48, bolalar: 5 },
  { name: "Aksessuarlar", erkaklar: 15, ayollar: 30, bolalar: 10 },
  { name: "Kiyimlar", erkaklar: 35, ayollar: 40, bolalar: 25 },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Statistika</h1>
        <p className="text-muted-foreground">Saytingiz statistikasi va tahlillar</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Umumiy</TabsTrigger>
            <TabsTrigger value="sales">Sotuvlar</TabsTrigger>
            <TabsTrigger value="products">Mahsulotlar</TabsTrigger>
            <TabsTrigger value="customers">Mijozlar</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami daromad</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">70,500,000 so&apos;m</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1%
                    </span>
                    o&apos;tgan yilga nisbatan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Buyurtmalar</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +12.2%
                    </span>
                    o&apos;tgan yilga nisbatan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Foydalanuvchilar</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+5,840</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +32.5%
                    </span>
                    o&apos;tgan yilga nisbatan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Konversiya darajasi</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-red-500 flex items-center mr-1">
                      <ArrowDownRight className="h-3 w-3 mr-1" /> -0.5%
                    </span>
                    o&apos;tgan yilga nisbatan
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sotuvlar statistikasi</CardTitle>
                  <CardDescription>So&apos;nggi 12 oy uchun sotuvlar</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        tickFormatter={(value) =>
                          new Intl.NumberFormat("uz-UZ", {
                            notation: "compact",
                            compactDisplay: "short",
                            maximumFractionDigits: 1,
                          }).format(value)
                        }
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          new Intl.NumberFormat("uz-UZ", {
                            style: "currency",
                            currency: "UZS",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(value)
                        }
                      />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" name="Sotuvlar" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Kategoriyalar bo&apos;yicha sotuvlar</CardTitle>
                  <CardDescription>Kategoriyalar bo&apos;yicha sotuvlar ulushi</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Saytga tashriflar</CardTitle>
                  <CardDescription>Songgi 12 oy uchun tashriflar</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={visitorsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visitors" stroke="#82ca9d" name="Tashriflar" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Mahsulot kategoriyalari</CardTitle>
                  <CardDescription>Kategoriyalar bo&apos;yicha mahsulot ko&apos;rsatkichlari</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={productPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="erkaklar" fill="#8884d8" name="Erkaklar" />
                      <Bar dataKey="ayollar" fill="#82ca9d" name="Ayollar" />
                      <Bar dataKey="bolalar" fill="#ffc658" name="Bolalar" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sotuvlar statistikasi</CardTitle>
                <CardDescription>Batafsil sotuvlar statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Sotuvlar statistikasi sahifasi tayyorlanmoqda...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Mahsulotlar statistikasi</CardTitle>
                <CardDescription>Batafsil mahsulotlar statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Mahsulotlar statistikasi sahifasi tayyorlanmoqda...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Mijozlar statistikasi</CardTitle>
                <CardDescription>Batafsil mijozlar statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Mijozlar statistikasi sahifasi tayyorlanmoqda...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Vaqt oralig'i" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">So&apos;nggi hafta</SelectItem>
            <SelectItem value="month">So&apos;nggi oy</SelectItem>
            <SelectItem value="quarter">So&apos;nggi chorak</SelectItem>
            <SelectItem value="year">So&apos;nggi yil</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}