/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  CreditCard,
  ShieldCheck,
  DollarSign,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function PaymentHistoryPage({ history = [] }: any) {
  const totalSpent = history.reduce(
    (acc: number, curr: any) => acc + (curr.amount || curr.booking?.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Billing & Payments</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Payment History
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            View all your completed transactions and billing invoices.
          </p>
        </div>

        {/* 2 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Total Paid Amount
            </p>
            <p className="text-3xl font-extrabold text-foreground">
              ৳{totalSpent}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-primary" /> Total Transactions
            </p>
            <p className="text-3xl font-extrabold text-foreground">
              {history.length}
            </p>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Service Details</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {history.length > 0 ? (
                  history.map((item: any) => (
                    <tr
                      key={item.id || item.transactionId}
                      className="hover:bg-accent/30 transition-colors"
                    >
                      {/* Txn ID */}
                      <td className="p-4 font-bold text-foreground">
                        <span className="font-mono text-xs text-primary flex items-center gap-1">
                          {item.transactionId || item.id || "TXN-2026"} <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </td>

                      {/* Service Details */}
                      <td className="p-4 font-bold text-foreground">
                        {item.serviceTitle || item.booking?.service?.title || "Home Repair Service"}
                      </td>

                      {/* Payment Method */}
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-accent border border-border">
                          {item.paymentMethod || "CARD"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-muted-foreground flex items-center gap-1 pt-5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date || "2026-08-01"}</span>
                      </td>

                      {/* Amount */}
                      <td className="p-4 font-extrabold text-foreground text-sm">
                        ৳{item.amount || item.booking?.totalAmount || 0}
                      </td>

                      {/* Status */}
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full text-[10px] border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Successful
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-xs text-muted-foreground"
                    >
                      No payment history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}