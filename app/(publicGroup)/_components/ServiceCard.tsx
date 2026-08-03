/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: any;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const defaultImage = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800";
  const techUser = service?.technician?.user || service?.technician;

  return (
    <div className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <Image
            unoptimized
            src={service?.image || defaultImage}
            alt={service?.title || "Service"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark Overlay Gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Category Badge */}
          {service?.category?.name && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 text-foreground backdrop-blur-md border border-border shadow-sm">
              {service.category.name}
            </span>
          )}

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>
              {service?.averageRating ? Number(service.averageRating).toFixed(1) : "5.0"}
            </span>
            <span className="text-white/70 font-normal">
              ({service?.totalReviews || 0})
            </span>
          </div>
        </div>

        {/* ================= 2. Content Body ================= */}
        <div className="p-5 space-y-4">
          <Link href={`/services/${service.id}`}>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 cursor-pointer">
              {service?.title}
            </h3>
          </Link>

          {/* Top Technician Info */}
          {techUser && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-accent/50 border border-border/60">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {techUser.name || "Verified Technician"}
                  </p>
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />{" "}
                  {service?.technician?.location || "Dhaka, Bangladesh"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex items-center justify-between gap-2 border-t border-border/60 mt-2 pt-4">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Starting from
          </p>
          <p className="text-xl font-extrabold text-emerald-600">
            ৳{service?.price || 0}
          </p>
        </div>

        <div className="shrink-0">
          <Link href={`/services/${service?.id}`}>
            <Button
              size="sm"
              className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white cursor-pointer px-4 flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}