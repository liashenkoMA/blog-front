import { IUserResponse, IUserSocials } from "@/app/_interface/interface";
import { getUserData, updateUser } from "@/app/_utils/userApi";

global.fetch = jest.fn();

describe("user Api", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserData", () => {
    it("Ошибка сети при получении данных пользователя", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getUserData()).rejects.toThrow("Network Error");
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("Успешное получение данных пользователя", async () => {
      const mockUser: IUserResponse = {
        _id: 42,
        name: "Иван",
        familyName: "Петров",
        email: "ivan.petrov@example.com",
        mySite: "https://ivan.dev",
        avatarLink: "https://example.com/avatar.jpg",
        telegram: "@ivanpetrov",
        vk: "vk.com/ivanpetrov",
        gitHub: "github.com/ivanpetrov",
        linkedin: "linkedin.com/in/ivanpetrov",
        city: "Москва",
        yearFooter: "2025",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const data: IUserResponse = await getUserData();

      expect(data).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/user\/$/),
        expect.objectContaining({
          method: "GET",
          credentials: "include",
          headers: expect.objectContaining({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("Сервер вернул !res.ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Forbidden",
        json: async () => ({}),
      } as Response);

      await expect(getUserData()).rejects.toThrow("Error: Forbidden");
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    let mockFormData: IUserSocials;

    beforeEach(() => {
      jest.clearAllMocks();

      mockFormData = {
        avatarLink: "https://example.com/avatar.jpg",
        telegram: "@user",
        vk: "vk.com/user",
        gitHub: "github.com/user",
        linkedin: "linkedin.com/in/user",
        city: "Москва",
        yearFooter: "2025",
      };
    });

    it("Ошибка сети при обновлении данных пользователя", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network Error"));

      await expect(updateUser(mockFormData)).rejects.toThrow("Network Error");
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("Успешное обновление данных пользователя", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockFormData,
      } as Response);

      const data = await updateUser(mockFormData);

      expect(data).toEqual(mockFormData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/user\/update\/$/),
        expect.objectContaining({
          method: "PATCH",
          credentials: "include",
          headers: expect.objectContaining({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(mockFormData),
        })
      );
    });

    it("Сервер вернул !res.ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Forbidden",
        json: async () => ({}),
      } as Response);

      await expect(updateUser(mockFormData)).rejects.toThrow("Forbidden");
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
