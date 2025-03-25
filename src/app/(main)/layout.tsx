import "./global.scss";
import "./layout.scss";

import { Roboto } from "next/font/google";
import { Metadata } from "next";

import Header from "../_components/Header/Header";
import { UserContextProvider } from "../_contexts/provider";
import Footer from "../_components/Footer/Footer";

const ubuntu = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Мой блог",
  description: "Мой блог на Nextjs и Nestjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={ubuntu.className}>
        <UserContextProvider>
          <div className="page">
            <Header />
            {children}
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
