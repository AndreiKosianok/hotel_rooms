import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel rooms App",
  description: "Front-end developer recruitment task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
