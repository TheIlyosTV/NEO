"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Cotton Shirt",
      price: 79.99,
      size: "M",
      color: "Black",
      quantity: 1,
      image: "/placeholder.svg?height=600&width=500",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 89.99,
      size: "32",
      color: "Blue",
      quantity: 1,
      image: "/placeholder.svg?height=600&width=500",
    },
    {
      id: 3,
      name: "Leather Sneakers",
      price: 129.99,
      size: "42",
      color: "White",
      quantity: 1,
      image: "/placeholder.svg?height=600&width=500",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="py-6 flex"
                        >
                          <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-base font-medium text-gray-900">
                                  <Link
                                    href={`/product/${item.id}`}
                                    className="hover:underline"
                                  >
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="ml-4 text-base font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.color} / {item.size}
                              </p>
                            </div>

                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-2 text-gray-600 hover:text-gray-900"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-2 text-gray-600 hover:text-gray-900"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => setCartItems([])}>
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="flow-root">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-900 font-medium">
                          ${subtotal.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-gray-600">Shipping</p>
                        <p className="text-gray-900 font-medium">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </p>
                      </div>

                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <p>Discount (10%)</p>
                          <p>-${discount.toFixed(2)}</p>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-semibold">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                      </div>

                      <div className="pt-4">
                        <div className="flex space-x-2">
                          <Input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={applyPromoCode}
                            disabled={promoApplied}
                          >
                            Apply
                          </Button>
                        </div>
                        {promoApplied && (
                          <p className="text-green-600 text-sm mt-2">
                            Promo code applied!
                          </p>
                        )}
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        <Link href="/checkout">Proceed to Checkout</Link>
                      </Button>

                      <div className="mt-4 text-center text-sm text-gray-500">
                        <p>We accept</p>
                        <div className="flex justify-center space-x-2 mt-2">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
