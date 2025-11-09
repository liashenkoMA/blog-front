"use server";

import { cookies } from "next/headers";
import { ILoginResponse } from "../_interface/interface";

const auth = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function login(formData: {
  email: string;
  password: string;
}): Promise<{ error?: string; message?: string }> {
  const { email, password } = formData;

  try {
    const res = await fetch(`${auth.baseUrl}/auth/signin`, {
      method: "POST",
      headers: auth.headers,
      credentials: "include",
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });

    const data: ILoginResponse = await res.json();

    const expires = new Date(Date.now() + 60 * 60 * 1000);

    if (data.access_token) {
      (await cookies()).set("session", data.access_token, {
        expires,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }

    return { error: data.error, message: data.message };
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
