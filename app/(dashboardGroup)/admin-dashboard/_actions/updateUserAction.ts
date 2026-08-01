/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const updateUserStatusAction = async (
  userId: string,
  status: string,
) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
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
      revalidateTag("admin-users",{expire:0});
    }

    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Failed to update user status",
    };
  }
};

export const verifyTechnicianAction = async (technicianId: string) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/technician/${technicianId}/verify`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVerified: true }),
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("admin-users",{expire:0});
    }

    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Failed to verify technician",
    };
  }
};