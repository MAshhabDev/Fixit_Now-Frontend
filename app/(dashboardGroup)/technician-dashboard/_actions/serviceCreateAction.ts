/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import getMe from "@/service/getMe";
import { revalidateTag } from "next/cache";

export const createServices = async (prevState: any, formData: FormData) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const userRes = await getMe();
    const user = userRes?.data?.result || userRes?.data || userRes;
    const isVerified = user?.technician?.isVerified;

    if (user?.role === "TECHNICIAN" && isVerified === false) {
      return {
        success: false,
        message: "Your profile is pending Admin Verification. You cannot create services yet!",
      };
    }

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      duration: formData.get("duration"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("all-services", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create service",
    };
  }
};