/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { updateScheduleAction } from "../_actions/scheduleAction";

export default function TechnicianSchedulePage() {
  const [state, formAction, pending] = useActionState(updateScheduleAction, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Availability updated successfully!");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Technician Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Update Availability</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Set your working schedule details for customer visibility.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <form action={formAction} className="space-y-4">
            
            {/* Availability Text Input */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-xs font-semibold">
                Working Availability Details
              </Label>
              <Input
                id="availability"
                name="availability"
                required
                defaultValue="Everyday, 9:00 AM - 5:00 PM"
                placeholder="e.g. Everyday, 9:00 AM - 5:00 PM"
                className="rounded-xl text-xs"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={pending}
                className="rounded-xl text-xs font-bold px-6 py-5 shadow-md cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{pending ? "Saving..." : "Save Availability"}</span>
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}