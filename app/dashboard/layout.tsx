import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full bg-slate-200">
          <Sidebar />
          <div className="flex flex-col h-full w-full ml-64 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
