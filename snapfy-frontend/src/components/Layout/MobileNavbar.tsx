"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { MenuIcon, XIcon } from "lucide-react";

import Drawer from "../Drawer/Drawer";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Markets", link: "/markets" },
  ];

  return (
    <nav className="bg-background sticky top-0 z-20 flex h-[74px] w-full items-center justify-between border-b px-4 shadow-sm">
      <Link className="text-primary text-xl font-medium" href={"/"}>
        Snapfy
      </Link>

      <div className="flex items-center gap-3 text-sm">
        <ConnectButton
          showBalance={false}
          accountStatus="address"
          chainStatus="icon"
        />

        <MenuIcon
          className="size-7 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        size="full"
        className="text-black"
      >
        <div className="flex items-center justify-between">
          <Link href={"/"} onClick={() => setOpen(false)}>
            <Image
              src={"/logo/krono-finance.svg"}
              alt="Krono Finance"
              width={120}
              height={40}
            />
          </Link>
          <XIcon
            className="text-secondary size-8 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="mt-8 flex flex-col space-y-5">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className={classNames(
                "hover:bg-primary-active rounded-md px-4 py-2 text-lg font-medium hover:text-white",
                pathname === menu.link
                  ? "bg-primary-active text-white"
                  : "text-secondary bg-transparent",
              )}
              onClick={() => setOpen(false)} // Close drawer on click
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
