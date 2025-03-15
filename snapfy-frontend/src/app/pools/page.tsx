"use client";

import Pools from "@/features/pools/components/Pools/Pools";
import PoolsHeadline from "@/features/pools/components/PoolsHeadline/PoolsHeadline";
import PoolsMenuFilter from "@/features/pools/components/PoolsMenuFilter/PoolsMenuFilter";
import TVLAndVolume from "@/features/pools/components/TVLAndVolume/TVLAndVolume";

const PoolsPage = () => {
  return (
    <div className="mt-6 mb-10 flex w-full justify-center sm:mt-8 lg:mt-12 lg:mb-28">
      <div className="mx-3 w-full max-w-[1070px]">
        <section className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-4">
          <PoolsHeadline />
          <TVLAndVolume />
        </section>
        <PoolsMenuFilter />
        <Pools />
      </div>
    </div>
  );
};

export default PoolsPage;
