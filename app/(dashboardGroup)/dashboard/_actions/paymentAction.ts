/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { redirect } from "next/navigation";

export const PaymentAction = async (bookingId: string) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payment/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      }
    );

    const result = await res.json();

    if (result.success && result.data?.paymentUrl) {
      redirect(result.data.paymentUrl);
    }

    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "No Payment Data",
    };
  }
};
