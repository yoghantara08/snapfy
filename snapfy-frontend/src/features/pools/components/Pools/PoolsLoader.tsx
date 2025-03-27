import React from "react";

import Shimmer from "@/components/Loader/Shimmer";

interface PoolsLoaderProps {
  loaderCount: number;
}

const PoolsLoader = ({ loaderCount }: PoolsLoaderProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(loaderCount)].map((_, index) => (
        <div
          key={index}
          className="shadow-accent-blue/20 w-full space-y-5 rounded-sm border p-4 shadow"
        >
          <div className="flex gap-2">
            <div className="flex">
              <Shimmer className="size-12 rounded-full" />
              <Shimmer className="-ml-3 size-12 rounded-full" />
            </div>
            <div className="grid items-center">
              <Shimmer className="h-5 w-24 rounded-sm" />
              <Shimmer className="h-5 w-14 rounded-sm" />
            </div>
          </div>
          <Shimmer className="h-34 w-full rounded-sm" />
          <Shimmer className="h-12 w-full rounded-sm" />
        </div>
      ))}
    </div>
  );
};

export default PoolsLoader;
