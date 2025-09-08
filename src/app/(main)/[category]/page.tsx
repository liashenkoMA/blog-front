import "./category.scss";

import PageCard from "@/app/_components/PageCard/PageCard";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import Sidebar from "@/app/_components/Sidebar/Sidebar";
import {
  getCategories,
  getCategory,
  getCategoryArticles,
} from "@/app/_utils/articleApi";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ICategoryPromise } from "@/app/_interface/interface";

async function loadCategory(slug: string): Promise<ICategoryPromise> {
  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  return category;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const category = await loadCategory(awaitedParams.category);

  return {
    title: category.categoryTitle,
    description: category.categoryDescription,
  };
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const awaitedParams = await params;
  const [category, articles] = await Promise.all([
    loadCategory(awaitedParams.category),
    getCategoryArticles(awaitedParams.category),
  ]);

  return (
    <div className="category">
      <PageHeader
        img={category.categoryImage}
        alt={category.categoryImageAlt}
        title={category.categoryTitle}
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
  const categories = await getCategories();

  return categories.map((category: ICategoryPromise) => ({
    category: category.categorySlug,
  }));
}
