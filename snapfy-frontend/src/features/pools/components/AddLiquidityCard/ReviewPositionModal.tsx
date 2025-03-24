import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { IUniswapV2Pool } from "@/types";

interface ReviewPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: IUniswapV2Pool;
}

const ReviewPositionModal = ({
  isOpen,
  onClose,
  pool,
}: ReviewPositionModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Creating Position"
      className="max-w-[600px]"
    >
      <div className="space-y-4 py-4">
        <div className="space-y-1.5">
          <div className="text-secondary ml-0.5 font-medium">You Send</div>
          <div className="flex w-full justify-between gap-3 rounded-sm border p-3">
            <div className="flex items-center gap-2">
              <Image
                src={`/tokens/${pool.token1.symbol}.svg`}
                alt={pool.token1.symbol}
                width={64}
                height={64}
                className="size-9 rounded-full"
              />
              <span className="font-medium">{pool.token1.symbol}</span>
            </div>
            <div className="-space-y-1 text-end">
              <div className="text-lg font-medium">0</div>
              <div className="text-secondary text-sm">~$0.0</div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-secondary ml-0.5 font-medium">
            Est. Pool Allocation
          </div>
          <div className="flex gap-4">
            {/* TOKEN 0 */}
            <div className="flex w-full justify-between gap-3 rounded-sm border p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${pool.token0.symbol}.svg`}
                  alt={pool.token0.symbol}
                  width={64}
                  height={64}
                  className="size-9 rounded-full"
                />
                <span className="font-medium">{pool.token0.symbol}</span>
              </div>
              <div className="-space-y-1 text-end">
                <div className="text-lg font-medium">0</div>
                <div className="text-secondary text-sm">~$0.0</div>
              </div>
            </div>
            {/* TOKEN 1 */}
            <div className="flex w-full justify-between gap-3 rounded-sm border p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${pool.token1.symbol}.svg`}
                  alt={pool.token1.symbol}
                  width={64}
                  height={64}
                  className="size-9 rounded-full"
                />
                <span className="font-medium">{pool.token1.symbol}</span>
              </div>
              <div className="-space-y-1 text-end">
                <div className="text-lg font-medium">0</div>
                <div className="text-secondary text-sm">~$0.0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t pt-3">
          <div>Network cost</div>
          <div>$0</div>
        </div>

        <Button className="!bg-accent-blue/20 !text-accent-blue hover:!bg-accent-blue/30 mb-2 w-full">
          Approve
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewPositionModal;
