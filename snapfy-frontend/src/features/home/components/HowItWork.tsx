"use client";

import React, { useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import BaseLogo from "../../../../public/Image/baseLogo.png";
import depositIcon from "../../../../public/Image/depositIcon.svg";
import etherIcon from "../../../../public/Image/etherIcon.svg";
import PbaLogo from "../../../../public/Image/pbaLogo.png";
import rangeIcon from "../../../../public/Image/rangeIcon.svg";
import UniswapLogo from "../../../../public/Image/uniswapLogo.png";
import usdcIcon from "../../../../public/Image/usdcIcon.svg";
import usdtIcon from "../../../../public/Image/usdtIcon.svg";

const STEPS = [
  {
    title: "Choose a Pool",
    description: "Select the Uniswap pool you want to provide liquidity to.",
    icon1: usdcIcon,
    icon2: etherIcon,
    color: "blue",
  },
  {
    title: "Input Single Token",
    description:
      "Enter the amount of just one token. Our smart contract will handle the swap to create the balanced pair.",
    icon1: usdtIcon,
    icon2: "",
    color: "green",
  },
  {
    title: "Select Price Range",
    description:
      "Choose your preferred price range for concentrated liquidity to maximize your fee earnings.",
    icon1: rangeIcon,
    icon2: "",
    color: "yellow",
  },
  {
    title: "Review and Deposit",
    description:
      "Review your position details, approve token spending, and confirm your deposit.",
    icon1: depositIcon,
    icon2: "",
    color: "red",
  },
];

const HowItWork = () => {
  const [selectedStep, setSelectedStep] = useState<"V2" | "V3">("V3");

  const filteredSteps =
    selectedStep === "V2"
      ? STEPS.filter((_, index) => [0, 1, 3].includes(index))
      : STEPS;

  return (
    <section className="relative flex w-full flex-col items-center justify-center px-3 pt-[50px] pb-[60px]">
      <div className="mb-10 flex flex-wrap items-center justify-center gap-10 md:gap-24">
        <Image src={BaseLogo} alt="BaseLogo" className="w-28 md:w-32" />
        <Image src={UniswapLogo} alt="UniswapLogo" className="w-38 md:w-42" />
        <Image src={PbaLogo} alt="PbaLogo" className="w-33 md:w-36" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[600px]">
        <h2 className="text-accent-pink text-4xl font-semibold">
          How It Works:
        </h2>
        <p className="text-secondary text-center">
          Provide liquidity to Uniswap with just one token. Our smart contract
          handles the balancing and swapping for you.
        </p>
        <div className="bg-surface flex items-center justify-center gap-1 rounded-sm p-1.5">
          <button
            onClick={() => setSelectedStep("V2")}
            className={classNames(
              "bg-background hover:bg-background w-[120px] rounded-sm rounded-r-none py-2 sm:w-[150px]",
              selectedStep === "V2" ? "bg-background" : "bg-transparent",
            )}
          >
            Uniswap V2
          </button>
          <button
            onClick={() => setSelectedStep("V3")}
            className={classNames(
              "bg-background hover:bg-background w-[120px] rounded-sm rounded-l-none py-2 sm:w-[150px]",
              selectedStep === "V3" ? "bg-background" : "bg-transparent",
            )}
          >
            Uniswap V3
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-row flex-wrap items-stretch justify-center gap-3 md:gap-8">
        {filteredSteps.map((item, index) => (
          <div
            key={index}
            className={`relative flex w-full flex-col gap-2 rounded-sm p-6 sm:w-[250px] ${
              item.color === "blue"
                ? "bg-opacity-blue"
                : item.color === "green"
                  ? "bg-opacity-green"
                  : item.color === "yellow"
                    ? "bg-opacity-yellow"
                    : "bg-opacity-pink"
            }`}
          >
            <div className="flex">
              <Image src={item?.icon1} alt="icon" className="w-[40px]" />
              {item?.icon2 && (
                <Image
                  src={item?.icon2}
                  alt="icon"
                  className="w-[40px] translate-x-[-10px]"
                />
              )}
            </div>
            <div className="space-y-1">
              <h2
                className={`text-lg font-semibold ${
                  item.color === "blue"
                    ? "text-accent-blue"
                    : item.color === "green"
                      ? "text-accent-green"
                      : item.color === "yellow"
                        ? "text-accent-yellow"
                        : "text-accent-pink"
                }`}
              >
                {item.title}
              </h2>
              <p>{item.description}</p>
            </div>
            <div
              className={`absolute top-[10px] right-[15px] flex h-[25px] w-[25px] items-center justify-center rounded-full ${
                item.color === "blue"
                  ? "bg-opacity2-blue"
                  : item.color === "green"
                    ? "bg-opacity2-green"
                    : item.color === "yellow"
                      ? "bg-opacity2-yellow"
                      : "bg-opacity2-pink"
              }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
