/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ISidebarItem } from "@/lib/types";
import {
  CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN_SIDEBAR_ITEMS,
} from "../_config/sidebarItems";

interface SidebarProps {
  user: any;
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const userRole = user?.data?.role || user?.data?.result?.role || "CUSTOMER";

  let navItems: ISidebarItem[] = CUSTOMER_SIDEBAR_ITEMS;

  if (userRole === "TECHNICIAN") {
    navItems = TECHNICIAN_SIDEBAR_ITEMS;
  } else if (userRole === "ADMIN") {
    navItems = ADMIN_SIDEBAR_ITEMS;
  }

  return (
    <Sidebar
      collapsible="none"
      className="h-screen border-r border-border bg-card"
    >
      {/* Brand Header */}
      <SidebarHeader className="border-b border-border p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg text-primary">FixItNow</span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
