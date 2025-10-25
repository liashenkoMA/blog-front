import { ICategoryResponse, ITagResponse } from "@/app/_interface/interface";
import {
  getCategories,
  getCategory,
  getTag,
  getTags,
} from "@/app/_utils/articleApi";

global.fetch = jest.fn();

describe("article Api", () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // === CATEGORY ===

  describe("Category", () => {
    describe("getCategory", () => {
      let categorySlug: string;

      beforeEach(() => {
        categorySlug = "categoryslug";
      });

      it("Ошибка сети при получении данных категории", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getCategory(categorySlug)).rejects.toThrow(
          "Network Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение данных категории", async () => {
        const mockCategory: ICategoryResponse = {
          _id: "1234567890abc",
          categorySlug: "categoryslug",
          categoryName: "Категория тест",
          categoryImage: "/images/test-category.jpg",
          categoryImageAlt: "Тестовая категория",
          categoryTitle: "Тестовая категория — обучение и статьи",
          categoryDescription: "Описание тестовой категории для проверки API.",
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategory,
        } as Response);

        const res: ICategoryResponse = await getCategory(categorySlug);

        expect(res).toEqual(mockCategory);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/categories\/[^/]+$/),
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
          status: 500,
          statusText: "Internal Server Error",
          text: async () => "Internal Server Error",
          json: async () => ({}),
        } as Response);

        await expect(getCategory(categorySlug)).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getCategories", () => {
      it("Ошибка сети при получении данных категорий", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getCategories()).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение данных категорий", async () => {
        const mockCategories: ICategoryResponse[] = [
          {
            _id: "1",
            categorySlug: "test-slug-1",
            categoryName: "Категория 1",
            categoryImage: "/images/category1.jpg",
            categoryImageAlt: "Категория 1",
            categoryTitle: "Заголовок категории 1",
            categoryDescription: "Описание категории 1",
          },
          {
            _id: "2",
            categorySlug: "test-slug-2",
            categoryName: "Категория 2",
            categoryImage: "/images/category2.jpg",
            categoryImageAlt: "Категория 2",
            categoryTitle: "Заголовок категории 2",
            categoryDescription: "Описание категории 2",
          },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategories,
        } as Response);

        const res: ICategoryResponse[] = await getCategories();

        expect(res).toEqual(mockCategories);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/categories\/?$/),
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
          status: 500,
          statusText: "Internal Server Error",
          text: async () => "Internal Server Error",
          json: async () => ({}),
        } as Response);

        await expect(getCategories()).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });
  });

  // === TAG ===

  describe("Tag", () => {
    describe("getTag", () => {
      let tagSlug: string;

      beforeEach(() => {
        tagSlug = "tagslug";
      });

      it("Ошибка сети при получении данных тэга", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getTag(tagSlug)).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение данных тэга", async () => {
        const mockTag: ITagResponse = {
          _id: "1234567890abc",
          tagSlug: "tagslug",
          tagName: "Тэг тест",
          tagImage: "/images/test-tag.jpg",
          tagImageAlt: "Тестовый тэг",
          tagTitle: "Тестовый тэг — статьи и материалы",
          tagDescription: "Описание тестового тэга для проверки API.",
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTag,
        } as Response);

        const res: ITagResponse = await getTag(tagSlug);

        expect(res).toEqual(mockTag);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/tags\/[^/]+$/),
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
          status: 500,
          statusText: "Internal Server Error",
          text: async () => "Internal Server Error",
          json: async () => ({}),
        } as Response);

        await expect(getTag(tagSlug)).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getTags", () => {
      it("Ошибка сети при получении данных тэгов", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getTags()).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение данных тэгов", async () => {
        const mockTags: ITagResponse[] = [
          {
            _id: "1",
            tagSlug: "tag-1",
            tagName: "Тэг 1",
            tagImage: "/images/tag1.jpg",
            tagImageAlt: "Тэг 1",
            tagTitle: "Заголовок тэга 1",
            tagDescription: "Описание тэга 1",
          },
          {
            _id: "2",
            tagSlug: "tag-2",
            tagName: "Тэг 2",
            tagImage: "/images/tag2.jpg",
            tagImageAlt: "Тэг 2",
            tagTitle: "Заголовок тэга 2",
            tagDescription: "Описание тэга 2",
          },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTags,
        } as Response);

        const res: ITagResponse[] = await getTags();

        expect(res).toEqual(mockTags);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/tags\/?$/),
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
          status: 500,
          statusText: "Internal Server Error",
          text: async () => "Internal Server Error",
          json: async () => ({}),
        } as Response);

        await expect(getTags()).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });
  });

  // === ARTICLE ===

  describe("Article", () => {
    describe("postArticle", () => {});
    describe("getArticle", () => {});
    describe("getArticles", () => {});
    describe("getLastArticles", () => {});
    describe("getCategoryArticles", () => {});
    describe("getTagArticles", () => {});
  });
});
