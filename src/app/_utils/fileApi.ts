import { PostFileResponse } from "../_interface/interface";

const auth = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export async function postFile(file: File): Promise<PostFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${auth.baseUrl}/images/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Ошибка загрузки файла");
    }

    const data: PostFileResponse = await res.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message || "Неизвестная ошибка");
  }
}
