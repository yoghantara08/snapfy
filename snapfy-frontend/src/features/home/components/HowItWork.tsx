"use client";

import React, { useState } from "react";

import Image from "next/image";

import BaseLogo from "../../../../public/Image/baseLogo.png";
import depositIcon from "../../../../public/Image/depositIcon.svg";
import etherIcon from "../../../../public/Image/etherIcon.svg";
import PbaLogo from "../../../../public/Image/pbaLogo.png";
import rangeIcon from "../../../../public/Image/rangeIcon.svg";
import UniswapLogo from "../../../../public/Image/uniswapLogo.png";
import usdcIcon from "../../../../public/Image/usdcIcon.svg";
import usdtIcon from "../../../../public/Image/usdtIcon.svg";

const HomeHero = () => {
  const [active, setActive] = useState(0);
  const [featureList, setFeatureList] = useState([
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
      title: "Review and Deposit",
      description:
        "Review your position details, approve token spending, and confirm your deposit.",
      icon1: depositIcon,
      icon2: "",
      color: "red",
    },
  ]);

  const handleClick = (activeNumber: number) => {
    setActive(activeNumber);
    if (activeNumber === 0) {
      const temp = [...featureList];
      temp[2] = {
        title: "Review and Deposit",
        description:
          "Review your position details, approve token spending, and confirm your deposit.",
        icon1: depositIcon,
        icon2: "",
        color: "red",
      };
      setFeatureList(temp);
    } else {
      const temp = [...featureList];
      temp[2] = {
        title: "Select Price Range",
        description:
          "Choose your preferred price range for concentrated liquidity to maximize your fee earnings.",
        icon1: rangeIcon,
        icon2: "",
        color: "yellow",
      };
      setFeatureList(temp);
    }
  };

  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-[2rem]">
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-24">
        <Image
          src={BaseLogo}
          alt="BaseLogo"
          className="w-[100px] sm:w-[130px]"
        />
        <Image
          src={UniswapLogo}
          alt="UniswapLogo"
          className="w-[100px] sm:w-[180px]"
        />
        <Image src={PbaLogo} alt="PbaLogo" className="w-[100px] sm:w-[160px]" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[600px]">
        <h2 className="text-accent-pink text-4xl font-semibold">
          How It Works:
        </h2>
        <p className="text-center">
          Provide liquidity to Uniswap with just one token. Our smart contract
          handles the balancing and swapping for you.
        </p>
        <div className="bg-surface flex items-center justify-center gap-3 rounded-[10px] p-2">
          <button
            onClick={() => handleClick(0)}
            className={`bg-background w-[120px] rounded-[10px] py-2 sm:w-[150px] ${
              active === 0 ? "bg-background" : "bg-transparent"
            }`}
          >
            Uniswap V2
          </button>
          <button
            onClick={() => handleClick(1)}
            className={`bg-background w-[120px] rounded-[10px] py-2 sm:w-[150px] ${
              active === 1 ? "bg-background" : "bg-transparent"
            }`}
          >
            Uniswap V3
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-stretch justify-center gap-8">
        {featureList.map((item, index) => (
          <div
            key={index}
            className={`relative flex w-full flex-col gap-2 rounded-[5px] p-6 sm:w-[250px] ${
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
            <div
              className={`absolute top-[10px] right-[15px] flex h-[25px] w-[25px] items-center justify-center rounded-[100px] ${
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

export default HomeHero;
