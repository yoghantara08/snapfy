"use client";
import React from "react";

import classNames from "classnames";
import { SearchIcon } from "lucide-react";

interface PoolsMenuFilterProps {
  menus: string[];
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const PoolsMenuFilter = ({
  menus,
  selectedMenu,
  setSelectedMenu,
  search,
  setSearch,
}: PoolsMenuFilterProps) => {
  return (
    <div className="mt-4 lg:mt-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="order-2 flex gap-3 md:order-1">
          {menus.map((menu) => (
            <button
              key={menu}
              className={classNames(
                "flex w-full items-center justify-center rounded-sm border px-4 py-1.5 font-medium md:w-fit",
                "hover:bg-accent-blue/20 hover:text-accent-blue hover:!border-transparent",
                selectedMenu === menu &&
                  "bg-accent-blue/20 text-accent-blue !border-transparent",
              )}
              onClick={() => setSelectedMenu(menu)}
            >
              {menu}
            </button>
          ))}
        </div>

        <div className="order-1 flex h-9.5 items-center gap-2 rounded-sm border px-4 md:order-2">
          <SearchIcon className="text-secondary size-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="h-full w-[250px] outline-0 placeholder:text-sm"
            placeholder="Search by token name or address..."
          />
        </div>
      </div>
    </div>
  );
};

export default PoolsMenuFilter;
