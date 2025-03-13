import React from "react";

import PoolCard from "./PoolCard";

const Pools = () => {
  return (
    <section className="mt-4 lg:mt-6">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <PoolCard />
        <PoolCard />
        <PoolCard />
      </div>
    </section>
  );
};

export default Pools;
