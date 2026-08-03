/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShieldCheck,
  MapPin,
  Briefcase,
  ArrowRight,
  Search,
  X,
  Star,
} from "lucide-react";
import Image from "next/image";

interface AllTechniciansUIProps {
  technicians: any[];
}

export default function AllTechniciansUI({ technicians = [] }: AllTechniciansUIProps) {
  const techList = Array.isArray(technicians) ? technicians : [];

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <Users className="w-4 h-4" />
            <span>Expert Service Professionals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Verified Technicians
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Browse our verified expert technicians available for electrical, plumbing, AC repair, and home maintenance.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card border border-border p-4 rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Keyword Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search technician by name or skill..."
              className="w-full bg-background border border-border rounded-2xl pl-10 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Location Dropdown */}
          <div className="sm:col-span-4 relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-2.5 text-muted-foreground" />
            <select
              className="w-full bg-background border border-border rounded-2xl pl-10 pr-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Banani">Banani</option>
              <option value="Dhanmondi">Dhanmondi</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              className="text-xs text-destructive font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Technicians Grid with Big Cover Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techList.length > 0 ? (
            techList.map((tech) => (
              <div
                key={tech.id}
                className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 bg-muted overflow-hidden">
                    <Image
                      unoptimized
                      src={
                        tech?.user?.image ||
                        tech?.image ||
                        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=600"
                      }
                      alt={tech?.user?.name || "Technician"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Verified Badge */}
                    {tech.isVerified && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Pro
                      </span>
                    )}

                    {/* Rating Badge */}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tech.averageRating || "5.0"}</span>
                    </span>
                  </div>

                  {/* 2. Content Info */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-extrabold text-foreground text-lg group-hover:text-primary transition-colors truncate">
                        {tech.user?.name || "Technician Pro"}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{tech.location || "Dhaka, Bangladesh"}</span>
                      </p>
                    </div>

                    {/* Tech Specs Badge Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-accent/50 border border-border rounded-xl p-2.5 space-y-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-primary" /> Experience
                        </p>
                        <p className="font-extrabold text-foreground">{tech.experience || 3}+ Years</p>
                      </div>

                      <div className="bg-accent/50 border border-border rounded-xl p-2.5 space-y-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                          <Users className="w-3 h-3 text-primary" /> Speciality
                        </p>
                        <p className="font-extrabold text-foreground truncate">{tech.skills ? tech.skills.split(",")[0] : "Expert"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Footer Rate & View Profile Action */}
                <div className="p-5 pt-0 border-t border-border/60 mt-2 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Hourly Rate</p>
                    <p className="text-lg font-black text-emerald-600">
                      ৳{tech.rate || tech.hourlyRate || 500}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                    </p>
                  </div>

                  {/* View Profile Button -> /technicians/[id] */}
                  <Link href={`/technicians/${tech.id}`}>
                    <Button
                      size="sm"
                      className="rounded-2xl text-xs font-bold px-4 py-2 bg-primary hover:bg-primary/90 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-card border border-border rounded-3xl text-xs text-muted-foreground">
              No verified technicians available at the moment.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export const AllTechniciansPage = AllTechniciansUI;