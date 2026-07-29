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

// 5. Booking Item Interface
export interface Booking {
  id: string;
  bookingDate: string;
  timeSlot: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  serviceAddress: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  review?: Review | null;
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
  bookings: Booking[];
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