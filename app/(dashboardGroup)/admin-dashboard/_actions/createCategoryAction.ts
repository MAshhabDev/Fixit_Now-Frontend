/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getNewAccessToken } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createCategoryAction(prevState: any, formData: FormData) {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
  };

  try {
    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value || null;
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if (!accessToken && !refreshToken) {
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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
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
      revalidateTag("all-categories", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Failed to create category",
    };
  }
}
