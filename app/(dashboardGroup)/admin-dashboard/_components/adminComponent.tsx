/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserStatusAction, verifyTechnicianAction } from "../_actions/updateUserAction";
import { Pagination } from "../../_components/Pagination";

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
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-xl font-bold text-foreground">User Management & Verification</h1>
          <p className="text-xs text-muted-foreground">Manage user access and verify technician accounts.</p>
        </div>

        {/* User Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">User Info</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-accent/30">
                      
                      {/* User Info */}
                      <td className="p-3 font-semibold text-foreground">
                        <p className="font-bold text-sm text-foreground">{u.name}</p>
                        <p className="text-[11px] text-muted-foreground font-normal">{u.email}</p>
                      </td>

                      {/* Role */}
                      <td className="p-3 font-bold uppercase">{u.role}</td>

                      {/* Status */}
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-destructive/10 text-destructive"
                        }`}>
                          {u.status || "ACTIVE"}
                        </span>
                      </td>

                      {/* Verification Column */}
                      <td className="p-3 font-semibold">
                        {u.role === "TECHNICIAN" ? (
                          u.technician?.isVerified ? (
                            <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                              ✓ Verified
                            </span>
                          ) : u.technician?.id ? (
                            <Button
                              size="sm"
                              onClick={() => handleVerifyTechnician(u.technician.id)}
                              className="text-[11px] font-bold px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                            >
                              Verify Tech
                            </Button>
                          ) : (
                            <span className="text-muted-foreground">Unverified</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </td>

                      {/* Block / Unblock Action */}
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          onClick={() => handleToggleBlock(u.id, u.status)}
                          className={`text-xs font-bold cursor-pointer ${
                            u.status === "ACTIVE" ? "bg-destructive text-white" : "bg-emerald-600 text-white"
                          }`}
                        >
                          {u.status === "ACTIVE" ? "Block" : "Unblock"}
                        </Button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-xs text-muted-foreground">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🟢 Admin Table Pagination */}
        <Pagination currentPage={meta.page} totalPages={meta.totalPage} />

      </div>
    </div>
  );
}