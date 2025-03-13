import React from "react";

const PoolsHeadline = () => {
  return (
    <div className="grid max-w-[600px] items-end space-y-1">
      <h2 className="text-accent-blue text-2xl font-bold lg:text-3xl">
        Liquidity Pools
      </h2>
      <p className="text-secondary text-sm leading-4.5 md:leading-5.5 lg:text-base">
        Explore and provide liquidity to Uniswap pools. Optimize your positions,
        earn trading fees, and take full control of your assets with ease.
      </p>
    </div>
  );
};

export default PoolsHeadline;
