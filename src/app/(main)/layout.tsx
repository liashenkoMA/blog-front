import "./global.scss";
import "./layout.scss";

import { Roboto } from "next/font/google";
import { Metadata } from "next";

import Header from "../_components/Header/Header";
import Footer from "../_components/Footer/Footer";
import { getUserData } from "../_utils/userApi";
import ButtonUp from "../_components/ButtonUp/ButtonUp";
import { IUserResponse } from "../_interface/interface";

const ubuntu = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Мой блог на nextjs",
  description: "Мой блог на Nextjs и Nestjs. БД - mongodb. Написал на TS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUserResponse = await getUserData();

  return (
    <html lang="ru">
      <body className={ubuntu.className}>
        <div className="page">
          <Header user={user} />
          {children}
          <Footer user={user} />
          <ButtonUp />
        </div>
      </body>
    </html>
  );
}
