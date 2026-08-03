/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const getUsersAction = async (query?: { page?: number; limit?: number }) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
        meta: { page: 1, totalPage: 1 },
      };
    }

    const page = query?.page || 1;
    const limit = query?.limit || 10;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch users",
      data: [],
      meta: { page: 1, totalPage: 1 },
    };
  }
};
