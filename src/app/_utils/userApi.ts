import { IUserResponse, IUserSocials } from "../_interface/interface";

const address = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

async function checkResponse<T>(res: Response): Promise<T> {
  const result: T = await res.json();
  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }
  return result;
}

export function getUserData(): Promise<IUserResponse> {
  return fetch(`${address.baseUrl}/user/`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse<IUserResponse>)
    .catch((err: Error) => {
      throw new Error(err.message || "Неизвестная ошибка");
    });
}

export function updateUser(formData: IUserSocials): Promise<IUserSocials> {
  return fetch(`${address.baseUrl}/user/update/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      avatarLink: `${formData.avatarLink}`,
      telegram: `${formData.telegram}`,
      vk: `${formData.vk}`,
      gitHub: `${formData.gitHub}`,
      linkedin: `${formData.linkedin}`,
      city: `${formData.city}`,
      yearFooter: `${formData.yearFooter}`,
    }),
  })
    .then(checkResponse<IUserSocials>)
    .catch((err: Error) => {
      throw new Error(err.message || "неизвестная ошибка");
    });
}
