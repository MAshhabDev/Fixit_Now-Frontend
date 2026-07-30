"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Star,
  DollarSign,
  User,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type { BookingStatus } from "@/lib/types";
import { BOOKING_STATUS_STYLES } from "@/lib/bookingStyles";

export default function CustomerDashboardPage() {
  const bookings = [
    {
      id: "b-101",
      serviceTitle: "Complete Home AC Servicing & Repair",
      technicianName: "Alex Morgan",
      bookingDate: "2026-08-05",
      timeSlot: "10:00 AM - 12:00 PM",
      totalPrice: 800,
      status: "ACCEPTED" as BookingStatus,
      address: "Road 8A, Dhanmondi, Dhaka",
    },
    {
      id: "b-102",
      serviceTitle: "Expert Kitchen & Bathroom Plumbing",
      technicianName: "David Miller",
      bookingDate: "2026-08-02",
      timeSlot: "02:00 PM - 04:00 PM",
      totalPrice: 500,
      status: "PAID" as BookingStatus,
      address: "Gulshan 2, Dhaka",
    },
    {
      id: "b-103",
      serviceTitle: "Electrical Wiring & Appliance Fixing",
      technicianName: "Robert Chen",
      bookingDate: "2026-07-28",
      timeSlot: "11:00 AM - 01:00 PM",
      totalPrice: 600,
      status: "COMPLETED" as BookingStatus,
      address: "Banani, Dhaka",
    },
    {
      id: "b-104",
      serviceTitle: "Full House Deep Cleaning & Sanitization",
      technicianName: "Sophia Ray",
      bookingDate: "2026-07-20",
      timeSlot: "09:00 AM - 12:00 PM",
      totalPrice: 1500,
      status: "CANCELLED" as BookingStatus,
      address: "Uttara, Dhaka",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ================= 1. DASHBOARD HEADER UI ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Customer Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your service bookings, manage payments, and leave reviews.
            </p>
          </div>

          <Link href="/services">
            <Button className="rounded-xl font-bold text-xs px-5 py-5 flex items-center gap-2 cursor-pointer shadow-md">
              <Wrench className="w-4 h-4" />
              <span>Book New Service</span>
            </Button>
          </Link>
        </div>

        {/* ================= 2. OVERVIEW METRICS STATS CARDS UI ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">4</p>
            <p className="text-xs text-muted-foreground font-medium">Total Bookings</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">2</p>
            <p className="text-xs text-muted-foreground font-medium">Active & Paid Jobs</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">1</p>
            <p className="text-xs text-muted-foreground font-medium">Completed Jobs</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">৳1100</p>
            <p className="text-xs text-muted-foreground font-medium">Total Spent</p>
          </div>

        </div>

        {/* ================= 3. BOOKING HISTORY TRACKING TABLE UI ================= */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>My Booking History</span>
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">
              4 Bookings Found
            </span>
          </div>

          {/* Table Container UI */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-accent/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-5">Service & Technician</th>
                  <th className="py-3.5 px-5">Date & Time</th>
                  <th className="py-3.5 px-5">Total Price</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs font-medium">
                {bookings.map((booking) => {
                  const isCancelable =
                    booking.status === "REQUESTED" ||
                    booking.status === "ACCEPTED" ||
                    booking.status === "PAID";

                  return (
                    <tr key={booking.id} className="hover:bg-accent/20 transition-colors">
                      
                      {/* Service & Technician Info */}
                      <td className="py-4 px-5 space-y-1">
                        <p className="font-bold text-foreground line-clamp-1">
                          {booking.serviceTitle}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" /> Pro: {booking.technicianName}
                        </p>
                      </td>

                      {/* Date & Time Slot */}
                      <td className="py-4 px-5 space-y-0.5">
                        <p className="font-semibold text-foreground">{booking.bookingDate}</p>
                        <p className="text-[11px] text-muted-foreground">{booking.timeSlot}</p>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-5 font-extrabold text-primary text-sm">
                        ৳{booking.totalPrice}
                      </td>

                      {/* Status Badge UI */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            BOOKING_STATUS_STYLES[booking.status]?.className ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions UI */}
                      <td className="py-4 px-5 text-right space-x-2">
                        
                        {/* ACCEPTED Status -> Pay Now Button UI */}
                        {booking.status === "ACCEPTED" && (
                          <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                            <Button className="rounded-xl text-xs font-bold px-3.5 py-1.5 cursor-pointer shadow-sm">
                              <CreditCard className="w-3.5 h-3.5 mr-1" /> Pay Now
                            </Button>
                          </Link>
                        )}

                        {/* COMPLETED Status -> Leave Review Button UI */}
                        {booking.status === "COMPLETED" && (
                          <Button
                            variant="outline"
                            className="rounded-xl text-xs font-semibold px-3 py-1.5 border-amber-500/40 text-amber-600 hover:bg-amber-50 cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 mr-1 fill-amber-400" /> Leave Review
                          </Button>
                        )}

                        {/* Eligible for Cancel UI */}
                        {isCancelable && (
                          <Button
                            variant="ghost"
                            className="rounded-xl text-xs font-semibold px-2.5 py-1.5 text-destructive hover:bg-destructive/10 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        )}

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}