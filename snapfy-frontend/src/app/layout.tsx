import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/Providers/Providers";

import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapfy",
  description: "Snapfy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} text-primary antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
