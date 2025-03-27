"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "classnames";
import { MenuIcon, XIcon } from "lucide-react";

import Drawer from "../Drawer/Drawer";
import CustomConnectButton from "../RainbowKit/CustomConnectButton";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Pools", link: "/pools" },
  ];

  return (
    <nav className="bg-background sticky top-0 z-20 flex h-[74px] w-full items-center justify-between border-b px-4">
      <Link href={"/"}>
        <Image
          src={"/snapfy-logo.svg"}
          alt="snapfy"
          width={200}
          height={150}
          className="h-10 w-fit"
        />
      </Link>

      <div className="flex items-center gap-3 text-sm">
        <CustomConnectButton />

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
      >
        <div className="flex items-center justify-between">
          <Link href={"/"} onClick={() => setOpen(false)}>
            <Image
              src={"/snapfy-logo.svg"}
              alt="snapfy"
              width={200}
              height={150}
              className="h-12 w-fit"
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
                "hover:bg-primary-active -mx-4 rounded-md px-4 py-2 text-lg font-medium",
                pathname === menu.link
                  ? "bg-accent-blue/20 text-accent-blue"
                  : "text-muted hover:bg-accent-blue/20 hover:text-accent-blue",
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
