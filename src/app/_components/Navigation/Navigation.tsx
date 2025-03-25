"use client";

import "./navigation.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="menu__navigation">
      <ol className="menu__navigation-links">
        <li>
          <Link
            href="/"
            className={`menu__navigation-link ${
              pathname === "/" ? "menu__navigation-link_type_active" : ""
            }`}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`menu__navigation-link ${
              pathname === "/blog" ? "menu__navigation-link_type_active" : ""
            }`}
          >
            Блог
          </Link>
        </li>
        <li>
          <Link
            href="/aboutme"
            className={`menu__navigation-link ${
              pathname === "/aboutme" ? "menu__navigation-link_type_active" : ""
            }`}
          >
            Обо мне
          </Link>
        </li>
      </ol>
    </nav>
  );
}
