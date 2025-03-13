import React from "react";

import PoolsHeadline from "@/features/pools/components/PoolsHeadline/PoolsHeadline";
import TVLAndVolume from "@/features/pools/components/TVLAndVolume/TVLAndVolume";

const PoolsPage = () => {
  return (
    <div>
      <section className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-4">
        <PoolsHeadline />
        <TVLAndVolume />
      </section>
    </div>
  );
};

export default PoolsPage;
