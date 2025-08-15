import "./article.scss";

import { getArticle } from "@/app/_utils/articleApi";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateMetadata({
  params,
}: {
  params: { category: string; article: string };
}) {
  const article = await getArticle(params.article);

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
  const article = await getArticle(params.article);

  return (
    <div>
      <MDXRemote source={article.article} />
    </div>
  );
}
