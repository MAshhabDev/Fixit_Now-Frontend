import React from "react";
import { getPaymentDetailsAction } from "../../_actions/paymentDetails";
import PaymentDetailsUI from "../../_components/paymentDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getPaymentDetailsAction(id);
  const payment = res?.data || null;

  return <PaymentDetailsUI payment={payment} />;
}