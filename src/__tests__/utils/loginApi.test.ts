import { login } from "@/app/_utils/loginApi";
import * as headers from "next/headers";

global.fetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

interface FormData {
  email: string;
  password: string;
}

describe("login Api", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  let formData: FormData;

  beforeEach(() => {
    jest.clearAllMocks();

    formData = {
      email: "test@email.ru",
      password: "test",
    };
  });

  it("Ошибка сети при авторизации", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(login(formData)).rejects.toThrow("Network Error");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("Получили access_token, добавили в cookies", async () => {
    const setMock = jest.fn();
    (headers.cookies as jest.Mock).mockReturnValue({ set: setMock });

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ access_token: "token" }),
    } as Response);

    const result = await login(formData);

    expect(setMock).toHaveBeenCalledWith(
      "session",
      "token",
      expect.objectContaining({ httpOnly: true })
    );
    expect(result).toEqual({
      error: undefined,
      message: undefined,
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/auth\/signin$/),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: "test@email.ru",
          password: "test",
        }),
      })
    );
  });

  it("Сервер вернул !res.ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({
        error: "Unauthorized",
        message: "Почта или пароль не верные",
      }),
    } as Response);

    const res = await login(formData);

    expect(res).toEqual({
      error: "Unauthorized",
      message: "Почта или пароль не верные",
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
