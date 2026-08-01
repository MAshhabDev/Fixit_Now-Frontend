/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const updateServiceAction = async (serviceId: string, payload: any) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("all-services", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update service",
    };
  }
};
