import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Админка сайка",
  description: "Админка моего сайта на nextjs и nestjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
