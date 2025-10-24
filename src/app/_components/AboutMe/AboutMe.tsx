import "./aboutme.scss";

import Developer from "../Developer/Developer";
import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import ContactForm from "../ContactForm/ContactForm";
import { getUserData } from "@/app/_utils/userApi";
import { IUserResponse } from "@/app/_interface/interface";

export default async function AboutMe() {
  const user: IUserResponse = await getUserData();

  return (
    <main className="main">
      <Developer user={user} />
      <Profile user={user} />
      <Skills />
      <ContactForm />
    </main>
  );
}
