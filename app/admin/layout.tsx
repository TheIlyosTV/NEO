"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Menu,
  Home,
  Settings,
  Layers,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    // This is a simple check. In a real app, you would check with your auth system
    const checkAuth = () => {
      // For demo purposes, we'll just set it to true
      // In a real app, you would check if the user is logged in
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (
      !isAuthenticated &&
      pathname !== "/auth/login" &&
      pathname !== "/auth/register"
    ) {
      // Uncomment this in a real app to enforce authentication
      // router.push("/auth/login")
    }
  }, [isAuthenticated, pathname, router]);

  const routes = [
    {
      label: "Bosh sahifa",
      icon: Home,
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Buyurtmalar",
      icon: ShoppingBag,
      href: "/admin/orders",
      active: pathname === "/admin/orders",
    },
    {
      label: "Mahsulotlar",
      icon: Package,
      href: "/admin/products",
      active:
        pathname === "/admin/products" ||
        pathname.startsWith("/admin/products/"),
    },
    {
      label: "Kategoriyalar",
      icon: Layers,
      href: "/admin/categories",
      active: pathname === "/admin/categories",
    },
    {
      label: "Foydalanuvchilar",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Statistika",
      icon: BarChart3,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Sozlamalar",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ];

  const handleLogout = () => {
    // In a real app, you would log the user out
    router.push("/auth");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-4 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:max-w-xs">
                <nav className="flex flex-col gap-4 pt-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        route.active
                          ? "bg-accent text-accent-foreground"
                          : "transparent"
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="hidden md:inline-block">NEO Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Chiqish</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <nav className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  route.active
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
