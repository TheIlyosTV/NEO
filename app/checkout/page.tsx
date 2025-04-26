"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, CreditCard, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  })

  // Calculate shipping - free over $100
  const shipping = subtotal > 100 ? 0 : 9.99
  
  // Calculate tax (8%)
  const tax = subtotal * 0.08
  
  // Calculate total
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return false
    }
    
    return true
  }

  const validatePaymentForm = () => {
    if (paymentMethod === 'credit-card') {
      const requiredFields = ['cardNumber', 'expiry', 'cvc', 'nameOnCard']
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing payment information",
          description: "Please fill in all required payment fields",
          variant: "destructive",
        })
        return false
      }
    }
    
    return true
  }

  const nextStep = () => {
    if (step === 1 && !validateShippingForm()) return
    if (step === 2 && !validatePaymentForm()) return
    
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
    
    // If moving to confirmation step, simulate order completion
    if (step === 2) {
      // In a real app, you would submit the order to your backend here
      // For now, we'll just clear the cart after a delay to simulate order processing
      setTimeout(() => {
        clearCart()
      }, 1000)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  // If cart is empty and not in confirmation step, redirect to cart
  if (items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                <span className="mt-2 text-sm font-medium">Shipping</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 2 ? "bg-gray-900" : "bg-gray-200"
                }`}
              />

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : 2}
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 3 ? "bg-gray-900" : "bg-gray-200"
                }`}
              />

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="mt-2 text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          className="mt-1" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          className="mt-1" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          className="mt-1" 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          className="mt-1" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          className="mt-1" 
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          className="mt-1" 
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Select 
                          value={formData.state} 
                          onValueChange={(value) => handleSelectChange("state", value)}
                        >
                          <SelectTrigger id="state" className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input 
                          id="zip" 
                          className="mt-1" 
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={formData.country} 
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger id="country" className="mt-1">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center">
                      <Checkbox id="saveAddress" />
                      <Label htmlFor="saveAddress" className="ml-2">
                        Save this address for future orders
                      </Label>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      Payment Method
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "credit-card"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label
                            htmlFor="credit-card"
                            className="ml-2 flex items-center"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit / Debit Card
                          </Label>
                        </div>

                        {paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1"
                                  value={formData.expiry}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  className="mt-1"
                                  value={formData.cvc}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="nameOnCard">Name on Card</Label>
                              <Input 
                                id="nameOnCard" 
                                className="mt-1" 
                                value={formData.nameOnCard}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "paypal"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="ml-2">
                            PayPal
                          </Label>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "apple-pay"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="apple-pay" id="apple-pay" />
                          <Label htmlFor="apple-pay" className="ml-2">
                            Apple Pay
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        Review Order
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Order Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">
                        Thank You for Your Order!
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Your order has been placed and is being processed.
                      </p>
                      <p className="text-gray-800 font-medium mb-8">
                        Order Number: #{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                      </p>

                      <div className="max-w-md mx-auto text-left bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-medium mb-2">Order Details:</h3>
                        <p className="text-sm text-gray-600">
                          We&apos;ve sent a confirmation email to {formData.email} with all the details of your order.
                        </p>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button asChild variant="outline">
                          <Link href="/account/orders">View Order</Link>
                        </Button>
                        <Button
                          asChild
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          <Link href="/">Continue Shopping</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={`${item.id}-${item.size}-${item.color}`} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.color && `${item.color} / `}{item.size && `${item.size} / `}Qty: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Tax</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
