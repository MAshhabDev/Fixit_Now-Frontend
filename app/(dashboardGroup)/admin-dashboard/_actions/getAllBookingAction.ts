"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const getAllBookingsAdminAction = async () => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch bookings",
      data: [],
    };
  }
};