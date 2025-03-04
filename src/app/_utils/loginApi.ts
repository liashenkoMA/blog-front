import { cookies } from "next/headers";

const auth = {
  baseUrl: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "no-cors",
  },
};

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${auth.baseUrl}/auth/signin`, {
    method: "POST",
    headers: auth.headers,
    credentials: "include",
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    }),
  }).then((res) => {
    return res.json();
  });
  const expires = new Date(Date.now() + 1000 * 1000);

  if (res.access_token) {
    (await cookies()).set("session", res.access_token, {
      expires,
      httpOnly: true,
    });
  }

  return res.error;
}
