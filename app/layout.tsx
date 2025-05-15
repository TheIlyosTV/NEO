import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import ClientLayout from "./ClientLayout"; // 👈 Yangi client component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEO",
  description: "A modern e-commerce platform for clothing and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientLayout>{children}</ClientLayout> {/* 👈 Navbar/Footer bu yerda */}
        </Providers>
      </body>
    </html>
  );
}
