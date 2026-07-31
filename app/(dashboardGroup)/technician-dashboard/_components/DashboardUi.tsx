"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type { BookingItem } from "@/lib/types";
import { toast } from "sonner";

interface TechnicianDashboardProps {
  bookings: BookingItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateStatus?: (bookingId: string, status: string) => any;
}

export default function TechnicianDashboardUI({
  bookings = [],
  updateStatus,
}: TechnicianDashboardProps) {
  const handleStatusUpdate = async (bookingId: string, status: string) => {
    if (!updateStatus) return;

    const res = await updateStatus(bookingId, status);

    if (res?.success) {
      toast.success(`Job status updated to ${status}!`);
    } else {
      toast.error(res?.message || "Failed to update status");
    }
  };

  const totalJobs = bookings.length;
  const pendingJobs = bookings.filter((b) => b.status === "REQUESTED").length;
  const completedJobs = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-xl font-bold text-foreground">
            Technician Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your assigned customer jobs easily.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-xs text-muted-foreground font-semibold">
              Total Assigned Jobs
            </p>
            <p className="text-2xl font-bold text-foreground">{totalJobs}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-xs text-amber-600 font-semibold">
              Pending Requests
            </p>
            <p className="text-2xl font-bold text-foreground">{pendingJobs}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-xs text-emerald-600 font-semibold">
              Completed Jobs
            </p>
            <p className="text-2xl font-bold text-foreground">
              {completedJobs}
            </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-foreground">
            Assigned Customer Jobs
          </h2>

          {bookings.length > 0 ? (
            bookings.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
              >
                {/* Job Info */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">
                      {job.service?.title || "Service Job"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent uppercase border border-border">
                      {job.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground">
                    📅 Date: {job.bookingDate} ({job.timeSlot})
                  </p>
                  <p className="text-muted-foreground">
                    📍 Address: {job.serviceAddress}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-end gap-2 w-full md:w-auto justify-between border-t md:border-t-0 border-border pt-2 md:pt-0">
                  <p className="text-sm font-bold text-primary">
                    ৳{job.totalAmount || job.service?.price || 0}
                  </p>

                  <div className="flex items-center gap-2">
                    {job.status === "REQUESTED" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(job.id, "ACCEPTED")}
                          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(job.id, "DECLINED")}
                          className="text-xs font-bold text-destructive cursor-pointer"
                        >
                          Decline
                        </Button>
                      </>
                    )}

                    {(job.status === "ACCEPTED" ||
                      job.status === "PAID" ||
                      job.status === "IN_PROGRESS") && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(job.id, "COMPLETED")}
                        className="text-xs font-bold cursor-pointer"
                      >
                        Mark Completed
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-card border border-border rounded-xl text-xs text-muted-foreground">
              No assigned jobs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
