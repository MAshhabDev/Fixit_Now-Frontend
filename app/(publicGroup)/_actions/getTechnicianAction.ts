/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getSingleTechnicianAction = async (technicianId: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/${technicianId}`,
      {
        method: "GET",
        headers: {
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
      message: error.message || "Failed to fetch technician details",
      data: null,
    };
  }
};