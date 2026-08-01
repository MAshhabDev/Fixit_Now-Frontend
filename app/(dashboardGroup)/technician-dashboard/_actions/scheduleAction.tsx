/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateScheduleAction(prevState: any, formData: FormData) {
  const payload = {
    availability: formData.get("availability"),
  };

  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/availability`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update status",
    };
  }
}
