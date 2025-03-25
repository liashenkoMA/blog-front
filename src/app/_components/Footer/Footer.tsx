"use client";

import "./footer.scss";

import Socials from "../Socials/Socials";
import { useUserContext } from "@/app/_contexts/useContext";

export default function Footer() {
  const userData = useUserContext();
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © {userData.yearFooter} Created by
          <span className="footer__copyright_type_color"> LyashenkoMA</span>
        </p>
        <Socials
          position={"menu__position_footer"}
          telegram={userData.telegram}
          vk={userData.vk}
          git={userData.gitHub}
        />
      </div>
    </footer>
  );
}
