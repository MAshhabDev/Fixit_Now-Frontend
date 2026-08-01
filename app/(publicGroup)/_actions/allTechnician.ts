/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllTechniciansAction = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician`,
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
      message: error.message || "Failed to fetch technicians",
      data: [],
    };
  }
};