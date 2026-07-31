/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  User,
  CreditCard,
  Wrench,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingItem } from "@/lib/types";

interface MyBookingsProps {
  bookings: BookingItem[];
}

export default function MyBookingsPage({ bookings = [] }: MyBookingsProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "COMPLETED">(
    "ALL",
  );

  // Simple Filter
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "ACTIVE")
      return booking.status !== "COMPLETED" && booking.status !== "CANCELLED";
    if (activeTab === "COMPLETED") return booking.status === "COMPLETED";
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto space-y-6 px-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
            <p className="text-xs text-muted-foreground">
              Track all your service requests here.
            </p>
          </div>
          <Link href="/services">
            <Button className="text-xs font-bold gap-2">
              <Wrench className="w-4 h-4" /> Book New Service
            </Button>
          </Link>
        </div>

        {/* Simple Tabs */}
        <div className="flex gap-2">
          {["ALL", "ACTIVE", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm"
              >
                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {booking.service?.category?.name || "Service"}
                    </span>
                    <span className="text-[10px] font-bold bg-accent text-foreground px-2 py-0.5 rounded-full uppercase">
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-foreground">
                    {booking.service?.title || "Service Request"}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {booking.technician?.user?.name || "Technician"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {booking.bookingDate} ({booking.timeSlot})
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{booking.serviceAddress}</span>
                  </p>
                </div>

                <div className="flex md:flex-col justify-between items-end w-full md:w-auto border-t md:border-t-0 border-border pt-3 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">
                      Total Price
                    </p>
                    <p className="text-lg font-extrabold text-primary">
                      ৳{booking.totalAmount || booking.service?.price || 0}
                    </p>
                  </div>

                  {booking.status === "ACCEPTED" && (
                    <Link
                      href={`/dashboard/customer/bookings/${booking.id}/pay`}
                    >
                      <Button
                        size="sm"
                        className="text-xs font-bold gap-1 mt-2"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay Now
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-2xl text-xs text-muted-foreground">
              No bookings found in this section.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
