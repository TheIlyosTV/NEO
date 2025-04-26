"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { LanguageProvider } from "@/context/language-context"; // <-- qo‘shildi

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
