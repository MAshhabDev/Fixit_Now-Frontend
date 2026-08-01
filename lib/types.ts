import type { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// 1. Category Interface
export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 2. Technician User Interface
export interface TechnicianUser {
  name: string;
  email: string;
  avatar?: string;
}

// 3. Technician Profile Interface
export interface Technician {
  id: string;
  bio: string;
  skills: string;
  experience: number;
  rate: number;
  location: string;
  availability: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  user: TechnicianUser;
}

// 4. Booking Review Interface
export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
// 5. Booking Item Interface
export interface BookingItem {
  id: string;
  serviceId: string;
  technicianId: string;
  customerId: string;
  bookingDate: string;
  timeSlot: string;
  serviceAddress: string;
  totalAmount?: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  service?: {
    id: string;
    title: string;
    description?: string;
    price: number;
    image?: string;
    category?: {
      id: string;
      name: string;
    };
  };
  technician?: {
    id: string;
    location?: string;
    user?: {
      name: string;
      email: string;
    };
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}

// 6. Main Service Item Interface
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image?: string; // Optional image field
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  technicianId: string;
  category: Category;
  technician: Technician;
  bookings: BookingItem[];
  averageRating: number;
  totalReviews: number;
}

// 7. General API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// 8. Services API Response Type Shortcut
export type ServicesApiResponse = ApiResponse<ServiceItem[]>;

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "BANNED";

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address?: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponseData {
  result: RegisteredUser;
}

export interface RegisterApiResponse {
  success: boolean;
  statusCode: number; // 201
  message: string;
  data: RegisterResponseData;
}

export type LoginResponse = {
  success: boolean;
  statusCode: number; // 201
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

// Create Booking Request Payload
export type CreateBooking = {
  serviceId: string;
  technicianId: string;
  timeSlot: string;
  serviceAddress: string;
};
