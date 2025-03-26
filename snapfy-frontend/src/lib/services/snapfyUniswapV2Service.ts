import { parseAbiItem, WalletClient } from "viem";
import { Address, createPublicClient, http } from "viem";
import { base } from "viem/chains";

import { SNAPFY_CONTRACT_ADDRESS } from "@/constant";
import SNAPFY_ABI from "@/lib/abi/SnapfyUniswapV2ABI.json";

export const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

// WRITE CONTRACTS
export const swapTokenAndProvideLiquidity = async (
  inputToken: Address,
  inputAmount: bigint,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: SNAPFY_CONTRACT_ADDRESS,
      abi: SNAPFY_ABI,
      functionName: "provideLiquidity",
      args: [inputToken, inputAmount],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const swapETHAndProvideLiquidity = async (
  token: Address,
  ethAmount: bigint,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: SNAPFY_CONTRACT_ADDRESS,
      abi: SNAPFY_ABI,
      functionName: "provideLiquidityETH",
      args: [token],
      account,
      value: ethAmount,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const withdrawLiquidity = async (
  tokenA: Address,
  tokenB: Address,
  liquidity: bigint,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: SNAPFY_CONTRACT_ADDRESS,
      abi: SNAPFY_ABI,
      functionName: "withdraw",
      args: [tokenA, tokenB, liquidity],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// READ CONTRACTS
const liquidityProvidedEvent = parseAbiItem(
  "event LiquidityProvided(address indexed user, address inputToken, uint256 amount)",
);
const liquidityWithdrawnEvent = parseAbiItem(
  "event LiquidityWithdrawn(address indexed user, uint256 liquidity, address tokenA, address tokenB)",
);

export const getLiquidityProvidedEvents = async () => {
  try {
    const logs = await publicClient.getLogs({
      address: SNAPFY_CONTRACT_ADDRESS,
      event: liquidityProvidedEvent,
      fromBlock: BigInt(28092290),
      toBlock: "latest",
    });

    return logs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLiquidityWithdrawnEvents = async () => {
  try {
    const logs = await publicClient.getLogs({
      address: SNAPFY_CONTRACT_ADDRESS,
      event: liquidityWithdrawnEvent,
      fromBlock: BigInt(28092290),
      toBlock: "latest",
    });

    return logs;
  } catch (error) {
    console.log(error);
    return error;
  }
};
