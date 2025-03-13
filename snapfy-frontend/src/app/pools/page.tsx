import React from "react";

import PoolsHeadline from "@/features/pools/components/PoolsHeadline/PoolsHeadline";
import PoolsMenuFilter from "@/features/pools/components/PoolsMenuFilter/PoolsMenuFilter";
import TVLAndVolume from "@/features/pools/components/TVLAndVolume/TVLAndVolume";

const PoolsPage = () => {
  return (
    <div>
      <section className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-4">
        <PoolsHeadline />
        <TVLAndVolume />
      </section>
      <PoolsMenuFilter />
    </div>
  );
};

export default PoolsPage;
