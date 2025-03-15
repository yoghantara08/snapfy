import React from "react";
import { FaWaterLadder } from "react-icons/fa6";

const PoolList = () => {
  return (
    <div className="border-border2 flex min-h-[400px] w-full flex-col items-center justify-center gap-2 rounded-[10px] border-[1px] p-4 md:p-12">
      <div className="bg-opacity-blue text-accent-blue rounded-[5px] px-3 py-3 text-4xl">
        <FaWaterLadder />
      </div>
      <h2 className="text-xl font-semibold">No Matching Pools Found</h2>
      <p className="w-full text-center md:w-[500px]">
        No pools found. Try adjusting your filters or explore available
        liquidity pools to get started.
      </p>
      <button className="bg-opacity-blue text-accent-blue rounded-[5px] px-12 py-3 text-lg font-medium">
        Reset Filter
      </button>
    </div>
  );
};

export default PoolList;
