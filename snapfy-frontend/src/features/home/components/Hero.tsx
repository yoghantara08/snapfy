import React from "react";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";
import { MoveRightIcon } from "lucide-react";

import Button from "@/components/Button/Button";

const HomeHero = () => {
  return (
    <section className="bg-surface/40 flex min-h-[370px] w-full justify-center border-b px-3 sm:min-h-[400px] md:min-h-[500px]">
      <div className="relative flex w-full max-w-[1000px]">
        <div
          className={classNames(
            "absolute top-1/2 z-0 grid w-full -translate-y-1/2 items-center gap-[6rem]",
            "lg:-left-[5rem]",
          )}
        >
          <Image
            width={64}
            height={64}
            src={"/Image/usdc.svg"}
            alt="usdc"
            className="size-11 sm:size-14 lg:size-16"
          />
          <Image
            width={64}
            height={64}
            src={"/Image/usdt.svg"}
            alt="usdt"
            className="ml-[100px] size-11 opacity-0 sm:size-14 lg:size-16 lg:opacity-100"
          />
          <Image
            width={64}
            height={64}
            src={"/Image/dao.svg"}
            alt="dai"
            className="size-11 sm:size-14 lg:size-16"
          />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3">
          <div className="text-center text-3xl font-bold text-black sm:text-4xl md:space-y-1 lg:text-[40px] xl:text-5xl">
            <p>Effortless Liquidity</p>
            <p>
              Provision in <span className="text-accent-pink">One-Click</span>
            </p>
          </div>
          <p className="text-secondary text-center text-[15px] md:w-[520px] md:text-lg">
            Supply liquidity to Uniswap V2 and V3 Pools with just one token. No
            more complex swaps or balancing, we handle everything for you.
          </p>
          <Link href={"/pools"} className="mt-3">
            <Button className="w-[200px] gap-1">
              <span>Get Started</span> <MoveRightIcon className="size-5" />
            </Button>
          </Link>
        </div>

        <div
          className={classNames(
            "absolute top-1/2 z-0 grid w-full -translate-y-1/2 items-center justify-end gap-[6rem]",
            "lg:-right-[5rem]",
          )}
        >
          <Image
            width={64}
            height={64}
            src={"/Image/ether.svg"}
            alt="eth"
            className="size-11 sm:size-14 lg:size-16"
          />
          <Image
            width={64}
            height={64}
            src={"/Image/uniswap.svg"}
            alt="uni"
            className="-ml-[100px] size-11 opacity-0 sm:size-14 lg:size-16 lg:opacity-100"
          />
          <Image
            src={"/Image/btc.svg"}
            alt="btc"
            width={64}
            height={64}
            className="size-11 sm:size-14 lg:size-16"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
