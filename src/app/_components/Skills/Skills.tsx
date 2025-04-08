import "./skills.scss";

import Image from "next/image";
import html from "@/app/_images/html.png";
import css from "@/app/_images/css-3.png";
import js from "@/app/_images/js.png";
import ts from "@/app/_images/typescript.png";
import react from "@/app/_images/react.png";
import next from "@/app/_images/nextjs.png";
import nest from "@/app/_images/NestJS.svg.png";
import mongo from "@/app/_images/mongodb.png";

export default async function Skills() {
  return (
    <section className="skills">
      <div className="skills__content">
        <h2 className="skills__title">Навыки</h2>
        <ol className="skills__techs">
          <li className="skills__tech">
            <Image
              src={html}
              width={60}
              height={60}
              alt="Иконка html"
              className="skills__icon"
            />
            <p className="skills__header">HTML</p>
            <p className="skills__description">
              Стандартизированный язык гипертекстовой разметки документов для
              просмотра веб-страниц в браузере.
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={css}
              width={60}
              height={60}
              alt="Иконка css"
              className="skills__icon"
            />
            <p className="skills__header">CSS</p>
            <p className="skills__description">
              Формальный язык декорирования и описания внешнего вида документа,
              написанного с использованием языка разметки (чаще всего HTML или
              XHTML)
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={js}
              width={60}
              height={60}
              alt="Иконка js"
              className="skills__icon"
            />
            <p className="skills__header">JavaScript</p>
            <p className="skills__description">
              Мультипарадигменный язык программирования. Поддерживает
              объектно-ориентированный, императивный и функциональный стили.
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={ts}
              width={60}
              height={60}
              alt="Иконка ts"
              className="skills__icon"
            />
            <p className="skills__header">TypeScript</p>
            <p className="skills__description">
              Язык программирования, представленный Microsoft в 2012 году и
              позиционируемый как инструмент, расширяющий возможности
              JavaScript.
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={react}
              width={60}
              height={60}
              alt="Иконка react"
              className="skills__icon"
            />
            <p className="skills__header">React</p>
            <p className="skills__description">
              NetTracking" is a very powerful Web 2.0 site search engine allows
              you to find email allerts
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={next}
              width={60}
              height={60}
              alt="Иконка nextjs"
              className="skills__icon"
            />
            <p className="skills__header">NextJs</p>
            <p className="skills__description">
              JavaScript фреймворк, использующий React для построения Server
              Side Render-приложений (SSR) и статически-генерируемых сайтов.
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={nest}
              width={60}
              height={60}
              alt="Иконка nestjs"
              className="skills__icon"
            />
            <p className="skills__header">NestJs</p>
            <p className="skills__description">
              Фреймворк для создания эффективных, масштабируемых Node.js
              веб-приложений
            </p>
          </li>
          <li className="skills__tech">
            <Image
              src={mongo}
              width={60}
              height={60}
              alt="Иконка mongodb"
              className="skills__icon"
            />
            <p className="skills__header">MongoDB</p>
            <p className="skills__description">
              Документоориентированная система управления базами данных, не
              требующая описания схемы таблиц. Считается одним из классических
              примеров NoSQL-систем
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
