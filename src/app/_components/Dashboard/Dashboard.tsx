"use client";

import "./dashboard.scss";
import Image from "next/image";
import { useState } from "react";

import mainsidebar from "@/app/_images/mainsidebar.png";
import logpassimg from "@/app/_images/logpasssidebar.png";
import imgsidebar from "@/app/_images/imgsidebar.png";

import ChangeSocialForm from "../ChangeSocialForm/ChangeSocialForm";
import FileImgForm from "../FileForm/FileForm";
import ArticleDownloadForm from "../ArticleDownloadForm/ArticleDownloadForm";

export default function Dashboard() {
  const [active, setActive] = useState("Main");

  return (
    <main className="content">
      <aside className="sidebar">
        <ol className="sidebar__lists">
          <li className="sidebar__list">
            <button
              type="button"
              className="sidebar__btn"
              onClick={() => setActive("Main")}
            >
              <Image
                src={mainsidebar}
                width={25}
                height={25}
                className="sidebar__img"
                alt="Иконка главной"
              ></Image>
              Главная
            </button>
          </li>
          <li className="sidebar__list">
            <button
              type="button"
              className="sidebar__btn"
              onClick={() => setActive("LogPass")}
            >
              <Image
                src={logpassimg}
                width={25}
                height={25}
                className="sidebar__img"
                alt="Иконка главной"
              ></Image>
              Изменить данные
            </button>
          </li>
          <li className="sidebar__list">
            <button
              type="button"
              className="sidebar__btn"
              onClick={() => setActive("file")}
            >
              <Image
                src={imgsidebar}
                width={25}
                height={25}
                className="sidebar__img"
                alt="Иконка главной"
              ></Image>
              Загрузить картинку
            </button>
          </li>
          <li className="sidebar__list">
            <button
              type="button"
              className="sidebar__btn"
              onClick={() => setActive("article")}
            >
              <Image
                src={imgsidebar}
                width={25}
                height={25}
                className="sidebar__img"
                alt="Иконка главной"
              ></Image>
              Добавить статью
            </button>
          </li>
        </ol>
      </aside>
      <section className="dashboard">
        {active === "Main" && <div>Главная</div>}
        {active === "LogPass" && <ChangeSocialForm />}
        {active === "file" && <FileImgForm />}
        {active === "article" && <ArticleDownloadForm />}
      </section>
    </main>
  );
}
