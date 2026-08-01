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
  User,
  ArrowRight,
} from "lucide-react";

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
            Verified Home Technicians
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Browse our verified expert technicians available for electrical, plumbing, AC repair, and home maintenance.
          </p>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techList.length > 0 ? (
            techList.map((tech) => (
              <div
                key={tech.id}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                {/* Tech Header Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-black text-xl shrink-0">
                      {tech.user?.name?.charAt(0) || "T"}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-foreground text-base truncate">
                          {tech.user?.name || "Technician Pro"}
                        </h3>
                        {tech.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {tech.user?.email || "Pro Expert"}
                      </p>
                    </div>
                  </div>

                  {/* Tech Specs Badge Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-background/60 border border-border rounded-xl p-2.5 space-y-0.5">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-primary" /> Experience
                      </p>
                      <p className="font-extrabold text-foreground">{tech.experience || 3}+ Years</p>
                    </div>

                    <div className="bg-background/60 border border-border rounded-xl p-2.5 space-y-0.5">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" /> Location
                      </p>
                      <p className="font-extrabold text-foreground truncate">{tech.location || "Dhaka"}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Rate & View Profile Action */}
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Hourly Rate</p>
                    <p className="text-lg font-black text-emerald-600">
                      ৳{tech.rate || 500}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                    </p>
                  </div>

                  {/* 🟢 View Profile Button -> /technicians/[id] */}
                  <Link href={`/technicians/${tech.id}`}>
                    <Button
                      size="sm"
                      className="rounded-2xl text-xs font-bold px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center gap-1.5 cursor-pointer"
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