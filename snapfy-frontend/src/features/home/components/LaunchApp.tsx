import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const HomeHero = () => {
  return (
    <section className="bg-surface flex items-center justify-center py-[6rem]">
      <div
        className="bg-background grid w-[90%] grid-cols-1 items-center gap-8 p-9 md:grid-cols-2"
        style={{ boxShadow: "1px 6px 5px 0px rgba(0,0,0,0.25)" }}
      >
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h2 className="text-accent-pink text-center text-2xl font-bold sm:text-start sm:text-3xl">
            Ready to supercharge your liquidity?
          </h2>
          <p className="text-center sm:text-start">
            Start earning fees in minutes with our one-click liquidity
            provision. No complex setups, just pure DeFi efficiency.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <button className="bg-opacity-pink text-accent-pink flex items-center justify-center gap-3 rounded-[5px] px-8 py-2 font-semibold">
              Launch App Now
              <MdOutlineElectricBolt className="text-accent-pink" />
            </button>
            <button className="bg-opacity-blue text-accent-blue flex items-center justify-center gap-3 rounded-[5px] px-8 py-2 font-semibold">
              Learn More
              <FaLongArrowAltRight className="text-accent-blue" />
            </button>
          </div>
          <p className="text-center sm:text-start">
            No credit card required. Start earning in seconds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
