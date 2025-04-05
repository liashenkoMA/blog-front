import "./developer.scss";

import Link from "next/link";
import Image from "next/image";

import { userData } from "@/app/_utils/userApi";
import emailIcon from "@/app/_images/icon-mail.png";
import sityIcon from "@/app/_images/icon-map-pin.png";
import workIcon from "@/app/_images/icon-work.png";
import linkIcon from "@/app/_images/icon-link.png";

export default async function Developer() {
  const user = await userData();

  return (
    <section className="developer">
      <div className="developer__conteiner">
        <h1 className="developer__title">Developer</h1>
        <div className="developer__content">
          <div className="developer__contacts">
            <Image
              src={user.avatarLink}
              width={110}
              height={110}
              alt="Моя аватарка"
              className="developer__avatar"
            />
            <h2 className="developer__name">{user.name}</h2>
            <p className="developer__profession">Full-stack Developer</p>
            <ol className="developer__contact-lists">
              <li className="developer__contact-list">
                <Image
                  src={emailIcon}
                  width={14}
                  height={14}
                  alt="email"
                  className="developer__icon"
                />
                {user.email}
              </li>
              <li className="developer__contact-list">
                <Image
                  src={sityIcon}
                  width={14}
                  height={14}
                  alt="Город"
                  className="developer__icon"
                />
                {user.city}
              </li>
              <li className="developer__contact-list">
                <Image
                  src={workIcon}
                  width={14}
                  height={14}
                  alt="Работа"
                  className="developer__icon"
                />
                Full-time
              </li>
              <li className="developer__contact-list">
                <Image
                  src={linkIcon}
                  width={14}
                  height={14}
                  alt="Сайт"
                  className="developer__icon"
                />
                {user.mySite}
              </li>
            </ol>
            <ol className="developer__techs">
              <li className="developer__tech">HTML</li>
              <li className="developer__tech">CSS</li>
              <li className="developer__tech">SASS</li>
              <li className="developer__tech">JS</li>
              <li className="developer__tech">TS</li>
              <li className="developer__tech">REACT</li>
              <li className="developer__tech">NODE</li>
              <li className="developer__tech">NOSQL</li>
            </ol>
          </div>

          <div className="developer__info">
            <div className="developer__user">
              <p className="developer__html-tag">&lt;h1&gt;</p>
              <div className="developer__block-texts">
                <p className="developer__user-text text-position">Привет!</p>
                <p className="developer__user-text text-position">
                  Меня зовут <span className="developer__animation-name"></span>
                </p>
                <p className="developer__user-text text-position">
                  Я начинающий Full-Stack Developer
                  <span className="developer__html-tag">&lt;/h1&gt;</span>
                </p>
              </div>
            </div>

            <div className="developer__description">
              <span className="developer__html-tag">&lt;p&gt;</span>
              <p className="developer__description-text text-position">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                nisi cumque magni praesentium eveniet expedita cum deserunt
                nobis molestiae, quas accusamus adipisci cupiditate, id debitis
                amet quis eaque ipsum repellendus?
              </p>
              <span className="developer__html-tag">&lt;/p&gt;</span>
            </div>

            <div className="developer__contact-link">
              <p className="developer__contact-link-text">Let`s Talk</p>
              <Link
                href="#contact__title"
                className="developer__contact-link-btn"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
