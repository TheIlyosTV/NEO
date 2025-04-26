"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, LogOut, Package, User, CreditCard, MapPin, Heart, Edit, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"

// Mock order data
const orders = [
  {
    id: "ORD-2023-1001",
    date: "October 15, 2023",
    total: 129.98,
    status: "Delivered",
    items: [
      { id: 1, name: "Slim Fit Cotton Shirt", quantity: 1, price: 49.99 },
      { id: 2, name: "Denim Jeans", quantity: 1, price: 79.99 },
    ],
  },
  {
    id: "ORD-2023-0892",
    date: "September 28, 2023",
    total: 159.99,
    status: "Delivered",
    items: [{ id: 3, name: "Minimalist Watch", quantity: 1, price: 159.99 }],
  },
  {
    id: "ORD-2023-0754",
    date: "August 12, 2023",
    total: 219.97,
    status: "Delivered",
    items: [
      { id: 4, name: "Leather Sneakers", quantity: 1, price: 129.99 },
      { id: 5, name: "Leather Belt", quantity: 1, price: 39.99 },
      { id: 6, name: "Patterned Socks Set", quantity: 1, price: 49.99 },
    ],
  },
]

// Mock address data
const addresses = [
  {
    id: 1,
    type: "Home",
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "John Doe",
    address: "456 Office Park",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    isDefault: false,
  },
]

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    cardType: "Visa",
    lastFour: "4242",
    expiryDate: "09/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    cardType: "Mastercard",
    lastFour: "8888",
    expiryDate: "12/24",
    isDefault: false,
  },
]

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, updateUserProfile } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    toast({
      title: t.logoutSuccess || "Logged out successfully",
      description: t.logoutDescription || "You have been logged out of your account.",
    })
    router.push("/auth")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile(profileForm)
    setEditProfileOpen(false)
    toast({
      title: t.profileUpdated || "Profile updated",
      description: t.profileUpdatedDescription || "Your profile information has been updated successfully.",
    })
  }

  const handleAddressDelete = () => {
    toast({
      title: t.addressDeleted || "Address deleted",
      description: t.addressDeletedDescription || "The selected address has been removed from your account.",
    })
  }

  const handlePaymentDelete = () => {
    toast({
      title: t.paymentDeleted || "Payment method deleted",
      description: t.paymentDeletedDescription || "The selected payment method has been removed from your account.",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          {t.home}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">{t.myAccount}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            {/* User profile card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="bg-purple-600 h-24 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="h-full w-full rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                          width={96}
                          height={96}
                          priority
                        />
                      ) : (
                        <User className="h-10 w-10 text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-14 pb-6 px-6 text-center">
                <h3 className="font-bold text-xl">{user.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700 text-purple-600"
                    onClick={() => setEditProfileOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {t.editProfile}
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation menu */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-2">{t.accountMenu || "Account Menu"}</h3>

                <nav className="mt-4 space-y-1">
                  <button
                    onClick={() => handleTabChange("overview")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "overview" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${activeTab === "overview" ? "bg-purple-200" : "bg-gray-100"}`}
                    >
                      <User className={`h-5 w-5 ${activeTab === "overview" ? "text-purple-700" : "text-gray-500"}`} />
                    </div>
                    <span className="font-medium">{t.accountOverview}</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "orders" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${activeTab === "orders" ? "bg-purple-200" : "bg-gray-100"}`}>
                      <Package className={`h-5 w-5 ${activeTab === "orders" ? "text-purple-700" : "text-gray-500"}`} />
                    </div>
                    <span className="font-medium">{t.orderHistory || "Order History"}</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("addresses")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "addresses" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${activeTab === "addresses" ? "bg-purple-200" : "bg-gray-100"}`}
                    >
                      <MapPin
                        className={`h-5 w-5 ${activeTab === "addresses" ? "text-purple-700" : "text-gray-500"}`}
                      />
                    </div>
                    <span className="font-medium">{t.addresses}</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("payment")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "payment" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${activeTab === "payment" ? "bg-purple-200" : "bg-gray-100"}`}>
                      <CreditCard
                        className={`h-5 w-5 ${activeTab === "payment" ? "text-purple-700" : "text-gray-500"}`}
                      />
                    </div>
                    <span className="font-medium">{t.paymentMethods}</span>
                  </button>

                  <Link
                    href="/wishlist"
                    className="flex items-center w-full px-4 py-3 rounded-xl transition-all hover:bg-gray-100"
                  >
                    <div className="p-2 rounded-lg mr-3 bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="font-medium">{t.wishlist}</span>
                  </Link>
                </nav>

                <Separator className="my-4" />

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                >
                  <div className="p-2 rounded-lg mr-3 bg-red-100">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium">{t.signOut}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.accountOverview}</CardTitle>
                  <CardDescription className="text-base">{t.viewAndUpdateAccount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-medium">{t.personalInformation}</h3>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">{t.name}</p>
                          <p className="text-lg">{user.name}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">{t.email}</p>
                          <p className="text-lg">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                          <DialogTrigger asChild>
                            <Button className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              {t.editProfile}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t.editProfile}</DialogTitle>
                              <DialogDescription>{t.editProfileDescription}</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleProfileUpdate}>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">{t.name}</Label>
                                  <Input
                                    id="name"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">{t.email}</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">{t.saveChanges}</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium">{t.recentOrders}</h3>
                      <Separator className="my-4" />
                      {orders.length > 0 ? (
                        <div className="space-y-6">
                          {orders.slice(0, 2).map((order) => (
                            <div key={order.id} className="border rounded-lg p-6">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                  <p className="font-medium text-lg">{order.id}</p>
                                  <p className="text-gray-500">{order.date}</p>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                  <p className="font-medium text-lg">${order.total.toFixed(2)}</p>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p className="text-gray-500">
                                  {order.items.length} {order.items.length === 1 ? t.item : t.items}
                                </p>
                              </div>
                              <div className="mt-4">
                                <Button variant="outline" onClick={() => handleTabChange("orders")}>
                                  {t.viewDetails}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">{t.noOrders}</p>
                      )}
                      {orders.length > 2 && (
                        <div className="mt-6">
                          <Button onClick={() => handleTabChange("orders")}>{t.viewAllOrders}</Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-medium">{t.defaultAddress}</h3>
                      <Separator className="my-4" />
                      {addresses.length > 0 ? (
                        <div className="border rounded-lg p-6">
                          <p className="font-medium text-lg">{addresses[0].name}</p>
                          <p className="text-gray-500">{addresses[0].address}</p>
                          <p className="text-gray-500">
                            {addresses[0].city}, {addresses[0].state} {addresses[0].zip}
                          </p>
                          <p className="text-gray-500">{addresses[0].country}</p>
                          <div className="mt-4">
                            <Button variant="outline" onClick={() => handleTabChange("addresses")}>
                              {t.manageAddresses}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">{t.noAddresses}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.orderHistory}</CardTitle>
                  <CardDescription className="text-base">{t.viewAndTrackOrders}</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-8">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                              <h3 className="text-xl font-medium">{order.id}</h3>
                              <p className="text-gray-500">{order.date}</p>
                            </div>
                            <div className="mt-2 md:mt-0 text-right">
                              <p className="font-medium text-lg">${order.total.toFixed(2)}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-gray-500">{t.quantity}: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${item.price.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex justify-end">
                            <Button>{t.trackOrder}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-xl font-medium text-gray-900">{t.noOrders}</h3>
                      <p className="mt-1 text-gray-500">{t.noOrdersDescription}</p>
                      <div className="mt-6">
                        <Button asChild>
                          <Link href="/">{t.continueShopping}</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "addresses" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.addresses}</CardTitle>
                  <CardDescription className="text-base">{t.manageAddresses}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">{address.type}</p>
                            {address.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                {t.default}
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={handleAddressDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-base">{address.name}</p>
                          <p className="text-gray-500">{address.address}</p>
                          <p className="text-gray-500">
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p className="text-gray-500">{address.country}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <MapPin className="h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">{t.addNewAddress}</h3>
                      <p className="mt-1 text-gray-500">{t.addNewAddressDescription}</p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        {t.addAddress}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.paymentMethods}</CardTitle>
                  <CardDescription className="text-base">{t.managePaymentMethods}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">
                              {payment.cardType} •••• {payment.lastFour}
                            </p>
                            {payment.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                {t.default}
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={handlePaymentDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-500">{t.expires} {payment.expiryDate}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <CreditCard className="h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">{t.addNewPaymentMethod}</h3>
                      <p className="mt-1 text-gray-500">{t.addNewPaymentMethodDescription}</p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        {t.addPaymentMethod}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}