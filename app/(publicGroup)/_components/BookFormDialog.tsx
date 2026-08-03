/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, User } from "lucide-react";
import { toast } from "sonner";
import { BookingAction } from "../_actions/bookingAction"; // 👈 ইমপোর্ট যুক্ত করা হলো
import { useRouter } from "next/navigation";

type BookingDialogProps = {
  service: any;
};

export function BookingDialog({ service }: BookingDialogProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    BookingAction,
    null,
  ) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Booking request submitted successfully!");
      setOpen(false);

      router.push("/dashboard/my-booking");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state,router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="w-full rounded-xl font-bold text-xs py-5 shadow-md cursor-pointer flex items-center justify-center gap-2">
          <Wrench className="w-4 h-4" />
          <span>Book Service Now</span>
        </Button>
      </DialogTrigger>

      {/* Dialog Body */}
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Wrench className="w-5 h-5 text-primary" />
            <span>Book Service Request</span>
          </DialogTitle>
        </DialogHeader>

        {/* Selected Service Summary */}
        <div className="bg-accent/50 p-4 rounded-2xl border border-border space-y-1">
          <p className="text-xs font-extrabold text-foreground line-clamp-1">
            {service.title}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-primary" /> Pro:{" "}
              {service.technician?.user?.name || "Expert"}
            </span>
            <span className="font-extrabold text-primary text-base">
              ৳{service.price}
            </span>
          </div>
        </div>

        {/* Form Container */}
        <form action={formAction} className="space-y-4 pt-2">
          <input type="hidden" name="serviceId" value={service.id} />
          <input
            type="hidden"
            name="technicianId"
            value={service.technicianId || service.technician?.id || ""}
          />

          {/* Booking Date */}
          <div className="space-y-2">
            <Label htmlFor="bookingDate" className="text-xs font-semibold">
              Booking Date
            </Label>
            <Input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              className="rounded-xl text-xs"
            />
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label htmlFor="timeSlot" className="text-xs font-semibold">
              Preferred Time Slot
            </Label>
            <select
              id="timeSlot"
              name="timeSlot"
              required
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="10:00 AM - 12:00 PM">
                10:00 AM - 12:00 PM (Morning)
              </option>
              <option value="02:00 PM - 04:00 PM">
                02:00 PM - 04:00 PM (Afternoon)
              </option>
              <option value="05:00 PM - 07:00 PM">
                05:00 PM - 07:00 PM (Evening)
              </option>
            </select>
          </div>

          {/* Service Address */}
          <div className="space-y-2">
            <Label htmlFor="serviceAddress" className="text-xs font-semibold">
              Service Address Location
            </Label>
            <Textarea
              id="serviceAddress"
              name="serviceAddress"
              required
              placeholder="Road 8A, House 12, Dhanmondi, Dhaka..."
              className="min-h-24 rounded-xl text-xs"
            />
          </div>

          {/* Footer Actions */}
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="rounded-xl text-xs font-bold shadow-md"
            >
              {pending ? "Submitting Request..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
