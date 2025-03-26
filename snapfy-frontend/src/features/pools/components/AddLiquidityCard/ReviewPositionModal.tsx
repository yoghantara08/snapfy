import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { IUniswapV2Pool } from "@/types";

interface ReviewPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: IUniswapV2Pool;
  selectedToken: {
    symbol: string;
    image: string;
    address: `0x${string}` | undefined;
  };
  amount: number;
  handleAddLiquidity: () => Promise<void>;
  disableBtn: boolean;
}

const ReviewPositionModal = ({
  isOpen,
  onClose,
  pool,
  amount,
  selectedToken,
  handleAddLiquidity,
  disableBtn,
}: ReviewPositionModalProps) => {
  const token0symbol =
    pool.token0.symbol === "WETH" ? "ETH" : pool.token0.symbol;
  const token1symbol =
    pool.token1.symbol === "WETH" ? "ETH" : pool.token1.symbol;

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
                src={selectedToken.image}
                alt={selectedToken.symbol}
                width={64}
                height={64}
                className="size-9 rounded-full"
              />
              <span className="font-medium">{selectedToken.symbol}</span>
            </div>
            <div className="-space-y-1 text-end">
              <div className="text-lg font-medium">{amount}</div>
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
                  src={`/tokens/${token0symbol}.svg`}
                  alt={token0symbol}
                  width={64}
                  height={64}
                  className="size-9 rounded-full"
                />
                <span className="font-medium">{token0symbol}</span>
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
                  src={`/tokens/${token1symbol}.svg`}
                  alt={token1symbol}
                  width={64}
                  height={64}
                  className="size-9 rounded-full"
                />
                <span className="font-medium">{token1symbol}</span>
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

        <Button
          disabled={disableBtn}
          onClick={handleAddLiquidity}
          variant="blue"
          className="mb-2 w-full"
        >
          Add Liquidity
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewPositionModal;
