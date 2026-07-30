/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";

import type { LoginResponse, RegisterApiResponse } from "@/lib/types";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validation/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const RegisterAction = async (
  prevState: RegisterApiResponse,
  payload: RegisterFormValues,
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
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
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

export const LoginAction = async (
  prevState: LoginResponse,
  payload: LoginFormValues,
) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success && result.data?.accessToken) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      cookieStore.set("refreshToken", result.data.refreshToken || result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });

      // JWT Decode
      const decodeToken = jwt.decode(result.data.accessToken) as JwtPayload;
      const userRole = decodeToken?.role || result.data.user?.role;

      

      if (userRole === "CUSTOMER") {
        redirect("/dashboard/customer");
      } else if (userRole === "TECHNICIAN") {
        redirect("/dashboard/technician");
      } else if (userRole === "ADMIN") {
        redirect("/dashboard/admin");
      }
    }

    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Login failed",
    };
  }
};