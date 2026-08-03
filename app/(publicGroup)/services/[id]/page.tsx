/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices } from "../../_actions/getAllPublicData";
import { BookingDialog } from "../../_components/BookFormDialog";
import {
  Clock,
  DollarSign,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
} from "lucide-react";

interface ServiceDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsProps) {
  const { id } = await params;

  const servicesRes = await getAllServices();
  const allServices = servicesRes?.data || [];
  const service = allServices.find((item: any) => item.id === id);

  if (!service) {
    notFound();
  }

  const technician = service.technician || service.user || {};

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Service Cover Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-border bg-muted shadow-md">
              <Image
                unoptimized
                src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e"}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                {service.category?.name || "General Service"}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4 bg-card border border-border p-6 rounded-3xl shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {service.title}
              </h1>

              <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground border-b border-border pb-4">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <DollarSign className="w-4 h-4" /> ৳{service.price}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" /> {service.duration}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-sm text-foreground">Service Overview</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description ||
                    "Professional repair and maintenance service provided by background-checked technician. Guaranteed safety compliance and satisfaction."}
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <h4 className="text-xs font-bold text-foreground">Whats Included:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>30-Day Service Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified & Background Checked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transparent Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Safety Equipment Compliant</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 🟢 RIGHT SIDE: TECHNICIAN CARD & BOOKING CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Technician Info Card */}
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                  {technician.user?.image ? (
                    <Image
                      unoptimized
                      src={technician.user.image}
                      alt={technician.user?.name || "Technician"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserCheck className="w-7 h-7 text-primary absolute inset-0 m-auto" />
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-foreground">
                    {technician.user?.name || "Verified Professional"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {technician.averageRating || "5.0"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {technician.location || "Dhaka"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-accent/50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Service Charge</span>
                  <span className="font-extrabold text-foreground">৳{service.price}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Estimated Time</span>
                  <span className="font-extrabold text-foreground">{service.duration}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-primary/5 p-3 rounded-xl border border-primary/10">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Instant confirmation upon technician acceptance. No upfront cancellation fee.</span>
              </div>

              {/* 🟢 Booking Dialog CTA */}
              <div className="pt-2">
                <BookingDialog service={service} />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
