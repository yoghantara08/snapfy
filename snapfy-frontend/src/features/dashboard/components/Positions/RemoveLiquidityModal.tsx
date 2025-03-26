import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import Image from "next/image";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Address, erc20Abi } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useReadContract,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import Button from "@/components/Button/Button";
import { SNAPFY_CONTRACT_ADDRESS } from "@/constant";
import useNumberInput from "@/hooks/useNumberInput";
import { withdrawLiquidity } from "@/lib/services/snapfyUniswapV2Service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95vw", sm: "500px" },
  bgcolor: "#ffffe3",
  boxShadow: 24,
  p: 2,
  border: "1px solid #c9c9c9",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

interface RemoveLiquidityModal {
  open: boolean;
  handleClose: () => void;
  lpAddress: Address;
  lpBalance: bigint;
  tokenA?: Address;
  tokenB?: Address;
  tokenAshare?: string;
  tokenBshare?: string;
}

const RemoveLiquidityModal = ({
  handleClose,
  open,
  lpAddress,
  lpBalance,
  tokenA,
  tokenB,
  tokenAshare,
  tokenBshare,
}: RemoveLiquidityModal) => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [isApproving, setIsApproving] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { value, displayValue, handleInputChange, handleInputBlur } =
    useNumberInput(0, 100);

  const scaledPercentage = Math.round(value * 100);
  const scaledPercentageBigInt = BigInt(scaledPercentage);
  const withdrawAmount = (lpBalance * scaledPercentageBigInt) / BigInt(10000);

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: lpAddress,
    functionName: "allowance",
    args: [address!, SNAPFY_CONTRACT_ADDRESS],
  });

  const handleWithdraw = async () => {
    if (!walletClient || !address || withdrawAmount <= 0) return;

    try {
      const currentAllowance = allowance ?? BigInt(0);

      // Approve the contract to spend LP tokens
      if (currentAllowance < withdrawAmount) {
        setIsApproving(true);
        const approveTx = await writeContractAsync({
          abi: erc20Abi,
          address: lpAddress,
          functionName: "approve",
          args: [SNAPFY_CONTRACT_ADDRESS, withdrawAmount],
        });

        await waitForTransactionReceipt(walletClient, {
          hash: approveTx,
        });
        setIsApproving(false);
      }

      setIsWithdrawing(true);
      const withdrawTx = await withdrawLiquidity(
        tokenA as Address,
        tokenB as Address,
        withdrawAmount,
        walletClient,
        address,
      );

      await waitForTransactionReceipt(walletClient, {
        hash: withdrawTx as `0x${string}`,
      });

      handleClose();
    } catch (error) {
      setIsApproving(false);
      setIsWithdrawing(false);
      console.log(error);
    } finally {
      setIsApproving(false);
      setIsWithdrawing(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={isApproving || isWithdrawing ? undefined : handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          className="grid content-center items-center justify-center justify-items-center"
          style={{ gridTemplateColumns: "30px 1fr 30px" }}
        >
          <IoClose className="cursor-pointer text-2xl" onClick={handleClose} />
          <p className="text-lg">Remove Liquidity</p>
          <div></div>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="flex items-center justify-center">
            <Image
              src={"/tokens/WETH.svg"}
              width={64}
              height={64}
              alt="icon"
              className="w-[50px]"
            />
            <Image
              src={"/Image/usdcIcon.svg"}
              alt="icon"
              className="w-[50px] translate-x-[-10px]"
            />
          </div>
          <h2 className="text-2xl font-medium">WETH/USDC</h2>
          <div className="bg-opacity-blue text-accent-blue rounded-sm px-1 py-[2px]">
            v2
          </div>
        </div>
        <div className="bg-opacity-blue mt-[0.5rem] flex w-full flex-col items-center justify-center gap-3 rounded-sm p-3 pb-4">
          <div className="flex w-full items-center justify-between gap-5">
            <p className="self-start">Withdrawal amount</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              placeholder="0%"
              onChange={(e) => handleInputChange(e.currentTarget.value)}
              onBlur={handleInputBlur}
              className="text-center text-8xl font-light outline-0"
              min={0}
              max={100}
              value={displayValue}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            {["25", "50", "75", "100"].map((item, index) => (
              <button
                key={index}
                className={`bg-background rounded-sm px-2 py-1 ${
                  value === parseFloat(item) ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleInputChange(item)}
              >
                {item !== "100" ? `${item}%` : "MAX"}
              </button>
            ))}
          </div>
        </div>

        <div className="my-1 flex w-full flex-col items-center justify-center gap-1">
          <div className="flex w-full items-center justify-between gap-5">
            <p>WETH position</p>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={"/tokens/WETH.svg"}
                alt="etherIcon"
                width={64}
                height={64}
                className="w-[25px]"
              ></Image>
              <p>{tokenAshare} WETH</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <p>USDC position</p>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={"/Image/usdcIcon.svg"}
                alt="usdcicon"
                className="w-[25px]"
              ></Image>
              <p>{tokenBshare} USDC</p>
            </div>
          </div>
        </div>
        <Button
          disabled={value === 0 || isApproving || isWithdrawing}
          variant="blue"
          className={"flex w-full items-center justify-center gap-1"}
          onClick={handleWithdraw}
        >
          {isApproving && "Approving..."}
          {isWithdrawing && "Withdrawing..."}
          {!isApproving && !isWithdrawing && "Remove"}
        </Button>
      </Box>
    </Modal>
  );
};

export default RemoveLiquidityModal;
