import { IArticle, IArticlePromise } from "../_interface/interface";

const address = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error: ${res.status}: ${text}`);
  }
  const result: T = await res.json();
  return result;
}

export async function postArticle(data: IArticle): Promise<IArticlePromise> {
  try {
    const res = await fetch(`${address.baseUrl}/articles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await checkResponse<IArticlePromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticle(urlArticle: string): Promise<IArticlePromise> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/getarticle/${urlArticle}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await checkResponse<IArticlePromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticleCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/all_categories`, {
      method: "GET",
      credentials: "include",
    });

    return await checkResponse<string[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
