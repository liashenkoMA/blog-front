import "./lastArticles.scss";

import PageCard from "../PageCard/PageCard";
import { getLastArticles } from "@/app/_utils/articleApi";
import Sidebar from "../Sidebar/Sidebar";
import Link from "next/link";

export default async function Page() {
  const lastArticles = await getLastArticles();

  return (
    <section className="lastarticles">
      <div className="lastarticles__info">
        <h2 className="lastarticles__title">Новые статьи</h2>
        <p className="lastarticles__text">Последние статьи моего блога!</p>
      </div>
      <div className="lastarticles__container">
        <div className="lastarticles__content">
          {lastArticles.map((article) => (
            <PageCard key={article._id} page={article} />
          ))}
        </div>
        <Sidebar />
      </div>
      <Link href={`/blog`} className="lastarticles__link">
        Все статьи
      </Link>
    </section>
  );
}
