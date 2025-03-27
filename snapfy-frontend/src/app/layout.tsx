import React from "react";

import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import { Providers } from "@/components/Providers/Providers";

import "../styles/globals.css";

const worksans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapfy",
  description:
    "DeFi app that lets you swap and provide liquidity on Uniswap in one click, no manual balancing, or swaps needed. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${worksans.variable} antialiased`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
