"use client";
import React, { ReactNode } from "react";

import classNames from "classnames";

import useWindowSize from "@/hooks/useWindowSize";

import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

const LayoutWrapper = ({ children, className }: LayoutWrapperProps) => {
  const { isMobile } = useWindowSize();

  return (
    <div className="h-full w-full">
      <div
        className={classNames(
          "relative mx-auto grid min-h-screen w-full",
          // "auto" is for the main tag
          // add "max-content" to the "grid-rows" class below for each div if want to add more "static" elements
          "grid-rows-[max-content_auto_max-content]",
        )}
      >
        {isMobile ? <MobileNavbar /> : <Navbar />}
        <div className="mt-6 mb-10 flex w-full justify-center sm:mt-8 lg:mt-12 lg:mb-28">
          <main className={classNames("mx-3 w-full max-w-[1070px]", className)}>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWrapper;
