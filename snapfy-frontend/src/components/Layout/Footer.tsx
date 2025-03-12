import React from "react";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-background text-secondary flex w-full justify-center border-t px-[30px] md:pt-1">
      <div className="flex w-full flex-col items-center gap-2 py-3 md:mb-2 md:flex-row md:items-center md:justify-between">
        <span className="order-2 text-sm md:order-1 md:text-base">
          © 2025 Snapfy. All rights reserved.
        </span>

        <div className="order-1 flex items-center gap-6 md:order-2">
          <Image src={"/twitter.svg"} width={20} height={20} alt="X" />
          <Image src={"/telegram.svg"} width={20} height={20} alt="telegram" />
          <Image src={"/discord.svg"} width={22} height={22} alt="discord" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
