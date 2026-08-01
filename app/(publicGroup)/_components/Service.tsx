/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Wrench,
  X,
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import type { Category, ServiceItem } from "@/lib/types";

interface ServiceProps {
  allServices: ServiceItem[];
  allCategories: Category[];
}

export default function ServicesPage({
  allServices = [],
  allCategories = [],
}: ServiceProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        

        {/* MAIN CONTENT (SIDEBAR + GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* LEFT SIDEBAR FILTER PANEL UI */}
          <aside className="lg:col-span-3 bg-card border border-border p-5 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <span>Filters</span>
              </h3>
              <button 
                onClick={() => setSelectedCategory("All")}
                className="text-xs text-destructive hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Search Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search wiring, plumbing..."
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Category Filter UI */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Service Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "All"
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span>All Categories</span>
                  {selectedCategory === "All" && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>

                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.name && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector UI */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                <select className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                  <option value="All">All Locations</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                </select>
              </div>
            </div>

            {/* Price Filter Options UI */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Max Price Range
              </label>
              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                <select className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                  <option value="All">Any Price</option>
                  <option value="500">Under ৳500</option>
                  <option value="1000">Under ৳1000</option>
                  <option value="2000">Under ৳2000</option>
                </select>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN DISPLAY SERVICES GRID */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Bar */}
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-foreground">
                Showing Services in <span className="text-primary font-bold">{selectedCategory}</span>
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">
                  Sort by:
                </span>
                <select className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.length > 0 ? (
                allServices.map((serviceItem) => (
                  <ServiceCard key={serviceItem.id} service={serviceItem} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-card border border-border rounded-2xl text-xs text-muted-foreground">
                  No services available in this category.
                </div>
              )}
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}