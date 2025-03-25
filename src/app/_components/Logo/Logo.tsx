import "./logo.scss";
import Link from "next/link";

import Image from "next/image";
import logo from "@/app/_images/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="logo">
      <Image
        src={logo}
        width={77}
        height={42}
        alt="Логотип моего сайта"
        className="logo__img"
      />
      <p className="logo__description">LyashenkoMA</p>
    </Link>
  );
}
