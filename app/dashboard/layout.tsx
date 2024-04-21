import Sidebar from "@/components/sidebar/sidebar";
import TopMenu from "@/components/top-menu/TopMenu";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopMenu />
        <Sidebar />
        <div className="flex h-full w-full pl-5 pr-5 pb-5">{children}</div>
      </body>
    </html>
  );
}
