import "./aboutme.scss";

import Developer from "../Developer/Developer";
import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import ContactForm from "../ContactForm/ContactForm";

export default async function AboutMe() {
  return (
    <main className="main">
      <Developer />
      <Profile />
      <Skills />
      <ContactForm />
    </main>
  );
}
