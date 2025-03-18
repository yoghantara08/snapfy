"use client";

import React, { useState } from "react";

import EmptyPool from "@/features/dashboard/components/EmptyPool/EmptyPool";
import Networth from "@/features/dashboard/components/Networth/Networth";
import PoolList from "@/features/dashboard/components/PoolList/PoolList";
import PoolsHeadline from "@/features/dashboard/components/PoolsHeadline/PoolsHeadline";
import PoolsMenuFilter from "@/features/dashboard/components/PoolsMenuFilter/PoolsMenuFilter";

const DashboardPage = () => {
  const [pools] = useState(["dfkjvn", "sdkfjv"]);
  return (
    <div>
      <div className="sx:px-12 flex w-full flex-col items-start justify-between gap-8 px-4 py-8">
        <section className="flex w-full flex-col gap-3 md:flex-row md:justify-between md:gap-4">
          <PoolsHeadline />
          <Networth />
        </section>
        <PoolsMenuFilter />
        {pools?.length > 0 ? <PoolList /> : <EmptyPool />}
      </div>
    </div>
  );
};

export default DashboardPage;
