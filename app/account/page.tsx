"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronRight,
  LogOut,
  Package,
  User,
  CreditCard,
  MapPin,
  Heart,
  Edit,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"

export default function AccountPage() {
  const router = useRouter()
  const {
    user,
    logout,
    updateUserProfile,
    addresses,
    paymentMethods,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultAddress,
    setDefaultPaymentMethod,
    isLoading,
  } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [addAddressOpen, setAddAddressOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [editAddressId, setEditAddressId] = useState<number | null>(null)
  const [editPaymentId, setEditPaymentId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "")

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const [addressForm, setAddressForm] = useState({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  const [paymentForm, setPaymentForm] = useState({
    type: "Credit Card" as const,
    cardType: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
      })
      setAvatarPreview(user.avatar || "")
    }
  }, [user])

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateUserProfile({
        ...profileForm,
        avatar: avatarPreview,
      })
      setEditProfileOpen(false)
      toast({
        title: t.profileUpdated || "Profile updated",
        description:
          t.profileUpdatedDescription ||
          "Your profile information has been updated successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.profileUpdateError || "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  const handleAddAddress = async () => {
    try {
      await addAddress(addressForm)
      setAddAddressOpen(false)
      setAddressForm({
        type: "Home",
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      })
      toast({
        title: t.addressAdded || "Address added",
        description:
          t.addressAddedDescription ||
          "New address has been added successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.addressAddError || "Failed to add address",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAddress = async () => {
    if (!editAddressId) return

    try {
      await updateAddress(editAddressId, addressForm)
      setEditAddressId(null)
      setAddressForm({
        type: "Home",
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      })
      toast({
        title: t.addressUpdated || "Address updated",
        description:
          t.addressUpdatedDescription ||
          "Address has been updated successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.addressUpdateError || "Failed to update address",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id)
      toast({
        title: t.addressDeleted || "Address deleted",
        description:
          t.addressDeletedDescription ||
          "Address has been removed successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.addressDeleteError || "Failed to delete address",
        variant: "destructive",
      })
    }
  }

  const handleAddPayment = async () => {
    try {
      const cleanedCardNumber = paymentForm.cardNumber.replace(/\s/g, "")
      const lastFour = cleanedCardNumber.slice(-4)

      await addPaymentMethod({
        type: "Credit Card",
        cardType: paymentForm.cardType.toLowerCase() as
          | "humo"
          | "uzcard"
          | "mastercard"
          | "visa",
        cardImage: `/images/card/${paymentForm.cardType.toLowerCase()}.png`,
        lastFour,
        expiryDate: paymentForm.expiryDate,
        cardName: paymentForm.cardName,
      })

      setAddPaymentOpen(false)
      setPaymentForm({
        type: "Credit Card",
        cardType: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      })

      toast({
        title: t.paymentMethodAdded || "Payment method added",
        description:
          t.paymentMethodAddedDescription ||
          "New payment method has been added successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.paymentAddError || "Failed to add payment method",
        variant: "destructive",
      })
    }
  }

  const handleDeletePayment = async (id: number) => {
    try {
      await deletePaymentMethod(id)
      toast({
        title: t.paymentDeleted || "Payment method deleted",
        description:
          t.paymentDeletedDescription ||
          "Payment method has been removed successfully.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description: t.paymentDeleteError || "Failed to delete payment method",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultAddress = async (id: number) => {
    try {
      await setDefaultAddress(id)
      toast({
        title: t.defaultAddressUpdated || "Default address updated",
        description:
          t.defaultAddressUpdatedDescription ||
          "Your default address has been changed.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description:
          t.defaultAddressUpdateError || "Failed to set default address",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultPayment = async (id: number) => {
    try {
      await setDefaultPaymentMethod(id)
      toast({
        title: t.defaultPaymentUpdated || "Default payment updated",
        description:
          t.defaultPaymentUpdatedDescription ||
          "Your default payment method has been changed.",
      })
    } catch {
      toast({
        title: t.error || "Error",
        description:
          t.defaultPaymentUpdateError || "Failed to set default payment",
        variant: "destructive",
      })
    }
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
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
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
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-2">
                  {t.accountMenu || "Account Menu"}
                </h3>

                <nav className="mt-4 space-y-1">
                  <button
                    onClick={() => handleTabChange("overview")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "overview"
                        ? "bg-purple-100 text-purple-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activeTab === "overview" ? "bg-purple-200" : "bg-gray-100"
                      }`}
                    >
                      <User
                        className={`h-5 w-5 ${
                          activeTab === "overview"
                            ? "text-purple-700"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span className="font-medium">{t.accountOverview}</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "orders"
                        ? "bg-purple-100 text-purple-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activeTab === "orders" ? "bg-purple-200" : "bg-gray-100"
                      }`}
                    >
                      <Package
                        className={`h-5 w-5 ${
                          activeTab === "orders"
                            ? "text-purple-700"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span className="font-medium">
                      {t.orderHistory || "Order History"}
                    </span>
                  </button>

                  <button
                    onClick={() => handleTabChange("addresses")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "addresses"
                        ? "bg-purple-100 text-purple-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activeTab === "addresses"
                          ? "bg-purple-200"
                          : "bg-gray-100"
                      }`}
                    >
                      <MapPin
                        className={`h-5 w-5 ${
                          activeTab === "addresses"
                            ? "text-purple-700"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span className="font-medium">{t.addresses}</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("payment")}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all ${
                      activeTab === "payment"
                        ? "bg-purple-100 text-purple-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activeTab === "payment" ? "bg-purple-200" : "bg-gray-100"
                      }`}
                    >
                      <CreditCard
                        className={`h-5 w-5 ${
                          activeTab === "payment"
                            ? "text-purple-700"
                            : "text-gray-500"
                        }`}
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
          {/* EDIT PROFILE DIALOG */}
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t.editProfile || "Profilni tahrirlash"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-4 py-4">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200">
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-full w-full text-gray-400" />
                      )}
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {t.changeAvatar || "Rasmni o'zgartirish"}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name || "Ism"}</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email || "Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t.save || "Saqlash"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Tab content */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.accountOverview}</CardTitle>
                  <CardDescription className="text-base">
                    {t.viewAndUpdateAccount}
                  </CardDescription>
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
                    </div>

                    <div>
                      <h3 className="text-xl font-medium">{t.defaultAddress}</h3>
                      <Separator className="my-4" />
                      {addresses.length > 0 ? (
                        <div className="border rounded-lg p-6">
                          <p className="font-medium text-lg">
                            {addresses.find((a) => a.isDefault)?.name || addresses[0].name}
                          </p>
                          <p className="text-gray-500">
                            {addresses.find((a) => a.isDefault)?.address ||
                              addresses[0].address}
                          </p>
                          <p className="text-gray-500">
                            {addresses.find((a) => a.isDefault)?.city || addresses[0].city},
                            {addresses.find((a) => a.isDefault)?.state || addresses[0].state}
                            {addresses.find((a) => a.isDefault)?.zip || addresses[0].zip}
                          </p>
                          <p className="text-gray-500">
                            {addresses.find((a) => a.isDefault)?.country ||
                              addresses[0].country}
                          </p>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleTabChange("addresses")}
                            >
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.orderHistory}</CardTitle>
                  <CardDescription className="text-base">{t.viewAndTrackOrders}</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "addresses" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditAddressId(address.id)
                                setAddressForm({
                                  type: address.type,
                                  name: address.name,
                                  address: address.address,
                                  city: address.city,
                                  state: address.state,
                                  zip: address.zip,
                                  country: address.country,
                                })
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleDeleteAddress(address.id)}
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
                        {!address.isDefault && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set as default
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Address Dialog */}
                    <Dialog open={addAddressOpen} onOpenChange={setAddAddressOpen}>
                      <DialogTrigger asChild>
                        <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <Plus className="h-10 w-10 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium">
                            {t.addNewAddress || "Yangi manzil qo'shish"}
                          </h3>
                          <p className="mt-1 text-gray-500">
                            {t.addNewAddressDescription ||
                              "Yangi yetkazib berish manzilini qo'shing"}
                          </p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {t.addNewAddress || "Yangi manzil qo'shish"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {/* Manzil turi */}
                          <div className="space-y-2">
                            <Label htmlFor="type">{t.addressType || "Manzil turi"}</Label>
                            <select
                              id="type"
                              value={addressForm.type}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  type: e.target.value,
                                })
                              }
                              className="w-full border rounded-md p-2"
                            >
                              <option value="Home">{t.home || "Uy"}</option>
                              <option value="Work">{t.work || "Ish joyi"}</option>
                              <option value="Other">{t.other || "Boshqa"}</option>
                            </select>
                          </div>

                          {/* To'liq ism */}
                          <div className="space-y-2">
                            <Label htmlFor="name">{t.fullName || "To'liq ism"}</Label>
                            <Input
                              id="name"
                              value={addressForm.name}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Familiya Ism"
                            />
                          </div>

                          {/* Manzil */}
                          <div className="space-y-2">
                            <Label htmlFor="address">{t.address || "Manzil"}</Label>
                            <Input
                              id="address"
                              value={addressForm.address}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  address: e.target.value,
                                })
                              }
                              placeholder="Ko'cha, uy, kvartira raqami"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* Shahar */}
                            <div className="space-y-2">
                              <Label htmlFor="city">{t.city || "Shahar"}</Label>
                              <Input
                                id="city"
                                value={addressForm.city}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    city: e.target.value,
                                  })
                                }
                                placeholder="Shahar nomi"
                              />
                            </div>

                            {/* Viloyat */}
                            <div className="space-y-2">
                              <Label htmlFor="state">{t.state || "Viloyat"}</Label>
                              <Input
                                id="state"
                                value={addressForm.state}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    state: e.target.value,
                                  })
                                }
                                placeholder="Viloyat nomi"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* Pochta indeksi */}
                            <div className="space-y-2">
                              <Label htmlFor="zip">{t.zipCode || "Pochta indeksi"}</Label>
                              <Input
                                id="zip"
                                value={addressForm.zip}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    zip: e.target.value,
                                  })
                                }
                                placeholder="100000"
                              />
                            </div>

                            {/* Davlat */}
                            <div className="space-y-2">
                              <Label htmlFor="country">{t.country || "Davlat"}</Label>
                              <Input
                                id="country"
                                value={addressForm.country}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    country: e.target.value,
                                  })
                                }
                                placeholder="O'zbekistan"
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={editAddressId ? handleUpdateAddress : handleAddAddress}
                            disabled={!addressForm.name || !addressForm.address}
                          >
                            {editAddressId ? t.update || "Saqlash" : t.save || "Qo'shish"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.paymentMethods}</CardTitle>
                  <CardDescription className="text-base">
                    {t.managePaymentMethods}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Image
                              src={
                                payment.cardImage ||
                                `/images/card/${payment.cardType || "card"}.png`
                              }
                              alt={payment.cardType || "Card"}
                              className="h-8 w-8 mr-3"
                              width={32}
                              height={32}
                            />
                            <div>
                              <p className="font-medium text-lg">
                                {payment.cardType
                                  ? `${payment.cardType} •••• ${payment.lastFour}`
                                  : `•••• ${payment.lastFour}`}
                              </p>
                              <p className="text-sm text-gray-500">{payment.cardName}</p>
                              {payment.isDefault && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                  {t.default}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditPaymentId(payment.id)
                                setPaymentForm({
                                  type: "Credit Card",
                                  cardType: payment.cardType || "",
                                  cardNumber: `•••• •••• •••• ${payment.lastFour}`,
                                  cardName: payment.cardName,
                                  expiryDate: payment.expiryDate,
                                  cvv: "",
                                })
                                setAddPaymentOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleDeletePayment(payment.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-500">
                            {t.expires} {payment.expiryDate}
                          </p>
                        </div>
                        {!payment.isDefault && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultPayment(payment.id)}
                            >
                              Set as default
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Payment Dialog */}
                    <Dialog open={addPaymentOpen} onOpenChange={setAddPaymentOpen}>
                      <DialogTrigger asChild>
                        <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <Plus className="h-10 w-10 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium">
                            {t.addNewPaymentMethod || "Yangi to'lov usuli qo'shish"}
                          </h3>
                          <p className="mt-1 text-gray-500">
                            {t.addNewPaymentMethodDescription || "Karta ma'lumotlarini kiriting"}
                          </p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {editPaymentId
                              ? t.editPaymentMethod || "To'lov usulini tahrirlash"
                              : t.addNewPaymentMethod || "Yangi to'lov usuli qo'shish"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {/* Karta turlari */}
                          <div className="space-y-2">
                            <Label>{t.cardType || "Karta turi"}</Label>
                            <div className="flex flex-wrap gap-2">
                              {["Humo", "Uzcard", "Mastercard", "Visa"].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setPaymentForm({
                                      ...paymentForm,
                                      cardType: type,
                                      cvv:
                                        type === "Mastercard" || type === "Visa"
                                          ? paymentForm.cvv
                                          : "",
                                    })
                                  }}
                                  className={`p-2 border rounded-md flex flex-col items-center w-[calc(50%-0.5rem)] ${
                                    paymentForm.cardType === type
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <Image
                                    src={`/images/card/${type.toLowerCase()}.png`}
                                    alt={type}
                                    className="h-10"
                                    width={40}
                                    height={40}
                                  />
                                  <span className="text-xs mt-1">{type}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Karta raqami */}
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">{t.cardNumber || "Karta raqami"}</Label>
                            <Input
                              id="cardNumber"
                              value={paymentForm.cardNumber}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "")
                                value = value.slice(0, 16)
                                value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                                setPaymentForm({
                                  ...paymentForm,
                                  cardNumber: value,
                                })
                              }}
                              placeholder={
                                paymentForm.cardType === "Humo"
                                  ? "9860 1234 5678 9012"
                                  : paymentForm.cardType === "Uzcard"
                                  ? "8600 1234 5678 9012"
                                  : "1234 5678 9012 3456"
                              }
                            />
                          </div>

                          {/* Karta egasi */}
                          <div className="space-y-2">
                            <Label htmlFor="cardName">
                              {t.cardName || "Karta egasining ismi"}
                            </Label>
                            <Input
                              id="cardName"
                              value={paymentForm.cardName}
                              onChange={(e) =>
                                setPaymentForm({
                                  ...paymentForm,
                                  cardName: e.target.value,
                                })
                              }
                              placeholder="FAMILIYA ISM"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* Amal qilish muddati */}
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">
                                {t.expiryDate || "Amal qilish muddati"}
                              </Label>
                              <Input
                                id="expiryDate"
                                value={paymentForm.expiryDate}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, "")
                                  if (value.length > 2) {
                                    value = value.slice(0, 2) + "/" + value.slice(2, 4)
                                  }
                                  setPaymentForm({
                                    ...paymentForm,
                                    expiryDate: value,
                                  })
                                }}
                                placeholder="OO/YY"
                                maxLength={5}
                              />
                            </div>

                            {/* CVV/CVC (faqat Visa/Mastercard uchun) */}
                            {(paymentForm.cardType === "Mastercard" ||
                              paymentForm.cardType === "Visa") && (
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVC/CVV</Label>
                                <Input
                                  id="cvv"
                                  value={paymentForm.cvv}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "")
                                    setPaymentForm({
                                      ...paymentForm,
                                      cvv: value.slice(0, 4),
                                    })
                                  }}
                                  placeholder="123"
                                  type="password"
                                  maxLength={4}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleAddPayment}
                            disabled={
                              !paymentForm.cardType ||
                              !paymentForm.cardNumber ||
                              !paymentForm.cardName ||
                              !paymentForm.expiryDate ||
                              ((paymentForm.cardType === "Mastercard" ||
                                paymentForm.cardType === "Visa") &&
                                !paymentForm.cvv)
                            }
                          >
                            {editPaymentId ? t.update || "Saqlash" : t.save || "Qo'shish"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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