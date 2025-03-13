import React from "react";

import Image from "next/image";

import Btc from "../../../../public/Image/btc.svg";
import Dao from "../../../../public/Image/dao.svg";
import Ether from "../../../../public/Image/ether.svg";
import Uniswap from "../../../../public/Image/uniswap.svg";
import Usdc from "../../../../public/Image/usdc.svg";
import Usdt from "../../../../public/Image/usdt.svg";

const HomeHero = () => {
  return (
    <section className="bg-surface relative flex min-h-[70vh] w-full items-center justify-center px-[2rem]">
      <Image
        src={Usdc}
        className="absolute top-[30px] left-[50px] hidden animate-bounce md:block lg:left-[90px]"
        alt="usdt"
      />
      <Image
        src={Usdt}
        className="absolute top-1/2 left-[100px] hidden translate-y-[-50%] animate-bounce md:block lg:left-[200px]"
        alt="usdt"
      />
      <Image
        src={Dao}
        className="absolute bottom-[30px] left-[50px] hidden animate-bounce md:block lg:left-[90px]"
        alt="usdt"
      />

      <Image
        src={Ether}
        className="absolute top-[30px] right-[50px] hidden animate-bounce md:block lg:right-[90px]"
        alt="usdt"
      />
      <Image
        src={Uniswap}
        className="absolute top-1/2 right-[100px] hidden translate-y-[-50%] animate-bounce md:block lg:right-[200px]"
        alt="usdt"
      />
      <Image
        src={Btc}
        className="absolute right-[50px] bottom-[30px] hidden animate-bounce md:block lg:right-[90px]"
        alt="usdt"
      />
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[500px]">
        <h1 className="text-center text-2xl font-bold text-black sm:text-4xl">
          Effortless Liquidity Provision in{" "}
          <span className="text-accent-pink">One-Click</span>
        </h1>
        <p className="text-center">
          Supply liquidity to Uniswap V2 and V3 Pools with just one token. No
          more complex swaps or balancing, we handle everything for you.
        </p>
        <button className="bg-opacity-pink text-accent-pink rounded-[10px] px-12 py-3">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HomeHero;
