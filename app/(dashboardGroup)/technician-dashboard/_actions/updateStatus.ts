/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateStatus = async (bookingId: string, status: string) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard");
      revalidatePath("/technician-dashboard");

      revalidateTag("my-booking", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update booking status",
    };
  }
};
