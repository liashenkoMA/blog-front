import AboutMe from "@/app/_components/AboutMe/AboutMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Давайте знакомиться. На этой странице вы сможете узнать, кто я, чем увлекаюсь, занимаюсь и умею.",
};

export default function Page() {
  return <AboutMe />;
}
