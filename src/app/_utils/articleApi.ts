import {
  IArticlePayload,
  IArticlePromise,
  ICategoryPromise,
  ITagPromise,
} from "../_interface/interface";

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

// === CATEGORY ===

export async function postCategory() {}

export async function getCategory(
  categorySlug: string
): Promise<ICategoryPromise> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/categories/${categorySlug}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return checkResponse<ICategoryPromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getCategories(): Promise<ICategoryPromise[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/categories`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ICategoryPromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

// === TAG ===

export async function getTag(tagSlug: string): Promise<ITagPromise> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/tags/${tagSlug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ITagPromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getTags(): Promise<ITagPromise[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/tags`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ITagPromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

// === ARTICLE ===

export async function postArticle(
  articlePayload: IArticlePayload
): Promise<IArticlePromise> {
  try {
    const res = await fetch(`${address.baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articlePayload),
    });

    return checkResponse<IArticlePromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticle(
  articleSlug: string
): Promise<IArticlePromise> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/${articleSlug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticlePromise>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticles(): Promise<IArticlePromise[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticlePromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getLastArticles(): Promise<IArticlePromise[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/last`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticlePromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getCategoryArticles(
  categorySlug: string
): Promise<IArticlePromise[]> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/categoryarticles/${categorySlug}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return checkResponse<IArticlePromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getTagArticles(
  tagSlug: string
): Promise<IArticlePromise[]> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/tagsarticles/${tagSlug}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return checkResponse<IArticlePromise[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
