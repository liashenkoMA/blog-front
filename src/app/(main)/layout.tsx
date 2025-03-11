import "./global.css";

import { Roboto } from "next/font/google";
import { Metadata } from "next";

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
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
