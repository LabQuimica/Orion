import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orion",
  description:
    "La mejor plataforma de inventarios para el laboratorio de qímica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
