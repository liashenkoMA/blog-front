import "./global.scss";
import "./layout.scss";

import { Roboto } from "next/font/google";
import { Metadata } from "next";

import Header from "../_components/Header/Header";
import Footer from "../_components/Footer/Footer";
import { userData } from "../_utils/userApi";

const ubuntu = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Мой блог",
  description: "Мой блог на Nextjs и Nestjs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userData();

  return (
    <html lang="ru">
      <body className={ubuntu.className}>
        <div className="page">
          <Header user={user} />
          {children}
          <Footer user={user} />
        </div>
      </body>
    </html>
  );
}
