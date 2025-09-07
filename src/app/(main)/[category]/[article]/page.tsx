import "./article.scss";

import Sidebar from "@/app/_components/Sidebar/Sidebar";
import Image from "next/image";
import { getArticle, getArticles } from "@/app/_utils/articleApi";
import { notFound } from "next/navigation";
import ArticleHeader from "@/app/_components/ArticleHeader/ArticleHeader";
import { IArticlePromise } from "@/app/_interface/interface";
import { Metadata } from "next";
import { CustomMDX } from "@/app/_components/MDXRemote/MdxRemote";

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
  params: Promise<{ article: string; category: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const article = await loadArticle(awaitedParams.article);

  if (!article) {
    return { title: "Статья не найдена" };
  }

  return {
    title: article.articleTitle,
    description: article.articleDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ article: string; category: string }>;
}) {
  const awaitedParams = await params;
  const article = await loadArticle(awaitedParams.article);

  if (!article) {
    return notFound();
  }

  return (
    <div className="article">
      <ArticleHeader props={article} />
      <div className="article__body">
        <main className="article__content">
          <article className="article__post">
            <Image
              src={article.articleImg}
              alt={article.articleImgAlt}
              width={940}
              height={450}
              className="article__post-image"
            />
            <CustomMDX article={article.article} />
          </article>
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article: IArticlePromise) => ({
    category: article.articleCategory.categorySlug,
    article: article.articleSlug,
  }));
}
