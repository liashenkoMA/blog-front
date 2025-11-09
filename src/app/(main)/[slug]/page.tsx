import "./category.scss";

import PageCard from "@/app/_components/PageCard/PageCard";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import Sidebar from "@/app/_components/Sidebar/Sidebar";
import {
  getCategories,
  getCategory,
  getCategoryArticles,
  getTag,
  getTagArticles,
  getTags,
} from "@/app/_utils/articleApi";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  IArticlesPageResponse,
  ICategoryResponse,
  ITagResponse,
} from "@/app/_interface/interface";
import Pagination from "@/app/_components/Pagination/Pagination";

async function loadCategoryOrTag(slug: string): Promise<{
  type: "category" | "tag";
  data: ICategoryResponse | ITagResponse;
}> {
  const [categoryResult, tagResult] = await Promise.allSettled([
    getCategory(slug),
    getTag(slug),
  ]);

  if (categoryResult.status === "fulfilled") {
    return { type: "category", data: categoryResult.value };
  }

  if (tagResult.status === "fulfilled") {
    return { type: "tag", data: tagResult.value };
  }

  return notFound();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { type, data } = await loadCategoryOrTag(awaitedParams.slug);

  return {
    title:
      type === "category"
        ? (data as ICategoryResponse).categoryTitle
        : (data as ITagResponse).tagTitle,
    description:
      type === "category"
        ? (data as ICategoryResponse).categoryDescription
        : (data as ITagResponse).tagDescription,
  };
}

interface IPageProps {
  params: { slug: string };
  searchParams?: { page?: string };
}

export default async function Page({ params, searchParams }: IPageProps) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { type, data } = await loadCategoryOrTag(awaitedParams.slug);
  const page = Number(awaitedSearchParams?.page) || 1;

  const articlesPage: IArticlesPageResponse =
    type === "category"
      ? await getCategoryArticles(awaitedParams.slug, page)
      : await getTagArticles(awaitedParams.slug, page);

  return (
    <div className="category">
      <PageHeader
        img={
          type === "category"
            ? (data as ICategoryResponse).categoryImage
            : (data as ITagResponse).tagImage
        }
        alt={
          type === "category"
            ? (data as ICategoryResponse).categoryImageAlt
            : (data as ITagResponse).tagImageAlt
        }
        title={
          type === "category"
            ? (data as ICategoryResponse).categoryTitle
            : (data as ITagResponse).tagTitle
        }
      />
      <div className="category__container">
        <main className="category__content">
          {articlesPage.articles.map((article) => (
            <PageCard key={article._id} page={article} />
          ))}
          <Pagination
            total={articlesPage.totalCount}
            slug={awaitedParams.slug}
          />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  const categoriesParams = categories.map((category: ICategoryResponse) => ({
    slug: category.categorySlug,
  }));

  const tagParams = tags.map((tag: ITagResponse) => ({
    slug: tag.tagSlug,
  }));

  return [...categoriesParams, ...tagParams];
}
