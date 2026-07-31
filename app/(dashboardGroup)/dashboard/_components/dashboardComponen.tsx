"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  DollarSign,
  Wrench,
  User,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingItem } from "@/lib/types";

interface CustomerDashboardProps {
  bookings: BookingItem[];
}

export default function CustomerDashboardUI({ bookings = [] }: CustomerDashboardProps) {
  const totalBookings = bookings.length;
  const activeJobs = bookings.filter(
    (b) => b.status === "REQUESTED" || b.status === "ACCEPTED" || b.status === "PAID" || b.status === "IN_PROGRESS"
  ).length;
  const completedJobs = bookings.filter((b) => b.status === "COMPLETED").length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || b.service?.price || 0), 0);

  const recentBookings = bookings.slice(0, 4);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto space-y-8 px-4">
        
        {/* ================= 1. WELCOME HEADER ================= */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Customer Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Welcome back to FixItNow! 👋
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
              Manage your requested home services, view real-time booking statuses, and track your expenses.
            </p>
          </div>

          <Link href="/services" className="z-10 shrink-0">
            <Button className="rounded-2xl font-bold text-xs px-5 py-6 shadow-md cursor-pointer flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>Book New Service</span>
            </Button>
          </Link>
        </div>

        {/* ================= 2. OVERVIEW STATS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{totalBookings}</p>
            <p className="text-xs text-muted-foreground font-medium">Total Bookings</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{activeJobs}</p>
            <p className="text-xs text-muted-foreground font-medium">Active Requests</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{completedJobs}</p>
            <p className="text-xs text-muted-foreground font-medium">Completed Jobs</p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">৳{totalSpent}</p>
            <p className="text-xs text-muted-foreground font-medium">Total Spent</p>
          </div>

        </div>

        {/* ================= 3. RECENT BOOKINGS SUMMARY ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Recent Booking Requests</h2>
              <p className="text-xs text-muted-foreground">Your latest 4 service requests.</p>
            </div>

            <Link href="/dashboard/my-booking">
              <Button variant="ghost" className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer">
                <span>View All Bookings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookings.length > 0 ? (
              recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm hover:border-primary/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {b.service?.category?.name || "Service"}
                      </span>
                      <span className="text-[10px] font-bold bg-accent text-foreground px-2.5 py-0.5 rounded-full uppercase border border-border">
                        {b.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground">
                      {b.service?.title || "Service Request"}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>{b.technician?.user?.name || "Technician Pro"}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{b.bookingDate} ({b.timeSlot})</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border pt-2 md:pt-0">
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">Amount</p>
                      <p className="text-base font-extrabold text-primary">
                        ৳{b.totalAmount || b.service?.price || 0}
                      </p>
                    </div>

                    {b.status === "ACCEPTED" && (
                      <Link href={`/dashboard/customer/bookings/${b.id}/pay`}>
                        <Button size="sm" className="text-xs font-bold gap-1 rounded-xl cursor-pointer">
                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-card border border-border rounded-2xl text-xs text-muted-foreground">
                No recent bookings found. Click &quot;Book New Service&quot; to place your first request!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}