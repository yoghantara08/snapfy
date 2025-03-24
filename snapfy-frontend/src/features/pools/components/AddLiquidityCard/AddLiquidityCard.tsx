"use client";
import React, { useState } from "react";

import Image from "next/image";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import useNumberInput from "@/hooks/useNumberInput";

const quickButtons = [25, 50, 75, 100];
const tokenOptions = [
  { symbol: "ETH", image: "/tokens/eth.svg" },
  { symbol: "WETH", image: "/tokens/weth.svg" },
  { symbol: "USDC", image: "/tokens/USDC.svg" },
  { symbol: "USDT", image: "/tokens/USDT.svg" },
];

const AddLiquidityCard = () => {
  const { displayValue, handleInputBlur, handleInputChange } = useNumberInput();

  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);

  return (
    <div className="shadow-accent-blue/20 w-full space-y-3 rounded-sm border p-5 shadow">
      {/* INPUT TOKEN */}
      <div className="space-y-1.5">
        <div className="flex items-end justify-between gap-4">
          <span className="text-secondary ml-0.5 font-medium">You Send</span>
          <div className="flex items-center justify-center gap-2 text-sm">
            {quickButtons.map((percent) => (
              <button
                key={percent}
                className="bg-opacity-blue hover:bg-accent-blue/30 text-accent-blue rounded-sm px-2 py-1"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1 rounded-sm border p-4">
          <div className="flex items-center justify-between gap-3">
            <Menu>
              <MenuButton className="flex cursor-pointer items-center gap-2">
                <Image
                  src={selectedToken.image}
                  alt={selectedToken.symbol}
                  width={64}
                  height={64}
                  className="size-10 rounded-full"
                />
                <span className="text-xl font-medium">
                  {selectedToken.symbol}
                </span>
                <ChevronDownIcon className="-ml-1 size-5" />
              </MenuButton>
              <MenuItems
                anchor="bottom start"
                transition
                className={classNames(
                  "bg-background shadow-accent-blue/20 z-30 mt-2 flex flex-col rounded-sm border py-1 shadow",
                  "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
                )}
              >
                {tokenOptions.map((option) => (
                  <MenuItem
                    key={option.symbol}
                    as={"div"}
                    className="hover:bg-accent-blue/20 flex w-full cursor-pointer items-center gap-2 px-3 py-2 pr-8"
                    onClick={() => setSelectedToken(option)}
                  >
                    <Image
                      src={option.image}
                      alt={option.symbol}
                      width={64}
                      height={64}
                      className="size-7 rounded-full"
                    />
                    <span className="font-medium">{option.symbol}</span>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
            <NumberInput
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={displayValue}
              placeholder="0"
              className="text-primary text-2xl font-medium"
            />
          </div>
          <div className="text-secondary flex items-center justify-between gap-3 text-sm">
            <span>Balance: 0.00</span>
            <span>~ $0.00</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <div className="bg-accent-blue/20 text-accent-blue flex size-8 items-center justify-center rounded-full">
          <ChevronDownIcon className="mt-0.5 size-6.5" />
        </div>
      </div>

      {/* EST POOL ALLOCATION */}
      <div className="space-y-1.5">
        <div className="text-secondary ml-0.5 font-medium">
          Est. Pool Allocation
        </div>
        <div className="flex gap-4">
          {/* TOKEN 0 */}
          <div className="flex w-full justify-between gap-3 rounded-sm border p-3">
            <div className="flex items-center gap-2">
              <Image
                src={"/tokens/USDC.svg"}
                alt="USDC"
                width={64}
                height={64}
                className="size-9 rounded-full"
              />
              <span className="font-medium">USDC</span>
            </div>
            <div className="-space-y-1 text-end">
              <div className="text-lg font-medium">1075</div>
              <div className="text-secondary text-sm">~ $1075</div>
            </div>
          </div>
          {/* TOKEN 1 */}
          <div className="flex w-full justify-between gap-3 rounded-sm border p-3">
            <div className="flex items-center gap-2">
              <Image
                src={"/tokens/eth.svg"}
                alt="ETH"
                width={64}
                height={64}
                className="size-9 rounded-full"
              />
              <span className="font-medium">ETH</span>
            </div>
            <div className="-space-y-1 text-end">
              <div className="text-lg font-medium">0.5</div>
              <div className="text-secondary text-sm">~ $1075</div>
            </div>
          </div>
        </div>
      </div>

      <Button className="!bg-accent-blue/20 !text-accent-blue hover:!bg-accent-blue/30 mt-2 w-full">
        Review
      </Button>
    </div>
  );
};

export default AddLiquidityCard;
