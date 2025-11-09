import "./blog.scss";

import { getArticles } from "@/app/_utils/articleApi";
import { getUserData } from "@/app/_utils/userApi";
import PageCard from "@/app/_components/PageCard/PageCard";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import Sidebar from "@/app/_components/Sidebar/Sidebar";
import { Metadata } from "next";
import Pagination from "@/app/_components/Pagination/Pagination";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "На этой странице вы можете найти все доступные на данный момент статьи моего блога. Надеюсь они вам понравятся.",
};

export default async function Page() {
  const [articles, user] = await Promise.all([getArticles(), getUserData()]);

  return (
    <div className="blog">
      <PageHeader
        img={user.avatarLink}
        alt="Моя аватарка"
        title="Статьи моего блога"
      />
      <div className="blog__container">
        <main className="blog__content">
          {articles.map((article) => (
            <PageCard key={article._id} page={article} />
          ))}
          <Pagination total={10} slug={"/blog"} />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
