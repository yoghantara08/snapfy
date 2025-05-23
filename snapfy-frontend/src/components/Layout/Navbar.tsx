import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "classnames";

import CustomConnectButton from "../RainbowKit/CustomConnectButton";

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
    <nav className="bg-background sticky top-0 z-20 flex h-[80px] w-full justify-center border-b px-[30px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-7">
          <Link href={"/"}>
            <Image
              src={"/snapfy-logo.svg"}
              alt="snapfy"
              width={200}
              height={150}
              className="h-10 w-fit"
            />
          </Link>

          <ul className="flex items-center gap-5 pt-1">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  href={menu.link}
                  className={classNames(
                    "hover:text-accent-pink/80 text-lg hover:font-semibold",
                    pathname.includes(menu.link)
                      ? "text-accent-pink/80 font-semibold"
                      : "text-muted font-medium",
                  )}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <CustomConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
