/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { RegisterApiResponse } from "@/lib/types";
import type { RegisterFormValues } from "@/lib/validation/auth";

export const RegisterAction = async (
  prevState: RegisterApiResponse,
  payload:RegisterFormValues,
) => {
  // const email = formdata.get("email");

  // const name = formdata.get("name");

  // const role = formdata.get("role");

  // const phone = formdata.get("phone");

  // const password = formdata.get("password");

  // const payload = {
  //   name,
  //   email,
  //   phone,
  //   role,
  //   password,
  // };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result; 
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "Registration failed",
      data: [],
    };
  }
};

