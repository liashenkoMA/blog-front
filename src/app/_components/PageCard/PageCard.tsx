import "./pageCard.scss";

import { IArticlePromise } from "@/app/_interface/interface";
import Image from "next/image";
import Link from "next/link";
import time from "@/app/_images/Time.png";
import calendar from "@/app/_images/Calendar.png";

export default function PageCard({ page }: { page: IArticlePromise }) {
  function getISODate(date: string) {
    const formattedDate = new Date(date);

    return formattedDate.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <article className="pagecard">
      <Link
        href={`${page.articleCategory.categorySlug}/${page.articleSlug}`}
        className="pagecard__image-link"
      >
        <Image
          src={page.articleImg}
          width={270}
          height={270}
          loading="lazy"
          alt={page.articleImgAlt}
          className="pagecard__image"
        />
      </Link>
      <div className="pagecard__info">
        <Link
          href={`${page.articleCategory.categorySlug}`}
          className="pagecard__categorie-link"
        >
          {page.articleCategory.categoryName}
        </Link>
        <Link
          href={`${page.articleCategory.categorySlug}/${page.articleSlug}`}
          className="pagecard__title  pagecard__link_color"
        >
          {page.articleH1}
        </Link>
        <p className="pagecard__description">
          {`${page.article.slice(0, 250)}...`}
        </p>
        <div className="pagecard__times">
          <p className="pagecard__time pagecard__time_type_publick">
            <Image
              src={calendar}
              width={18}
              height={18}
              alt="Time"
              className="pagecard__timeread-icon"
            />
            {getISODate(page.createdAt)}
          </p>
          <p className="pagecard__time pagecard__time_type_read">
            <Image
              src={time}
              width={18}
              height={18}
              alt="Time"
              className="pagecard__timeread-icon"
            />
            {page.articleReadingTime} mins read
          </p>
        </div>
      </div>
    </article>
  );
}
