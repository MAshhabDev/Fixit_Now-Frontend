"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Star,
  XCircle,
  Wrench,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingStatus } from "@/lib/types";
import { BOOKING_STATUS_STYLES } from "@/lib/bookingStyles";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "COMPLETED" | "CANCELLED">("ALL");

  const mockBookings = [
    {
      id: "b-101",
      serviceTitle: "Complete Home AC Servicing & Repair",
      categoryName: "AC Repair",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
      technicianName: "Alex Morgan",
      technicianLocation: "Dhanmondi, Dhaka",
      bookingDate: "2026-08-05",
      timeSlot: "10:00 AM - 12:00 PM",
      totalPrice: 800,
      status: "ACCEPTED" as BookingStatus,
      address: "Road 8A, House 12, Dhanmondi, Dhaka",
    },
    {
      id: "b-102",
      serviceTitle: "Expert Kitchen & Bathroom Plumbing",
      categoryName: "Plumbing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      technicianName: "David Miller",
      technicianLocation: "Gulshan, Dhaka",
      bookingDate: "2026-08-02",
      timeSlot: "02:00 PM - 04:00 PM",
      totalPrice: 500,
      status: "PAID" as BookingStatus,
      address: "Gulshan 2, Dhaka",
    },
    {
      id: "b-103",
      serviceTitle: "Electrical Wiring & Appliance Fixing",
      categoryName: "Electrician",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
      technicianName: "Robert Chen",
      technicianLocation: "Banani, Dhaka",
      bookingDate: "2026-07-28",
      timeSlot: "11:00 AM - 01:00 PM",
      totalPrice: 600,
      status: "COMPLETED" as BookingStatus,
      address: "Banani, Dhaka",
    },
    {
      id: "b-104",
      serviceTitle: "Full House Deep Cleaning & Sanitization",
      categoryName: "Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      technicianName: "Sophia Ray",
      technicianLocation: "Uttara, Dhaka",
      bookingDate: "2026-07-20",
      timeSlot: "09:00 AM - 12:00 PM",
      totalPrice: 1500,
      status: "CANCELLED" as BookingStatus,
      address: "Uttara, Dhaka",
    },
  ];

  // Client Filter Logic for UI
  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "ACTIVE")
      return (
        booking.status === "REQUESTED" ||
        booking.status === "ACCEPTED" ||
        booking.status === "PAID" ||
        booking.status === "IN_PROGRESS"
      );
    if (activeTab === "COMPLETED") return booking.status === "COMPLETED";
    if (activeTab === "CANCELLED") return booking.status === "CANCELLED" || booking.status === "DECLINED";
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. PAGE HEADER UI ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              My Service Bookings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your requested services, proceed to payment, or write reviews.
            </p>
          </div>

          <Link href="/services">
            <Button className="rounded-xl font-bold text-xs px-5 py-5 flex items-center gap-2 cursor-pointer shadow-md">
              <Wrench className="w-4 h-4" />
              <span>Book New Service</span>
            </Button>
          </Link>
        </div>

        {/* ================= 2. FILTER TABS UI ================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: "ALL", label: "All Bookings" },
            { id: "ACTIVE", label: "Active Jobs" },
            { id: "COMPLETED", label: "Completed" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= 3. BOOKINGS CARDS LIST UI ================= */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const isCancelable =
                booking.status === "REQUESTED" ||
                booking.status === "ACCEPTED" ||
                booking.status === "PAID";

              return (
                <div
                  key={booking.id}
                  className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  
                  {/* Left Info Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                    
                    {/* Thumbnail Image */}
                    <div className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-muted border border-border shrink-0">
                      <Image
                        unoptimized
                        src={booking.image}
                        alt={booking.serviceTitle}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Service & Technician Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
                          {booking.categoryName}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            BOOKING_STATUS_STYLES[booking.status]?.className ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground line-clamp-1">
                        {booking.serviceTitle}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="font-semibold text-foreground">{booking.technicianName}</span> ({booking.technicianLocation})
                        </p>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{booking.bookingDate} ({booking.timeSlot})</span>
                        </p>
                      </div>

                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        <span>{booking.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions & Price Section */}
                  <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-border pt-4 lg:pt-0 gap-3">
                    <div className="text-left lg:text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">Total Amount</p>
                      <p className="text-xl font-extrabold text-primary">৳{booking.totalPrice}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      
                      {/* ACCEPTED Status -> Pay Now Button UI */}
                      {booking.status === "ACCEPTED" && (
                        <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                          <Button className="rounded-xl text-xs font-bold px-4 py-2 cursor-pointer shadow-sm">
                            <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay Now
                          </Button>
                        </Link>
                      )}

                      {/* COMPLETED Status -> Leave Review Button UI */}
                      {booking.status === "COMPLETED" && (
                        <Button
                          variant="outline"
                          className="rounded-xl text-xs font-semibold px-4 py-2 border-amber-500/40 text-amber-600 hover:bg-amber-50 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-400" /> Leave Review
                        </Button>
                      )}

                      {/* Cancel Button UI */}
                      {isCancelable && (
                        <Button
                          variant="ghost"
                          className="rounded-xl text-xs font-semibold px-3 py-2 text-destructive hover:bg-destructive/10 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                        </Button>
                      )}

                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            /* Empty Result State */
            <div className="text-center py-16 bg-card border border-border rounded-3xl space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-accent text-muted-foreground flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">No Bookings Found</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                You haven&apos;t placed any service booking requests in this category yet.
              </p>
              <Link href="/services">
                <Button className="rounded-xl text-xs font-bold mt-2 cursor-pointer">
                  Browse Services
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}