"use client";

import React from "react";
import { ServiceCard, ServiceCardProps } from "./ServiceCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockServices: ServiceCardProps[] = [
  {
    id: "1",
    title: "Complete Home AC Servicing & Repair",
    category: "AC Repair",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 128,
    startingPrice: 49,
    technician: {
      name: "Alex Morgan",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      location: "Dhaka, Bangladesh",
    },
  },
  {
    id: "2",
    title: "Expert Kitchen & Bathroom Plumbing",
    category: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 95,
    startingPrice: 35,
    technician: {
      name: "David Miller",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      location: "Gulshan, Dhaka",
    },
  },
  {
    id: "3",
    title: "Full House Deep Cleaning & Sanitization",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 210,
    startingPrice: 79,
    technician: {
      name: "Sophia Ray",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      location: "Banani, Dhaka",
    },
  },
  {
    id: "4",
    title: "Electrical Wiring & Appliance Fixing",
    category: "Electrical",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 64,
    startingPrice: 40,
    technician: {
      name: "Robert Chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      location: "Dhanmondi, Dhaka",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PublicServices() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Rated Services</span>
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Popular Home Services
            </h2>
          </div>

          <Link href="/services">
            <Button
              variant="outline"
              className="rounded-xl flex items-center gap-2 font-semibold hover:scale-105 transition-transform"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Animated Staggered Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mockServices.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
