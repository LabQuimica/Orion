import Sidebar from "@/components/sidebar/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="flex h-full w-full pl-5 pr-5 pb-5">{children}</div>
      </body>
    </html>
  );
}
