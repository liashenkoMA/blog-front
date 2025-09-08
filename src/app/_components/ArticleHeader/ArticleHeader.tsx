import { getUserData } from "@/app/_utils/userApi";
import "./articleheader.scss";
import Image from "next/image";
import Link from "next/link";
import { IArticlePromise } from "@/app/_interface/interface";

import tg from "@/app/_images/Telegram.svg";
import vk from "@/app/_images/VK.svg";

export default async function ArticleHeader({
  props,
}: {
  props: IArticlePromise;
}) {
  const author = await getUserData();

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
    <section className="articleheader">
      <div className="articleheader__conteiner">
        <div className="articleheader__info">
          <h1 className="articleheader__title">{props.articleH1}</h1>
          <div className="articleheader__author">
            <Link
              href={`/aboutme`}
              className="articleheader__author-avatar-link"
            >
              <Image
                src={author.avatarLink}
                width={60}
                height={60}
                alt="Аватарка пользователя"
                className="articleheader__avatar"
              />
            </Link>
            <div className="articleheader__author-info">
              <Link href={`/aboutme`} className="articleheader__author-link">
                {author.name}
              </Link>
              <p className="articleheader__date-publick">
                {getISODate(props.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="articleheader__share">
          <p className="articleheader__share-text">Share</p>
          <Link href="#" className="articleheader__share-link">
            <Image
              src={tg}
              width={20}
              height={20}
              alt="Telegram"
              className="articleheader__share-link-image"
            ></Image>
          </Link>
          <Link href="#" className="articleheader__share-link">
            <Image
              src={vk}
              width={20}
              height={20}
              alt="VK"
              className="articleheader__share-link-image"
            ></Image>
          </Link>
        </div>
      </div>
    </section>
  );
}
