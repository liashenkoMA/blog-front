import "./socials.scss";

import Image from "next/image";
import Link from "next/link";

import telegramImg from "../../_images/Telegram.svg";
import vkImg from "../../_images/VK.svg";
import gitImg from "../../_images/GH.png";

export default function Socials({
  position,
  telegram,
  vk,
  git,
}: {
  position: string;
  telegram: string;
  vk: string;
  git: string;
}) {
  return (
    <ul className={`menu__socials-links ${position}`}>
      <li>
        <Link
          href={`${telegram}`}
          className="menu__socials-link"
          target="_blank"
          rel="nofollow noreferrer"
        >
          <Image
            src={telegramImg}
            className="menu__socials-img"
            width={20}
            height={20}
            alt="Telegram"
          />
          Telegram
        </Link>
      </li>
      <li>
        <Link
          href={`${vk}`}
          className="menu__socials-link"
          target="_blank"
          rel="nofollow noreferrer"
        >
          <Image
            src={vkImg}
            className="menu__socials-img"
            width={20}
            height={20}
            alt="Telegram"
          />
          VK
        </Link>
      </li>
      <li>
        <Link
          href={`${git}`}
          className="menu__socials-link"
          target="_blank"
          rel="nofollow noreferrer"
        >
          <Image
            src={gitImg}
            className="menu__socials-img"
            width={20}
            height={20}
            alt="Telegram"
          />
          GitHub
        </Link>
      </li>
    </ul>
  );
}
