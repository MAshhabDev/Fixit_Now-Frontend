"use server";

import type { CreateBooking } from "@/lib/types";
import { getNewAccessToken } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const PaymentAction = async (bookingId: string) => {
  try {
    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value || null;
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if (!accessToken && !refreshToken) {
      // throw new Error("User Not Logged In!");

      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        )
      : null;

    const decodedRefreshToken = refreshToken
      ? jwtUtils.verifyToken(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string,
        )
      : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
      //access token has expired but refresh token is valid, get new access token from backend
      const result = await getNewAccessToken();

      if (result.success) {
        const newAccessToken = result.data.accessToken;

        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
        });

        accessToken = newAccessToken;
      }
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
      },
    );

    const result = await res.json();

    if (result.success && result.data.paymentUrl) {
      redirect(result.data.paymentUrl);
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "No Payment Data",
    };
  }
};
