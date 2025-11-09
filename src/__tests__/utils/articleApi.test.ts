import {
  IArticlePayload,
  IArticleResponse,
  IArticlesPageResponse,
  ICategoryData,
  ICategoryResponse,
  ITagData,
  ITagResponse,
} from "@/app/_interface/interface";
import {
  getArticle,
  getArticles,
  getCategories,
  getCategory,
  getCategoryArticles,
  getLastArticles,
  getTag,
  getTagArticles,
  getTags,
  postArticle,
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
    describe("postArticle", () => {
      const mockPayload: IArticlePayload = {
        articleSlug: "test-slug",
        articleTitle: "Test Title",
        articleDescription: "Короткое описание для теста",
        articleImg: "test.jpg",
        articleImgAlt: "alt text",
        articleH1: "Заголовок H1 для теста",
        article: "Полный текст статьи для теста.",
        articleCategory: {
          categorySlug: "category-1",
          categoryName: "Категория 1",
          categoryImage: "category1.jpg",
          categoryImageAlt: "Категория 1 — изображение",
          categoryTitle: "Title категории 1",
          categoryDescription: "Описание категории 1",
        },
        articleTags: [
          {
            tagSlug: "tag-1",
            tagName: "Тег 1",
            tagImage: "tag1.jpg",
            tagImageAlt: "Тег 1 — изображение",
            tagTitle: "Title тега 1",
            tagDescription: "Описание тега 1",
          },
          {
            tagSlug: "tag-2",
            tagName: "Тег 2",
            tagImage: "tag2.jpg",
            tagImageAlt: "Тег 2 — изображение",
            tagTitle: "Title тега 2",
            tagDescription: "Описание тега 2",
          },
        ],
      };

      it("Ошибка сети при публикацие статьи", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(postArticle(mockPayload)).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешная публикация статьи", async () => {
        const mockResponse: IArticleResponse = {
          ...mockPayload,
          articleCategory: mockPayload.articleCategory as ICategoryData,
          articleTags: mockPayload.articleTags as ITagData[],
          _id: "abc123",
          createdAt: "2025-11-01T00:00:00Z",
          updatedAt: "2025-11-01T00:00:00Z",
          articleReadingTime: "3 мин",
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const res = await postArticle(mockPayload);

        expect(res).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/?$/),
          expect.objectContaining({
            method: "POST",
            headers: expect.objectContaining({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(mockPayload),
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

        await expect(postArticle(mockPayload)).rejects.toThrow(
          "Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getArticle", () => {
      let articleSlug: string;

      beforeEach(() => {
        articleSlug = "articleslug";
      });

      it("Ошибка сети при получении статьи", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getArticle(articleSlug)).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение статьи", async () => {
        const mockArticle: IArticleResponse = {
          _id: "abc123",
          createdAt: "2025-11-01T00:00:00Z",
          updatedAt: "2025-11-01T00:00:00Z",
          articleReadingTime: "3 мин",
          articleSlug: "test-slug",
          articleTitle: "Test Title",
          articleDescription: "Короткое описание для теста",
          articleImg: "test.jpg",
          articleImgAlt: "alt text",
          articleH1: "Заголовок H1 для теста",
          article: "Полный текст статьи для теста.",
          articleCategory: {
            categorySlug: "category-1",
            categoryName: "Категория 1",
            categoryImage: "category1.jpg",
            categoryImageAlt: "Категория 1 — изображение",
            categoryTitle: "Title категории 1",
            categoryDescription: "Описание категории 1",
          },
          articleTags: [
            {
              tagSlug: "tag-1",
              tagName: "Тег 1",
              tagImage: "tag1.jpg",
              tagImageAlt: "Тег 1 — изображение",
              tagTitle: "Title тега 1",
              tagDescription: "Описание тега 1",
            },
            {
              tagSlug: "tag-2",
              tagName: "Тег 2",
              tagImage: "tag2.jpg",
              tagImageAlt: "Тег 2 — изображение",
              tagTitle: "Title тега 2",
              tagDescription: "Описание тега 2",
            },
          ],
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockArticle,
        } as Response);

        const res: IArticleResponse = await getArticle(articleSlug);

        expect(res).toEqual(mockArticle);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/[^/]+$/),
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

        await expect(getArticle(articleSlug)).rejects.toThrow(
          "Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getArticles", () => {
      it("Ошибка сети при получении статей", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getArticles(1)).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение статей", async () => {
        const mockArticles: IArticleResponse[] = [
          {
            _id: "abc123",
            createdAt: "2025-11-01T00:00:00Z",
            updatedAt: "2025-11-01T00:00:00Z",
            articleReadingTime: "3 мин",
            articleSlug: "test-slug",
            articleTitle: "Test Title",
            articleDescription: "Короткое описание для теста",
            articleImg: "test.jpg",
            articleImgAlt: "alt text",
            articleH1: "Заголовок H1 для теста",
            article: "Полный текст статьи для теста.",
            articleCategory: {
              categorySlug: "category-1",
              categoryName: "Категория 1",
              categoryImage: "category1.jpg",
              categoryImageAlt: "Категория 1 — изображение",
              categoryTitle: "Title категории 1",
              categoryDescription: "Описание категории 1",
            },
            articleTags: [
              {
                tagSlug: "tag-1",
                tagName: "Тег 1",
                tagImage: "tag1.jpg",
                tagImageAlt: "Тег 1 — изображение",
                tagTitle: "Title тега 1",
                tagDescription: "Описание тега 1",
              },
              {
                tagSlug: "tag-2",
                tagName: "Тег 2",
                tagImage: "tag2.jpg",
                tagImageAlt: "Тег 2 — изображение",
                tagTitle: "Title тега 2",
                tagDescription: "Описание тега 2",
              },
            ],
          },
        ];

        const mockTotalCount = 6;

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            articles: mockArticles,
            totalCount: mockTotalCount,
          }),
        } as Response);

        const res: IArticlesPageResponse = await getArticles(1);

        expect(res).toEqual({
          articles: mockArticles,
          totalCount: mockTotalCount,
        });
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/?(\?page=\d+)?$/),
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

        await expect(getArticles(1)).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getLastArticles", () => {
      it("Ошибка сети при получении последних статей", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getLastArticles()).rejects.toThrow("Network Error");
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение последних статей", async () => {
        const mockArticles: IArticleResponse[] = [
          {
            _id: "abc123",
            createdAt: "2025-11-01T00:00:00Z",
            updatedAt: "2025-11-01T00:00:00Z",
            articleReadingTime: "3 мин",
            articleSlug: "test-slug",
            articleTitle: "Test Title",
            articleDescription: "Короткое описание для теста",
            articleImg: "test.jpg",
            articleImgAlt: "alt text",
            articleH1: "Заголовок H1 для теста",
            article: "Полный текст статьи для теста.",
            articleCategory: {
              categorySlug: "category-1",
              categoryName: "Категория 1",
              categoryImage: "category1.jpg",
              categoryImageAlt: "Категория 1 — изображение",
              categoryTitle: "Title категории 1",
              categoryDescription: "Описание категории 1",
            },
            articleTags: [
              {
                tagSlug: "tag-1",
                tagName: "Тег 1",
                tagImage: "tag1.jpg",
                tagImageAlt: "Тег 1 — изображение",
                tagTitle: "Title тега 1",
                tagDescription: "Описание тега 1",
              },
              {
                tagSlug: "tag-2",
                tagName: "Тег 2",
                tagImage: "tag2.jpg",
                tagImageAlt: "Тег 2 — изображение",
                tagTitle: "Title тега 2",
                tagDescription: "Описание тега 2",
              },
            ],
          },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockArticles,
        } as Response);

        const res: IArticleResponse[] = await getLastArticles();

        expect(res).toEqual(mockArticles);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/last\/?$/),
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

        await expect(getLastArticles()).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getCategoryArticles", () => {
      let categoryArticleSlug: string;

      beforeEach(() => {
        categoryArticleSlug = "categoryArticleSlug";
      });

      it("Ошибка сети при получении статей категории", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getCategoryArticles(categoryArticleSlug)).rejects.toThrow(
          "Network Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение статей категории", async () => {
        const mockCategoryArticles: IArticleResponse[] = [
          {
            _id: "abc123",
            createdAt: "2025-11-01T00:00:00Z",
            updatedAt: "2025-11-01T00:00:00Z",
            articleReadingTime: "3 мин",
            articleSlug: "test-slug",
            articleTitle: "Test Title",
            articleDescription: "Короткое описание для теста",
            articleImg: "test.jpg",
            articleImgAlt: "alt text",
            articleH1: "Заголовок H1 для теста",
            article: "Полный текст статьи для теста.",
            articleCategory: {
              categorySlug: "category-1",
              categoryName: "Категория 1",
              categoryImage: "category1.jpg",
              categoryImageAlt: "Категория 1 — изображение",
              categoryTitle: "Title категории 1",
              categoryDescription: "Описание категории 1",
            },
            articleTags: [
              {
                tagSlug: "tag-1",
                tagName: "Тег 1",
                tagImage: "tag1.jpg",
                tagImageAlt: "Тег 1 — изображение",
                tagTitle: "Title тега 1",
                tagDescription: "Описание тега 1",
              },
              {
                tagSlug: "tag-2",
                tagName: "Тег 2",
                tagImage: "tag2.jpg",
                tagImageAlt: "Тег 2 — изображение",
                tagTitle: "Title тега 2",
                tagDescription: "Описание тега 2",
              },
            ],
          },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategoryArticles,
        } as Response);

        const res: IArticleResponse[] = await getCategoryArticles(
          categoryArticleSlug
        );

        expect(res).toEqual(mockCategoryArticles);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/categoryarticles\/[^/]+$/),
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

        await expect(getCategoryArticles(categoryArticleSlug)).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    describe("getTagArticles", () => {
      let tagArticleSlug: string;

      beforeEach(() => {
        tagArticleSlug = "tagArticleSlug";
      });

      it("Ошибка сети при получении статей тэга", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getTagArticles(tagArticleSlug)).rejects.toThrow(
          "Network Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it("Успешное получение статей тэга", async () => {
        const mockTagArticles: IArticleResponse[] = [
          {
            _id: "abc123",
            createdAt: "2025-11-01T00:00:00Z",
            updatedAt: "2025-11-01T00:00:00Z",
            articleReadingTime: "3 мин",
            articleSlug: "test-slug",
            articleTitle: "Test Title",
            articleDescription: "Короткое описание для теста",
            articleImg: "test.jpg",
            articleImgAlt: "alt text",
            articleH1: "Заголовок H1 для теста",
            article: "Полный текст статьи для теста.",
            articleCategory: {
              categorySlug: "category-1",
              categoryName: "Категория 1",
              categoryImage: "category1.jpg",
              categoryImageAlt: "Категория 1 — изображение",
              categoryTitle: "Title категории 1",
              categoryDescription: "Описание категории 1",
            },
            articleTags: [
              {
                tagSlug: "tag-1",
                tagName: "Тег 1",
                tagImage: "tag1.jpg",
                tagImageAlt: "Тег 1 — изображение",
                tagTitle: "Title тега 1",
                tagDescription: "Описание тега 1",
              },
              {
                tagSlug: "tag-2",
                tagName: "Тег 2",
                tagImage: "tag2.jpg",
                tagImageAlt: "Тег 2 — изображение",
                tagTitle: "Title тега 2",
                tagDescription: "Описание тега 2",
              },
            ],
          },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTagArticles,
        } as Response);

        const res: IArticleResponse[] = await getTagArticles(tagArticleSlug);

        expect(res).toEqual(mockTagArticles);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/articles\/tagsarticles\/[^/]+$/),
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

        await expect(getTagArticles(tagArticleSlug)).rejects.toThrow(
          "Error: 500: Internal Server Error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
