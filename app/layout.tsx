import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-[#030712]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
