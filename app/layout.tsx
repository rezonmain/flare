import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./_helpers/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flare - what's happening around you?",
  description:
    "Flare is a social media platform that allows you to see what's happening around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
