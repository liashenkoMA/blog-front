import "./profile.scss";

import { IUserProps } from "@/app/_interface/interface";
import Image from "next/image";

export default function Profile({ user }: IUserProps) {
  return (
    <section className="profile">
      <div className="profile__content">
        <div className="profile__aboutme">
          <h2 className="profile__title">Обо мне</h2>
          <div className="profile__description">
            <p className="profile__html-tag">&lt;p&gt;</p>
            <div className="profile__main-text">
              <p className="profile__text">Всем привет!</p>
              <p className="profile__text">
                Меня зовут Максим. Я начинающий веб-разработчик и
                специализируюсь на фронтенде, хотя немного разбираюсь и в
                бэкенде. В основном использую{" "}
                <span className="profile__text profile__text-color">
                  Nextjs
                </span>
                , так как под капотом —{" "}
                <span className="profile__text profile__text-color">React</span>
                , а для бэка —{" "}
                <span className="profile__text profile__text-color">
                  Nestjs
                </span>
                . Ну и да, по большей части я самоучка.
              </p>
              <p className="profile__text">
                Из любимых хобби — аниме, фильмы, сериалы и активные виды
                спорта. Обожаю читать мангу и играть в настолки, кататься на
                велосипеде и плавать, ходить в походы и просто гулять по городу.
                Мечтаю хотя бы раз сыграть в DnD и подняться на Эльбрус. И да,
                как истинный любитель всего японского, в свободное время учу
                язык.
              </p>
            </div>
            <p className="profile__html-tag">&lt;/p&gt;</p>
          </div>
        </div>
        <div className="profile__photo">
          <Image
            src={user.avatarLink}
            width={462}
            height={556}
            loading="lazy"
            alt="Моё фото"
            className="profile__user-photo"
          ></Image>
        </div>
      </div>
    </section>
  );
}
