/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const getUsersAction = async () => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users`, {
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch users",
      data: [],
    };
  }
};
