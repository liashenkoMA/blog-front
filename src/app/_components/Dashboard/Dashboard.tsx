"use client";

import "./dashboard.scss";
import Image from "next/image";
import { useState } from "react";

import mainsidebar from "@/app/_images/mainsidebar.png";
import logpassimg from "@/app/_images/logpasssidebar.png";
import ChangeSocialForm from "../ChangeSocialForm/ChangeSocialForm";

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
              Изменить логин/пароль
            </button>
          </li>
        </ol>
      </aside>
      <section className="dashboard">
        {active === "Main" && <div>Главная</div>}
        {active === "LogPass" && <ChangeSocialForm />}
      </section>
    </main>
  );
}
