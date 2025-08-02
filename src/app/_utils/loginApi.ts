import { cookies } from "next/headers";
import { ILoginResponse } from "../_interface/interface";

const auth = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function login(formData: FormData): Promise<string | undefined> {
  const email = formData.get("email");
  const password = formData.get("password");

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

    const expires = new Date(Date.now() + 1000 * 1000);

    if (data.access_token) {
      (await cookies()).set("session", data.access_token, {
        expires,
        httpOnly: true,
      });
    }

    return data.error;
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
