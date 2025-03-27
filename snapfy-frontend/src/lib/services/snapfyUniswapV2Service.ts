import BigNumber from "bignumber.js";
import { parseAbiItem, WalletClient } from "viem";
import { Address, createPublicClient, http } from "viem";
import { base } from "viem/chains";

import { SNAPFY_CONTRACT_ADDRESS } from "@/constant";
import SNAPFY_ABI from "@/lib/abi/SnapfyUniswapV2ABI.json";
import UNISWAP_V2_PAIR_ABI from "@/lib/abi/UniswapV2PairABI.json";
import { LiquidityPositionType } from "@/types";

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
    throw error;
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
    throw error;
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
    throw error;
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

export const getUserLiquidityPosition = async (
  userAddress: Address,
  pairAddress: Address,
): Promise<LiquidityPositionType> => {
  try {
    const [balanceRaw, totalSupplyRaw, reserves] = await Promise.all([
      publicClient.readContract({
        address: pairAddress,
        abi: UNISWAP_V2_PAIR_ABI,
        functionName: "balanceOf",
        args: [userAddress],
      }) as Promise<bigint>,

      publicClient.readContract({
        address: pairAddress,
        abi: UNISWAP_V2_PAIR_ABI,
        functionName: "totalSupply",
      }) as Promise<bigint>,

      publicClient.readContract({
        address: pairAddress,
        abi: UNISWAP_V2_PAIR_ABI,
        functionName: "getReserves",
      }) as Promise<[bigint, bigint, number]>,
    ]);

    const balance = new BigNumber(balanceRaw.toString());
    const totalSupply = new BigNumber(totalSupplyRaw.toString());
    const reserve0 = new BigNumber(reserves[0].toString());
    const reserve1 = new BigNumber(reserves[1].toString());

    if (balance.isZero()) {
      return null;
    }

    // User percentage share of the pool
    const userShare = balance.div(totalSupply).times(100);

    // User share of each token
    const userToken0 = userShare.times(reserve0).div(100);
    const userToken1 = userShare.times(reserve1).div(100);

    return {
      balance,
      totalSupply,
      reserve0,
      reserve1,
      userShare,
      userToken0,
      userToken1,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
