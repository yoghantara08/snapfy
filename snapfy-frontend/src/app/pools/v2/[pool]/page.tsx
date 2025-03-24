import React from "react";

import AddLiquidityCard from "@/features/pools/components/AddLiquidityCard/AddLiquidityCard";
import AddLiquidityHeader from "@/features/pools/components/AddLiquidityHeader/AddLiquidityHeader";

const PoolV2 = async ({ params }: { params: Promise<{ pool: string }> }) => {
  const { pool } = await params;

  return (
    <div className="mt-6 mb-10 flex w-full justify-center sm:mt-8 lg:mt-12 lg:mb-28">
      <div className="mx-3 w-full max-w-[600px] space-y-6">
        <AddLiquidityHeader poolId={pool} feeTier={0.3} poolVersion="v2" />
        <AddLiquidityCard poolId={pool} />
      </div>
    </div>
  );
};

export default PoolV2;
