/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getAllBookingsAdminAction } from "../_actions/getAllBookingAction";

export default async function AdminBookingsPage() {
  const bookingsRes = await getAllBookingsAdminAction();
  const bookings = bookingsRes?.data || [];

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-xl font-bold text-foreground">All Platform Bookings</h1>
          <p className="text-xs text-muted-foreground">Monitor and track all customer service orders across the platform.</p>
        </div>

        {/* Bookings Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Service Title</th>
                  <th className="p-3">Technician</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.length > 0 ? (
                  bookings.map((item: any) => {
                    const formattedDate = item.bookingDate
                      ? new Date(item.bookingDate).toLocaleDateString()
                      : "Scheduled";

                    return (
                      <tr key={item.id} className="hover:bg-accent/30">
                        {/* 1. Customer Info */}
                        <td className="p-3 font-semibold text-foreground">
                          <p className="font-bold text-sm text-foreground">{item.customer?.name || "Customer"}</p>
                          <p className="text-[11px] text-muted-foreground font-normal">{item.customer?.email || ""}</p>
                        </td>

                        {/* 2. Service Title */}
                        <td className="p-3 font-bold text-foreground">{item.service?.title || "Service Repair"}</td>

                        {/* 3. Technician */}
                        <td className="p-3 font-semibold text-primary">{item.technician?.user?.name || "Assigned Tech"}</td>

                        {/* 4. Date & Time Slot */}
                        <td className="p-3 text-muted-foreground">
                          {formattedDate} ({item.timeSlot || "N/A"})
                        </td>

                        {/* 5. Total Amount */}
                        <td className="p-3 font-bold text-foreground">৳{item.totalAmount || item.service?.price || 0}</td>

                        {/* 6. Status Badge */}
                        <td className="p-3 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            item.status === "COMPLETED" || item.status === "PAID"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "ACCEPTED"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "CANCELLED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {item.status || "REQUESTED"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-xs text-muted-foreground">
                      No platform bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}