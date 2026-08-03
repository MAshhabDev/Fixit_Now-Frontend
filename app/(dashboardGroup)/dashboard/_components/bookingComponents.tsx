/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, MapPin, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { PaymentAction } from "../_actions/paymentAction";
import { BookingDetailsDialog } from "./getBookingDetails";
import { ReviewDialog } from "./ReviewDialog";

interface CustomerBookingListProps {
  bookings: any[];
}

export default function CustomerBookingListUI({
  bookings = [],
}: CustomerBookingListProps) {
  const handlePay = async (bookingId: string) => {
    const res = await PaymentAction(bookingId);
    if (res && !res.success) {
      toast.error(res.message || "Payment initiation failed");
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-xl font-bold text-foreground">
            My Service Bookings
          </h1>
          <p className="text-xs text-muted-foreground">
            Track your requested home services, payment status, and leave
            reviews.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                {/* Booking Info */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">
                      {booking.service?.title || "Service Repair"}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border border-border ${
                        booking.status === "PAID" ||
                        booking.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-700"
                          : booking.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "CANCELLED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      Date: {booking.bookingDate} ({booking.timeSlot})
                    </span>
                  </p>

                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Address: {booking.serviceAddress}</span>
                  </p>
                </div>

                {/* Amount & Actions */}
                <div className="flex md:flex-col items-end gap-2 w-full md:w-auto justify-between border-t md:border-t-0 border-border pt-2 md:pt-0">
                  <p className="text-base font-extrabold text-primary flex items-center gap-0.5">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      ৳{booking.totalAmount || booking.service?.price || 0}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    {booking.status === "ACCEPTED" && (
                      <Button
                        size="sm"
                        onClick={() => handlePay(booking.id)}
                        className="rounded-xl text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Now</span>
                      </Button>
                    )}

                    {(booking.status === "PAID" ||
                      booking.status === "COMPLETED") && (
                      <ReviewDialog
                        bookingId={booking.id}
                        serviceId={booking.serviceId}
                        isReviewed={
                          booking.isReviewed ||
                          booking.hasReviewed ||
                          !!booking.review
                        }
                      />
                    )}

                    <BookingDetailsDialog
                      bookingId={booking.id}
                      initialBooking={booking}
                    />
                  </div>

                  {booking.status === "PAID" && (
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ Payment Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-card border border-border rounded-xl text-xs text-muted-foreground">
              No service bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const MyBookingsPage = CustomerBookingListUI;
