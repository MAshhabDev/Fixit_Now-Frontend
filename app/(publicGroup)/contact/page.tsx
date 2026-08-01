import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <MessageSquare className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Contact Support Team
          </h1>
          
          <p className="text-xs sm:text-sm text-muted-foreground">
            Have questions about a service booking or technical support? We are here to help 24/7.
          </p>
        </div>

        {/* Main Grid: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-3">
                Contact Information
              </h2>

              <div className="space-y-5 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Customer Helpline</p>
                    <p className="text-muted-foreground">+880 1708-570000</p>
                    <p className="text-muted-foreground">+880 1800-123456</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Email Address</p>
                    <p className="text-muted-foreground">support@fixitnow.com</p>
                    <p className="text-muted-foreground">info@fixitnow.com</p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Headquarters</p>
                    <p className="text-muted-foreground">House 12, Road 8A, Dhanmondi, Dhaka 1209, Bangladesh</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Service Hours</p>
                    <p className="text-muted-foreground">Sat - Thu: 9:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground">Friday: 2:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-foreground">Send Us a Message</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Fill out the form below and our support representative will respond shortly.</p>
              </div>

              <form className="space-y-4 text-xs">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name" className="text-xs font-semibold">Your Full Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="e.g. Mahir Ashhab"
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-semibold">Your Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="mahir@gmail.com"
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject" className="text-xs font-semibold">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    required
                    placeholder="e.g. Service Booking Query"
                    className="rounded-xl text-xs"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className="text-xs font-semibold">Your Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Write your message or feedback here..."
                    className="min-h-28 rounded-xl text-xs"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto rounded-2xl font-bold text-xs px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}