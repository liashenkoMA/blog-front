import "./footer.scss";

import Socials from "../Socials/Socials";
import { IUserResponse } from "@/app/_interface/interface";

export default function Footer({ user }: { user: IUserResponse }) {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © {user.yearFooter} Created by
          <span className="footer__copyright_type_color"> LyashenkoMA</span>
        </p>
        <Socials
          position={"menu__position_footer"}
          telegram={user.telegram}
          vk={user.vk}
          git={user.gitHub}
        />
      </div>
    </footer>
  );
}
