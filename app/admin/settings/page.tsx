"use client"

import { useState } from "react"
import { User, Bell, Lock, Globe, Store,  Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // State for Profile form
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "Adminov",
    email: "admin@example.com",
    phone: "+998 90 123 45 67",
    bio: "",
    language: "uz",
    timezone: "asia-tashkent",
  })

  // State for Store form
  const [store, setStore] = useState({
    name: "E-Commerce Do'koni",
    description: "Erkaklar, ayollar va bolalar uchun kiyim-kechak, poyabzal va aksessuarlar do'koni.",
    email: "info@example.com",
    phone: "+998 71 123 45 67",
    address: "Toshkent sh., Shayxontohur tumani, Navoiy ko'chasi, 36-uy",
    currency: "uzs",
    taxRate: "12",
    paymentMethods: "all",
    deliveryMethods: "all",
  })

  // State for Notifications
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailStock: true,
    emailCustomers: false,
    emailMarketing: false,
    systemOrders: true,
    systemSecurity: true,
    systemUpdates: false,
  })

  // State for Security
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  })

  const handleSave = (section: string) => {
    setIsSaving(true)
    setTimeout(() => {
      if (section === "profile") {
        console.log("Profile saved:", profile)
      } else if (section === "store") {
        console.log("Store settings saved:", store)
      } else if (section === "notifications") {
        console.log("Notifications settings saved:", notifications)
      } else if (section === "security") {
        console.log("Security settings saved:", security)
      }
      setIsSaving(false)
    }, 1000) // Simulate async save
  }

  const handlePasswordChange = () => {
    setIsSaving(true)
    setTimeout(() => {
      if (security.newPassword !== security.confirmPassword) {
        console.error("New password and confirm password do not match")
      } else {
        console.log("Password changed:", { currentPassword: security.currentPassword, newPassword: security.newPassword })
      }
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sozlamalar</h1>
        <p className="text-muted-foreground">Tizim va profil sozlamalarini boshqarish</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline-block">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline-block">Do&apos;kon</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline-block">Bildirishnomalar</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline-block">Xavfsizlik</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil ma&apos;lumotlari</CardTitle>
              <CardDescription>Profil ma&apos;lumotlaringizni yangilang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Rasmni o&apos;zgartirish
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Ism</Label>
                      <Input
                        id="first-name"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Familiya</Label>
                      <Input
                        id="last-name"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon raqam</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Biografiya</Label>
                  <Textarea
                    id="bio"
                    placeholder="O'zingiz haqingizda qisqacha ma'lumot"
                    className="mt-1 min-h-24"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Til</Label>
                    <Select
                      value={profile.language}
                      onValueChange={(value) => setProfile({ ...profile, language: value })}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Tilni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">O&apos;zbek</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Vaqt mintaqasi</Label>
                    <Select
                      value={profile.timezone}
                      onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Vaqt mintaqasini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-tashkent">Toshkent (GMT+5)</SelectItem>
                        <SelectItem value="europe-moscow">Moskva (GMT+3)</SelectItem>
                        <SelectItem value="europe-london">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Bekor qilish</Button>
              <Button onClick={() => handleSave("profile")} disabled={isSaving}>
                {isSaving ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Do&apos;kon ma&apos;lumotlari</CardTitle>
              <CardDescription>Do&apos;koningiz haqidagi asosiy ma&apos;lumotlarni yangilang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Do&apos;kon nomi</Label>
                  <Input
                    id="store-name"
                    value={store.name}
                    onChange={(e) => setStore({ ...store, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-description">Do&apos;kon tavsifi</Label>
                  <Textarea
                    id="store-description"
                    placeholder="Do'koningiz haqida qisqacha ma'lumot"
                    className="min-h-24"
                    value={store.description}
                    onChange={(e) => setStore({ ...store, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Do&apos;kon email</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={store.email}
                      onChange={(e) => setStore({ ...store, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Do&apos;kon telefon raqami</Label>
                    <Input
                      id="store-phone"
                      type="tel"
                      value={store.phone}
                      onChange={(e) => setStore({ ...store, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-address">Do&apos;kon manzili</Label>
                  <Textarea
                    id="store-address"
                    placeholder="Do'kon manzilini kiriting"
                    value={store.address}
                    onChange={(e) => setStore({ ...store, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-currency">Valyuta</Label>
                    <Select
                      value={store.currency}
                      onValueChange={(value) => setStore({ ...store, currency: value })}
                    >
                      <SelectTrigger id="store-currency">
                        <SelectValue placeholder="Valyutani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uzs">UZS (so&apos;m)</SelectItem>
                        <SelectItem value="usd">USD (dollar)</SelectItem>
                        <SelectItem value="eur">EUR (yevro)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Soliq stavkasi (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      value={store.taxRate}
                      onChange={(e) => setStore({ ...store, taxRate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">To&apos;lov sozlamalari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-methods">To&apos;lov usullari</Label>
                    <Select
                      value={store.paymentMethods}
                      onValueChange={(value) => setStore({ ...store, paymentMethods: value })}
                    >
                      <SelectTrigger id="payment-methods">
                        <SelectValue placeholder="To'lov usullarini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barcha to&apos;lov usullari</SelectItem>
                        <SelectItem value="card">Faqat karta orqali</SelectItem>
                        <SelectItem value="cash">Faqat naqd pul orqali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-methods">Yetkazib berish usullari</Label>
                    <Select
                      value={store.deliveryMethods}
                      onValueChange={(value) => setStore({ ...store, deliveryMethods: value })}
                    >
                      <SelectTrigger id="delivery-methods">
                        <SelectValue placeholder="Yetkazib berish usullarini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barcha yetkazib berish usullari</SelectItem>
                        <SelectItem value="courier">Faqat kuryer orqali</SelectItem>
                        <SelectItem value="pickup">Faqat o&apos;zi olib ketish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Bekor qilish</Button>
              <Button onClick={() => handleSave("store")} disabled={isSaving}>
                {isSaving ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirishnoma sozlamalari</CardTitle>
              <CardDescription>Qanday bildirishnomalarni olishni xohlashingizni sozlang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email bildirishnomalari</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-orders">Yangi buyurtmalar</Label>
                      <p className="text-sm text-muted-foreground">
                        Yangi buyurtma qabul qilinganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="email-orders"
                      checked={notifications.emailOrders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailOrders: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-stock">Kam qolgan mahsulotlar</Label>
                      <p className="text-sm text-muted-foreground">
                        Mahsulot miqdori kam qolganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="email-stock"
                      checked={notifications.emailStock}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailStock: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-customers">Yangi foydalanuvchilar</Label>
                      <p className="text-sm text-muted-foreground">
                        Yangi foydalanuvchi ro&apos;yxatdan o&apos;tganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="email-customers"
                      checked={notifications.emailCustomers}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailCustomers: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">Marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Yangiliklar va maxsus takliflar haqida bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="email-marketing"
                      checked={notifications.emailMarketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tizim bildirishnomalari</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-orders">Buyurtma holati o&apos;zgarishi</Label>
                      <p className="text-sm text-muted-foreground">
                        Buyurtma holati o&apos;zgarganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="system-orders"
                      checked={notifications.systemOrders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemOrders: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-security">Xavfsizlik ogohlantirishlari</Label>
                      <p className="text-sm text-muted-foreground">
                        Hisobingizga kirish urinishlari haqida bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="system-security"
                      checked={notifications.systemSecurity}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemSecurity: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">Tizim yangilanishlari</Label>
                      <p className="text-sm text-muted-foreground">
                        Tizim yangilanganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Bekor qilish</Button>
              <Button onClick={() => handleSave("notifications")} disabled={isSaving}>
                {isSaving ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Xavfsizlik sozlamalari</CardTitle>
              <CardDescription>Hisobingiz xavfsizligini boshqarish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parolni o&apos;zgartirish</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Joriy parol</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showCurrentPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Yangi parol</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showNewPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Yangi parolni tasdiqlang</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Button onClick={handlePasswordChange} disabled={isSaving} className="mt-2">
                      {isSaving ? "Saqlanmoqda..." : "Parolni o'zgartirish"}
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ikki bosqichli autentifikatsiya</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Ikki bosqichli autentifikatsiya</Label>
                      <p className="text-sm text-muted-foreground">
                        Hisobingizga kirishda qo&apos;shimcha xavfsizlik qatlami qo&apos;shish
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessiyalar</h3>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Joriy sessiya</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Globe className="mr-1 h-3 w-3" />
                          <span>Toshkent, O&apos;zbekiston • Chrome • MacOS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log("All sessions terminated")}
                  >
                    Barcha sessiyalarni tugatish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}