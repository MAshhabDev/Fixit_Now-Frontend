import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  Settings,
  Users,
  Grid,
  CreditCard,
  Star,
  Clock,
} from "lucide-react";

export const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Customer Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    href: "/dashboard/my-booking",
    icon: Calendar,
  },
  {
    label: "Payment History",
    href: "/dashboard/customer/payments",
    icon: CreditCard,
  },
  {
    label: "My Reviews",
    href: "/dashboard/customer/reviews",
    icon: Star,
  },
  {
    label: "Profile Settings",
    href: "/dashboard/customer/profile",
    icon: Settings,
  },
];

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Technician Dashboard",
    href: "/technician-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Assigned Service Jobs",
    href: "/dashboard/technician/jobs",
    icon: Wrench,
  },
  {
    label: "Availability Schedule",
    href: "/dashboard/technician/schedule",
    icon: Clock,
  },
  {
    label: "Profile Settings",
    href: "/dashboard/technician/profile",
    icon: Settings,
  },
];

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "User Moderation",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Category Control",
    href: "/dashboard/admin/categories",
    icon: Grid,
  },
  {
    label: "All Platform Bookings",
    href: "/dashboard/admin/bookings",
    icon: Calendar,
  },
];
