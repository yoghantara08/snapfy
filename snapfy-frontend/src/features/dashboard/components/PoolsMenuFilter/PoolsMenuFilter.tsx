"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import classNames from "classnames";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";

import {
  setDashboardSearch,
  setPoolVersion,
} from "../../../../redux/reducers/modalSlice";

const MENUS = ["All Pools", "V2", "V3"];

const PoolsMenuFilter = () => {
  const [selectedMenu, setSelectedMenu] = useState(MENUS[0]);
  const dispatch = useDispatch();

  const handleSelect = (menu: string) => {
    setSelectedMenu(menu);
    dispatch(setPoolVersion(menu));
  };

  const debouncedSearch = debounce((value: string) => {
    dispatch(setDashboardSearch(value));
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <section className="mt-4 lg:mt-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="order-2 flex gap-3 md:order-1">
          {MENUS.map((menu) => (
            <button
              key={menu}
              className={classNames(
                "flex w-full items-center justify-center rounded-sm border px-4 py-1.5 font-medium md:w-fit",
                "hover:bg-accent-blue/20 hover:text-accent-blue hover:!border-transparent",
                selectedMenu === menu &&
                  "bg-accent-blue/20 text-accent-blue !border-transparent",
              )}
              onClick={() => handleSelect(menu)}
            >
              {menu}
            </button>
          ))}
        </div>

        <div className="order-1 flex h-9.5 items-center gap-2 rounded-sm border px-4 md:order-2">
          <SearchIcon className="text-secondary size-4" />
          <input
            type="text"
            className="h-full w-[250px] outline-0 placeholder:text-sm"
            placeholder="Search by token name or address..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
    </section>
  );
};

export default PoolsMenuFilter;
