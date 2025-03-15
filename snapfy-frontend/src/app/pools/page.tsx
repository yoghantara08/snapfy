"use client";

import React, { useState } from "react";

import EmptyPool from "@/features/pools/components/EmptyPool/EmptyPool";
import PoolList from "@/features/pools/components/PoolList/PoolList";
import PoolsHeadline from "@/features/pools/components/PoolsHeadline/PoolsHeadline";
import PoolsMenuFilter from "@/features/pools/components/PoolsMenuFilter/PoolsMenuFilter";
import TVLAndVolume from "@/features/pools/components/TVLAndVolume/TVLAndVolume";

const PoolsPage = () => {
  const [pools] = useState([]);
  return (
    <div>
      <div className="sx:px-12 flex w-full flex-col items-start justify-between gap-8 px-4 py-8">
        <section className="flex w-full flex-col gap-3 md:flex-row md:justify-between md:gap-4">
          <PoolsHeadline />
          <TVLAndVolume />
        </section>
        <PoolsMenuFilter />
        {pools?.length > 0 ? <PoolList /> : <EmptyPool />}
      </div>
    </div>
  );
};

export default PoolsPage;
