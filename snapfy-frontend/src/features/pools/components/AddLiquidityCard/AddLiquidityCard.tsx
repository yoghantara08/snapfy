"use client";
import React, { useState } from "react";

import Image from "next/image";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import { Address, erc20Abi } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import { SNAPFY_CONTRACT_ADDRESS } from "@/constant";
import useNumberInput from "@/hooks/useNumberInput";
import { useUniswapV2GetPoolById } from "@/hooks/useUniswapV2Pools";
import {
  swapETHAndProvideLiquidity,
  swapTokenAndProvideLiquidity,
} from "@/lib/services/snapfyUniswapV2Service";

import ReviewPositionModal from "./ReviewPositionModal";

interface AddLiquidityCardProps {
  poolId: string;
}

const quickButtons = [25, 50, 75, 100];
const tokenOptions = [
  {
    symbol: "ETH",
    image: "/tokens/eth.svg",
    address: undefined,
  },
  {
    symbol: "USDC",
    image: "/tokens/USDC.svg",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as `0x${string}`,
  },
];

const AddLiquidityCard = ({ poolId }: AddLiquidityCardProps) => {
  const { data: pool } = useUniswapV2GetPoolById(poolId);
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [reviewModal, setReviewModal] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);

  const { data: tokenBalance } = useBalance({
    address,
    token: selectedToken.address as `0x${string}`,
  });

  const { data: ethBalance } = useBalance({
    address,
  });

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: poolId as Address,
    functionName: "allowance",
    args: [address!, SNAPFY_CONTRACT_ADDRESS],
  });

  const balance = selectedToken.symbol === "ETH" ? ethBalance : tokenBalance;
  const balanceFormatted = BigNumber(balance?.formatted || "0").toNumber();

  if (!pool) return null;

  const token0symbol =
    pool.token0.symbol === "WETH" ? "ETH" : pool.token0.symbol;
  const token1symbol =
    pool.token1.symbol === "WETH" ? "ETH" : pool.token1.symbol;

  // ETH
  const handleSwapETHAndAddLiquidity = async () => {
    if (!walletClient || !address) return;

    try {
      const tx = await swapETHAndProvideLiquidity(
        pool.token1.id as Address,
        BigInt(
          BigNumber(value)
            .times(10 ** 18)
            .toFixed(0),
        ),
        walletClient,
        address,
      );

      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  // TOKEN
  const handleSwapTokenAndAddLiquidity = async () => {
    if (!walletClient || !address) return;

    try {
      const currentAllowance = allowance ?? BigInt(0);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** pool.token1.decimals)
          .toFixed(0),
      );
      const inputToken = pool.token1.id as Address;

      if (currentAllowance < inputAmount) {
        setIsApproving(true);
        const approveTx = await writeContractAsync({
          abi: erc20Abi,
          address: inputToken,
          functionName: "approve",
          args: [SNAPFY_CONTRACT_ADDRESS, inputAmount],
        });

        await waitForTransactionReceipt(walletClient, {
          hash: approveTx,
        });
        setIsApproving(false);
      }

      setIsAddingLiquidity(true);
      const tx = await swapTokenAndProvideLiquidity(
        inputToken,
        inputAmount,
        walletClient,
        address,
      );

      await waitForTransactionReceipt(walletClient, {
        hash: tx as `0x${string}`,
      });
      console.log(tx);
    } catch (error) {
      console.log(error);
    } finally {
      setIsApproving(false);
      setIsAddingLiquidity(false);
    }
  };

  return (
    <div className="shadow-accent-blue/20 w-full space-y-3 rounded-sm border p-5 shadow">
      {/* INPUT TOKEN */}
      <div className="space-y-1.5">
        <div className="flex items-end justify-between gap-4">
          <span className="text-secondary ml-0.5 font-medium">You Send</span>
          <div className="flex items-center justify-center gap-2 text-sm">
            {quickButtons.map((percent) => (
              <button
                key={percent}
                className="bg-opacity-blue hover:bg-accent-blue/30 text-accent-blue rounded-sm px-2 py-1"
                onClick={() =>
                  handleInputChange(
                    `${(balanceFormatted * (percent / 100)).toString()}`,
                  )
                }
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1 rounded-sm border p-4">
          <div className="flex items-center justify-between gap-3">
            <Menu>
              <MenuButton className="flex cursor-pointer items-center gap-2">
                <Image
                  src={selectedToken.image}
                  alt={selectedToken.symbol}
                  width={64}
                  height={64}
                  className="size-10 rounded-full"
                />
                <span className="text-xl font-medium">
                  {selectedToken.symbol}
                </span>
                <ChevronDownIcon className="-ml-1 size-5" />
              </MenuButton>
              <MenuItems
                anchor="bottom start"
                transition
                className={classNames(
                  "bg-background shadow-accent-blue/20 z-30 mt-2 flex flex-col rounded-sm border py-1 shadow",
                  "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
                )}
              >
                {tokenOptions.map((option) => (
                  <MenuItem
                    key={option.symbol}
                    as={"div"}
                    className="hover:bg-accent-blue/20 flex w-full cursor-pointer items-center gap-2 px-3 py-2 pr-8"
                    onClick={() => {
                      setSelectedToken(option);
                      handleInputChange("0");
                    }}
                  >
                    <Image
                      src={option.image}
                      alt={option.symbol}
                      width={64}
                      height={64}
                      className="size-7 rounded-full"
                    />
                    <span className="font-medium">{option.symbol}</span>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
            <NumberInput
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={displayValue}
              placeholder="0"
              className="text-primary text-2xl font-medium"
            />
          </div>
          <div className="text-secondary flex items-center justify-between gap-3 text-sm">
            <span>
              Balance:{" "}
              {BigNumber(balance?.formatted || "0").toFixed(
                selectedToken.symbol === "ETH" ? 6 : 2,
              )}
            </span>
            <span>~$0.00</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <div className="bg-accent-blue/20 text-accent-blue flex size-8 items-center justify-center rounded-full">
          <ChevronDownIcon className="mt-0.5 size-6.5" />
        </div>
      </div>

      {/* EST POOL ALLOCATION */}
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

      <Button
        className="!bg-accent-blue/20 !text-accent-blue hover:!bg-accent-blue/30 mt-2 w-full"
        onClick={() => setReviewModal(true)}
      >
        Review
      </Button>

      <ReviewPositionModal
        isOpen={reviewModal}
        onClose={() => setReviewModal(false)}
        pool={pool}
        selectedToken={selectedToken}
        amount={value}
        handleAddLiquidity={
          selectedToken.symbol === "ETH"
            ? handleSwapETHAndAddLiquidity
            : handleSwapTokenAndAddLiquidity
        }
        disableBtn={isApproving || isAddingLiquidity}
      />
    </div>
  );
};

export default AddLiquidityCard;
