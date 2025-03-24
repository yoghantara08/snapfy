import React from "react";

import AddLiquidityCard from "@/features/pools/components/AddLiquidityCard/AddLiquidityCard";
import AddLiquidityHeader from "@/features/pools/components/AddLiquidityHeader/AddLiquidityHeader";

const PoolV2 = () => {
  return (
    <div className="mt-6 mb-10 flex w-full justify-center sm:mt-8 lg:mt-12 lg:mb-28">
      <div className="mx-3 w-full max-w-[600px] space-y-6">
        <AddLiquidityHeader
          poolId="0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
          feeTier={0.3}
          poolVersion="v2"
          token0Symbol="USDC"
          token1Symbol="ETH"
        />
        <AddLiquidityCard />
      </div>
    </div>
  );
};

export default PoolV2;
