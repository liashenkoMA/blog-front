"use client";

import styles from "./dashboard.module.scss";
import Image from "next/image";
import { useState } from "react";

import mainsidebar from "@/app/_images/mainsidebar.png";
import logpassimg from "@/app/_images/logpasssidebar.png";
import ChangeLogPassForm from "../ChangeLogPassForm/ChangeLogPassForm";
import ChangeSocialForm from "../ChangeSocialForm/ChangeSocialForm";

export default function Dashboard() {
  const [active, setActive] = useState("Main");

  return (
    <>
      <aside className={styles.sidebar}>
        <ol className={styles.sidebar__lists}>
          <li className={styles.sidebar__list}>
            <button
              type="button"
              className={styles.sidebar__button}
              onClick={() => setActive("Main")}
            >
              <Image
                src={mainsidebar}
                width={25}
                height={25}
                className={styles.sidebar__img}
                alt="Иконка главной"
              ></Image>
              Главная
            </button>
          </li>
          <li className={styles.sidebar__list}>
            <button
              type="button"
              className={styles.sidebar__button}
              onClick={() => setActive("LogPass")}
            >
              <Image
                src={logpassimg}
                width={25}
                height={25}
                className={styles.sidebar__img}
                alt="Иконка главной"
              ></Image>
              Изменить логин/пароль
            </button>
          </li>
        </ol>
      </aside>
      <section className={styles.mainPanel}>
        {active === "Main" && <ChangeSocialForm />}
        {active === "LogPass" && <ChangeLogPassForm />}
      </section>
    </>
  );
}
