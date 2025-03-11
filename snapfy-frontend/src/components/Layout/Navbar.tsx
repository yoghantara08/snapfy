import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";

const Navbar = () => {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Pools",
      link: "/pools",
    },
  ];

  return (
    <nav className="bg-background sticky top-0 z-20 flex h-[80px] w-full justify-center px-5">
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <div className="text-primary w-36 text-2xl font-medium">
          <Link href={"/"}>Snapfy</Link>
        </div>

        <div className="flex gap-2">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className={classNames(
                "px-3 text-[17px] font-medium hover:text-white",
                pathname === menu.link
                  ? "text-white"
                  : "bg-transparent text-gray-300",
              )}
            >
              {menu.name}
            </Link>
          ))}
        </div>

        <ConnectButton
          showBalance={false}
          accountStatus={"address"}
          chainStatus={"icon"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
