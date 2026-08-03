/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookingItem } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookingDetailsDialog } from "../../dashboard/_components/getBookingDetails";
import { ShieldAlert } from "lucide-react";

interface TechnicianDashboardProps {
  bookings: BookingItem[];
  user?: any;
  updateStatus?: (bookingId: string, status: string) => any;
}

export default function TechnicianDashboardUI({
  bookings = [],
  user,
  updateStatus,
}: TechnicianDashboardProps) {
  const router = useRouter();
  const [jobList, setJobList] = useState(bookings);

  const userInfo = user?.data?.result || user?.data || user;
  const isVerified = userInfo?.technician?.isVerified ?? true;

  const handleStatusUpdate = async (bookingId: string, status: any) => {
    if (!isVerified && status === "ACCEPTED") {
      toast.error("Your account is pending Admin Verification. You cannot accept jobs yet!");
      return;
    }

    if (!updateStatus) return;

    setJobList((prev: any[]) =>
      prev.map((job: any) => (job.id === bookingId ? { ...job, status } : job))
    );

    const res = await updateStatus(bookingId, status);

    if (res?.success) {
      toast.success(`Job status updated to ${status}!`);
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to update status");
      setJobList(bookings);
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* 🟢 Admin Verification Warning Banner for Unverified Techs */}
        {!isVerified && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-700 dark:text-amber-400 shadow-sm">
            <ShieldAlert className="w-6 h-6 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-bold">Account Verification Pending</p>
              <p className="text-[11px] opacity-90">
                Your technician profile is awaiting Admin approval. You will be able to accept bookings once verified.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-xl font-bold text-foreground">Technician Portal</h1>
          <p className="text-xs text-muted-foreground">Manage your assigned customer jobs easily.</p>
        </div>

        {/* Jobs List */}
        <div className="space-y-3">
          {jobList.length > 0 ? (
            jobList.map((job: any) => (
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
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border border-border bg-accent">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">📅 Date: {job.bookingDate} ({job.timeSlot})</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {job.status === "REQUESTED" && (
                    <>
                      <Button
                        size="sm"
                        disabled={!isVerified}
                        onClick={() => handleStatusUpdate(job.id, "ACCEPTED")}
                        className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                      >
                        {isVerified ? "Accept" : "Pending Verification"}
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

                  {job.status === "ACCEPTED" && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200">
                      Awaiting Customer Payment ⏳
                    </span>
                  )}

                  {(job.status === "PAID" || job.status === "IN_PROGRESS") && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(job.id, "COMPLETED")}
                      className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                      Mark Completed
                    </Button>
                  )}

                  <BookingDetailsDialog bookingId={job.id} initialBooking={job} />
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