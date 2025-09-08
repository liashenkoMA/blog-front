import "./article.scss";

import Sidebar from "@/app/_components/Sidebar/Sidebar";
import Image from "next/image";
import { getArticle, getArticles } from "@/app/_utils/articleApi";
import { notFound } from "next/navigation";
import ArticleHeader from "@/app/_components/ArticleHeader/ArticleHeader";
import { IArticlePromise } from "@/app/_interface/interface";
import { Metadata } from "next";
import { CustomMDX } from "@/app/_components/MDXRemote/MdxRemote";

async function loadArticle(articleSlug: string): Promise<IArticlePromise> {
  const article = await getArticle(articleSlug);

  if (!article) {
    return notFound();
  }

  return article;
}

export async function generateMetadata({
  params,
}: {
  params: { article: string; category: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const article = await loadArticle(awaitedParams.article);

  return {
    title: article.articleTitle,
    description: article.articleDescription,
  };
}

export default async function Page({
  params,
}: {
  params: { article: string; category: string };
}) {
  const awaitedParams = await params;
  const article = await loadArticle(awaitedParams.article);

  return (
    <div className="article">
      <ArticleHeader props={article} />
      <div className="article__container">
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
