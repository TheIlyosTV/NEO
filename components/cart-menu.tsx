"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"

interface CartMenuProps {
  onClose: () => void
}

export default function CartMenu({ onClose }: CartMenuProps) {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
    window.location.href = "/checkout"
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
    window.location.href = "/cart"
  }

  return (
    <div
      className="absolute right-0 top-8 w-80 md:w-96 bg-white shadow-lg rounded-lg border z-50"
      onClick={(e) => e.stopPropagation()} // Prevent click propagation
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-medium flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2" />
          Shopping Cart
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close cart">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300" />
            <p className="mt-2 text-gray-500">Your cart is empty</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={onClose} asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.size && <span className="mr-2">Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }}
                        className="p-1 text-gray-600 hover:text-gray-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          updateQuantity(item.id, item.quantity + 1)
                        }}
                        className="p-1 text-gray-600 hover:text-gray-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeItem(item.id)
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-medium">{subtotal > 100 ? "Free" : "$9.99"}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">${(subtotal > 100 ? subtotal : subtotal + 9.99).toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleCartClick}>
              View Cart
            </Button>
            <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white" onClick={handleCheckoutClick}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
