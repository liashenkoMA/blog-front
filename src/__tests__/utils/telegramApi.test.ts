import { telegramBot } from "@/app/_utils/telegramApi";

global.fetch = jest.fn();

describe("telegram Api", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  let formData: FormData;

  beforeAll(() => {
    process.env.BOT_TOKEN = "TEST_BOT_TOKEN";
    process.env.CHAT_ID = "123456";
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});

    formData = new FormData();
    formData.set("email", "test@email.ru");
    formData.set("name", "Test");
    formData.set("message", "Hello World!");
  });

  afterAll(() => {
    jest.restoreAllMocks();

    delete process.env.BOT_TOKEN;
    delete process.env.CHAT_ID;
  });

  it("Ошибка сети при отправке сообщения", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    const res = await telegramBot(formData);

    expect(res).toBeNull();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("Успешная отправка сообщения", async () => {
    const messageData = `
    Новое сообщение:
    Имя: Test
    Почта: test@email.ru
    Сообщение: Hello World!
    `;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: "ok" }),
    } as Response);

    const res = await telegramBot(formData);

    expect(res).toEqual({ result: "ok" });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(
        `^https://api\\.telegram\\.org/bot${process.env.BOT_TOKEN}/sendMessage$`
      ),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: messageData,
          parse_mode: "HTML",
        }),
      })
    );
  });

  it("Сервер вернул !res.ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
      json: async () => ({}),
    } as Response);

    const res = await telegramBot(formData);

    expect(res).toBeNull();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
