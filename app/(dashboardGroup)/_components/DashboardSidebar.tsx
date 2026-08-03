/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Wrench } from "lucide-react";
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

  const userInfo = user?.data?.result || user?.data || user;
  const userRole = userInfo?.role || "CUSTOMER";

  let navItems: ISidebarItem[] = CUSTOMER_SIDEBAR_ITEMS;

  if (userRole === "TECHNICIAN") {
    navItems = TECHNICIAN_SIDEBAR_ITEMS;
  } else if (userRole === "ADMIN") {
    navItems = ADMIN_SIDEBAR_ITEMS;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen border-r border-border bg-card group"
    >
      {/* 🟢 1. Brand Logo Header + Auto-Hiding Text on Collapse */}
      <SidebarHeader className="border-b border-border p-4 flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs shrink-0">
            <Wrench className="w-4 h-4" />
          </div>

          <span className="font-extrabold text-lg text-primary group-data-[collapsible=icon]:hidden">
            FixItNow
          </span>
        </Link>

        {/* টগল বাটন */}
        <SidebarTrigger className="cursor-pointer" />
      </SidebarHeader>

      {/* 🟢 2. Dynamic Navigation Menu Items */}
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
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
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