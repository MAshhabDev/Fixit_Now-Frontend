/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Wrench, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { deleteServiceAction } from "../_actions/deleteServiceAction";
import { EditServiceDialog } from "./EditService";

interface TechnicianServicesListProps {
  services: any[];
}

export default function TechnicianServicesListUI({ services = [] }: TechnicianServicesListProps) {
  const [serviceList, setServiceList] = useState<any[]>(services);

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    // ⚡ 0ms UI Delete Feedback
    setServiceList((prev) => prev.filter((item) => item.id !== serviceId));

    const res = await deleteServiceAction(serviceId);

    if (res?.success) {
      toast.success("Service deleted successfully!");
    } else {
      toast.error(res?.message || "Failed to delete service");
      setServiceList(services);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
        <Wrench className="w-4 h-4 text-primary" />
        <span>Your Active Services</span>
        <span className="text-xs text-muted-foreground font-normal">({serviceList.length})</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {serviceList.length > 0 ? (
          serviceList.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-foreground text-sm line-clamp-1">{item.title}</h3>
                  <span className="text-sm font-black text-emerald-600 shrink-0 flex items-center">
                    <DollarSign className="w-3.5 h-3.5" /> ৳{item.price}
                  </span>
                </div>

                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}

                <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-primary" /> Duration: {item.duration}
                </p>
              </div>

              {/* 🟢 Action Buttons: Edit & Delete */}
              <div className="pt-2 border-t border-border flex items-center justify-end gap-2">
                <EditServiceDialog service={item} />
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-xl text-[11px] font-bold h-8 px-3 text-destructive hover:bg-destructive hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-card border border-border rounded-2xl text-xs text-muted-foreground">
            No active services found. Create your first service above!
          </div>
        )}
      </div>
    </div>
  );
}