"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  technician: {
    name: string;
    avatar: string;
    location: string;
  };
}

export function ServiceCard({
  id,
  title,
  category,
  image,
  rating,
  reviewCount,
  startingPrice,
  technician,
}: ServiceCardProps) {
  return (
    <div className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* ================= 1. Service Image & Category Badge ================= */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <Image
            unoptimized
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark Overlay Gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 text-foreground backdrop-blur-md border border-border shadow-sm">
            {category}
          </span>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-white/70 font-normal">({reviewCount})</span>
          </div>
        </div>

        {/* ================= 2. Content Body ================= */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Top Technician Info */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-accent/50 border border-border/60">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-primary/20">
              <Image
                unoptimized
                src={technician.avatar}
                alt={technician.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-semibold text-foreground truncate">
                  {technician.name}
                </p>
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 truncate">
                <MapPin className="w-3 h-3 shrink-0" /> {technician.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. Footer Price & CTA ================= */}
      <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-border/60 mt-2 pt-4">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Starting from
          </p>
          <p className="text-xl font-extrabold text-primary">
            ${startingPrice}
          </p>
        </div>

        <Link href={`/services/${id}`}>
          <Button className="font-semibold rounded-xl text-xs px-4 py-2 flex items-center gap-1 cursor-pointer shadow-md transition-all hover:scale-105">
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

    </div>
  );
}