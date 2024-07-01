import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
