"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full bg-background py-12 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: Text & Actions ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
            >
              Your Trusted Partner for <br className="hidden sm:block" />
              Home & Corporate <br className="hidden sm:block" />
              Services
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl font-normal"
            >
              From deep cleaning to bouncers — get expert help at your doorstep.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/services">
                <Button className="text-sm font-bold px-7 py-6 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.03]">
                  Book Now
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent text-sm font-semibold px-6 py-6 rounded-xl cursor-pointer transition-all flex items-center gap-2 hover:scale-[1.03]"
                >
                  <Play className="w-4 h-4 fill-primary text-primary" />
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* App Store & Play Store Download Links */}
       
          </motion.div>

          {/* ================= RIGHT COLUMN: Hero Image ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-border group">
              <Image
                unoptimized
                src="https://i.ibb.co.com/LXkVj3tq/part-male-construction-worker-329181-3734.avif"
                alt="Home Services Helper"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}