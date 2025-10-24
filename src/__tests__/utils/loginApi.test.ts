import { login } from "@/app/_utils/loginApi";
import * as headers from "next/headers";

global.fetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

describe("login API", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  let formData: FormData;

  beforeEach(() => {
    jest.clearAllMocks();

    formData = new FormData();
    formData.set("email", "test@email.ru");
    formData.set("password", "password");
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
    expect(result).toBeUndefined();
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
          password: "password",
        }),
      })
    );
  });

  it("Сервер вернул !res.ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: "Почта или пароль не верные" }),
    } as Response);

    const res = await login(formData);

    expect(res).toBe("Почта или пароль не верные");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
