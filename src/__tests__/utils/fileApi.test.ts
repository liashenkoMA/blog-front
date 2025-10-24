import { IPostFileResponse } from "@/app/_interface/interface";
import { postFile } from "@/app/_utils/fileApi";

global.fetch = jest.fn();

describe("file Api", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  let file: File;

  beforeEach(() => {
    jest.clearAllMocks();

    file = new File(["File"], "test.png", { type: "image/png" });
  });

  it("Ошибка сети при отправке файла", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(postFile(file)).rejects.toThrow("Network Error");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("Успешная загрузка файла", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ filePath: "url/image.jpg" }),
    } as Response);

    const result: IPostFileResponse = await postFile(file);

    expect(result).toEqual({ filePath: "url/image.jpg" });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/images\/upload$/),
      expect.objectContaining({
        method: "POST",
        body: expect.any(FormData),
      })
    );
    const formData = mockFetch.mock.calls[0][1]?.body as FormData;
    expect(formData.get("file")).toBe(file);
  });

  it("Сервер вернул !res.ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
      json: async () => ({}),
    } as Response);

    await expect(postFile(file)).rejects.toThrow("Ошибка загрузки файла");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
