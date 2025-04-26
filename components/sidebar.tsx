"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface AccountSidebarProps {
  className?: string
}

export function AccountSidebar({ className }: AccountSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { title: "Account Overview", href: "/account" },
    { title: "Orders", href: "/account/orders" },
    { title: "Addresses", href: "/account/addresses" },
    { title: "Account Settings", href: "/account/settings" },
    { title: "Wishlist", href: "/wishlist" },
  ]

  return (
    <Sidebar className={cn("w-full md:w-64", className)}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
