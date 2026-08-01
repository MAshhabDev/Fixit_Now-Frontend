"use server";

import { getNewAccessToken } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createServices = async (prevState: any, formData: FormData) => {
  try {
    const cookieStore = await cookies();

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      duration: formData.get("duration"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
      method: "POST",
      headers: {
        // Authorization : accessToken as unknown as string,
        // Authorization : `${accessToken}`,
        Authorization: `Bearer ${accessToken}`,

        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update status",
    };
  }
};
