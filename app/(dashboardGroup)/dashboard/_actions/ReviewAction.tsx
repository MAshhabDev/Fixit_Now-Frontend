"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const createReviewAction = async (payload: {
  bookingId: string;
  serviceId?: string;
  rating: number;
  comment: string;
}) => {
  const token = await isAccessTokenExist();

  if (!token) {
    return { success: false, message: "Unauthorized. Please login again." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to submit review" };
  }
};