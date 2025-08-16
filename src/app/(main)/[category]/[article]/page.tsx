import { IArticlePromise } from "@/app/_interface/interface";
import "./article.scss";

import { getArticle, getArticles } from "@/app/_utils/articleApi";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

async function loadArticle(articleSlug: string) {
  const article = await getArticle(articleSlug);

  if (!article) {
    return null;
  }

  return article;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; article: string };
}) {
  const article = await loadArticle(params.article);

  if (!article) {
    return { title: "Статья не найдена" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function Page({
  params,
}: {
  params: { category: string; article: string };
}) {
  const article = await loadArticle(params.article);

  if (!article) {
    return notFound();
  }

  return (
    <div>
      <MDXRemote source={article.article} />
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article: IArticlePromise) => ({
    category: article.category,
    article: article.slug,
  }));
}
