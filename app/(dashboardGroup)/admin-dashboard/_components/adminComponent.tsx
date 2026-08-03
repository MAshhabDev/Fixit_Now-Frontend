/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  updateUserStatusAction,
  verifyTechnicianAction,
} from "../_actions/updateUserAction";
import { Pagination } from "../../_components/Pagination";
import {
  Users,
  ShieldCheck,
  DollarSign,
  Search,
  UserX,
  UserCheck,
} from "lucide-react";
import { CreateCategoryDialog } from "./CategoryDialog";

interface AdminUserUIProps {
  users: any[];
  meta?: {
    page: number;
    totalPage: number;
  };
}

export default function AdminUserManagementUI({
  users = [],
  meta = { page: 1, totalPage: 1 },
}: AdminUserUIProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalUsersCount = users.length;
  const activeTechnicians = users.filter((u) => u.role === "TECHNICIAN").length;

  const handleToggleBlock = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const res = await updateUserStatusAction(userId, newStatus);

    if (res?.success) {
      toast.success(`User status updated to ${newStatus}!`);
    } else {
      toast.error(res?.message || "Failed to update status");
    }
  };

  const handleVerifyTechnician = async (techId: string) => {
    const res = await verifyTechnicianAction(techId);

    if (res?.success) {
      toast.success("Technician verified successfully!");
    } else {
      toast.error(res?.message || "Failed to verify technician");
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Create Category Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">
              Admin Control Center
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage user accounts, verify technicians, and add service
              categories.
            </p>
          </div>

          <CreateCategoryDialog />
        </div>

        {/* 🟢 1. GLOBAL OVERVIEW STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Total Registered Users
              </p>
              <p className="text-2xl font-black text-foreground">
                {totalUsersCount}
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Active Technicians
              </p>
              <p className="text-2xl font-black text-foreground">
                {activeTechnicians}
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Est. Service Revenue
              </p>
              <p className="text-2xl font-black text-foreground">৳ 45,000</p>
            </div>
          </div>
        </div>

        {/* 🟢 2. USER MANAGEMENT TABLE & SEARCH */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm space-y-4 p-4">
          {/* Table Search Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search user by name or email..."
                className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
              Showing{" "}
              <span className="text-primary font-bold">
                {filteredUsers.length}
              </span>{" "}
              users
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">User Info</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3 text-right">Ban / Unban Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-accent/30">
                      {/* User Info */}
                      <td className="p-3 font-semibold text-foreground">
                        <p className="font-bold text-sm text-foreground">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-normal">
                          {u.email}
                        </p>
                      </td>

                      {/* Role */}
                      <td className="p-3 font-bold uppercase">{u.role}</td>

                      {/* Status Badge */}
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.status === "ACTIVE"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {u.status || "ACTIVE"}
                        </span>
                      </td>

                      {/* Tech Verification */}
                      <td className="p-3 font-semibold">
                        {u.role === "TECHNICIAN" ? (
                          u.technician?.isVerified ? (
                            <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                              ✓ Verified Pro
                            </span>
                          ) : u.technician?.id ? (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleVerifyTechnician(u.technician.id)
                              }
                              className="text-[11px] font-bold px-3 py-1 bg-primary text-white cursor-pointer"
                            >
                              Verify Tech
                            </Button>
                          ) : (
                            <span className="text-muted-foreground">
                              Unverified
                            </span>
                          )
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </td>

                      {/* Ban / Unban Action Button */}
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          disabled={u.role === "ADMIN"} // 🟢 অ্যাডমিনদের ব্লক করা বন্ধ
                          onClick={() => handleToggleBlock(u.id, u.status)}
                          className={`text-xs font-bold cursor-pointer ${
                            u.status === "ACTIVE"
                              ? "bg-destructive hover:bg-destructive/90 text-white"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white"
                          }`}
                        >
                          {u.status === "ACTIVE" ? (
                            <span className="flex items-center gap-1">
                              <UserX className="w-3.5 h-3.5" /> Ban User
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5" /> Unban User
                            </span>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-xs text-muted-foreground"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🟢 3. TABLE PAGINATION */}
        <Pagination currentPage={meta.page} totalPages={meta.totalPage} />
      </div>
    </div>
  );
}