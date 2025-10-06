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
import { ICategoryPromise, ITagPromise } from "@/app/_interface/interface";

async function loadCategoryOrTag(
  slug: string
): Promise<{ type: "category" | "tag"; data: ICategoryPromise | ITagPromise }> {
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
        ? (data as ICategoryPromise).categoryTitle
        : (data as ITagPromise).tagTitle,
    description:
      type === "category"
        ? (data as ICategoryPromise).categoryDescription
        : (data as ITagPromise).tagDescription,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;

  const { type, data } = await loadCategoryOrTag(awaitedParams.slug);

  const articles =
    type === "category"
      ? await getCategoryArticles(awaitedParams.slug)
      : await getTagArticles(awaitedParams.slug);

  return (
    <div className="category">
      <PageHeader
        img={
          type === "category"
            ? (data as ICategoryPromise).categoryImage
            : (data as ITagPromise).tagImage
        }
        alt={
          type === "category"
            ? (data as ICategoryPromise).categoryImageAlt
            : (data as ITagPromise).tagImageAlt
        }
        title={
          type === "category"
            ? (data as ICategoryPromise).categoryTitle
            : (data as ITagPromise).tagTitle
        }
      />
      <div className="category__container">
        <main className="category__content">
          {articles.map((article) => (
            <PageCard key={article._id} page={article} />
          ))}
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  const categoriesParams = categories.map((category: ICategoryPromise) => ({
    slug: category.categorySlug,
  }));

  const tagParams = tags.map((tag: ITagPromise) => ({
    slug: tag.tagSlug,
  }));

  return [...categoriesParams, ...tagParams];
}
