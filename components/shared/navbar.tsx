/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "sonner";

// Nav items for FixItNow
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// User dropdown options
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

interface NavbarProps {
  user?: any;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🟢 1. 100% Fail-Safe Role Extraction
  const userInfo = user?.data?.result || user?.data || user?.result || user;
  const role = userInfo?.role || "CUSTOMER";

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      if (role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (role === "TECHNICIAN") {
        router.push("/technician-dashboard");
      } else {
        router.push("/dashboard");
      }
    }

    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/");
    }
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ================= 1. BRAND LOGO ================= */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-transform group-hover:scale-105">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              FixItNow
            </span>
          </Link>

          {/* ================= 2. DESKTOP NAV LINKS ================= */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ================= 3. USER DROPDOWN OR LOGIN BUTTON ================= */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user?.success || userInfo?.name ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer focus:outline-none">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-foreground">
                        {userInfo?.name || "User Name"}
                      </p>
                      <p className="text-xs text-muted-foreground leading-none">
                        {userInfo?.email || "user@example.com"}
                      </p>
                      <span className="inline-block w-max mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        onClick={() => handleUserMenuAction(item.action)}
                        key={item.action}
                        className="cursor-pointer"
                      >
                        <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleUserMenuAction("logout")}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" className="cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="cursor-pointer">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* ================= 4. MOBILE MENU TOGGLE ================= */}
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ================= 5. MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border">
            {user?.success || userInfo?.name ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-accent/50 rounded-md">
                  <p className="text-sm font-semibold">{userInfo?.name}</p>
                  <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleUserMenuAction("dashboard");
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleUserMenuAction("logout");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full cursor-pointer">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}