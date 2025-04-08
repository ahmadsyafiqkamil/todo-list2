import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import Provider from "./provider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider cookie={cookie}>{children}</Provider>
      </body>
    </html>
  );
}