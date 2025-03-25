"use client";

import "./header.scss";
import { useState } from "react";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Socials from "../Socials/Socials";
import { useUserContext } from "@/app/_contexts/useContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const userData = useUserContext();

  function isOpenMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="header">
      <div className="header__content">
        <Logo />
        <button
          type="button"
          className={`header__button ${
            isOpen ? "header__button_type_open" : "header__button_type_close"
          }`}
          onClick={isOpenMenu}
        ></button>
        <div className={`menu ${!isOpen ? "menu_type_open" : ""}`}>
          <Navigation />
          <Search />
          <Socials
            position={"menu__position_header"}
            telegram={userData.telegram}
            vk={userData.vk}
            git={userData.gitHub}
          />
        </div>
      </div>
    </header>
  );
}
