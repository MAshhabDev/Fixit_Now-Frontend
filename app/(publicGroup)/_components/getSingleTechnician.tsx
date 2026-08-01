/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  User,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  Wrench,
  CheckCircle2,
} from "lucide-react";

interface SingleTechnicianUIProps {
  tech: any;
}

export default function SingleTechnicianUI({ tech }: SingleTechnicianUIProps) {
  const skillsList = tech?.skills ? tech.skills.split(",") : ["Home Service", "Repair"];

  const userImage = tech?.user?.image || tech?.image || null;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Profile Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-center gap-4">
            {/* 🟢 Avatar Image Circle */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/10 shrink-0 flex items-center justify-center shadow-xs">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userImage}
                  alt={tech?.user?.name || "Technician"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="font-black text-2xl text-primary">
                  {tech?.user?.name?.charAt(0) || "T"}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-foreground">
                  {tech?.user?.name || "Technician Pro"}
                </h1>
                {tech?.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {tech?.location || "Dhaka, Bangladesh"}
              </p>
              <p className="text-xs text-muted-foreground">{tech?.user?.email}</p>
            </div>
          </div>

          {/* Rate */}
          <div className="w-full md:w-auto border-t md:border-t-0 border-border pt-4 md:pt-0 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Hourly Rate</p>
              <p className="text-2xl font-black text-emerald-600 flex items-center">
                ৳{tech?.rate || 500}<span className="text-xs text-muted-foreground font-normal">/hr</span>
              </p>
            </div>
          </div>

        </div>

        {/* Profile Info Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Bio & Skills */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Bio Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> About Technician
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tech?.bio || "Professional technician providing quality home maintenance services."}
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" /> Specialization & Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-accent border border-border text-foreground"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Experience & Availability */}
          <div className="space-y-6">
            
            {/* Experience Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-2">
              <p className="text-xs text-muted-foreground font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-primary" /> Experience
              </p>
              <p className="text-2xl font-black text-foreground">
                {tech?.experience || 3}+ Years
              </p>
              <p className="text-[11px] text-muted-foreground">Proven track record of home service repair work.</p>
            </div>

            {/* Availability Schedule Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-2">
              <p className="text-xs text-muted-foreground font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-primary" /> Availability
              </p>
              <p className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 p-3 rounded-2xl border border-emerald-200">
                {tech?.availability || "Sat-Thu (9:00 AM - 6:00 PM)"}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}