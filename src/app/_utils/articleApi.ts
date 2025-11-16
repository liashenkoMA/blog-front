import {
  IArticlePayload,
  IArticleResponse,
  IArticlesPageResponse,
  ICategoryResponse,
  ITagResponse,
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

export async function getCategory(
  categorySlug: string
): Promise<ICategoryResponse> {
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

    return checkResponse<ICategoryResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getCategories(): Promise<ICategoryResponse[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/categories`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ICategoryResponse[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

// === TAG ===

export async function getTag(tagSlug: string): Promise<ITagResponse> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/tags/${tagSlug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ITagResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getTags(): Promise<ITagResponse[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/tags`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<ITagResponse[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

// === ARTICLE ===

export async function postArticle(
  articlePayload: IArticlePayload
): Promise<IArticleResponse> {
  try {
    const res = await fetch(`${address.baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articlePayload),
    });

    return checkResponse<IArticleResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticle(
  articleSlug: string
): Promise<IArticleResponse> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/${articleSlug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticleResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getArticles(
  page: number
): Promise<IArticlesPageResponse> {
  try {
    const res = await fetch(`${address.baseUrl}/articles?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticlesPageResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getAllArticles(): Promise<IArticlesPageResponse> {
  try {
    const res = await fetch(`${address.baseUrl}/articles`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticlesPageResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getLastArticles(): Promise<IArticleResponse[]> {
  try {
    const res = await fetch(`${address.baseUrl}/articles/last`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return checkResponse<IArticleResponse[]>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getCategoryArticles(
  categorySlug: string,
  page: number
): Promise<IArticlesPageResponse> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/categoryarticles/${categorySlug}?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return checkResponse<IArticlesPageResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}

export async function getTagArticles(
  tagSlug: string,
  page: number
): Promise<IArticlesPageResponse> {
  try {
    const res = await fetch(
      `${address.baseUrl}/articles/tagsarticles/${tagSlug}?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return checkResponse<IArticlesPageResponse>(res);
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
